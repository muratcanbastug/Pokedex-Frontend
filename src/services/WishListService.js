import axios from "axios";

export const addToWishList = async (id) => {
  try {
    let response = await axios.post(
      `http://localhost:8080/pokedex/wish-lists`,
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

export const removeFromWishList = async (id) => {
  try {
    let response = await axios.delete(
      `http://localhost:8080/pokedex/wish-lists/${id}`,
      {
        withCredentials: true,
      }
    );
    return response.status;
  } catch (error) {}
};

export const getWishList = async () => {
  try {
    let response = await axios.get(`http://localhost:8080/pokedex/wish-lists`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {}
};
