import { useState } from 'react';

function DeleteAccount() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    // Here you would typically make an API call to verify credentials and delete the account
    // This is just a mock implementation
    if (email && password) {
      setSuccess(true);
    } else {
      setError('Please fill in all fields');
    }
  };

  if (success) {
    return (
      <div className="page-container">
        <div className="form-container">
          <h2>Account Deletion Request Received</h2>
          <p className="success-message">
            We have received your account deletion request. You will receive a confirmation email shortly.
            Your account will be permanently deleted within 30 days.
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
            />
          </div>

          {error && (
            <p className="form-error">{error}</p>
          )}

          <button type="submit" className="delete-button">
            Delete My Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default DeleteAccount; 