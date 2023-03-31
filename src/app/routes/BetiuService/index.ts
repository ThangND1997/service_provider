import * as express from "express";
import usersRouter from "./UserRouter";

const router = express.Router();

router.use("/users", usersRouter);

export default router;