const mongoose = require('mongoose');

const MapSchema = new mongoose.Schema({
  routes: {
    type: Map,
    of: String,
  },
  places: {
    type: Map,
    of: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Map', MapSchema);
