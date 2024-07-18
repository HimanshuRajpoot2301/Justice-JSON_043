const express = require('express');
const router = express.Router();
const { search, createBooking, getBooking } = require('../controllers/bookingController');

// @route   GET api/bookings/search
// @desc    Search for travel options
// @access  Public
router.get('/search', search);

// @route   POST api/bookings
// @desc    Create a new booking
// @access  Private
router.post('/', createBooking);

// @route   GET api/bookings/:id
// @desc    Get booking details
// @access  Private
router.get('/:id', getBooking);

module.exports = router;
