import * as jwt from "jsonwebtoken";
import * as express from "express";
import ExceptionModel from "../libs/exception.lib";
import ErrorCode from "../libs/error_code";
import HttpStatus from "../libs/http_code";
import UsersRepository from "../app/repositories/UsersRepository";
import { Container } from "typedi";
import { IOCServiceName } from "../ioc/IocServiceName";
import IUsersRepository from "../app/repositories/IUsersRepository";
import { TYPES } from "../ioc/Types";

export const verifyContext = (): express.RequestHandler => {
    return async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> => {
        try {
                const _userRepository = Container.get<IUsersRepository>(IOCServiceName.USER_REPOSITORY);
                const authHeader = req.headers['authorization'];
                const token = authHeader && authHeader.split(' ')[1];
                if (token == null) {
                    throw new ExceptionModel(
                        ErrorCode.PRIVILEGE.MISSING_TOKEN_VERIFY.CODE,
                        ErrorCode.PRIVILEGE.MISSING_TOKEN_VERIFY.MESSAGE,
                        false,
                        HttpStatus.FORBIDDEN)
                }
                jwt.verify(token, "secret", async (err: any, data: any) => {
                    if (err || !data || !data.userId || !data.roleId) {
                        throw new ExceptionModel(
                            ErrorCode.PRIVILEGE.NOT_ALLOW.CODE,
                            ErrorCode.PRIVILEGE.NOT_ALLOW.MESSAGE,
                            false,
                            HttpStatus.FORBIDDEN)
                    } 
        
                    const ctx: any = {
                        userId: data.userId as string || "",
                        roleId: data.roleId as string || ""
                    };
        
                    res.locals.ctx = ctx;
        
                })
                
                return next();
            } catch (error) {
                next(error)
            }
        }
};

export const hasPrivilege = (roles: string[] = []): express.RequestHandler => {
    return async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> => {
        try {
            const _userRepository = Container.get<IUsersRepository>(IOCServiceName.USER_REPOSITORY)
            let ctx: any = res.locals.ctx || {};
            let roleId: string | undefined = roles.find(item => item === ctx.roleId);
            if (roleId == null) {
                 throw new ExceptionModel(
                    ErrorCode.PRIVILEGE.NOT_ALLOW.CODE,
                    ErrorCode.PRIVILEGE.NOT_ALLOW.MESSAGE,
                    false,
                    HttpStatus.FORBIDDEN,
                );
            }

            const usersModel = await _userRepository.getById(ctx.userId);
            if (!usersModel) {
                throw new ExceptionModel(
                    ErrorCode.PRIVILEGE.NOT_ALLOW.CODE,
                    ErrorCode.PRIVILEGE.NOT_ALLOW.MESSAGE,
                    false,
                    HttpStatus.FORBIDDEN)
            }

        } catch (error) {
            next(error)
        }
        return next();
    };
};
