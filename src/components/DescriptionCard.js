import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const DescriptionCard = (props) => {
  return (
    <Card
      sx={{
        width: 400,
        height: 200,
        ml: 30,
        mt: 20,
        backgroundColor: "black",
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30,
        transition: "transform 0.3s ease",
        "&:hover": {
          transform: "scale(1.05)",
        },
        border: "4px solid lightblue",
        opacity: 0.75,
        mr: -100,
        boxShadow: "0px 5px 8px rgba(0, 0, 0, 0.5)",
      }}
    >
      <CardContent
        sx={{
          paddingTop: "12px",
          paddingBottom: "5px",
          backgroundColor: "darkorange",
        }}
      >
        <Typography
          sx={{
            color: "black",
            textAlign: "center",
          }}
          variant="h5"
        >
          {props.title}
        </Typography>
      </CardContent>
      <CardContent
        sx={{
          paddingTop: "12px",
          paddingBottom: "5px",
        }}
      >
        <Typography
          sx={{
            color: "white",
            textAlign: "center",
          }}
          variant="h8"
        >
          {props.content}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DescriptionCard;
