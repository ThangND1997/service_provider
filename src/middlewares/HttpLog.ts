import * as express from "express";
import * as pino from "pino";
import { isNil, omitBy } from 'lodash';
import * as UUID from "uuid";
const Logger: LogHandler = pino({
    name: "transport",
    enabled: process.env.NO_LOG !== "true",
    level: process.env.NODE_ENV === "development" ? "debug" : "info",
    redact: {
        paths: ['body.password'],
        censor: '**GDPR COMPLIANT**'
    }
});
interface LogHandler {
    error(meta: any, message: string): void;
    warn(meta: any, message: string): void;
    info(meta: any, message: string): void;
}

export const httpLogger = (ignorePaths: string[] = []): express.RequestHandler => {
    return (req: express.Request, res: any, next: express.NextFunction) => {
        if (req.path === '/' || req.path === '/favicon.ico') {
            return next();
        }
        res.locals.id = req.headers['x-request-id'] || UUID.v4();
        res.locals.method = req.method;
        res.locals.ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress) as string;
        res.locals.hostname = req.hostname;
        res.locals.protocol = req.protocol;
        res.locals.ctx = res.locals.ctx != null ? res.locals.ctx : {};
        res.locals.ctx.ip = res.locals.ip;
        res.locals.ctx.protocol = res.locals.protocol;
        res.locals.ctx.version = res.locals.version;
        req['id'] = res.locals.id;
        req['_startTime'] = Date.now();

        // Capture end function in Request object to calculate information
        let endFunc = res.end;
        res.end = (chunk: any, encoding: any) => {
            res.responseTime = Date.now() - req['_startTime'];
            res.end = endFunc;
            res.end(chunk, encoding);
            req.url = req.originalUrl || req.url;
            const format = `${req['id']} ${res.locals.ip} ${req.method} ${req.url} ${res.responseTime}ms ${chunk ? chunk.length : 0}bytes ${res.statusCode} ${res.statusMessage}`;
            const meta = {
                ip: res.locals.ip,
                method: req.method,
                path: req.path ? req.path : '',
                responseTime: res.responseTime,
                size: chunk ? chunk.length : 0,
                statusCode: res.statusCode,
                headers: req.headers,
                body: req.body ? req.body : {},
            };
            // trim headers
            meta.headers['accept'] = undefined;
            meta.headers['accept-encoding'] = undefined;
            meta.headers['accept-language'] = undefined;
            meta.headers['authorization'] = undefined;
            meta.headers['cache-control'] = undefined;
            meta.headers['connection'] = undefined;
            meta.headers['content'] = undefined;
            meta.headers['content-length'] = undefined;
            meta.headers['content-type'] = undefined;
            meta.headers['dnt'] = undefined;
            meta.headers['password'] = undefined;
            meta.headers['postman-token'] = undefined;
            meta.headers['pragma'] = undefined;
            meta.headers['registrar-id'] = undefined;
            meta.headers['sec-ch-ua'] = undefined;
            meta.headers['sec-ch-ua-arch'] = undefined;
            meta.headers['sec-ch-ua-bitness'] = undefined;
            meta.headers['sec-ch-ua-full-version'] = undefined;
            meta.headers['sec-ch-ua-mobile'] = undefined;
            meta.headers['sec-ch-ua-model'] = undefined;
            meta.headers['sec-ch-ua-platform'] = undefined;
            meta.headers['sec-ch-ua-platform-version'] = undefined;
            meta.headers['sec-fetch-dest'] = undefined;
            meta.headers['sec-fetch-mode'] = undefined;
            meta.headers['sec-fetch-site'] = undefined;
            meta.headers['user-agent'] = undefined;
            meta.headers['x-forwarded-for'] = undefined;
            meta.headers['x-forwarded-host'] = undefined;
            meta.headers['x-forwarded-port'] = undefined;
            meta.headers['x-forwarded-proto'] = undefined;
            meta.headers['x-real-ip'] = undefined;
            meta.headers['x-request-method'] = undefined;
            meta.headers['x-request-uri'] = undefined;
            meta.headers['x-scheme'] = undefined;
            meta.headers = omitBy(meta.headers, isNil);
            switch (true) {
                case (res.statusCode < 200):
                    Logger.warn(meta, format);
                    break;
                case (res.statusCode > 199 && res.statusCode < 400):
                    if (req.path !== '/oauth2/authz') {
                        Logger.info(meta, format);
                    }
                    break;
                case (res.statusCode > 399 && res.statusCode < 500):
                    Logger.warn(meta, format);
                    break;
                default:
                    Logger.error(meta, format);
            }
            endFunc = null;
        };
        next();
    };
};