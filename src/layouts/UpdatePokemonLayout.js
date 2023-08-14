import React, { useState, useEffect } from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Rating,
  Button,
  Container,
  Typography,
  Grid,
  Input,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import CircularProgress from "@mui/material/CircularProgress";
import { green } from "@mui/material/colors";

import { useLocation } from "react-router-dom";
import { updatePokemon, getPokemon } from "../services/PokemonService";
import { useNavigate } from "react-router-dom";
import { postImage } from "../services/ImgService";

const UpdatePokemonLayout = (props) => {
  let navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const id = pathname.split("/")[3];

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [primaryType, setPrimaryType] = useState("");
  const [secondaryType, setSecondaryType] = useState("");
  const [offense, setOffense] = useState(0);
  const [endurance, setEndurance] = useState(0);
  const [mobility, setMobility] = useState(0);
  const [scoring, setScoring] = useState(0);
  const [support, setSupport] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await getPokemon("/pokemons/" + id);
      setName(response.name);
      setDescription(response.description);
      setPrimaryType(response.types[0]);
      setSecondaryType(response.types[1]);
      setDifficulty(response.difficulty);
      setEndurance(response.endurance);
      setMobility(response.mobility);
      setScoring(response.scoring);
      setSupport(response.support);
      setOffense(response.offense);
    }
    fetchData();
  }, [id]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleFormSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    let newPokemonInfo = {
      id: id,
      name: name,
      description: description,
      difficulty: difficulty,
      types: [primaryType, secondaryType],
      offense: offense,
      endurance: endurance,
      mobility: mobility,
      scoring: scoring,
      support: support,
    };
    let responseStatus = await updatePokemon(
      setErrorMessage,
      setError,
      newPokemonInfo
    );

    if (responseStatus === 200) {
      let responseFileStatus = await postImage(selectedFile, name);
      if (responseFileStatus === 200) {
        navigate({ pathname: `/pokemons/${id}` });
      } else {
        setErrorMessage(
          "An error occurred while uploading the Pokemon image. Please try again."
        );
        setError(true);
      }
    }
    setIsLoading(false);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ mt: 4, mb: 6 }}
      >
        Update Pokemon "{name.toUpperCase()}"
      </Typography>
      <form onSubmit={handleFormSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4} sx={{ direction: "column" }}>
            <TextField
              label="Pokemon Name"
              fullWidth
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label="Description"
              fullWidth
              multiline
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4.5}
              sx={{ mt: 3 }}
            />
            <Grid item xs={12} sm={12} md={12}>
              <FormControl fullWidth sx={{ mt: 3 }}>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </FormControl>
            </Grid>
            <Snackbar
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              open={error}
              onClose={() => setError(false)}
              key="errorMessage"
            >
              <Alert
                onClose={() => setError(false)}
                variant="filled"
                severity="error"
              >
                {errorMessage}
              </Alert>
            </Snackbar>
          </Grid>
          <Grid item xs={12} sm={6} md={4} sx={{ direction: "column" }}>
            <FormControl fullWidth>
              <InputLabel>Primary Type</InputLabel>
              <Select
                value={primaryType}
                onChange={(e) => setPrimaryType(e.target.value)}
                required
              >
                <MenuItem value="attacker">Attacker</MenuItem>
                <MenuItem value="speedster">Speedster</MenuItem>
                <MenuItem value="all rounder">All-Rounder</MenuItem>
                <MenuItem value="defender">Defender</MenuItem>
                <MenuItem value="supporter">Supporter</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ mt: 3 }}>
              <InputLabel>Secondary Type</InputLabel>
              <Select
                value={secondaryType}
                onChange={(e) => setSecondaryType(e.target.value)}
                required
              >
                <MenuItem value="attacker">Attacker</MenuItem>
                <MenuItem value="speedster">Speedster</MenuItem>
                <MenuItem value="all rounder">All-Rounder</MenuItem>
                <MenuItem value="defender">Defender</MenuItem>
                <MenuItem value="supporter">Supporter</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ mt: 3 }}>
              <InputLabel>Difficulty</InputLabel>
              <Select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                required
              >
                <MenuItem value="Novice">Novice</MenuItem>
                <MenuItem value="Intermediate">Intermediate</MenuItem>
                <MenuItem value="Expert">Expert</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={4} sx={{ direction: "column" }}>
            <Typography gutterBottom>Offense</Typography>
            <Rating
              name="offense"
              value={offense}
              precision={0.5}
              size="large"
              onChange={(e, newValue) => setOffense(newValue)}
            />

            <Typography gutterBottom>Endurance</Typography>
            <Rating
              name="endurance"
              value={endurance}
              precision={0.5}
              size="large"
              onChange={(e, newValue) => setEndurance(newValue)}
            />
            <Typography gutterBottom>Mobility</Typography>
            <Rating
              name="mobility"
              value={mobility}
              precision={0.5}
              size="large"
              onChange={(e, newValue) => setMobility(newValue)}
            />
            <Typography gutterBottom>Scoring</Typography>
            <Rating
              name="scoring"
              value={scoring}
              precision={0.5}
              size="large"
              onChange={(e, newValue) => setScoring(newValue)}
            />
            <Typography gutterBottom>Support</Typography>
            <Rating
              name="support"
              value={support}
              precision={0.5}
              size="large"
              onChange={(e, newValue) => setSupport(newValue)}
            />
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          sm={4}
          md={12}
          sx={{ mt: 3, display: "flex", justifyContent: "center" }}
        >
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
          {isLoading && (
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
        </Grid>
      </form>
    </Container>
  );
};

export default UpdatePokemonLayout;
