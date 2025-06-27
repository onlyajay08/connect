import React, { useEffect, useState } from 'react';
import ChatList from './ChatList.jsx';
import ChatWindow from './ChatWindow.jsx';
import axios from 'axios';

export default function ChatContainer({ token }) {
  const [chats, setChats] = useState([{ _id: 'main', name: 'Main', isGroup: true }]);
  const [current, setCurrent] = useState(chats[0]);

  useEffect(() => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  }, [token]);

  return (
    <div className="flex h-full">
      <ChatList chats={chats} select={setCurrent} />
      <div className="flex-1">
        <ChatWindow token={token} chatId={current._id} />
      </div>
    </div>
  );
}
