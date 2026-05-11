import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#projects', label: 'Projects' },
  { href: '#why-us', label: 'Why Us' },
  { href: '#process', label: 'Process' },
  { href: '#contact', label: 'Contact' },
];

const Navbar: React.FC = () => {
  const navRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileLinksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);

      // Back to top visibility
      const btn = document.getElementById('back-to-top');
      if (btn) {
        if (window.scrollY > 400) {
          btn.classList.add('visible');
        } else {
          btn.classList.remove('visible');
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Animate nav in after loading
    const onLoaded = () => {
      gsap.fromTo(navRef.current,
        { y: -40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
      );
    };
    document.addEventListener('pageLoaded', onLoaded);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('pageLoaded', onLoaded);
    };
  }, []);

  useEffect(() => {
    const menu = mobileMenuRef.current;
    if (!menu) return;

    if (menuOpen) {
      menu.classList.add('open');
      document.body.style.overflow = 'hidden';

      // Animate links in
      const links = menu.querySelectorAll('.mobile-nav-link');
      gsap.to(Array.from(links), {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.07,
        ease: 'power3.out',
        delay: 0.2,
      });
    } else {
      menu.classList.remove('open');
      document.body.style.overflow = '';

      const links = menu.querySelectorAll('.mobile-nav-link');
      gsap.to(Array.from(links), {
        y: 30,
        opacity: 0,
        duration: 0.4,
        stagger: 0.04,
        ease: 'power2.in',
      });
    }
  }, [menuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        id="navbar"
        className={scrolled ? 'scrolled' : ''}
        style={{ opacity: 0 }}
      >
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href="#hero" className="nav-logo" onClick={e => handleNavClick(e, '#hero')}>
            APEX<span>CON</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link"
                onClick={e => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <a href="tel:+11234567890" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>📞</span> +1 (123) 456-7890
            </a>
            <a href="#contact" className="nav-cta" onClick={e => handleNavClick(e, '#contact')}>
              <span>Get a Quote</span>
            </a>
          </div>

          {/* Hamburger */}
          <button
            className={`hamburger lg:hidden ${menuOpen ? 'active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            style={{ background: 'none', border: 'none' }}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div ref={mobileMenuRef} className="mobile-menu">
        <div ref={mobileLinksRef} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="mobile-nav-link"
              onClick={e => handleNavClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="mobile-nav-link"
            style={{ color: 'var(--amber)', marginTop: '1rem', fontSize: 'clamp(1.2rem, 4vw, 2rem)' }}
            onClick={e => handleNavClick(e, '#contact')}
          >
            Get a Quote →
          </a>
        </div>

        <div style={{ position: 'absolute', bottom: '3rem', display: 'flex', gap: '2rem' }}>
          <a href="#" className="nav-link" style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            Instagram
          </a>
          <a href="#" className="nav-link" style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            LinkedIn
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
