'use client';

import { useState } from 'react';
import axios from 'axios';
import ChatMessage from './ChatMessage';
import MessageInput from './MessageInput';
import { Message } from '@/types';
import { API_ENDPOINTS } from '@/config';

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (message: string) => {
    if (!message.trim()) return;

    // Add user message to chat
    const userMessage: Message = { text: message, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Send message to backend with format from swagger
      const response = await axios.post(API_ENDPOINTS.QUERY, {
        text: message
      });

      // Extract the response text from the expected format: {"response": "string"}
      let responseText = '';
      if (response.data && typeof response.data === 'object' && 'response' in response.data) {
        responseText = response.data.response;
      } else if (typeof response.data === 'string') {
        responseText = response.data;
      } else {
        responseText = JSON.stringify(response.data);
      }

      // Add bot response to chat
      const botMessage: Message = { 
        text: responseText, 
        sender: 'bot' 
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      
      let errorText = 'Sorry, there was an error processing your request.';
      
      // Check for specific error types
      if (axios.isAxiosError(error)) {
        if (error.code === 'ERR_NETWORK') {
          errorText = 'Network error: Unable to connect to the backend server. Please ensure the server is running at http://localhost:8000.';
        } else if (error.response) {
          if (error.response.status === 422) {
            errorText = 'Validation error: The query format is invalid.';
          } else {
            errorText = `Server error (${error.response.status}): ${error.response.data?.detail?.[0]?.msg || error.response.data?.message || 'Unknown error'}`;
          }
        } else if (error.request) {
          errorText = 'No response received from the server. Please check if the backend is running.';
        }
      }
      
      const errorMessage: Message = { 
        text: errorText, 
        sender: 'bot' 
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full w-full">
      <div className="bg-blue-600 text-white py-4 px-6 shadow-md">
        <h1 className="text-2xl font-bold text-center mb-4">AI Chatbot</h1>
        <div className="max-w-4xl mx-auto">
          <MessageInput onSendMessage={sendMessage} isLoading={isLoading} />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            <p className="text-center px-4 py-8 bg-white rounded-lg shadow-sm">
              Ask a question above to start chatting with the AI assistant
            </p>
          </div>
        ) : (
          <div className="space-y-4 pb-2 max-w-4xl mx-auto">
            {messages.map((msg, index) => (
              <ChatMessage key={index} message={msg} />
            ))}
            {isLoading && (
              <div className="flex space-x-2 items-center text-gray-500">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 