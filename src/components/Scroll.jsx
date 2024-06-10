// components/Scroll.jsx
import React, { useEffect, useState } from 'react';
import '../assets/css/Scroll.css';

const Scroll = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollTop + windowHeight >= documentHeight - 400) { //altura a la que aparece 0=final
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    const searchElement = document.querySelector('.title-container'); // a donde llevará
    if (searchElement) {
      searchElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    isVisible && (
      <button className="scroll-to-top" onClick={scrollToTop}>
        <i class="bi bi-caret-up-fill"></i>
      </button>
    )
  );
};

export default Scroll;