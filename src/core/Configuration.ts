import * as fs from "fs";
import * as yaml from "js-yaml";
import * as path from "path";

class Configuration {
    public static load(): any {
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
        } catch (err) {
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
            } catch (err) {
                console.log(`Error when loading configuration file configuration.yaml, using default value for each module: ${err.message}`);
            }
        }

        return conf;
    }
}

export default Configuration;
