import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const scrollIndRef = useRef<HTMLDivElement>(null);
  const bgImgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Particles
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles: Array<{
      x: number; y: number; vx: number; vy: number;
      size: number; opacity: number; color: string;
    }> = [];

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.4 + 0.1,
        color: Math.random() > 0.5 ? '#ffb703' : '#fb8500',
      });
    }

    let animFrame: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      // Draw connecting lines
      particles.forEach((p, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = '#ffb703';
            ctx.globalAlpha = (1 - dist / 100) * 0.05;
            ctx.lineWidth = 0.5;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        });
      });

      animFrame = requestAnimationFrame(animate);
    };
    animate();

    // Parallax on scroll
    const onScroll = () => {
      const scrollY = window.scrollY;
      if (bgImgRef.current) {
        bgImgRef.current.style.transform = `scale(1.1) translateY(${scrollY * 0.4}px)`;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // Animate hero content after loading
    const onLoaded = () => {
      const tl = gsap.timeline({ delay: 0.3 });

      tl.to(badgeRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      })
      .to(headingRef.current?.querySelectorAll('.line-inner') || [], {
        y: 0,
        duration: 1,
        stagger: 0.12,
        ease: 'power4.out',
      }, '-=0.4')
      .to(headingRef.current, { opacity: 1, duration: 0.1 }, '-=1')
      .to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      }, '-=0.5')
      .to(buttonsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      }, '-=0.5')
      .to(statsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      }, '-=0.6')
      .to(scrollIndRef.current, {
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
      }, '-=0.4');

      // Animate counters
      const counters = document.querySelectorAll('.hero-counter');
      counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target') || '0');
        gsap.to({ val: 0 }, {
          val: target,
          duration: 2.5,
          ease: 'power2.out',
          delay: 1.5,
          onUpdate: function() {
            counter.textContent = Math.round((this as any).targets()[0].val).toString();
          }
        });
      });
    };

    document.addEventListener('pageLoaded', onLoaded);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('pageLoaded', onLoaded);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  return (
    <section id="hero" ref={sectionRef}>
      {/* Background */}
      <div className="hero-bg">
        <img
          ref={bgImgRef}
          src="/images/hero-bg.jpg"
          alt="APEX Construction - Building the Future"
          loading="eager"
        />
      </div>

      {/* Overlays */}
      <div className="hero-overlay" />
      <div className="hero-grid" />

      {/* Particles */}
      <canvas ref={canvasRef} className="particles-canvas" />

      {/* Content */}
      <div className="hero-content">
        {/* Badge */}
        <div ref={badgeRef} className="hero-badge" style={{ opacity: 0, transform: 'translateY(20px)' }}>
          <span className="hero-badge-dot" />
          <span>Premier Civil Engineering & Infrastructure</span>
        </div>

        {/* Heading */}
        <h1 ref={headingRef} className="hero-heading" style={{ opacity: 0 }}>
          <span className="line">
            <span className="line-inner">Building</span>
          </span>
          <span className="line">
            <span className="line-inner highlight">The Future</span>
          </span>
          <span className="line">
            <span className="line-inner orange-text">With Precision</span>
          </span>
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="hero-subtitle"
          style={{ opacity: 0, transform: 'translateY(20px)' }}
        >
          World-class civil engineering solutions — from towering skyscrapers and landmark bridges
          to highways and industrial infrastructure. We shape skylines and transform landscapes.
        </p>

        {/* Buttons */}
        <div
          ref={buttonsRef}
          className="hero-buttons"
          style={{ opacity: 0, transform: 'translateY(20px)' }}
        >
          <a href="#projects" className="btn-primary" onClick={e => {
            e.preventDefault();
            document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
          }}>
            <span>Explore Projects</span>
            <span>→</span>
          </a>
          <a href="#contact" className="btn-secondary" onClick={e => {
            e.preventDefault();
            document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
          }}>
            <span>🏗️</span>
            <span>Start Your Project</span>
          </a>
        </div>
      </div>

      {/* Stats */}
      <div ref={statsRef} className="hero-stats" style={{ opacity: 0 }}>
        {[
          { value: '500', suffix: '+', label: 'Projects Done' },
          { value: '25', suffix: 'yr', label: 'Experience' },
          { value: '48', suffix: 'k', label: 'Workers' },
          { value: '99', suffix: '%', label: 'Satisfaction' },
        ].map((stat, i) => (
          <div key={i} className="stat-card">
            <div className="stat-number">
              <span className="hero-counter" data-target={stat.value}>0</span>
              <span className="suffix">{stat.suffix}</span>
            </div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Scroll Indicator */}
      <div ref={scrollIndRef} className="scroll-indicator" style={{ opacity: 0 }}>
        <div className="scroll-indicator-line" />
        <span className="scroll-indicator-text">Scroll</span>
      </div>

      {/* Floating Crane SVG */}
      <div
        className="crane-float"
        style={{
          position: 'absolute',
          right: '5%',
          top: '15%',
          zIndex: 5,
          opacity: 0.12,
          pointerEvents: 'none',
        }}
      >
        <svg width="220" height="300" viewBox="0 0 220 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Crane base */}
          <rect x="90" y="220" width="40" height="80" fill="#ffb703" />
          {/* Crane mast */}
          <rect x="103" y="60" width="14" height="160" fill="#ffb703" />
          {/* Crane jib */}
          <rect x="20" y="60" width="180" height="8" fill="#ffb703" />
          {/* Counter jib */}
          <rect x="20" y="60" width="80" height="6" fill="#fb8500" />
          {/* Trolley */}
          <rect x="130" y="68" width="20" height="10" fill="#fb8500" />
          {/* Hook rope */}
          <line x1="140" y1="78" x2="140" y2="160" stroke="#ffb703" strokeWidth="2" strokeDasharray="4 4" />
          {/* Hook */}
          <path d="M133 160 Q140 175 147 160" stroke="#ffb703" strokeWidth="3" fill="none" />
          {/* Counterweight */}
          <rect x="20" y="68" width="30" height="20" fill="#fb8500" opacity="0.7" />
          {/* Cables */}
          <line x1="103" y1="60" x2="20" y2="68" stroke="#ffb703" strokeWidth="1.5" />
          <line x1="117" y1="60" x2="200" y2="68" stroke="#ffb703" strokeWidth="1.5" />
          {/* Legs */}
          <line x1="90" y1="220" x2="60" y2="300" stroke="#ffb703" strokeWidth="4" />
          <line x1="130" y1="220" x2="160" y2="300" stroke="#ffb703" strokeWidth="4" />
          {/* Lights */}
          <circle cx="200" cy="62" r="5" fill="#ffb703" opacity="0.8">
            <animate attributeName="opacity" values="0.8;0.2;0.8" dur="2s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
