import React from "react";
import { AppBar, Toolbar, Button, Typography, Container, Box } from "@mui/material";
import { Link , useNavigate } from "react-router-dom";  // Import Link from react-router-dom

const LandingPage = () => {

    const navigate = useNavigate();  // Hook for programmatic navigation

  const handleLogout = () => {
    // Clear any authentication tokens or session data
    localStorage.removeItem('authToken');  // If token is stored in localStorage
    sessionStorage.removeItem('authToken');  // If token is stored in sessionStorage

    // Redirect to login page
    navigate('/login');  // Use navigate instead of history.push
  };
  return (
    <>
      {/* Navbar */}
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold" }}>
            QT Project
          </Typography>
         
          {/* Link to Login page */}
          <Link to="/login" style={{ textDecoration: "none" }}>
            <Button color="inherit">Login</Button>
          </Link>
          <Link to="/register" style={{ textDecoration: "none" }}>
            <Button variant="contained" color="primary" sx={{ ml: 2 }}>
              Sign Up
            </Button>
          </Link>
          <Link to="/shorten" style={{ textDecoration: "none" }}>
            <Button variant="contained" color="primary" sx={{ ml: 2 }}>
              Url Shortener Page
            </Button>
          </Link>
           {/* Logout Button */}
          <Button variant="contained" color="primary" sx={{ ml: 2 }} onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Container maxWidth="md" sx={{ textAlign: "center", mt: 8 }}>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          QT Project
        </Typography>
        <Typography variant="h6" color="textSecondary" gutterBottom>
          A simple and powerful URL shortener 
        </Typography>
        <Link to="/" style={{ textDecoration: "none" }}>
            <Button variant="contained" color="primary" sx={{ ml: 2 }}>
              Get Started
            </Button>
          </Link>
      </Container>

      {/* Footer */}
      <Box sx={{ textAlign: "center", py: 3, mt: 8, backgroundColor: "#f5f5f5" }}>
        <Typography variant="body2">&copy; 2025 Jean de Dieu. All rights reserved.</Typography>
      </Box>
    </>
  );
};

export default LandingPage;
