import * as express from "express";
import * as compression from "compression";
import * as helmet from "helmet";
import { PostgresConnection } from "./infrastructure/Postgres";
import { Configuration, Logger } from "./core";
import Router from "./app/routes"
import { httpLogger } from "./middlewares/HttpLog";
import cors from "./middlewares/Cors";

const HTTP_PORT = Configuration.PORT || 3000;

const startServer = () => {
    const app = express();

    app.use(express.json({ limit: "5mb" }));
    app.use(express.urlencoded({ limit: "5mb", extended: false }));
    app.use(helmet());
    app.use(compression());
    app.use("/", Router)
    app.use(httpLogger());
    app.use(cors());

    app.listen(HTTP_PORT, () => {
        Logger.info(`HTTP Server Listening on ${HTTP_PORT}`);
    });
};

(async () => {
    try {
        Logger.info("Service provider tiu starting...");

        await PostgresConnection.connect();

        startServer();

        Logger.info("TiuService is ready!!!");

        process.on("uncaughtException", (error: any) => {
            Logger.error("Uncaught Exception", error);

            // handle specific listen errors with friendly messages
            switch (error.code) {
                case "EACCES":
                    Logger.error(`Port ${HTTP_PORT} requires elevated privileges`);
                    process.exit(1);

                case "EADDRINUSE":
                    Logger.error(`Port ${HTTP_PORT} is already in use`);
                    process.exit(1);
            }
        });

        process.on("unhandledRejection", (reason: any): void => {
            Logger.error("Unhandled Rejection", reason);
        });
    } catch (e) {
        Logger.error(`Failed to boostrap system due to reason: ${e.message}`, e);
    }
})();
