import { inject, injectable } from "inversify";
import { uuid } from 'uuidv4';
import { BaseService } from ".";
import { SessionsDto, UsersDto } from "../../data/dtos";
import { TYPES } from "../../ioc/Types";
import IUsersRepository from "../repositories/IUsersRepository";
import IUsersService from "./IUsersService";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import ErrorCode from "../../libs/error_code";
import HttpStatus from "../../libs/http_code";
import ExceptionModel from "../../libs/exception.lib";
import { Logger } from "../../core";
import ISessionsRepository from "../repositories/ISessionsRepository";
import * as momentTz from "moment-timezone";

@injectable()
class UsersService extends BaseService<IUsersRepository, UsersDto> implements IUsersService {
    
    // rome-ignore lint/correctness/noUnreachableSuper: <explanation>
constructor(@inject(TYPES.USERS_REPOSITORY) private _usersRepository: IUsersRepository,
    @inject(TYPES.SESSIONS_REPOSITORY) private _sessionsRepository: ISessionsRepository) {
        super(_usersRepository);
    }

    saltRound = 10;
    
    public async create(data: UsersDto): Promise<any> {
        const verifyUser = await this._usersRepository.findUserByEmail(data.email);
        if (verifyUser) {
            throw new ExceptionModel(
                ErrorCode.RESOURCE.EXISTED_ACCOUNT.CODE,
                ErrorCode.RESOURCE.EXISTED_ACCOUNT.MESSAGE,
                false,
                HttpStatus.BAD_REQUEST
            );
        }
        let passwordHash: string;
        let passwordNoHash = data.password;
        if (passwordNoHash) {
            try {
                const salt = await bcrypt.genSalt(this.saltRound);
                passwordHash = await bcrypt.hash(passwordNoHash, salt);
                data.password = passwordHash;
            } catch (error) {
                Logger.error("Handle faild hasd password.")
                throw new ExceptionModel(
                    ErrorCode.RESOURCE.VALIDATE_PASSWORD_FAILD.CODE,
                    ErrorCode.RESOURCE.VALIDATE_PASSWORD_FAILD.MESSAGE,
                    false,
                    HttpStatus.BAD_REQUEST
                );
            }
        }
        else {
            throw new ExceptionModel(
                ErrorCode.RESOURCE.MISSING_FIELD.CODE,
                ErrorCode.RESOURCE.MISSING_FIELD.MESSAGE,
                false,
                HttpStatus.BAD_REQUEST
            );
        }

        return this._usersRepository.create(data);
    }

    public async search(params: any): Promise<any> {
        return this._usersRepository.search(params);
    }

    public async update(params: any): Promise<any> {
        const oldData = await this.findById(params.id);
        if (!oldData) {
            throw new ExceptionModel(
                ErrorCode.RESOURCE.NOT_EXIST_DATA.CODE,
                ErrorCode.RESOURCE.NOT_EXIST_DATA.MESSAGE,
                false,
                HttpStatus.BAD_REQUEST
            );
            
        }

        return this.updateById(params.id, params);
    }

    public async delete(id: string): Promise<any> {
        return this.deleteById(id);
    }

    public async findById(id: string): Promise<UsersDto> {
        return this._usersRepository.findById(id);
    }

    public async login(account: string, password: string): Promise<any> {
        const oldData = await this._usersRepository.findUserAccount(account);
        if (!oldData || !oldData.password) {
            throw new ExceptionModel(
                ErrorCode.RESOURCE.INVALID_ACCOUNT.CODE,
                ErrorCode.RESOURCE.INVALID_ACCOUNT.MESSAGE,
                false,
                HttpStatus.BAD_REQUEST
            );
        }

        const isValidatePassword = bcrypt.compareSync(password, oldData.password);

        if (!isValidatePassword) {
            throw new ExceptionModel(
                ErrorCode.RESOURCE.VALIDATE_PASSWORD_FAILD.CODE,
                ErrorCode.RESOURCE.VALIDATE_PASSWORD_FAILD.MESSAGE,
                false,
                HttpStatus.BAD_REQUEST
            );
        }

        const payload = {
            userId: oldData.id,
        }

        const token = jwt.sign(payload, 'secret', { expiresIn: "100h" });
        const sessionModel = new SessionsDto();
        sessionModel.token = token;
        sessionModel.userId = oldData.id!;
        sessionModel.expire = momentTz().add(5, "years").toISOString();
        sessionModel.hash = password;

        await this._sessionsRepository.insert(sessionModel);
        return token;
    }
}

export default UsersService;