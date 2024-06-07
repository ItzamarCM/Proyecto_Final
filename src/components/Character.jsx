//definir el componente que mostrará los datos de cada personaje.

import React from 'react';
import './css/Character.css';
import PropTypes from 'prop-types';

const Character = ({ character }) => {
  const placeholderImage = '/no-imagen-d.png'; // Ruta de la imagen en la carpeta public

//TODO: function Character({ character }) {

// acá se especifica que datos se van a mostrar y en que orden

  return (
    <div className="character">
      <h3><strong>{character.name}</strong></h3>  {/* Nombre */}

    {/* Mostrar icono de usuario generico cuando no haya imagen designada */}
      {character.image ? ( 
        <img src={character.image} alt={character.name} className="character-img" />
      ) : (
        //TODO: <i className="bi bi-person-circle character-placeholder-icon"></i>
        <img src={placeholderImage} alt="placeholder" className="character-img" />
      )}
      <p><strong>{character.house}</strong></p>   {/* Casa */}
      <p> <strong>BD:</strong> {character.dateOfBirth}</p>   {/* Año de nacimiento */}
      <p> <strong>Actor:</strong> {character.actor}</p>   {/* Actor */}
    </div>
  );
}

Character.propTypes = {
  character: PropTypes.object.isRequired,
};

export default Character;