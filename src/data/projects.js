/**
 * Projects shown in the Projects section, in order. Each entry renders as a
 * full case study; layouts alternate direction automatically as more are added.
 *
 * `preview.image`: path to a real screenshot placed in `/public`, e.g.
 * './projects/twomindsdev.webp' (16:10 works best, ~1600px wide). While it is
 * `null`, the card shows an illustrative browser mockup that is labelled as
 * such on the page — it is not presented as a screenshot.
 */
export const projects = [
  {
    id: 'twomindsdev',
    name: 'TwoMindsDev',
    url: 'https://twomindsdev.com/',
    displayUrl: 'twomindsdev.com',
    categories: ['Web Development', 'Brand Website', 'UI/UX'],
    type: 'Web development brand',
    description:
      'TwoMindsDev is a web development brand focused on creating professional websites that help businesses strengthen their online presence and grow digitally.',
    purpose:
      'The site is the front door of the brand: a place where a business can understand what TwoMindsDev offers and why a professional website matters for growing online.',
    approach:
      'The design aims for clarity over decoration — a clear structure, a professional tone and responsive layouts, so visitors on any screen can quickly find what they need.',
    preview: {
      image: null,
      alt: 'Homepage of the TwoMindsDev website',
    },
  },
];
