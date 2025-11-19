const express = require('express');
const router = express.Router();
const {
  createFeedback,
  getAllFeedback,
  getFeedbackByRating
} = require('../controllers/feedbackController');

// POST /api/feedback - Create new feedback
router.post('/', createFeedback);

// GET /api/feedback - Get all feedback
router.get('/', getAllFeedback);

// GET /api/feedback/rating/:rating - Get feedback by rating
router.get('/rating/:rating', getFeedbackByRating);

module.exports = router;
