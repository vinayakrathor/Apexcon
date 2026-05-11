import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const LoadingScreen: React.FC = () => {
  const screenRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const screen = screenRef.current;
    const logo = logoRef.current;
    const line = lineRef.current;
    const percent = percentRef.current;
    if (!screen || !logo || !line || !percent) return;

    const tl = gsap.timeline();

    tl.to(logo, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
    })
    .to(line, {
      width: '280px',
      duration: 2,
      ease: 'power2.inOut',
      onUpdate: function() {
        const p = Math.round(this.progress() * 100);
        if (percent) percent.textContent = p + '%';
      },
    }, '-=0.4')
    .to([logo, line, percent], {
      opacity: 0,
      y: -20,
      duration: 0.5,
      ease: 'power2.in',
    }, '+=0.3')
    .to(screen, {
      yPercent: -100,
      duration: 0.9,
      ease: 'power4.inOut',
      onComplete: () => {
        if (screen) screen.style.display = 'none';
        // Trigger page animations
        document.dispatchEvent(new CustomEvent('pageLoaded'));
      }
    }, '-=0.2');

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div id="loading-screen" ref={screenRef}>
      <div className="loader-blueprint" />
      <div ref={logoRef} className="loader-logo" style={{ opacity: 0, transform: 'translateY(20px)' }}>
        APEX<span>CON</span>
      </div>
      <div ref={lineRef} className="loader-line" />
      <p className="loader-percent">
        <span ref={percentRef}>0%</span>
      </p>
    </div>
  );
};

export default LoadingScreen;
