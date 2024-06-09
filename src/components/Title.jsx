// Title.jsx
import React from 'react';
import PropTypes from 'prop-types';
import '../assets/css/Title.css';

const Title = ({ selectedHouse, setView, handleFetchSpells }) => {
  let imageSrc = '/hogwarts.png'; // Imagen por defecto

  // Cambiar la imagen según la casa seleccionada
  switch (selectedHouse.toLowerCase()) {
    case 'gryffindor':
      imageSrc = '/gryffindor.png';
      break;
    case 'slytherin':
      imageSrc = '/slytherin.png';
      break;
    case 'ravenclaw':
      imageSrc = '/ravenclaw.png';
      break;
    case 'hufflepuff':
      imageSrc = '/hufflepuff.png';
      break;
    default:
      imageSrc = '/hogwarts.png';
      break;
  }

  return (
    <div className="title-container">
      <p className="title" onClick={() => setView('characters')}>PERSONAJES</p>
      <img src={imageSrc} alt="House" className="middle-image" />
      <p className="title" onClick={handleFetchSpells}>HECHIZOS</p>
    </div>
  );
};

Title.propTypes = {
  selectedHouse: PropTypes.string.isRequired,
  setView: PropTypes.func.isRequired,
  handleFetchSpells: PropTypes.func.isRequired,
};

export default Title;
