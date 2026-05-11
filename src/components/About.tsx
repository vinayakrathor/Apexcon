import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Reveal elements on scroll
    const elements = section.querySelectorAll('.reveal-element');
    elements.forEach((el) => {
      gsap.fromTo(el,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        }
      );
    });

    // Image parallax
    if (imageRef.current) {
      gsap.fromTo(imageRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 80%',
          }
        }
      );
    }

    if (contentRef.current) {
      gsap.fromTo(contentRef.current,
        { x: 60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
          }
        }
      );
    }

    // Timeline items stagger
    const timelineItems = section.querySelectorAll('.timeline-item');
    gsap.fromTo(Array.from(timelineItems),
      { x: 30, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: timelineItems[0],
          start: 'top 85%',
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section id="about" ref={sectionRef}>
      {/* Background accent */}
      <div style={{
        position: 'absolute',
        top: '10%',
        right: '-10%',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,183,3,0.03) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="about-grid">
        {/* Image Column */}
        <div ref={imageRef} className="about-image-wrapper">
          <div className="about-image-accent" />
          <div className="about-image-accent-br" />
          <img
            src="/images/about-img.jpg"
            alt="APEX Construction team at work"
            loading="lazy"
          />
          <div className="about-year-badge">
            <div className="year">1999</div>
            <div className="year-label">Est.</div>
          </div>
        </div>

        {/* Content Column */}
        <div ref={contentRef}>
          <div className="section-label reveal-element">About APEXCON</div>
          <h2 className="section-heading reveal-element" style={{ marginBottom: '1.5rem' }}>
            Crafting Iconic<br />
            <span className="outline-text">Structures That</span><br />
            Last Centuries
          </h2>
          <p className="reveal-element" style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.6)', lineHeight: '1.8', marginBottom: '1.5rem' }}>
            Since 1999, APEXCON has been at the forefront of civil engineering and construction excellence.
            With a portfolio spanning 500+ landmark projects across 12 countries, we combine
            cutting-edge technology with unparalleled craftsmanship.
          </p>
          <p className="reveal-element" style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.45)', lineHeight: '1.8' }}>
            From the first blueprint to the final ribbon-cutting, our commitment to precision,
            safety, and innovation is absolute. Every project is a testament to human ingenuity
            and engineering mastery.
          </p>

          {/* Mission & Vision Cards */}
          <div className="mission-vision-grid reveal-element">
            {[
              {
                icon: '🎯',
                title: 'Our Mission',
                desc: 'To deliver transformative infrastructure solutions that uplift communities and stand as monuments to engineering excellence.',
              },
              {
                icon: '🔭',
                title: 'Our Vision',
                desc: 'To be the world\'s most trusted name in civil construction, setting global benchmarks for quality and innovation.',
              },
              {
                icon: '⚡',
                title: 'Our Values',
                desc: 'Integrity, precision, safety, and sustainability are the cornerstones of every decision we make.',
              },
              {
                icon: '🛡️',
                title: 'Our Promise',
                desc: 'On time, on budget, and beyond expectations — every single project, every single time.',
              },
            ].map((card, i) => (
              <div key={i} className="mv-card">
                <div className="mv-card-icon">{card.icon}</div>
                <h4>{card.title}</h4>
                <p>{card.desc}</p>
              </div>
            ))}
          </div>

          {/* Timeline */}
          <div className="timeline">
            {[
              { year: '1999', text: 'Founded with a vision to redefine construction excellence in North America.' },
              { year: '2007', text: 'Expanded operations to 5 countries. Delivered first mega bridge project worth $2.4B.' },
              { year: '2015', text: 'ISO 9001:2015 certified. Launched sustainable green construction division.' },
              { year: '2024', text: 'Operating in 12 countries with 48,000+ workforce. Industry leader in smart infrastructure.' },
            ].map((item, i) => (
              <div key={i} className="timeline-item">
                <div className="timeline-dot">
                  <div className="timeline-dot-inner" />
                </div>
                <div>
                  <div className="timeline-year">{item.year}</div>
                  <div className="timeline-text">{item.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
