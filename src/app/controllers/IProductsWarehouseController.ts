import * as express from "express";

interface IProductsWarehouseController {
    create(req: express.Request, res: express.Response, next: express.NextFunction): Promise<any>;
    search(req: express.Request, res: express.Response, next: express.NextFunction): Promise<any>;
    update(req: express.Request, res: express.Response, next: express.NextFunction): Promise<any>;
    addCategory(req: express.Request, res: express.Response, next: express.NextFunction): Promise<any>;
    retrieveCategory(req: express.Request, res: express.Response, next: express.NextFunction): Promise<any>;
    release(req: express.Request, res: express.Response, next: express.NextFunction): Promise<any>;
    delete(req: express.Request, res: express.Response, next: express.NextFunction): Promise<any>;
    // login(req: express.Request, res: express.Response, next: express.NextFunction): Promise<any>;
    // register(req: express.Request, res: express.Response, next: express.NextFunction): Promise<any>;
}

export default IProductsWarehouseController;