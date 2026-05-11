import React from 'react';

const BackToTop: React.FC = () => {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button id="back-to-top" onClick={handleClick} aria-label="Back to top">
      ↑
    </button>
  );
};

export default BackToTop;
