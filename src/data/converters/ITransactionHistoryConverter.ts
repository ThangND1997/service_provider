import { IConverter } from ".";
import { UsersDto } from "../dtos";
import ProductsCategoryDto from "../dtos/ProductsCategory";
import ProductsWarehouseDto from "../dtos/ProductsWarehouseDto";
import TransactionHistoryDto from "../dtos/TransactionHistoryDto";
import ProductsCategoryModel from "../models/ProductsCategoryModel";
import ProductsWarehouseModel from "../models/ProductsWarehouseModel";
import TransactionHistoryModel from "../models/TransactionHistoryModel";
import TransactionHistoryConverter from "./TransactionHistoryConverter";

interface ITransactionHistoryConverter extends IConverter<TransactionHistoryModel, TransactionHistoryDto> {
}

export default ITransactionHistoryConverter;
