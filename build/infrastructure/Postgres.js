"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresConnection = exports.Connection = void 0;
const objection_1 = require("objection");
const _ = require("lodash");
const Knex = require("knex");
const waitOn = require("wait-on");
const fs = require("fs");
const core_1 = require("../core");
class Connection {
    constructor(opts) {
        const defaultOptions = {
            host: "",
            port: 5432,
            user: "",
            database: "",
            charset: "utf8mb4",
            timezone: "UTC",
            password: "",
            ssl: true
        };
        this._options = opts || defaultOptions;
        if (this._options.secure) {
            this._options.ssl = {
                ca: fs.readFileSync(`../configs/cockroach-ca.crt`).toString()
            };
        }
        if (process.env.POSTGRES_HOST != null) {
            this._options.host = process.env.POSTGRES_HOST;
        }
        if (process.env.POSTGRES_PORT != null) {
            this._options.port = process.env.POSTGRES_PORT;
        }
        if (process.env.POSTGRES_USER != null) {
            this._options.user = process.env.POSTGRES_USER;
        }
        if (process.env.POSTGRES_DB != null) {
            this._options.database = process.env.POSTGRES_DB;
        }
        if (process.env.POSTGRES_PASSWORD != null) {
            this._options.password = process.env.POSTGRES_PASSWORD;
        }
    }
    async connect() {
        core_1.Logger.info("Connecting to database...");
        const knex = Knex({
            client: "pg",
            connection: this._options,
            version: "9.4",
            debug: this._options.debug || false,
            pool: {
                min: 2,
                max: 10
            }
        });
        objection_1.Model.knex(knex);
        this._knexInstance = knex;
        try {
            await waitOn({
                resources: [`tcp:${this._options.host}:${this._options.port}`]
            });
            core_1.Logger.info("Connect to database successfully.");
        }
        catch (e) {
            core_1.Logger.error("Failed to connect to database", e);
            throw e;
        }
        return true;
    }
    getKnex() {
        return this._knexInstance;
    }
}
exports.Connection = Connection;
const dbConfiguration = _.cloneDeep(core_1.Configuration.database.postgres);
exports.PostgresConnection = new Connection(dbConfiguration);
exports.default = Connection;
//# sourceMappingURL=Postgres.js.map