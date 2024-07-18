const Booking = require('../models/Booking');

exports.search = async (req, res) => {
  // Implement search logic here
  res.send('Search results');
};

exports.createBooking = async (req, res) => {
  const { userId, details } = req.body;

  try {
    const booking = new Booking({
      user: userId,
      details,
    });

    await booking.save();
    res.json(booking);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getBooking = async (req, res) => {
  const { id } = req.params;

  try {
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ msg: 'Booking not found' });
    }

    res.json(booking);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
