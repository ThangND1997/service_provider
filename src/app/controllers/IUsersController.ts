import * as express from "express";

interface IUsersController {
    create(req: express.Request, res: express.Response, next: express.NextFunction): Promise<any>;
    search(req: express.Request, res: express.Response, next: express.NextFunction): Promise<any>;
}

export default IUsersController;