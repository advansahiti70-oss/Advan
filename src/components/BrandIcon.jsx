import { siCss, siGithub, siHtml5, siInstagram, siJavascript, siReact } from 'simple-icons';

/**
 * Brand and technology logos (from Simple Icons, CC0).
 * To support a new technology, import its `si*` export and add it here.
 */
const icons = {
  html5: siHtml5,
  css: siCss,
  javascript: siJavascript,
  react: siReact,
  github: siGithub,
  instagram: siInstagram,
};

export function BrandIcon({ name, className }) {
  const icon = icons[name];
  if (!icon) return null;
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <path d={icon.path} />
    </svg>
  );
}
