import { IBaseService } from ".";
import { injectable } from "inversify";
import { TransactionOrKnex } from "objection";
import { IBaseRepository } from "../repositories";
import { IQueryOptions } from "../repositories/IBaseRepository";
import { BaseDto } from "../../data/dtos";

@injectable()
class BaseService<R extends IBaseRepository<D>, D extends BaseDto> implements IBaseService<D> {
    protected _repository: R;

    constructor(repository: R) {
        this._repository = repository;
    }

    findById(id: string, options?: IQueryOptions): Promise<D> {
        return this._repository.findById(id, options);
    }

    insert(dto: D, trx?: TransactionOrKnex): Promise<string> {
        return this._repository.insert(dto, trx);
    }

    insertAndFetch(dto: D, trx?: TransactionOrKnex): Promise<D> {
        return this._repository.insertAndFetch(dto, trx);
    }

    bulkInsert(dtos: D[], trx?: TransactionOrKnex): Promise<any> {
        return this._repository.bulkInsert(dtos, trx);
    }

    updateById(id: string, dto: D, trx?: TransactionOrKnex): Promise<string> {
        return this._repository.updateById(id, dto, trx);
    }

    updateByIds(ids: string[], dto: D, trx?: TransactionOrKnex): Promise<number> {
        return this._repository.updateByIds(ids, dto, trx);
    }

    updateAndFetchById(id: string, dto: D, trx?: TransactionOrKnex): Promise<D> {
        return this._repository.updateAndFetchById(id, dto, trx);
    }

    deleteById(id: string, trx?: TransactionOrKnex): Promise<boolean> {
        return this._repository.deleteById(id, trx);
    }

    softDeleteById(id: string, trx?: TransactionOrKnex): Promise<string> {
        return this._repository.softDeleteById(id, trx);
    }

    generateUniqueID(): string {
        return this._repository.generateUniqueID();
    }
}

export default BaseService;
