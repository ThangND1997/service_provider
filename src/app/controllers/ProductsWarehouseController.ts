import * as express from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "../../ioc/Types";
import IProductsWarehouseController from "./IProductsWarehouseController";
import IProductsWarehouseService from "../services/IProductsWarehouseService";
import IProductsWarehouseConverter from "../../data/converters/IProductsWarehouseConverter";
import ProductsWarehouseDto from "../../data/dtos/ProductsWarehouseDto";
import ProductsCategoryDto from "../../data/dtos/ProductsCategory";
import IProductsCategoryConverter from "../../data/converters/IProductsCategoryConverter";
import ExceptionModel from "../../libs/exception.lib";
import ErrorCode from "../../libs/error_code";
import HttpStatus from "../../libs/http_code";

@injectable()
export class ProductsWarehouseController implements IProductsWarehouseController {
    constructor(
        @inject(TYPES.PRODUCTS_WAREHOUSE_SERVICE) private _productsWarehouseService: IProductsWarehouseService,
        @inject(TYPES.PRODUCTS_WAREHOUSE_CONVERTER) private _converter: IProductsWarehouseConverter,
        @inject(TYPES.PRODUCTS_CATEGORY_CONVERTER) private _categoryConverter: IProductsCategoryConverter
        ) {
    }
    
    public async create(req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> {
        try {
            const ctx = res.locals.ctx;
            const data: ProductsWarehouseDto = await this._converter.createRequestToDto(req.body) || {};
            data.userId = ctx.userId;
            const id = await this._productsWarehouseService.create(data);
            res.json({status: "Insert data successfully..", id});
        }
        catch (err) {
            next(err)
        }
    }

    public async search(req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> {
        try {
            const params: ProductsWarehouseDto = this._converter.requestToDto(req.query) || {};
            const products = await this._productsWarehouseService.search(params);
            res.status(200);
            res.json(products);
        }
        catch (err) {
            next(err)
        }
    }

    public async update(req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> {
        try {
            const ctx = res.locals.ctx;
            const id = req.params.id
            const data: ProductsWarehouseDto = await this._converter.createRequestToDto(req.body) || {};
            data.userId = ctx.userId;
            await this._productsWarehouseService.update(id, data);
            res.json({status: "Update data successfully..", id});
        }
        catch (err) {
            next(err)
        }
    }

    public async delete(req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> {
        try {
            const ctx = res.locals.ctx;
            const id = req.params.id
            await this._productsWarehouseService.delete(id);
            res.json({status: "Update data successfully..", id});
        }
        catch (err) {
            next(err)
        }
    }

    public async release(req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> {
        try {
            const ctx = res.locals.ctx;
            const id = req.params.id
            const numberOfProducts = req.body.numberOfProducts
            if (!numberOfProducts) {
                throw new ExceptionModel(
                    ErrorCode.UNKNOWN.INVALID_QUANTITY.CODE,
                    ErrorCode.UNKNOWN.INVALID_QUANTITY.MESSAGE,
                    false,
                    HttpStatus.BAD_REQUEST
                );
            }
            await this._productsWarehouseService.release(ctx, id, numberOfProducts);
            res.json({status: "Update data successfully..", id});
        }
        catch (err) {
            next(err)
        }
    }

    public async retrieveCategory(req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> {
        try {
            const listCategory = await this._productsWarehouseService.findAllCategory();
            res.status(200);
            res.json(listCategory);
        }
        catch (err) {
            next(err)
        }
    }

    public async addCategory(req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> {
        try {
            const data: ProductsCategoryDto = await this._categoryConverter.createRequestToDto(req.body) || {};
            const id = await this._productsWarehouseService.addCategory(data);
            res.status(200);
            res.json({status: "Insert data successfully..", id});
        }
        catch (err) {
            next(err)
        }
    }
}

export default ProductsWarehouseController;