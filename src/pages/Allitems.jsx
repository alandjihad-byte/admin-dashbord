import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AllItems() {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [search, setSearch] = useState('');
    
    const token = localStorage.getItem('adminToken');

    const fetchItems = async () => { 
        try {
            const res = await axios.get(`http://localhost:5000/items`);
            setItems(res.data);
        } catch (error) {
            console.error("Error fetching items:", error);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this item?")) return;

        try {
            await axios.delete(`http://localhost:5000/items/${id}`, {
                headers: { 
                    Authorization: `Bearer ${token}` 
                }
            });
            fetchItems(); 
        } catch (error) {
            console.error("Error deleting item:", error.response?.data || error.message);
            alert(error.response?.data?.message || "Failed to delete item. You might be unauthorized.");
        }
    };

    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.id.toString() === search
    );

    // Premium modern styles matching your whole dark admin system
    const styles = {
        container: {
            backgroundColor: '#121214',
            color: '#f4f4f5',
            minHeight: '100vh',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            padding: '24px 40px',
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '32px',
        },
        title: {
            fontSize: '28px',
            fontWeight: '700',
            margin: 0,
            letterSpacing: '-0.5px',
            color: '#ffffff',
        },
        settingsBtn: {
            backgroundColor: 'transparent',
            color: '#a1a1aa',
            border: '1px solid #2d2d34',
            borderRadius: '8px',
            padding: '8px 16px',
            fontSize: '14px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
        },
        toolbar: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '32px',
            flexWrap: 'wrap',
        },
        leftActions: {
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            flexWrap: 'wrap',
        },
        newItemBtn: {
            backgroundColor: '#5abdc5',
            color: '#121214',
            border: 'none',
            borderRadius: '8px',
            padding: '10px 20px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'opacity 0.2s ease',
        },
        allUsersBtn: {
            backgroundColor: '#dce470',
            color: '#121214',
            border: 'none',
            borderRadius: '8px',
            padding: '10px 20px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'opacity 0.2s ease',
        },
        employeesBtn: {
            backgroundColor: '#b370e4',
            color: '#ffffff',
            border: 'none',
            borderRadius: '8px',
            padding: '10px 20px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'opacity 0.2s ease',
        },
        searchInput: {
            backgroundColor: '#1e1e24',
            width: '280px',
            borderRadius: '8px',
            color: '#ffffff',
            border: '1px solid #2d2d34',
            padding: '10px 16px',
            fontSize: '14px',
            outline: 'none',
            transition: 'border-color 0.2s ease',
        },
        grid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '24px',
            maxWidth: '1200px',
            margin: '0 auto',
        },
        card: {
            backgroundColor: '#1e1e24',
            border: '1px solid #2d2d34',
            borderRadius: '12px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        },
        cardContent: {
            display: 'flex',
            gap: '16px',
            alignItems: 'center',
        },
        image: {
            width: '80px',
            height: '80px',
            objectFit: 'cover',
            borderRadius: '8px',
            backgroundColor: '#141416',
        },
        infoArea: {
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
        },
        itemName: {
            fontSize: '16px',
            fontWeight: '600',
            color: '#ffffff',
            margin: 0,
        },
        btnGroup: {
            display: 'flex',
            gap: '12px',
            borderTop: '1px solid #2d2d34',
            paddingTop: '14px',
        },
        deleteBtn: {
            backgroundColor: '#f55555',
            color: '#ffffff',
            border: 'none',
            borderRadius: '8px',
            padding: '8px 16px',
            fontSize: '13px',
            fontWeight: '600',
            cursor: 'pointer',
            flex: 1,
            transition: 'background-color 0.2s ease',
        },
        editBtn: {
            backgroundColor: '#78bd58',
            color: '#ffffff',
            border: 'none',
            borderRadius: '8px',
            padding: '8px 16px',
            fontSize: '13px',
            fontWeight: '600',
            cursor: 'pointer',
            flex: 1,
            transition: 'background-color 0.2s ease',
        }
    };

    return (
        <div style={styles.container}>
            {/* Top Management Header */}
            <div style={styles.header}>
                <h1 style={styles.title}>All Items</h1>
                <button 
                    onClick={() => navigate('/settings')} 
                    style={styles.settingsBtn}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#ffffff'; e.currentTarget.style.borderColor = '#ffffff'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = '#a1a1aa'; e.currentTarget.style.borderColor = '#2d2d34'; }}
                >
                    Settings
                </button>
            </div>

            {/* Sub Dashboard Controls Row */}
            <div style={styles.toolbar}>
                <div style={styles.leftActions}>
                    <button 
                        onClick={() => navigate('/items/create')} 
                        style={styles.newItemBtn}
                        onMouseEnter={(e) => e.currentTarget.style.opacity = '0.85'}
                        onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                    >
                        + New Item
                    </button>
                    <button 
                        onClick={() => navigate('/AllUsers')} 
                        style={styles.allUsersBtn}
                        onMouseEnter={(e) => e.currentTarget.style.opacity = '0.85'}
                        onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                    >
                        AllUsers
                    </button>
                    <button 
                        onClick={() => navigate('/Employees')} 
                        style={styles.employeesBtn}
                        onMouseEnter={(e) => e.currentTarget.style.opacity = '0.85'}
                        onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                    >
                        Employees
                    </button>
                </div>
                
                <input
                    placeholder="Search by name or id..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={styles.searchInput}
                    onFocus={(e) => e.currentTarget.style.borderColor = '#5abdc5'}
                    onBlur={(e) => e.currentTarget.style.borderColor = '#2d2d34'}
                />
            </div>

            {/* Dynamic Items Listing Grid */}
            <div style={styles.grid}>
                {filteredItems.map(item => (
                    <div key={item.id} style={styles.card}>
                        <div style={styles.cardContent}>
                            {item.image && (
                                <img
                                    src={`http://localhost:5000/uploads/${item.image}`}
                                    alt={item.name}
                                    style={styles.image}
                                />
                            )}
                            <div style={styles.infoArea}>
                                <p style={styles.itemName}>{item.name}</p>
                                <span style={{ color: '#cb63bb', fontSize: '15px', fontWeight: '600' }}>
                                    ${item.price}
                                </span>
                                <span style={{ color: '#71717a', fontSize: '12px' }}>
                                    ID: {item.id}
                                </span>
                            </div>
                        </div>
                        
                        <div style={styles.btnGroup}>
                            <button 
                                onClick={() => handleDelete(item.id)} 
                                style={styles.deleteBtn}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d43f3f'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f55555'}
                            >
                                Delete
                            </button>
                            <button 
                                onClick={() => navigate(`/items/edit/${item.id}`)} 
                                style={styles.editBtn}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#62a144'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#78bd58'}
                            >
                                Edit
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AllItems;