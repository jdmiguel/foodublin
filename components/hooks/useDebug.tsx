import { useEffect } from 'react';

export const useDebug = () => {
  useEffect(() => {
    console.log('mounted');

    return () => {
      console.log('unmounted');
    };
  });
};
