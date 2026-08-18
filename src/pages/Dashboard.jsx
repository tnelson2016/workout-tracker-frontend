import { useState, useEffect } from 'react';
import axios from 'axios';
import BarbellLoader from '../components/BarbellLoader';
import './Dashboard.css';

export default function Dashboard() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newWorkoutName, setNewWorkoutName] = useState('');
  const [username] = useState(localStorage.getItem('username'));

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
    
    const handleCreateWorkout = async (e) => {
        e.preventDefault();
        if (!newWorkoutName.trim()) return;
        const token = localStorage.getItem('token');

        try {
            const response = await axios.post(
                'http://localhost:8080/api/workouts',
                { name: newWorkoutName },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setWorkouts([...workouts, response.data]);
            setNewWorkoutName('');
        } catch (error) {
            console.log('Failed to create workout', error);
        }
    };
    

  return (
    <div className="dash-page">
      <header className="dash-header">
        <h1 className="display">Dashboard</h1>
        <p className="dash-welcome">Welcome, {username}</p>        <BarbellLoader count={workouts.length} dim={false} />
        {loading && <p className="dash-status">Loading...</p>}
        {!loading && workouts.length === 0 && (
          <p className="dash-status">No workouts yet.</p>
        )}
          </header>
          
        <form onSubmit={handleCreateWorkout} className="dash-form">              <input
                  type="text"
                  placeholder="New workout name"
                  value={newWorkoutName}
                  onChange={(e) => setNewWorkoutName(e.target.value)}
                  required
              />
              <button type= "submit">Add Workout</button>
          </form>

      <ul className="dash-log-list">
        {workouts.map((workout) => (
          <li key={workout.id} className="dash-log-item">
            {workout.name}
          </li>
        ))}
      </ul>
    </div>
  );
}