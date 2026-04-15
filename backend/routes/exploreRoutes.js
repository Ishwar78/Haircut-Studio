import express from "express";
import {
  getExploreStyles,
  addExploreStyle,
  deleteExploreStyle,
  upload,
  updateExploreStyle
} from "../controllers/exploreController.js";

const router = express.Router(); // ✅ YE PEHLE AAYEGA

router.get("/", getExploreStyles);
router.post("/", upload.single("image"), addExploreStyle);
router.delete("/:id", deleteExploreStyle);
router.put("/:id", upload.single("image"), updateExploreStyle); // ✅ UPDATE

export default router;