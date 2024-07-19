import axios from 'axios';

const API_URL = '/api/bookings';

export const searchBookings = async (query) => {
  const response = await axios.get(`${API_URL}/search`, { params: query });
  return response.data;
};

export const createBooking = async (bookingData) => {
  const response = await axios.post(API_URL, bookingData);
  return response.data;
};

export const getBooking = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};