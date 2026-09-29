import Hero from '../components/Hero.jsx';
import ProjectGallery from '../components/ProjectGallery.jsx';
import About from '../components/About.jsx';
import Skills from '../components/Skills.jsx';
import Contact from '../components/Contact.jsx';
import useReveal from '../hooks/useReveal.js';

export default function Home() {
  useReveal();
  return (
    <>
      <Hero />
      <ProjectGallery />
      <About />
      <Skills />
      <Contact />
    </>
  );
}
