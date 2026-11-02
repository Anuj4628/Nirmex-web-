import { useState, useEffect } from 'react';

/**
 * Custom hook to monitor window scroll state
 * @param {number} threshold - Scroll offset to trigger isScrolled
 * @returns {{ scrollY: number, isScrolled: boolean }}
 */
export function useScrollPosition(threshold = 20) {
  const [scrollY, setScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY || window.pageYOffset || 0;
          setScrollY(currentScrollY);
          setIsScrolled(currentScrollY > threshold);
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return { scrollY, isScrolled };
}

