import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: '🛡️',
    title: 'Zero-Compromise Safety',
    desc: 'ISO 45001 certified safety management. Zero Lost Time Injuries for 8 consecutive years. Safety is non-negotiable.',
  },
  {
    icon: '⏱️',
    title: 'On-Time Delivery',
    desc: 'Industry-leading 97.8% on-time project completion rate. We honor commitments and respect your timeline.',
  },
  {
    icon: '🏆',
    title: 'Award-Winning Quality',
    desc: '48 international engineering excellence awards. ISO 9001:2015 certified processes throughout.',
  },
  {
    icon: '🌱',
    title: 'Sustainable Building',
    desc: 'LEED Gold certified projects. 40% reduction in carbon footprint through innovative green construction methods.',
  },
  {
    icon: '🤖',
    title: 'Technology-Driven',
    desc: 'BIM 3D modeling, drone surveys, AI project management, and IoT-enabled smart infrastructure.',
  },
];

const progressBars = [
  { label: 'Project Success Rate', value: 98 },
  { label: 'Client Satisfaction', value: 99 },
  { label: 'Safety Compliance', value: 100 },
  { label: 'On-Budget Delivery', value: 96 },
];

const counters = [
  { value: 500, suffix: '+', label: 'Projects Completed' },
  { value: 25, suffix: 'yr', label: 'Years Experience' },
  { value: 48, suffix: 'k', label: 'Total Workforce' },
  { value: 12, suffix: '', label: 'Countries Active' },
];

const WhyUs: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);


  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Heading + left column
    gsap.fromTo(section.querySelector('.why-left'),
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
        }
      }
    );

    gsap.fromTo(section.querySelector('.why-right'),
      { x: 50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
        }
      }
    );

    // Feature items stagger
    const items = section.querySelectorAll('.feature-item');
    gsap.fromTo(Array.from(items),
      { x: -30, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: items[0],
          start: 'top 85%',
        }
      }
    );

    // Progress bars
    const fills = section.querySelectorAll('.progress-bar-fill');
    fills.forEach((fill) => {
      const target = fill.getAttribute('data-width') || '0';
      ScrollTrigger.create({
        trigger: fill,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(fill, {
            width: target + '%',
            duration: 1.5,
            ease: 'power2.out',
            delay: 0.3,
          });
        }
      });
    });

    // Counters
    const counterEls = section.querySelectorAll('.stats-counter');
    counterEls.forEach(el => {
      const target = parseInt(el.getAttribute('data-target') || '0');
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        onEnter: () => {
          gsap.to({ val: 0 }, {
            val: target,
            duration: 2,
            ease: 'power2.out',
            onUpdate: function() {
              el.textContent = Math.round((this as any).targets()[0].val).toString();
            }
          });
        }
      });
    });
  }, []);

  return (
    <section id="why-us" ref={sectionRef}>
      <div className="why-us-grid">
        {/* Left: Features */}
        <div className="why-left">
          <div className="section-label">Why Choose APEXCON</div>
          <h2 className="section-heading" style={{ marginBottom: '1.5rem' }}>
            The Standard<br />
            <span className="outline-text">Others Measure</span><br />
            Themselves By
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', lineHeight: '1.8', marginBottom: '2rem' }}>
            With over two decades of engineering excellence, we've earned the trust
            of governments, corporations, and communities worldwide.
          </p>

          <div className="feature-list">
            {features.map((f, i) => (
              <div key={i} className="feature-item">
                <div className="feature-icon">{f.icon}</div>
                <div>
                  <h4>{f.title}</h4>
                  <p>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Stats + Progress */}
        <div className="why-right">
          {/* Counter Grid */}
          <div className="stats-grid" style={{ marginTop: 0, marginBottom: '2.5rem' }}>
            {counters.map((c, i) => (
              <div key={i} className="stats-item">
                <div className="counter" style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '2px' }}>
                  <span className="stats-counter" data-target={c.value}>0</span>
                  <span style={{ fontSize: '1.5rem', fontWeight: 700 }}>{c.suffix}</span>
                </div>
                <p>{c.label}</p>
              </div>
            ))}
          </div>

          {/* Progress Bars */}
          <div style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid var(--glass-border)',
            borderRadius: '4px',
            padding: '2rem',
          }}>
            <h3 style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: '1.1rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'var(--amber)',
              marginBottom: '1.75rem',
            }}>
              Performance Metrics
            </h3>

            <div className="progress-section" style={{ marginTop: 0 }}>
              {progressBars.map((bar, i) => (
                <div key={i} className="progress-item">
                  <h4>
                    {bar.label}
                    <span>{bar.value}%</span>
                  </h4>
                  <div className="progress-bar-track">
                    <div
                      className="progress-bar-fill"
                      data-width={bar.value}
                      style={{ width: '0%' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
            {[
              { icon: '🏅', label: 'ISO 9001', sub: 'Quality Mgmt' },
              { icon: '🛡️', label: 'ISO 45001', sub: 'Safety Standard' },
              { icon: '🌿', label: 'LEED Gold', sub: 'Green Building' },
            ].map((cert, i) => (
              <div key={i} style={{
                background: 'rgba(255,183,3,0.04)',
                border: '1px solid rgba(255,183,3,0.12)',
                borderRadius: '4px',
                padding: '1.25rem',
                textAlign: 'center',
                transition: 'all 0.3s',
              }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,183,3,0.3)';
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,183,3,0.07)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,183,3,0.12)';
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,183,3,0.04)';
                }}
              >
                <div style={{ fontSize: '1.75rem', marginBottom: '6px' }}>{cert.icon}</div>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: '0.9rem', letterSpacing: '0.05em', color: 'var(--amber)' }}>{cert.label}</div>
                <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '2px' }}>{cert.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
