import { useState, useEffect, useMemo, useCallback } from 'react';

export const useHash = (initialValue = null) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.location.hash;
      return item ? item.slice(1) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });
  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.history.pushState(null, null, `#${value}`);
    } catch (error) {
      console.log(error);
    }
  };
  return [storedValue, setValue];
};

// Hook
export function useWindowSize() {
  const isClient = typeof window === 'object';

  const getSize = useCallback(() => {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined,
      isMobile: 768 > window.innerWidth
    };
  }, [isClient]);

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) {
      return false;
    }

    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [getSize, isClient]); // Empty array ensures that effect is only run on mount and unmount

  return windowSize;
}

export const useIsMobile = () => {
  const { width } = useWindowSize();
  const mobileAgent = window.navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/);
  const isMobile = useMemo(() => {
    return width < 768 || mobileAgent;
  }, [width, mobileAgent]);

  return isMobile;
};
