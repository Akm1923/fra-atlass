import React, { useState, useRef, useEffect } from 'react';

interface AnimateOnScrollProps {
  children: React.ReactNode;
  className?: string;
  animationClass: string;
  delay?: number;
  threshold?: number;
}

const AnimateOnScroll: React.FC<AnimateOnScrollProps> = ({
  children,
  className = '',
  animationClass,
  delay = 0,
  threshold = 0.1,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  const style: React.CSSProperties = isVisible
    ? { animationDelay: `${delay}ms` }
    : { opacity: 0 };

  return (
    <div
      ref={ref}
      className={`${className} ${isVisible ? animationClass : ''}`}
      style={style}
    >
      {children}
    </div>
  );
};

export default AnimateOnScroll;
