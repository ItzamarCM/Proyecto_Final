// utilizar el componente Character y obtener los datos de la API de Harry Potter.

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Character from './Character';
import './App.css';

function App() { //useState : permite añadir el estado de React a un componente de función
  const [characters, setCharacters] = useState([]);

  const [originalCharacters, setOriginalCharacters] = useState([]); //Estado original

  const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda

  //busqueda por casas
  const [selectedHouse, setSelectedHouse] = useState('');
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  //A-Z
  const [isSortedAZ, setIsSortedAZ] = useState(false);

// use Effect : indicando a React que el componente tiene que hacer algo después de renderizarse.
  useEffect(() => { //Conexión con la API
    axios.get('https://hp-api.onrender.com/api/characters')
      .then(response => {
        setCharacters(response.data);
        setOriginalCharacters(response.data); // Guardar el orden original
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);



// Filtrar los personajes según el término de búsqueda --------------------------------

const handleSearch = (e) => {
  const value = e.target.value.toLowerCase();
  setSearchTerm(value);

  filterCharacters(value, selectedHouse);
};

const handleFilterByHouse = (house) => {
  setSelectedHouse(house);
  filterCharacters(searchTerm, house);
};

const filterCharacters = (searchTerm, house) => {
  let filtered = originalCharacters;

  if (house) {
    filtered = filtered.filter(character => character.house === house);
  }

  if (searchTerm) {
    filtered = filtered.filter(character => character.name.toLowerCase().includes(searchTerm));
  }

  setCharacters(filtered);
};

const handleSortAZ = () => {
  if (isSortedAZ) {
    setCharacters(originalCharacters);
  } else {
    const sortedCharacters = [...characters].sort((a, b) => a.name.localeCompare(b.name));
    setCharacters(sortedCharacters);
  }
  setIsSortedAZ(!isSortedAZ);
};

const resetFiltersAndSort = () => { //tssss
  setCharacters(originalCharacters);
  setSearchTerm('');
  setSelectedHouse('');
  setIsSortedAZ(false);
};
//--------------------------------------------------------------------------------------

  return ( //Mandar a llamar los personajes dentro de la interfaz
    <div className="App">
      <h1>Harry Potter</h1>
      <h2>Personajes</h2>

      <div className="search-container">
        <button className="filter-button" onClick={() => setShowFilterMenu(!showFilterMenu)}>
          Filtros
        </button>
        {showFilterMenu && (
          <div className="filter-menu">
            <button onClick={() => handleFilterByHouse('Gryffindor')}>Gryffindor</button>
            <button onClick={() => handleFilterByHouse('Slytherin')}>Slytherin</button>
            <button onClick={() => handleFilterByHouse('Hufflepuff')}>Hufflepuff</button>
            <button onClick={() => handleFilterByHouse('Ravenclaw')}>Ravenclaw</button>
            <button onClick={() => resetFiltersAndSort()}>Mostrar todos</button>
          </div>
        )}
        <input 
          type="text" 
          placeholder="Buscar personaje..." 
          value={searchTerm}
          onChange={handleSearch}
        />
        <button className="sort-button" onClick={handleSortAZ}>
          {isSortedAZ ? 'Volver al orden original' : 'Ordenar A-Z'}
        </button>
      </div>
      <div className="characters">
        {/*combinación del nombre del personaje y el índice del personaje en la lista (index) 
          como clave para cada elemento en el componente Character.
          asegurando que cada clave sea única, incluso si varios personajes tienen el mismo nombre*/}
        {characters.map((character, index) => (
          <Character key={`${character.name}-${index}`} character={character} />
        ))}
      </div>
    </div>
  );
}

export default App;