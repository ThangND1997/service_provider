import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "../ioc/Types";
import IUsersRepository from "../app/repositories/IUsersRepository";
import UsersRepository from "../app/repositories/UsersRepository";
import IUsersService from "../app/services/IUsersService";
import UsersService from "../app/services/UsersService";
import { IUsersController, UsersController } from "../app/controllers";
import { ISessionsConverter, IUsersConverter } from "../data/converters";
import UsersConverter from "../data/converters/UsersConverter";
import ISessionsRepository from "../app/repositories/ISessionsRepository";
import SessionsRepository from "../app/repositories/SessionsRepository";
import SessionsConverter from "../data/converters/SessionsConverter";



const iocContainer = new Container();

// binding queue handlers
iocContainer.bind<IUsersConverter>(TYPES.USERS_CONVERTER).to(UsersConverter);
iocContainer.bind<ISessionsConverter>(TYPES.SESSIONS_CONVERTER).to(SessionsConverter);

// binding mappers

// binding repositories
iocContainer.bind<IUsersRepository>(TYPES.USERS_REPOSITORY).to(UsersRepository);
iocContainer.bind<ISessionsRepository>(TYPES.SESSIONS_REPOSITORY).to(SessionsRepository);

// binding services
iocContainer.bind<IUsersService>(TYPES.USERS_SERVICE).to(UsersService);

// binding controllers
iocContainer.bind<IUsersController>(TYPES.USERS_CONTROLLER).to(UsersController);


export { iocContainer };
