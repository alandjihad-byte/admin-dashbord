import { useEffect, useState } from "react";
import axios from 'axios';

function AllUsers() {
    const [users, setUsers] = useState([]);
    // tokena savekrawake admin daenetawa 
    const token = localStorage.getItem('adminToken');

    // hamu userakan fetch daka tokenaka la header danere 
    const fetchUsers = async () => {
        const res = await axios.get('http://localhost:5000/users', {
            headers: { Authorization: `Bearer ${token}` }
        });
        setUsers(res.data);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleForceLogout = async (userId) => {
        await axios.post(`http://localhost:5000/admin/force-logout/${userId}`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        });
        alert('User has been Logged out');
    };

    // Premium UI matching your whole dark admin dashboard system
    const styles = {
        container: {
            backgroundColor: '#121214',
            color: '#f4f4f5',
            minHeight: '100vh',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            padding: '24px 40px',
        },
        header: {
            maxWidth: '800px',
            margin: '0 auto 32px auto',
            borderBottom: '1px solid #2d2d34',
            paddingBottom: '16px',
        },
        title: {
            fontSize: '28px',
            fontWeight: '700',
            margin: 0,
            letterSpacing: '-0.5px',
            color: '#ffffff',
        },
        listContainer: {
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            maxWidth: '800px',
            margin: '0 auto',
        },
        userCard: {
            backgroundColor: '#1e1e24',
            border: '1px solid #2d2d34',
            borderRadius: '12px',
            padding: '16px 24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            gap: '16px',
        },
        userInfo: {
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
        },
        avatarCircle: {
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: '#141416',
            border: '1px solid #2d2d34',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#cb63bb',
            fontWeight: '600',
            fontSize: '14px',
        },
        emailText: {
            fontSize: '15px',
            color: '#ffffff',
            fontWeight: '500',
            margin: 0,
        },
        logoutBtn: {
            backgroundColor: 'transparent',
            color: '#ff4b4b',
            border: '1px solid rgba(255, 75, 75, 0.3)',
            borderRadius: '8px',
            padding: '8px 16px',
            fontSize: '13px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            whiteSpace: 'nowrap',
        }
    };

    return (
        <div style={styles.container}>
            {/* Admin Header */}
            <div style={styles.header}>
                <h1 style={styles.title}>All Users</h1>
            </div>

            {/* Users Directory Management List */}
            <div style={styles.listContainer}>
                {users.map(user => (
                    <div key={user.id} style={styles.userCard}>
                        <div style={styles.userInfo}>
                            <div style={styles.avatarCircle}>
                                {user.email ? user.email.charAt(0).toUpperCase() : 'U'}
                            </div>
                            <p style={styles.emailText}>{user.email}</p>
                        </div>
                        
                        <button 
                            onClick={() => handleForceLogout(user.id)}
                            style={styles.logoutBtn}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#ff4b4b';
                                e.currentTarget.style.color = '#ffffff';
                                e.currentTarget.style.borderColor = '#ff4b4b';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                                e.currentTarget.style.color = '#ff4b4b';
                                e.currentTarget.style.borderColor = 'rgba(255, 75, 75, 0.3)';
                            }}
                        >
                            Force Logout
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AllUsers;