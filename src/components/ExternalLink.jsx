/**
 * Link that opens in a new tab with safe `rel` attributes and tells
 * assistive technology that it does so.
 */
export function ExternalLink({ href, children, ...rest }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
      <span className="visually-hidden"> (opens in a new tab)</span>
    </a>
  );
}
