"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const dtos_1 = require("../dtos");
const Contants_1 = require("../migrations/database/schemas/Contants");
const exception_lib_1 = require("../../libs/exception.lib");
const error_code_1 = require("../../libs/error_code");
const http_code_1 = require("../../libs/http_code");
let UsersConverter = class UsersConverter {
    async modelToDto(model) {
        const dto = new dtos_1.UsersDto();
        if (model) {
            dto.id = model[Contants_1.USERS_TABLE_SCHEMA.FIELDS.ID];
            dto.createdDate = model[Contants_1.USERS_TABLE_SCHEMA.FIELDS.CREATED_DATE];
            dto.updatedDate = model[Contants_1.USERS_TABLE_SCHEMA.FIELDS.UPDATED_DATE];
            dto.name = model[Contants_1.USERS_TABLE_SCHEMA.FIELDS.NAME] || "";
            dto.email = model[Contants_1.USERS_TABLE_SCHEMA.FIELDS.EMAIL] || "";
            dto.avatarUrl = model[Contants_1.USERS_TABLE_SCHEMA.FIELDS.AVATAR_URL] || "";
            dto.phone = model[Contants_1.USERS_TABLE_SCHEMA.FIELDS.PHONE_NUMBER] || "";
            dto.note = model[Contants_1.USERS_TABLE_SCHEMA.FIELDS.NOTE] || "";
            dto.role = model[Contants_1.USERS_TABLE_SCHEMA.FIELDS.ROLE] || "";
            dto.expiryDate = model[Contants_1.USERS_TABLE_SCHEMA.FIELDS.EXPIRY_DATE] || "";
            dto.status = model[Contants_1.USERS_TABLE_SCHEMA.FIELDS.STATUS] || "";
            dto.address = model[Contants_1.USERS_TABLE_SCHEMA.FIELDS.ADDRESS] || "";
            dto.password = model[Contants_1.USERS_TABLE_SCHEMA.FIELDS.PASSWORD] || "";
        }
        return dto;
    }
    async dtoToModel(dto) {
        const model = {};
        model[Contants_1.USERS_TABLE_SCHEMA.FIELDS.ID] = dto.id;
        model[Contants_1.USERS_TABLE_SCHEMA.FIELDS.IS_DELETED] = dto.isDeleted;
        model[Contants_1.USERS_TABLE_SCHEMA.FIELDS.IS_ENABLE] = dto.isEnable;
        model[Contants_1.USERS_TABLE_SCHEMA.FIELDS.CREATED_DATE] = dto.createdDate && dto.createdDate.toDate();
        model[Contants_1.USERS_TABLE_SCHEMA.FIELDS.UPDATED_DATE] = dto.updatedDate && dto.updatedDate.toDate();
        model[Contants_1.USERS_TABLE_SCHEMA.FIELDS.NAME] = dto.name;
        model[Contants_1.USERS_TABLE_SCHEMA.FIELDS.PHONE_NUMBER] = dto.phone;
        model[Contants_1.USERS_TABLE_SCHEMA.FIELDS.STATUS] = dto.status;
        model[Contants_1.USERS_TABLE_SCHEMA.FIELDS.ROLE] = dto.role;
        model[Contants_1.USERS_TABLE_SCHEMA.FIELDS.EMAIL] = dto.email;
        model[Contants_1.USERS_TABLE_SCHEMA.FIELDS.PASSWORD] = dto.password;
        model[Contants_1.USERS_TABLE_SCHEMA.FIELDS.AVATAR_URL] = dto.avatarUrl;
        model[Contants_1.USERS_TABLE_SCHEMA.FIELDS.NOTE] = dto.note;
        model[Contants_1.USERS_TABLE_SCHEMA.FIELDS.AVATAR_URL] = dto.expiryDate;
        model[Contants_1.USERS_TABLE_SCHEMA.FIELDS.ADDRESS] = dto.address;
        return model;
    }
    async createRequestToDto(body) {
        if (!body.email) {
            throw new exception_lib_1.default(error_code_1.default.RESOURCE.MISSING_FIELD.CODE, error_code_1.default.RESOURCE.MISSING_FIELD.MESSAGE, false, http_code_1.default.BAD_REQUEST);
        }
        return body;
    }
    requestToDto(params) {
        return params;
    }
};
UsersConverter = __decorate([
    inversify_1.injectable()
], UsersConverter);
exports.default = UsersConverter;
//# sourceMappingURL=UsersConverter.js.map