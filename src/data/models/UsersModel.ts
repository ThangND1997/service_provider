import { BaseModel } from ".";
import { USERS_TABLE_SCHEMA } from "../migrations/database/schemas/Contants";

class UsersModel extends BaseModel {
    static get tableName() {
        return USERS_TABLE_SCHEMA.TABLE_NAME;
    }
}

export default UsersModel;