import { useEffect } from 'react';

/**
 * Reveals every `[data-reveal]` element as it enters the viewport.
 * The hidden starting state only applies under `.reveal-ready`, which
 * index.html sets before first paint; reduced-motion users never see it.
 */
export function useRevealOnScroll() {
  useEffect(() => {
    const elements = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}
