import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hash });
    res.status(201).json({ id: user._id, username: user.username });
  } catch (err) {
    res.status(400).json({ error: 'Registration failed' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, username: user.username });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
});

router.post('/guest', async (req, res) => {
  try {
    const count = await User.countDocuments({ isGuest: true });
    const username = `Guest${count + 1}`;
    const user = await User.create({ username, email: `${username}@example.com`, isGuest: true });
    const token = jwt.sign({ id: user._id, guest: true }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(201).json({ token, username: user.username });
  } catch (err) {
    res.status(500).json({ error: 'Guest creation failed' });
  }
});

export default router;
