import * as Knex from "knex";
import { PRODUCTS_CATEGORY_TABLE_SCHEMA } from "../schemas/Contants";

export const up = async (knex: Knex): Promise<any> => {
    const exist = await knex.schema.hasTable(PRODUCTS_CATEGORY_TABLE_SCHEMA.TABLE_NAME);

    if (!exist) {
        await knex.schema.createTable(PRODUCTS_CATEGORY_TABLE_SCHEMA.TABLE_NAME, (table) => {
            table.string(PRODUCTS_CATEGORY_TABLE_SCHEMA.FIELDS.ID, 36).notNullable().primary();
            table.boolean(PRODUCTS_CATEGORY_TABLE_SCHEMA.FIELDS.IS_DELETED).notNullable().defaultTo(0);
            table.boolean(PRODUCTS_CATEGORY_TABLE_SCHEMA.FIELDS.IS_ENABLE).notNullable().defaultTo(1);
            table.dateTime(PRODUCTS_CATEGORY_TABLE_SCHEMA.FIELDS.CREATED_DATE).defaultTo(knex.raw("current_timestamp")).index();
            table.dateTime(PRODUCTS_CATEGORY_TABLE_SCHEMA.FIELDS.UPDATED_DATE).defaultTo(knex.raw("current_timestamp"));
            table.string(PRODUCTS_CATEGORY_TABLE_SCHEMA.FIELDS.NAME).index();
        });
        const defaultCategory = {
            id: '6da2b221-19b6-4b11-957c-a6ebf9a4c3e4',
            is_deleted: false,
            is_enable: true,
            created_date: new Date(),
            updated_date: new Date(),
            name: 'Bun, Chaos',
        };
        
        await knex(PRODUCTS_CATEGORY_TABLE_SCHEMA.TABLE_NAME).insert(defaultCategory);
    }
};

export const down = async (knex: Knex): Promise<any> => {
    const exist = await knex.schema.hasTable(PRODUCTS_CATEGORY_TABLE_SCHEMA.TABLE_NAME);

    if (exist) {
        await knex.schema.dropTable(PRODUCTS_CATEGORY_TABLE_SCHEMA.TABLE_NAME);
    }
};

