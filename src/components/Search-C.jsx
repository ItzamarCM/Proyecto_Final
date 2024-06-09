// components/Search-C.jsx
import React, { useState } from 'react';
import { filterCharacters } from '../utils/filterUtils';

const Search = ({
  originalCharacters,
  setCharacters,
  selectedHouse,
  setSelectedHouse,
  searchTerm,
  setSearchTerm,
  isSortedAZ,
  setIsSortedAZ,
  setCurrentPage
}) => {
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = filterCharacters(value, selectedHouse, originalCharacters);
    setCharacters(filtered);
    setCurrentPage(1);  // Reset page to 1 after searching
  };

  const handleFilterByHouse = (house) => {
    setSelectedHouse(house);
    const filtered = filterCharacters(searchTerm, house, originalCharacters);
    setCharacters(filtered);
    setCurrentPage(1);  // Reset page to 1 after filtering
  };

  const handleSortAZ = () => {
    if (isSortedAZ) {
      setCharacters(originalCharacters);
    } else {
      const sortedCharacters = [...originalCharacters].sort((a, b) => a.name.localeCompare(b.name));
      setCharacters(sortedCharacters);
    }
    setIsSortedAZ(!isSortedAZ);
  };

  const resetFiltersAndSort = () => {
    setCharacters(originalCharacters);
    setSearchTerm('');
    setSelectedHouse('');
    setIsSortedAZ(false);
    setCurrentPage(1);  // Reset page to 1 after resetting filters
  };

  return (
    <div className="search-container">
      <div className="dropdown">
        <button className="btn btn-secondary dropdown-toggle" type="button" id="filterMenuButton" aria-haspopup="true" aria-expanded="false" onClick={() => setShowFilterMenu(!showFilterMenu)}>
          Filtros
        </button>
        <div className={`dropdown-menu ${showFilterMenu ? 'show' : ''}`} aria-labelledby="filterMenuButton">
          <button className="dropdown-item gryffindor-item" onClick={() => handleFilterByHouse('Gryffindor')}>Gryffindor</button>
          <button className="dropdown-item slytherin-item" onClick={() => handleFilterByHouse('Slytherin')}>Slytherin</button>
          <button className="dropdown-item hufflepuff-item" onClick={() => handleFilterByHouse('Hufflepuff')}>Hufflepuff</button>
          <button className="dropdown-item ravenclaw-item" onClick={() => handleFilterByHouse('Ravenclaw')}>Ravenclaw</button>
          <button className="dropdown-item reset-item" onClick={() => resetFiltersAndSort()}>Mostrar todos</button>
        </div>
      </div>
      <div className="search-input-container">
        <i className="bi bi-feather search-icon"></i>
        <input
          type="text"
          placeholder="Buscar personaje..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
      </div>
      <button className="sort-button" onClick={handleSortAZ}>
        {isSortedAZ ? 'Orden original' : 'Ordenar A-Z'}
      </button>
    </div>
  );
};

export default Search;
