// filterUtils.js
export const filterCharacters = (searchTerm, house, originalCharacters, setCharacters) => {
    let filtered = originalCharacters;
  
    if (house) {
      filtered = filtered.filter(character => character.house === house);
    }
  
    if (searchTerm) {
      filtered = filtered.filter(character => character.name.toLowerCase().includes(searchTerm));
    }
  
    setCharacters(filtered);
  };
  