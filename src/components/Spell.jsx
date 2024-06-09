import React from 'react';
import '../assets/css/Spell.css';

const Spell = ({ spell }) => {
  return (
    <div className="spell">
      <h3>{spell.name}</h3>
      <p>{spell.description}</p>
    </div>
  );
}

export default Spell;
