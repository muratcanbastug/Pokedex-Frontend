import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import CircularProgress from "@mui/material/CircularProgress";
import { green } from "@mui/material/colors";

import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";
import { useAuth } from "../../providers/AuthProvider";
import { UpdatePassword } from "../../services/AuthService";

const defaultTheme = createTheme();

export default function UpdatePasswordPage() {
  const { logout } = useAuth();
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (
      data.get("newPassword").length < 4 ||
      data.get("oldPassword").length < 4
    ) {
      setErrorMessage("Please enter a password at least 4 characters long.");
      setError(true);
      return;
    } else if (data.get("newPassword") !== data.get("confirmPassword")) {
      setErrorMessage("Password do not match.");
      setError(true);
      return;
    }
    setIsLoading(true);
    let response = await UpdatePassword(
      setErrorMessage,
      setError,
      data.get("oldPassword"),
      data.get("newPassword")
    );
    if (response === 200) {
      logout();
    }

    setIsLoading(false);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Header />
      <Grid
        container
        component="main"
        sx={{
          position: "relative",
          display: "flex",
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CssBaseline />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
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
              Change Password
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                fullWidth
                required
                id="oldPassword"
                label="Current Password"
                type="password"
                name="oldPassword"
                autoComplete="oldPassword"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="newPassword"
                label="New Password"
                type="password"
                id="newPassword"
                auto
                Complete="newPassword"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="confirmPassword"
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
              </Box>
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
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Footer />
    </ThemeProvider>
  );
}
