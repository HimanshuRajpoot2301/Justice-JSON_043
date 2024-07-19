import React from 'react';
import ReviewForm from '../components/Review/ReviewForm';
import ReviewList from '../components/Review/ReviewList';

const ReviewPage = () => {
  const bookingId = 'some-booking-id'; // Replace with actual booking ID

  return (
    <div>
      <h1>Reviews</h1>
      <ReviewForm bookingId={bookingId} />
      <ReviewList bookingId={bookingId} />
    </div>
  );
};

export default ReviewPage;
