import * as express from "express";

interface IUsersService {
    create(params: any): Promise<any>;
    search(params: any): Promise<any>;
}

export default IUsersService;