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
    .get(verifyContext(), hasPrivilege([ROLE.ADMIN]), controller.search.bind(controller));

router.route("/:id/approve")
    .post(verifyContext(), hasPrivilege([ROLE.ADMIN]), controller.approve.bind(controller));

router.route("/:id/reject")
    .post(verifyContext(), hasPrivilege([ROLE.ADMIN]), controller.reject.bind(controller));    

router.route("/:id")
    .get(verifyContext(), hasPrivilege([ROLE.ADMIN, ROLE.MEMBER]), controller.view.bind(controller))
    .put(verifyContext(), hasPrivilege([ROLE.ADMIN]), controller.update.bind(controller))
    .delete(verifyContext(), hasPrivilege([ROLE.ADMIN]), controller.delete.bind(controller))

router.route("/login")
    .post(controller.login.bind(controller));

router.route("/register")
    .post(controller.register.bind(controller))

export default router;