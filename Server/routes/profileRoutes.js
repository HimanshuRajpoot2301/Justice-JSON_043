const express = require('express');
const router = express.Router();
const { getProfile, updateProfile } = require('../controllers/profileController');
const auth = require('../middleware/authMiddleware');

// @route   GET api/profile
// @desc    Get current user's profile
// @access  Private
router.get('/', auth, getProfile);

// @route   PUT api/profile
// @desc    Update current user's profile
// @access  Private
router.put('/', auth, updateProfile);

module.exports = router;
