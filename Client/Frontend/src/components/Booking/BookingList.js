import React, { useEffect, useState } from 'react';
import { searchBookings } from '../../api/booking';

const BookingList = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await searchBookings();
        setBookings(response);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };
    fetchBookings();
  }, []);

  return (
    <div>
      <h2>Bookings</h2>
      <ul>
        {bookings.map((booking) => (
          <li key={booking._id}>{booking.details}</li>
        ))}
      </ul>
    </div>
  );
};

export default BookingList;
