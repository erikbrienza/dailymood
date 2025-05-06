import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    fetch("https://erikb79.sg-host.com/backend/register.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user_id) {
          localStorage.setItem("user_id", data.user_id);
          navigate("/dashboard");
        } else {
          setMessage(data.message);
        }
      })
      .catch(() => setMessage("Errore nel login."));
  };

  return (
    <div>
      <Navbar />
      <div className="main-content">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
          <button type="submit">Login</button>
        </form>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default Login;