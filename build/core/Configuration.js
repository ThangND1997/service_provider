"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const yaml = require("js-yaml");
const path = require("path");
class Configuration {
    static load() {
        const conf = {};
        const url = path.join(__dirname, "..", "configs");
        if (process.env.NODE_ENV == null) {
            process.env.NODE_ENV = "development";
        }
        try {
            const doc = yaml.safeLoad(fs.readFileSync(`${url}/${process.env.NODE_ENV}.yaml`, "utf8"));
            if (doc) {
                const keys = Object.keys(doc);
                for (let key of keys) {
                    const val = doc[key];
                    if (val != null) {
                        conf[key] = val;
                    }
                }
            }
        }
        catch (err) {
            console.log(`Error when loading configuration file ${process.env.NODE_ENV}.yaml, fallback to configuration.yaml`);
            try {
                const doc = yaml.safeLoad(fs.readFileSync(`${url}/configuration.yaml`, "utf8"));
                if (doc) {
                    const keys = Object.keys(doc);
                    for (let key of keys) {
                        const val = doc[key];
                        if (val != null) {
                            conf[key] = val;
                        }
                    }
                }
            }
            catch (err) {
                console.log(`Error when loading configuration file configuration.yaml, using default value for each module: ${err.message}`);
            }
        }
        return conf;
    }
}
exports.default = Configuration;
//# sourceMappingURL=Configuration.js.map