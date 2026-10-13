import { site } from '../data/site';

/** The "AS" mark. Decorative — always pair it with a visible or accessible name. */
export function Monogram({ className = '' }) {
  return (
    <span className={`monogram ${className}`.trim()} aria-hidden="true">
      {site.initials}
    </span>
  );
}
