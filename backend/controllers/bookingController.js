import Booking from "../models/Booking.js";

// ✅ CREATE BOOKING
export const createBooking = async (req, res) => {
  try {
    const { name, phone, service, date } = req.body;

    const newBooking = new Booking({
      name,
      phone,
      service,
      date,
      status: "pending", // ✅ default status
    });

    await newBooking.save();

    res.status(201).json({
      message: "Booking created successfully",
      data: newBooking,
    });
  } catch (error) {
    console.error("Booking Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ GET ALL BOOKINGS
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings" });
  }
};

// ✅ DELETE BOOKING
export const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Booking.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete error" });
  }
};

// ✅ UPDATE STATUS
export const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updated = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Update failed" });
  }
};

// ✅ GET SINGLE (optional)
export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: "Error fetching booking" });
  }
};