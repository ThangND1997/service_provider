import * as _ from "lodash";
import ConfigurationModule from "./Configuration";
import LogModule from "./Logger";

const Configuration = ConfigurationModule.load();
const Logger = new LogModule();

export { Configuration, Logger};