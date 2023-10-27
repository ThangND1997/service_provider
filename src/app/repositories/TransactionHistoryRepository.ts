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
import { PRODUCTS_WAREHOUSE_TABLE_SCHEMA } from "../../data/migrations/database/schemas/Contants";
import ProductsCategoryDto from "../../data/dtos/ProductsCategory";
import ProductsCategoryModel from "../../data/models/ProductsCategoryModel";
import IProductsCategoryConverter from "../../data/converters/IProductsCategoryConverter";
import TransactionHistoryModel from "../../data/models/TransactionHistoryModel";
import TransactionHistoryDto from "../../data/dtos/TransactionHistoryDto";
import ITransactionHistoryConverter from "../../data/converters/ITransactionHistoryConverter";


@injectable()
@Service(IOCServiceName.PRODUCTS_CATEGORY_REPOSITORY)
export class TransactionHistoryRepository extends BaseRepository<TransactionHistoryModel, TransactionHistoryDto> implements ITransactionHistoryRepository {
    
    constructor(@inject(TYPES.TRANSACTION_HISTORY_CONVERTER)  _converter: ITransactionHistoryConverter) {
        super(TransactionHistoryModel, _converter);
    }
}
export default TransactionHistoryRepository;