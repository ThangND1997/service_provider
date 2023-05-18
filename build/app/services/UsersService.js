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
const inversify_1 = require("inversify");
const _1 = require(".");
const dtos_1 = require("../../data/dtos");
const Types_1 = require("../../ioc/Types");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const error_code_1 = require("../../libs/error_code");
const http_code_1 = require("../../libs/http_code");
const exception_lib_1 = require("../../libs/exception.lib");
const core_1 = require("../../core");
const momentTz = require("moment-timezone");
let UsersService = class UsersService extends _1.BaseService {
    constructor(_usersRepository, _sessionsRepository) {
        super(_usersRepository);
        this._usersRepository = _usersRepository;
        this._sessionsRepository = _sessionsRepository;
        this.saltRound = 10;
    }
    async create(data) {
        const verifyUser = await this._usersRepository.findUserByEmail(data.email);
        if (verifyUser) {
            throw new exception_lib_1.default(error_code_1.default.RESOURCE.EXISTED_ACCOUNT.CODE, error_code_1.default.RESOURCE.EXISTED_ACCOUNT.MESSAGE, false, http_code_1.default.BAD_REQUEST);
        }
        let passwordHash;
        let passwordNoHash = data.password;
        if (passwordNoHash) {
            try {
                const salt = await bcrypt.genSalt(this.saltRound);
                passwordHash = await bcrypt.hash(passwordNoHash, salt);
                data.password = passwordHash;
            }
            catch (error) {
                core_1.Logger.error("Handle faild hasd password.");
                throw new exception_lib_1.default(error_code_1.default.RESOURCE.VALIDATE_PASSWORD_FAILD.CODE, error_code_1.default.RESOURCE.VALIDATE_PASSWORD_FAILD.MESSAGE, false, http_code_1.default.BAD_REQUEST);
            }
        }
        else {
            throw new exception_lib_1.default(error_code_1.default.RESOURCE.MISSING_FIELD.CODE, error_code_1.default.RESOURCE.MISSING_FIELD.MESSAGE, false, http_code_1.default.BAD_REQUEST);
        }
        return this._usersRepository.create(data);
    }
    async search(params) {
        return this._usersRepository.search(params);
    }
    async update(params) {
        const oldData = await this.findById(params.id);
        if (!oldData) {
            throw new exception_lib_1.default(error_code_1.default.RESOURCE.NOT_EXIST_DATA.CODE, error_code_1.default.RESOURCE.NOT_EXIST_DATA.MESSAGE, false, http_code_1.default.BAD_REQUEST);
        }
        return this.updateById(params.id, params);
    }
    async delete(id) {
        return this.deleteById(id);
    }
    async findById(id) {
        return this._usersRepository.findById(id);
    }
    async login(account, password) {
        const oldData = await this._usersRepository.findUserAccount(account);
        if (!oldData || !oldData.password) {
            throw new exception_lib_1.default(error_code_1.default.RESOURCE.INVALID_ACCOUNT.CODE, error_code_1.default.RESOURCE.INVALID_ACCOUNT.MESSAGE, false, http_code_1.default.BAD_REQUEST);
        }
        const isValidatePassword = bcrypt.compareSync(password, oldData.password);
        if (!isValidatePassword) {
            throw new exception_lib_1.default(error_code_1.default.RESOURCE.VALIDATE_PASSWORD_FAILD.CODE, error_code_1.default.RESOURCE.VALIDATE_PASSWORD_FAILD.MESSAGE, false, http_code_1.default.BAD_REQUEST);
        }
        const payload = {
            userId: oldData.id,
        };
        const token = jwt.sign(payload, 'secret', { expiresIn: "100h" });
        const sessionModel = new dtos_1.SessionsDto();
        sessionModel.token = token;
        sessionModel.userId = oldData.id;
        sessionModel.expire = momentTz().add(5, "years").toISOString();
        sessionModel.hash = password;
        await this._sessionsRepository.insert(sessionModel);
        return token;
    }
};
UsersService = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(Types_1.TYPES.USERS_REPOSITORY)),
    __param(1, inversify_1.inject(Types_1.TYPES.SESSIONS_REPOSITORY)),
    __metadata("design:paramtypes", [Object, Object])
], UsersService);
exports.default = UsersService;
//# sourceMappingURL=UsersService.js.map