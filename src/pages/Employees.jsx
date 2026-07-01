import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ALL_PERMISSIONS = [
    { key: 'items', label: 'Create / Edit / Delete Items' },
    { key: 'users', label: 'View Users' },
    { key: 'forceLogout', label: 'Force Logout Users' },
    { key: 'settings', label: 'Change Admin Settings' },
];

function Employees() {
    const navigate = useNavigate();
    const token = localStorage.getItem('adminToken');
    const admin = JSON.parse(localStorage.getItem('admin') || 'null');

    const [employees, setEmployees] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newPermissions, setNewPermissions] = useState([]);

    const fetchEmployees = async () => {
        const res = await axios.get('http://localhost:5000/admin/employees', {
            headers: { Authorization: `Bearer ${token}` }
        });
        setEmployees(res.data);
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const toggleNewPermission = (key) => {
        setNewPermissions(prev =>
            prev.includes(key) ? prev.filter(p => p !== key) : [...prev, key]
        );
    };

    const handleCreate = async () => {
        const res = await axios.post('http://localhost:5000/admin/employees', {
            email,
            password,
            permissions: newPermissions
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });

        if (res.data.success) {
            alert('Employee created');
            setEmail('');
            setPassword('');
            setNewPermissions([]);
            fetchEmployees();
        } else {
            alert(res.data.message);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this employee?")) return;
        await axios.delete(`http://localhost:5000/admin/employees/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        fetchEmployees();
    };

    if (!admin || admin.role !== 'manager') {
        return (
            <div style={{ backgroundColor: '#121214', color: '#ff4b4b', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                <p style={{ fontSize: '16px', fontWeight: '600', border: '1px solid rgba(255,75,75,0.2)', padding: '16px 24px', borderRadius: '8px', backgroundColor: '#1e1e24' }}>
                    Only managers can view this page.
                </p>
            </div>
        );
    }

    const styles = {
        container: { backgroundColor: '#121214', color: '#f4f4f5', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif', padding: '40px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center' },
        viewWrapper: { width: '100%', maxWidth: '540px', display: 'flex', flexDirection: 'column', gap: '32px' },
        title: { fontSize: '32px', fontWeight: '700', margin: 0, letterSpacing: '-0.5px', color: '#ffffff', borderBottom: '1px solid #2d2d34', paddingBottom: '16px' },
        card: { backgroundColor: '#1e1e24', border: '1px solid #2d2d34', borderRadius: '16px', padding: '28px', boxShadow: '0 12px 32px rgba(0,0,0,0.25)', display: 'flex', flexDirection: 'column' },
        sectionHeading: { fontSize: '18px', fontWeight: '600', color: '#ffffff', margin: '0 0 20px 0' },
        subSectionTitle: { fontSize: '22px', fontWeight: '700', color: '#ffffff', margin: '0 0 4px 0' },
        input: { backgroundColor: '#141416', borderRadius: '8px', color: '#ffffff', border: '1px solid #2d2d34', padding: '12px 16px', fontSize: '15px', outline: 'none', marginBottom: '16px', width: '100%', boxSizing: 'border-box', fontFamily: 'inherit' },
        permissionLabel: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', fontSize: '14px', color: '#a1a1aa', cursor: 'pointer', userSelect: 'none' },
        checkbox: { accentColor: '#b370e4', width: '16px', height: '16px', cursor: 'pointer' },
        createBtn: { backgroundColor: '#b370e4', color: '#ffffff', border: 'none', borderRadius: '8px', padding: '12px 20px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', marginTop: '12px' },
        employeeEntry: { backgroundColor: '#1e1e24', border: '1px solid #2d2d34', borderRadius: '12px', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' },
        empEmail: { fontSize: '16px', color: '#ffffff', fontWeight: '600', margin: 0 },
        btnRow: { display: 'flex', gap: '10px' },
        editBtn: { backgroundColor: '#5abdc5', color: '#121214', border: 'none', borderRadius: '8px', padding: '10px 16px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' },
        deleteBtn: { backgroundColor: '#ff4b4b', color: '#ffffff', border: 'none', borderRadius: '8px', padding: '10px 16px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }
    };

    return (
        <div style={styles.container}>
            <div style={styles.viewWrapper}>
                <h1 style={styles.title}>Employees</h1>

                <div style={styles.card}>
                    <h3 style={styles.subSectionTitle}>Create New Employee</h3>
                    <p style={{ color: '#a1a1aa', fontSize: '14px', margin: '0 0 20px 0' }}>Assign specific account controls securely.</p>

                    <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={styles.input} />
                    <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={styles.input} />

                    <p style={{ fontSize: '14px', fontWeight: '600', color: '#ffffff', margin: '8px 0 12px 0' }}>Permissions:</p>
                    {ALL_PERMISSIONS.map(p => (
                        <label key={p.key} style={styles.permissionLabel}>
                            <input type="checkbox" checked={newPermissions.includes(p.key)} onChange={() => toggleNewPermission(p.key)} style={styles.checkbox} />
                            {p.label}
                        </label>
                    ))}

                    <button onClick={handleCreate} style={styles.createBtn}>Create Employee</button>
                </div>

                <div>
                    <h3 style={styles.sectionHeading}>Current Employees</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {employees.map(emp => (
                            <div key={emp.id} style={styles.employeeEntry}>
                                <p style={styles.empEmail}>{emp.email}</p>
                                <div style={styles.btnRow}>
                                    <button onClick={() => navigate(`/employees/edit/${emp.id}`)} style={styles.editBtn}>Edit</button>
                                    <button onClick={() => handleDelete(emp.id)} style={styles.deleteBtn}>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Employees;