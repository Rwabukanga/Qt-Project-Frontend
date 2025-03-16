import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Snackbar, Alert } from '@mui/material';
import axios from 'axios';

const UrlShortenerPage = () => {
    const [longUrl, setLongUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleShortenUrl = async () => {
        try {
            if (!longUrl) {
                setError('Please enter a valid URL');
                return;
            }
            setError('');

            // Make the POST request to the backend
            const response = await axios.post(
                'http://localhost:3033/url/shorten', // Adjust the URL based on your backend setup
                { longUrl }, // Data to send (Long URL)
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`, // If authentication is required
                    }
                }
            );

            // If the response is successful
            if (response.data.shortCode) {
                setShortUrl(`http://short.ly/${response.data.shortCode}`);
                setSuccessMessage('URL shortened successfully!');
                setOpenSnackbar(true);
            }
        } catch (err) {
            console.error(err);
            setError('Error occurred while shortening the URL.');
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(shortUrl).then(() => {
            setSuccessMessage('URL copied to clipboard!');
            setOpenSnackbar(true);
        });
    };

    return (
        <Box sx={{ maxWidth: 600, margin: 'auto', padding: 4, textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom>
                URL Shortener
            </Typography>

            {/* Show error message */}
            {error && <Typography color="error">{error}</Typography>}

            {/* Input field for Long URL */}
            <TextField
                label="Enter long URL"
                variant="outlined"
                fullWidth
                value={longUrl}
                onChange={(e) => setLongUrl(e.target.value)}
                sx={{ mb: 2 }}
            />

            {/* Button to shorten URL */}
            <Button variant="contained" color="primary" onClick={handleShortenUrl}>
                Shorten URL
            </Button>

            {/* Display Short URL */}
            {shortUrl && (
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h6">Shortened URL:</Typography>
                    <Typography variant="body1" sx={{ wordWrap: 'break-word', marginBottom: 2 }}>
                        {shortUrl}
                    </Typography>
                    <Button variant="outlined" onClick={handleCopy}>
                        Copy to Clipboard
                    </Button>
                </Box>
            )}

            {/* Snackbar for success or error messages */}
            <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)}>
                <Alert onClose={() => setOpenSnackbar(false)} severity="success">
                    {successMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default UrlShortenerPage;
