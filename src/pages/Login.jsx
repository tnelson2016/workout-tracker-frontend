import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BarbellLoader from '../components/BarbellLoader';
import axios from 'axios';


export default function Login() {
    
    //const [count, setCount] = useState(0);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', {
                username: username,
                password: password,
            });

            localStorage.setItem('token', response.data.token);
            navigate('/dashboard');
        } catch (error) {
            setError('Username or password is wrong.Try again');
        }
    };
    
    
    return (
        // <div>
        //     <p>Count: {count}</p>
        //     <button onClick={() => setCount(count + 1)}>Add one</button>
        // </div>
    
        <div>
              <BarbellLoader count={4} dim={true} />

            <form onSubmit= {handleLogin}>
                
                <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />

                <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                 />
                
                {error && <p>{error}</p>}

                <button>Log in</button>
           
            </form>
        </div>
    );
    
    
}