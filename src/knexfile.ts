// Update with your config settings.
require('dotenv').config();

module.exports = {
  client: "pg",
  connection: {
    host: process.env.POSTGRES_HOST,
    port: 5432,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    charset: "utf8mb4",
    timezone: "UTC",
    password: process.env.PASSWORD,
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
