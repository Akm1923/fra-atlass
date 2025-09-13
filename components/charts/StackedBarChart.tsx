import React from 'react';

const StackedBarChart: React.FC = () => {
  const data = [
    { name: 'PM-KISAN', high: 40, medium: 30, low: 10 }, // total 80
    { name: 'MGNREGA', high: 25, medium: 25, low: 15 }, // total 65
    { name: 'Jal Jeevan', high: 10, medium: 20, low: 20 }, // total 50
    { name: 'PMFBY', high: 5, medium: 15, low: 10 },   // total 30
    { name: 'KCC', high: 15, medium: 20, low: 10 },  // total 45
    { name: 'NMSA', high: 2, medium: 8, low: 10 },    // total 20
  ];
  
  const priorities = [
    { key: 'high', color: '#ef4444', label: 'High' },
    { key: 'medium', color: '#f59e0b', label: 'Medium' },
    { key: 'low', color: '#22c55e', label: 'Low' },
  ];

  const chartHeight = 250;
  const barWidth = 40;
  const barMargin = 20;
  const maxValue = 100;

  return (
    <div className="w-full h-[350px]">
      <style>{`
        @keyframes growBar {
          from { transform: scaleY(0); }
          to { transform: scaleY(1); }
        }
        .bar-segment {
          transform-origin: bottom;
          animation: growBar 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
      `}</style>
      <svg width="100%" height="100%" viewBox="0 0 500 350" preserveAspectRatio="xMidYMid meet">
        {/* Y-axis lines */}
        {[0, 25, 50, 75, 100].map(val => (
          <g key={val}>
            <line x1="40" x2="480" y1={chartHeight - (val / maxValue) * chartHeight} y2={chartHeight - (val / maxValue) * chartHeight} stroke="#e2e8f0" />
            <text x="30" y={chartHeight - (val / maxValue) * chartHeight + 5} textAnchor="end" fontSize="12" fill="#64748b">{val}</text>
          </g>
        ))}
        
        {/* Bars */}
        {data.map((item, index) => {
          const x = index * (barWidth + barMargin) + 60;
          let yOffset = 0;
          return (
            <g key={item.name}>
              {priorities.map(p => {
                const value = item[p.key as keyof typeof item] as number;
                if (value === 0) return null;
                const height = (value / maxValue) * chartHeight;
                const y = chartHeight - height - yOffset;
                yOffset += height;
                return (
                  <rect
                    key={p.key}
                    x={x}
                    y={y}
                    width={barWidth}
                    height={height}
                    fill={p.color}
                    className="bar-segment transition-all duration-300 hover:opacity-80"
                    style={{ animationDelay: `${index * 100}ms` }}
                  />
                );
              })}
              <text x={x + barWidth / 2} y={chartHeight + 20} textAnchor="middle" fontSize="10" fill="#475569">{item.name}</text>
            </g>
          );
        })}
      </svg>
      {/* Legend */}
      <div className="flex justify-center mt-2 space-x-4">
        {priorities.map(p => (
          <div key={p.key} className="flex items-center">
            <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: p.color }}></span>
            <span className="text-sm text-slate-600">{p.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StackedBarChart;