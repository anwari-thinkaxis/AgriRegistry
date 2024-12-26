/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { authApi } from '../../../api/api';
import { Button } from '../../../components/ui/button';
import { Label } from '@radix-ui/react-label';
import { Input } from '../../../components/ui/input';
import AuthStore from '../../../utils/stores/AuthStore';

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
                AuthStore.handleSetToken(token);

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
            <Button
                onClick={() => {
                    setEmail("admin@example.com");
                    setPassword("AdminPassword123!");
                }}
            >
                Autofill Admin
            </Button>
            <Button
                onClick={() => {
                    setEmail("farmmanager@example.com");
                    setPassword("FarmManager123!");
                }}
            >
                Autofill Farm Manager
            </Button>
            <form onSubmit={handleSubmit}>
                <div>
                    <Label>Email</Label>
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <Label>Password</Label>
                    <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <Button type="submit">Login</Button>
            </form>
        </div>
    );
};

export default Page;
