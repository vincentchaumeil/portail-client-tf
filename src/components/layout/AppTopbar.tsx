
import React from 'react';
import { Clock } from 'lucide-react';

interface AppTopbarProps {
  title: string;
}

const AppTopbar: React.FC<AppTopbarProps> = ({ title }) => {
  // Get current time
  const [currentTime, setCurrentTime] = React.useState<string>('');
  
  React.useEffect(() => {
    // Set initial time
    updateTime();
    
    // Update time every minute
    const interval = setInterval(updateTime, 60000);
    
    return () => clearInterval(interval);
  }, []);
  
  const updateTime = () => {
    const now = new Date();
    const timeFormatter = new Intl.DateTimeFormat('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
    setCurrentTime(timeFormatter.format(now));
  };
  
  return (
    <header className="h-16 bg-white/80 backdrop-blur-sm border-b border-gray-100 px-8 between-flex sticky top-0 z-10 shadow-sm">
      <div className="flex items-center">
        <h1 className="text-2xl font-semibold text-primary-dark transition-colors hover:text-primary bg-gradient-to-r from-primary-dark to-primary bg-clip-text text-transparent">{title}</h1>
      </div>
      
      <div className="flex items-center text-muted-foreground hover:text-primary transition-colors bg-gray-50/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
        <Clock className="h-4 w-4 mr-2" />
        <span className="text-sm font-medium">{currentTime}</span>
      </div>
    </header>
  );
};

export default AppTopbar;
