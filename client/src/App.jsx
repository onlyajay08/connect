import React, { useState } from 'react';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import ChatContainer from './components/ChatContainer.jsx';

export default function App() {
  const [token, setToken] = useState(null);
  const [view, setView] = useState('login');

  if (!token) {
    return view === 'register' ? (
      <Register onAuth={(t) => setToken(t)} switchToLogin={() => setView('login')} />
    ) : (
      <Login onAuth={(t) => setToken(t)} switchToRegister={() => setView('register')} />
    );
  }

  return <ChatContainer token={token} />;
}
