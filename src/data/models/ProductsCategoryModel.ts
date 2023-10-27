import { BaseModel, UsersModel } from ".";
import { PostgresConnection } from "../../infrastructure/Postgres";
import { PRODUCTS_CATEGORY_TABLE_SCHEMA } from "../migrations/database/schemas/Contants";

class ProductsCategoryModel extends BaseModel {
    static get tableName() {
        return PRODUCTS_CATEGORY_TABLE_SCHEMA.TABLE_NAME;
    }
   
}

export default ProductsCategoryModel;