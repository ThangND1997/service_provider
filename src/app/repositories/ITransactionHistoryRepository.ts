import { Service } from "typedi";
import { UsersDto } from "../../data/dtos";
import IBaseRepository from "./IBaseRepository";
import TransactionHistoryDto from "../../data/dtos/TransactionHistoryDto";
interface ITransactionHistoryRepository extends IBaseRepository<TransactionHistoryDto> {
    getByQuery(queryParam: any): Promise<TransactionHistoryDto[]>;
    countTrackingByQuery(queryParam: any): Promise<any>;
}

export default ITransactionHistoryRepository;