"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cors = void 0;
const cors = (handle) => {
    const corsMiddleware = (req, res, next) => {
        res.header("Connection", "close");
        res.header("Content-Type", "application/json; charset=utf-8");
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET,PUT,POST,PATCH,DELETE");
        res.header("Access-Control-Allow-Headers", "Content-Type, Accept, Pragma, If-Modified-Since, Cache-Control, Authorization, device-os, unit-id, condo-id, app-version, password, x-auth-signature, x-icd-device-os, x-icd-unit-id, x-icd-condo-id, x-icd-app-version, x-icd-password, x-icd-date");
        res.header("Access-Control-Expose-Headers", "Total, Offset, Limit");
        if (handle != null) {
            handle(res);
        }
        if (req.method === "OPTIONS") {
            res.status(200).end();
        }
        else {
            next();
        }
    };
    return corsMiddleware;
};
exports.cors = cors;
exports.default = exports.cors;
//# sourceMappingURL=Cors.js.map