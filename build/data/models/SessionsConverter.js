"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const Contants_1 = require("../migrations/database/schemas/Contants");
class SessionsModel extends _1.BaseModel {
    static get tableName() {
        return Contants_1.SESSIONS_TABLE_SCHEMA.TABLE_NAME;
    }
}
exports.default = SessionsModel;
//# sourceMappingURL=SessionsConverter.js.map