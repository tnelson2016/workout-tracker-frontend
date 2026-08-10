import { useState, useEffect } from 'react';
import axios from 'axios';
import BarbellLoader from '../components/BarbellLoader';


export default function Dashboard() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios
      .get('http://localhost:8080/api/workouts', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setWorkouts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log('Failed to fetch workouts', error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
        <h1>Dashboard</h1>
        <BarbellLoader count={workouts.length} dim={false} />

      {loading && <p>Loading...</p>}
      {!loading && workouts.length === 0 && <p>No workouts yet.</p>}
     
        <ul>
        {workouts.map((workout) => (
          <li key={workout.id}>{workout.name}</li>
        ))}
      </ul>
    </div>
  );
}