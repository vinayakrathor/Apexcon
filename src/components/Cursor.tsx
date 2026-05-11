import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Cursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      gsap.to(cursor, {
        x: mouseX,
        y: mouseY,
        duration: 0.1,
        ease: 'power2.out',
      });
    };

    const animateFollower = () => {
      followerX += (mouseX - followerX) * 0.12;
      followerY += (mouseY - followerY) * 0.12;
      gsap.set(follower, { x: followerX, y: followerY });
      requestAnimationFrame(animateFollower);
    };
    animateFollower();

    const onMouseEnterInteractive = () => document.body.classList.add('cursor-hover');
    const onMouseLeaveInteractive = () => document.body.classList.remove('cursor-hover');

    document.addEventListener('mousemove', onMouseMove);

    const interactiveElements = document.querySelectorAll('a, button, [cursor-hover], .service-card, .project-card, .testimonial-card, .feature-item, .process-step');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', onMouseEnterInteractive);
      el.addEventListener('mouseleave', onMouseLeaveInteractive);
    });

    // Re-attach after dynamic updates
    const observer = new MutationObserver(() => {
      document.querySelectorAll('a, button, .service-card, .project-card, .testimonial-card, .feature-item, .process-step').forEach(el => {
        el.addEventListener('mouseenter', onMouseEnterInteractive);
        el.addEventListener('mouseleave', onMouseLeaveInteractive);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div id="custom-cursor" ref={cursorRef} />
      <div id="cursor-follower" ref={followerRef} />
    </>
  );
};

export default Cursor;
