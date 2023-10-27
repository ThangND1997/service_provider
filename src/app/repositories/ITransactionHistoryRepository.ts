import { Service } from "typedi";
import { UsersDto } from "../../data/dtos";
import IBaseRepository from "./IBaseRepository";
import TransactionHistoryDto from "../../data/dtos/TransactionHistoryDto";
interface ITransactionHistoryRepository extends IBaseRepository<TransactionHistoryDto> {
    
}

export default ITransactionHistoryRepository;