import * as express from "express";
import { iocContainer } from "../../../ioc/IoCContainer";
import { TYPES } from "../../../ioc/Types";
import { hasPrivilege, verifyContext } from "../../../middlewares/authorization";
import { ROLE } from "../../../libs/Contant";
import IProductsWarehouseController from "../../controllers/IProductsWarehouseController";

const router = express.Router();
const controller = iocContainer.get<IProductsWarehouseController>(TYPES.PRODUCTS_WAREHOUSE_CONTROLLER);
router.route("/:id")
    .put(verifyContext(), hasPrivilege([ROLE.ADMIN]), controller.update.bind(controller))
    .delete(verifyContext(), hasPrivilege([ROLE.ADMIN]), controller.delete.bind(controller));

router.route("/report")
    .get(verifyContext(), hasPrivilege([ROLE.ADMIN]), controller.report.bind(controller))

router.route("/:id/release")
    .post(verifyContext(), hasPrivilege([ROLE.ADMIN]), controller.release.bind(controller))

router.route("/releases")
    .post(verifyContext(), hasPrivilege([ROLE.ADMIN]), controller.releases.bind(controller))    

router.route("/category")
    .post(verifyContext(), hasPrivilege([ROLE.ADMIN]), controller.addCategory.bind(controller))
    .get(verifyContext(), hasPrivilege([ROLE.MEMBER, ROLE.ADMIN]), controller.retrieveCategory.bind(controller));    

router.route("/")
    .post(verifyContext(), hasPrivilege([ROLE.ADMIN]), controller.create.bind(controller))
    .get(verifyContext(), hasPrivilege([ROLE.MEMBER, ROLE.ADMIN]), controller.search.bind(controller));

export default router;