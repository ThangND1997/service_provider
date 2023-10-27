import { IConverter } from ".";
import { UsersDto } from "../dtos";
import { UsersModel } from "../models";

interface IUsersConverter extends IConverter<UsersModel, UsersDto> {
    registerRequestToDto(body: any): UsersDto;
}

export default IUsersConverter;
