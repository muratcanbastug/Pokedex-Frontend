import axios from "axios";
export const getAllPokemons = async (name, type) => {
  try {
    let response = await axios.get(
      `http://localhost:8080/pokedex/pokemons?name=${name}&type=${type}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {}
};

export const getPokemon = async (pathname) => {
  try {
    let response = await axios.get(`http://localhost:8080/pokedex${pathname}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {}
};

export const removePokemon = async (id) => {
  try {
    let response = await axios.delete(
      `http://localhost:8080/pokedex/pokemons/${id}`,
      {
        withCredentials: true,
      }
    );
    return response.status;
  } catch (error) {}
};

export const updatePokemon = async (
  setErrorMessage,
  setError,
  newPokemonInfo
) => {
  try {
    let response = await axios.put(
      `http://localhost:8080/pokedex/pokemons/${newPokemonInfo.id}`,
      newPokemonInfo,
      {
        withCredentials: true,
      }
    );
    return response.status;
  } catch (error) {
    setErrorMessage("Given pokemon name already exist.");
    setError(true);
  }
};

export const savePokemon = async (pokemon, setErrorMessage, setError) => {
  try {
    let response = await axios.post(
      "http://localhost:8080/pokedex/pokemons",
      pokemon,
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    setErrorMessage("Given pokemon name exist.");
    setError(true);
  }
};
