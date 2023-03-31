import * as express from "express";
interface CorsFunction {
    (res: express.Response): void;
}
export const cors = (handle?: CorsFunction): express.RequestHandler => {
    const corsMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction): any => {
        res.header("Connection", "close");
        res.header("Content-Type", "application/json; charset=utf-8");
        // restrict it to the required domain
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET,PUT,POST,PATCH,DELETE");
        // Set custom headers for CORS
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
export default cors;