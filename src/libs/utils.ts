import * as bcrypt from "bcrypt";
import { Logger } from "../core";

class Utils {
    private saltRound = 10;

    public async hashPasswordFunc(password: string): Promise<string> {
        try {
            const salt = await bcrypt.genSalt(this.saltRound);
            return await bcrypt.hash(password, salt);
        } catch (error) {
            Logger.error("Handle faild hasd password.")
            return "";
        }
    }
}

export default new Utils();