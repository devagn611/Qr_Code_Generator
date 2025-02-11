import express from "express";
import qrGenRouter from "./v1/qrGen.js";

const router = express.Router();

router.use('/v1', qrGenRouter);

export default router;
