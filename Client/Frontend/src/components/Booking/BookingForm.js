import React, { useState } from 'react';
import { createBooking } from '../../api/booking';

const BookingForm = () => {
  const [details, setDetails] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bookingData = { details };
    try {
      const response = await createBooking(bookingData);
      console.log(response);
      // Handle booking success (e.g., show confirmation)
    } catch (error) {
      console.error('Booking error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={details}
        onChange={(e) => setDetails(e.target.value)}
        placeholder="Booking details"
      />
      <button type="submit">Book Now</button>
    </form>
  );
};

export default BookingForm;
