import HairColor from "../models/HairColor.js";
import QuickStyle from "../models/QuickStyle.js";
import multer from "multer";
import path from "path";

// Multer Config for Quick Styles
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, `quickstyle-${Date.now()}${path.extname(file.originalname)}`);
  }
});

export const upload = multer({ storage });

// COLORS
export const getColors = async (req, res) => {
  try {
    const colors = await HairColor.find();
    res.json(colors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addColor = async (req, res) => {
  try {
    const color = await HairColor.create(req.body);
    res.json(color);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteColor = async (req, res) => {
  try {
    await HairColor.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// QUICK STYLES
export const getQuickStyles = async (req, res) => {
  try {
    const styles = await QuickStyle.find();
    res.json(styles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addQuickStyle = async (req, res) => {
  try {
    const { name } = req.body;
    const imgUrl = req.file ? `/uploads/${req.file.filename}` : "";
    const style = await QuickStyle.create({ name, img: imgUrl });
    res.json(style);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteQuickStyle = async (req, res) => {
  try {
    await QuickStyle.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
