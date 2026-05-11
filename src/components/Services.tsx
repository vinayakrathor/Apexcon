import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: '🛣️',
    title: 'Road Construction',
    desc: 'Engineering highways and expressways that connect cities and fuel economies. From rural roads to 8-lane expressways.',
    features: ['Highway Design & Build', 'Urban Road Networks', 'Flyovers & Interchanges', 'Road Safety Systems'],
    number: '01',
  },
  {
    icon: '🌉',
    title: 'Bridge Construction',
    desc: 'Designing and constructing iconic bridges — suspension, cable-stayed, and arch bridges that become landmarks.',
    features: ['Suspension Bridges', 'Cable-Stayed Bridges', 'Pedestrian Bridges', 'Bridge Rehabilitation'],
    number: '02',
  },
  {
    icon: '🏘️',
    title: 'Residential Projects',
    desc: 'Creating premium housing developments, townships, and residential complexes that redefine modern living.',
    features: ['Luxury Apartments', 'Gated Communities', 'Township Development', 'Smart Homes'],
    number: '03',
  },
  {
    icon: '🏢',
    title: 'Commercial Buildings',
    desc: 'Iconic skyscrapers, corporate headquarters, shopping malls, and mixed-use developments.',
    features: ['Office Towers', 'Shopping Centers', 'Hotels & Resorts', 'Mixed-Use Developments'],
    number: '04',
  },
  {
    icon: '🏭',
    title: 'Industrial Infrastructure',
    desc: 'Heavy-duty industrial facilities, factories, warehouses, and power plants engineered for peak performance.',
    features: ['Manufacturing Plants', 'Warehousing', 'Power Plants', 'Port Infrastructure'],
    number: '05',
  },
  {
    icon: '🪟',
    title: 'Interior & Exterior Works',
    desc: 'Premium finishing works that transform spaces — from architectural facades to luxury interior design.',
    features: ['Facade Systems', 'Interior Fit-Out', 'Landscaping', 'MEP Services'],
    number: '06',
  },
];

const Services: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Heading reveal
    const heading = section.querySelector('.services-heading');
    if (heading) {
      gsap.fromTo(heading,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: heading,
            start: 'top 85%',
          }
        }
      );
    }

    // Cards stagger reveal
    const cards = section.querySelectorAll('.service-card');
    gsap.fromTo(Array.from(cards),
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section.querySelector('.services-grid'),
          start: 'top 80%',
        }
      }
    );

    // 3D tilt effect on cards
    cards.forEach((card) => {
      const el = card as HTMLElement;

      el.addEventListener('mousemove', (e: Event) => {
        const mouseEvent = e as MouseEvent;
        const rect = el.getBoundingClientRect();
        const x = mouseEvent.clientX - rect.left;
        const y = mouseEvent.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / centerY * -8;
        const rotateY = (x - centerX) / centerX * 8;

        gsap.to(el, {
          rotateX,
          rotateY,
          transformPerspective: 1000,
          duration: 0.4,
          ease: 'power2.out',
        });

        // Update gradient position
        el.style.setProperty('--x', `${(x / rect.width) * 100}%`);
        el.style.setProperty('--y', `${(y / rect.height) * 100}%`);
      });

      el.addEventListener('mouseleave', () => {
        gsap.to(el, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.6,
          ease: 'power3.out',
        });
      });
    });
  }, []);

  return (
    <section id="services" ref={sectionRef}>
      {/* Background pattern */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'radial-gradient(rgba(255,183,3,0.03) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div className="services-heading">
          <div className="section-label">What We Build</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem', marginBottom: '4rem' }}>
            <h2 className="section-heading">
              Engineering<br />
              <span className="outline-text">Excellence</span><br />
              Across Every Sector
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', maxWidth: '360px', lineHeight: '1.75' }}>
              From conception to completion, we deliver construction solutions
              that set the benchmark for quality, safety, and innovation.
            </p>
          </div>
        </div>

        <div className="services-grid">
          {services.map((service, i) => (
            <div key={i} className="service-card">
              <div className="service-number">{service.number}</div>
              <div className="service-icon">
                <span>{service.icon}</span>
              </div>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
              <ul className="service-features">
                {service.features.map((f, j) => (
                  <li key={j}>{f}</li>
                ))}
              </ul>
              <a href="#contact" className="service-link">
                Learn More <span>→</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
