import * as express from "express";
import * as compression from "compression";
import * as helmet from "helmet";
import { PostgresConnection } from "./infrastructure/Postgres";
import { Logger } from "./core";
import Router from "./app/routes"
import { httpLogger } from "./middlewares/HttpLog";
import cors from "./middlewares/Cors";
import recover from "./middlewares/recover";
import ExceptionModel from "./libs/exception.lib";
import ErrorCode from "./libs/error_code";
import HttpStatus from "./libs/http_code";
import { errorHandler, notFoundHandler } from "./middlewares/ErrorHandler";
import {json, urlencoded} from "body-parser";

const HTTP_PORT = process.env.PORT || 4000;

function rawBodySaver(req, res, buf, encoding) {
    if (buf && buf.length) {
        req.bufferBody = buf;
    }
}

const startServer = () => {
    const app = express();

    app.use(json({ limit: "5mb", verify: rawBodySaver }));
    app.use(urlencoded({ limit: "5mb", extended: false, verify: rawBodySaver }));
    app.use(cors());
    app.use(helmet());
    app.use(compression());
    app.use("/", Router);
    app.use(httpLogger());
    app.use(notFoundHandler);
    app.use(errorHandler);
    app.use(recover((error: any, res: express.Response): void => {
        Logger.error(error.message ? error.message : "Unknown error", error);
        let err: any;
        if (error.httpStatus != null) {
            err = error as any;
        } else if (error) {
            // DB error: BaseDto.NotFoundError, BaseDto.NoRowsDeletedError, BaseDto.NoRowsUpdatedError
            err = new ExceptionModel(
                ErrorCode.RESOURCE.NOT_FOUND.CODE,
                ErrorCode.RESOURCE.NOT_FOUND.MESSAGE,
                false,
                HttpStatus.NOT_FOUND,
            );
        } else {
            err = ExceptionModel.fromError(ErrorCode.UNKNOWN.GENERIC.CODE, err, true);
        }

        res.status(err.httpStatus);
        err.name = undefined;
        err.httpStatus = undefined;
        err.stack = undefined;
        res.json(err);
    }));

    app.listen(process.env.PORT || 4000, () => {
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
