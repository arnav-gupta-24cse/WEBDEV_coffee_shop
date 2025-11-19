const express = require('express');
const router = express.Router();
const {
  createReservation,
  getReservations,
  getReservationsByEmail
} = require('../controllers/reservationController');

// POST /api/reservations - Create new reservation
router.post('/', createReservation);

// GET /api/reservations - Get all reservations
router.get('/', getReservations);

// GET /api/reservations/email/:email - Get reservations by email
router.get('/email/:email', getReservationsByEmail);

module.exports = router;
