// Update with your config settings.

import * as fs from "fs";
import * as yaml from "js-yaml";
import * as path from "path";


// const loadSetting = (): any => {
  let conf: any = {};
  // let url = path.join(__dirname, "configs");

  // if (process.env.NODE_ENV == null) {
  //   process.env.NODE_ENV = "development";
  // }
  // try {
  //   let doc = yaml.safeLoad(fs.readFileSync(`${url}/${process.env.NODE_ENV}.yaml`, "utf8")) as object;
  //   for (let key of Object.keys(doc)) {
  //     let val = doc[key];
  //     if (val != null) {
  //       conf[key] = val;
  //     }
  //   }
  // } catch (err) {
  //   console.log(`Error when loading configuration file ${process.env.NODE_ENV}.yaml, fallback to configuration.yaml`);
  //   try {
  //     let doc = yaml.safeLoad(fs.readFileSync(`${url}/configuration.yaml`, "utf8")) as object;
  //     for (let key of Object.keys(doc)) {
  //       let val = doc[key];
  //       if (val != null) {
  //         conf[key] = val;
  //       }
  //     }
  //   } catch (err) {
  //     console.log(`Error when loading configuration file configuration.yaml, using default value for each module: ${err.message}`);
  //   }
  // }
//   if (process.env.POSTGRES_HOST != null) {
//     conf.database.postgres.host = process.env.POSTGRES_HOST;
//   }
//   if (process.env.POSTGRES_PORT != null) {
//     conf.database.postgres.port = process.env.POSTGRES_PORT;
//   }
//   if (process.env.POSTGRES_USER != null) {
//     conf.database.postgres.user = process.env.POSTGRES_USER;
//   }
//   if (process.env.POSTGRES_PASSWORD != null) {
//     conf.database.postgres.password = process.env.POSTGRES_PASSWORD;
//   }
//   if (process.env.POSTGRES_NAME != null) {
//     conf.database.postgres.database = process.env.POSTGRES_NAME;
//   }
//   return conf;
// };

// const options = loadSetting().database.postgres;

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
