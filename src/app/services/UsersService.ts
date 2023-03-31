import * as express from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "../../ioc/Types";
import IUsersRepository from "../repositories/IUsersRepository";
import IUsersService from "./IUsersService";

@injectable()
export class UsersService implements IUsersService {
    constructor(@inject(TYPES.USERS_REPOSITORY) private _usersRepository: IUsersRepository) {
    }
    
    public async create(params: any): Promise<any> {
        const verifyUser = await this._usersRepository.findUserByEmail(params.email);
        if (verifyUser) {
            throw Error("Email is existing...")
        }
        return this._usersRepository.create(params);
    }

    public async search(params: any): Promise<any> {
        return this._usersRepository.search(params);
    }
}

export default UsersService;