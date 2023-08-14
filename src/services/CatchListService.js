import axios from "axios";
export const addToCatchList = async (id) => {
  try {
    let response = await axios.post(
      `http://localhost:8080/pokedex/catch-lists`,
      {
        pokemonId: id,
      },
      {
        withCredentials: true,
      }
    );
    return response.status;
  } catch (error) {}
};

export const getCatchList = async () => {
  try {
    let response = await axios.get(
      `http://localhost:8080/pokedex/catch-lists`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {}
};

export const removeFromCathList = async (id) => {
  try {
    let response = await axios.delete(
      `http://localhost:8080/pokedex/catch-lists/${id}`,
      {
        withCredentials: true,
      }
    );
    return response.status;
  } catch (error) {}
};
