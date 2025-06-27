import React from 'react';

export default function TypingIndicator({ text }) {
  if (!text) return null;
  return <div className="text-xs text-gray-500 animate-pulse">{text}</div>;
}
