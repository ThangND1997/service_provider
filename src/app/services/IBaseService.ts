import { TransactionOrKnex } from "objection";
import { BaseDto } from "../../data/dtos";
import { IQueryOptions } from "../repositories/IBaseRepository";

interface IBaseService<D extends BaseDto> {
    /**
     * Get resource by ID.
     * @param id
     */
    findById(id: string, options?: IQueryOptions): Promise<D>;

    /**
     * Insert new resource.
     * @param dto 
     * @param trx 
     */
    insert(dto: D, trx?: TransactionOrKnex): Promise<string>;

    /**
     * Insert new resource and return the created resource.
     * @param dto 
     * @param trx 
     */
    insertAndFetch(dto: D, trx?: TransactionOrKnex): Promise<D>;

    /**
     * Bulk insert
     * @param dtos 
     * @param trx 
     */
    bulkInsert(dtos: D[], trx?: TransactionOrKnex): Promise<any>;

    /**
     * Update an existing resource by ID.
     * @param id 
     * @param dto 
     * @param trx 
     */
    updateById(id: string, dto: D, trx?: TransactionOrKnex): Promise<string>;

    /**
     * Update by ids
     * @param ids 
     * @param dto 
     * @param trx 
     */
    updateByIds(ids: string[], dto: D, trx?: TransactionOrKnex): Promise<number>;

    /**
     * Update an existing resource by ID and return the updated resource.
     * @param id 
     * @param dto 
     * @param trx 
     */
    updateAndFetchById(id: string, dto: D, trx?: TransactionOrKnex): Promise<D>;

    /**
     * Delete an existing resource by ID.
     * @param id
     */
    deleteById(id: string, trx?: TransactionOrKnex): Promise<boolean>;

    /**
     * Soft delete by ID.
     * @param id 
     * @param trx 
     */
    softDeleteById(id: string, trx?: TransactionOrKnex): Promise<string>;

    /**
     * Generate a unique ID.
     */
    generateUniqueID(): string;
}

export default IBaseService;