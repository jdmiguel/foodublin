import { useState, useEffect } from 'react';

export const useWindowMeasurement = () => {
  const [windowMeasurement, setWindowMeasurement] = useState({
    width: 0,
    height: 0,
  });

  const onResize = () => {
    setWindowMeasurement({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    setWindowMeasurement({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  useEffect(() => {
    onResize?.();

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [onResize]);

  return windowMeasurement;
};
