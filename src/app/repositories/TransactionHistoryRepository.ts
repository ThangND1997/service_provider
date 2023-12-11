import { inject, injectable } from "inversify";
import ITransactionHistoryRepository from "./ITransactionHistoryRepository";
import * as uuid from 'uuid'
import { PostgresConnection } from "../../infrastructure/Postgres";
import { BaseRepository } from ".";
import { TYPES } from "../../ioc/Types";
import { UsersModel } from "../../data/models";
import { UsersDto } from "../../data/dtos";
import { IUsersConverter } from "../../data/converters";
import { Service } from "typedi";
import { IOCServiceName } from "../../ioc/IocServiceName";
import ProductsWarehouseModel from "../../data/models/ProductsWarehouseModel";
import ProductsWarehouseDto from "../../data/dtos/ProductsWarehouseDto";
import IProductionConverter from "../../data/converters/IProductsWarehouseConverter";
import IProductsWarehouseConverter from "../../data/converters/IProductsWarehouseConverter";
import { PRODUCTS_WAREHOUSE_TABLE_SCHEMA, TRANSACTION_HISTORY_TABLE_SCHEMA } from "../../data/migrations/database/schemas/Contants";
import ProductsCategoryDto from "../../data/dtos/ProductsCategory";
import ProductsCategoryModel from "../../data/models/ProductsCategoryModel";
import IProductsCategoryConverter from "../../data/converters/IProductsCategoryConverter";
import TransactionHistoryModel from "../../data/models/TransactionHistoryModel";
import TransactionHistoryDto from "../../data/dtos/TransactionHistoryDto";
import ITransactionHistoryConverter from "../../data/converters/ITransactionHistoryConverter";
import * as momentTz from "moment-timezone"


@injectable()
@Service(IOCServiceName.PRODUCTS_CATEGORY_REPOSITORY)
export class TransactionHistoryRepository extends BaseRepository<TransactionHistoryModel, TransactionHistoryDto> implements ITransactionHistoryRepository {
    
    constructor(@inject(TYPES.TRANSACTION_HISTORY_CONVERTER)  _converter: ITransactionHistoryConverter) {
        super(TransactionHistoryModel, _converter);
    }

    private query(queryParams: any) {
        return (q: any) => {
            q.where(TRANSACTION_HISTORY_TABLE_SCHEMA.FIELDS.IS_DELETED, false)
            q.where(TRANSACTION_HISTORY_TABLE_SCHEMA.FIELDS.IS_ENABLE, true)
            if (queryParams.startDate) {
                q.where(TRANSACTION_HISTORY_TABLE_SCHEMA.FIELDS.CREATED_DATE, ">=", momentTz(queryParams.startDate).toISOString())
            }
            if (queryParams.endDate) {
                q.where(TRANSACTION_HISTORY_TABLE_SCHEMA.FIELDS.CREATED_DATE, "<", momentTz(queryParams.endDate).toISOString())
            }
        }
    }

    public async getByQuery(queryParams: any): Promise<TransactionHistoryDto[]> {
        return this.findByQuery(this.query(queryParams));
    }

    public async countTrackingByQuery(queryParams: any): Promise<any> {
        let queryStartDate = "";
        let queryEndDate = "";
        let startDate = momentTz(queryParams.startDate).toISOString();
        let endDate = momentTz(queryParams.endDate).toISOString();
        if (queryParams.startDate) {
            queryStartDate = `AND a.${TRANSACTION_HISTORY_TABLE_SCHEMA.FIELDS.CREATED_DATE} >= '${startDate}'`
        }
        if (queryParams.endDate) {
            queryEndDate = `AND a.${TRANSACTION_HISTORY_TABLE_SCHEMA.FIELDS.CREATED_DATE} < '${endDate}'`
        }
        return this.rawQuery(
            `SELECT COUNT
                (a.${TRANSACTION_HISTORY_TABLE_SCHEMA.FIELDS.CREATED_DATE}) AS COUNT,
                SUM (a.${TRANSACTION_HISTORY_TABLE_SCHEMA.FIELDS.NUMBER_OF_PRODUCTS} * a.${TRANSACTION_HISTORY_TABLE_SCHEMA.FIELDS.PRICE_CHARGE}) AS revenue,
                a.${TRANSACTION_HISTORY_TABLE_SCHEMA.FIELDS.NUMBER_OF_PRODUCTS} as quantity,
                b.${PRODUCTS_WAREHOUSE_TABLE_SCHEMA.FIELDS.NAME},
                b.${PRODUCTS_WAREHOUSE_TABLE_SCHEMA.FIELDS.PICTURE},
                date_trunc( 'hour', a.${TRANSACTION_HISTORY_TABLE_SCHEMA.FIELDS.CREATED_DATE} ) AS dateTime 
            FROM
                ${TRANSACTION_HISTORY_TABLE_SCHEMA.TABLE_NAME} a
            INNER JOIN ${PRODUCTS_WAREHOUSE_TABLE_SCHEMA.TABLE_NAME} b on b.${PRODUCTS_WAREHOUSE_TABLE_SCHEMA.FIELDS.ID} = a.${TRANSACTION_HISTORY_TABLE_SCHEMA.FIELDS.PRODUCTS_WAREHOUSE_ID}
            WHERE
                    a.${TRANSACTION_HISTORY_TABLE_SCHEMA.FIELDS.IS_DELETED} = false
                AND
                    a.${TRANSACTION_HISTORY_TABLE_SCHEMA.FIELDS.IS_ENABLE} = true
                    ${queryStartDate}
                    ${queryEndDate}
            GROUP BY
                date_trunc('hour', a.created_date), a."number_of_products", b."name", b."picture"`
        );
    }
}
export default TransactionHistoryRepository;