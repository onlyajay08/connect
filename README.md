# Chat App

A full-stack realtime chatting application supporting group and personal conversations. Users can register, login or join as guests. Messages are delivered through WebSockets with typing indicators and online status.

## Features
- Personal and group chats
- User registration/login with JWT
- Guest users with unique `GuestX` names
- Real time messaging using Socket.IO
- Typing indicators and online/offline status
- Message timestamps

## Project Structure
- `server/` – Express backend with MongoDB via Mongoose
- `client/` – React frontend built with Vite and Tailwind CSS

## Installation
```bash
# Backend
cd server
npm install
cp .env.example .env
npm run dev

# Frontend
cd ../client
npm install
npm run dev
```

## Deployment
### Backend on Render
1. Create a new Web Service connected to this repo's `server` directory.
2. Add environment variables from `.env.example` in Render dashboard.
3. Set the start command to `npm start`.

### Frontend on Vercel
1. Import the repository in Vercel and select the `client` folder as the root.
2. Set build command `npm run build` and output directory `dist`.
3. Define environment variables if needed and deploy.

## Testing
Run backend tests with Jest:
```bash
cd server
npm test
```
