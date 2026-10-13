import { expertise } from '../data/skills';
import { BrandIcon } from './BrandIcon';
import { SectionHead } from './SectionHead';
import './Expertise.css';

export function Expertise() {
  return (
    <section id="expertise" className="section expertise" aria-labelledby="expertise-title" tabIndex={-1}>
      <div className="container">
        <SectionHead index="02" name="Expertise" meta={`${expertise.length} disciplines`} />

        <div className="expertise__intro">
          <h2 id="expertise-title" className="expertise__title" data-reveal>
            Tools <span className="accent-serif">&amp; curiosity.</span>
          </h2>
          <p className="expertise__summary" data-reveal>
            The areas I work across — from the code that runs in the browser to the intelligence behind it.
          </p>
        </div>

        <ol className="disciplines">
          {expertise.map((discipline, index) => {
            const showTiles = discipline.items.every((item) => item.icon);
            return (
              <li
                key={discipline.id}
                className="discipline"
                data-reveal
                style={{ '--reveal-delay': `${index * 120}ms` }}
              >
                <span className="discipline__number" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="discipline__title">{discipline.title}</h3>
                <p className="discipline__summary">{discipline.summary}</p>
                <ul className={showTiles ? 'discipline__tiles' : 'discipline__list'}>
                  {discipline.items.map((item) => (
                    <li key={item.name} className={showTiles ? 'tech' : 'skill'}>
                      {item.icon && <BrandIcon name={item.icon} className="tech__icon" />}
                      <span className="tech__name">{item.name}</span>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
