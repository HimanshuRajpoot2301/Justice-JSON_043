const Review = require('../models/Review');

exports.addReview = async (req, res) => {
  const { userId, bookingId, rating, comment } = req.body;

  try {
    const review = new Review({
      user: userId,
      booking: bookingId,
      rating,
      comment,
    });

    await review.save();
    res.json(review);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getReviews = async (req, res) => {
  const { id } = req.params;

  try {
    const reviews = await Review.find({ booking: id });
    res.json(reviews);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
