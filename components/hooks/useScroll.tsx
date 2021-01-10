import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

type DataType = {
  scrollTop: number;
  scrollHeight: number;
  clientHeight: number;
};

export const useScroll = (
  effect: (data: DataType) => void,
  deps: any[],
  delay: number,
) => {
  useIsomorphicLayoutEffect(() => {
    let throttleTimeout: number | null = null;

    const callBack = () => {
      effect({
        scrollTop: document.documentElement.scrollTop,
        scrollHeight: document.documentElement.scrollHeight,
        clientHeight: document.documentElement.clientHeight,
      });
      throttleTimeout = null;
    };

    const handleScroll = () => {
      if (delay && throttleTimeout === null) {
        throttleTimeout = window.setTimeout(callBack, delay);
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
