import React, { useEffect, useRef } from 'react';

const MapView = ({ coordinates }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      const map = new window.google.maps.Map(mapRef.current, {
        center: coordinates,
        zoom: 8,
      });
      new window.google.maps.Marker({
        position: coordinates,
        map,
      });
    }
  }, [coordinates]);

  return <div ref={mapRef} style={{ height: '400px', width: '100%' }}></div>;
};

export default MapView;
