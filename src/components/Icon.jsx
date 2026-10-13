/** Small stroke icons used for UI affordances. Decorative by default. */
function StrokeIcon({ children, className, ...rest }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  );
}

export function ArrowRightIcon(props) {
  return (
    <StrokeIcon {...props}>
      <path d="M4 12h15M13 6l6 6-6 6" />
    </StrokeIcon>
  );
}

export function ArrowDownIcon(props) {
  return (
    <StrokeIcon {...props}>
      <path d="M12 4v15M6 13l6 6 6-6" />
    </StrokeIcon>
  );
}

export function ArrowUpIcon(props) {
  return (
    <StrokeIcon {...props}>
      <path d="M12 20V5M6 11l6-6 6 6" />
    </StrokeIcon>
  );
}

/** The external-link indicator: an arrow leaving the box, up and to the right. */
export function ArrowUpRightIcon(props) {
  return (
    <StrokeIcon {...props}>
      <path d="M7 17 17 7M8 7h9v9" />
    </StrokeIcon>
  );
}

export function LockIcon(props) {
  return (
    <StrokeIcon {...props}>
      <rect x="5" y="11" width="14" height="9" rx="1.5" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </StrokeIcon>
  );
}

export function MailIcon(props) {
  return (
    <StrokeIcon {...props}>
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <path d="m4 7 8 6 8-6" />
    </StrokeIcon>
  );
}
