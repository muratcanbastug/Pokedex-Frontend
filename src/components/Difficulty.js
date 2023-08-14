import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

export default function Difficulty({ difficulty }) {
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
      <Box sx={{ width: 150, backgroundColor: "transparant" }} />
      <Box
        sx={{
          width: 150,
          backgroundColor: "darkblue",
          padding: 0.8,
          borderRadius: 2,
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: "scale(1.05)",
          },
          boxShadow: "0px 5px 8px rgba(0, 0, 0, 0.5)",
        }}
      >
        <Typography color={"white"}>Difficulty: {difficulty}</Typography>
      </Box>
    </Box>
  );
}
