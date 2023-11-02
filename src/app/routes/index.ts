import * as express from "express";
import betiuService from "../routes/BetiuService"

const router = express.Router();

router.use("/betiu-services", betiuService);
router.get("health-check", (req, res) => {
    res.status(200)
    res.send();
});

export default router;