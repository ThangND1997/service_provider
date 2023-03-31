"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const IoCContainer_1 = require("../../../ioc/IoCContainer");
const Types_1 = require("../../../ioc/Types");
const router = express.Router();
const controller = IoCContainer_1.iocContainer.get(Types_1.TYPES.USERS_CONTROLLER);
router.route("/")
    .post(controller.create.bind(controller));
router.route("/")
    .get(controller.search.bind(controller));
exports.default = router;
//# sourceMappingURL=UserRouter.js.map