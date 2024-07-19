import axios from 'axios';

const API_URL = '/api/reviews';

export const createReview = async (reviewData) => {
  const response = await axios.post(API_URL, reviewData);
  return response.data;
};

export const getReviews = async (bookingId) => {
  const response = await axios.get(`${API_URL}/booking/${bookingId}`);
  return response.data;
};