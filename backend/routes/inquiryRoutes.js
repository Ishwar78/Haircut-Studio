import express from "express";
const router = express.Router();

import {
  createInquiry,
  getAllInquiry
} from "../controllers/inquiryController.js";

router.post("/create", createInquiry);
router.get("/all", getAllInquiry);

export default router;