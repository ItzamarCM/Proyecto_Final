import axios from 'axios';

export const fetchCharacters = () => {
  return axios.get('https://hp-api.onrender.com/api/characters')
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

export const fetchSpells = () => {
  return axios.get('https://hp-api.onrender.com/api/spells')
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};
