
interface IUsersService {
    create(params: any): Promise<any>;
    search(params: any): Promise<any>;
    update(params: any): Promise<any>;
    delete(id: string): Promise<any>;
    login(account: string, password: string): Promise<any>;
}

export default IUsersService;