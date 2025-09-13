import React, { useMemo } from 'react';

interface StarsBackgroundProps {
  starCount?: number;
}

const StarsBackground: React.FC<StarsBackgroundProps> = ({ starCount = 50 }) => {
  const stars = useMemo(() => {
    const starElements = [];
    for (let i = 0; i < starCount; i++) {
      const size = Math.random() * 2 + 1; // Star size between 1px and 3px
      const style: React.CSSProperties = {
        width: `${size}px`,
        height: `${size}px`,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animationDuration: `${Math.random() * 5 + 3}s`, // 3s to 8s
        animationDelay: `${Math.random() * 3}s`,
        '--star-opacity': (Math.random() * 0.5 + 0.1).toFixed(2),
        '--star-opacity-twinkle': (Math.random() * 0.5 + 0.5).toFixed(2),
      } as React.CSSProperties;
      starElements.push(<div key={i} className="star" style={style} />);
    }
    return starElements;
  }, [starCount]);

  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
      {stars}
    </div>
  );
};

export default StarsBackground;
