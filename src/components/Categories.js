import React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const ToggleButtonStyles = {
  color: "black",
  backgroundColor: "gold",
  border: "1px solid orange",
  "&:hover": {
    backgroundColor: "orange",
  },
  "&:active": {
    backgroundColor: "#f44336",
  },
  "&.Mui-selected": {
    color: "white",
    backgroundColor: "#f44336",
    border: "1px solid orange",
    "&:hover": {
      border: "1px solid orange",
      backgroundColor: "#e65100",
    },
    "&:active": {
      backgroundColor: "#e65100",
    },
  },
};

const buttons = [
  <ToggleButton key={"ALL TYPES"} value={"ALL TYPES"} sx={ToggleButtonStyles}>
    ALL TYPES
  </ToggleButton>,
  <ToggleButton key={"ATTACKER"} value={"ATTACKER"} sx={ToggleButtonStyles}>
    ATTACKER
  </ToggleButton>,
  <ToggleButton key={"SPEEDSTER"} value={"SPEEDSTER"} sx={ToggleButtonStyles}>
    SPEEDSTER
  </ToggleButton>,
  <ToggleButton
    key={"ALL ROUNDER"}
    value={"ALL ROUNDER"}
    sx={ToggleButtonStyles}
  >
    ALL-ROUNDER
  </ToggleButton>,
  <ToggleButton key={"DEFENDER"} value={"DEFENDER"} sx={ToggleButtonStyles}>
    DEFENDER
  </ToggleButton>,
  <ToggleButton key={"SUPPORTER"} value={"SUPPORTER"} sx={ToggleButtonStyles}>
    SUPPORTER
  </ToggleButton>,
];

const Categories = ({ setType }) => {
  const [alignment, setAlignment] = React.useState("ALL TYPES");

  const handleChange = (event, newAlignment) => {
    if (newAlignment === null) {
      setAlignment("ALL TYPES");
      setType("ALL TYPES");
    } else {
      setAlignment(newAlignment);
      setType(newAlignment);
    }
  };

  return (
    <ToggleButtonGroup
      orientation="horizontal"
      aria-label="horizontal outlined button group"
      value={alignment}
      exclusive
      onChange={handleChange}
      sx={{
        mt: 5,
        gap: 2,
      }}
    >
      {buttons}
    </ToggleButtonGroup>
  );
};

export default Categories;
