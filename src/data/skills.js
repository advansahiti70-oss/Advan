/**
 * Areas of expertise shown in the Expertise section.
 *
 * To add a technology, append an item to a discipline's `items`. Give it an
 * `icon` key from `src/components/BrandIcon.jsx` to show a logo; items without
 * an icon render as a plain list entry.
 */
export const expertise = [
  {
    id: 'front-end',
    title: 'Front-End Development',
    summary: 'The languages and library I build with — semantic, responsive and fast in the browser.',
    items: [
      { name: 'HTML5', icon: 'html5' },
      { name: 'CSS3', icon: 'css' },
      { name: 'JavaScript', icon: 'javascript' },
      { name: 'React', icon: 'react' },
    ],
  },
  {
    id: 'ui-ux',
    title: 'UI/UX Design',
    summary: 'How an interface should look, read and behave for the person using it.',
    items: [
      { name: 'User interface design' },
      { name: 'User experience principles' },
      { name: 'Responsive design' },
      { name: 'Accessibility' },
      { name: 'Visual hierarchy' },
      { name: 'Component-based design' },
    ],
  },
  {
    id: 'ai',
    title: 'AI Development',
    summary: 'Exploring how AI can open new possibilities in everyday digital products.',
    items: [
      { name: 'AI-powered applications' },
      { name: 'AI integration' },
      { name: 'Intelligent digital experiences' },
    ],
  },
];
