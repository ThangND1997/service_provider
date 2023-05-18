import { SessionsDto } from "../../data/dtos";
import IBaseRepository from "./IBaseRepository";

interface ISessionsRepository extends IBaseRepository<SessionsDto> {
}

export default ISessionsRepository;