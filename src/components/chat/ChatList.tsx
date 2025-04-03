
import React from 'react';
import { cn } from '@/lib/utils';

export interface ChatContact {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  time: string;
  unread: number;
  status: 'online' | 'offline' | 'away';
}

interface ChatListProps {
  contacts: ChatContact[];
  activeContactId?: string;
  onSelectContact: (contactId: string) => void;
}

const ChatList: React.FC<ChatListProps> = ({
  contacts,
  activeContactId,
  onSelectContact
}) => {
  const statusColor = {
    'online': 'bg-green-500',
    'offline': 'bg-gray-400',
    'away': 'bg-yellow-500'
  };

  return (
    <div className="overflow-y-auto h-full">
      <div className="p-3">
        <input
          type="search"
          placeholder="Search contacts..."
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-sm"
        />
      </div>

      <div className="space-y-1 px-2">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className={cn(
              "flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors",
              activeContactId === contact.id
                ? "bg-primary/10"
                : "hover:bg-gray-100"
            )}
            onClick={() => onSelectContact(contact.id)}
          >
            <div className="relative">
              {contact.avatar ? (
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img src={contact.avatar} alt={contact.name} className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center text-lg font-medium">
                  {contact.name.charAt(0).toUpperCase()}
                </div>
              )}
              <div className={cn(
                "absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white",
                statusColor[contact.status]
              )}></div>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <h3 className="font-medium text-gray-900 truncate">{contact.name}</h3>
                <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{contact.time}</span>
              </div>
              <p className="text-sm text-gray-500 truncate">{contact.lastMessage}</p>
            </div>
            
            {contact.unread > 0 && (
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary text-white text-xs flex items-center justify-center">
                {contact.unread}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
