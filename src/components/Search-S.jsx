// components/SearchSpells.jsx
import React from 'react';
import { filterSpells } from '../utils/filterUtils';

const SearchSpells = ({ 
  originalSpells, 
  setSpells, 
  searchTerm, 
  setSearchTerm, 
  setCurrentPage 
}) => {
  
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = filterSpells(value, originalSpells);
    setSpells(filtered);
    setCurrentPage(1);  // Restablecer la página a 1 después de buscar
  };

  const resetSearch = () => {
    setSpells(originalSpells);
    setSearchTerm('');
    setCurrentPage(1);  // manda a la página a 1 después de restablecer la búsqueda
  };

  return (
    <div className="search-container">
        <input
          type="text"
          placeholder="Buscar hechizo..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
      <button className="sort-button" onClick={resetSearch}>
        Reiniciar
      </button>
    </div>
  );
};

export default SearchSpells;
