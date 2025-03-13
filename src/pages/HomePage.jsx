import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Typography } from "@mui/material";

const HomePage = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>Welcome to My App</Typography>
      <Button variant="contained" color="primary" component={Link} to="/register" sx={{ mr: 2 }}>
        Register
      </Button>
      <Button variant="outlined" color="secondary" component={Link} to="/login">
        Login
      </Button>
    </Container>
  );
};

export default HomePage;
