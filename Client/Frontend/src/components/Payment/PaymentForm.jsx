import React, { useState } from 'react';
import { processPayment } from '../../api/payment';

const PaymentForm = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const paymentData = { cardNumber, expiryDate, cvv };
    try {
      const response = await processPayment(paymentData);
      console.log(response);
      // Handle payment success
    } catch (error) {
      console.error('Payment error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={cardNumber}
        onChange={(e) => setCardNumber(e.target.value)}
        placeholder="Card Number"
      />
      <input
        type="text"
        value={expiryDate}
        onChange={(e) => setExpiryDate(e.target.value)}
        placeholder="Expiry Date"
      />
      <input
        type="text"
        value={cvv}
        onChange={(e) => setCvv(e.target.value)}
        placeholder="CVV"
      />
      <button type="submit">Pay Now</button>
    </form>
  );
};

export default PaymentForm;
