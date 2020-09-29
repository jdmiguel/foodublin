import { useState, useEffect, useCallback } from 'react';

export const useWindowMeasures = () => {
  const [windowMeasures, setWindowMeasures] = useState({
    width: 0,
    height: 0,
  });

  const onResize = useCallback((event: any) => {
    setWindowMeasures({
      width: event.currentTarget.innerWidth,
      height: event.currentTarget.innerHeight,
    });
  }, []);

  useEffect(() => {
    setWindowMeasures({
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

  return windowMeasures;
};
