import { about } from '../data/about';
import { site } from '../data/site';
import { BrandIcon } from './BrandIcon';
import { ExternalLink } from './ExternalLink';
import { ArrowUpRightIcon } from './Icon';
import { SectionHead } from './SectionHead';
import './About.css';

const numerals = ['i', 'ii', 'iii', 'iv', 'v', 'vi'];

export function About() {
  const { github } = site.social;

  return (
    <section id="about" className="section about" aria-labelledby="about-title" tabIndex={-1}>
      <div className="container">
        <SectionHead index="01" name="About" meta="Biography" />

        <div className="about__grid">
          <h2 id="about-title" className="about__title" data-reveal>
            Beyond <span className="accent-serif">the code.</span>
          </h2>

          <div className="about__body">
            <p className="about__lead" data-reveal>
              {about.intro}
            </p>
            <p className="about__note" data-reveal>
              {about.note}
            </p>
            <div data-reveal>
              <ExternalLink className="text-link about__github" href={github.url}>
                <BrandIcon name="github" />
                {github.cta}
                <ArrowUpRightIcon />
              </ExternalLink>
            </div>
          </div>
        </div>

        <ol className="qualities" aria-label="What I aim for">
          {about.qualities.map(({ verb, word }, index) => (
            <li key={word} className="qualities__item" data-reveal style={{ '--reveal-delay': `${index * 90}ms` }}>
              <span className="label" aria-hidden="true">
                {numerals[index] ?? index + 1}
              </span>
              <span className="qualities__text">
                <span className="qualities__verb">{verb}</span> {word}
              </span>
            </li>
          ))}
        </ol>

        <div className="focus">
          <h3 className="focus__heading label" data-reveal>
            What I focus on
          </h3>
          <ol className="focus__list">
            {about.focus.map((item, index) => (
              <li
                key={item.title}
                className="focus__item"
                data-reveal
                style={{ '--reveal-delay': `${(index % 3) * 80}ms` }}
              >
                <span className="focus__index label" aria-hidden="true">
                  /{String(index + 1).padStart(2, '0')}
                </span>
                <h4 className="focus__title">{item.title}</h4>
                <p className="focus__text">{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
