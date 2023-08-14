import PokemonList from "../components/PokemonList";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { getWishList, removeFromWishList } from "../services/WishListService";

export default function WishList() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = [];
      const response = await getWishList();
      if (response !== null) {
        for (let i = 0; i < response.length; i++) {
          data.push({
            id: response[i].id,
            name: response[i].name,
            primaryType: response[i].types[0],
            secondaryType: response[i].types[1],
          });
        }
      }
      setRows(data);
    }
    fetchData();
  }, []);
  return (
    <>
      <Header />
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          direction: "column",
          backgroundColor: "lightgray",
          minHeight: "50vh",
        }}
      >
        <Box
          sx={{
            width: "60%",
          }}
        >
          <PokemonList
            rows={rows}
            removeMethod={removeFromWishList}
            title="Wish List"
          />
        </Box>
      </Grid>
      <Footer />
    </>
  );
}
