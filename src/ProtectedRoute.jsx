import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function ProtectedRoute({ children }) {
    const token = localStorage.getItem('adminToken');
    const [isValid, setIsValid] = useState(null);

    // 1. CRITICAL: If there is absolutely no token in localStorage,
    // block the route INSTANTLY. Do not show "Loading...", do not wait for useEffect.
    if (!token) {
        return <Navigate to="/" replace />;
    }

    useEffect(() => {
        // If a token exists, verify it with the backend database
        axios.get('http://localhost:5000/admin/me', {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(() => {
            setIsValid(true);
        })
        .catch((err) => {
            console.error("Token validation failed:", err);
            localStorage.removeItem('adminToken');
            setIsValid(false);
        });
    }, [token]);

    // While checking with the server, show a dark fullscreen loading block
    if (isValid === null) {
        return (
            <div style={{
                backgroundColor: '#121214',
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#fff',
                fontFamily: 'sans-serif'
            }}>
                Checking credentials...
            </div>
        );
    }

    if (isValid === false) {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default ProtectedRoute;