import { injectable } from "inversify";
import { UsersDto } from "../dtos";
import IProductsWarehouseConverter from "./IProductsWarehouseConverter";
import ExceptionModel from "../../libs/exception.lib";
import ErrorCode from "../../libs/error_code";
import HttpStatus from "../../libs/http_code";
import * as _ from "lodash";
import ProductsWarehouseDto from "../dtos/ProductsWarehouseDto";
import ProductsWarehouseModel from "../models/ProductsWarehouseModel";
import { PRODUCTS_WAREHOUSE_TABLE_SCHEMA } from "../migrations/database/schemas/Contants";
import { UsersModel } from "../models";
import { iocContainer } from "../../ioc/IoCContainer";
import IUsersConverter from "./IUsersConverter";
import { TYPES } from "../../ioc/Types";
import ProductsCategoryModel from "../models/ProductsCategoryModel";
import IProductsCategoryConverter from "./IProductsCategoryConverter";

@injectable()
class ProductsWarehouseConverter implements IProductsWarehouseConverter {
    public async modelToDto(model: ProductsWarehouseModel): Promise<ProductsWarehouseDto> {
        const dto: ProductsWarehouseDto = new ProductsWarehouseDto();

        if (model) {
            dto.id = model[PRODUCTS_WAREHOUSE_TABLE_SCHEMA.FIELDS.ID];
            dto.createdDate = model[PRODUCTS_WAREHOUSE_TABLE_SCHEMA.FIELDS.CREATED_DATE];
            dto.updatedDate = model[PRODUCTS_WAREHOUSE_TABLE_SCHEMA.FIELDS.UPDATED_DATE];

            dto.name = model[PRODUCTS_WAREHOUSE_TABLE_SCHEMA.FIELDS.NAME];
            dto.description = model[PRODUCTS_WAREHOUSE_TABLE_SCHEMA.FIELDS.DESCRIPTION];
            dto.userId = model[PRODUCTS_WAREHOUSE_TABLE_SCHEMA.FIELDS.USER_ID];
            dto.categoryId = model[PRODUCTS_WAREHOUSE_TABLE_SCHEMA.FIELDS.CATEGORY_ID];
            dto.priceDisplay = model[PRODUCTS_WAREHOUSE_TABLE_SCHEMA.FIELDS.PRICE_DISPLAY];
            dto.priceOriginal = model[PRODUCTS_WAREHOUSE_TABLE_SCHEMA.FIELDS.PRICE_ORIGINAL];
            dto.monetaryUnit = model[PRODUCTS_WAREHOUSE_TABLE_SCHEMA.FIELDS.MONETARY_UNIT];
            dto.picture = model[PRODUCTS_WAREHOUSE_TABLE_SCHEMA.FIELDS.PICTURE];
            dto.images = model[PRODUCTS_WAREHOUSE_TABLE_SCHEMA.FIELDS.IMAGES];
            dto.total = model[PRODUCTS_WAREHOUSE_TABLE_SCHEMA.FIELDS.TOTAL];

            const usersModel: UsersModel = model["users"] as UsersModel;
            if (usersModel) {
                const usersConverter = iocContainer.get<IUsersConverter>(TYPES.USERS_CONVERTER);
                const usersDto = await usersConverter.modelToDto(usersModel);
                if (usersDto) {
                    dto.user = usersDto;
                }
            }
            const categoryModel: ProductsCategoryModel = model["products_category"] as ProductsCategoryModel;
            if (categoryModel) {
                const categoryConverter = iocContainer.get<IProductsCategoryConverter>(TYPES.PRODUCTS_CATEGORY_CONVERTER);
                const categoryDto = await categoryConverter.modelToDto(categoryModel);
                if (categoryDto) {
                    dto.category = categoryDto;
                }
            }
        }

        return dto;
    }

    public async dtoToModel(dto: ProductsWarehouseDto): Promise<any> {
        const model: any = {};

        model[PRODUCTS_WAREHOUSE_TABLE_SCHEMA.FIELDS.ID] = dto.id;
        model[PRODUCTS_WAREHOUSE_TABLE_SCHEMA.FIELDS.IS_DELETED] = dto.isDeleted;
        model[PRODUCTS_WAREHOUSE_TABLE_SCHEMA.FIELDS.IS_ENABLE] = dto.isEnable;
        model[PRODUCTS_WAREHOUSE_TABLE_SCHEMA.FIELDS.CREATED_DATE] = dto.createdDate && dto.createdDate.toDate();
        model[PRODUCTS_WAREHOUSE_TABLE_SCHEMA.FIELDS.UPDATED_DATE] = dto.updatedDate && dto.updatedDate.toDate();

        model[PRODUCTS_WAREHOUSE_TABLE_SCHEMA.FIELDS.NAME] = dto.name;
        model[PRODUCTS_WAREHOUSE_TABLE_SCHEMA.FIELDS.DESCRIPTION] = dto.description;
        model[PRODUCTS_WAREHOUSE_TABLE_SCHEMA.FIELDS.USER_ID] = dto.userId;
        model[PRODUCTS_WAREHOUSE_TABLE_SCHEMA.FIELDS.CATEGORY_ID] = dto.categoryId;
        model[PRODUCTS_WAREHOUSE_TABLE_SCHEMA.FIELDS.PRICE_DISPLAY] = dto.priceDisplay;
        model[PRODUCTS_WAREHOUSE_TABLE_SCHEMA.FIELDS.PRICE_ORIGINAL] = dto.priceOriginal;
        model[PRODUCTS_WAREHOUSE_TABLE_SCHEMA.FIELDS.MONETARY_UNIT] = dto.monetaryUnit;
        model[PRODUCTS_WAREHOUSE_TABLE_SCHEMA.FIELDS.PICTURE] = dto.picture;
        model[PRODUCTS_WAREHOUSE_TABLE_SCHEMA.FIELDS.IMAGES] = JSON.stringify(dto.images);
        model[PRODUCTS_WAREHOUSE_TABLE_SCHEMA.FIELDS.TOTAL] = dto.total;

        return model;
    }

    public async createRequestToDto(body: any): Promise<ProductsWarehouseDto> {
        const toDb = new ProductsWarehouseDto();
        toDb.name = body.name;
        toDb.description = body.description;
        toDb.priceDisplay = body.priceDisplay;
        toDb.priceOriginal = body.priceOriginal;
        toDb.picture = body.picture;
        toDb.images = body.images;
        toDb.categoryId = body.categoryId;
        toDb.total = body.total || 0;

        if (!toDb.name || !toDb.priceOriginal || !toDb.priceDisplay || !toDb.picture || !toDb.categoryId){
            throw new ExceptionModel(
                ErrorCode.RESOURCE.MISSING_FIELD.CODE,
                ErrorCode.RESOURCE.MISSING_FIELD.MESSAGE,
                false,
                HttpStatus.BAD_REQUEST
            );
        }

        if (toDb.total < 1) {
            throw new ExceptionModel(
                ErrorCode.UNKNOWN.INVALID_QUANTITY.CODE,
                ErrorCode.UNKNOWN.INVALID_QUANTITY.MESSAGE,
                false,
                HttpStatus.BAD_REQUEST
            );
        }
        return body;
    }

    public requestToDto(params: any): any {
        return params;
    }
}

export default ProductsWarehouseConverter;
