import React from 'react';
import { Carousel, Card } from 'react-bootstrap';
import './css/Carousel.css';


const CardCarousel = ({ cards }) => {
  return (
    <Carousel>
      {cards.map((card, index) => (
        <Carousel.Item key={index}>
          <Card>
            <Card.Img variant="top" src={card.image} />
            <Card.Body>
              <Card.Title>{card.title}</Card.Title>
              <Card.Text>{card.description}</Card.Text>
            </Card.Body>
          </Card>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default CardCarousel;
