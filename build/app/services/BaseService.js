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
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
let BaseService = class BaseService {
    constructor(repository) {
        this._repository = repository;
    }
    findById(id, options) {
        return this._repository.findById(id, options);
    }
    insert(dto, trx) {
        return this._repository.insert(dto, trx);
    }
    insertAndFetch(dto, trx) {
        return this._repository.insertAndFetch(dto, trx);
    }
    bulkInsert(dtos, trx) {
        return this._repository.bulkInsert(dtos, trx);
    }
    updateById(id, dto, trx) {
        return this._repository.updateById(id, dto, trx);
    }
    updateByIds(ids, dto, trx) {
        return this._repository.updateByIds(ids, dto, trx);
    }
    updateAndFetchById(id, dto, trx) {
        return this._repository.updateAndFetchById(id, dto, trx);
    }
    deleteById(id, trx) {
        return this._repository.deleteById(id, trx);
    }
    softDeleteById(id, trx) {
        return this._repository.softDeleteById(id, trx);
    }
    generateUniqueID() {
        return this._repository.generateUniqueID();
    }
};
BaseService = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [Object])
], BaseService);
exports.default = BaseService;
//# sourceMappingURL=BaseService.js.map