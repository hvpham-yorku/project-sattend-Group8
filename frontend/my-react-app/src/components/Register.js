import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const styles = {
  registerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f5f5f5'
  },
  registerForm: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '500px'
  },
  header: {
    textAlign: 'center',
    marginBottom: '1.5rem',
    color: '#333'
  },
  formGroup: {
    marginBottom: '1rem'
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: '500'
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem'
  },
  select: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
    backgroundColor: 'white'
  },
  button: {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: '#4c9aff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    marginTop: '1rem'
  },
  buttonDisabled: {
    backgroundColor: '#cccccc',
    cursor: 'not-allowed'
  },
  errorMessage: {
    color: '#d32f2f',
    marginBottom: '1rem',
    textAlign: 'center',
    fontSize: '0.875rem'
  },
  link: {
    display: 'block',
    textAlign: 'center',
    marginTop: '1rem',
    color: '#4c9aff',
    textDecoration: 'none',
    cursor: 'pointer'
  }
};

function Register({ onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    email: '',
    role: 'INSTRUCTOR' // Default role
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.username || !formData.password || !formData.confirmPassword || 
        !formData.firstName || !formData.lastName || !formData.email) {
      setError('All fields are required');
      return false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setError('');
    setIsLoading(true);

    try {
      // Remove confirmPassword from the data sent to the server
      const { confirmPassword, ...registerData } = formData;
      
      const response = await fetch('http://localhost:4567/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      // Registration successful
      alert('Registration successful! Please login with your new account.');
      onSwitchToLogin(); // Navigate to login page
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.registerContainer}>
      <div style={styles.registerForm}>
        <h2 style={styles.header}>Create an Account</h2>
        {error && <div style={styles.errorMessage}>{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="firstName">First Name</label>
            <input
              style={styles.input}
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="lastName">Last Name</label>
            <input
              style={styles.input}
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="username">Username</label>
            <input
              style={styles.input}
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="email">Email</label>
            <input
              style={styles.input}
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="password">Password</label>
            <input
              style={styles.input}
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="confirmPassword">Confirm Password</label>
            <input
              style={styles.input}
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="role">Role</label>
            <select
              style={styles.select}
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="INSTRUCTOR">Instructor</option>
              <option value="TA">Teaching Assistant</option>
            </select>
          </div>
          
          <button 
            style={{
              ...styles.button,
              ...(isLoading ? styles.buttonDisabled : {})
            }} 
            type="submit" 
            disabled={isLoading}
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
          
          <a 
            style={styles.link} 
            onClick={onSwitchToLogin}
          >
            Already have an account? Login
          </a>
        </form>
      </div>
    </div>
  );
}

export default Register;