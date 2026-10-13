/**
 * Personal details and links used across the site.
 * Everything a visitor reads about Advan in the nav, hero, contact and footer
 * comes from here, so it stays consistent.
 */
export const site = {
  name: 'Advan Sahiti',
  firstName: 'Advan',
  initials: 'AS',
  titles: ['Web Developer', 'Front-End Developer', 'AI Developer'],
  stack: ['HTML5', 'CSS3', 'JavaScript', 'React'],

  /**
   * Leave empty until there is a real address to publish.
   * When set (e.g. 'name@domain.com'), the contact section adds an email
   * option and uses it for the main "Get in Touch" button.
   */
  email: '',

  social: {
    github: {
      label: 'GitHub',
      handle: 'advansahiti70-oss',
      url: 'https://github.com/advansahiti70-oss',
      cta: 'View My GitHub',
    },
    instagram: {
      label: 'Instagram',
      handle: '@advan66',
      url: 'https://www.instagram.com/advan66/',
      cta: 'Follow Me on Instagram',
    },
  },
};

/** In-page sections, in order. `id` must match the section element's id. */
export const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'expertise', label: 'Expertise' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];
