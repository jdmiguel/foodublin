import { useState, useEffect } from 'react';

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    windowWidth: 0,
    windowHeight: 0,
  });

  const buildWindowSize = () => {
    setWindowSize({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
    });
  };

  useEffect(() => {
    buildWindowSize();

    window.addEventListener('resize', buildWindowSize);

    return () => {
      window.removeEventListener('resize', buildWindowSize);
    };
  }, []);

  return windowSize;
};
