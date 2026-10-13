/** Editorial label row that opens each section: (index) — name — meta. */
export function SectionHead({ index, name, meta }) {
  return (
    <div className="section-head label" data-reveal>
      <span className="section-head__index">({index})</span>
      <span className="section-head__name">{name}</span>
      {meta && <span className="section-head__meta">{meta}</span>}
    </div>
  );
}
