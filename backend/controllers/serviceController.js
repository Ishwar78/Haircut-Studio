import Service from "../models/Service.js";

// CREATE
export const createService = async (req, res) => {
  try {
    const service = await Service.create(req.body);
    res.json(service);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ALL
export const getServices = async (req, res) => {
  try {
    const services = await Service.find({ isActive: true });
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ADMIN GET ALL
export const getAllServicesAdmin = async (req, res) => {
  const services = await Service.find();
  res.json(services);
};

// UPDATE
export const updateService = async (req, res) => {
  const service = await Service.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(service);
};

// DELETE
export const deleteService = async (req, res) => {
  await Service.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};