
import * as pino from "pino";
export interface ILogger {
    error(message: string, meta?: any): void;
    warn(message: string, meta?: any): void;
    info(message: string, meta?: any): void;
    debug(message: string, meta?: any): void;
}


class Logger implements ILogger {
    private processLogger: pino.Logger;
    private transportLogger: pino.Logger;

    constructor() {
        this.processLogger = pino({
            name: "process",
            enabled: process.env.NO_LOG !== "true",
            level: process.env.NODE_ENV === "development" ? "debug" : "info",
        });

        this.transportLogger = pino({
            name: "transport",
            enabled: process.env.NO_LOG !== "true",
            level: process.env.NODE_ENV === "development" ? "debug" : "info",
        });
    }

    public getTransportLogger(): ILogger {
        return this.transportLogger;
    }

    public error(message: string, meta?: any, ...args: any[]): void {
        if (meta != null) {
            this.removeMetaHeader(meta);
            if (meta instanceof Error && meta.stack != null) {
                const msg = meta.message;

                this.processLogger.error({ ...meta, message: msg }, message, ...args);
            } else {
                this.processLogger.error(meta, message, ...args);
            }
        } else {
            this.removeMetaHeader(meta);
            this.processLogger.error(message, ...args);
        }
    }

    public warn(message: string, meta?: any, ...args: any[]): void {
        if (meta != null) {
            this.removeMetaHeader(meta);
            this.processLogger.warn(meta, message, ...args);
        } else {
            this.processLogger.warn(message, ...args);
        }
    }

    public info(message: string, meta?: any, ...args: any[]): void {
        if (meta != null) {
            this.removeMetaHeader(meta);
            this.processLogger.info(meta, message, ...args);
        } else {
            this.processLogger.info(message, ...args);
        }
    }

    public debug(message: string, meta?: any, ...args: any[]): void {
        if (meta != null) {
            this.removeMetaHeader(meta);
            this.processLogger.debug(meta, message, ...args);
        } else {
            this.processLogger.debug(message,);
        }
    }

    private removeMetaHeader(meta: any) {
        // remove headers
        if (meta && meta.headers) {
            meta.headers["accept"] = undefined;
            meta.headers["accept-encoding"] = undefined;
            meta.headers["authorization"] = undefined;
            meta.headers["connection"] = undefined;
            meta.headers["content"] = undefined;
            meta.headers["content-length"] = undefined;
            meta.headers["content-type"] = undefined;
            meta.headers["registrar-id"] = undefined;
            meta.headers["sec-ch-ua"] = undefined;
            meta.headers["sec-ch-ua-mobile"] = undefined;
            meta.headers["sec-fetch-dest"] = undefined;
            meta.headers["sec-fetch-mode"] = undefined;
            meta.headers["sec-fetch-site"] = undefined;
            meta.headers["x-forwarded-for"] = undefined;
            meta.headers["x-forwarded-host"] = undefined;
            meta.headers["x-forwarded-port"] = undefined;
            meta.headers["x-forwarded-proto"] = undefined;
            meta.headers["x-real-ip"] = undefined;
            meta.headers["x-scheme"] = undefined;
        }
        return meta;
    }
}
export default Logger;
