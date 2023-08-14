import axios from "axios";
export const postImage = async (selectedFile, filename) => {
  try {
    const responseUrl = await axios.post(
      `http://localhost:8080/pokedex/files`,
      {
        file: selectedFile,
        filename: "stat-" + filename + ".png",
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return responseUrl.status;
  } catch (error) {}
};
