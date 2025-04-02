
import React from 'react';
import { Home, User, LifeBuoy, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import Logo from './Logo';

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, label, active }) => {
  return (
    <div 
      className={cn(
        "flex items-center gap-3 px-6 py-3.5 cursor-pointer transition-all duration-300 text-gray-600 hover:text-primary-dark hover:bg-blue-50 rounded-md mx-2",
        active && "text-primary-dark bg-blue-50 font-medium"
      )}
    >
      <Icon size={20} />
      <span className="font-medium">{label}</span>
    </div>
  );
};

const AppSidebar: React.FC = () => {
  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-200 py-10 flex flex-col shadow-sm">
      <div className="mb-12 px-5 flex justify-center">
        <Logo size="medium" className="hover:opacity-90 transition-opacity" />
      </div>
      
      <div className="flex-1 space-y-1">
        <SidebarItem icon={Home} label="Commandes" active />
        <SidebarItem icon={User} label="Profil" />
        <SidebarItem icon={LifeBuoy} label="Support" />
      </div>
      
      <div className="mt-auto border-t border-gray-100 pt-4 mx-2">
        <SidebarItem icon={LogOut} label="Déconnexion" />
      </div>
    </aside>
  );
};

export default AppSidebar;
