import React from 'react';

const DonutChart: React.FC = () => {
  const data = [
    { label: 'High', value: 45, color: '#ef4444' }, // red-500
    { label: 'Medium', value: 35, color: '#f59e0b' }, // yellow-500
    { label: 'Low', value: 20, color: '#22c55e' }, // green-500
  ];

  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  let accumulated = 0;

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <style>
        {`
          @keyframes drawCircle {
            to {
              stroke-dashoffset: 0;
            }
          }
          .donut-segment {
            animation: drawCircle 1s ease-out forwards;
          }
        `}
      </style>
      <svg width="200" height="200" viewBox="0 0 200 200">
        <g transform="rotate(-90 100 100)">
          {data.map((item, index) => {
            const strokeDasharray = `${(item.value / 100) * circumference} ${circumference}`;
            const initialOffset = circumference - (accumulated / 100) * circumference;
            accumulated += item.value;
            return (
              <circle
                key={index}
                r={radius}
                cx="100"
                cy="100"
                fill="transparent"
                stroke={item.color}
                strokeWidth="20"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={initialOffset}
                className="donut-segment"
                style={{ animationDelay: `${index * 250}ms` }}
              />
            );
          })}
        </g>
        <text x="50%" y="50%" textAnchor="middle" dy=".3em" fontSize="24" fontWeight="bold" fill="#1e293b">
          1.2k
        </text>
      </svg>
      <div className="flex justify-center mt-4 space-x-4">
        {data.map(item => (
          <div key={item.label} className="flex items-center">
            <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></span>
            <span className="text-sm text-slate-600">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonutChart;
