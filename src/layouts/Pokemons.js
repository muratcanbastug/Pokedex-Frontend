import React from "react";
import PokemonCard from "../components/PokemonCard";
import Grid from "@mui/material/Grid";

import CategoryAndSearch from "./CategoryAndSearch";
const Pokemons = ({ cards, setSearchText, setType }) => {
  return (
    <>
      <CategoryAndSearch setSearchText={setSearchText} setType={setType} />
      <Grid
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 2,
          ml: 15,
          mr: 15,
          mt: 10,
          mb: 10,
        }}
      >
        {cards.map((card) => (
          <PokemonCard
            key={card.id}
            id={card.id}
            imageUrl={card.imageUrl}
            name={card.name}
          />
        ))}
      </Grid>
    </>
  );
};

export default Pokemons;
