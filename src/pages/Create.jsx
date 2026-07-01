import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';
import { useState } from "react";

function Create() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState('');

    const handleCreate = async () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('description', description);
        if (image) formData.append('image', image);
        
        const token = localStorage.getItem('adminToken'); // tokenaka la local storage wardagrtawa

        try {
            // 1. Send the POST request to your backend server
            await axios.post('http://localhost:5000/items', formData, {
                headers: { Authorization: `Bearer ${token}` } // tokenaka daneriana backend lo check
            });

            // 2. Only navigate away if the server successfully saves the item
            navigate('/items');
        } catch (error) {
            // 3. Catch errors (like the 401 Unauthorized) so you know what went wrong
            console.error("Error creating item:", error.response?.data || error.message);
            alert("Failed to save item. Check console for details.");
        }
        
        navigate('/items');
    };

    // Premium UI styles matching your whole dark management theme
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
            maxWidth: '460px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
        },
        title: {
            fontSize: '28px',
            fontWeight: '700',
            margin: '0 0 8px 0',
            letterSpacing: '-0.5px',
            color: '#ffffff',
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
            fontFamily: 'inherit',
        },
        textarea: {
            backgroundColor: '#141416',
            borderRadius: '8px',
            color: '#ffffff',
            border: '1px solid #2d2d34',
            padding: '12px 16px',
            fontSize: '15px',
            outline: 'none',
            transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
            minHeight: '100px',
            resize: 'vertical',
            fontFamily: 'inherit',
        },
        fileContainer: {
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            backgroundColor: '#141416',
            padding: '14px',
            borderRadius: '8px',
            border: '1px dashed #2d2d34',
        },
        label: {
            fontSize: '13px',
            fontWeight: '500',
            color: '#a1a1aa',
        },
        fileInput: {
            color: '#a1a1aa',
            fontSize: '14px',
        },
        button: {
            backgroundColor: '#cb63bb',
            color: '#ffffff',
            border: 'none',
            borderRadius: '8px',
            padding: '14px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            marginTop: '8px',
            transition: 'background-color 0.2s ease',
        }
    };

    return (
        <div style={styles.wrapper}>
            <div style={styles.card}>
                <h1 style={styles.title}>Create Item</h1>
                
                <div style={styles.inputGroup}>
                    <input
                        placeholder="Item name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={styles.input}
                        onFocus={(e) => e.currentTarget.style.borderColor = '#cb63bb'}
                        onBlur={(e) => e.currentTarget.style.borderColor = '#2d2d34'}
                    />
                    
                    <input
                        placeholder="Item Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        style={styles.input}
                        onFocus={(e) => e.currentTarget.style.borderColor = '#cb63bb'}
                        onBlur={(e) => e.currentTarget.style.borderColor = '#2d2d34'}
                    />
                    
                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        style={styles.textarea}
                        onFocus={(e) => e.currentTarget.style.borderColor = '#cb63bb'}
                        onBlur={(e) => e.currentTarget.style.borderColor = '#2d2d34'}
                    />
                    
                    <div style={styles.fileContainer}>
                        <span style={styles.label}>Item Media Attachment:</span>
                        <input 
                            type="file" 
                            onChange={(e) => setImage(e.target.files[0])}
                            style={styles.fileInput}
                        />
                    </div>
                </div>

                <button 
                    onClick={handleCreate}
                    style={styles.button}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#b552a5'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#cb63bb'}
                >
                    Save
                </button>
            </div>
        </div>
    );
}

export default Create;