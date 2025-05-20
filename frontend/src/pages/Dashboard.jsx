// Dashboard.jsx aggiornato con grafico a barre
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import './Dashboard.css';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';

function Dashboard() {
  const [selectedMood, setSelectedMood] = useState('');
  const [message, setMessage] = useState('');
  const [moods, setMoods] = useState([]);
  const [moodStats, setMoodStats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const moodColors = {
    felice: 'green',
    triste: 'red',
    neutro: 'gray'
  };

  const moodEmoji = {
    felice: '😊',
    triste: '😞',
    neutro: '😐'
  };

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      fetchMoods();
    }
  }, []);

  const fetchMoods = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get('http://localhost:8080/DailyMood/backend/api/moods/list.php', {
        headers: { 'X-Token': token }
      });
      if (res.data.success) {
        setMoods(res.data.moods);

        const counts = {
          felice: 0,
          triste: 0,
          neutro: 0
        };
        res.data.moods.forEach(m => {
          if (counts[m.mood] !== undefined) counts[m.mood]++;
        });
        setMoodStats([
          { name: 'Felice', value: counts.felice },
          { name: 'Triste', value: counts.triste },
          { name: 'Neutro', value: counts.neutro }
        ]);
      }
    } catch (err) {
      console.error('Errore fetch:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const res = await axios.post(
        'http://localhost:8080/DailyMood/backend/api/moods/add.php',
        { mood: selectedMood },
        {
          headers: { 'X-Token': token }
        }
      );
      if (res.data.success) {
        setMessage('Umore salvato!');
        fetchMoods();
      } else {
        setMessage('Errore: ' + res.data.message);
      }
    } catch (err) {
      setMessage('Errore di salvataggio.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <>
      

      <div className="dashboard">
        <h2>Dashboard</h2>
        <label>Seleziona il tuo umore di oggi:</label>
        <select onChange={(e) => setSelectedMood(e.target.value)} value={selectedMood}>
          <option value="">--Scegli--</option>
          <option value="felice">Felice</option>
          <option value="triste">Triste</option>
          <option value="neutro">Neutro</option>
        </select>
        <button onClick={handleSave}>Salva Umore</button>
        {message && <p>{message}</p>}

        <h3>Storico Umori:</h3>
        {isLoading ? (
          <p>Caricamento...</p>
        ) : (
          <div className="mood-list">
            {moods.map((m, index) => (
              <div
                key={index}
                className="mood-block"
                style={{ backgroundColor: moodColors[m.mood] || 'gray' }}
              >
                <span>{m.date}</span>
                <span>{moodEmoji[m.mood]} {m.mood}</span>
              </div>
            ))}
          </div>
        )}

        <h3>Statistiche settimanali</h3>
        <div style={{ width: '100%', maxWidth: 500, height: 300 }}>
          <ResponsiveContainer>
            <BarChart data={moodStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" fill="#26a67c" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}

export default Dashboard;