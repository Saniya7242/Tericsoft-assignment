import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../store/userslice';

const AddPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [signature, setSignature] = useState('');
    const [error, setError] = useState('');
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const navigate = useNavigate();
    // Create a dispatch function to dispatch actions 
    const dispatch = useDispatch();

    const startDrawing = (e: React.MouseEvent) => {
        setIsDrawing(true);
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const rect = canvas.getBoundingClientRect();
        ctx.beginPath();
        ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    };

    const draw = (e: React.MouseEvent) => {
        if (!isDrawing) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const rect = canvas.getBoundingClientRect();
        ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
        ctx.stroke();
    };

    const stopDrawing = () => {
        setIsDrawing(false);
        const canvas = canvasRef.current;
        if (!canvas) return;
        const signatureData = canvas.toDataURL();
        setSignature(signatureData);
    };

    const clearSignature = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setSignature('');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!name || !email) {
            setError('Please fill in all fields');
            return;
        }

        if (!email.includes('@')) {
            setError('Please enter a valid email');
            return;
        }

        const newUser = {
            id: Date.now().toString(),
            name,
            email,
            signature
        };
console.log(newUser);

        dispatch(addUser(newUser));
        navigate('/home');
    };

    return (
        <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
            <h1 style={{ marginBottom: '2rem' }}>Add User</h1>
            
            {error && (
                <div style={{
                    backgroundColor: '#ffebee',
                    color: '#c62828',
                    padding: '0.75rem',
                    borderRadius: '4px',
                    marginBottom: '1rem'
                }}>
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>
                        Name:
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            fontSize: '1rem'
                        }}
                    />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>
                        Email:
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            fontSize: '1rem'
                        }}
                    />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>
                        Signature:
                    </label>
                    <canvas
                        ref={canvasRef}
                        width={400}
                        height={150}
                        style={{
                            width: '100%',
                            height: '150px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            cursor: 'crosshair'
                        }}
                        onMouseDown={startDrawing}
                        onMouseMove={draw}
                        onMouseUp={stopDrawing}
                        onMouseLeave={stopDrawing}
                    />
                    <button
                        type="button"
                        onClick={clearSignature}
                        style={{
                            marginTop: '0.5rem',
                            padding: '0.5rem 1rem',
                            backgroundColor: '#6c757d',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Clear Signature
                    </button>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button
                        type="submit"
                        style={{
                            padding: '0.75rem 1.5rem',
                            backgroundColor: '#4caf50',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '1rem'
                        }}
                    >
                        Add User
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/home')}
                        style={{
                            padding: '0.75rem 1.5rem',
                            backgroundColor: '#6c757d',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '1rem'
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddPage;

