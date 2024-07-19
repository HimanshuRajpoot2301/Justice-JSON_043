import axios from 'axios';

const API_URL = '/api/payments';

export const processPayment = async (paymentData) => {
  const response = await axios.post(API_URL, paymentData);
  return response.data;
};