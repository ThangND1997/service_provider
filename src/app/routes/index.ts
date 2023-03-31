import * as express from "express";
import betiuService from "../routes/BetiuService"

const router = express.Router();

router.use("/betiu-services", betiuService);

export default router;