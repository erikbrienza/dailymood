import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../pages/Auth.css';

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:8080/DailyMood/backend/api/auth/login.php', {
        email,
        password
      });

      if (res.data.success) {
        localStorage.setItem('token', res.data.token);
        setMsg("Login riuscito!");

        setTimeout(() => {
          onLoginSuccess && onLoginSuccess(res.data.token);
          navigate('/mood'); // 👈 vai subito alla dashboard
        }, 1000);
      } else {
        setMsg(res.data.message || 'Credenziali errate');
      }
    } catch (err) {
      setMsg('Errore di connessione');
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-box">
        <h2>Login</h2>
        <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
        <button onClick={handleLogin}>Accedi</button>
        <p>{msg}</p>
      </div>
    </div>
  );
}

export default Login;