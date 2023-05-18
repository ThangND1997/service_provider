import { Expose } from "class-transformer";
import { BaseDto } from ".";


class SessionsDto extends BaseDto {

    @Expose()
    public token: string;

    @Expose()
    public userId: string;

    @Expose()
    public expire: string;

    @Expose()
    public hash: string;

}

export default SessionsDto;