import express from "express";
import { qrGen } from "../../controller/qrGenVcard.js";
import { createUpiCode } from "../../controller/qrGenUpi.js";
import { createUpiCodeAccount } from "../../controller/qrGenAccount.js";


const router = express.Router();

router.get('/qrGen', qrGen);
router.get('/upi',createUpiCode)
router.get('/upiac',createUpiCodeAccount)

export default router;
