import React, { useEffect, useState } from "react";
import DescriptionCard from "../components/DescriptionCard";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import PokemonProperties from "../layouts/PokemonProperties";
import PokemonImg from "../components/PokemonImg";
import backgroundImg from "../assets/pokemon_detail_floor.jpg";
import AddDeleteButtons from "../components/AddDeletButtons";
import { useLocation } from "react-router-dom";
import { getPokemon } from "../services/PokemonService";

import { getCatchList } from "../services/CatchListService";
import { getWishList } from "../services/WishListService";

export default function PokemonDetail() {
  const location = useLocation();
  const { pathname } = location;
  const [addedCatchListCheck, setAddedCatchListCheck] = useState(false);
  const [addedWishListCheck, setAddedWishListCheck] = useState(false);

  const [pokemonInfo, setPokemonInfo] = useState({
    name: "",
    description: "",
    types: ["ATTACKER", "SUPPORT"],
    difficulty: "Expert",
    endurance: 0,
    mobility: 0,
    scoring: 0,
    support: 0,
    offense: 0,
    id: 0,
  });

  useEffect(() => {
    async function fetchData() {
      const response = await getPokemon(pathname);
      setPokemonInfo({
        name: response.name,
        description: response.description,
        types: response.types,
        difficulty: response.difficulty,
        endurance: response.endurance,
        mobility: response.mobility,
        scoring: response.scoring,
        support: response.support,
        offense: response.offense,
        id: response.id,
      });
      const responseCatchList = await getCatchList();
      if (responseCatchList !== null) {
        for (let i = 0; i < responseCatchList.length; i++) {
          if (responseCatchList[i].id === response.id) {
            setAddedCatchListCheck(true);
            break;
          }
        }
      }
      const responseWishList = await getWishList();
      if (responseWishList !== null) {
        for (let i = 0; i < responseWishList.length; i++) {
          if (responseWishList[i].id === response.id) {
            setAddedWishListCheck(true);
            break;
          }
        }
      }
    }
    fetchData();
  }, [pathname]);

  return (
    <Grid
      sx={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
      }}
    >
      <Header />
      <Grid
        sx={{
          display: "flex",
          flexDirection: "horizontal",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <DescriptionCard
            title={pokemonInfo.name.toUpperCase()}
            content={pokemonInfo.description}
          />
          <AddDeleteButtons
            id={pokemonInfo.id}
            addedCatchListCheck={addedCatchListCheck}
            addedWishListCheck={addedWishListCheck}
            setAddedCatchListCheck={setAddedCatchListCheck}
            setAddedWishListCheck={setAddedWishListCheck}
          />
        </Box>
        <PokemonImg pokemonName={pokemonInfo.name} />
        <PokemonProperties
          types={pokemonInfo.types}
          difficulty={pokemonInfo.difficulty}
          endurance={pokemonInfo.endurance}
          mobility={pokemonInfo.mobility}
          scoring={pokemonInfo.scoring}
          support={pokemonInfo.support}
          offense={pokemonInfo.offense}
        />
      </Grid>
      <Footer />
    </Grid>
  );
}
