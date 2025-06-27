import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import messageRoutes from './routes/messages.js';
import auth from './middleware/auth.js';
import initSocket from './socket.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/messages', auth, messageRoutes);

let server;

export async function start() {
  await connectDB(process.env.MONGODB_URI);
  server = http.createServer(app);
  initSocket(server);
  const PORT = process.env.PORT || 5000;
  return new Promise((resolve) => {
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      resolve();
    });
  });
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
  start();
}

export default app;
