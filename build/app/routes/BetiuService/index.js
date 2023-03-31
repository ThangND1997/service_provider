"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const UserRouter_1 = require("./UserRouter");
const router = express.Router();
router.use("/users", UserRouter_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map