const express = require('express');
const router = express.Router();
const {
  getNotifications,
  createNotification,
} = require('../controllers/notificationController');
const auth = require('../middleware/authMiddleware');

// @route   GET api/notifications
// @desc    Get notifications for the current user
// @access  Private
router.get('/', auth, getNotifications);

// @route   POST api/notifications
// @desc    Create a new notification
// @access  Private
router.post('/', createNotification);

module.exports = router;
