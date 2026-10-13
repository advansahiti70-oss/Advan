import { useCallback, useEffect, useRef, useState } from 'react';
import { navItems, site } from '../data/site';
import { useActiveSection } from '../hooks/useActiveSection';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { useScrolled } from '../hooks/useScrolled';
import { BrandIcon } from './BrandIcon';
import { ExternalLink } from './ExternalLink';
import { ArrowRightIcon } from './Icon';
import { Monogram } from './Monogram';
import './Navbar.css';

const sectionIds = navItems.map((item) => item.id);
const DESKTOP_QUERY = '(min-width: 62em)';

/** Elements hidden from interaction while the mobile menu covers them. */
function setPageInert(inert) {
  document.querySelectorAll('#main, .site-footer').forEach((el) => {
    el.inert = inert;
  });
  document.body.classList.toggle('is-locked', inert);
}

export function Navbar() {
  const scrolled = useScrolled(24);
  const active = useActiveSection(sectionIds);
  const reducedMotion = usePrefersReducedMotion();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef(null);
  const menuRef = useRef(null);

  const closeMenu = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  // While open: lock scroll, make the page inert, focus the first link, close on Escape.
  useEffect(() => {
    if (!open) return;
    setPageInert(true);
    menuRef.current?.querySelector('a')?.focus();
    const onKeyDown = (event) => {
      if (event.key === 'Escape') closeMenu();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      setPageInert(false);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open, closeMenu]);

  // The menu only exists on small screens; close it if the viewport grows.
  useEffect(() => {
    const media = window.matchMedia(DESKTOP_QUERY);
    const onChange = (event) => {
      if (event.matches) setOpen(false);
    };
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  /** Mobile menu links: close first, then scroll and move focus to the section. */
  const goToSection = (event, id) => {
    event.preventDefault();
    setPageInert(false);
    setOpen(false);
    const target = document.getElementById(id);
    if (!target) return;
    target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
    target.focus({ preventScroll: true });
    history.pushState(null, '', `#${id}`);
  };

  return (
    <header className="nav" data-scrolled={scrolled || undefined} data-menu-open={open || undefined}>
      <div className="nav__bar container">
        <a
          className="nav__brand"
          href="#home"
          aria-label={`${site.name}, back to top`}
          onClick={(event) => open && goToSection(event, 'home')}
        >
          <Monogram />
          <span className="nav__name">{site.name}</span>
        </a>

        <nav className="nav__primary" aria-label="Primary">
          <ol className="nav__list">
            {navItems.map((item, index) => (
              <li key={item.id}>
                <a
                  className="nav__link"
                  href={`#${item.id}`}
                  aria-current={active === item.id ? 'true' : undefined}
                >
                  <span className="nav__index" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {item.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <a className="btn btn--primary btn--small nav__cta" href="#contact">
          Let’s Talk
          <ArrowRightIcon className="btn__icon btn__icon--right" />
        </a>

        <button
          ref={toggleRef}
          type="button"
          className="nav__toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="nav__toggle-text">{open ? 'Close' : 'Menu'}</span>
          <span className="nav__toggle-icon" aria-hidden="true">
            <span />
            <span />
          </span>
        </button>
      </div>

      <div id="mobile-menu" className="mobile-menu" ref={menuRef} hidden={!open}>
        <nav className="mobile-menu__inner container" aria-label="Mobile">
          <ol className="mobile-menu__list">
            {navItems.map((item, index) => (
              <li key={item.id} style={{ '--i': index }}>
                <a
                  className="mobile-menu__link"
                  href={`#${item.id}`}
                  aria-current={active === item.id ? 'true' : undefined}
                  onClick={(event) => goToSection(event, item.id)}
                >
                  <span className="label" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {item.label}
                </a>
              </li>
            ))}
          </ol>

          <div className="mobile-menu__footer">
            <a className="btn btn--primary" href="#contact" onClick={(event) => goToSection(event, 'contact')}>
              Let’s Talk
              <ArrowRightIcon className="btn__icon btn__icon--right" />
            </a>
            <ul className="mobile-menu__social">
              {Object.values(site.social).map((profile) => (
                <li key={profile.url}>
                  <ExternalLink className="mobile-menu__social-link" href={profile.url}>
                    <BrandIcon name={profile.label.toLowerCase()} />
                    {profile.label}
                  </ExternalLink>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}
