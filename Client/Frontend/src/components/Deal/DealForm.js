import React, { useState } from 'react';
import axios from 'axios';

const DealForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [discount, setDiscount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/deals', {
        title,
        description,
        discount,
      });
      console.log('Deal created:', response.data);
      // Clear the form
      setTitle('');
      setDescription('');
      setDiscount('');
    } catch (error) {
      console.error('Error creating deal:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create a Deal</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Deal Title"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Deal Description"
        required
      />
      <input
        type="text"
        value={discount}
        onChange={(e) => setDiscount(e.target.value)}
        placeholder="Discount"
        required
      />
      <button type="submit">Create Deal</button>
    </form>
  );
};

export default DealForm;
