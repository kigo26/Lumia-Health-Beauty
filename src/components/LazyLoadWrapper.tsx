import React, { useState, useEffect, useRef } from 'react';

export const LazyLoadWrapper = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={elementRef} className={className}>
      {isVisible ? children : <div className="h-64 animate-pulse bg-gray-100 rounded-2xl" />}
    </div>
  );
};
