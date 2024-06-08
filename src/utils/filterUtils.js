// utils/filterUtils.js

// FILTRAR PERSONAJES ---------------------------
export const filterCharacters = (searchTerm, selectedHouse, originalCharacters) => {
  let filteredCharacters = originalCharacters;

  if (selectedHouse) {
    filteredCharacters = filteredCharacters.filter(character =>
      character.house && character.house.toLowerCase() === selectedHouse.toLowerCase()
    );
  }

  if (searchTerm) {
    filteredCharacters = filteredCharacters.filter(character =>
      character.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  return filteredCharacters;
};

// FILTRAR HECHIZOS --------------------------------

export const filterSpells = (searchTerm, originalSpells) => {
  if (!searchTerm) {
    return originalSpells;
  }
  
  return originalSpells.filter(spell =>
    spell.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
};