import { BaseModel, UsersModel } from ".";
import { PostgresConnection } from "../../infrastructure/Postgres";
import { PRODUCTS_WAREHOUSE_TABLE_SCHEMA, USERS_TABLE_SCHEMA } from "../migrations/database/schemas/Contants";

class ProductsWarehouseModel extends BaseModel {
    static get tableName() {
        return PRODUCTS_WAREHOUSE_TABLE_SCHEMA.TABLE_NAME;
    }
    static get relationMappings() {
        return {
            ["users"]: {
                relation: BaseModel.BelongsToOneRelation,
                modelClass: UsersModel,
                join: {
                    from: `${PRODUCTS_WAREHOUSE_TABLE_SCHEMA.TABLE_NAME}.${PRODUCTS_WAREHOUSE_TABLE_SCHEMA.FIELDS.USER_ID}`,
                    to: `${USERS_TABLE_SCHEMA.TABLE_NAME}.${USERS_TABLE_SCHEMA.FIELDS.ID}`
                }
            },
        };
    }
}

export default ProductsWarehouseModel;