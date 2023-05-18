import { inject, injectable } from "inversify";
import ISessionsRepository from "./ISessionsRepository";
import * as uuid from 'uuid'
import { PostgresConnection } from "../../infrastructure/Postgres";
import { BaseRepository } from ".";
import { TYPES } from "../../ioc/Types";
import { SessionsModel, UsersModel } from "../../data/models";
import { SessionsDto, UsersDto } from "../../data/dtos";
import { ISessionsConverter, IUsersConverter } from "../../data/converters";
import { USERS_TABLE_SCHEMA } from "../../data/migrations/database/schemas/Contants";


@injectable()
export class SessionsRepository extends BaseRepository<SessionsModel, SessionsDto> implements ISessionsRepository {
    constructor(@inject(TYPES.SESSIONS_CONVERTER) converter: ISessionsConverter) {
        super(SessionsModel, converter);
    }
}

export default SessionsRepository;