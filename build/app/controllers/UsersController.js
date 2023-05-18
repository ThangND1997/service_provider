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
exports.UsersController = void 0;
const inversify_1 = require("inversify");
const Types_1 = require("../../ioc/Types");
const exception_lib_1 = require("../../libs/exception.lib");
const error_code_1 = require("../../libs/error_code");
const http_code_1 = require("../../libs/http_code");
let UsersController = class UsersController {
    constructor(_usersService, _converter) {
        this._usersService = _usersService;
        this._converter = _converter;
    }
    async create(req, res, next) {
        try {
            const params = await this._converter.createRequestToDto(req.body) || {};
            const id = await this._usersService.create(params);
            res.json({ status: "Insert data successfully..", id });
        }
        catch (err) {
            next(err);
        }
    }
    async search(req, res, next) {
        try {
            const params = await this._converter.requestToDto(req.query) || {};
            const result = await this._usersService.search(params);
            delete result.password;
            res.status(200);
            res.json(result);
        }
        catch (err) {
            next(err);
        }
    }
    async update(req, res, next) {
        try {
            let id = req.params.id;
            const params = await this._converter.requestToDto(req.body) || {};
            params.id = id;
            await this._usersService.update(params);
            res.status(200);
            res.json({ status: "Update data successfully..", id });
        }
        catch (err) {
            next(err);
        }
    }
    async delete(req, res, next) {
        try {
            let id = req.params.id;
            await this._usersService.delete(id);
            res.status(200);
            res.json({ status: "Delete data successfully..", id });
        }
        catch (err) {
            next(err);
        }
    }
    async view(req, res, next) {
        try {
            let id = req.params.id;
            const result = await this._usersService.findById(id);
            delete result.password;
            res.status(200);
            res.json(result);
        }
        catch (err) {
            next(err);
        }
    }
    async login(req, res, next) {
        try {
            const account = (req.body.account).trim() || "";
            const password = (req.body.password).trim() || "";
            if (!account || !password) {
                throw new exception_lib_1.default(error_code_1.default.RESOURCE.MISSING_FIELD.CODE, error_code_1.default.RESOURCE.MISSING_FIELD.MESSAGE, false, http_code_1.default.BAD_REQUEST);
            }
            const token = await this._usersService.login(account, password);
            res.status(200);
            res.json({ status: "Login successfully.", token });
        }
        catch (err) {
            next(err);
        }
    }
};
UsersController = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(Types_1.TYPES.USERS_SERVICE)),
    __param(1, inversify_1.inject(Types_1.TYPES.USERS_CONVERTER)),
    __metadata("design:paramtypes", [Object, Object])
], UsersController);
exports.UsersController = UsersController;
exports.default = UsersController;
//# sourceMappingURL=UsersController.js.map