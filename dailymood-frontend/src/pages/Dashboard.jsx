import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Dashboard() {
  const navigate = useNavigate();
  const user_id = localStorage.getItem("user_id");

  const [mood, setMood] = useState("");
  const [message, setMessage] = useState("");
  const [moodsList, setMoodsList] = useState([]);

  useEffect(() => {
    if (!user_id) {
      localStorage.removeItem("user_id");
      navigate("/login");
    } else {
      fetchMoods();
    }
  }, []);

  const handleSaveMood = (e) => {
    e.preventDefault();

    fetch("https://erikb79.sg-host.com/backend/register.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id, mood }),
    })
      .then((res) => res.json())
      .then((data) => {
        setMessage(data.message);
        fetchMoods();
      })
      .catch(() => setMessage("Errore nel salvataggio."));
  };

  const fetchMoods = () => {
    fetch("http://localhost:8888/dailymood/backend/getMoods.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id }),
    })
      .then((res) => res.json())
      .then((data) => {
        setMoodsList(data);
      })
      .catch((err) => console.error("Errore nel recupero umori:", err));
  };

  return (
    <div>
      <Navbar />
      <div className="dashboard-content">
        <h2>Dashboard</h2>

        <form onSubmit={handleSaveMood}>
          <label>Seleziona il tuo umore di oggi:</label>
          <select value={mood} onChange={(e) => setMood(e.target.value)} required>
            <option value="">--Scegli--</option>
            <option value="felice">😊 Felice</option>
            <option value="neutro">😐 Neutro</option>
            <option value="triste">😢 Triste</option>
          </select>
          <button type="submit">Salva Umore</button>
        </form>

        <p>{message}</p>

        <h3>Storico Umori:</h3>
        <ul>
          {moodsList.length > 0 ? (
            moodsList.map((item, index) => {
              let moodClass = "";
              let moodIcon = "";
              if (item.mood === "felice") {
                moodClass = "mood-card mood-felice";
                moodIcon = "😊";
              } else if (item.mood === "neutro") {
                moodClass = "mood-card mood-neutro";
                moodIcon = "😐";
              } else if (item.mood === "triste") {
                moodClass = "mood-card mood-triste";
                moodIcon = "😢";
              }

              const isToday = index === moodsList.length - 1;

              return (
                <li key={index} className={moodClass}>
                  <span>
                    {item.date} {isToday && <span className="badge-today">Oggi</span>}
                  </span>
                  <span>{moodIcon} {item.mood}</span>
                </li>
              );
            })
          ) : (
            <li>Nessun umore registrato.</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;