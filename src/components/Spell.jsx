import React from 'react';
import './css/Spell.css';

const Spell = ({ spell }) => {
  return (
    <div className="spell-card">
      <h2>{spell.name}</h2>
      <p>{spell.description}</p>
    </div>
  );
};

export default Spell;
