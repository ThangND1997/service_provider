import { Expose, Transform, Type } from "class-transformer";
import * as momentTz from "moment-timezone";

class BaseDto {
    @Expose()
    public id?: string;

    public isDeleted?: boolean;

    @Expose()
    public isEnable?: boolean;

    @Expose()
    @Type(() => Date)
    @Transform(({ value }) => value && momentTz(value), { toClassOnly: true })
    public createdDate?: momentTz.Moment;

    @Expose()
    @Type(() => Date)
    @Transform(({ value }) => value && momentTz(value), { toClassOnly: true })
    public updatedDate?: momentTz.Moment;
}

export default BaseDto;