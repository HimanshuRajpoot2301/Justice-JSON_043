const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  personalInfo: {
    type: Map,
    of: String,
  },
  preferences: {
    type: Map,
    of: String,
  },
  pastBookings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
  }],
});

module.exports = mongoose.model('Profile', ProfileSchema);
