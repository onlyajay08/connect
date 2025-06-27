import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import User from './models/User.js';
import Message from './models/Message.js';

export default function initSocket(server) {
  const io = new Server(server, { cors: { origin: '*' } });

  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.user = await User.findById(decoded.id);
      await User.findByIdAndUpdate(decoded.id, { online: true });
      next();
    } catch (err) {
      next(new Error('Unauthorized'));
    }
  });

  io.on('connection', (socket) => {
    socket.on('join', (chatId) => {
      socket.join(chatId);
    });

    socket.on('typing', (chatId) => {
      socket.to(chatId).emit('typing', { username: socket.user.username });
    });

    socket.on('message', async ({ chatId, content }) => {
      const msg = await Message.create({ chatId, sender: socket.user._id, content });
      const populated = await msg.populate('sender', 'username');
      io.to(chatId).emit('message', populated);
    });

    socket.on('disconnect', async () => {
      await User.findByIdAndUpdate(socket.user._id, { online: false });
    });
  });
}
