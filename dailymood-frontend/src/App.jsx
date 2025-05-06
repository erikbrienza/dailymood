import Navbar from "./components/Navbar";
function App() {
  return (
    <div>
      <Navbar />

      {/* HERO SECTION */}
      <div className="hero-section" style={{ position: "relative", minHeight: "80vh" }}>
        <div
          style={{
            backgroundImage: "url('/mood_hero.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            filter: "brightness(0.7)",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 1
          }}
        ></div>

        <div 
          style={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            color: "white",
            textAlign: "center",
            padding: "20px"
          }}
        >
          <h1 style={{ fontSize: "3em", marginBottom: "10px" }}>
            DailyMood
          </h1>
          <p style={{ fontSize: "1.3em", maxWidth: "600px" }}>
            Traccia il tuo umore giorno per giorno e scopri il tuo benessere nel tempo.
          </p>
        </div>
      </div>

      {/* ABOUT SECTION */}
      <section 
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "50px 20px",
          textAlign: "center",
          color: "var(--text-color)"
        }}
      >
        <h2 style={{ fontSize: "2em", marginBottom: "20px" }}>
          Perché scegliere DailyMood?
        </h2>
        <p style={{ fontSize: "1.2em", lineHeight: "1.6" }}>
          DailyMood ti aiuta a monitorare il tuo stato d’animo giorno dopo giorno, 
          offrendoti una panoramica semplice ma potente del tuo benessere emotivo. 
          Grazie al nostro approccio intuitivo puoi identificare pattern, riflettere sui tuoi progressi 
          e migliorare la tua consapevolezza interiore.
        </p>
      </section>
    </div>
  );
}

export default App;