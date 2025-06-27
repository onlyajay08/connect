import React from 'react';

export default function ChatList({ chats, select }) {
  return (
    <div className="w-1/4 border-r">
      {chats.map((c) => (
        <div key={c._id} onClick={() => select(c)} className="p-2 cursor-pointer hover:bg-gray-100">
          {c.name || 'Chat'}
        </div>
      ))}
    </div>
  );
}
