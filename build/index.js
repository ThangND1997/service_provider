"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const compression = require("compression");
const helmet = require("helmet");
const Postgres_1 = require("./infrastructure/Postgres");
const core_1 = require("./core");
const routes_1 = require("./app/routes");
const HttpLog_1 = require("./middlewares/HttpLog");
const Cors_1 = require("./middlewares/Cors");
const HTTP_PORT = core_1.Configuration.PORT || 3000;
const startServer = () => {
    const app = express();
    app.use(express.json({ limit: "5mb" }));
    app.use(express.urlencoded({ limit: "5mb", extended: false }));
    app.use(helmet());
    app.use(compression());
    app.use("/", routes_1.default);
    app.use(HttpLog_1.httpLogger());
    app.use(Cors_1.default());
    app.listen(HTTP_PORT, () => {
        core_1.Logger.info(`HTTP Server Listening on ${HTTP_PORT}`);
    });
};
(async () => {
    try {
        core_1.Logger.info("Service provider tiu starting...");
        await Postgres_1.PostgresConnection.connect();
        startServer();
        core_1.Logger.info("TiuService is ready!!!");
        process.on("uncaughtException", (error) => {
            core_1.Logger.error("Uncaught Exception", error);
            switch (error.code) {
                case "EACCES":
                    core_1.Logger.error(`Port ${HTTP_PORT} requires elevated privileges`);
                    process.exit(1);
                case "EADDRINUSE":
                    core_1.Logger.error(`Port ${HTTP_PORT} is already in use`);
                    process.exit(1);
            }
        });
        process.on("unhandledRejection", (reason) => {
            core_1.Logger.error("Unhandled Rejection", reason);
        });
    }
    catch (e) {
        core_1.Logger.error(`Failed to boostrap system due to reason: ${e.message}`, e);
    }
})();
//# sourceMappingURL=index.js.map