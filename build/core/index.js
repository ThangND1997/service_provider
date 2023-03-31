"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = exports.Configuration = void 0;
const Configuration_1 = require("./Configuration");
const Logger_1 = require("./Logger");
const Configuration = Configuration_1.default.load();
exports.Configuration = Configuration;
const Logger = new Logger_1.default();
exports.Logger = Logger;
//# sourceMappingURL=index.js.map