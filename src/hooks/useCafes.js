import { useState, useEffect } from 'react';
import axios from 'axios';

export function useCafes() {
  const [cafes, setCafes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCafes();
  }, []);

  const fetchCafes = async () => {
    try {
      setLoading(true);
      setError(null);
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      console.log('Fetching cafes from:', `${apiUrl}/cafes`);
      const response = await axios.get(`${apiUrl}/cafes`, { timeout: 5000 });
      setCafes(response.data || []);
    } catch (err) {
      console.error('Error fetching cafes:', err.message);
      setError(err.message || 'Failed to fetch cafes');
      setCafes([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  const getCafeById = async (id) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const response = await axios.get(`${apiUrl}/cafes/${id}`);
      return response.data;
    } catch (err) {
      setError(err.message);
    }
  };

  return { cafes, loading, error, getCafeById, refetch: fetchCafes };
}
