import React from 'react';

const HorizontalBarChart: React.FC = () => {
  const data = [
    { label: 'High Priority', value: 1.8, color: '#ef4444' }, // 1.8M ha
    { label: 'Medium Priority', value: 1.5, color: '#f59e0b' }, // 1.5M ha
    { label: 'Low Priority', value: 0.9, color: '#22c55e' }, // 0.9M ha
  ];
  
  const maxValue = 2.0; // Max value for the x-axis (e.g., 2.0M ha)
  const chartHeight = 150;
  const barHeight = 30;

  return (
    <div className="w-full h-full min-h-[200px]">
      <style>{`
        @keyframes growHorizontalBar {
          from { width: 0; }
          to { width: var(--final-width); }
        }
        .h-bar-rect {
          animation: growHorizontalBar 1s ease-out forwards;
        }
        @keyframes fadeInText {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        .h-bar-text {
            opacity: 0;
            animation: fadeInText 0.5s ease-out 0.8s forwards;
        }
      `}</style>
      <svg width="100%" height={chartHeight} preserveAspectRatio="none">
        {data.map((item, index) => {
          const y = index * (barHeight + 20) + 10;
          const width = (item.value / maxValue) * 100;
          return (
            <g key={item.label}>
              <text x="0" y={y + barHeight / 2 + 4} fontSize="12" fill="#475569" className="font-medium">
                {item.label}
              </text>
              <rect
                x="110"
                y={y}
                width={`calc(${width}% - 110px)`}
                height={barHeight}
                fill={item.color}
                rx="4"
                className="h-bar-rect"
                style={{ '--final-width': `calc(${width}% - 110px)` } as React.CSSProperties}
              />
              <text
                x={`calc(${width}% - 5px)`}
                y={y + barHeight / 2 + 5}
                textAnchor="end"
                fontSize="12"
                fontWeight="bold"
                fill="white"
                className="h-bar-text"
              >
                {item.value.toFixed(1)}M
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default HorizontalBarChart;