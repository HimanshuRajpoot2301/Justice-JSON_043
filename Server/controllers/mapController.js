const { getRoutes, getPlaces } = require('../utils/mapService');

exports.getRoutes = async (req, res) => {
  const { start, end } = req.query;

  try {
    const routes = await getRoutes(start, end);
    res.json(routes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getPlaces = async (req, res) => {
  const { location } = req.query;

  try {
    const places = await getPlaces(location);
    res.json(places);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
