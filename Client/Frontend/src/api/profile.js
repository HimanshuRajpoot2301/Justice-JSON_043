import axios from 'axios';

const API_URL = '/api/profile';

export const getProfile = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const updateProfile = async (profileData) => {
  const response = await axios.put(API_URL, profileData);
  return response.data;
};