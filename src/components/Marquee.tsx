import React from 'react';

const items = [
  'Road Construction', 'Bridge Engineering', 'Residential Projects',
  'Commercial Buildings', 'Industrial Infrastructure', 'Interior Works',
  'Road Construction', 'Bridge Engineering', 'Residential Projects',
  'Commercial Buildings', 'Industrial Infrastructure', 'Interior Works',
];

const Marquee: React.FC = () => {
  return (
    <div
      className="horizontal-section"
      style={{
        background: 'var(--charcoal)',
        borderTop: '1px solid var(--glass-border)',
        borderBottom: '1px solid var(--glass-border)',
        padding: '0',
      }}
    >
      <div className="horizontal-track">
        {items.map((item, i) => (
          <div key={i} className="marquee-item">
            <span className="marquee-dot" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
