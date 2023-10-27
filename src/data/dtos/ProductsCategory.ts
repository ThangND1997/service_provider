import { Expose, Transform, Type } from "class-transformer";
import { BaseDto, UsersDto } from ".";


class ProductsCategoryDto extends BaseDto {
    @Expose()
    public name: string;
}

export default ProductsCategoryDto;