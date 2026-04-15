import BeforeAfter from "../models/BeforeAfter.js";

// CREATE
export const createBeforeAfter = async (req, res) => {
  try {
    const { beforeImage, afterImage } = req.body;

    const data = await BeforeAfter.create({
      beforeImage,
      afterImage
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET (USER)
export const getBeforeAfter = async (req, res) => {
  const data = await BeforeAfter.find({ isActive: true }).limit(1);
  res.json(data[0]);
};

// ADMIN GET
export const getAllBeforeAfter = async (req, res) => {
  const data = await BeforeAfter.find();
  res.json(data);
};

// DELETE
export const deleteBeforeAfter = async (req, res) => {
  await BeforeAfter.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};