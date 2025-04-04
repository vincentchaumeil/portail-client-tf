
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';
import { cn } from '@/lib/utils';
import { Home, MessageSquare, BarChart3, Settings, Users } from 'lucide-react';
import { usePreferences } from '@/hooks/use-preferences';
import { motion } from 'framer-motion';

const AppSidebar = () => {
  const location = useLocation();
  const { preferences } = usePreferences();
  
  const menuItems = [
    { icon: Home, label: 'Tableau de bord', path: '/' },
    { icon: BarChart3, label: 'Traitements', path: '/treatments' },
    { icon: MessageSquare, label: 'Support', path: '/support' },
    { icon: Settings, label: 'Profil', path: '/profile' },
  ];
  
  // Reduced animation duration for better performance
  const sidebarVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        type: "spring", 
        stiffness: 120, // Increased stiffness for faster animation
        damping: 20, // Adjusted damping
        when: "beforeChildren", 
        staggerChildren: 0.05 // Reduced stagger time
      } 
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.15 // Reduced duration
      }
    }
  };

  return (
    <motion.div 
      className="w-16 md:w-64 bg-primary/95 backdrop-blur-lg text-white flex flex-col h-full transition-all duration-200 shadow-xl"
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Logo Section */}
      {preferences.showLogo && (
        <motion.div 
          className="p-4 flex justify-center md:justify-start border-b border-white/10"
          variants={itemVariants}
        >
          <Logo className="w-8 h-8 md:w-auto" />
        </motion.div>
      )}
      
      {/* Navigation */}
      <nav className="flex flex-col flex-1 overflow-y-auto pt-4">
        <div className="space-y-1 px-2">
          {menuItems.map((item) => (
            <motion.div key={item.path} variants={itemVariants}>
              <Link
                to={item.path}
                className={cn(
                  "flex items-center text-sm font-medium rounded-md py-3 px-3",
                  "transition-all duration-200 ease-in-out", // Reduced transition duration
                  "hover:bg-white/10 relative overflow-hidden",
                  location.pathname === item.path
                    ? "bg-white/20 text-white"
                    : "text-white/70"
                )}
              >
                {location.pathname === item.path && (
                  <motion.div 
                    className="absolute inset-0 bg-white/10"
                    layoutId="activeNavHighlight"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30, duration: 0.2 }} // Faster transition
                  />
                )}
                <item.icon size={20} className="mr-3 flex-shrink-0" />
                <span className="hidden md:inline relative z-10">{item.label}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </nav>
      
      {/* User Section */}
      <motion.div 
        className="p-4 border-t border-white/10 hidden md:block"
        variants={itemVariants}
      >
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <Users size={16} />
          </div>
          <div>
            <p className="text-sm font-medium">Admin</p>
            <p className="text-xs text-white/70">Surface Treatment</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AppSidebar;
