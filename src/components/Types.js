import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

export default function Types({ types }) {
  return (
    <Box
      sx={{
        width: 320,
        display: "flex",
        alignItems: "center",
        flexDirection: "horizontal",
        justifyContent: "space-between",
        opacity: 0.85,
      }}
    >
      <Box sx={{ width: 70, backgroundColor: "transparant" }}></Box>
      <Box
        sx={{
          width: 100,
          backgroundColor: "gold",
          padding: 0.6,
          borderRadius: 2,
          border: "1px solid orange",
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: "scale(1.05)",
          },
          boxShadow: "0px 5px 8px rgba(0, 0, 0, 0.5)",
        }}
      >
        <Typography>{types[0]}</Typography>
      </Box>
      <Box
        sx={{
          width: 100,
          backgroundColor: "gold",
          padding: 0.6,
          borderRadius: 2,
          border: "1px solid orange",
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: "scale(1.05)",
          },
          boxShadow: "0px 5px 8px rgba(0, 0, 0, 0.5)",
        }}
      >
        <Typography>{types[1]}</Typography>
      </Box>
    </Box>
  );
}
