import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { signupService } from "../../services/AuthService";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import validateEmail from "../../utils/EmailValidation";
import CircularProgress from "@mui/material/CircularProgress";
import { green } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

export default function Signup() {
  let navigate = useNavigate();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (!validateEmail(data.get("email"))) {
      setErrorMessage("Please enter a valid email.");
      setError(true);
      return;
    }
    if (data.get("password").length < 4) {
      setErrorMessage("Please enter a password at least 4 characters long.");
      setError(true);
      return;
    }

    if (data.get("password") !== data.get("confirmPassword")) {
      setErrorMessage("Password do not match.");
      setError(true);
      return;
    }
    setIsLoading(true);

    const formData = {
      name: data.get("email"),
      password: data.get("password"),
    };
    const responseStatus = await signupService(
      formData,
      setError,
      setErrorMessage
    );
    setIsLoading(false);
    if (responseStatus === 200) {
      navigate({ pathname: "/login" });
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid
        container
        component="main"
        sx={{
          position: "relative",
          display: "flex",
          height: "100vh",
        }}
      >
        <CssBaseline />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          sx={{
            backgroundColor: "rgba(139, 0, 139, 0.2)",
          }}
        >
          <Box
            sx={{
              my: 16,
              mx: 12,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="confirm-password"
              />
              <Box sx={{ position: "relative" }}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={isLoading}
                  sx={{
                    mt: 3,
                    mb: 2,
                  }}
                >
                  Sign Up
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
              </Box>

              <Grid container>
                <Grid item>
                  <Link href="login" variant="body2">
                    {"Already have an account? Sign In"}
                  </Link>
                </Grid>
              </Grid>
              <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
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
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            display: "flex",
            backgroundImage: "url(assets/images/auth_background.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </Grid>
    </ThemeProvider>
  );
}
