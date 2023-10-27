import { injectable } from "inversify";
import { UsersDto } from "../dtos";
import ITransactionHistoryConverter from "./ITransactionHistoryConverter";
import ExceptionModel from "../../libs/exception.lib";
import ErrorCode from "../../libs/error_code";
import HttpStatus from "../../libs/http_code";
import * as _ from "lodash";
import { UsersModel } from "../models";
import { iocContainer } from "../../ioc/IoCContainer";
import IUsersConverter from "./IUsersConverter";
import { TYPES } from "../../ioc/Types";
import TransactionHistoryModel from "../models/TransactionHistoryModel";
import TransactionHistoryDto from "../dtos/TransactionHistoryDto";
import { TRANSACTION_HISTORY_TABLE_SCHEMA } from "../migrations/database/schemas/Contants";

@injectable()
class TransactionHistoryConverter implements ITransactionHistoryConverter {
    public async modelToDto(model: TransactionHistoryModel): Promise<TransactionHistoryDto> {
        const dto: TransactionHistoryDto = new TransactionHistoryDto();

        if (model) {
            dto.id = model[TRANSACTION_HISTORY_TABLE_SCHEMA.FIELDS.ID];
            dto.createdDate = model[TRANSACTION_HISTORY_TABLE_SCHEMA.FIELDS.CREATED_DATE];
            dto.updatedDate = model[TRANSACTION_HISTORY_TABLE_SCHEMA.FIELDS.UPDATED_DATE];

            dto.productsWarehouseId = model[TRANSACTION_HISTORY_TABLE_SCHEMA.FIELDS.PRODUCTS_WAREHOUSE_ID];
            dto.implementerId = model[TRANSACTION_HISTORY_TABLE_SCHEMA.FIELDS.IMPLEMENTER_ID];
            dto.implementDate = model[TRANSACTION_HISTORY_TABLE_SCHEMA.FIELDS.IMPLEMENT_DATE];
            dto.priceCharge = model[TRANSACTION_HISTORY_TABLE_SCHEMA.FIELDS.PRICE_CHARGE];
            dto.numberOfProducts = model[TRANSACTION_HISTORY_TABLE_SCHEMA.FIELDS.NUMBER_OF_PRODUCTS];
        }

        return dto;
    }

    public async dtoToModel(dto: TransactionHistoryDto): Promise<any> {
        const model: any = {};

        model[TRANSACTION_HISTORY_TABLE_SCHEMA.FIELDS.ID] = dto.id;
        model[TRANSACTION_HISTORY_TABLE_SCHEMA.FIELDS.IS_DELETED] = dto.isDeleted;
        model[TRANSACTION_HISTORY_TABLE_SCHEMA.FIELDS.IS_ENABLE] = dto.isEnable;
        model[TRANSACTION_HISTORY_TABLE_SCHEMA.FIELDS.CREATED_DATE] = dto.createdDate && dto.createdDate.toDate();
        model[TRANSACTION_HISTORY_TABLE_SCHEMA.FIELDS.UPDATED_DATE] = dto.updatedDate && dto.updatedDate.toDate();

        model[TRANSACTION_HISTORY_TABLE_SCHEMA.FIELDS.PRODUCTS_WAREHOUSE_ID] = dto.productsWarehouseId;
        model[TRANSACTION_HISTORY_TABLE_SCHEMA.FIELDS.IMPLEMENTER_ID] = dto.implementerId;
        model[TRANSACTION_HISTORY_TABLE_SCHEMA.FIELDS.IMPLEMENT_DATE] = dto.implementDate;
        model[TRANSACTION_HISTORY_TABLE_SCHEMA.FIELDS.PRICE_CHARGE] = dto.priceCharge;
        model[TRANSACTION_HISTORY_TABLE_SCHEMA.FIELDS.NUMBER_OF_PRODUCTS] = dto.numberOfProducts;

        return model;
    }

    public async createRequestToDto(body: any): Promise<any> {
    }

    public requestToDto(params: any): any {
        return params;
    }
}

export default TransactionHistoryConverter;
