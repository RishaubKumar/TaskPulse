const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User.model');

const generateToken = (userId) => {
  const secret = process.env.JWT_SECRET || 'taskpulse_btech_secret_key_2026';
  return jwt.sign({ userId }, secret, { expiresIn: '7d' });
};

const sanitizeUser = (userDoc) => {
  const userObj = userDoc.toObject ? userDoc.toObject() : { ...userDoc };
  delete userObj.password;
  return userObj;
};

const register = async (req, res) => {
  try {
    const { firstName, lastName, email, collegeName, branch, currentYear, gYear, password } = req.body;

    if (!firstName || !email || !password) {
      return res.status(400).json({ error: 'First name, email, and password are required.' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({ error: 'An account with this email already exists.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      firstName: firstName.trim(),
      lastName: lastName ? lastName.trim() : '',
      email: normalizedEmail,
      collegeName: collegeName ? collegeName.trim() : '',
      branch: branch || 'Computer science / IT',
      currentYear: currentYear || 'Year 1',
      gYear: gYear || '2028',
      password: hashedPassword,
      roadmap: [],
      evidence: [],
      reviews: []
    });

    const token = generateToken(newUser._id);

    res.status(201).json({
      message: 'Success',
      token,
      user: sanitizeUser(newUser)
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Failed to create account. Please try again.' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password.' });
    }

    let isMatch = false;
    if (user.password.startsWith('$2a$') || user.password.startsWith('$2b$')) {
      isMatch = await bcrypt.compare(password, user.password);
    } else if (user.password === password) {
      isMatch = true;
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
    }

    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password.' });
    }

    const token = generateToken(user._id);

    res.json({
      message: 'Success',
      token,
      user: sanitizeUser(user)
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed. Please try again.' });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    res.json({ user });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Failed to retrieve profile.' });
  }
};

module.exports = {
  register,
  login,
  getMe
};
