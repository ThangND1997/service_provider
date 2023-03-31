"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const objection_1 = require("objection");
class BaseModel extends objection_1.Model {
    static get idColumn() {
        return "id";
    }
    $beforeUpdate() {
        this.updated_date = new Date().toISOString();
    }
}
exports.default = BaseModel;
//# sourceMappingURL=BaseModel.js.map