import { Model } from "objection";
import * as _ from "lodash";
import * as Knex from "knex";
import * as waitOn from "wait-on"
import * as fs from "fs";
import { Configuration, Logger } from "../core";
import 'dotenv/config'

export class Connection {
    private _knexInstance: Knex;
    private _options: any;

    constructor(opts?: any) {
        const defaultOptions: any = {
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
            }
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

    public async connect() {
        Logger.info("Connecting to database...");

        const knex: Knex = Knex({
            client: "pg",
            connection: this._options,
            version: "9.4",
            debug: this._options.debug || false,
            pool: {
                min: 2,
                max: 10
            }
        });

        Model.knex(knex);

        this._knexInstance = knex;

        try {
            await waitOn({
                resources: [`tcp:${this._options.host}:${this._options.port}`]
            });

            Logger.info("Connect to database successfully.");
        } catch (e) {
            Logger.error("Failed to connect to database", e);
            throw e;
        }

        return true;
    }

    public getKnex(): Knex {
        return this._knexInstance;
    }
}

const dbConfiguration = _.cloneDeep(Configuration.database.postgres);

export const PostgresConnection = new Connection(dbConfiguration);

export default Connection;
