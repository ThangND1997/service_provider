import { inject, injectable } from "inversify";
import IUsersRepository from "./IUsersRepository";
import * as uuid from 'uuid'
import { PostgresConnection } from "../../infrastructure/Postgres";
import { BaseRepository } from ".";
import { TYPES } from "../../ioc/Types";
import { UsersModel } from "../../data/models";
import { UsersDto } from "../../data/dtos";
import { IUsersConverter } from "../../data/converters";
import { USERS_TABLE_SCHEMA } from "../../data/migrations/database/schemas/Contants";
import { Service } from "typedi";
import { IOCServiceName } from "../../ioc/IocServiceName";


@injectable()
@Service(IOCServiceName.USER_REPOSITORY)
export class UsersRepository extends BaseRepository<UsersModel, UsersDto> implements IUsersRepository {
    
    constructor(@inject(TYPES.USERS_CONVERTER)  _converter: IUsersConverter) {
        super(UsersModel, _converter);
    }

    public async create(params: any): Promise<any> {
        return this.insert(params);
    }

    public async search(params: any): Promise<any> {
        const name = params.name || "";
        const email = params.email || "";
        const status = params.status || "";
        return this.findByQuery(q => {
            q.where(USERS_TABLE_SCHEMA.FIELDS.IS_DELETED, false);
            q.where(USERS_TABLE_SCHEMA.FIELDS.IS_ENABLE, true);

            if (name) {
                q.where(USERS_TABLE_SCHEMA.FIELDS.NAME, "ILIKE", `%${name}%`);
            }
            if (email) {
                q.where(USERS_TABLE_SCHEMA.FIELDS.EMAIL, "ILIKE", `%${email}%`);
            }
            if (status) {
                q.where(USERS_TABLE_SCHEMA.FIELDS.STATUS, status);
            }

            q.offset(params.offset || 0);
            q.limit(params.limit || 10);
        });
    }

    public async findUserByEmail(email: string): Promise<UsersDto> {
        return this.findOneByQuery(q => {
            q.where(USERS_TABLE_SCHEMA.FIELDS.IS_DELETED, false);
            q.where(USERS_TABLE_SCHEMA.FIELDS.EMAIL, email);
        })
    }

    public async findUserAccount(account: string): Promise<UsersDto> {
        return this.findOneByQuery(q => {
            q.where(USERS_TABLE_SCHEMA.FIELDS.EMAIL, account);
            q.orWhere(USERS_TABLE_SCHEMA.FIELDS.ACCOUNT, account)
        })
    }

    public async getById(id: string): Promise<any> {
        const result = await this.findOneByQuery(q => {
            q.where(USERS_TABLE_SCHEMA.FIELDS.ID, id);
        })
        return result;
    }

}
export default UsersRepository;