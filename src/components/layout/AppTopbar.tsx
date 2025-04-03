
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
    <header className="h-16 bg-white shadow-sm px-8 between-flex">
      <div className="flex items-center">
        <h1 className="text-2xl font-semibold text-primary-dark transition-colors hover:text-primary">{title}</h1>
      </div>
      
      <div className="flex items-center text-muted-foreground hover:text-primary transition-colors bg-gray-50 px-3 py-1.5 rounded-full">
        <Clock className="h-4 w-4 mr-2" />
        <span className="text-sm font-medium">{currentTime}</span>
      </div>
    </header>
  );
};

export default AppTopbar;
