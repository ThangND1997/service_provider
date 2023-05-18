"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recover = void 0;
const recover = (handle) => {
    let fallback = (error, res) => {
        res.status(500);
        res.end();
    };
    let handler = handle || fallback;
    return (error, req, res, next) => {
        handler(error, res);
        if (!res.finished) {
            fallback(error, res);
        }
    };
};
exports.recover = recover;
exports.default = exports.recover;
//# sourceMappingURL=recover.js.map