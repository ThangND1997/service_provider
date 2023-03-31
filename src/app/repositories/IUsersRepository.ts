import { UsersDto } from "../../data/dtos";
import IBaseRepository from "./IBaseRepository";

interface IUsersRepository extends IBaseRepository<UsersDto> {
    create(params: any): Promise<any>;
    search(params: any): Promise<any>;
    findUserByEmail(email: string): Promise<UsersDto>;
    findUserAccount(account: string): Promise<UsersDto>;
}

export default IUsersRepository;