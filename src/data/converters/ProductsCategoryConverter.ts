import { injectable } from "inversify";
import { UsersDto } from "../dtos";
import IProductsCategoryConverter from "./IProductsCategoryConverter";
import ExceptionModel from "../../libs/exception.lib";
import ErrorCode from "../../libs/error_code";
import HttpStatus from "../../libs/http_code";
import * as _ from "lodash";
import { UsersModel } from "../models";
import { iocContainer } from "../../ioc/IoCContainer";
import IUsersConverter from "./IUsersConverter";
import { TYPES } from "../../ioc/Types";
import { PRODUCTS_CATEGORY_TABLE_SCHEMA } from "../migrations/database/schemas/Contants";
import ProductsCategoryModel from "../models/ProductsCategoryModel";
import ProductsCategoryDto from "../dtos/ProductsCategory";

@injectable()
class ProductsCategoryConverter implements IProductsCategoryConverter {
    public async modelToDto(model: ProductsCategoryModel): Promise<ProductsCategoryDto> {
        const dto: ProductsCategoryDto = new ProductsCategoryDto();

        if (model) {
            dto.id = model[PRODUCTS_CATEGORY_TABLE_SCHEMA.FIELDS.ID];
            dto.createdDate = model[PRODUCTS_CATEGORY_TABLE_SCHEMA.FIELDS.CREATED_DATE];
            dto.updatedDate = model[PRODUCTS_CATEGORY_TABLE_SCHEMA.FIELDS.UPDATED_DATE];

            dto.name = model[PRODUCTS_CATEGORY_TABLE_SCHEMA.FIELDS.NAME];
        }

        return dto;
    }

    public async dtoToModel(dto: ProductsCategoryDto): Promise<any> {
        const model: any = {};

        model[PRODUCTS_CATEGORY_TABLE_SCHEMA.FIELDS.ID] = dto.id;
        model[PRODUCTS_CATEGORY_TABLE_SCHEMA.FIELDS.IS_DELETED] = dto.isDeleted;
        model[PRODUCTS_CATEGORY_TABLE_SCHEMA.FIELDS.IS_ENABLE] = dto.isEnable;
        model[PRODUCTS_CATEGORY_TABLE_SCHEMA.FIELDS.CREATED_DATE] = dto.createdDate && dto.createdDate.toDate();
        model[PRODUCTS_CATEGORY_TABLE_SCHEMA.FIELDS.UPDATED_DATE] = dto.updatedDate && dto.updatedDate.toDate();

        model[PRODUCTS_CATEGORY_TABLE_SCHEMA.FIELDS.NAME] = dto.name;

        return model;
    }

    public async createRequestToDto(body: any): Promise<ProductsCategoryDto> {
        const toDb = new ProductsCategoryDto();
        toDb.name = body.name;
        return body;
    }

    public requestToDto(params: any): any {
        return params;
    }
}

export default ProductsCategoryConverter;
