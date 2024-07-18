const Payment = require('../models/Payment');
const { processPayment } = require('../utils/paymentService');

exports.createPayment = async (req, res) => {
  const { userId, amount, paymentMethod } = req.body;

  try {
    const paymentResult = await processPayment(amount, paymentMethod);

    const payment = new Payment({
      user: userId,
      amount,
      status: paymentResult.status,
    });

    await payment.save();
    res.json(payment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getPayment = async (req, res) => {
  const { id } = req.params;

  try {
    const payment = await Payment.findById(id);
    if (!payment) {
      return res.status(404).json({ msg: 'Payment not found' });
    }

    res.json(payment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
