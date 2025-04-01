
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
    <img 
      src="https://www.transfact.de/wp-content/uploads/logo_transfact_retina.png" 
      alt="Transfact Logo" 
      className={`w-auto object-contain ${sizeClasses[size]} ${className}`}
    />
  );
};

export default Logo;
