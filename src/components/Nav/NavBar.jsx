import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate hook
import './NavBar.css'; // Assuming you have a CSS file for styling
import logo from '../../assets/apple-touch-icon-removebg-preview.png';
const NavBar = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleLogout = () => {
    console.log("working")
    localStorage.removeItem('art_user');
    navigate('/login'); // Navigate to the login page using navigate function
  };

  return (
    <div className="container">
      <nav className="navbar">
        <ul className="nav--list">
        <li className="item"><Link to="/"><img src={logo} alt="Logo" /></Link></li>
          <li className="item"><Link to="/artworks">Artworks</Link></li>
          <li className="item"><Link to="/artists">Artists</Link></li>
          <li className="item"><Link to="/my-works">My Works</Link></li>
          <li className="item"><Link to="/new-listing">New Listing</Link></li>
          <li className="item"><Link to="/cart">Cart</Link></li>
          <li className="item"><a className="logout-link" onClick={handleLogout}>Logout</a></li>

        </ul>
      </nav>
    </div>
  );
};

export default NavBar;


