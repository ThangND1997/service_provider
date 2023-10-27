import { inject, injectable } from "inversify";
import IProductsWarehouseRepository from "./IProductsWarehouseRepository";
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


@injectable()
@Service(IOCServiceName.PRODUCTS_WAREHOUSE_REPOSITORY)
export class ProductsWarehouseRepository extends BaseRepository<ProductsWarehouseModel, ProductsWarehouseDto> implements IProductsWarehouseRepository {
    
    constructor(@inject(TYPES.PRODUCTS_WAREHOUSE_CONVERTER)  _converter: IProductsWarehouseConverter) {
        super(ProductsWarehouseModel, _converter);
    }

    public async create(params: any): Promise<any> {
        return this.insert(params);
    }

    public async search(params: any): Promise<ProductsWarehouseDto[]> {
        return this.findByQuery(q => {
            q.where(PRODUCTS_WAREHOUSE_TABLE_SCHEMA.FIELDS.IS_DELETED, false);
            q.where(PRODUCTS_WAREHOUSE_TABLE_SCHEMA.FIELDS.IS_ENABLE, true);

            if (params.name) {
                q.where(PRODUCTS_WAREHOUSE_TABLE_SCHEMA.FIELDS.NAME, "ILIKE", `%${params.name}%`);
            }

            q.orderBy(PRODUCTS_WAREHOUSE_TABLE_SCHEMA.FIELDS.CREATED_DATE, "DESC");

            if ([params.orderBy].includes(params.orderBy) && params.orderType != null) {
                q.orderBy(params.orderBy, params.orderType);
            }

            q.offset(params.offset || 0);
            q.limit(params.limit || 10);
        },{
            relations: ["users"]
        });
    }
}
export default ProductsWarehouseRepository;