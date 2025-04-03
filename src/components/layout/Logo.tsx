
import React from 'react';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'medium', className = '' }) => {
  const sizeClasses = {
    small: 'h-8',
    medium: 'h-10',
    large: 'h-12',
  };

  return (
    <div className={`transition-transform duration-300 hover:scale-105 ${className}`}>
      <img 
        src="https://www.transfact.de/wp-content/uploads/logo_transfact_retina.png" 
        alt="Transfact Logo" 
        className={`w-auto object-contain drop-shadow-lg ${sizeClasses[size]}`}
      />
    </div>
  );
};

export default Logo;
