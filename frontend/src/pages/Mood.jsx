import { useState, useEffect } from 'react';
import axios from 'axios';
import './Mood.css';

function Mood() {
  const [mood, setMood] = useState('');
  const [msg, setMsg] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setMsg("Accesso non autorizzato.");
      return;
    }

    // (Facoltativo) puoi verificare il token con un endpoint /validate se vuoi
    const decoded = JSON.parse(atob(token.split('.')[1]));
    setUsername(decoded.email);
  }, []);

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.post(
        'http://localhost:8080/DailyMood/backend/api/moods/add.php',
        { mood },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      if (res.data.success) {
        setMsg('Umore salvato con successo!');
        setMood('');
      } else {
        setMsg('Errore nel salvataggio.');
      }
    } catch (err) {
      setMsg('Errore di connessione.');
    }
  };

  return (
    <div className="mood-wrapper">
      <div className="mood-box">
        <h2>Ciao {username.split('@')[0]}, come ti senti oggi?</h2>
        <input
          type="text"
          placeholder="Scrivi il tuo umore"
          value={mood}
          onChange={e => setMood(e.target.value)}
        />
        <button onClick={handleSubmit}>Salva</button>
        <p>{msg}</p>
      </div>
    </div>
  );
}

export default Mood;