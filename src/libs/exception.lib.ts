/**
 * Created by kiettv on 9/29/16.
 */
import * as trace from "stack-trace";
import HttpStatus from "./http_code";

export class ExceptionModel implements Error {
    public name: string;
    public stack: any;
    public message: string;
    public code: number;
    public httpStatus: number;
    public field: string;
    public extension: ExceptionModel[];


    public static fromError(code: number, error: Error, stack?: boolean, httpStatus?: number): ExceptionModel {
        let exception = new ExceptionModel(code, error.message);
        exception.name = "ExceptionModel";
        exception.message = error.message;
        if (stack && error != null) {
            exception.stack = trace.parse(error);
        }
        if (httpStatus != null) {
            exception.httpStatus = httpStatus;
        } else {
            exception.httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return exception;
    }

    constructor(code: number, message: string, stack?: boolean, httpStatus?: number, field?: string) {
        this.name = "ExceptionModel";
        this.code = code;
        this.message = message;
        if (stack) {
            this.stack = trace.parse(<any>new Error());
        }
        if (httpStatus != null) {
            this.httpStatus = httpStatus;
        } else {
            this.httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        if (field) {
            this.field = field;
        }
    }

    public toString() {
        return `${this.name}: ${this.message}`;
    }
}

export default ExceptionModel;
