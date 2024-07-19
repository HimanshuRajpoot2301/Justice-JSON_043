const express = require('express');
const router = express.Router();
const { getDeals, createDeal } = require('../controllers/dealController');

// @route   GET api/deals
// @desc    Get current deals and discounts
// @access  Public
router.get('/', getDeals);

// @route   POST api/deals
// @desc    Create a new deal
// @access  Private
router.post('/', createDeal);

module.exports = router;
