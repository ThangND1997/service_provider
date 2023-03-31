import * as express from "express";

interface IUsersController {
    create(req: express.Request, res: express.Response, next: express.NextFunction): Promise<any>;
    search(req: express.Request, res: express.Response, next: express.NextFunction): Promise<any>;
    update(req: express.Request, res: express.Response, next: express.NextFunction): Promise<any>;
    view(req: express.Request, res: express.Response, next: express.NextFunction): Promise<any>;
    delete(req: express.Request, res: express.Response, next: express.NextFunction): Promise<any>;
    login(req: express.Request, res: express.Response, next: express.NextFunction): Promise<any>;
    // register(req: express.Request, res: express.Response, next: express.NextFunction): Promise<any>;
}

export default IUsersController;