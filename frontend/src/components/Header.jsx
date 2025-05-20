import { useNavigate } from 'react-router-dom';

function Header({ isLoggedIn, onLogout }) {
  return (
    <header className="header">
      <div className="logo">DailyMood</div>
      <nav className="nav">
        {isLoggedIn ? (
          <button onClick={onLogout}>Logout</button>
        ) : (
          <>
            <a href="/login"><button>Login</button></a>
            <a href="/register"><button>Registrati</button></a>
          </>
        )}
      </nav>
    </header>
  );
}

const btnStyle = {
  marginLeft: '8px',
  background: 'white',
  color: '#004d40',
  border: 'none',
  padding: '8px 16px',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: 'bold'
};

export default Header;