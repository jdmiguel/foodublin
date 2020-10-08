import { useState, useEffect, useCallback } from 'react';

export const useWindowMeasurement = () => {
  const [windowMeasurement, setWindowMeasurement] = useState({
    width: 0,
    height: 0,
  });

  const onResize = useCallback((event: any) => {
    setWindowMeasurement({
      width: event.currentTarget.innerWidth,
      height: event.currentTarget.innerHeight,
    });
  }, []);

  useEffect(() => {
    setWindowMeasurement({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  useEffect(() => {
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [onResize]);

  return windowMeasurement;
};
