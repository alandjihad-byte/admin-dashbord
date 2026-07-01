import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Settings() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [currentEmail, setCurrentEmail] = useState('Loading email...');
    const [currentImage, setCurrentImage] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const token = localStorage.getItem('adminToken');
                
                if (!token) {
                    navigate('/');
                    return;
                }

                const res = await axios.get('http://localhost:5000/admin/me', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (res.data && res.data.admin) {
                    setCurrentEmail(res.data.admin.email || "No email found");
                    if (res.data.admin.image) {
                        setCurrentImage(`http://localhost:5000/uploads/${res.data.admin.image}`);
                    }
                }
            } catch (error) {
                console.error("Error fetching admin data:", error);
                setCurrentEmail("Error loading email");
            }
        };

        fetchAdminData();
    }, [navigate]);

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const token = localStorage.getItem('adminToken');
        const formData = new FormData();
        formData.append('image', file);

        try {
            // NOTE: Make sure your backend has an endpoint to accept this, 
            // similar to how you process your '/users/:id/image' route.
            const res = await axios.put('http://localhost:5000/admin/image', formData, {
                headers: { 
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            alert('Profile picture updated');
            if (res.data && res.data.image) {
                setCurrentImage(`http://localhost:5000/uploads/${res.data.image}`);
            } else {
                // Fallback client-side preview if backend just returns success status
                setCurrentImage(URL.createObjectURL(file));
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            alert("Failed to update profile picture");
        }
    };

    const handlesave = async () => {
        try {
            const token = localStorage.getItem('adminToken'); 

            await axios.put('http://localhost:5000/admin/update', { email, password }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            alert('Settings updated');
            
            if (email) {
                setCurrentEmail(email);
                setEmail('');
            }
            setPassword('');
        } catch (error) {
            console.error("Error updating settings:", error);
            alert("Failed to update settings");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/');
    }; 
  
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
            maxWidth: '440px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
        },
        profileSection: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
            borderBottom: '1px solid #2d2d34',
            paddingBottom: '20px',
        },
        avatarWrapper: {
            position: 'relative',
            width: '80px',
            height: '80px',
        },
        avatar: {
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            objectFit: 'cover',
            border: '2px solid #5abdc5',
            backgroundColor: '#141416',
        },
        uploadLabel: {
            position: 'absolute',
            bottom: '0',
            right: '0',
            backgroundColor: '#5abdc5',
            color: '#121214',
            width: '26px',
            height: '26px',
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: 'bold',
            boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
            transition: 'transform 0.2s ease',
        },
        fileInput: {
            display: 'none',
        },
        adminEmailDisplay: {
            fontSize: '15px',
            color: '#5abdc5',
            fontWeight: '500',
            margin: 0,
        },
        headerArea: {
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center',
            gap: '6px',
        },
        title: {
            fontSize: '24px',
            fontWeight: '700',
            margin: 0,
            letterSpacing: '-0.5px',
            color: '#ffffff',
        },
        subtitle: {
            fontSize: '14px',
            color: '#a1a1aa',
            margin: 0,
            lineHeight: '1.4',
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
            fontFamily: 'inherit',
        },
        saveBtn: {
            backgroundColor: '#5abdc5',
            color: '#121214',
            border: 'none',
            borderRadius: '8px',
            padding: '12px 16px',
            fontSize: '15px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'opacity 0.2s ease',
            width: '100%',
        },
        logoutSection: {
            borderTop: '1px solid #2d2d34',
            paddingTop: '20px',
            width: '100%',
        },
        logoutBtn: {
            backgroundColor: '#b14848',
            color: '#ffffff',
            border: 'none',
            borderRadius: '8px',
            padding: '12px 16px',
            fontSize: '15px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease',
            width: '100%',
        }
    };

    return (
        <div style={styles.wrapper}>
            <div style={styles.card}>
                
                <div style={styles.profileSection}>
                    <div style={styles.avatarWrapper}>
                        <img 
                            src={currentImage} 
                            alt="Admin Profile" 
                            style={styles.avatar} 
                        />
                        <label htmlFor="admin-avatar-upload" style={styles.uploadLabel} title="Change Profile Picture">
                            📷
                        </label>
                        <input 
                            id="admin-avatar-upload"
                            type="file" 
                            accept="image/*"
                            onChange={handleImageChange}
                            style={styles.fileInput}
                        />
                    </div>
                    <p style={styles.adminEmailDisplay}>{currentEmail}</p> 
                </div>

                <div style={styles.headerArea}>
                    <h1 style={styles.title}>Settings</h1>
                    <h2 style={styles.subtitle}>Update your security credentials</h2>
                </div>
                
                <div style={styles.inputGroup}>
                    <input
                        placeholder="New Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="false"
                        style={styles.input}
                        onFocus={(e) => {
                            e.currentTarget.style.borderColor = '#5abdc5';
                            e.currentTarget.style.boxShadow = '0 0 0 2px rgba(90, 189, 197, 0.1)';
                        }}
                        onBlur={(e) => {
                            e.currentTarget.style.borderColor = '#2d2d34';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    />

                    <div>
                        <input
                            type="password"
                            placeholder="New Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="new-password"
                            style={styles.input}
                            onFocus={(e) => {
                                e.currentTarget.style.borderColor = '#5abdc5';
                                e.currentTarget.style.boxShadow = '0 0 0 2px rgba(90, 189, 197, 0.1)';
                            }}
                            onBlur={(e) => {
                                e.currentTarget.style.borderColor = '#2d2d34';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        />
                    </div>
                </div>

                <button 
                    onClick={handlesave} 
                    style={styles.saveBtn}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '0.85'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                >
                    Save Changes
                </button>
                
                <div style={styles.logoutSection}>
                    <button 
                        onClick={handleLogout} 
                        style={styles.logoutBtn}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#963b3b'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#b14848'}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Settings;