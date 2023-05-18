"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExceptionModel = void 0;
const trace = require("stack-trace");
const http_code_1 = require("./http_code");
class ExceptionModel {
    constructor(code, message, stack, httpStatus, field) {
        this.name = "ExceptionModel";
        this.code = code;
        this.message = message;
        if (stack) {
            this.stack = trace.parse(new Error());
        }
        if (httpStatus != null) {
            this.httpStatus = httpStatus;
        }
        else {
            this.httpStatus = http_code_1.default.INTERNAL_SERVER_ERROR;
        }
        if (field) {
            this.field = field;
        }
    }
    static fromError(code, error, stack, httpStatus) {
        let exception = new ExceptionModel(code, error.message);
        exception.name = "ExceptionModel";
        exception.message = error.message;
        if (stack && error != null) {
            exception.stack = trace.parse(error);
        }
        if (httpStatus != null) {
            exception.httpStatus = httpStatus;
        }
        else {
            exception.httpStatus = http_code_1.default.INTERNAL_SERVER_ERROR;
        }
        return exception;
    }
    toString() {
        return `${this.name}: ${this.message}`;
    }
}
exports.ExceptionModel = ExceptionModel;
exports.default = ExceptionModel;
//# sourceMappingURL=exception.lib.js.map