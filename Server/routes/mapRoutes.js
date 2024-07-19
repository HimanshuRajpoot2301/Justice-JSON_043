const express = require('express');
const router = express.Router();
const { getRoutes, getPlaces } = require('../controllers/mapController');

// @route   GET api/maps/routes
// @desc    Get route planning details
// @access  Public
router.get('/routes', getRoutes);

// @route   GET api/maps/places
// @desc    Get nearby amenities and attractions
// @access  Public
router.get('/places', getPlaces);

module.exports = router;
