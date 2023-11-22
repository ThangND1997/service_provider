import { Expose, Transform, Type } from "class-transformer";
import { BaseDto, UsersDto } from ".";
import * as momentTz from "moment-timezone"
import TransactionHistoryDto from "./TransactionHistoryDto";

export interface SummaryTransactionHistory {
    totalPriceCharge: number;
    detailPriceCharge: any;
}
export interface ChartTransactionHistory {
    name: string
    data: number[];
    numb: number;
}

class TransactionHistoryWrapper extends BaseDto {
    @Expose()
    public data: TransactionHistoryDto[];

    @Expose()
    public charts: ChartTransactionHistory[];

    @Expose()
    public summary: SummaryTransactionHistory;
}

export default TransactionHistoryWrapper;