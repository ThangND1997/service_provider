import { Expose, Transform, Type } from "class-transformer";
import { BaseDto } from ".";
import * as momentTz from "moment-timezone";


class UsersDto extends BaseDto {

    @Expose()
    public name: string;

    @Expose()
    public email: string;

    @Expose()
    public role: string;

    @Expose()
    public avatarUrl: string;

    @Expose()
    public password: string;

    @Expose()
    public isAdmin: boolean;

    @Expose()
    public phone: string;

    @Expose()
    public note: string;

    @Expose()
    public status: string;

    @Expose()
    public address: string;


    @Expose()
    public expiryDate: momentTz.Moment
}

export default UsersDto;