const express = require('express');
const router = express.Router();
const {
  createPayment,
  getPayment,
} = require('../controllers/paymentController');

// @route   POST api/payments
// @desc    Process a payment
// @access  Private
router.post('/', createPayment);

// @route   GET api/payments/:id
// @desc    Get payment details
// @access  Private
router.get('/:id', getPayment);

module.exports = router;
