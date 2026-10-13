import { About } from './components/About';
import { Contact } from './components/Contact';
import { Expertise } from './components/Expertise';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';
import { Projects } from './components/Projects';
import { useRevealOnScroll } from './hooks/useRevealOnScroll';

export default function App() {
  useRevealOnScroll();

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navbar />
      <main id="main" tabIndex={-1}>
        <Hero />
        <About />
        <Expertise />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
