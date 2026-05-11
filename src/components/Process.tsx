import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    icon: '📋',
    title: 'Consultation & Planning',
    desc: 'We begin with deep-dive consultations to understand your vision, requirements, and constraints. Feasibility studies and risk assessments follow.',
    number: '01',
  },
  {
    icon: '📐',
    title: 'Design & Engineering',
    desc: 'Our expert engineers and architects create detailed blueprints using advanced BIM technology, ensuring precision at every dimension.',
    number: '02',
  },
  {
    icon: '⚙️',
    title: 'Construction & Execution',
    desc: 'With our elite workforce and premium materials, we execute construction with military precision, adhering to the highest quality standards.',
    number: '03',
  },
  {
    icon: '✅',
    title: 'Quality & Handover',
    desc: 'Rigorous multi-stage quality inspections, certifications, and a seamless handover process ensure you receive a flawless finished project.',
    number: '04',
  },
];

const Process: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const svgPathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Heading
    gsap.fromTo(section.querySelector('.process-header'),
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

    // Steps stagger
    const steps = section.querySelectorAll('.process-step');
    gsap.fromTo(Array.from(steps),
      { y: 60, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section.querySelector('.process-grid'),
          start: 'top 80%',
        }
      }
    );

    // SVG Path animation
    const path = svgPathRef.current;
    if (path) {
      const length = path.getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 3,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          end: 'bottom 30%',
          scrub: true,
        }
      });
    }

    // Pinned storytelling section scroll effect
    gsap.fromTo(section.querySelector('.process-tagline'),
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: section.querySelector('.process-tagline'),
          start: 'top 85%',
        }
      }
    );
  }, []);

  return (
    <section id="process" ref={sectionRef}>
      {/* Blueprint SVG background */}
      <svg className="blueprint-svg" viewBox="0 0 1440 600" preserveAspectRatio="xMidYMid slice">
        <rect width="1440" height="600" fill="none" />
        <line x1="0" y1="100" x2="1440" y2="100" stroke="#ffb703" strokeWidth="0.5" />
        <line x1="0" y1="300" x2="1440" y2="300" stroke="#ffb703" strokeWidth="0.5" />
        <line x1="0" y1="500" x2="1440" y2="500" stroke="#ffb703" strokeWidth="0.5" />
        <line x1="200" y1="0" x2="200" y2="600" stroke="#ffb703" strokeWidth="0.5" />
        <line x1="600" y1="0" x2="600" y2="600" stroke="#ffb703" strokeWidth="0.5" />
        <line x1="1000" y1="0" x2="1000" y2="600" stroke="#ffb703" strokeWidth="0.5" />
        <circle cx="200" cy="300" r="40" fill="none" stroke="#ffb703" strokeWidth="0.5" />
        <circle cx="600" cy="300" r="40" fill="none" stroke="#ffb703" strokeWidth="0.5" />
        <circle cx="1000" cy="300" r="40" fill="none" stroke="#ffb703" strokeWidth="0.5" />
        <path
          ref={svgPathRef}
          d="M200 300 Q400 100 600 300 Q800 500 1000 300 Q1200 100 1440 300"
          fill="none"
          stroke="#ffb703"
          strokeWidth="1.5"
          strokeDasharray="6 4"
        />
        <text x="700" y="50" fill="#ffb703" fontSize="12" opacity="0.4" fontFamily="monospace">
          APEXCON CONSTRUCTION WORKFLOW v2.0
        </text>
        <text x="20" y="580" fill="#ffb703" fontSize="10" opacity="0.3" fontFamily="monospace">
          PRECISION ENGINEERING • QUALITY ASSURED • ISO CERTIFIED
        </text>
      </svg>

      <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div className="process-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>Our Process</div>
          <h2 className="section-heading">
            How We Build<br />
            <span className="outline-text">World-Class</span><br />
            Infrastructure
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', maxWidth: '480px', margin: '1.5rem auto 0', lineHeight: '1.75' }}>
            Our proven 4-step methodology ensures every project is delivered
            with precision, on time, and beyond expectations.
          </p>
        </div>

        {/* Steps */}
        <div className="process-grid">
          <div className="process-line" />

          {steps.map((step, i) => (
            <div key={i} className="process-step">
              <div className="step-number">{step.number}</div>
              <div className="step-icon">{step.icon}</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-desc">{step.desc}</p>

              {/* Animated indicator */}
              <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                {[0,1,2].map(j => (
                  <div
                    key={j}
                    style={{
                      width: j === 0 ? '20px' : '6px',
                      height: '3px',
                      borderRadius: '3px',
                      background: j === 0 ? 'var(--amber)' : 'rgba(255,183,3,0.2)',
                      transition: 'all 0.3s',
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <div className="process-tagline" style={{
          marginTop: '5rem',
          padding: '3rem',
          background: 'linear-gradient(135deg, rgba(255,183,3,0.05), rgba(251,133,0,0.05))',
          border: '1px solid rgba(255,183,3,0.15)',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '2rem',
        }}>
          <div>
            <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.03em', marginBottom: '0.5rem' }}>
              Ready to Break Ground?
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)' }}>
              Let's build something extraordinary together.
            </p>
          </div>
          <a
            href="#contact"
            className="btn-primary"
            onClick={e => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span>Start Your Project Today</span>
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Process;
