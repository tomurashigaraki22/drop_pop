import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <div className="nav-container">
        <Link to="/" className="nav-logo">Drop</Link>
        <div className="nav-links">
          <Link to="/privacy-policy" className="nav-link">Privacy Policy</Link>
          <Link to="/terms-of-service" className="nav-link">Terms of Service</Link>
          <Link to="/delete-account" className="nav-link">Delete Account</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 