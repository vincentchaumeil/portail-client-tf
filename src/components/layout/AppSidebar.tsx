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
        "flex items-center gap-3 px-5 py-3 cursor-pointer transition-all-300 text-gray-600 hover:text-primary-dark",
        active && "text-primary-dark border-l-2 border-primary-dark bg-blue-50"
      )}
    >
      <Icon size={20} />
      <span className="font-medium">{label}</span>
    </div>
  );
};

const AppSidebar: React.FC = () => {
  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-200 py-8 flex flex-col">
      <div className="mb-10 px-5 flex justify-center">
        <Logo size="medium" />
      </div>
      
      <div className="flex-1">
        <SidebarItem icon={Home} label="Commandes" active />
        <SidebarItem icon={User} label="Profil" />
        <SidebarItem icon={LifeBuoy} label="Support" />
      </div>
      
      <div className="mt-auto">
        <SidebarItem icon={LogOut} label="Déconnexion" />
      </div>
    </aside>
  );
};

export default AppSidebar;
