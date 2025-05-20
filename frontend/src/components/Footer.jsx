import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} DailyMood — Tutti i diritti riservati</p>
    </footer>
  );
}

export default Footer;