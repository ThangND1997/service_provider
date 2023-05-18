import { injectable } from "inversify";
import { SessionsDto } from "../dtos";
import { SESSIONS_TABLE_SCHEMA } from "../migrations/database/schemas/Contants";
import { SessionsModel } from "../models";
import ISessionsConverter from "./ISessionsConverter";
import ExceptionModel from "../../libs/exception.lib";
import ErrorCode from "../../libs/error_code";
import HttpStatus from "../../libs/http_code";

@injectable()
class SessionsConverter implements ISessionsConverter {
    public async modelToDto(model: SessionsModel): Promise<SessionsDto> {
        const dto: SessionsDto = new SessionsDto();

        if (model) {
            dto.id = model[SESSIONS_TABLE_SCHEMA.FIELDS.ID];
            dto.createdDate = model[SESSIONS_TABLE_SCHEMA.FIELDS.CREATED_DATE];
            dto.updatedDate = model[SESSIONS_TABLE_SCHEMA.FIELDS.UPDATED_DATE];

            dto.token = model[SESSIONS_TABLE_SCHEMA.FIELDS.TOKEN] || "";
            dto.expire = model[SESSIONS_TABLE_SCHEMA.FIELDS.EXPIRE] || "";
            dto.userId = model[SESSIONS_TABLE_SCHEMA.FIELDS.USER_ID] || "";
            dto.hash = model[SESSIONS_TABLE_SCHEMA.FIELDS.HASH] || "";
        }

        return dto;
    }

    public async dtoToModel(dto: SessionsDto): Promise<SessionsModel> {
        const model: any = {};

        model[SESSIONS_TABLE_SCHEMA.FIELDS.ID] = dto.id;
        model[SESSIONS_TABLE_SCHEMA.FIELDS.IS_DELETED] = dto.isDeleted;
        model[SESSIONS_TABLE_SCHEMA.FIELDS.IS_ENABLE] = dto.isEnable;
        model[SESSIONS_TABLE_SCHEMA.FIELDS.CREATED_DATE] = dto.createdDate && dto.createdDate.toDate();
        model[SESSIONS_TABLE_SCHEMA.FIELDS.UPDATED_DATE] = dto.updatedDate && dto.updatedDate.toDate();

        model[SESSIONS_TABLE_SCHEMA.FIELDS.TOKEN] = dto.token;
        model[SESSIONS_TABLE_SCHEMA.FIELDS.EXPIRE] = dto.expire;
        model[SESSIONS_TABLE_SCHEMA.FIELDS.USER_ID] = dto.userId;
        model[SESSIONS_TABLE_SCHEMA.FIELDS.HASH] = dto.hash;

        return model;
    }

    public async createRequestToDto(body: any): Promise<SessionsDto> {
        if (!body.email) {
            throw new ExceptionModel(
                ErrorCode.RESOURCE.MISSING_FIELD.CODE,
                ErrorCode.RESOURCE.MISSING_FIELD.MESSAGE,
                false,
                HttpStatus.BAD_REQUEST
            );
        }
        return body;
    }

    public requestToDto(params: any): any {
        return params;
    }
}

export default SessionsConverter;
