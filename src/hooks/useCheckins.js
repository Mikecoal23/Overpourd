import { useState, useEffect } from 'react';
import axios from 'axios';

export function useCheckins() {
  const [checkins, setCheckins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCheckins();
  }, []);

  const fetchCheckins = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3000/checkins');
      setCheckins(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addCheckin = async (checkin) => {
    try {
      const response = await axios.post('http://localhost:3000/checkins', checkin);
      setCheckins([...checkins, response.data]);
      return response.data;
    } catch (err) {
      setError(err.message);
    }
  };

  return { checkins, loading, error, addCheckin, refetch: fetchCheckins };
}
