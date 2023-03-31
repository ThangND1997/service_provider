import * as Knex from "knex";
import { USERS_TABLE_SCHEMA } from "../schemas/Contants";

export const up = async (knex: Knex): Promise<any> => {
        await knex.schema.alterTable(USERS_TABLE_SCHEMA.TABLE_NAME, (table) => {
            table.string(USERS_TABLE_SCHEMA.FIELDS.ACCOUNT).nullable();
        });
    };

export const down = async (knex: Knex): Promise<any> => {
    const exist = await knex.schema.hasTable(USERS_TABLE_SCHEMA.TABLE_NAME);

    if (exist) {
        await knex.schema.alterTable(USERS_TABLE_SCHEMA.TABLE_NAME, (table => {
            table.dropColumn(USERS_TABLE_SCHEMA.FIELDS.ACCOUNT);
        }));
    }
};

