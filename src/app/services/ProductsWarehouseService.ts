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
import { Logger } from "../../core";
import ISessionsRepository from "../repositories/ISessionsRepository";
import * as momentTz from "moment-timezone";
import IProductsWarehouseRepository from "../repositories/IProductsWarehouseRepository";
import ProductsWarehouseDto from "../../data/dtos/ProductsWarehouseDto";
import ProductsCategoryDto from "../../data/dtos/ProductsCategory";
import { PRODUCTS_CATEGORY_TABLE_SCHEMA } from "../../data/migrations/database/schemas/Contants";
import IProductsCategoryRepository from "../repositories/IProductsCategoryRepository";
import TransactionHistoryDto from "../../data/dtos/TransactionHistoryDto";
import ITransactionHistoryRepository from "../repositories/ITransactionHistoryRepository";

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
        return this._productsWarehouseRepository.create(data);
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

    public async release(ctx: any, id: string, numb: number): Promise<boolean> {
        const existing = await this._productsWarehouseRepository.findById(id)
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