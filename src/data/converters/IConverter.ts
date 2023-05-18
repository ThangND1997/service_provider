import { BaseDto } from "../dtos";
import { Model } from "objection";

interface IConverter<M extends Model, D extends BaseDto> {
    modelToDto(model: M): Promise<D>;
    dtoToModel(dto: D): Promise<M>;
    requestToDto(params: any): D;
    createRequestToDto(body: any): Promise<D>;
}

export default IConverter;
