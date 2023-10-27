import { IConverter } from ".";
import { UsersDto } from "../dtos";
import ProductsWarehouseDto from "../dtos/ProductsWarehouseDto";
import ProductsWarehouseModel from "../models/ProductsWarehouseModel";

interface IProductsWarehouseConverter extends IConverter<ProductsWarehouseModel, ProductsWarehouseDto> {
}

export default IProductsWarehouseConverter;
