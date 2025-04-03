
import React from 'react';
import { cn } from '@/lib/utils';

export interface ChatMessageProps {
  content: string;
  timestamp: string;
  isOutgoing: boolean;
  senderName?: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  content,
  timestamp,
  isOutgoing,
  senderName
}) => {
  return (
    <div className={cn(
      "flex mb-4",
      isOutgoing ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
        "max-w-[75%] rounded-2xl px-4 py-3 shadow-sm",
        isOutgoing 
          ? "bg-primary text-white rounded-br-sm" 
          : "bg-gray-100 dark:bg-gray-800 rounded-bl-sm"
      )}>
        {!isOutgoing && senderName && (
          <div className="text-xs font-medium text-primary mb-1">{senderName}</div>
        )}
        <p className="text-sm">{content}</p>
        <div className={cn(
          "text-xs mt-1",
          isOutgoing ? "text-blue-100" : "text-gray-500"
        )}>
          {timestamp}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
