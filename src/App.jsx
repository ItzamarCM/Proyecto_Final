// utilizar el componente Character y obtener los datos de la API de Harry Potter.
import React, { useState, useEffect } from 'react';
import { fetchCharacters, fetchSpells } from './api/hpApi';
import Character from './components/Character';
import Spell from './components/Spell';
import './App.css';
import Banner from './components/Banner';
import Footer from './components/Footer';
import CardCarousel from './components/Carousel'; // Importa el componente Carousel
import Pagination from './components/Pagination'; // Importa el componente Pagination
import Swal from 'sweetalert2'; // Importa SweetAlert2
import Search from './components/Search-C';
import SearchSpells from './components/Search-S';
import Scroll from './components/Scroll';
import Title from './components/Title';

//TODO ------------------------------------------------------------------------------------------
function App() { //useState : permite añadir el estado de React a un componente de función
  const [characters, setCharacters] = useState([]);
  const [originalCharacters, setOriginalCharacters] = useState([]); //Estado original
  const [searchTerm, setSearchTerm] = useState(localStorage.getItem('searchTerm') || ''); // Estado para el término de búsqueda
  
  //busqueda por casas --------------
  const [selectedHouse, setSelectedHouse] = useState(localStorage.getItem('selectedHouse') || '');
  
  //A-Z -------------
  const [isSortedAZ, setIsSortedAZ] = useState(JSON.parse(localStorage.getItem('isSortedAZ')) || false);
  
  //Paginación
  const [currentPage, setCurrentPage] = useState(JSON.parse(localStorage.getItem('currentPage')) || 1); // Página actual
  const itemsPerPage = 30; // Elementos por página

  //SweetAlert
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de error

  // Estado para la vista actual (personajes o hechizos)
  const [view, setView] = useState('characters'); 

  // Estado para los hechizos
  const [spells, setSpells] = useState([]);  
  const [originalSpells, setOriginalSpells] = useState([]);
  const [searchTermSpells, setSearchTermSpells] = useState(localStorage.getItem('searchTermSpells') || '');

  //TODO ------------------------------------------------------------------------------------------
  //use Effect : indicando a React que el componente tiene que hacer algo después de renderizarse.

  useEffect(() => {
    fetchCharacters()
      .then(data => {
        setCharacters(data);
        setOriginalCharacters(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError('');
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error al cargar los personajes. Por favor intenta más tarde.',
        });
        setLoading(false);
      });
  }, []);  

  const handleFetchSpells = () => {
    setLoading(true);
    fetchSpells()
      .then(data => {
        setSpells(data);
        setOriginalSpells(data);
        setLoading(false);
        setView('spells');
      })
      .catch(error => {
        console.error('Error fetching spells:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error al cargar los hechizos. Por favor intenta más tarde.',
        });
        setLoading(false);
      });
  };
  
//TODO LocalStorage ------------------------------------------------------------------------------------------

  useEffect(() => {
    // Guardar el estado en localStorage cuando cambie
    localStorage.setItem('searchTerm', searchTerm);
    localStorage.setItem('selectedHouse', selectedHouse);
    localStorage.setItem('isSortedAZ', JSON.stringify(isSortedAZ));
    localStorage.setItem('currentPage', JSON.stringify(currentPage));
    localStorage.setItem('searchTermSpells', searchTermSpells);
  }, [searchTerm, selectedHouse, isSortedAZ, currentPage, searchTermSpells]);

//TODO ------------------------------------------------------------------------------------------
// Calcular los personajes a mostrar en la página actual
const indexOfLastCharacter = currentPage * itemsPerPage;
const indexOfFirstCharacter = indexOfLastCharacter - itemsPerPage;
const currentCharacters = characters.slice(indexOfFirstCharacter, indexOfLastCharacter);
const currentSpells = spells.slice(indexOfFirstCharacter, indexOfLastCharacter);

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
    <div className="body">
      {/* Agrega el componente CardCarousel */}
      <CardCarousel />

      <Title selectedHouse={selectedHouse} setView={setView} handleFetchSpells={handleFetchSpells} />
      
{/* PERSONAJES ------------------------------------------------------------------- */}
      
      {view === 'characters' && (
        <>
      <Search 
            originalCharacters={originalCharacters} 
            setCharacters={setCharacters} 
            selectedHouse={selectedHouse} 
            setSelectedHouse={setSelectedHouse} 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm} 
            isSortedAZ={isSortedAZ} 
            setIsSortedAZ={setIsSortedAZ}
            setCurrentPage={setCurrentPage}
          />
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
  </>
      )}

{/* HECHIZOS ---------------------------------------------- */}

      {view === 'spells' && (
        <>
          <SearchSpells 
            originalSpells={originalSpells} 
            setSpells={setSpells} 
            searchTerm={searchTermSpells} 
            setSearchTerm={setSearchTermSpells} 
            setCurrentPage={setCurrentPage}
          />

          {/*--------------------------------------*/}

          <div className="spells">
            {currentSpells.map((spell, index) => (
              <Spell key={`${spell.name}-${index}`} spell={spell} />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            totalItems={spells.length}
            onPageChange={setCurrentPage}
          />
        </>
      )}
      <Scroll />
      </div>      
      <Footer />
    </div>
  );
}

export default App;