"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const Contants_1 = require("../schemas/Contants");
const up = async (knex) => {
    const exist = await knex.schema.hasTable(Contants_1.USERS_TABLE_SCHEMA.TABLE_NAME);
    if (!exist) {
        await knex.schema.createTable(Contants_1.USERS_TABLE_SCHEMA.TABLE_NAME, (table) => {
            table.string(Contants_1.USERS_TABLE_SCHEMA.FIELDS.ID, 36).notNullable().primary();
            table.boolean(Contants_1.USERS_TABLE_SCHEMA.FIELDS.IS_DELETED).notNullable().defaultTo(0);
            table.boolean(Contants_1.USERS_TABLE_SCHEMA.FIELDS.IS_ENABLE).notNullable().defaultTo(1);
            table.dateTime(Contants_1.USERS_TABLE_SCHEMA.FIELDS.CREATED_DATE).defaultTo(knex.raw("current_timestamp")).index();
            table.dateTime(Contants_1.USERS_TABLE_SCHEMA.FIELDS.UPDATED_DATE).defaultTo(knex.raw("current_timestamp"));
            table.string(Contants_1.USERS_TABLE_SCHEMA.FIELDS.NAME).index();
            table.string(Contants_1.USERS_TABLE_SCHEMA.FIELDS.ADDRESS).nullable();
            table.string(Contants_1.USERS_TABLE_SCHEMA.FIELDS.AVATAR_URL).nullable();
            table.string(Contants_1.USERS_TABLE_SCHEMA.FIELDS.PHONE_NUMBER).nullable();
            table.string(Contants_1.USERS_TABLE_SCHEMA.FIELDS.ROLE).nullable();
            table.string(Contants_1.USERS_TABLE_SCHEMA.FIELDS.EMAIL).nullable();
            table.string(Contants_1.USERS_TABLE_SCHEMA.FIELDS.STATUS).nullable();
            table.string(Contants_1.USERS_TABLE_SCHEMA.FIELDS.PASSWORD).nullable();
        });
    }
};
exports.up = up;
const down = async (knex) => {
    const exist = await knex.schema.hasTable(Contants_1.USERS_TABLE_SCHEMA.TABLE_NAME);
    if (exist) {
        await knex.schema.dropTable(Contants_1.USERS_TABLE_SCHEMA.TABLE_NAME);
    }
};
exports.down = down;
//# sourceMappingURL=20230330142033_create_users_table.js.map