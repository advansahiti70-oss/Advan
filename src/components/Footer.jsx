import { navItems, site } from '../data/site';
import { BrandIcon } from './BrandIcon';
import { ExternalLink } from './ExternalLink';
import { ArrowUpIcon, ArrowUpRightIcon } from './Icon';
import { Monogram } from './Monogram';
import './Footer.css';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <Monogram />
            <div>
              <p className="footer__name">{site.name}</p>
              <p className="footer__titles">{site.titles.join(' · ')}</p>
            </div>
          </div>

          <nav className="footer__nav" aria-label="Footer">
            <p className="label">Index</p>
            <ul>
              {navItems.map((item) => (
                <li key={item.id}>
                  <a className="footer__link" href={`#${item.id}`}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer__social">
            <p className="label">Elsewhere</p>
            <ul>
              {Object.values(site.social).map((profile) => (
                <li key={profile.url}>
                  <ExternalLink className="footer__link footer__link--social" href={profile.url}>
                    <BrandIcon name={profile.label.toLowerCase()} />
                    {profile.cta}
                    <ArrowUpRightIcon className="footer__arrow" />
                  </ExternalLink>
                </li>
              ))}
            </ul>
          </div>

          <a className="footer__top-link" href="#home">
            Back to top
            <ArrowUpIcon />
          </a>
        </div>

        <svg className="footer__wordmark" viewBox="0 0 992 150" aria-hidden="true" focusable="false">
          <text x="0" y="144" textLength="992" lengthAdjust="spacingAndGlyphs">
            {site.name}
          </text>
        </svg>

        <div className="footer__bottom label">
          <span>
            © {year} {site.name}
          </span>
          <span>Built with HTML, CSS, JavaScript &amp; React</span>
        </div>
      </div>
    </footer>
  );
}
