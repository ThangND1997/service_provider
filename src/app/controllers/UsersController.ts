import * as express from "express";
import { inject, injectable } from "inversify";
import { IUsersConverter } from "../../data/converters";
import { TYPES } from "../../ioc/Types";
import IUsersService from "../services/IUsersService";
import IUsersController from "./IUsersController";
import { UsersDto } from "../../data/dtos";
import ExceptionModel from "../../libs/exception.lib";
import ErrorCode from "../../libs/error_code";
import HttpStatus from "../../libs/http_code";
import Utils from "../../libs/utils";

@injectable()
export class UsersController implements IUsersController {
    constructor(
        @inject(TYPES.USERS_SERVICE) private _usersService: IUsersService,
        @inject(TYPES.USERS_CONVERTER) private _converter: IUsersConverter
        ) {
    }
    
    public async create(req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> {
        try {
            const params: UsersDto = await this._converter.createRequestToDto(req.body) || {};
            const id = await this._usersService.create(params);
            res.json({status: "Insert data successfully..", id});
        }
        catch (err) {
            next(err)
        }
    }

    public async search(req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> {
        try {
            const params: UsersDto = this._converter.requestToDto(req.query) || {};
            const userInfor = await this._usersService.search(params);
            delete userInfor[0].password;
            res.status(200);
            res.json(userInfor);
        }
        catch (err) {
            next(err)
        }
    }

    public async update(req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> {
        try {
            let id: string = req.params.id;
            const params: UsersDto = this._converter.requestToDto(req.body) || {};
            params.id = id;
            await this._usersService.update(params);
            res.status(200);
            res.json({status: "Update data successfully..", id});
        }
        catch (err) {
            next(err)
        }
    }

    public async approve(req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> {
        try {
            let id: string = req.params.id;
            await this._usersService.approve(id);
            res.status(200);
            res.json({status: "Update successfully..", id});
        }
        catch (err) {
            next(err)
        }
    }

    public async reject(req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> {
        try {
            let id: string = req.params.id;
            await this._usersService.approve(id);
            res.status(200);
            res.json({status: "Update successfully..", id});
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
            delete result.password;
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
                throw new ExceptionModel(
                    ErrorCode.RESOURCE.MISSING_FIELD.CODE,
                    ErrorCode.RESOURCE.MISSING_FIELD.MESSAGE,
                    false,
                    HttpStatus.BAD_REQUEST
                );
            }

            const token = await this._usersService.login(account, password)
            res.status(200);
            res.json({status: "Login successfully.", token});
        }
        catch (err) {
            next(err)
        }
    }

    public async register(req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> {
        try {
            const usersDto: UsersDto = this._converter.registerRequestToDto(req.body) || {};
            
            await this._usersService.create(usersDto);
            
            res.status(200);
            res.json({status: "Register successfully.."});
        }
        catch (err) {
            next(err)
        }
    }
}

export default UsersController;