import express from "express";
import { getExploreStyles, addExploreStyle, deleteExploreStyle, upload } from "../controllers/exploreController.js";

const router = express.Router();

router.get("/", getExploreStyles);
router.post("/", upload.single("image"), addExploreStyle);
router.delete("/:id", deleteExploreStyle);

export default router;
