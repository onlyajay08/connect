import React, { useState } from 'react';
import axios from 'axios';

export default function Login({ onAuth, switchToRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const res = await axios.post('/api/auth/login', { email, password });
    onAuth(res.data.token);
  };

  const handleGuest = async () => {
    const res = await axios.post('/api/auth/guest');
    onAuth(res.data.token);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full gap-2">
      <input className="border" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" />
      <input className="border" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" />
      <button className="bg-blue-500 text-white px-4" onClick={handleLogin}>Login</button>
      <button className="text-blue-500" onClick={switchToRegister}>Register</button>
      <button className="text-sm" onClick={handleGuest}>Continue as Guest</button>
    </div>
  );
}
