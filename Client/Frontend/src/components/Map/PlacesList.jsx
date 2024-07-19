import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PlacesList = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get('/api/map/places');
        setPlaces(response.data);
      } catch (error) {
        console.error('Error fetching places:', error);
      }
    };

    fetchPlaces();
  }, []);

  return (
    <div>
      <h2>Nearby Places</h2>
      <ul>
        {places.map((place) => (
          <li key={place.id}>{place.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default PlacesList;
