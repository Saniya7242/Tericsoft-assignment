import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '../store/store';

const HomePage = () => {
    const users = useSelector((state: RootState) => state.user.users);
    const navigate = useNavigate(); 
    // Get login data from localStorage
    const loginData = localStorage.getItem('loginData');
    const loggedInUser = loginData ? JSON.parse(loginData) : null;

    const handleLogout = () => {
        localStorage.removeItem('loginData');
        navigate('/login');
    };

    return (
        <div style={{ padding: '2rem' }}>
            <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '2rem'
            }}>
                <div>
                    <h1>Users</h1>
                    {loggedInUser && (
                        <p style={{ 
                            color: '#666', 
                            marginTop: '0.5rem',
                            fontSize: '1rem'
                        }}>
                            Welcome, {loggedInUser.username}!
                        </p>
                    )}
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button
                        onClick={() => navigate('/add')}
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
                        onClick={handleLogout}
                        style={{
                            padding: '0.75rem 1.5rem',
                            backgroundColor: '#dc3545',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '1rem'
                        }}
                    >
                        Logout
                    </button>
                </div>
            </div>

            {users.length === 0 ? (
                <div style={{ 
                    textAlign: 'center', 
                    padding: '3rem',
                    color: '#666'
                }}>
                    No users found. Click "Add User" to get started.
                </div>
            ) : (
                <table style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    backgroundColor: 'white',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                    borderRadius: '8px',
                    overflow: 'hidden'
                }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f5f5f5' }}>
                            <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #ddd' }}>
                                Name
                            </th>
                            <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #ddd' }}>
                                Email
                            </th>
                            <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #ddd' }}>
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id} style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: '1rem' }}>{user.name}</td>
                                <td style={{ padding: '1rem' }}>{user.email}</td>
                                <td style={{ padding: '1rem' }}>
                                    <button
                                        onClick={() => navigate(`/view/${user.id}`)}


                                        style={{
                                            marginRight: '0.5rem',
                                            padding: '0.5rem 1rem',
                                            backgroundColor: '#2196f3',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        View
                                    </button>
                                    <button
                                  onClick={() => navigate(`/edit/${user.id}`)}


                                        style={{
                                            padding: '0.5rem 1rem',
                                            backgroundColor: '#ff9800',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default HomePage;