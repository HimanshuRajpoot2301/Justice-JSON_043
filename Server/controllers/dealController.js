const Deal = require('../models/Deal');

exports.getDeals = async (req, res) => {
  try {
    const deals = await Deal.find();
    res.json(deals);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.createDeal = async (req, res) => {
  const { title, description, discount } = req.body;

  try {
    const deal = new Deal({
      title,
      description,
      discount,
    });

    await deal.save();
    res.json(deal);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
