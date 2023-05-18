import * as Knex from "knex";
import { PRODUCTS_TABLE_SCHEMA } from "../schemas/Contants";

export const up = async (knex: Knex): Promise<any> => {
    const exist = await knex.schema.hasTable(PRODUCTS_TABLE_SCHEMA.TABLE_NAME);

    if (!exist) {
        await knex.schema.createTable(PRODUCTS_TABLE_SCHEMA.TABLE_NAME, (table) => {
            table.string(PRODUCTS_TABLE_SCHEMA.FIELDS.ID, 36).notNullable().primary();
            table.boolean(PRODUCTS_TABLE_SCHEMA.FIELDS.IS_DELETED).notNullable().defaultTo(0);
            table.boolean(PRODUCTS_TABLE_SCHEMA.FIELDS.IS_ENABLE).notNullable().defaultTo(1);
            table.dateTime(PRODUCTS_TABLE_SCHEMA.FIELDS.CREATED_DATE).defaultTo(knex.raw("current_timestamp")).index();
            table.dateTime(PRODUCTS_TABLE_SCHEMA.FIELDS.UPDATED_DATE).defaultTo(knex.raw("current_timestamp"));

            table.string(PRODUCTS_TABLE_SCHEMA.FIELDS.TITLE).index();
            table.string(PRODUCTS_TABLE_SCHEMA.FIELDS.DESCRIPTION).nullable();
            table.string(PRODUCTS_TABLE_SCHEMA.FIELDS.IMAGE_URL).nullable();
            table.string(PRODUCTS_TABLE_SCHEMA.FIELDS.SUB_IMAGES_URL).nullable();
            table.string(PRODUCTS_TABLE_SCHEMA.FIELDS.IS_BEST_SELLER).nullable();
            table.string(PRODUCTS_TABLE_SCHEMA.FIELDS.PRICE).nullable();
        });
    }
};

export const down = async (knex: Knex): Promise<any> => {
    const exist = await knex.schema.hasTable(PRODUCTS_TABLE_SCHEMA.TABLE_NAME);

    if (exist) {
        await knex.schema.dropTable(PRODUCTS_TABLE_SCHEMA.TABLE_NAME);
    }
};

