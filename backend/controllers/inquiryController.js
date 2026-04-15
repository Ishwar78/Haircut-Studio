import Inquiry from "../models/Inquiry.js";

// save inquiry
export const createInquiry = async (req, res) => {
  try {
    const data = await Inquiry.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// get all inquiries (admin)
export const getAllInquiry = async (req, res) => {
  try {
    const data = await Inquiry.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ DELETE INQUIRY
export const deleteInquiry = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Inquiry.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Inquiry not found" });
    }

    res.status(200).json({ message: "Inquiry deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};