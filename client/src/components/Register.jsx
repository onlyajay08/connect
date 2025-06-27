import React, { useState } from 'react';
import axios from 'axios';

export default function Register({ onAuth, switchToLogin }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    await axios.post('/api/auth/register', { username, email, password });
    const res = await axios.post('/api/auth/login', { email, password });
    onAuth(res.data.token);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full gap-2">
      <input className="border" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="username" />
      <input className="border" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" />
      <input className="border" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" />
      <button className="bg-blue-500 text-white px-4" onClick={handleRegister}>Register</button>
      <button className="text-blue-500" onClick={switchToLogin}>Back to Login</button>
    </div>
  );
}
