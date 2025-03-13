/* import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Check if user is authenticated
  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/login");
  }

  return (
    <div>
      <h2>Welcome to Dashboard</h2>
    </div>
  );
};

export default Dashboard;
 */
// Dashboard.js
import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, TextField, Box, Card, CardContent, Grid } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [shortenedUrls, setShortenedUrls] = useState([]);
  const [newUrl, setNewUrl] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');  // Assume the token is stored in localStorage

  // Check if the user is authenticated, if not, redirect to login
  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      fetchShortenedUrls();
    }
  }, [token, navigate]);

  // Fetch the list of shortened URLs from the server
  const fetchShortenedUrls = async () => {
    try {
      const response = await axios.get('/url/shorten', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setShortenedUrls(response.data.urls);
    } catch (err) {
      console.error(err);
      
    }
  };

  // Handle URL shortening
  const handleCreateUrl = async () => {
    try {
      if (!newUrl) {
        
        return;
      }
      const response = await axios.post(
        '/url/shorten',
        { url: newUrl },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setShortenedUrls([...shortenedUrls, response.data.url]);
      setNewUrl('');
      setError('');
    } catch (err) {
      console.error(err);
      
    }
  };

  // Handle deleting a shortened URL
  const handleDeleteUrl = async (id) => {
    try {
      await axios.delete(`/url/shorten/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setShortenedUrls(shortenedUrls.filter((url) => url.id !== id));
    } catch (err) {
      console.error(err);
      
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      {/* Create New Shortened URL */}
      <Box sx={{ mb: 3 }}>
        <TextField
          label="Enter URL to shorten"
          variant="outlined"
          fullWidth
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" color="primary" onClick={handleCreateUrl}>
          Shorten URL
        </Button>
      </Box>

      {/* Error Message */}
      {error && <Typography color="error">{error}</Typography>}

      {/* Display Shortened URLs */}
      <Grid container spacing={3}>
        {shortenedUrls.length === 0 ? (
          <Typography variant="body1"></Typography>
        ) : (
          shortenedUrls.map((url) => (
            <Grid item xs={12} md={4} key={url.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" component="div">
                    {url.shortenedUrl}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" paragraph>
                    Original URL: {url.originalUrl}
                  </Typography>
                  <Button variant="outlined" color="error" onClick={() => handleDeleteUrl(url.id)}>
                    Delete
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default Dashboard;
