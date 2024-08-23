import express from "express";
import groceriesRouter from "./groceries";
import tokenCheck from "../../middlewares/tokenCheck";

const router = express.Router();

router.use("/groceries", tokenCheck, groceriesRouter);

export default router;
