const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const processPayment = async (amount, paymentMethod) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method: paymentMethod,
      confirm: true,
    });

    return paymentIntent;
  } catch (error) {
    console.error('Error processing payment:', error);
    throw error;
  }
};

module.exports = {
  processPayment,
};
