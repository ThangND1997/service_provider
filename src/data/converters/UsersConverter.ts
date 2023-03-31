import { injectable } from "inversify";
import { UsersDto } from "../dtos";
import { USERS_TABLE_SCHEMA } from "../migrations/database/schemas/Contants";
import { UsersModel } from "../models";
import IUsersConverter from "./IUsersConverter";

@injectable()
class UsersConverter implements IUsersConverter {
    public async modelToDto(model: UsersModel): Promise<UsersDto> {
        const dto: UsersDto = new UsersDto();

        if (model) {
            dto.id = model[USERS_TABLE_SCHEMA.FIELDS.ID];
            dto.isDeleted = model[USERS_TABLE_SCHEMA.FIELDS.IS_DELETED];
            dto.isEnable = model[USERS_TABLE_SCHEMA.FIELDS.IS_ENABLE];
            dto.createdDate = model[USERS_TABLE_SCHEMA.FIELDS.CREATED_DATE];
            dto.updatedDate = model[USERS_TABLE_SCHEMA.FIELDS.UPDATED_DATE];

            dto.name = model[USERS_TABLE_SCHEMA.FIELDS.NAME] || "";
            dto.email = model[USERS_TABLE_SCHEMA.FIELDS.EMAIL] || "";
            dto.avatarUrl = model[USERS_TABLE_SCHEMA.FIELDS.AVATAR_URL] || "";
            dto.password = model[USERS_TABLE_SCHEMA.FIELDS.PASSWORD] || "";
            dto.phone = model[USERS_TABLE_SCHEMA.FIELDS.PHONE_NUMBER] || "";
            dto.note = model[USERS_TABLE_SCHEMA.FIELDS.NOTE] || "";
            dto.role = model[USERS_TABLE_SCHEMA.FIELDS.ROLE] || "";
            dto.expiryDate = model[USERS_TABLE_SCHEMA.FIELDS.EXPIRY_DATE] || "";
            dto.status = model[USERS_TABLE_SCHEMA.FIELDS.STATUS] || "";
            dto.address = model[USERS_TABLE_SCHEMA.FIELDS.ADDRESS] || "";
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

    public async requestToDto(body: any): Promise<UsersDto> {
        return body;
    }
}

export default UsersConverter;
