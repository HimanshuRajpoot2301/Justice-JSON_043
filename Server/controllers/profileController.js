const User = require('../models/User');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.updateProfile = async (req, res) => {
  const { name, email, preferences } = req.body;

  try {
    let user = await User.findById(req.user.id);

    if (user) {
      user.name = name || user.name;
      user.email = email || user.email;
      user.preferences = preferences || user.preferences;

      await user.save();
      return res.json(user);
    }

    res.status(404).json({ msg: 'User not found' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
