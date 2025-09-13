import React from 'react';

const LineChart: React.FC = () => {
  const data = [
    { name: 'Q1', value: 120 },
    { name: 'Q2', value: 180 },
    { name: 'Q3', value: 150 },
    { name: 'Q4', value: 210 },
  ];

  const chartHeight = 250;
  const chartWidth = 460;
  const maxValue = 250; // A bit more than max value for padding

  const points = data.map((item, index) => {
    const x = (index / (data.length - 1)) * chartWidth;
    const y = chartHeight - (item.value / maxValue) * chartHeight;
    return `${x},${y}`;
  }).join(' ');

  const pathLength = 1000; // Estimated length for animation

  return (
    <div className="w-full h-[300px]">
      <style>
        {`
          @keyframes drawLine {
            from { stroke-dashoffset: ${pathLength}; }
            to { stroke-dashoffset: 0; }
          }
          .line-path {
            stroke-dasharray: ${pathLength};
            stroke-dashoffset: ${pathLength};
            animation: drawLine 1.5s ease-out forwards;
          }
          @keyframes fadeInPoint {
            from { opacity: 0; transform: scale(0.5); }
            to { opacity: 1; transform: scale(1); }
          }
          .line-point {
            transform-origin: center;
            opacity: 0;
            animation: fadeInPoint 0.5s ease-out forwards;
          }
        `}
      </style>
      <svg width="100%" height="100%" viewBox="0 0 500 300" preserveAspectRatio="xMidYMid meet">
        {/* Y-axis lines */}
        {[0, 50, 100, 150, 200, 250].map(val => (
          <g key={val}>
            <line
              x1="35"
              x2="495"
              y1={chartHeight - (val / maxValue) * chartHeight + 20}
              y2={chartHeight - (val / maxValue) * chartHeight + 20}
              stroke="#e2e8f0"
            />
            <text x="30" y={chartHeight - (val / maxValue) * chartHeight + 25} textAnchor="end" fontSize="12" fill="#64748b">
              {val}
            </text>
          </g>
        ))}

        <g transform="translate(40, 20)">
            {/* Line */}
            <polyline
                fill="none"
                stroke="#f97316"
                strokeWidth="3"
                points={points}
                className="line-path"
            />

            {/* Points */}
            {data.map((item, index) => {
                const x = (index / (data.length - 1)) * chartWidth;
                const y = chartHeight - (item.value / maxValue) * chartHeight;
                return (
                    <g key={item.name}>
                        <circle
                            cx={x}
                            cy={y}
                            r="5"
                            fill="#f97316"
                            stroke="white"
                            strokeWidth="2"
                            className="line-point"
                            style={{ animationDelay: `${index * 300}ms`}}
                        />
                    </g>
                );
            })}
        </g>
        
        {/* X-axis labels */}
        {data.map((item, index) => {
            const x = (index / (data.length - 1)) * chartWidth + 40;
            return (
                 <text key={item.name} x={x} y={chartHeight + 45} textAnchor="middle" fontSize="12" fill="#475569">
                    {item.name}
                 </text>
            );
        })}
      </svg>
    </div>
  );
};

export default LineChart;