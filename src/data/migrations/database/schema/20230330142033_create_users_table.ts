import * as Knex from "knex";
import { USERS_TABLE_SCHEMA } from "../schemas/Contants";

export const up = async (knex: Knex): Promise<any> => {
    const exist = await knex.schema.hasTable(USERS_TABLE_SCHEMA.TABLE_NAME);

    if (!exist) {
        await knex.schema.createTable(USERS_TABLE_SCHEMA.TABLE_NAME, (table) => {
            table.string(USERS_TABLE_SCHEMA.FIELDS.ID, 36).notNullable().primary();
            table.boolean(USERS_TABLE_SCHEMA.FIELDS.IS_DELETED).notNullable().defaultTo(0);
            table.boolean(USERS_TABLE_SCHEMA.FIELDS.IS_ENABLE).notNullable().defaultTo(1);
            table.dateTime(USERS_TABLE_SCHEMA.FIELDS.CREATED_DATE).defaultTo(knex.raw("current_timestamp")).index();
            table.dateTime(USERS_TABLE_SCHEMA.FIELDS.UPDATED_DATE).defaultTo(knex.raw("current_timestamp"));

            table.string(USERS_TABLE_SCHEMA.FIELDS.NAME).index();
            table.string(USERS_TABLE_SCHEMA.FIELDS.ADDRESS).nullable();
            table.string(USERS_TABLE_SCHEMA.FIELDS.AVATAR_URL).nullable();
            table.string(USERS_TABLE_SCHEMA.FIELDS.PHONE_NUMBER).nullable();
            table.string(USERS_TABLE_SCHEMA.FIELDS.ROLE).notNullable().defaultTo("user");
            table.string(USERS_TABLE_SCHEMA.FIELDS.EMAIL).notNullable();
            table.string(USERS_TABLE_SCHEMA.FIELDS.STATUS).notNullable().defaultTo("active");
            table.string(USERS_TABLE_SCHEMA.FIELDS.ACCOUNT).nullable();
            table.string(USERS_TABLE_SCHEMA.FIELDS.PASSWORD).notNullable();
        });

        const adminUser = {
            id: '2bde0e76-3b8b-41fa-a248-81c841f6fbcb',
            is_deleted: false,
            is_enable: true,
            created_date: new Date(),
            updated_date: new Date(),
            avatar_url: 'https://cdn.stageit.app/images/icondo/staging/assets/239efe39/dc46/4cbb/a33f/d579ecf023aa/raw.gif',
            name: 'Admin',
            role: 'manager',
            email: 'thangnd@stageit.app',
            status: 'active',
            password: 'no care'
        };
        
        await knex(USERS_TABLE_SCHEMA.TABLE_NAME).insert(adminUser);
    }
};

export const down = async (knex: Knex): Promise<any> => {
    const exist = await knex.schema.hasTable(USERS_TABLE_SCHEMA.TABLE_NAME);

    if (exist) {
        await knex.schema.dropTable(USERS_TABLE_SCHEMA.TABLE_NAME);
    }
};

