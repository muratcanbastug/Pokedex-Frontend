import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

const PokemonCard = ({ id, imageUrl, name }) => {
  let navigate = useNavigate();
  const handleClick = () => {
    navigate({ pathname: `/pokemons/${id}` });
  };
  return (
    <Card
      sx={{
        width: 220,
        height: 300,
        backgroundColor: "black",
        borderRadius: 4,
        transition: "transform 0.3s ease",
        "&:hover": {
          transform: "scale(1.05)",
        },
      }}
      onClick={handleClick}
    >
      <CardMedia
        sx={{
          height: 250,
          borderRadius: 4,
          border: "4px solid black",
          backgroundColor: "darkgray",
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: "scale(1.06)",
          },
        }}
        image={imageUrl}
        title={name}
      />
      <CardContent
        sx={{
          paddingTop: "6px",
          paddingBottom: "5px",
        }}
      >
        <Typography
          sx={{
            color: "white",
            textAlign: "center",
          }}
          variant="h6"
        >
          {name}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PokemonCard;
