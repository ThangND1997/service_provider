import { IConverter } from ".";
import { UsersDto } from "../dtos";
import { UsersModel } from "../models";

interface IUsersConverter extends IConverter<UsersModel, UsersDto> {
}

export default IUsersConverter;
