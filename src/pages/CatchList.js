import PokemonList from "../components/PokemonList";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { getCatchList, removeFromCathList } from "../services/CatchListService";

export default function CatchList() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = [];
      const response = await getCatchList();
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
            removeMethod={removeFromCathList}
            title="Catch List"
          />
        </Box>
      </Grid>
      <Footer />
    </>
  );
}
