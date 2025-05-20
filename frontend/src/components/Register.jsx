import { useState } from 'react';
import axios from 'axios';
import "../pages/Auth.css";

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    try {
      const res = await axios.post('http://localhost:8080/DailyMood/backend/api/auth/register.php', {
        name,
        email,
        password
      });

      if (res.data.success) {
        setMessage('Registrazione avvenuta con successo! Puoi ora effettuare il login.');
      } else {
        setMessage(res.data.message || 'Errore durante la registrazione.');
      }
    } catch (err) {
      setMessage('Errore di connessione al server.');
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-box">
        <h2>Registrati</h2>
        <input type="text" placeholder="Nome" onChange={e => setName(e.target.value)} />
        <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
        <button onClick={handleRegister}>Registrati</button>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default Register;