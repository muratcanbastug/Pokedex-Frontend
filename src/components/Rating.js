import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import { Typography } from "@mui/material";

export default function TextRating(props) {
  const value = props.value;
  const title = props.title;
  return (
    <Box
      sx={{
        width: 320,
        padding: 0.2,
        display: "flex",
        alignItems: "center",
        backgroundColor: "white",
        flexDirection: "horizontal",
        justifyContent: "space-between",
        borderRadius: 1,
        opacity: 0.85,
        transition: "transform 0.2s ease",
        "&:hover": {
          transform: "scale(1.05)",
        },
        boxShadow: "0px 6px 8px rgba(0, 0, 0, 0.5)",
      }}
    >
      <Typography variant="h6" sx={{ ml: 3 }}>
        {title}
      </Typography>
      <Rating
        sx={{ mr: 3 }}
        value={value}
        readOnly
        precision={0.5}
        emptyIcon={<StarIcon style={{ opacity: 0.5 }} fontSize="inherit" />}
      />
    </Box>
  );
}
