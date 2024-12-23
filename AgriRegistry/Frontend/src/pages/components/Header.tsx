import React from 'react';
import { jwtDecode } from 'jwt-decode';

// Type for the decoded JWT token
interface DecodedToken {
    sub: string;  // User ID
    email: string;  // User Email
    role: string;  // User Role (assuming role is included in the token)
}

const Header: React.FC = () => {
    const token = localStorage.getItem('token');

    let decodedToken: DecodedToken | null = null;
    if (token) {
        try {
            // Decoding the token using jwt_decode directly
            decodedToken = jwtDecode<DecodedToken>(token); // Type the result explicitly
        } catch (error) {
            console.error('Token decode error:', error);
        }
    }

    return (
        <header>
            <nav>
                <ul>
                    <li>
                        {decodedToken ? (
                            <span>
                                Logged in as {decodedToken.email} ({decodedToken.role})
                            </span>
                        ) : (
                            <span>Not logged in</span>
                        )}
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
