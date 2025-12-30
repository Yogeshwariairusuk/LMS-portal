const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// SIGNUP
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const user = new User({
      name,
      email,
      password,
      role: role || 'student',
    });

    await user.save();

    res.status(201).json({
      message: 'Signup successful',
      name: user.name,
      role: user.role,
    });
  } catch (err) {
    console.error('Signup error:', err); // log full error
    res.status(500).json({ error: err.message }); // send actual error to client
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    const user = await User.findOne({ email, role: role || 'student' });
    if (!user) return res.status(400).json({ error: 'User not found' });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid password' });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      'supersecretkey',
      { expiresIn: '1d' }
    );

    res.json({ token, name: user.name, role: user.role });
  } catch (err) {
    console.error('Login error:', err); // full error logging
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
