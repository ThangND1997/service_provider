import { injectable } from "inversify";
import { UsersDto } from "../dtos";
import { USERS_TABLE_SCHEMA } from "../migrations/database/schemas/Contants";
import { UsersModel } from "../models";
import IUsersConverter from "./IUsersConverter";
import ExceptionModel from "../../libs/exception.lib";
import ErrorCode from "../../libs/error_code";
import HttpStatus from "../../libs/http_code";

@injectable()
class UsersConverter implements IUsersConverter {
    public async modelToDto(model: UsersModel): Promise<UsersDto> {
        const dto: UsersDto = new UsersDto();

        if (model) {
            dto.id = model[USERS_TABLE_SCHEMA.FIELDS.ID];
            dto.createdDate = model[USERS_TABLE_SCHEMA.FIELDS.CREATED_DATE];
            dto.updatedDate = model[USERS_TABLE_SCHEMA.FIELDS.UPDATED_DATE];

            dto.name = model[USERS_TABLE_SCHEMA.FIELDS.NAME] || "";
            dto.email = model[USERS_TABLE_SCHEMA.FIELDS.EMAIL] || "";
            dto.avatarUrl = model[USERS_TABLE_SCHEMA.FIELDS.AVATAR_URL] || "";
            dto.phone = model[USERS_TABLE_SCHEMA.FIELDS.PHONE_NUMBER] || "";
            dto.note = model[USERS_TABLE_SCHEMA.FIELDS.NOTE] || "";
            dto.role = model[USERS_TABLE_SCHEMA.FIELDS.ROLE] || "";
            dto.expiryDate = model[USERS_TABLE_SCHEMA.FIELDS.EXPIRY_DATE] || "";
            dto.status = model[USERS_TABLE_SCHEMA.FIELDS.STATUS] || "";
            dto.address = model[USERS_TABLE_SCHEMA.FIELDS.ADDRESS] || "";
            dto.password = model[USERS_TABLE_SCHEMA.FIELDS.PASSWORD] || "";
        }

        return dto;
    }

    public async dtoToModel(dto: UsersDto): Promise<UsersModel> {
        const model: any = {};

        model[USERS_TABLE_SCHEMA.FIELDS.ID] = dto.id;
        model[USERS_TABLE_SCHEMA.FIELDS.IS_DELETED] = dto.isDeleted;
        model[USERS_TABLE_SCHEMA.FIELDS.IS_ENABLE] = dto.isEnable;
        model[USERS_TABLE_SCHEMA.FIELDS.CREATED_DATE] = dto.createdDate && dto.createdDate.toDate();
        model[USERS_TABLE_SCHEMA.FIELDS.UPDATED_DATE] = dto.updatedDate && dto.updatedDate.toDate();

        model[USERS_TABLE_SCHEMA.FIELDS.NAME] = dto.name;
        model[USERS_TABLE_SCHEMA.FIELDS.PHONE_NUMBER] = dto.phone;
        model[USERS_TABLE_SCHEMA.FIELDS.STATUS] = dto.status;
        model[USERS_TABLE_SCHEMA.FIELDS.ROLE] = dto.role;
        model[USERS_TABLE_SCHEMA.FIELDS.EMAIL] = dto.email;
        model[USERS_TABLE_SCHEMA.FIELDS.PASSWORD] = dto.password;
        model[USERS_TABLE_SCHEMA.FIELDS.AVATAR_URL] = dto.avatarUrl;
        model[USERS_TABLE_SCHEMA.FIELDS.NOTE] = dto.note;
        model[USERS_TABLE_SCHEMA.FIELDS.AVATAR_URL] = dto.expiryDate;
        model[USERS_TABLE_SCHEMA.FIELDS.ADDRESS] = dto.address;

        return model;
    }

    public async createRequestToDto(body: any): Promise<UsersDto> {
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

export default UsersConverter;
