import { inject, injectable } from "inversify";
import IProductsCategoryRepository from "./IProductsCategoryRepository";
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


@injectable()
@Service(IOCServiceName.PRODUCTS_CATEGORY_REPOSITORY)
export class ProductsCategoryRepository extends BaseRepository<ProductsCategoryModel, ProductsCategoryDto> implements IProductsCategoryRepository {
    
    constructor(@inject(TYPES.PRODUCTS_CATEGORY_CONVERTER)  _converter: IProductsCategoryConverter) {
        super(ProductsCategoryModel, _converter);
    }
}
export default ProductsCategoryRepository;