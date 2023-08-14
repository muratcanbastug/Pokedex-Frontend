import axios from "axios";
export const getUserInfo = async (setError, setErrorMessage) => {
  try {
    let response = await axios.get("http://localhost:8080/pokedex/users", {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    setErrorMessage(
      "Oops! It looks like you entered incorrect login information. Please try again!"
    );
    setError(true);
  }
};

export const getAllUsers = async (name) => {
  try {
    let response = await axios.get(
      `http://localhost:8080/pokedex/users/all?name=${name}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {}
};

export const removeUser = async (id) => {
  try {
    let response = await axios.delete(
      `http://localhost:8080/pokedex/users/${id}`,
      {
        withCredentials: true,
      }
    );
    return response.status;
  } catch (error) {}
};

export const updateRole = async (id, newRoles) => {
  try {
    let response = await axios.put(
      `http://localhost:8080/pokedex/users/${id}`,
      {
        newRoles: newRoles,
      },
      {
        withCredentials: true,
      }
    );
    return response.status;
  } catch (error) {}
};
