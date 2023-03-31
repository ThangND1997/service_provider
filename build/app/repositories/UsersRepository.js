"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRepository = void 0;
const inversify_1 = require("inversify");
const _1 = require(".");
const Types_1 = require("../../ioc/Types");
const models_1 = require("../../data/models");
const Contants_1 = require("../../data/migrations/database/schemas/Contants");
let UsersRepository = class UsersRepository extends _1.BaseRepository {
    constructor(converter) {
        super(models_1.UsersModel, converter);
    }
    async create(params) {
        return this.insert(params);
    }
    async search(params) {
        const name = params.name || "";
        const email = params.email || "";
        const status = params.status || "";
        return this.findByQuery(q => {
            q.where(Contants_1.USERS_TABLE_SCHEMA.FIELDS.IS_DELETED, false);
            q.where(Contants_1.USERS_TABLE_SCHEMA.FIELDS.IS_ENABLE, true);
            if (name) {
                q.where(Contants_1.USERS_TABLE_SCHEMA.FIELDS.NAME, "ILIKE", `%${name}%`);
            }
            if (email) {
                q.where(Contants_1.USERS_TABLE_SCHEMA.FIELDS.EMAIL, "ILIKE", `%${email}%`);
            }
            if (status) {
                q.where(Contants_1.USERS_TABLE_SCHEMA.FIELDS.STATUS, status);
            }
            q.offset(params.offset || 0);
            q.limit(params.limit || 10);
        });
    }
    async findUserByEmail(email) {
        return this.findOneByQuery(q => {
            q.where(Contants_1.USERS_TABLE_SCHEMA.FIELDS.IS_DELETED, false);
            q.where(Contants_1.USERS_TABLE_SCHEMA.FIELDS.EMAIL, email);
        });
    }
    async findUserAccount(account) {
        return this.findOneByQuery(q => {
            q.where(Contants_1.USERS_TABLE_SCHEMA.FIELDS.EMAIL, account);
            q.orWhere(Contants_1.USERS_TABLE_SCHEMA.FIELDS.ACCOUNT, account);
        });
    }
};
UsersRepository = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(Types_1.TYPES.USERS_CONVERTER)),
    __metadata("design:paramtypes", [Object])
], UsersRepository);
exports.UsersRepository = UsersRepository;
exports.default = UsersRepository;
//# sourceMappingURL=UsersRepository.js.map