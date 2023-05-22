import { Service } from "typedi";
import { UsersDto } from "../../data/dtos";
import IBaseRepository from "./IBaseRepository";
import { IOCServiceName } from "../../ioc/IocServiceName";
interface IUsersRepository extends IBaseRepository<UsersDto> {
    create(params: any): Promise<any>;
    search(params: any): Promise<any>;
    getById(id: string): Promise<UsersDto>
    findUserByEmail(email: string): Promise<UsersDto>;
    findUserAccount(account: string): Promise<UsersDto>;
}

export default IUsersRepository;