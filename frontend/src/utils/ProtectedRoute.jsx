import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" />;
  }

  // Decodifica base per controllare la scadenza
  const payload = JSON.parse(atob(token.split('.')[1]));
  const now = Math.floor(Date.now() / 1000);

  if (payload.exp < now) {
    localStorage.removeItem('token'); // pulizia
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;