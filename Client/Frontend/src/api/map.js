import axios from 'axios';

const API_URL = '/api/maps';

export const getRoutes = async (start, end) => {
  const response = await axios.get(`${API_URL}/routes`, { params: { start, end } });
  return response.data;
};

export const getPlaces = async (location) => {
  const response = await axios.get(`${API_URL}/places`, { params: { location } });
  return response.data;
};