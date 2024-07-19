import axios from 'axios';

const API_URL = '/api/deals';

export const getDeals = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createDeal = async (dealData) => {
  const response = await axios.post(API_URL, dealData);
  return response.data;
};