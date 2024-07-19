import React, { useEffect, useState } from 'react';
import { getDeals } from '../../api/deal';

const DealList = () => {
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const response = await getDeals();
        setDeals(response);
      } catch (error) {
        console.error('Error fetching deals:', error);
      }
    };
    fetchDeals();
  }, []);

  return (
    <div>
      <h2>Deals</h2>
      <ul>
        {deals.map((deal) => (
          <li key={deal._id}>{deal.description}</li>
        ))}
      </ul>
    </div>
  );
};

export default DealList;
