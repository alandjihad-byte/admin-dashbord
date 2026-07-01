import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ALL_PERMISSIONS = [
    { key: 'items', label: 'Create / Edit / Delete Items' },
    { key: 'users', label: 'View Users' },
    { key: 'forceLogout', label: 'Force Logout Users' },
    { key: 'settings', label: 'Change Admin Settings' },
];

function EditEmployee() {
    const { id } = useParams();
   console.log('EditEmployee mounted, id is:', id);
    
    const navigate = useNavigate();
    const token = localStorage.getItem('adminToken');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); // left blank = don't change password
    const [permissions, setPermissions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:5000/admin/employees/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => {
            if (res.data.success) {
                setEmail(res.data.employee.email);
                setPermissions(res.data.employee.permissions || []);
                setLoading(false);
            } else {
                alert(res.data.message);
                navigate('/employees');
            }
        });
    }, [id]);

    const togglePermission = (key) => {
        setPermissions(prev =>
            prev.includes(key) ? prev.filter(p => p !== key) : [...prev, key]
        );
    };

    const handleSave = async () => {
        const res = await axios.put(`http://localhost:5000/admin/employees/${id}`, {
            email,
            password: password || undefined, // only send it if something was typed
            permissions
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });

        if (res.data.success) {
            alert('Employee updated');
            navigate('/employees');
        } else {
            alert(res.data.message);
        }
    };

    if (loading) return <p style={{ textAlign: 'center', marginTop: '50px', color: '#fff', backgroundColor: '#121214', minHeight: '100vh', paddingTop: '50px' }}>Loading...</p>;

    const styles = {
        container: { backgroundColor: '#121214', color: '#f4f4f5', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif', padding: '40px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center' },
        card: { backgroundColor: '#1e1e24', border: '1px solid #2d2d34', borderRadius: '16px', padding: '28px', maxWidth: '440px', width: '100%' },
        title: { fontSize: '24px', fontWeight: '700', color: '#fff', marginBottom: '20px' },
        input: { backgroundColor: '#141416', borderRadius: '8px', color: '#fff', border: '1px solid #2d2d34', padding: '12px 16px', fontSize: '15px', outline: 'none', marginBottom: '16px', width: '100%', boxSizing: 'border-box' },
        permissionLabel: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', fontSize: '14px', color: '#a1a1aa', cursor: 'pointer' },
        checkbox: { accentColor: '#b370e4', width: '16px', height: '16px', cursor: 'pointer' },
        saveBtn: { backgroundColor: '#5abdc5', color: '#121214', border: 'none', borderRadius: '8px', padding: '12px 20px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', marginTop: '16px', width: '100%' },
        backBtn: { backgroundColor: 'transparent', color: '#a1a1aa', border: '1px solid #2d2d34', borderRadius: '8px', padding: '10px 16px', fontSize: '14px', cursor: 'pointer', marginBottom: '20px' }
    };

    return (
        <div style={styles.container}>
            <div style={{ maxWidth: '440px', width: '100%' }}>
                <button onClick={() => navigate('/employees')} style={styles.backBtn}>&larr; Back to Employees</button>
                <div style={styles.card}>
                    <h1 style={styles.title}>Edit Employee</h1>

                    <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={styles.input} />
                    <input placeholder="New password (leave blank to keep current)" type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={styles.input} autoComplete="new-password" />

                    <p style={{ fontSize: '14px', fontWeight: '600', color: '#fff', margin: '8px 0 12px 0' }}>Permissions:</p>
                    {ALL_PERMISSIONS.map(p => (
                        <label key={p.key} style={styles.permissionLabel}>
                            <input type="checkbox" checked={permissions.includes(p.key)} onChange={() => togglePermission(p.key)} style={styles.checkbox} />
                            {p.label}
                        </label>
                    ))}

                    <button onClick={handleSave} style={styles.saveBtn}>Save Changes</button>
                </div>
            </div>
        </div>
    );
}

export default EditEmployee;