import { site } from '../data/site';
import { ArrowDownIcon, ArrowRightIcon } from './Icon';
import { WaveField } from './WaveField';
import './Hero.css';

export function Hero() {
  return (
    <section id="home" className="hero" aria-labelledby="hero-title" tabIndex={-1}>
      <div className="hero__grid container">
        <p className="hero__eyebrow label">
          <span className="hero__eyebrow-mark" aria-hidden="true" />
          Web Developer · Digital Creator
        </p>

        <ul className="hero__roles label" aria-label={`${site.name}’s roles`}>
          {site.titles.map((title) => (
            <li key={title}>{title}</li>
          ))}
        </ul>

        <h1 id="hero-title" className="hero__title">
          <span className="hero__line" style={{ '--i': 0 }}>
            <span>Digital ideas,</span>
          </span>{' '}
          <span className="hero__line hero__line--indent" style={{ '--i': 1 }}>
            <span>built with</span>
          </span>{' '}
          <span className="hero__line hero__line--accent" style={{ '--i': 2 }}>
            <span className="accent-serif">purpose.</span>
          </span>
        </h1>

        <div className="hero__intro">
          <p className="hero__lede">
            I’m {site.name} — creating modern web experiences, crafting thoughtful interfaces, and exploring
            what’s possible with AI.
          </p>
          <div className="hero__actions">
            <a className="btn btn--primary" href="#projects">
              Explore My Work
              <ArrowRightIcon className="btn__icon btn__icon--right" />
            </a>
            <a className="btn btn--ghost" href="#about">
              About Me
            </a>
          </div>
        </div>

        <figure className="hero__figure" aria-hidden="true">
          <WaveField />
          <figcaption className="hero__caption label">
            <span>Fig. 01</span>
            <span>Σ sin(kx − ωt)</span>
          </figcaption>
        </figure>

        <a className="hero__scroll label" href="#about" aria-label="Scroll to About">
          <ArrowDownIcon className="hero__scroll-icon" />
          Scroll
        </a>

        <p className="hero__stack label">
          <span className="hero__stack-key">Stack</span>
          {site.stack.join(' / ')}
        </p>
      </div>
    </section>
  );
}
