"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const BetiuService_1 = require("../routes/BetiuService");
const router = express.Router();
router.use("/betiu-services", BetiuService_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map