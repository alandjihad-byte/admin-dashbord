import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function Edit() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    
    // 1. Image state management variables
    const [existingImage, setExistingImage] = useState(''); // Stores the filename from backend
    const [newImage, setNewImage] = useState(null);         // Stores the new file object
    const [previewUrl, setPreviewUrl] = useState('');       // Stores local temporary preview path

    useEffect(() => {
        axios.get(`http://localhost:5000/items/${id}`)
            .then(res => {
                setName(res.data.name);
                setPrice(res.data.price);
                setDescription(res.data.description);
                setExistingImage(res.data.image); // Save the image filename on load
            })
            .catch(err => console.error("Error fetching item data:", err));
    }, [id]);

    const token = localStorage.getItem('adminToken'); // tokenaka la local storage wardagrtawa

    // Handle picking a new file and creating a temporary local link
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewImage(file);
            setPreviewUrl(URL.createObjectURL(file)); // Creates temporary blob: URL for local preview
        }
    };

    const handleUpdate = async () => {
        // 2. Change from JSON to FormData to support file uploading
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('description', description);
        
        // Only append image if the user selected a new file
        if (newImage) {
            formData.append('image', newImage);
        }

        try {
            await axios.put(`http://localhost:5000/items/${id}`, formData, { 
                headers: { 
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data' // Required for sending files
                }
            }); 
            navigate('/items');
        } catch (error) {
            console.error("Error updating item:", error.response?.data || error.message);
            alert("Failed to update item.");
        }
    };

    // Premium dashboard component styles
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
        imageSection: {
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            backgroundColor: '#141416',
            padding: '16px',
            borderRadius: '8px',
            border: '1px dashed #2d2d34',
        },
        label: {
            fontSize: '14px',
            fontWeight: '500',
            color: '#a1a1aa',
        },
        imagePreview: {
            width: '100px',
            height: '100px',
            objectFit: 'cover',
            borderRadius: '6px',
            border: '1px solid #2d2d34',
            backgroundColor: '#1e1e24',
        },
        noImageText: {
            fontSize: '13px',
            color: '#71717a',
            margin: '4px 0',
        },
        fileInput: {
            color: '#a1a1aa',
            fontSize: '14px',
            marginTop: '4px',
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
                <h1 style={styles.title}>Edit Item</h1>
                
                <div style={styles.inputGroup}>
                    <input
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={styles.input}
                        onFocus={(e) => e.currentTarget.style.borderColor = '#cb63bb'}
                        onBlur={(e) => e.currentTarget.style.borderColor = '#2d2d34'}
                    />
                    
                    <input
                        placeholder="Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        style={styles.input}
                        onFocus={(e) => e.currentTarget.style.borderColor = '#cb63bb'}
                        onBlur={(e) => e.currentTarget.style.borderColor = '#2d2d34'}
                    />
                    
                    <input
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        style={styles.input}
                        onFocus={(e) => e.currentTarget.style.borderColor = '#cb63bb'}
                        onBlur={(e) => e.currentTarget.style.borderColor = '#2d2d34'}
                    />

                    {/* 3. Image display and changing mechanism */}
                    <div style={styles.imageSection}>
                        <label style={styles.label}>Item Image:</label>
                        
                        {previewUrl ? (
                            // Show preview of the newly picked local image
                            <img src={previewUrl} alt="New Preview" style={styles.imagePreview} />
                        ) : existingImage ? (
                            // Show the current image saved in your backend uploads directory
                            <img src={`http://localhost:5000/uploads/${existingImage}`} alt="Current" style={styles.imagePreview} />
                        ) : (
                            <p style={styles.noImageText}>No image assigned to this item</p>
                        )}

                        <input 
                            type="file" 
                            onChange={handleImageChange} 
                            style={styles.fileInput}
                        />
                    </div>
                </div>

                <button 
                    onClick={handleUpdate}
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

export default Edit;