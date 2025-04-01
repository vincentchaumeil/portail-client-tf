
import React from 'react';

interface AppTopbarProps {
  title: string;
}

const AppTopbar: React.FC<AppTopbarProps> = ({ title }) => {
  return (
    <header className="h-16 bg-white shadow-sm px-8 between-flex">
      <h1 className="text-2xl font-semibold text-default">{title}</h1>
    </header>
  );
};

export default AppTopbar;
