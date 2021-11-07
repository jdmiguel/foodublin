import { useState, useEffect, useCallback} from 'react';

export const useWindowMeasurement = () => {
  const [windowMeasurement, setWindowMeasurement] = useState({
    width: 0,
    height: 0,
  });

  const onResize = useCallback(
    () => {
      setWindowMeasurement({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    },
    [setWindowMeasurement],
  )

  useEffect(() => {
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [onResize]);

  return windowMeasurement;
};
