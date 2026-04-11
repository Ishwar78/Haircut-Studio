import Explore from "../models/Explore.js";
import multer from "multer";
import path from "path";
import fs from "fs";

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

export const upload = multer({ storage });

export const getExploreStyles = async (req, res) => {
  try {
    const styles = await Explore.find().sort({ createdAt: -1 });
    res.json(styles);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const addExploreStyle = async (req, res) => {
  const { name, category, length, tag } = req.body;
  const imgUrl = req.file ? `/uploads/${req.file.filename}` : "";

  if (!imgUrl) return res.status(400).json({ message: "Image is required" });

  try {
    const newStyle = new Explore({ name, category, length, tag, img: imgUrl });
    await newStyle.save();
    res.json(newStyle);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteExploreStyle = async (req, res) => {
  const { id } = req.params;
  try {
    const style = await Explore.findById(id);
    if (!style) return res.status(404).json({ message: "Style not found" });

    // Delete image file
    const imagePath = path.join(path.resolve(), style.img);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    await Explore.findByIdAndDelete(id);
    res.json({ message: "Style deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
