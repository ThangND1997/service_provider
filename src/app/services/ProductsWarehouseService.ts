import { inject, injectable } from "inversify";
import { uuid } from 'uuidv4';
import { BaseService } from ".";
import { SessionsDto, UsersDto } from "../../data/dtos";
import { TYPES } from "../../ioc/Types";
import IUsersRepository from "../repositories/IUsersRepository";
import IProductsWarehouseService from "./IProductsWarehouseService";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import ErrorCode from "../../libs/error_code";
import HttpStatus from "../../libs/http_code";
import ExceptionModel from "../../libs/exception.lib";
import * as _ from "lodash"
import { Logger } from "../../core";
import ISessionsRepository from "../repositories/ISessionsRepository";
import * as momentTz from "moment-timezone";
import IProductsWarehouseRepository from "../repositories/IProductsWarehouseRepository";
import ProductsWarehouseDto from "../../data/dtos/ProductsWarehouseDto";
import ProductsCategoryDto from "../../data/dtos/ProductsCategory";
import { PRODUCTS_CATEGORY_TABLE_SCHEMA, PRODUCTS_WAREHOUSE_TABLE_SCHEMA, TRANSACTION_HISTORY_TABLE_SCHEMA } from "../../data/migrations/database/schemas/Contants";
import IProductsCategoryRepository from "../repositories/IProductsCategoryRepository";
import TransactionHistoryDto from "../../data/dtos/TransactionHistoryDto";
import ITransactionHistoryRepository from "../repositories/ITransactionHistoryRepository";
import TransactionHistoryWrapper, { ChartTransactionHistory, SummaryTransactionHistory } from "../../data/dtos/TransactionHistoryWrapper";
import { telegramClient } from "../../infrastructure";

@injectable()
class ProductsWarehouseService extends BaseService<IProductsWarehouseRepository, ProductsWarehouseDto> implements IProductsWarehouseService {
    
    // rome-ignore lint/correctness/noUnreachableSuper: <explanation>
constructor(
    @inject(TYPES.PRODUCTS_WAREHOUSE_REPOSITORY) private _productsWarehouseRepository: IProductsWarehouseRepository,
    @inject(TYPES.PRODUCTS_CATEGORY_REPOSITORY) private _productsCategoryRepository: IProductsCategoryRepository,
    @inject(TYPES.TRANSACTION_HISTORY_REPOSITORY) private _transactionHistoryRepository: ITransactionHistoryRepository,
    @inject(TYPES.SESSIONS_REPOSITORY) private _sessionsRepository: ISessionsRepository) {
        super(_productsWarehouseRepository);
    }

    public async create(data: UsersDto): Promise<any> {
        const id = await this._productsWarehouseRepository.create(data);
        const item = await this._productsWarehouseRepository.findById(id, {relations: ["users"]});
        if (item) {
            await telegramClient.sendMessageNewProductItem(item);
        }
        return id;
    }

    public async search(params: any): Promise<ProductsWarehouseDto[]> {
        return this._productsWarehouseRepository.search(params);
    }

    public async update(id: string, data: ProductsWarehouseDto): Promise<string> {
        const existing = await this._productsWarehouseRepository.findById(id)
        if (!existing) {
            throw new ExceptionModel(
                ErrorCode.RESOURCE.NOT_EXIST_DATA.CODE,
                ErrorCode.RESOURCE.NOT_EXIST_DATA.MESSAGE,
                false,
                HttpStatus.BAD_REQUEST
            );
        }
        return this._productsWarehouseRepository.updateById(id, data);
    }

    public async delete(id: string): Promise<boolean> {
        const existing = await this._productsWarehouseRepository.findById(id)
        if (!existing) {
            throw new ExceptionModel(
                ErrorCode.RESOURCE.NOT_EXIST_DATA.CODE,
                ErrorCode.RESOURCE.NOT_EXIST_DATA.MESSAGE,
                false,
                HttpStatus.BAD_REQUEST
            );
        }
        return this._productsWarehouseRepository.deleteById(id);
    }

    public buildHourlyChartData(chartOptions: {
        reportData: any[],
        reportType: string,
        startDate: momentTz.Moment,
        endDate: momentTz.Moment
    }): ChartTransactionHistory[] {
        let hourSeries: momentTz.Moment[] = [chartOptions.startDate];
        for (let i = 0; i < 23; i++) {
            if (hourSeries[i].isAfter(chartOptions.endDate)) {
                break;
            }
            let tempDate = hourSeries[i].clone().add(1, "hour").utc();
            hourSeries.push(tempDate);
        }
        const chartData: ChartTransactionHistory[] = [];
        for (const report of chartOptions.reportData) {
            const index = _.findIndex(chartData, i => i.name === report.name);
            if (index !== -1) {
                chartData[index].data = this.replacePutProductsToArray(report, hourSeries, chartData[index].data, chartOptions.reportType);
            }else {
                const item = {
                    name: report.name,
                    picture: report.picture,
                    data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
                }
                item.data = this.replacePutProductsToArray(report, hourSeries, item.data, chartOptions.reportType);
                chartData.push(item);
            }
        }
        return chartData;
    }

    private replacePutProductsToArray(report: any, hourSeries: momentTz.Moment[], data: number[], type: string): number[] {
        const dataClone: number[] = data;
        _.forEach(hourSeries, (currentTime, index) => {
            if (momentTz(report.datetime).toISOString() === momentTz(currentTime).toISOString()) {
                if (type === "revenue") {
                    dataClone[index] += Number(report.revenue);
                    return dataClone;
                }else {
                    dataClone[index] += Number(report.quantity);
                    return dataClone;
                }
            }
        } )

        return dataClone;
    }

    public async report(queryParams: any): Promise<TransactionHistoryWrapper> {
        const type = queryParams.type || "revenue";
        const dtos = await this._transactionHistoryRepository.getByQuery(queryParams);
        const trackingData = await this._transactionHistoryRepository.countTrackingByQuery(queryParams);
        const charts: ChartTransactionHistory[] = this.buildHourlyChartData({
            reportData: trackingData,
            reportType: type,
            startDate: momentTz(queryParams.startDate).utc(),
            endDate: momentTz(queryParams.endDate).utc(),
        });
        
        const summary: SummaryTransactionHistory = {
            totalPriceCharge: 0,
            detailPriceCharge: [],
        };
        for (const dataClone of charts) {
            const fee = _.sum(dataClone.data);
            summary.detailPriceCharge.push({
                title: dataClone.name,
                picture: dataClone.picture,
                fee
            });
        }
        summary.totalPriceCharge = trackingData.reduce((n: any, item: any) => {
            return n + Number(item.revenue);
        }, 0)

        const result = new TransactionHistoryWrapper();
        result.data = dtos;
        result.summary = summary;
        result.charts = charts;

        return result;
    }

    public async release(ctx: any, id: string, numb: number): Promise<boolean> {
        const existing = await this._productsWarehouseRepository.findById(id, {relations: ["users"]});
        if (!existing) {
            throw new ExceptionModel(
                ErrorCode.RESOURCE.NOT_EXIST_DATA.CODE,
                ErrorCode.RESOURCE.NOT_EXIST_DATA.MESSAGE,
                false,
                HttpStatus.BAD_REQUEST
            );
        }

        // Update quantity product in record
        const productsWarehouseDto = new ProductsWarehouseDto();
        let restTotal: number = existing.total - numb
        if (restTotal < 0) {
            restTotal = 0;
            numb = existing.total;
        }
        productsWarehouseDto.total = restTotal;
        await this._productsWarehouseRepository.updateById(id, productsWarehouseDto);

        // Insert log history
        const productsTraceHistoryDto = new TransactionHistoryDto();
        productsTraceHistoryDto.implementDate = momentTz().utc();
        productsTraceHistoryDto.implementerId = ctx.userId;
        productsTraceHistoryDto.priceCharge = existing.priceDisplay;
        productsTraceHistoryDto.numberOfProducts = numb;
        productsTraceHistoryDto.productsWarehouseId = id;

        await this._transactionHistoryRepository.insert(productsTraceHistoryDto);
        await telegramClient.sendMessageReleaseItem({name: existing.name, releaseTotal: numb, restTotal, priceDisplay: existing.priceDisplay, userName: existing.user?.name, picture: existing.picture});

        return true
    }

    public async findAllCategory(): Promise<ProductsCategoryDto[]> {
        return this._productsCategoryRepository.findByQuery(q =>  {
            q.where(PRODUCTS_CATEGORY_TABLE_SCHEMA.FIELDS.IS_DELETED, false),
            q.where(PRODUCTS_CATEGORY_TABLE_SCHEMA.FIELDS.IS_ENABLE, true)
        });
    }

    public async addCategory(data: ProductsCategoryDto): Promise<string> {
        return this._productsCategoryRepository.insert(data)
    }
}

export default ProductsWarehouseService;