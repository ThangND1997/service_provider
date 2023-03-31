import * as express from "express";
import { UsersDto } from "../../data/dtos";

interface IUsersRepository {
    create(params: any): Promise<any>;
    search(params: any): Promise<any>;
    findUserByEmail(email: string): Promise<UsersDto>
}

export default IUsersRepository;