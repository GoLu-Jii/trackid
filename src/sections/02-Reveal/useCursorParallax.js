import { useCallback, useEffect, useRef } from 'react';

const ORIGIN = Object.freeze({ x: 0, y: 0 });

export default function useCursorParallax(enabled = true) {
  const positionRef = useRef({ ...ORIGIN });
  const reducedMotionRef = useRef(false);

  const resetToCenter = useCallback(() => {
    positionRef.current.x = ORIGIN.x;
    positionRef.current.y = ORIGIN.y;
  }, []);

  const handleMouseMove = useCallback((event) => {
    positionRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
    positionRef.current.y = (event.clientY / window.innerHeight) * 2 - 1;
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return undefined;
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => {
      reducedMotionRef.current = mediaQuery.matches;
      if (reducedMotionRef.current) {
        resetToCenter();
      }
    };

    handleChange();
    mediaQuery.addEventListener?.('change', handleChange);

    return () => {
      mediaQuery.removeEventListener?.('change', handleChange);
    };
  }, [resetToCenter]);

  useEffect(() => {
    if (!enabled || reducedMotionRef.current) {
      resetToCenter();
      return undefined;
    }

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [enabled, handleMouseMove, resetToCenter]);

  return positionRef;
}
