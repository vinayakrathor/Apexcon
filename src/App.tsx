import React, { useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import Services from './components/Services';
import Projects from './components/Projects';
import WhyUs from './components/WhyUs';
import Testimonials from './components/Testimonials';
import Process from './components/Process';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import MouseGlow from './components/MouseGlow';

const App: React.FC = () => {
  useEffect(() => {
    // Prevent FOUC
    document.body.style.opacity = '0';
    setTimeout(() => {
      document.body.style.transition = 'opacity 0.3s';
      document.body.style.opacity = '1';
    }, 100);
  }, []);

  return (
    <>
      <LoadingScreen />
      <Cursor />
      <MouseGlow />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Services />
        <Projects />
        <WhyUs />
        <Testimonials />
        <Process />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
};

export default App;
