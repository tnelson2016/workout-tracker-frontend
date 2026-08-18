import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import BarbellLoader from '../components/BarbellLoader';
import axios from 'axios';
import './Login.css';


export default function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/api/auth/register', {
                username: username,
                email: email,
                password: password,
            });

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('username', username);

            navigate('/dashboard');
        } catch (err) {
            if (err.response && err.response.data && err.response.data.error) {
                setError(err.response.data.error);
            } else {
                setError('Registration failed. Try again.');
            }
        }
    };

       return (
        <div className="login-page">
               <div className="login-header">
                <h1>Create Account</h1>
                <BarbellLoader count={4} dim={true} />
            </div>

            <form onSubmit={handleRegister} className="login-form">
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {error && <p className="login-error">{error}</p>}

                <button type="submit">Sign Up</button>
            </form>

            <p style={{ textAlign: 'center', marginTop: '16px' }}>
                Already have an account? <Link to="/login">Log in</Link>
            </p>
        </div>
    );
}
            


