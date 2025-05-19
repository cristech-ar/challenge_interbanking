const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../db/models/userModel');

const router = express.Router();

router.post('/login', async (req, res) => {
  const { userName, password } = req.body;

  if (!userName || !password) {
    return res.status(400).json({ error: 'User and password are required' });
  }

  try {
    const user = await User.findOne({ userName });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) return res.status(401).json({ error: 'Invalid credentials' });

    const accessToken = jwt.sign(
      {userNem: user.userName, type: 'access' },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '15m' }
    );

    const refreshToken = jwt.sign(
      { userName: user.userName },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '1d' }
    );

    user.refreshToken = refreshToken;
    await user.save();

    res.json({ accessToken, refreshToken });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/refresh-token', async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ error: 'Refresh token required' });
  }

  try {

    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    const user = await User.findOne({ userName: payload.userName });
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(401).json({ error: 'Invalid or revoked refresh token' });
    }

    const newAccessToken = jwt.sign(
      { userName: user.userName },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '15m' }
    );

    res.json({ accessToken: newAccessToken });
  } catch (err) {
    console.error('Refresh token error:', err);
    res.status(401).json({ error: 'Invalid or expired refresh token' });
  }
});


module.exports = { authRoutes: router };