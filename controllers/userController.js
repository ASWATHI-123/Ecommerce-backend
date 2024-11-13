const User = require('../models/User');

const getUserProfile = async (req, res) => {
    const user = req.user;
    res.json({ name: user.name, email: user.email });
};

const updateUserProfile = async (req, res) => {
    const { name, email } = req.body;
    const user = req.user;

    user.name = name || user.name;
    user.email = email || user.email;

    await user.save();
    res.json({ message: 'Profile updated successfully' });
};

module.exports = { getUserProfile, updateUserProfile };
