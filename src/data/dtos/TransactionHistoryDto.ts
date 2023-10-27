import { Expose, Transform, Type } from "class-transformer";
import { BaseDto, UsersDto } from ".";
import * as momentTz from "moment-timezone"


class TransactionHistoryDto extends BaseDto {
    @Expose()
    public productsWarehouseId: string;

    @Expose()
    public implementerId: string;

    @Expose()
    public implementDate: momentTz.Moment;

    @Expose()
    public numberOfProducts: number;

    @Expose()
    public priceCharge: number;
}

export default TransactionHistoryDto;