import React from 'react';

interface KPICardProps {
  title: string;
  value: string;
  change: string;
  delay?: string;
}

const KPICard: React.FC<KPICardProps> = ({ title, value, change, delay = '0s' }) => {
  const isPositive = change.startsWith('+');
  const changeColor = isPositive ? 'text-green-500' : 'text-red-500';

  return (
    <div 
      className="bg-white p-6 rounded-lg shadow-md animate-[fadeIn_0.5s_ease-out_forwards]" 
      style={{ animationDelay: delay, opacity: 0 }}
    >
      <h3 className="text-sm font-medium text-slate-500 truncate">{title}</h3>
      <p className="mt-1 text-3xl font-semibold text-slate-900">{value}</p>
      <p className={`mt-1 text-sm ${changeColor}`}>
        {change} vs last month
      </p>
    </div>
  );
};

export default KPICard;
