//definir el componente que mostrará los datos de cada personaje.

import React from 'react';
import './Character.css';

function Character({ character }) {
  
// acá se especifica que datos se van a mostrar y en que orden

  return (
    <div className="character">
      <h3>{character.name}</h3>  {/* Nombre */}
      <p>{character.house}</p>   {/* Casa */}

      {character.image && <img src={character.image} alt={character.name} />}

    {/*  <img src={character.image} alt={character.name} /> */}
      <p> <strong>Birth Date:</strong> {character.dateOfBirth}</p>   {/* Año de nacimiento */}
      <p> <strong>Actor:</strong> {character.actor}</p>   {/* Actor */}
    </div>
  );
}

export default Character;
