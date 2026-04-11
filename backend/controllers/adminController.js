import Admin from "../models/Admin.js";
import User from "../models/User.js";
import Service from "../models/Service.js";
import Booking from "../models/Booking.js";

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ message: "Invalid credentials" });

    // For simplicity, we compare plain text as requested or if it's the seed admin
    if (admin.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({ message: "Login successful", token: "dummy-jwt-token" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalBookings = await Booking.countDocuments();
    const totalServices = await Service.countDocuments();

    res.json({
      users: totalUsers,
      bookings: totalBookings,
      services: totalServices
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
