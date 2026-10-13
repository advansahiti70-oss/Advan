import { projects } from '../data/projects';
import { ExternalLink } from './ExternalLink';
import { ArrowUpRightIcon, LockIcon } from './Icon';
import { SectionHead } from './SectionHead';
import './Projects.css';

/**
 * A stand-in for a screenshot: a wireframe of a website, drawn in the
 * portfolio palette. It is captioned on the page as an illustrative preview.
 */
function IllustrativeSite({ name }) {
  return (
    <div className="mock" aria-hidden="true">
      <div className="mock__nav">
        <span className="mock__brand">{name}</span>
        <span className="mock__links">
          <span />
          <span />
          <span />
          <span />
        </span>
        <span className="mock__pill" />
      </div>
      <div className="mock__hero">
        <div className="mock__hero-copy">
          <span className="mock__bar mock__bar--display" style={{ '--w': '92%' }} />
          <span className="mock__bar mock__bar--display" style={{ '--w': '70%' }} />
          <span className="mock__bar" style={{ '--w': '80%' }} />
          <span className="mock__bar" style={{ '--w': '58%' }} />
          <span className="mock__ctas">
            <span className="mock__btn mock__btn--solid" />
            <span className="mock__btn" />
          </span>
        </div>
        <div className="mock__art">
          <span className="mock__orbit" />
          <span className="mock__orbit mock__orbit--inner" />
        </div>
      </div>
      <div className="mock__cards">
        {[0, 1, 2].map((card) => (
          <div key={card} className="mock__card">
            <span className="mock__icon" />
            <span className="mock__bar mock__bar--strong" style={{ '--w': '62%' }} />
            <span className="mock__bar mock__bar--thin" style={{ '--w': '94%' }} />
            <span className="mock__bar mock__bar--thin" style={{ '--w': '76%' }} />
          </div>
        ))}
      </div>
      <div className="mock__band">
        <span className="mock__bar mock__bar--display" style={{ '--w': '46%' }} />
        <span className="mock__bar" style={{ '--w': '64%' }} />
        <span className="mock__btn mock__btn--solid" />
      </div>
      <div className="mock__split">
        <span className="mock__block" />
        <div>
          <span className="mock__bar mock__bar--strong" style={{ '--w': '70%' }} />
          <span className="mock__bar mock__bar--thin" style={{ '--w': '96%' }} />
          <span className="mock__bar mock__bar--thin" style={{ '--w': '88%' }} />
          <span className="mock__bar mock__bar--thin" style={{ '--w': '60%' }} />
        </div>
      </div>
      <div className="mock__footer">
        <span className="mock__brand">{name}</span>
        <span className="mock__bar mock__bar--thin" style={{ '--w': '30%' }} />
      </div>
    </div>
  );
}

function ProjectPreview({ project, number }) {
  const { preview } = project;

  /** Moves the "Visit site" label with the mouse. */
  const followPointer = (event) => {
    if (event.pointerType !== 'mouse') return;
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--cursor-x', `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty('--cursor-y', `${event.clientY - rect.top}px`);
  };

  return (
    <figure className="preview">
      <ExternalLink
        className="preview__link"
        href={project.url}
        aria-label={`Visit the ${project.name} website (opens in a new tab)`}
        onPointerMove={followPointer}
      >
        <div className="browser">
          <div className="browser__bar">
            <span className="browser__dots">
              <span />
              <span />
              <span />
            </span>
            <span className="browser__address">
              <LockIcon className="browser__lock" />
              {project.displayUrl}
            </span>
            <ArrowUpRightIcon className="browser__external" />
          </div>
          <div className="browser__viewport">
            <div className="browser__page">
              {preview.image ? (
                <img src={preview.image} alt={preview.alt} loading="lazy" decoding="async" />
              ) : (
                <IllustrativeSite name={project.name} />
              )}
            </div>
          </div>
        </div>
        <span className="preview__cursor" aria-hidden="true">
          Visit site
          <ArrowUpRightIcon />
        </span>
      </ExternalLink>
      <figcaption className="preview__caption label">
        <span>
          Fig. {number} — {preview.image ? `${project.name} homepage` : 'Illustrative preview'}
        </span>
        <span>{project.displayUrl}</span>
      </figcaption>
    </figure>
  );
}

function CaseStudy({ project, index }) {
  const number = String(index + 1).padStart(2, '0');
  const titleId = `${project.id}-title`;

  return (
    <article className={`case${index % 2 ? ' case--reverse' : ''}`} aria-labelledby={titleId}>
      <header className="case__head" data-reveal>
        <p className="case__number label">Case {number}</p>
        <h3 id={titleId} className="case__title">
          {project.name}
        </h3>
        <ul className="case__tags" aria-label="Categories">
          {project.categories.map((category) => (
            <li key={category} className="tag">
              {category}
            </li>
          ))}
        </ul>
      </header>

      <div className="case__stage" data-reveal>
        <ProjectPreview project={project} number={String(index + 2).padStart(2, '0')} />
      </div>

      <div className="case__details">
        <dl className="case__meta" data-reveal>
          <div>
            <dt className="label">Project</dt>
            <dd>{project.name}</dd>
          </div>
          <div>
            <dt className="label">Type</dt>
            <dd>{project.type}</dd>
          </div>
          <div>
            <dt className="label">Live site</dt>
            <dd>
              <ExternalLink className="text-link" href={project.url}>
                {project.displayUrl}
                <ArrowUpRightIcon />
              </ExternalLink>
            </dd>
          </div>
        </dl>

        <div className="case__story">
          <div data-reveal>
            <h4 className="case__label label">Overview</h4>
            <p className="case__description">{project.description}</p>
          </div>
          <div className="case__columns">
            <div data-reveal>
              <h4 className="case__label label">Purpose</h4>
              <p>{project.purpose}</p>
            </div>
            <div data-reveal style={{ '--reveal-delay': '100ms' }}>
              <h4 className="case__label label">Design approach</h4>
              <p>{project.approach}</p>
            </div>
          </div>
          <div data-reveal>
            <ExternalLink className="btn btn--primary case__cta" href={project.url}>
              View Live Project
              <ArrowUpRightIcon className="btn__icon btn__icon--external" />
            </ExternalLink>
          </div>
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  return (
    <section id="projects" className="section work" aria-labelledby="work-title" tabIndex={-1}>
      <div className="container">
        <SectionHead index="03" name="Projects" meta="Featured case study" />

        <div className="work__intro">
          <h2 id="work-title" className="work__title" data-reveal>
            Selected <span className="accent-serif">work.</span>
          </h2>
          <p className="work__summary" data-reveal>
            A closer look at my featured project — what it is, why it exists and how it was approached.
          </p>
        </div>

        {projects.map((project, index) => (
          <CaseStudy key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
