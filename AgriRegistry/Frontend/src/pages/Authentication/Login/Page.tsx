/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../../../api/api';

const Page = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await authApi.post('/login', {
                email,
                password,
            });

            // Ensure token is present in the response
            const token = response.data?.token;
            if (token) {
                // Save token to localStorage
                localStorage.setItem('token', token);

                console.log('Token saved successfully:', token);

                // Redirect to a protected route (e.g., Dashboard or Locations)
                navigate('/locations');
            } else {
                throw new Error('Token not found in response');
            }
        } catch (err: any) {
            console.error('Login failed:', err.response?.data || err.message);
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Page;
