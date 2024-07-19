import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const linkStyle = {
    marginRight: '10px',
    textDecoration: 'none',
    color: 'black',
  };

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-around' }}>
      <Link to="/" style={linkStyle}>
        Home
      </Link>
      <Link to="/search" style={linkStyle}>
        Search
      </Link>
      <Link to="/profile" style={linkStyle}>
        Profile
      </Link>
      <Link to="/booking" style={linkStyle}>
        Booking
      </Link>
      <Link to="/review" style={linkStyle}>
        Review
      </Link>
      <Link to="/payment" style={linkStyle}>
        Payment
      </Link>
      <Link to="/map" style={linkStyle}>
        Map
      </Link>
      <Link to="/deals" style={linkStyle}>
        Deals
      </Link>
      <Link to="/notifications" style={linkStyle}>
        Notifications
      </Link>
      <Link to="/login" style={linkStyle}>
        Login
      </Link>
      <Link to="/register" style={linkStyle}>
        Register
      </Link>
    </nav>
  );
};

export default Navbar;
