import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    text: "APEXCON delivered our $980M skyscraper project two weeks ahead of schedule with exceptional quality. Their use of BIM technology and meticulous project management is unmatched in the industry.",
    name: "Marcus J. Reynolds",
    title: "CEO, Meridian Properties Group",
    rating: 5,
    avatar: "MR",
  },
  {
    text: "The bridge construction project was a masterpiece of engineering. APEXCON's team navigated complex geological challenges with expertise I've never seen elsewhere. Absolutely world-class.",
    name: "Dr. Sarah Chen",
    title: "Director, State Infrastructure Authority",
    rating: 5,
    avatar: "SC",
  },
  {
    text: "Working with APEXCON transformed our industrial facility vision into reality. Their attention to detail, safety protocols, and communication throughout the 18-month project were outstanding.",
    name: "Roberto Vasquez",
    title: "VP Operations, Pacific Industrial Corp",
    rating: 5,
    avatar: "RV",
  },
  {
    text: "Our luxury residential tower was completed with zero defects and ahead of deadline. The APEXCON team's craftsmanship and professionalism set a new standard for what's possible in construction.",
    name: "Alexandra Petrov",
    title: "Managing Director, Atlas Developments",
    rating: 5,
    avatar: "AP",
  },
  {
    text: "The highway expansion project covered 180km and APEXCON executed it flawlessly. Their environmental compliance and community engagement were commendable throughout the project.",
    name: "James O'Brien",
    title: "Transportation Secretary, CA State Dept.",
    rating: 5,
    avatar: "JO",
  },
  {
    text: "APEXCON's sustainable approach saved us 30% in energy costs over the building lifecycle. Their green construction expertise and LEED certification capabilities are genuinely impressive.",
    name: "Emily Nakamura",
    title: "Sustainability Head, GreenFuture Corp",
    rating: 5,
    avatar: "EN",
  },
];

const Testimonials: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  const itemWidth = 396; // card width + gap

  const goTo = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const maxIndex = testimonials.length - 1;
    const clampedIndex = Math.max(0, Math.min(index, maxIndex - 1));
    setCurrentIndex(clampedIndex);
    gsap.to(track, {
      x: -clampedIndex * itemWidth,
      duration: 0.7,
      ease: 'power3.inOut',
    });
  };

  const goNext = () => goTo(currentIndex + 1);
  const goPrev = () => goTo(currentIndex - 1);

  useEffect(() => {
    // Auto-play
    autoPlayRef.current = setInterval(() => {
      const nextIndex = currentIndex >= testimonials.length - 2 ? 0 : currentIndex + 1;
      goTo(nextIndex);
    }, 4000);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [currentIndex]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.fromTo(section.querySelector('.testimonials-header'),
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
        }
      }
    );

    const cards = section.querySelectorAll('.testimonial-card');
    gsap.fromTo(Array.from(cards),
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section.querySelector('.testimonials-slider'),
          start: 'top 85%',
        }
      }
    );
  }, []);

  return (
    <section id="testimonials" ref={sectionRef}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div className="testimonials-header">
          <div className="section-label">Client Stories</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem', marginBottom: '3rem' }}>
            <h2 className="section-heading">
              Trusted By<br />
              <span className="outline-text">Industry</span><br />
              Leaders
            </h2>
            <div>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
                {'★★★★★'.split('').map((s, i) => (
                  <span key={i} style={{ color: 'var(--amber)', fontSize: '1.25rem' }}>{s}</span>
                ))}
              </div>
              <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}>
                4.9/5 average rating across 500+ projects
              </p>
            </div>
          </div>
        </div>

        {/* Slider */}
        <div className="testimonials-slider">
          <div ref={trackRef} className="testimonials-track">
            {testimonials.map((t, i) => (
              <div key={i} className="testimonial-card">
                <div className="testimonial-quote">"</div>
                <div className="testimonial-rating">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <span key={j}>★</span>
                  ))}
                </div>
                <p className="testimonial-text">{t.text}</p>
                <div className="testimonial-author">
                  <div className="author-avatar">{t.avatar}</div>
                  <div>
                    <div className="author-name">{t.name}</div>
                    <div className="author-title">{t.title}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="slider-controls">
          <button className="slider-btn" onClick={goPrev} aria-label="Previous">←</button>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            {testimonials.slice(0, testimonials.length - 1).map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                style={{
                  width: i === currentIndex ? '24px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  background: i === currentIndex ? 'var(--amber)' : 'rgba(255,255,255,0.2)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  padding: 0,
                }}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
          <button className="slider-btn" onClick={goNext} aria-label="Next">→</button>
        </div>

        {/* Client Logos */}
        <div style={{
          marginTop: '4rem',
          padding: '2.5rem',
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid var(--glass-border)',
          borderRadius: '4px',
        }}>
          <p style={{ textAlign: 'center', fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '2rem' }}>
            Trusted By Industry Leaders
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '2rem', alignItems: 'center' }}>
            {['Meridian Group', 'Atlas Corp', 'Pacific Industries', 'GreenFuture', 'StateGov', 'TechBuild'].map((logo, i) => (
              <div key={i} style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: '1rem',
                fontWeight: 800,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.12)',
                transition: 'color 0.3s',
                cursor: 'default',
              }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,183,3,0.4)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.12)'}
              >
                {logo}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
