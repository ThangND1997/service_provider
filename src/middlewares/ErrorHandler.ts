import * as express from "express";
import { DBError } from "objection";
import { Logger } from "../core";
import ErrorCode from "../libs/error_code";

const notFoundHandler = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    next({
        statusCode: 404,
        message: "Resource Not Found"
    });
};

const errorHandler = (error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    const errorResponse = {
        code: ErrorCode.UNKNOWN.GENERIC.CODE,
        message: ErrorCode.UNKNOWN.GENERIC.MESSAGE
    };
    let httpStatus = 500;

    if (error.httpStatus) {
        httpStatus = error.httpStatus;
    }

    if (error.message) {
        if (!(error instanceof DBError) && error.code !== '22023') {
            errorResponse.message = error.message;
        }
    }

    if (error.code) {
        errorResponse.code = error.code;
    }

    Logger.error("Failed to handle request", error);

    res.status(httpStatus);
    res.json(errorResponse);
};

export {
    notFoundHandler,
    errorHandler
};