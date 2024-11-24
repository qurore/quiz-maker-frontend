import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReviewStats from 'components/Review/ReviewStats';

function Review() {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/review-stats');
        setStats(response.data);
      } catch (err) {
        setError('Failed to load review statistics');
        console.error('Error fetching review stats:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-center">Loading statistics...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-red-500 text-center">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Review Dashboard</h1>
      <ReviewStats stats={stats} />
    </div>
  );
}

export default Review; 
