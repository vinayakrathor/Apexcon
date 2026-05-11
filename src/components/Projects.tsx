import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: 'Meridian Bridge',
    category: 'Bridge',
    location: 'San Francisco, CA',
    image: '/images/project1.jpg',
    year: '2023',
    value: '$1.8B',
    desc: 'A 2.4km cable-stayed bridge spanning the bay — an iconic new landmark.',
    tall: true,
  },
  {
    id: 2,
    title: 'Skyline Tower',
    category: 'Commercial',
    location: 'New York, NY',
    image: '/images/project2.jpg',
    year: '2022',
    value: '$980M',
    desc: '72-story premium mixed-use tower reshaping the Manhattan skyline.',
    tall: false,
  },
  {
    id: 3,
    title: 'NexGen Industrial Park',
    category: 'Industrial',
    location: 'Houston, TX',
    image: '/images/project3.jpg',
    year: '2023',
    value: '$450M',
    desc: 'State-of-the-art industrial complex spanning 400 acres.',
    tall: false,
  },
  {
    id: 4,
    title: 'Summit Commerce Hub',
    category: 'Commercial',
    location: 'Chicago, IL',
    image: '/images/project4.jpg',
    year: '2021',
    value: '$320M',
    desc: 'A 58-story commercial tower designed for the modern enterprise.',
    tall: false,
  },
  {
    id: 5,
    title: 'Pacific Expressway',
    category: 'Road',
    location: 'Los Angeles, CA',
    image: '/images/project5.jpg',
    year: '2022',
    value: '$2.1B',
    desc: '180km 8-lane smart highway connecting major urban centers.',
    tall: false,
  },
  {
    id: 6,
    title: 'The Atlas Residences',
    category: 'Residential',
    location: 'Miami, FL',
    image: '/images/project6.jpg',
    year: '2023',
    value: '$280M',
    desc: 'Ultra-luxury residential towers with premium finishes and amenities.',
    tall: false,
  },
];

const categories = ['All', 'Road', 'Bridge', 'Residential', 'Commercial', 'Industrial'];

const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [modalData, setModalData] = useState<typeof projects[0] | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Heading animation
    gsap.fromTo(section.querySelector('.projects-header'),
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
  }, []);

  useEffect(() => {
    // Animate cards when filter changes
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll('.project-card');
    gsap.fromTo(Array.from(cards),
      { y: 40, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
      }
    );
  }, [activeFilter]);

  const handleFilterClick = (cat: string) => {
    setActiveFilter(cat);
  };

  const openModal = (project: typeof projects[0]) => {
    setModalData(project);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalData(null);
    document.body.style.overflow = '';
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <section id="projects" ref={sectionRef}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div className="projects-header">
          <div className="section-label">Our Portfolio</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
            <h2 className="section-heading">
              Landmark<br />
              <span className="outline-text">Projects That</span><br />
              Define Eras
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', maxWidth: '360px', lineHeight: '1.75' }}>
              Each project in our portfolio represents a story of ambition,
              engineering mastery, and the relentless pursuit of perfection.
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="projects-filter">
            {categories.map(cat => (
              <button
                key={cat}
                className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
                onClick={() => handleFilterClick(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry Grid */}
        <div ref={gridRef} className="projects-masonry">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className={`project-card ${project.tall ? 'tall' : ''}`}
              onClick={() => openModal(project)}
            >
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
              />
              <div className="project-overlay">
                <div className="project-category">{project.category}</div>
                <h3 className="project-title">{project.title}</h3>
                <div className="project-location">📍 {project.location} · {project.year}</div>
              </div>
              <div className="project-view-btn">
                <span>↗</span>
              </div>
            </div>
          ))}
        </div>

        {/* View All */}
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <a href="#contact" className="btn-secondary" style={{ display: 'inline-flex' }}>
            <span>View All 500+ Projects</span>
            <span>→</span>
          </a>
        </div>
      </div>

      {/* Modal */}
      <div
        className={`modal-overlay ${modalData ? 'open' : ''}`}
        onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
        style={{ position: 'fixed' }}
      >
        {modalData && (
          <div className="modal-content" style={{ position: 'relative' }}>
            <button className="modal-close" onClick={closeModal}>✕</button>
            <img src={modalData.image} alt={modalData.title} />
            <div className="modal-info">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <div className="project-category" style={{ marginBottom: '4px' }}>{modalData.category}</div>
                  <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '2rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                    {modalData.title}
                  </h3>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.75rem', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, color: 'var(--amber)' }}>{modalData.value}</div>
                  <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Project Value</div>
                </div>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.55)', lineHeight: '1.75', marginBottom: '1.5rem' }}>{modalData.desc}</p>
              <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                <div>
                  <div style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--amber)', marginBottom: '4px' }}>Location</div>
                  <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }}>{modalData.location}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--amber)', marginBottom: '4px' }}>Completed</div>
                  <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }}>{modalData.year}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--amber)', marginBottom: '4px' }}>Category</div>
                  <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }}>{modalData.category} Construction</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
