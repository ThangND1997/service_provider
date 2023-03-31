import * as express from "express";
import { iocContainer } from "../../../ioc/IoCContainer";
import { TYPES } from "../../../ioc/Types";
import { IUsersController } from "../../controllers";

const router = express.Router();
const controller = iocContainer.get<IUsersController>(TYPES.USERS_CONTROLLER);

router.route("/")
    .post(controller.create.bind(controller));

router.route("/")
    .get(controller.search.bind(controller));

export default router;