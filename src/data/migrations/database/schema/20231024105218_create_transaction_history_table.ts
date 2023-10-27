import * as Knex from "knex";
import { TRANSACTION_HISTORY_TABLE_SCHEMA } from "../schemas/Contants";

export const up = async (knex: Knex): Promise<any> => {
    const exist = await knex.schema.hasTable(TRANSACTION_HISTORY_TABLE_SCHEMA.TABLE_NAME);

    if (!exist) {
        await knex.schema.createTable(TRANSACTION_HISTORY_TABLE_SCHEMA.TABLE_NAME, (table) => {
            table.string(TRANSACTION_HISTORY_TABLE_SCHEMA.FIELDS.ID, 36).notNullable().primary();
            table.boolean(TRANSACTION_HISTORY_TABLE_SCHEMA.FIELDS.IS_DELETED).notNullable().defaultTo(0);
            table.boolean(TRANSACTION_HISTORY_TABLE_SCHEMA.FIELDS.IS_ENABLE).notNullable().defaultTo(1);
            table.dateTime(TRANSACTION_HISTORY_TABLE_SCHEMA.FIELDS.CREATED_DATE).defaultTo(knex.raw("current_timestamp")).index();
            table.dateTime(TRANSACTION_HISTORY_TABLE_SCHEMA.FIELDS.UPDATED_DATE).defaultTo(knex.raw("current_timestamp"));

            table.string(TRANSACTION_HISTORY_TABLE_SCHEMA.FIELDS.PRODUCTS_WAREHOUSE_ID).index();
            table.string(TRANSACTION_HISTORY_TABLE_SCHEMA.FIELDS.IMPLEMENTER_ID).index();
            table.dateTime(TRANSACTION_HISTORY_TABLE_SCHEMA.FIELDS.IMPLEMENT_DATE).nullable();
            table.integer(TRANSACTION_HISTORY_TABLE_SCHEMA.FIELDS.PRICE_CHARGE).defaultTo(0);
            table.integer(TRANSACTION_HISTORY_TABLE_SCHEMA.FIELDS.NUMBER_OF_PRODUCTS).notNullable();
        });
    }
};

export const down = async (knex: Knex): Promise<any> => {
    const exist = await knex.schema.hasTable(TRANSACTION_HISTORY_TABLE_SCHEMA.TABLE_NAME);

    if (exist) {
        await knex.schema.dropTable(TRANSACTION_HISTORY_TABLE_SCHEMA.TABLE_NAME);
    }
};

