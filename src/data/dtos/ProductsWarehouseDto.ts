import { Expose, Transform, Type } from "class-transformer";
import { BaseDto, UsersDto } from ".";
import ProductsCategoryDto from "./ProductsCategory";


class ProductsWarehouseDto extends BaseDto {

    @Expose()
    public name: string;

    @Expose()
    public description: string;

    @Expose()
    public categoryId: string;

    @Expose()
    public priceDisplay: number;

    @Expose()
    public priceOriginal: number;

    @Expose()
    public picture: string;

    @Expose()
    public images: string[];

    @Expose()
    public total: number;

    @Expose()
    public userId: string;

    @Expose()
    public monetaryUnit: string;

    @Expose()
    public user: UsersDto;

    @Expose()
    public category: ProductsCategoryDto;
}

export default ProductsWarehouseDto;