import React from 'react';

const BarChart: React.FC = () => {
  // This is a static SVG representation for demonstration purposes.
  const data = [
    { name: 'PM-KISAN', value: 80 },
    { name: 'MGNREGA', value: 65 },
    { name: 'Jal Jeevan', value: 50 },
    { name: 'PMFBY', value: 30 },
    { name: 'KCC', value: 45 },
    { name: 'NMSA', value: 20 },
  ];

  const chartHeight = 250;
  const barWidth = 40;
  const barMargin = 20;
  const maxValue = 100;

  return (
    <div className="w-full h-[300px]">
      <style>
        {`
          @keyframes growBar {
            from { transform: scaleY(0); }
            to { transform: scaleY(1); }
          }
          .bar-rect {
            transform-origin: bottom;
            animation: growBar 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          }
        `}
      </style>
      <svg width="100%" height="100%" viewBox="0 0 500 300" preserveAspectRatio="xMidYMid meet">
        {/* Y-axis lines */}
        {[0, 25, 50, 75, 100].map(val => (
          <g key={val}>
            <line 
              x1="40" 
              x2="480" 
              y1={chartHeight - (val / maxValue) * chartHeight + 20} 
              y2={chartHeight - (val / maxValue) * chartHeight + 20}
              stroke="#e2e8f0" 
            />
            <text x="30" y={chartHeight - (val / maxValue) * chartHeight + 25} textAnchor="end" fontSize="12" fill="#64748b">
              {val}
            </text>
          </g>
        ))}
        
        {/* Bars */}
        {data.map((item, index) => {
          const x = index * (barWidth + barMargin) + 60;
          const y = chartHeight - (item.value / maxValue) * chartHeight + 20;
          const height = (item.value / maxValue) * chartHeight;
          return (
            <g key={item.name}>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={height}
                fill="#f97316"
                className="bar-rect transition-all duration-300 hover:opacity-80"
                style={{animationDelay: `${index * 100}ms`}}
              />
              <text x={x + barWidth / 2} y={chartHeight + 40} textAnchor="middle" fontSize="10" fill="#475569">
                {item.name}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default BarChart;
