import { IConverter } from ".";
import { UsersDto } from "../dtos";
import ProductsCategoryDto from "../dtos/ProductsCategory";
import ProductsWarehouseDto from "../dtos/ProductsWarehouseDto";
import ProductsCategoryModel from "../models/ProductsCategoryModel";
import ProductsWarehouseModel from "../models/ProductsWarehouseModel";

interface IProductsCategoryConverter extends IConverter<ProductsCategoryModel, ProductsCategoryDto> {
}

export default IProductsCategoryConverter;
