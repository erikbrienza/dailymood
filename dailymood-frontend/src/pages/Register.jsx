import { useState } from "react";
import Navbar from "../components/Navbar";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    fetch("https://erikb79.sg-host.com/backend/register.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    })
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch(() => setMessage("Errore nella registrazione."));
  };

  return (
    <div>
      <Navbar />
      <div className="main-content">
        <h2>Registrazione</h2>
        <form onSubmit={handleRegister}>
          <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
          <button type="submit">Registrati</button>
        </form>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default Register;