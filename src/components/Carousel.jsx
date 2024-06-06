import React from 'react';
import { Carousel } from 'react-bootstrap';
import './css/Carousel.css';

// Importa las imágenes
import L1 from '../images/L1.jpg';
import P1 from '../images/P1.jpg';
import L2 from '../images/L2.jpg';
import P2 from '../images/P2.jpg';
import L3 from '../images/L3.jpg';
import P3 from '../images/P3.jpg';
import L4 from '../images/L4.jpg';
import P4 from '../images/P4.jpg';
import L5 from '../images/L5.jpg';
import P5 from '../images/P5.jpg';
import L6 from '../images/L6.jpg';
import P6 from '../images/P6.jpg';
import L7 from '../images/L7.jpg';
import P7 from '../images/P7.jpg';
import P8 from '../images/P8.jpg';

const images = [L1, P1, L2, P2, L3, P3, L4, P4, L5, P5, L6, P6, L7, P7, P8];

const CardCarousel = () => {
  return (
    <Carousel interval={3000} indicators={false}>
      {images.map((image, index) => (
        <Carousel.Item key={index}>
          <img
            className="d-block w-100 carousel-img"
            src={image}
            alt={`Slide ${index}`}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default CardCarousel;
