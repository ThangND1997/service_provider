import * as Knex from "knex";
import { SESSIONS_TABLE_SCHEMA } from "../schemas/Contants";

export const up = async (knex: Knex): Promise<any> => {
    const exist = await knex.schema.hasTable(SESSIONS_TABLE_SCHEMA.TABLE_NAME);

    if (!exist) {
        await knex.schema.createTable(SESSIONS_TABLE_SCHEMA.TABLE_NAME, (table) => {
            table.string(SESSIONS_TABLE_SCHEMA.FIELDS.ID, 36).notNullable().primary();
            table.boolean(SESSIONS_TABLE_SCHEMA.FIELDS.IS_DELETED).notNullable().defaultTo(0);
            table.boolean(SESSIONS_TABLE_SCHEMA.FIELDS.IS_ENABLE).notNullable().defaultTo(1);
            table.dateTime(SESSIONS_TABLE_SCHEMA.FIELDS.CREATED_DATE).defaultTo(knex.raw("current_timestamp")).index();
            table.dateTime(SESSIONS_TABLE_SCHEMA.FIELDS.UPDATED_DATE).defaultTo(knex.raw("current_timestamp"));

            table.string(SESSIONS_TABLE_SCHEMA.FIELDS.TOKEN).index();
            table.string(SESSIONS_TABLE_SCHEMA.FIELDS.USER_ID).notNullable();
            table.string(SESSIONS_TABLE_SCHEMA.FIELDS.EXPIRE).nullable();
            table.string(SESSIONS_TABLE_SCHEMA.FIELDS.HASH).nullable();
        });
    }
};

export const down = async (knex: Knex): Promise<any> => {
    const exist = await knex.schema.hasTable(SESSIONS_TABLE_SCHEMA.TABLE_NAME);

    if (exist) {
        await knex.schema.dropTable(SESSIONS_TABLE_SCHEMA.TABLE_NAME);
    }
};

