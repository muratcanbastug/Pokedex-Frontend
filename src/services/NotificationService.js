import axios from "axios";

export const sendNotification = async (id, name) => {
  try {
    let response = await axios.post(
      `http://localhost:8080/pokedex/send`,
      {
        message: name,
        pokemonId: id,
      },
      {
        withCredentials: true,
      }
    );
    return response.status;
  } catch (error) {}
};
