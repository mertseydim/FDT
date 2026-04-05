import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const username = localStorage.getItem('username');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <nav style={{ backgroundColor: '#007bff', padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '20px', fontWeight: 'bold' }}>
        SosyalForum
      </Link>
      <div>
        {token ? (
          <>
            <Link to={`/profile/${userId}`} style={{ color: 'white', textDecoration: 'none', marginRight: '15px' }}>
              {username}
            </Link>
            <button onClick={handleLogout} style={{ padding: '5px 15px', backgroundColor: 'white', color: '#007bff', border: 'none', cursor: 'pointer' }}>
              Çıkış
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: 'white', textDecoration: 'none', marginRight: '15px' }}>
              Giriş Yap
            </Link>
            <Link to="/register" style={{ color: 'white', textDecoration: 'none' }}>
              Kayıt Ol
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;