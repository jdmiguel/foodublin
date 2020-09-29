import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

type DataType = {
  posY: number;
};

export const useScrollPosY = (
  effect: (data: DataType) => void,
  deps: any[],
  delay: number,
) => {
  useIsomorphicLayoutEffect(() => {
    let throttleTimeout: number | null = null;

    const callBack = () => {
      effect({ posY: window.scrollY });
      throttleTimeout = null;
    };

    const handleScroll = () => {
      if (delay) {
        if (throttleTimeout === null) {
          throttleTimeout = setTimeout(callBack, delay);
        }
      } else {
        callBack();
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (throttleTimeout) {
        clearTimeout(throttleTimeout);
      }
    };
  }, [effect, deps]);
};
