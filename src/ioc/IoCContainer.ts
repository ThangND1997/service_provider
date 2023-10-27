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
import IProductsWarehouseController from "../app/controllers/IProductsWarehouseController";
import ProductsWarehouseController from "../app/controllers/ProductsWarehouseController";
import IProductsWarehouseService from "../app/services/IProductsWarehouseService";
import ProductsWarehouseService from "../app/services/ProductsWarehouseService";
import IProductsWarehouseRepository from "../app/repositories/IProductsWarehouseRepository";
import ProductsWarehouseRepository from "../app/repositories/ProductsWarehouseRepository";
import IProductsWarehouseConverter from "../data/converters/IProductsWarehouseConverter";
import ProductsWarehouseConverter from "../data/converters/ProductsWarehouseConverter";
import IProductsCategoryRepository from "../app/repositories/IProductsCategoryRepository";
import ProductsCategoryRepository from "../app/repositories/ProductsCategoryRepository";
import IProductsCategoryConverter from "../data/converters/IProductsCategoryConverter";
import ProductsCategoryConverter from "../data/converters/ProductsCategoryConverter";
import ITransactionHistoryConverter from "../data/converters/ITransactionHistoryConverter";
import TransactionHistoryConverter from "../data/converters/TransactionHistoryConverter";
import TransactionHistoryRepository from "../app/repositories/TransactionHistoryRepository";
import ITransactionHistoryRepository from "../app/repositories/ITransactionHistoryRepository";



const iocContainer = new Container();

// binding queue handlers
iocContainer.bind<IUsersConverter>(TYPES.USERS_CONVERTER).to(UsersConverter);
iocContainer.bind<IProductsWarehouseConverter>(TYPES.PRODUCTS_WAREHOUSE_CONVERTER).to(ProductsWarehouseConverter);
iocContainer.bind<IProductsCategoryConverter>(TYPES.PRODUCTS_CATEGORY_CONVERTER).to(ProductsCategoryConverter);
iocContainer.bind<ITransactionHistoryConverter>(TYPES.TRANSACTION_HISTORY_CONVERTER).to(TransactionHistoryConverter);
iocContainer.bind<ISessionsConverter>(TYPES.SESSIONS_CONVERTER).to(SessionsConverter);

// binding mappers

// binding repositories
iocContainer.bind<IUsersRepository>(TYPES.USERS_REPOSITORY).to(UsersRepository);
iocContainer.bind<IProductsWarehouseRepository>(TYPES.PRODUCTS_WAREHOUSE_REPOSITORY).to(ProductsWarehouseRepository);
iocContainer.bind<IProductsCategoryRepository>(TYPES.PRODUCTS_CATEGORY_REPOSITORY).to(ProductsCategoryRepository);
iocContainer.bind<ITransactionHistoryRepository>(TYPES.TRANSACTION_HISTORY_REPOSITORY).to(TransactionHistoryRepository);
iocContainer.bind<ISessionsRepository>(TYPES.SESSIONS_REPOSITORY).to(SessionsRepository);

// binding services
iocContainer.bind<IUsersService>(TYPES.USERS_SERVICE).to(UsersService);
iocContainer.bind<IProductsWarehouseService>(TYPES.PRODUCTS_WAREHOUSE_SERVICE).to(ProductsWarehouseService);

// binding controllers
iocContainer.bind<IUsersController>(TYPES.USERS_CONTROLLER).to(UsersController);
iocContainer.bind<IProductsWarehouseController>(TYPES.PRODUCTS_WAREHOUSE_CONTROLLER).to(ProductsWarehouseController);


export { iocContainer };
