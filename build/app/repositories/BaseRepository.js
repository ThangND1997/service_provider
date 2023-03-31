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
const uuid = require("uuid");
const momentTz = require("moment-timezone");
const _ = require("lodash");
const core_1 = require("../../core");
const models_1 = require("../../data/models");
let BaseRepository = class BaseRepository {
    constructor(dtoClass, converter) {
        this._modelClass = dtoClass;
        this._converter = converter;
    }
    async findByQuery(callback, options = {}) {
        let query = this._modelClass.query();
        if (options.relations && options.relations.length) {
            const formatRelation = this.formatRelations(options.relations);
            query = query.withGraphFetched(formatRelation);
        }
        callback(query);
        const models = await query;
        return this.toListDto(models);
    }
    async findDistinctByQuery(callback, column, options = {}) {
        let query = this._modelClass.query().distinct(column);
        if (options.relations && options.relations.length) {
            const formatRelation = this.formatRelations(options.relations);
            query = query.withGraphFetched(formatRelation);
        }
        callback(query);
        const models = await query;
        return this.toListDto(models);
    }
    async countByQuery(callback) {
        let query = this._modelClass.query().count("*");
        callback(query);
        const [rs] = await query;
        return (rs && Number(rs["count"])) || 0;
    }
    async countDistinctByQuery(callback, column) {
        let query = this._modelClass.query().countDistinct(column);
        callback(query);
        const [rs] = await query;
        return (rs && Number(rs["count"])) || 0;
    }
    async findById(id, options = {}) {
        let query = this._modelClass.query();
        if (options.relations && options.relations.length) {
            const formatRelation = this.formatRelations(options.relations);
            query = query.withGraphFetched(formatRelation);
        }
        const rs = await query.findById(id);
        return rs && this._converter.modelToDto(rs);
    }
    async findOneByQuery(callback, options = {}) {
        let query = this._modelClass.query().findOne(callback);
        if (options.relations && options.relations.length) {
            const formatRelation = this.formatRelations(options.relations);
            query = query.withGraphFetched(formatRelation);
        }
        ;
        const rs = await query;
        return rs && this._converter.modelToDto(rs);
    }
    async insert(data, trx) {
        if (!data.id) {
            data.id = this.generateUniqueID();
        }
        const model = await this._converter.dtoToModel(data);
        const rs = await this._modelClass.query(trx).insert(model);
        return rs[models_1.BaseModel.idColumn];
    }
    async bulkInsert(dtos, trx) {
        const models = [];
        for (let dto of dtos) {
            if (!dto.id) {
                dto.id = this.generateUniqueID();
            }
            const model = await this._converter.dtoToModel(dto);
            models.push(model);
        }
        return this._modelClass.query(trx).insert(models);
    }
    async insertAndFetch(data, trx) {
        if (!data.id) {
            data.id = this.generateUniqueID();
        }
        const model = await this._converter.dtoToModel(data);
        const rs = await this._modelClass.query(trx).insertAndFetch(model);
        return this._converter.modelToDto(rs);
    }
    async updateById(id, data, trx) {
        const model = await this._converter.dtoToModel(data);
        delete model[models_1.BaseModel.idColumn];
        const numUpdated = await this._modelClass.query(trx)
            .findById(id)
            .patch(model);
        if (numUpdated === 0) {
            core_1.Logger.error(`Update failed: Cannot find resource ${this._modelClass.name} by id ${id}`);
            throw new Error(`Update failed: Resource not found`);
        }
        return id;
    }
    updateByIds(ids, dto, trx) {
        return this.updateByQuery((qb) => {
            qb.whereIn("id", ids);
        }, dto, trx);
    }
    async updateAndFetchById(id, data, trx) {
        const model = await this._converter.dtoToModel(data);
        delete model[models_1.BaseModel.idColumn];
        const updatedModel = await this._modelClass.query(trx).patchAndFetchById(id, model);
        return this._converter.modelToDto(updatedModel);
    }
    async updateByQuery(callback, data, trx) {
        const model = await this._converter.dtoToModel(data);
        delete model[models_1.BaseModel.idColumn];
        const query = this._modelClass.query(trx).patch(model);
        callback(query);
        return query;
    }
    async deleteById(id, trx) {
        const numDeleted = await this._modelClass.query(trx).deleteById(id);
        return numDeleted > 0;
    }
    deleteByQuery(callback, trx) {
        const query = this._modelClass.query(trx).delete();
        callback(query);
        return query;
    }
    async softDeleteById(id, trx) {
        return this.updateById(id, { isDeleted: true }, trx);
    }
    async softDeleteByQuery(callback, trx) {
        return this.updateByQuery(callback, { isDeleted: true }, trx);
    }
    async upsert(dto, conflictColumns) {
        dto.id = dto.id || this.generateUniqueID();
        const model = await this._converter.dtoToModel(dto);
        const [updatedModel] = await this.knex()(this._modelClass.tableName)
            .insert(model)
            .onConflict(conflictColumns)
            .merge()
            .returning("*");
        return this._converter.modelToDto(updatedModel);
    }
    async raw(sql, bingdings = []) {
        const formattedBindings = this.formatBindingValues(bingdings);
        return this.knex().raw(sql, formattedBindings);
    }
    async rawQuery(sql, bingdings = []) {
        const formattedBindings = this.formatBindingValues(bingdings);
        const rs = await this.knex().raw(sql, formattedBindings);
        return rs.rows;
    }
    knex() {
        return this._modelClass.knex();
    }
    generateUniqueID() {
        return uuid.v4();
    }
    getCountQueryParams(queryParams) {
        const countQueryParams = _.cloneDeep(queryParams);
        delete countQueryParams.offset;
        delete countQueryParams.limit;
        delete countQueryParams.orderBy;
        delete countQueryParams.orderType;
        countQueryParams._isCount = true;
        return countQueryParams;
    }
    formatBindingValues(bingdings) {
        const rs = [];
        for (let binding of bingdings) {
            if (momentTz.isMoment(binding)) {
                binding = binding.toDate();
            }
            rs.push(binding);
        }
        return rs;
    }
    formatRelations(relations) {
        return `[${relations.toString()}]`;
    }
    async toListDto(models) {
        const results = [];
        for (let model of models) {
            if (model) {
                results.push(await this._converter.modelToDto(model));
            }
        }
        return results;
    }
};
BaseRepository = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.unmanaged()),
    __metadata("design:paramtypes", [Object, Object])
], BaseRepository);
exports.default = BaseRepository;
//# sourceMappingURL=BaseRepository.js.map