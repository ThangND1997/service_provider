import { IConverter } from ".";
import { SessionsDto } from "../dtos";
import { SessionsModel } from "../models";

interface ISessionsConverter extends IConverter<SessionsModel, SessionsDto> {
}

export default ISessionsConverter;
