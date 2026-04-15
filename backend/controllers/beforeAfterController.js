import multer from "multer";
import path from "path";
import fs from "fs";
import BeforeAfter from "../models/BeforeAfter.js";

// ✅ Ensure uploads folder exists
const uploadsPath = path.join(process.cwd(), "uploads");

if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath);
}

// ✅ Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsPath); // dynamic path
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

export const upload = multer({ storage });

// ✅ CREATE (FIXED IMAGE PATH)
export const createBeforeAfter = async (req, res) => {
  try {
    const beforeImage = req.files?.beforeImage
      ? `uploads/${req.files.beforeImage[0].filename}`
      : "";

    const afterImage = req.files?.afterImage
      ? `uploads/${req.files.afterImage[0].filename}`
      : "";

    if (!beforeImage || !afterImage) {
      return res.status(400).json({ message: "Both images are required" });
    }

    const data = await BeforeAfter.create({
      beforeImage,
      afterImage,
      isActive: true, // optional but useful
    });

    res.json(data);
  } catch (err) {
    console.error("Upload Error:", err);
    res.status(500).json({ error: err.message });
  }
};

// ✅ GET (USER)
export const getBeforeAfter = async (req, res) => {
  try {
    const data = await BeforeAfter.find({ isActive: true });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ ADMIN GET
export const getAllBeforeAfter = async (req, res) => {
  try {
    const data = await BeforeAfter.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ DELETE (OPTIONAL: FILE DELETE BHI)
export const deleteBeforeAfter = async (req, res) => {
  try {
    const item = await BeforeAfter.findById(req.params.id);

    if (item) {
      // delete files from uploads
      if (item.beforeImage) {
        const beforePath = path.join(process.cwd(), item.beforeImage);
        if (fs.existsSync(beforePath)) fs.unlinkSync(beforePath);
      }

      if (item.afterImage) {
        const afterPath = path.join(process.cwd(), item.afterImage);
        if (fs.existsSync(afterPath)) fs.unlinkSync(afterPath);
      }

      await BeforeAfter.findByIdAndDelete(req.params.id);
    }

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};