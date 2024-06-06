// utilizar el componente Character y obtener los datos de la API de Harry Potter.

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Character from './components/Character';
import './App.css';
import Banner from './components/Banner';
import Footer from './components/Footer';
import CardCarousel from './components/Carousel'; // Importa el componente Carousel
import Pagination from './components/Pagination'; // Importa el componente Pagination
import Swal from 'sweetalert2'; // Importa SweetAlert2

//TODO ------------------------------------------------------------------------------------------
function App() { //useState : permite añadir el estado de React a un componente de función
  const [characters, setCharacters] = useState([]);
  const [originalCharacters, setOriginalCharacters] = useState([]); //Estado original
  const [searchTerm, setSearchTerm] = useState(localStorage.getItem('searchTerm') || ''); // Estado para el término de búsqueda
 
  //busqueda por casas --------------
  const [selectedHouse, setSelectedHouse] = useState(localStorage.getItem('selectedHouse') || ''); // Búsqueda por casas
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  //A-Z -------------
  const [isSortedAZ, setIsSortedAZ] = useState(JSON.parse(localStorage.getItem('isSortedAZ')) || false); // Orden A-Z
  
  //Paginación
  const [currentPage, setCurrentPage] = useState(JSON.parse(localStorage.getItem('currentPage')) || 1); // Página actual
  const itemsPerPage = 30; // Elementos por página

  //SweetAlert
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de error

//TODO ------------------------------------------------------------------------------------------
//use Effect : indicando a React que el componente tiene que hacer algo después de renderizarse.

  useEffect(() => { //Conexión con la API
    axios.get('https://hp-api.onrender.com/api/characters')
      .then(response => {
        setCharacters(response.data);
        setOriginalCharacters(response.data); // Guardar el orden original
        setLoading(false); // Finalizar la carga
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError('');
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error al cargar los personajes. Por favor intenta más tarde.',
        });
        setLoading(false); // Finalizar la carga
      });
  }, []);

  useEffect(() => {
    // Guardar el estado en localStorage cuando cambie
    localStorage.setItem('searchTerm', searchTerm);
    localStorage.setItem('selectedHouse', selectedHouse);
    localStorage.setItem('isSortedAZ', JSON.stringify(isSortedAZ));
    localStorage.setItem('currentPage', JSON.stringify(currentPage));
  }, [searchTerm, selectedHouse, isSortedAZ, currentPage]);

//TODO ------------------------------------------------------------------------------------------
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
  setCurrentPage(1); // Reiniciar a la primera página cuando se filtra
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

const resetFiltersAndSort = () => {
  setCharacters(originalCharacters);
  setSearchTerm('');
  setSelectedHouse('');
  setIsSortedAZ(false);
  setCurrentPage(1); // Va a la primera página cuando se reinicia
};

//TODO ------------------------------------------------------------------------------------------

// Calcular los personajes a mostrar en la página actual
const indexOfLastCharacter = currentPage * itemsPerPage;
const indexOfFirstCharacter = indexOfLastCharacter - itemsPerPage;
const currentCharacters = characters.slice(indexOfFirstCharacter, indexOfLastCharacter);

  if (loading) {
    return <div className="loading"><strong>Cargando...</strong></div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }
//TODO ------------------------------------------------------------------------------------------

  return ( //Mandar a llamar los personajes dentro de la interfaz
    <div className="App">
      <Banner />

      {/* Agrega el componente CardCarousel */}
      <CardCarousel />

      <h1 className="title">PERSONAJES</h1> {/* Texto añadido con estilo de Harry Potter */}

      {/*-------------------------------------------*/}
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
        <input 
          type="text" 
          placeholder="Buscar personaje..." 
          value={searchTerm}
          onChange={handleSearch}
        />
        <button className="sort-button" onClick={handleSortAZ}>
          {isSortedAZ ? 'Orden original' : 'Ordenar A-Z'}
        </button>
      </div>
      {/*--------------------------------------*/}

      <div className="characters">
        {/*combinación del nombre del personaje y el índice del personaje en la lista (index) 
          como clave para cada elemento en el componente Character.
          asegurando que cada clave sea única, incluso si varios personajes tienen el mismo nombre*/}
        {currentCharacters.map((character, index) => (
          <Character key={`${character.name}-${index}`} character={character} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={characters.length}
        onPageChange={setCurrentPage}
      />

      <Footer />
    </div>
  );
}

export default App;
