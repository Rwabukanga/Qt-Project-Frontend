import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UrlAnalytics = ({ shortCode }) => {
  const [analytics, setAnalytics] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch URL analytics
    axios.get(`http://localhost:3033/url/${shortCode}`)
      .then(response => {
        setAnalytics(response.data.Object);
      })
      .catch(err => {
        setError('Failed to fetch URL analytics');
      });
  }, [shortCode]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!analytics) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3>URL Analytics for {analytics.shortCode}</h3>
      <p><strong>Long URL:</strong> {analytics.longUrl}</p>
      <p><strong>Click Count:</strong> {analytics.clicks}</p>
    </div>
  );
};

export default UrlAnalytics;
