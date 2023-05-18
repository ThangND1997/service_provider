import { BaseModel } from ".";
import { SESSIONS_TABLE_SCHEMA } from "../migrations/database/schemas/Contants";

class SessionsModel extends BaseModel {
    static get tableName() {
        return SESSIONS_TABLE_SCHEMA.TABLE_NAME;
    }
}

export default SessionsModel;