import SavePokemonLayout from "../../layouts/SavePokemonLayout";
import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";
import Grid from "@mui/material/Grid";

export default function SavePokemon() {
  return (
    <Grid>
      <Header />
      <SavePokemonLayout />

      <Footer />
    </Grid>
  );
}
