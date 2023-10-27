import * as Knex from "knex";
import { PRODUCTS_WAREHOUSE_TABLE_SCHEMA } from "../schemas/Contants";

export const up = async (knex: Knex): Promise<any> => {
    const exist = await knex.schema.hasTable(PRODUCTS_WAREHOUSE_TABLE_SCHEMA.TABLE_NAME);

    if (!exist) {
        await knex.schema.createTable(PRODUCTS_WAREHOUSE_TABLE_SCHEMA.TABLE_NAME, (table) => {
            table.string(PRODUCTS_WAREHOUSE_TABLE_SCHEMA.FIELDS.ID, 36).notNullable().primary();
            table.boolean(PRODUCTS_WAREHOUSE_TABLE_SCHEMA.FIELDS.IS_DELETED).notNullable().defaultTo(0);
            table.boolean(PRODUCTS_WAREHOUSE_TABLE_SCHEMA.FIELDS.IS_ENABLE).notNullable().defaultTo(1);
            table.dateTime(PRODUCTS_WAREHOUSE_TABLE_SCHEMA.FIELDS.CREATED_DATE).defaultTo(knex.raw("current_timestamp")).index();
            table.dateTime(PRODUCTS_WAREHOUSE_TABLE_SCHEMA.FIELDS.UPDATED_DATE).defaultTo(knex.raw("current_timestamp"));

            table.string(PRODUCTS_WAREHOUSE_TABLE_SCHEMA.FIELDS.NAME).index();
            table.string(PRODUCTS_WAREHOUSE_TABLE_SCHEMA.FIELDS.DESCRIPTION).nullable();
            table.string(PRODUCTS_WAREHOUSE_TABLE_SCHEMA.FIELDS.USER_ID).nullable().index();
            table.string(PRODUCTS_WAREHOUSE_TABLE_SCHEMA.FIELDS.CATEGORY_ID).nullable().index();
            table.integer(PRODUCTS_WAREHOUSE_TABLE_SCHEMA.FIELDS.PRICE_DISPLAY).nullable();
            table.integer(PRODUCTS_WAREHOUSE_TABLE_SCHEMA.FIELDS.PRICE_ORIGINAL).nullable();
            table.string(PRODUCTS_WAREHOUSE_TABLE_SCHEMA.FIELDS.MONETARY_UNIT).defaultTo("VND");
            table.string(PRODUCTS_WAREHOUSE_TABLE_SCHEMA.FIELDS.PICTURE).nullable();
            table.jsonb(PRODUCTS_WAREHOUSE_TABLE_SCHEMA.FIELDS.IMAGES).defaultTo("[]");
            table.integer(PRODUCTS_WAREHOUSE_TABLE_SCHEMA.FIELDS.TOTAL).defaultTo(0);
        });
    }
};

export const down = async (knex: Knex): Promise<any> => {
    const exist = await knex.schema.hasTable(PRODUCTS_WAREHOUSE_TABLE_SCHEMA.TABLE_NAME);

    if (exist) {
        await knex.schema.dropTable(PRODUCTS_WAREHOUSE_TABLE_SCHEMA.TABLE_NAME);
    }
};

