import { site } from '../data/site';
import { BrandIcon } from './BrandIcon';
import { ExternalLink } from './ExternalLink';
import { ArrowRightIcon, ArrowUpRightIcon, MailIcon } from './Icon';
import { SectionHead } from './SectionHead';
import './Contact.css';

function Channel({ href, label, cta, handle, icon, external = true }) {
  const content = (
    <>
      <span className="channel__label label">{label}</span>
      <span className="channel__cta">
        {icon}
        {cta}
      </span>
      <span className="channel__handle">{handle}</span>
      <ArrowUpRightIcon className="channel__arrow" />
    </>
  );

  return external ? (
    <ExternalLink className="channel" href={href}>
      {content}
    </ExternalLink>
  ) : (
    <a className="channel" href={href}>
      {content}
    </a>
  );
}

export function Contact() {
  const { github, instagram } = site.social;
  const email = site.email.trim();

  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title" tabIndex={-1}>
      <div className="container">
        <SectionHead index="04" name="Contact" meta="Let’s talk" />

        <h2 id="contact-title" className="contact__title" data-reveal>
          <span className="contact__line">Have an idea?</span>{' '}
          <span className="contact__line contact__line--accent accent-serif">Let’s build it.</span>
        </h2>

        <div className="contact__grid">
          <div className="contact__intro" data-reveal>
            <p className="contact__copy">
              Whether you’re thinking about a website, a new digital experience, or an AI-powered idea, let’s start a
              conversation.
            </p>
            {email ? (
              <a className="btn btn--primary contact__cta" href={`mailto:${email}`}>
                Get in Touch
                <ArrowRightIcon className="btn__icon btn__icon--right" />
              </a>
            ) : (
              <ExternalLink className="btn btn--primary contact__cta" href={instagram.url}>
                Get in Touch
                <ArrowUpRightIcon className="btn__icon btn__icon--external" />
              </ExternalLink>
            )}
            <p className="contact__hint label">
              {email ? 'Opens your email app' : 'Send me a message on Instagram'}
            </p>
          </div>

          <ul className="channels" aria-label="Where to find me">
            {email && (
              <li data-reveal>
                <Channel
                  href={`mailto:${email}`}
                  label="Email"
                  cta="Write to me"
                  handle={email}
                  icon={<MailIcon className="channel__icon" />}
                  external={false}
                />
              </li>
            )}
            <li data-reveal>
              <Channel
                href={github.url}
                label={github.label}
                cta={github.cta}
                handle={github.handle}
                icon={<BrandIcon name="github" className="channel__icon" />}
              />
            </li>
            <li data-reveal style={{ '--reveal-delay': '90ms' }}>
              <Channel
                href={instagram.url}
                label={instagram.label}
                cta={instagram.cta}
                handle={instagram.handle}
                icon={<BrandIcon name="instagram" className="channel__icon" />}
              />
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
