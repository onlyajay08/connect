import express from 'express';
import Message from '../models/Message.js';
import Chat from '../models/Chat.js';

const router = express.Router();

// Get messages for a chat
router.get('/:chatId', async (req, res) => {
  const msgs = await Message.find({ chatId: req.params.chatId }).populate('sender', 'username');
  res.json(msgs);
});

// Post a new message
router.post('/:chatId', async (req, res) => {
  const msg = await Message.create({ chatId: req.params.chatId, sender: req.user.id, content: req.body.content });
  res.status(201).json(msg);
});

// Create chat
router.post('/chat', async (req, res) => {
  const chat = await Chat.create({ name: req.body.name, isGroup: req.body.isGroup, members: req.body.members });
  res.status(201).json(chat);
});

export default router;
