import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import Grid from "@mui/material/Grid";

import Pokemons from "../layouts/Pokemons";
import { useEffect, useState } from "react";
import { getAllPokemons } from "../services/PokemonService";

export default function Home() {
  const [cards, setCards] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    getAllPokemons(searchText, type).then((data) => {
      const newCards = [];
      if (data !== null) {
        for (let i = 0; i < data.length; i++) {
          let pokemonName = data[i].name;
          newCards.push({
            imageUrl: `http://localhost:8080/pokedex/files/stat-${pokemonName}.png`,
            name: pokemonName,
            id: data[i].id,
          });
        }
      }
      setCards(newCards);
    });
  }, [searchText, type]);

  return (
    <Grid>
      <Header />
      <Pokemons cards={cards} setSearchText={setSearchText} setType={setType} />
      <Footer />
    </Grid>
  );
}
