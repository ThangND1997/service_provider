import { BaseModel, UsersModel } from ".";
import { PostgresConnection } from "../../infrastructure/Postgres";
import { PRODUCTS_CATEGORY_TABLE_SCHEMA, TRANSACTION_HISTORY_TABLE_SCHEMA } from "../migrations/database/schemas/Contants";

class TransactionHistoryModel extends BaseModel {
    static get tableName() {
        return TRANSACTION_HISTORY_TABLE_SCHEMA.TABLE_NAME;
    }
   
}

export default TransactionHistoryModel;