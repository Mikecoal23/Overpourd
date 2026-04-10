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
      const response = await axios.get('http://localhost:3000/cafes');
      setCafes(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getCafeById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/cafes/${id}`);
      return response.data;
    } catch (err) {
      setError(err.message);
    }
  };

  return { cafes, loading, error, getCafeById, refetch: fetchCafes };
}
