"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const Contants_1 = require("../schemas/Contants");
const up = async (knex) => {
    await knex.schema.alterTable(Contants_1.USERS_TABLE_SCHEMA.TABLE_NAME, (table) => {
        table.string(Contants_1.USERS_TABLE_SCHEMA.FIELDS.ACCOUNT).nullable();
    });
};
exports.up = up;
const down = async (knex) => {
    const exist = await knex.schema.hasTable(Contants_1.USERS_TABLE_SCHEMA.TABLE_NAME);
    if (exist) {
        await knex.schema.alterTable(Contants_1.USERS_TABLE_SCHEMA.TABLE_NAME, (table => {
            table.dropColumn(Contants_1.USERS_TABLE_SCHEMA.FIELDS.ACCOUNT);
        }));
    }
};
exports.down = down;
//# sourceMappingURL=20230331161110_add_account_column_to_users_table.js.map