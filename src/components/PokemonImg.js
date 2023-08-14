import Grid from "@mui/material/Grid";

const PokemonImg = (props) => {
  return (
    <Grid
      sx={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        minHeight: "100vh",
        justifyContent: "center",
      }}
    >
      <img
        src={`http://localhost:8080/pokedex/files/stat-${props.pokemonName}.png`}
        alt="Pokemon Stat"
      />
    </Grid>
  );
};

export default PokemonImg;
