
import React from 'react';
import { ArrowLeft, MoreVertical, Phone, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ChatHeaderProps {
  contactName: string;
  status?: 'online' | 'offline' | 'away';
  avatar?: string;
  onBack?: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  contactName,
  status = 'online',
  avatar,
  onBack
}) => {
  const statusText = {
    'online': 'Online',
    'offline': 'Offline',
    'away': 'Away'
  };

  const statusColor = {
    'online': 'bg-green-500',
    'offline': 'bg-gray-400',
    'away': 'bg-yellow-500'
  };

  return (
    <div className="px-4 py-3 border-b border-gray-200 bg-white/90 backdrop-blur-sm flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-2">
        {onBack && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onBack} 
            className="mr-1 md:hidden"
          >
            <ArrowLeft size={20} />
          </Button>
        )}
        
        {avatar ? (
          <div className="w-10 h-10 rounded-full overflow-hidden relative">
            <img src={avatar} alt={contactName} className="w-full h-full object-cover" />
            <div className={cn("absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white", statusColor[status])}></div>
          </div>
        ) : (
          <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center relative">
            {contactName.charAt(0).toUpperCase()}
            <div className={cn("absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white", statusColor[status])}></div>
          </div>
        )}
        
        <div>
          <h3 className="font-medium text-gray-900">{contactName}</h3>
          <p className="text-xs text-gray-500">{statusText[status]}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="rounded-full">
          <Phone size={18} />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Video size={18} />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <MoreVertical size={18} />
        </Button>
      </div>
    </div>
  );
};

export default ChatHeader;
