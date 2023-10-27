import * as express from "express";
import usersRouter from "./UserRouter";
import productsWarehouseRouter from "./ProductsWarehouseRouter"

const router = express.Router();

router.use("/users", usersRouter);
router.use("/products-warehouse", productsWarehouseRouter);

export default router;