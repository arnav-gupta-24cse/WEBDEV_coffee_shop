const Reservation = require('../models/Reservation');

// Create a new reservation
const createReservation = async (req, res) => {
  try {
    const { name, email, phone, date, time, guests, notes } = req.body;

    const reservation = new Reservation({
      name,
      email,
      phone,
      date,
      time,
      guests,
      notes
    });

    await reservation.save();

    res.status(201).json({
      success: true,
      message: 'Reservation created successfully',
      reservation
    });
  } catch (error) {
    console.error('Create reservation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create reservation',
      error: error.message
    });
  }
};

// Get all reservations
const getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().sort({ date: 1, time: 1 });

    res.status(200).json({
      success: true,
      reservations
    });
  } catch (error) {
    console.error('Get reservations error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch reservations',
      error: error.message
    });
  }
};

// Get reservations by email
const getReservationsByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const reservations = await Reservation.find({ email }).sort({ date: -1 });

    res.status(200).json({
      success: true,
      reservations
    });
  } catch (error) {
    console.error('Get reservations by email error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch reservations',
      error: error.message
    });
  }
};

module.exports = {
  createReservation,
  getReservations,
  getReservationsByEmail
};
