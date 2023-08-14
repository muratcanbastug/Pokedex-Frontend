import React from "react";
import { Typography, Container } from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";

import Header from "../layouts/Header";
import Footer from "../layouts/Footer";

const NotFound = () => {
  return (
    <>
      <Header />
      <Container
        maxWidth="sm"
        sx={{ textAlign: "center", marginTop: "100px", marginBottom: "110px" }}
      >
        <ErrorOutline sx={{ fontSize: 120, color: "error.main" }} />
        <Typography variant="h4" gutterBottom>
          Page Not Found
        </Typography>
        <Typography variant="body1" paragraph>
          Sorry. Page not found.
        </Typography>
      </Container>
      <Footer />
    </>
  );
};

export default NotFound;
