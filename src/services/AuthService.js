import axios from "axios";

export const loginService = async (formData, setError, setErrorMessage) => {
  try {
    let response = await axios.post(
      "http://localhost:8080/pokedex/login",
      formData,
      {
        withCredentials: true,
      }
    );
    return response.status;
  } catch (error) {
    setErrorMessage(
      "Oops! It looks like you entered incorrect login information. Please try again!"
    );
    setError(true);
  }
};

export const signupService = async (formData, setError, setErrorMessage) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/pokedex/users",
      formData
    );
    return response.status;
  } catch (error) {
    setErrorMessage(
      "Oops! It looks like you already have an account with this mail!"
    );
    setError(true);
  }
};

export const logoutService = async () => {
  const response = await axios.post("http://localhost:8080/pokedex/logout", {
    withCredentials: true,
  });
  return response.status;
};

export const UpdatePassword = async (
  setErrorMessage,
  setError,
  oldPassword,
  newPassword
) => {
  try {
    let response = await axios.put(
      "http://localhost:8080/pokedex/users",
      { newPassword: newPassword, oldPassword: oldPassword },
      { withCredentials: true }
    );
    return response.status;
  } catch (error) {
    setErrorMessage("Given password is incorrect. Please try again.");
    setError(true);
  }
};

export const loginCheck = async () => {
  try {
    let response = await axios.get(
      "http://localhost:8080/pokedex/auth-check/login",
      {
        withCredentials: true,
      }
    );
    return response.status;
  } catch (error) {}
};

export const adminCheck = async () => {
  try {
    let response = await axios.get(
      "http://localhost:8080/pokedex/auth-check/admin",
      {
        withCredentials: true,
      }
    );
    return response.status;
  } catch (error) {}
};
