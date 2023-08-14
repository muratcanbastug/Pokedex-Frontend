import PokemonList from "../../components/PokemonList";
import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import { getAllPokemons, removePokemon } from "../../services/PokemonService";
import { useEffect, useState } from "react";

export default function Pokemons() {
  const [pokemons, setPokemons] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    getAllPokemons(searchText, "ALL TYPES").then((data) => {
      const newPokemons = [];
      if (data !== null) {
        for (let i = 0; i < data.length; i++) {
          newPokemons.push({
            primaryType: data[i].types[0],
            secondaryType: data[i].types[1],
            name: data[i].name,
            id: data[i].id,
          });
        }
      }
      setPokemons(newPokemons);
    });
  }, [searchText]);

  return (
    <>
      <Header />
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          direction: "column",
          backgroundColor: "lightgray",
        }}
      >
        <Box
          sx={{
            width: "60%",
          }}
        >
          <PokemonList
            rows={pokemons}
            setSearchText={setSearchText}
            title="Pokemons"
            removeMethod={removePokemon}
          />
        </Box>
      </Grid>
      <Footer />
    </>
  );
}
