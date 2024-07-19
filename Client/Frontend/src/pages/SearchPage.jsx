import React, { useState } from 'react';
import BookingList from '../components/Booking/BookingList';

const SearchPage = () => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    // Trigger search logic
  };

  return (
    <div>
      <h1>Search</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for flights, hotels, activities..."
      />
      <button onClick={handleSearch}>Search</button>
      <BookingList />
    </div>
  );
};

export default SearchPage;
