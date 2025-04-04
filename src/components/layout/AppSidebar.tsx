
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';
import { cn } from '@/lib/utils';
import { Home, MessageSquare, BarChart3, Settings, Users } from 'lucide-react';
import { usePreferences } from '@/hooks/use-preferences';

const AppSidebar = () => {
  const location = useLocation();
  const { preferences } = usePreferences();
  
  const menuItems = [
    { icon: Home, label: 'Tableau de bord', path: '/' },
    { icon: BarChart3, label: 'Traitements', path: '/treatments' },
    { icon: MessageSquare, label: 'Support', path: '/support' },
    { icon: Settings, label: 'Profil', path: '/profile' },
  ];

  return (
    <div className="w-16 md:w-64 bg-primary/95 backdrop-blur-lg text-white flex flex-col h-full transition-all duration-300 shadow-xl">
      {/* Logo Section */}
      {preferences.showLogo && (
        <div className="p-4 flex justify-center md:justify-start border-b border-white/10">
          <Logo className="w-8 h-8 md:w-auto" />
        </div>
      )}
      
      {/* Navigation */}
      <nav className="flex flex-col flex-1 overflow-y-auto pt-4">
        <div className="space-y-1 px-2">
          {menuItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center text-sm font-medium rounded-md py-3 px-3",
                "transition duration-150 ease-in-out",
                "hover:bg-white/10",
                location.pathname === item.path
                  ? "bg-white/20 text-white"
                  : "text-white/70"
              )}
            >
              <item.icon size={20} className="mr-3 flex-shrink-0" />
              <span className="hidden md:inline">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
      
      {/* User Section */}
      <div className="p-4 border-t border-white/10 hidden md:block">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <Users size={16} />
          </div>
          <div>
            <p className="text-sm font-medium">Admin</p>
            <p className="text-xs text-white/70">Surface Treatment</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppSidebar;
