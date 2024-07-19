import React, { useState } from 'react';
import { createReview } from '../../api/review';

const ReviewForm = ({ bookingId }) => {
  const [text, setText] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reviewData = { text, rating, bookingId };
    try {
      const response = await createReview(reviewData);
      console.log(response);
      // Handle review submission success
    } catch (error) {
      console.error('Review submission error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your review"
      />
      <input
        type="number"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        placeholder="Rating"
        max="5"
        min="1"
      />
      <button type="submit">Submit Review</button>
    </form>
  );
};

export default ReviewForm;
