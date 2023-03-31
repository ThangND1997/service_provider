import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "../ioc/Types";
import IUsersRepository from "../app/repositories/IUsersRepository";
import UsersRepository from "../app/repositories/UsersRepository";
import IUsersService from "../app/services/IUsersService";
import UsersService from "../app/services/UsersService";
import { IUsersController, UsersController } from "../app/controllers";
import { IUsersConverter } from "../data/converters";
import UsersConverter from "../data/converters/UsersConverter";



const iocContainer = new Container();

// binding queue handlers
iocContainer.bind<IUsersConverter>(TYPES.USERS_CONVERTER).to(UsersConverter);

// binding mappers

// binding repositories
iocContainer.bind<IUsersRepository>(TYPES.USERS_REPOSITORY).to(UsersRepository);

// binding services
iocContainer.bind<IUsersService>(TYPES.USERS_SERVICE).to(UsersService);

// binding controllers
iocContainer.bind<IUsersController>(TYPES.USERS_CONTROLLER).to(UsersController);


export { iocContainer };
