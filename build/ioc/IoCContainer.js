"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.iocContainer = void 0;
require("reflect-metadata");
const inversify_1 = require("inversify");
const Types_1 = require("../ioc/Types");
const UsersRepository_1 = require("../app/repositories/UsersRepository");
const UsersService_1 = require("../app/services/UsersService");
const controllers_1 = require("../app/controllers");
const UsersConverter_1 = require("../data/converters/UsersConverter");
const iocContainer = new inversify_1.Container();
exports.iocContainer = iocContainer;
iocContainer.bind(Types_1.TYPES.USERS_CONVERTER).to(UsersConverter_1.default);
iocContainer.bind(Types_1.TYPES.USERS_REPOSITORY).to(UsersRepository_1.default);
iocContainer.bind(Types_1.TYPES.USERS_SERVICE).to(UsersService_1.default);
iocContainer.bind(Types_1.TYPES.USERS_CONTROLLER).to(controllers_1.UsersController);
//# sourceMappingURL=IoCContainer.js.map