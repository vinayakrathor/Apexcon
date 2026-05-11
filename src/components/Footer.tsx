import React from 'react';

const Footer: React.FC = () => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget.querySelector('input');
    if (input) input.value = '';

    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
      <div class="notification-icon">✓</div>
      <span>Subscribed! Welcome to APEXCON updates.</span>
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.classList.add('show'), 100);
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 400);
    }, 3500);
  };

  return (
    <footer>
      <div className="footer-grid">
        {/* Brand */}
        <div>
          <a href="#hero" className="footer-logo" onClick={e => handleNavClick(e, '#hero')}>
            APEX<span>CON</span>
          </a>
          <p className="footer-desc">
            Building the world's most ambitious infrastructure projects since 1999.
            Excellence, precision, and innovation in every structure we create.
          </p>
          <div className="social-links">
            {[
              { icon: '𝕏', label: 'Twitter/X' },
              { icon: 'in', label: 'LinkedIn' },
              { icon: '▶', label: 'YouTube' },
              { icon: '📸', label: 'Instagram' },
              { icon: 'f', label: 'Facebook' },
            ].map((social, i) => (
              <a key={i} href="#" className="social-link" aria-label={social.label}>
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Services */}
        <div>
          <h4 className="footer-heading">Services</h4>
          <ul className="footer-links">
            {[
              { label: 'Road Construction', href: '#services' },
              { label: 'Bridge Engineering', href: '#services' },
              { label: 'Residential Projects', href: '#services' },
              { label: 'Commercial Buildings', href: '#services' },
              { label: 'Industrial Infrastructure', href: '#services' },
              { label: 'Interior & Exterior', href: '#services' },
            ].map((link, i) => (
              <li key={i}>
                <a href={link.href} onClick={e => handleNavClick(e, link.href)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="footer-heading">Company</h4>
          <ul className="footer-links">
            {[
              { label: 'About APEXCON', href: '#about' },
              { label: 'Our Projects', href: '#projects' },
              { label: 'Why Choose Us', href: '#why-us' },
              { label: 'Our Process', href: '#process' },
              { label: 'Testimonials', href: '#testimonials' },
              { label: 'Contact Us', href: '#contact' },
            ].map((link, i) => (
              <li key={i}>
                <a href={link.href} onClick={e => handleNavClick(e, link.href)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter + Contact */}
        <div>
          <h4 className="footer-heading">Stay Updated</h4>
          <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.4)', lineHeight: '1.7', marginBottom: '1.25rem' }}>
            Subscribe to our newsletter for project updates, industry insights, and company news.
          </p>

          <form onSubmit={handleNewsletterSubmit} style={{ marginBottom: '2rem' }}>
            <div className="newsletter-form">
              <input
                type="email"
                className="newsletter-input"
                placeholder="Your email address"
                required
              />
              <button type="submit" className="newsletter-btn" aria-label="Subscribe">
                →
              </button>
            </div>
          </form>

          <h4 className="footer-heading" style={{ marginTop: '1.5rem' }}>Contact</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <a href="tel:+11234567890" className="footer-links" style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              fontSize: '0.82rem', color: 'rgba(255,255,255,0.45)',
              textDecoration: 'none', transition: 'color 0.3s',
            }}>
              📞 +1 (123) 456-7890
            </a>
            <a href="mailto:projects@apexcon.com" style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              fontSize: '0.82rem', color: 'rgba(255,255,255,0.45)',
              textDecoration: 'none', transition: 'color 0.3s',
            }}>
              ✉️ projects@apexcon.com
            </a>
            <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.3)', marginTop: '4px', display: 'flex', gap: '8px' }}>
              <span>📍</span>
              <span>2450 Construction Blvd,<br />New York, NY 10001</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <p className="footer-copy">
          © {new Date().getFullYear()} <span>APEXCON</span>. All rights reserved. Engineered with precision.
        </p>
        <div className="footer-legal">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
