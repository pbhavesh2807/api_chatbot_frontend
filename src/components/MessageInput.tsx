'use client';

import { useState, FormEvent } from 'react';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export default function MessageInput({ onSendMessage, isLoading }: MessageInputProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    onSendMessage(input);
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex w-full bg-white rounded-full shadow-md overflow-hidden">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything..."
          disabled={isLoading}
          className="flex-1 px-6 py-3 border-0 focus:outline-none focus:ring-0 disabled:opacity-50 text-gray-800"
          autoFocus
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="px-6 py-3 bg-blue-700 text-white hover:bg-blue-800 focus:outline-none disabled:opacity-50 transition-colors"
        >
          {isLoading ? 'Processing...' : 'Search'}
        </button>
      </div>
    </form>
  );
} 