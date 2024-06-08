// utils/filterUtils.js
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
