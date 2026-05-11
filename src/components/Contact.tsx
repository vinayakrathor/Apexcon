import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.fromTo(section.querySelector('.contact-header'),
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

    gsap.fromTo(section.querySelector('.contact-info-card'),
      { x: -40, opacity: 0 },
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

    gsap.fromTo(section.querySelector('.contact-form-wrapper'),
      { x: 40, opacity: 0 },
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
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);

    // Show notification
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
      <div class="notification-icon">✓</div>
      <span>Thank you! We'll contact you within 24 hours.</span>
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.classList.add('show'), 100);
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 400);
    }, 4000);

    // Reset
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', company: '', email: '', phone: '', service: '', message: '' });
    }, 3000);
  };

  return (
    <section id="contact" ref={sectionRef}>
      {/* Background accent */}
      <div style={{
        position: 'absolute',
        bottom: '0',
        left: '0',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,183,3,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div className="contact-header" style={{ marginBottom: '4rem' }}>
          <div className="section-label">Get In Touch</div>
          <h2 className="section-heading">
            Let's Build<br />
            <span className="outline-text">Your Vision</span><br />
            Together
          </h2>
        </div>

        {/* Grid */}
        <div className="contact-grid">
          {/* Info Card */}
          <div className="contact-info-card">
            <h3 style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: '1.35rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '2rem',
              color: 'var(--amber)',
            }}>
              Contact Information
            </h3>

            {[
              {
                icon: '📞',
                label: 'Phone',
                value: '+1 (800) APEX-CON\n+1 (123) 456-7890',
              },
              {
                icon: '✉️',
                label: 'Email',
                value: 'projects@apexcon.com\nsupport@apexcon.com',
              },
              {
                icon: '📍',
                label: 'Headquarters',
                value: '2450 Construction Blvd\nNew York, NY 10001, USA',
              },
              {
                icon: '🕐',
                label: 'Business Hours',
                value: 'Mon–Fri: 7:00 AM – 6:00 PM\nSat: 8:00 AM – 2:00 PM',
              },
            ].map((item, i) => (
              <div key={i} className="contact-info-item">
                <div className="contact-info-icon">{item.icon}</div>
                <div>
                  <div className="contact-info-label">{item.label}</div>
                  <div className="contact-info-value" style={{ whiteSpace: 'pre-line' }}>{item.value}</div>
                </div>
              </div>
            ))}

            {/* Map placeholder */}
            <div className="map-placeholder">
              <div className="map-grid-bg" />
              <div className="map-pin">📍</div>
              <span style={{ position: 'relative', zIndex: 1 }}>New York, NY</span>
            </div>

            {/* WhatsApp */}
            <a
              href="https://wa.me/11234567890"
              className="whatsapp-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>💬</span>
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          {/* Form */}
          <div className="contact-form-wrapper">
            <div style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid var(--glass-border)',
              borderRadius: '4px',
              padding: '2.5rem',
            }}>
              <h3 style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: '1.35rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '0.5rem',
              }}>
                Request a Free Quote
              </h3>
              <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.4)', marginBottom: '2rem' }}>
                Fill out the form and our project team will respond within 24 hours.
              </p>

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-grid">
                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="form-input"
                      placeholder=" "
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    <label htmlFor="name" className="form-label">Full Name *</label>
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="company"
                      id="company"
                      className="form-input"
                      placeholder=" "
                      value={formData.company}
                      onChange={handleChange}
                    />
                    <label htmlFor="company" className="form-label">Company Name</label>
                  </div>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="form-input"
                      placeholder=" "
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    <label htmlFor="email" className="form-label">Email Address *</label>
                  </div>
                  <div className="form-group">
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      className="form-input"
                      placeholder=" "
                      value={formData.phone}
                      onChange={handleChange}
                    />
                    <label htmlFor="phone" className="form-label">Phone Number</label>
                  </div>
                </div>

                <div className="form-group">
                  <select
                    name="service"
                    id="service"
                    className="form-select"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    style={{ paddingTop: '1.25rem' }}
                  >
                    <option value="" disabled />
                    <option value="road">Road Construction</option>
                    <option value="bridge">Bridge Construction</option>
                    <option value="residential">Residential Projects</option>
                    <option value="commercial">Commercial Buildings</option>
                    <option value="industrial">Industrial Infrastructure</option>
                    <option value="interior">Interior & Exterior Works</option>
                    <option value="other">Other / Consultation</option>
                  </select>
                  <label htmlFor="service" className="form-label">Service Type *</label>
                </div>

                <div className="form-group">
                  <textarea
                    name="message"
                    id="message"
                    className="form-textarea"
                    placeholder=" "
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="message" className="form-label">Project Description *</label>
                </div>

                <button type="submit" className="form-submit" disabled={submitted}>
                  <span>{submitted ? '✓ Sent Successfully!' : 'Send Project Request'}</span>
                  {!submitted && <span>→</span>}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
