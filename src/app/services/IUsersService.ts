import { UsersDto } from "../../data/dtos";
interface IUsersService {
    create(params: any): Promise<any>;
    search(params: any): Promise<UsersDto[]>;
    update(params: any): Promise<any>;
    findById(params: any): Promise<any>;
    delete(id: string): Promise<any>;
    login(account: string, password: string): Promise<any>;
    approve(id: string): Promise<string>;
    reject(id: string): Promise<string>;
}

export default IUsersService;