
import React, { useState, useRef, useEffect } from 'react';
import ChatHeader from './ChatHeader';
import ChatMessage, { ChatMessageProps } from './ChatMessage';
import ChatInput from './ChatInput';

export interface ChatConversation {
  id: string;
  contactName: string;
  status: 'online' | 'offline' | 'away';
  avatar?: string;
  messages: Omit<ChatMessageProps, 'senderName'>[];
}

interface ChatWindowProps {
  conversation: ChatConversation;
  onBack?: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ conversation, onBack }) => {
  const [messages, setMessages] = useState(conversation.messages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (content: string) => {
    const newMessage: Omit<ChatMessageProps, 'senderName'> = {
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOutgoing: true
    };
    
    setMessages([...messages, newMessage]);
    
    // Simulate response after 1-2 seconds
    setTimeout(() => {
      const responseMessage: Omit<ChatMessageProps, 'senderName'> = {
        content: getRandomResponse(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOutgoing: false
      };
      
      setMessages(prev => [...prev, responseMessage]);
    }, 1000 + Math.random() * 1000);
  };

  const getRandomResponse = () => {
    const responses = [
      "I'll look into this right away.",
      "Thanks for letting me know. I'll check on it.",
      "Could you provide more details about that?",
      "Let me see what I can do to help with that.",
      "I understand your concern. I'll find a solution.",
      "I'm working on resolving this for you.",
      "Is there anything else you'd like to discuss?",
      "That's a good point. Let me check with my team."
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  return (
    <div className="flex flex-col h-full">
      <ChatHeader 
        contactName={conversation.contactName} 
        status={conversation.status} 
        avatar={conversation.avatar}
        onBack={onBack}
      />
      
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50/80">
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            content={message.content}
            timestamp={message.timestamp}
            isOutgoing={message.isOutgoing}
            senderName={!message.isOutgoing ? conversation.contactName : undefined}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatWindow;
