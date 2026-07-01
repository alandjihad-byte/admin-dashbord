import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handlelogin = async () => {
        const res = await axios.post('http://localhost:5000/admin/login', { email, password });
        if (res.data.success) {
            localStorage.setItem('adminToken', res.data.token);
             localStorage.setItem('admin', JSON.stringify(res.data.admin));
            navigate('/items', { replace: true });
        } else {
            alert('Wrong email or password');
        }
    };

    // Premium UI matching your whole dark admin dashboard system
    const styles = {
        wrapper: {
            backgroundColor: '#121214',
            color: '#f4f4f5',
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            padding: '20px',
        },
        card: {
            backgroundColor: '#1e1e24',
            border: '1px solid #2d2d34',
            borderRadius: '16px',
            padding: '40px',
            width: '100%',
            maxWidth: '400px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
        },
        title: {
            fontSize: '32px',
            fontWeight: '700',
            margin: '0 0 4px 0',
            textAlign: 'center',
            letterSpacing: '-0.5px',
            color: '#ffffff',
        },
        subtitle: {
            fontSize: '14px',
            color: '#5abdc5',
            textAlign: 'center',
            margin: '0 0 12px 0',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '1px',
        },
        inputGroup: {
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
        },
        input: {
            backgroundColor: '#141416',
            borderRadius: '8px',
            color: '#ffffff',
            border: '1px solid #2d2d34',
            padding: '12px 16px',
            fontSize: '15px',
            outline: 'none',
            transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
            width: '100%',
            boxSizing: 'border-box',
        },
        button: {
            backgroundColor: '#5abdc5',
            color: '#121214',
            border: 'none',
            borderRadius: '8px',
            padding: '14px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            marginTop: '8px',
            transition: 'opacity 0.2s ease',
            width: '100%', // Upgraded layout spacing over old strict inline dimensional restriction
        }
    };

    return (
        <div style={styles.wrapper}>
            <div style={styles.card}>
                <div>
                    <h1 style={styles.title}>Login</h1>
                    <p style={styles.subtitle}>Admin Console</p>
                </div>
                
                <div style={styles.inputGroup}>
                    <input 
                        placeholder='Email'
                        value={email} // Awa connecte e aw variablae sarey dakatawa 
                        onChange={(e) => setEmail(e.target.value)} // Har jarak ka shtak danuse yan kamdakayawa yan zyad dakae 
                        autoComplete="off"
                        style={styles.input}
                        onFocus={(e) => {
                            e.currentTarget.style.borderColor = '#5abdc5';
                            e.currentTarget.style.boxShadow = '0 0 0 2px rgba(90, 189, 197, 0.2)';
                        }}
                        onBlur={(e) => {
                            e.currentTarget.style.borderColor = '#2d2d34';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    />
                    
                    <div>
                        <input
                            placeholder='Password'
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="new-password"
                            style={styles.input}
                            onFocus={(e) => {
                                e.currentTarget.style.borderColor = '#5abdc5';
                                e.currentTarget.style.boxShadow = '0 0 0 2px rgba(90, 189, 197, 0.2)';
                            }}
                            onBlur={(e) => {
                                e.currentTarget.style.borderColor = '#2d2d34';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        />
                    </div>
                </div>

                <button 
                    onClick={handlelogin}
                    style={styles.button}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '0.85'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                >
                    Login
                </button>
            </div>
        </div>
    );
}

export default Login;