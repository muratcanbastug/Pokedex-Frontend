import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { addToWishList, removeFromWishList } from "../services/WishListService";
import {
  addToCatchList,
  removeFromCathList,
} from "../services/CatchListService";
import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { green } from "@mui/material/colors";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function AddDeleteButtons({
  id,
  addedCatchListCheck,
  addedWishListCheck,
  setAddedWishListCheck,
  setAddedCatchListCheck,
}) {
  const [processCatch, setProcessCatch] = React.useState(false);
  const [processWish, setProcessWish] = React.useState(false);

  const [error, setError] = React.useState("");

  const handleOnWishList = async () => {
    setProcessWish(true);
    const responseStatus = await addToWishList(id);
    if (responseStatus === 200) {
      setAddedWishListCheck(true);
    } else {
      setError("An error occured. Try again.");
    }
    setProcessWish(false);
  };

  const handleOnCatchList = async () => {
    setProcessCatch(true);
    const responseStatus = await addToCatchList(id);
    if (responseStatus === 200) {
      setAddedCatchListCheck(true);
    } else {
      setError("An error occured. Try again.");
    }
    setProcessCatch(false);
  };

  const handleRemoveCatchList = async () => {
    setProcessCatch(true);
    const responseStatus = await removeFromCathList(id);
    if (responseStatus === 200) {
      setAddedCatchListCheck(false);
    } else {
      setError("An error occured. Try again.");
    }
    setProcessCatch(false);
  };

  const handleRemoveWishList = async () => {
    setProcessCatch(true);
    const responseStatus = await removeFromWishList(id);
    if (responseStatus === 200) {
      setAddedWishListCheck(false);
    } else {
      setError("An error occured. Try again.");
    }
    setProcessCatch(false);
  };

  return (
    <Stack direction="row" spacing={2} sx={{ mr: -100, ml: 33, mt: 8 }}>
      <Box sx={{ position: "relative" }}>
        {addedCatchListCheck ? (
          <Button
            variant="contained"
            color="error"
            sx={{ boxShadow: "0px 5px 8px rgba(0, 0, 0, 0.5)" }}
            onClick={handleRemoveCatchList}
          >
            Delete from Catch List
          </Button>
        ) : (
          <Button
            variant="contained"
            color="secondary"
            sx={{ boxShadow: "0px 5px 8px rgba(0, 0, 0, 0.5)" }}
            onClick={handleOnCatchList}
          >
            Add to Catch List
          </Button>
        )}

        {processCatch && (
          <CircularProgress
            size={24}
            sx={{
              color: green[500],
              position: "absolute",
              top: "50%",
              left: "50%",
              marginTop: "-12px",
              marginLeft: "-12px",
            }}
          />
        )}
      </Box>
      <Box sx={{ position: "relative" }}>
        {addedWishListCheck ? (
          <Button
            variant="contained"
            color="error"
            sx={{ boxShadow: "0px 5px 8px rgba(0, 0, 0, 0.5)" }}
            onClick={handleRemoveWishList}
          >
            Remove from Wish List
          </Button>
        ) : (
          <Button
            variant="contained"
            color="secondary"
            sx={{ boxShadow: "0px 5px 8px rgba(0, 0, 0, 0.5)" }}
            onClick={handleOnWishList}
          >
            Add to Wish List
          </Button>
        )}

        {processWish && (
          <CircularProgress
            size={24}
            sx={{
              color: green[500],
              position: "absolute",
              top: "50%",
              left: "50%",
              marginTop: "-12px",
              marginLeft: "-12px",
            }}
          />
        )}
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={!(error === "")}
          onClose={() => setError("")}
          key="errorMessage"
        >
          <Alert onClose={() => setError("")} variant="filled" severity="error">
            {error}
          </Alert>
        </Snackbar>
      </Box>
    </Stack>
  );
}
