import * as express from "express";
import { inject, injectable } from "inversify";
import { IUsersConverter } from "../../data/converters";
import { TYPES } from "../../ioc/Types";
import IUsersService from "../services/IUsersService";
import IUsersController from "./IUsersController";

@injectable()
export class UsersController implements IUsersController {
    constructor(
        @inject(TYPES.USERS_SERVICE) private _usersService: IUsersService,
        @inject(TYPES.USERS_CONVERTER) private _converter: IUsersConverter
        ) {
    }
    
    public async create(req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> {
        try {
            const params: any = await this._converter.requestToDto(req.body) || {};
            const id = await this._usersService.create(params);
            res.json({status: "Insert data successfully..", id});
        }
        catch (err) {
            next(err)
        }
    }

    public async search(req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> {
        try {
            const params: any = await this._converter.requestToDto(req.query) || {};
            const result = await this._usersService.search(params);
            res.status(200);
            res.json(result);
        }
        catch (err) {
            next(err)
        }
    }
}

export default UsersController;