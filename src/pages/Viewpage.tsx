
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import type { RootState } from '../store/store';

const ViewPage = () => {
  const { id } = useParams<{ id: string }>();
  const users = useSelector((state: RootState) => state.user.users);
  const navigate = useNavigate();
  const user = users.find(u => u.id === id);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>User Details</h1>
      {user ? (
        <div>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Signature</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={styles.td}>{user.name}</td>
                <td style={styles.td}>{user.email}</td>
                <td style={styles.td}>
                  {user.signature ? (
                    <img 
                      src={user.signature} 
                      alt="User signature" 
                      style={{ maxWidth: '200px', maxHeight: '100px' }}
                    />
                  ) : (
                    'No signature'
                  )}
                </td>
              </tr>
            </tbody>
          </table>
          <div style={{ marginTop: '20px' }}>
            <button 
              style={{...styles.button, marginRight: '10px'}} 
              onClick={() => navigate(`/edit/${user.id}`)}
            >
              Edit User
            </button>
            <button style={styles.button} onClick={() => navigate('/home')}>
              Back to Home
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p>User not found.</p>
          <button style={styles.button} onClick={() => navigate('/home')}>
            Back to Home
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '50px auto',
    padding: '20px',
    borderRadius: '10px',
    background: '#ffffff',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    textAlign: 'center' as const,
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    marginBottom: '20px',
    color: '#333',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
    marginBottom: '20px',
  },
  th: {
    border: '1px solid #ddd',
    padding: '10px',
    background: '#007BFF',
    color: '#fff',
  },
  td: {
    border: '1px solid #ddd',
    padding: '10px',
  },
  button: {
    padding: '10px 20px',
    background: '#28a745',
    color: '#fff',
    fontSize: '14px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
  },
};

export default ViewPage;
