import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
const API_URL = 'http://13.60.101.169:1245';
const BASE_URL = `${CORS_PROXY}${API_URL}`;

function DeleteAccount() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // First, verify credentials
      const loginFormData = new FormData();
      loginFormData.append("email", email);
      loginFormData.append("password", password);

      const loginResponse = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        body: loginFormData,
        headers: {
          'Accept': 'application/json',
          'Origin': window.location.origin,
        },
      });

      if (!loginResponse.ok) {
        const errorData = await loginResponse.json().catch(() => ({}));
        throw new Error(errorData.message || 'Invalid credentials');
      }

      const loginData = await loginResponse.json();
      
      if (loginData.status !== 200) {
        throw new Error(loginData.message || 'Login failed');
      }

      // If login successful, proceed with account deletion
      const deleteResponse = await fetch(`${BASE_URL}/deleteUser`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Origin': window.location.origin,
        },
        body: JSON.stringify({ email })
      });

      if (!deleteResponse.ok) {
        const errorData = await deleteResponse.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to delete account');
      }

      const deleteData = await deleteResponse.json();
      setSuccess(true);
      
      // Redirect to home page after 3 seconds
      setTimeout(() => {
        navigate('/');
      }, 3000);

    } catch (error) {
      console.error('Error:', error);
      setError(error.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="page-container">
        <div className="form-container">
          <h2>Account Deletion Request Received</h2>
          <p className="success-message">
            We have received your account deletion request. Your account has been successfully deleted.
            You will be redirected to the home page in a few seconds.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="form-container">
        <h2>Delete Your Account</h2>
        <p>
          We're sorry to see you go. Please note that this action is permanent and cannot be undone.
          All your data will be permanently deleted.
        </p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              placeholder="Enter your email"
              required
              disabled={loading}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              placeholder="Enter your password"
              required
              disabled={loading}
            />
          </div>

          {error && (
            <p className="form-error">{error}</p>
          )}

          <button 
            type="submit" 
            className="delete-button"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Delete My Account'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default DeleteAccount; 