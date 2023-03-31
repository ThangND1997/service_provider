import { injectable, unmanaged } from "inversify";
import * as uuid from "uuid";
import * as Knex from "knex";
import * as momentTz from "moment-timezone";
import * as _ from "lodash";
import { TransactionOrKnex, QueryBuilder } from "objection";
import { Logger } from "../../core";
import { IBaseRepository } from "./";
import { BaseModel } from "../../data/models";
import { BaseDto } from "../../data/dtos";
import { IConverter } from "../../data/converters";
import { IQueryOptions } from "./IBaseRepository";

@injectable()
class BaseRepository<M extends BaseModel, D extends BaseDto> implements IBaseRepository<D> {
    private _converter: IConverter<M, D>;
    private _modelClass: typeof BaseModel;

    constructor(@unmanaged() dtoClass: typeof BaseModel, converter: IConverter<M, D>) {
        this._modelClass = dtoClass;
        this._converter = converter;
    }

    public async findByQuery(callback: (qb: QueryBuilder<any, any>) => void, options: IQueryOptions = {}): Promise<D[]> {
        let query = this._modelClass.query();

        if (options.relations && options.relations.length) {
            const formatRelation = this.formatRelations(options.relations);
            query = query.withGraphFetched(formatRelation);
        }

        callback(query);

        const models = await query as M[];

        return this.toListDto(models);
    }

    public async findDistinctByQuery(callback: (qb: QueryBuilder<any, any>) => void, column: string, options: IQueryOptions = {}): Promise<D[]> {
        let query = this._modelClass.query().distinct(column);

        if (options.relations && options.relations.length) {
            const formatRelation = this.formatRelations(options.relations);
            query = query.withGraphFetched(formatRelation);
        }

        callback(query);

        const models = await query as M[];

        return this.toListDto(models);
    }

    public async countByQuery(callback: (qb: QueryBuilder<any, any>) => void): Promise<number> {
        let query = this._modelClass.query().count("*");

        callback(query);

        const [rs] = await query as M[];
        return (rs && Number(rs["count"])) || 0;
    }

    public async countDistinctByQuery(callback: (qb: QueryBuilder<any, any>) => void, column: string): Promise<number> {
        let query = this._modelClass.query().countDistinct(column);

        callback(query);

        const [rs] = await query as M[];
        return (rs && Number(rs["count"])) || 0;
    }

    public async findById(id: string, options: IQueryOptions = {}): Promise<D> {
        let query = this._modelClass.query();

        if (options.relations && options.relations.length) {
            const formatRelation = this.formatRelations(options.relations);
            query = query.withGraphFetched(formatRelation);
        }

        const rs = await query.findById(id) as M;
        return rs && this._converter.modelToDto(rs);
    }

    public async findOneByQuery(callback: (qb: QueryBuilder<any, any>) => void, options: IQueryOptions = {}): Promise<D> {
        let query = this._modelClass.query().findOne(callback);

        if (options.relations && options.relations.length) {
            const formatRelation = this.formatRelations(options.relations);
            query = query.withGraphFetched(formatRelation);
        };

        const rs = await query as M;
        return rs && this._converter.modelToDto(rs);
    }

    public async insert(data: D, trx?: TransactionOrKnex): Promise<string> {
        if (!data.id) {
            data.id = this.generateUniqueID();
        }

        const model = await this._converter.dtoToModel(data);
        const rs = await this._modelClass.query(trx).insert(model);

        return rs[BaseModel.idColumn];
    }

    public async bulkInsert(dtos: D[], trx?: TransactionOrKnex): Promise<any> {
        const models: M[] = [];

        for (let dto of dtos) {
            if (!dto.id) {
                dto.id = this.generateUniqueID();
            }

            const model = await this._converter.dtoToModel(dto);
            models.push(model);
        }

        return this._modelClass.query(trx).insert(models);
    }

    public async insertAndFetch(data: D, trx?: TransactionOrKnex): Promise<D> {
        if (!data.id) {
            data.id = this.generateUniqueID();
        }

        const model = await this._converter.dtoToModel(data);
        const rs = await this._modelClass.query(trx).insertAndFetch(model) as M;

        return this._converter.modelToDto(rs);
    }

    public async updateById(id: string, data: D, trx?: TransactionOrKnex): Promise<string> {
        const model = await this._converter.dtoToModel(data);

        delete model[BaseModel.idColumn];

        const numUpdated = await this._modelClass.query(trx)
            .findById(id)
            .patch(model);

        if (numUpdated === 0) {
            Logger.error(`Update failed: Cannot find resource ${this._modelClass.name} by id ${id}`);
            throw new Error(`Update failed: Resource not found`);
        }

        return id;
    }

    public updateByIds(ids: string[], dto: D, trx?: TransactionOrKnex): Promise<number> {
        return this.updateByQuery((qb: QueryBuilder<any, any>) => {
            qb.whereIn("id", ids);
        }, dto, trx);
    }

    public async updateAndFetchById(id: string, data: D, trx?: TransactionOrKnex): Promise<D> {
        const model = await this._converter.dtoToModel(data);

        delete model[BaseModel.idColumn];

        const updatedModel = await this._modelClass.query(trx).patchAndFetchById(id, model) as M;

        return this._converter.modelToDto(updatedModel);
    }

    public async updateByQuery(callback: (qb: QueryBuilder<any, any>) => void, data: D, trx?: TransactionOrKnex): Promise<number> {
        const model = await this._converter.dtoToModel(data);

        delete model[BaseModel.idColumn];

        const query = this._modelClass.query(trx).patch(model);

        callback(query);

        return query;
    }

    public async deleteById(id: string, trx?: TransactionOrKnex): Promise<boolean> {
        const numDeleted = await this._modelClass.query(trx).deleteById(id);
        return numDeleted > 0;
    }

    public deleteByQuery(callback: (qb: QueryBuilder<any, any>) => void, trx?: TransactionOrKnex): Promise<number> {
        const query = this._modelClass.query(trx).delete();
        callback(query);
        return query;
    }

    public async softDeleteById(id: string, trx?: TransactionOrKnex): Promise<string> {
        return this.updateById(id, { isDeleted: true } as D, trx);
    }

    public async softDeleteByQuery(callback: (qb: QueryBuilder<any, any>) => void, trx?: TransactionOrKnex): Promise<number> {
        return this.updateByQuery(callback, { isDeleted: true } as D, trx);
    }

    public async upsert(dto: D, conflictColumns: string[]): Promise<D> {
        dto.id = dto.id || this.generateUniqueID();
        const model = await this._converter.dtoToModel(dto);
        const [updatedModel] = await this.knex()(this._modelClass.tableName)
            .insert(model)
            .onConflict(conflictColumns)
            .merge()
            .returning("*");

        return this._converter.modelToDto(updatedModel);
    }

    public async raw(sql: string, bingdings: any[] = []): Promise<any> {
        const formattedBindings = this.formatBindingValues(bingdings);
        return this.knex().raw(sql, formattedBindings);
    }

    public async rawQuery(sql: string, bingdings: any[] = []): Promise<any[]> {
        const formattedBindings = this.formatBindingValues(bingdings);
        const rs = await this.knex().raw(sql, formattedBindings);
        return rs.rows;
    }

    public knex(): Knex {
        return this._modelClass.knex();
    }

    public generateUniqueID(): string {
        return uuid.v4();
    }

    public getCountQueryParams(queryParams: any): any {
        const countQueryParams = _.cloneDeep(queryParams);

        delete countQueryParams.offset;
        delete countQueryParams.limit;
        delete countQueryParams.orderBy;
        delete countQueryParams.orderType;

        countQueryParams._isCount = true;

        return countQueryParams;
    }

    private formatBindingValues(bingdings: any[]) {
        const rs: any[] = [];

        for (let binding of bingdings) {
            if (momentTz.isMoment(binding)) {
                binding = binding.toDate();
            }

            rs.push(binding);
        }

        return rs;
    }

    private formatRelations(relations: string[]): string {
        return `[${relations.toString()}]`;
    }

    private async toListDto(models: M[]) {
        const results: D[] = [];
        for (let model of models) {
            if (model) {
                results.push(await this._converter.modelToDto(model));
            }
        }

        return results;
    }
}

export default BaseRepository;