"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let conf = {};
module.exports = {
    client: "pg",
    connection: {
        host: "dpg-cggjd1ceoogqfc2p63ag-a.singapore-postgres.render.com",
        port: 5432,
        user: "thangnd",
        database: "users_vjyz",
        charset: "utf8mb4",
        timezone: "UTC",
        password: "Uj0X5HamHbIFTnzWwL4cuLI6CsVynMfj",
        ssl: true
    },
    version: "9.4",
    pool: {
        min: 2,
        max: 10
    },
    migrations: {
        directory: "./data/migrations/database/schema",
        tableName: "knex_migrations",
        disableTransactions: true,
        ssl: true
    },
    seeds: {
        directory: "./data/migrations/database/seed"
    }
};
//# sourceMappingURL=knexfile.js.map