import express from "express";
import { 
  getColors, addColor, deleteColor, 
  getQuickStyles, addQuickStyle, deleteQuickStyle, 
  upload 
} from "../controllers/tryNowController.js";

const router = express.Router();

router.get("/colors", getColors);
router.post("/colors", addColor);
router.delete("/colors/:id", deleteColor);

router.get("/quick-styles", getQuickStyles);
router.post("/quick-styles", upload.single("image"), addQuickStyle);
router.delete("/quick-styles/:id", deleteQuickStyle);

export default router;
