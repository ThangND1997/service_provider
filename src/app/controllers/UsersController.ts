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

    public async update(req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> {
        try {
            let id: string = req.params.id;
            const params: any = await this._converter.requestToDto(req.body) || {};
            params.id = id;
            await this._usersService.update(params);
            res.status(200);
            res.json({status: "Update data successfully..", id});
        }
        catch (err) {
            next(err)
        }
    }

    public async delete(req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> {
        try {
            let id: string = req.params.id;
            await this._usersService.delete(id);
            res.status(200);
            res.json({status: "Delete data successfully..", id});
        }
        catch (err) {
            next(err)
        }
    }

    public async view(req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> {
        try {
            let id: string = req.params.id;
            const result = await this._usersService.findById(id);
            res.status(200);
            res.json(result);
        }
        catch (err) {
            next(err)
        }
    }

    public async login(req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> {
        try {
            const account: string = (req.body.account).trim() || "";
            const password: string = (req.body.password).trim() || "";

            if (!account || !password) {
                throw new Error("Missing Require Field.")
            }

            const token = await this._usersService.login(account, password)
            res.status(200);
            res.json({status: "Login successfully..", token});
        }
        catch (err) {
            next(err)
        }
    }

    // public async register(req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> {
    //     try {
    //         const saltRound = 10;
    //         const account: string = (req.body.account).trim() || "";
    //         const password: string = (req.body.password).trim() || "";

    //         if (!account || !password) {
    //             throw new Error("Missing Require Field.")
    //         }

    //         const token = await this._usersService.login(account, password)
    //         res.status(200);
    //         res.json({status: "Login successfully..", token});
    //     }
    //     catch (err) {
    //         next(err)
    //     }
    // }
}

export default UsersController;