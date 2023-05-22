import * as express from "express";
import { iocContainer } from "../../../ioc/IoCContainer";
import { TYPES } from "../../../ioc/Types";
import { IUsersController } from "../../controllers";
import { hasPrivilege, verifyContext } from "../../../middlewares/authorization";
import { ROLE } from "../../../libs/Contant";

const router = express.Router();
const controller = iocContainer.get<IUsersController>(TYPES.USERS_CONTROLLER);

router.route("/")
    .post(verifyContext(), hasPrivilege([ROLE.ADMIN]), controller.create.bind(controller))
    .get(verifyContext(), hasPrivilege([ROLE.USER, ROLE.ADMIN]), controller.search.bind(controller));

router.route("/:id")
    .get(controller.view.bind(controller))
    .put(controller.update.bind(controller))
    .delete(controller.delete.bind(controller))

router.route("/login")
    .post(controller.login.bind(controller));

router.route("/register")
    .post(controller.register.bind(controller))

export default router;