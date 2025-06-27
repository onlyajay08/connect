import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import TypingIndicator from './TypingIndicator.jsx';

export default function ChatWindow({ token, chatId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const s = io('/', { auth: { token } });
    setSocket(s);
    s.emit('join', chatId);
    s.on('message', (msg) => setMessages((m) => [...m, msg]));
    s.on('typing', ({ username }) => {
      setTyping(`${username} is typing...`);
      setTimeout(() => setTyping(''), 1000);
    });
    return () => s.disconnect();
  }, [token, chatId]);

  const send = () => {
    socket.emit('message', { chatId, content: input });
    setInput('');
  };

  const startTyping = () => {
    socket.emit('typing', chatId);
  };

  return (
    <div className="flex flex-col h-full p-4">
      <div className="flex-1 overflow-y-auto mb-2">
        {messages.map((m, i) => (
          <div key={i} className="my-1">
            <span className="font-bold mr-1">{m.sender.username}</span>
            <span>{m.content}</span>
            <span className="text-xs ml-2 text-gray-500">{new Date(m.createdAt).toLocaleTimeString()}</span>
          </div>
        ))}
        <TypingIndicator text={typing} />
      </div>
      <div className="flex gap-2">
        <input className="border flex-1" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={startTyping} />
        <button className="bg-green-500 text-white px-4" onClick={send}>Send</button>
      </div>
    </div>
  );
}
