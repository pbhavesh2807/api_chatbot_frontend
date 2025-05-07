'use client';

import { Message } from '@/types';

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.sender === 'user';
  
  // Function to convert newlines to JSX line breaks
  const formatText = (text: string) => {
    return text.split('\n').map((line, i) => (
      <span key={i}>
        {line}
        {i < text.split('\n').length - 1 && <br />}
      </span>
    ));
  };
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-xl px-5 py-3 rounded-2xl whitespace-pre-line ${
          isUser
            ? 'bg-blue-500 text-white'
            : 'bg-white text-gray-800 shadow-sm border border-gray-100'
        }`}
      >
        {formatText(message.text)}
      </div>
    </div>
  );
} 