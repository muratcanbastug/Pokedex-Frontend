import TextRating from "../components/Rating";
import Box from "@mui/material/Box";
import Types from "../components/Types";
import Difficulty from "../components/Difficulty";

export default function PokemonProperties(props) {
  return (
    <Box
      sx={{
        height: 350,
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        position: "absolute",
        mt: 20,
        ml: 120,
      }}
    >
      <Types types={props.types} />
      <Difficulty difficulty={props.difficulty} />
      <TextRating value={props.offense} title="OFFENSE" />
      <TextRating value={props.endurance} title="ENDURANCE" />
      <TextRating value={props.mobility} title="MOBILITY" />
      <TextRating value={props.scoring} title="SCORING" />
      <TextRating value={props.support} title="SUPPORT" />
    </Box>
  );
}
