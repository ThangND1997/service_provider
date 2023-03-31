"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const IoCContainer_1 = require("../../../ioc/IoCContainer");
const Types_1 = require("../../../ioc/Types");
const router = express.Router();
const controller = IoCContainer_1.iocContainer.get(Types_1.TYPES.USERS_CONTROLLER);
router.route("/")
    .post(controller.create.bind(controller))
    .get(controller.search.bind(controller));
router.route("/:id")
    .get(controller.view.bind(controller))
    .put(controller.update.bind(controller))
    .delete(controller.delete.bind(controller));
router.route("/login")
    .post(controller.login.bind(controller));
exports.default = router;
//# sourceMappingURL=UserRouter.js.map