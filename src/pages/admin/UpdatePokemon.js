import UpdatePokemonLayout from "../../layouts/UpdatePokemonLayout";
import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";
import Grid from "@mui/material/Grid";

export default function UpdatePokemon() {
  return (
    <Grid>
      <Header />
      <UpdatePokemonLayout />

      <Footer />
    </Grid>
  );
}
