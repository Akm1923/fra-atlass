import React from 'react';
import StarsBackground from './effects/StarsBackground';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 relative overflow-hidden">
      <StarsBackground />
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} FRA Atlas and Decision Support System. All Rights Reserved.
        </p>
        <p className="text-xs mt-2">
          A conceptual model for the Smart India Hackathon.
        </p>
      </div>
    </footer>
  );
};

export default Footer;