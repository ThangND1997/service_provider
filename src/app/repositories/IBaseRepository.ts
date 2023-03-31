import { TransactionOrKnex, QueryBuilder, OrderByDirection } from "objection";
import { BaseDto } from "../../data/dtos";

export interface IQueryOptions {
    relations?: string[]
}

interface IBaseRepository<D extends BaseDto> {
    /**
     * Find resources by query.
     * @param callback 
     * @param options 
     */
    findByQuery(callback: (qb: QueryBuilder<any, any>) => void, options?: IQueryOptions): Promise<D[]>;

    /**
     * Find distinct by column
     * @param callback 
     * @param column 
     * @param options 
     */
    findDistinctByQuery(callback: (qb: QueryBuilder<any, any>) => void, column: string, options: IQueryOptions): Promise<D[]>;

    /**
     * Count by query.
     * @param callback 
     */
    countByQuery(callback: (qb: QueryBuilder<any, any>) => void): Promise<any>;

    /**
     * Count distinct by query.
     * @param callback 
     */
    countDistinctByQuery(callback: (qb: QueryBuilder<any, any>) => void, column: string): Promise<number>;

    /**
     * Get resource by ID.
     * @param id
     */
    findById(id: string, options?: IQueryOptions): Promise<D>;

    /**
     * Find one resource by query.
     * @param qb 
     * @param options 
     */
    findOneByQuery(callback: (qb: QueryBuilder<any, any>) => void, options?: IQueryOptions): Promise<D>;

    /**
     * Insert new resource.
     * @param data 
     * @param trx 
     */
    insert(data: D, trx?: TransactionOrKnex): Promise<string>;

    /**
     * Insert new resource and return the created resource.
     * @param data 
     * @param trx 
     */
    insertAndFetch(data: D, trx?: TransactionOrKnex): Promise<D>;

    /**
     * Bulk insert
     * @param dtos 
     * @param trx 
     */
    bulkInsert(dtos: D[], trx?: TransactionOrKnex): Promise<any>;

    /**
     * Update an existing resource by ID.
     * @param id 
     * @param data 
     * @param trx 
     */
    updateById(id: string, data: D, trx?: TransactionOrKnex): Promise<string>;

    /**
     * 
     * @param ids Update by ids
     * @param dto 
     */
     updateByIds(ids: string[], dto: D, trx?: TransactionOrKnex): Promise<number>;

    /**
     * Update an existing resource by ID and return the updated resource.
     * @param id 
     * @param data 
     * @param trx 
     */
    updateAndFetchById(id: string, data: D, trx?: TransactionOrKnex): Promise<D>;

    /**
     * Update an existing resource by query.
     * @param callback 
     * @param data 
     * @param trx 
     */
    updateByQuery(callback: (qb: QueryBuilder<any, any>) => void, data: D, trx?: TransactionOrKnex): Promise<number>;

    /**
     * Delete an existing resource by ID.
     * @param id
     */
    deleteById(id: string, trx?: TransactionOrKnex): Promise<boolean>;

    /**
     * Delete resources by query.
     * @param callback 
     * @param trx 
     */
    deleteByQuery(callback: (qb: QueryBuilder<any, any>) => void, trx?: TransactionOrKnex): Promise<number>;

    /**
     * Soft delete by ID.
     * @param id 
     * @param trx 
     */
    softDeleteById(id: string, trx?: TransactionOrKnex): Promise<string>;

    /**
     * Soft delete by query.
     * @param callback 
     * @param trx 
     */
    softDeleteByQuery(callback: (qb: QueryBuilder<any, any>) => void, trx?: TransactionOrKnex): Promise<number>;

    /**
     * Execute raw SQL.
     * @param sql 
     * @param bingdings 
     */
    raw(sql: string, bingdings?: any[]): Promise<any>;

    /**
     * Execute raw SQL query.
     * @param sql 
     * @param bingdings 
     */
    rawQuery(sql: string, bingdings?: any[]): Promise<any[]>;

    /**
     * Upsert record
     * @param dto
     * @param conflictColumns
     */
    upsert(dto: D, conflictColumns: string[]): Promise<D>;

    /**
     * Get count query
     * @param queryParams
     */
    getCountQueryParams(queryParams: any): any;

    /**
     * Generate a unique ID.
     */
    generateUniqueID(): string;
}

export default IBaseRepository;