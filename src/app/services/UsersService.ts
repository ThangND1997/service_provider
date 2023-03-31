import { inject, injectable } from "inversify";
import { BaseService } from ".";
import { UsersDto } from "../../data/dtos";
import { TYPES } from "../../ioc/Types";
import IUsersRepository from "../repositories/IUsersRepository";
import IUsersService from "./IUsersService";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";

@injectable()
class UsersService extends BaseService<IUsersRepository, UsersDto> implements IUsersService {
    
    constructor(@inject(TYPES.USERS_REPOSITORY) private _usersRepository: IUsersRepository) {
        super(_usersRepository);
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

    public async update(params: any): Promise<any> {
        const oldData = await this.findById(params.id);
        if (!oldData) {
            throw Error("Record do not exist in DB.")
        }

        return this.updateById(params.id, params);
    }

    public async delete(id: string): Promise<any> {
        return this.deleteById(id);
    }

    public async login(account: string, password: string): Promise<any> {
        const oldData = await this._usersRepository.findUserAccount(account);
        if (!oldData) {
            throw new Error("Not Find Account In DB.")
        }

        const isValidatePassword = await bcrypt.compareSync(password, oldData.password);

        if (!isValidatePassword) {
            throw new Error("Password incorrect. Please try again");
        }

        const payload = {
            userId: oldData.id,
        }

        return jwt.sign(payload, 'secret', { expiresIn: "100h" });
    }
}

export default UsersService;