const express = require('express');
const router = express.Router();
const { addReview, getReviews } = require('../controllers/reviewController');

// @route   POST api/reviews
// @desc    Submit a new review
// @access  Private
router.post('/', addReview);

// @route   GET api/reviews/:id
// @desc    Get reviews for a specific booking
// @access  Public
router.get('/:id', getReviews);

module.exports = router;
