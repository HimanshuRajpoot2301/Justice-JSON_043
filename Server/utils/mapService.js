const axios = require('axios');

const getRoutes = async (start, end) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${start}&destination=${end}&key=${process.env.GOOGLE_MAPS_API_KEY}`
    );
    return response.data.routes;
  } catch (error) {
    console.error('Error getting routes:', error);
    throw error;
  }
};

const getPlaces = async (location) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=1500&key=${process.env.GOOGLE_MAPS_API_KEY}`
    );
    return response.data.results;
  } catch (error) {
    console.error('Error getting places:', error);
    throw error;
  }
};

module.exports = {
  getRoutes,
  getPlaces,
};
