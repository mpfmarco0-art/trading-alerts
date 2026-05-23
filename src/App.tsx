import { Header } from './components/Header';
import { Clock } from './components/Clock';
import { AlertControls } from './components/AlertControls';
import { Timeline } from './components/Timeline';
import { SessionCard } from './components/SessionCard';
import { SessionTable } from './components/SessionTable';
import { Footer } from './components/Footer';
import { useClock } from './hooks/useClock';
import { useSound } from './hooks/useSound';
import { SESSIONS } from './data/sessions';
import './App.css';

function App() {
  const now = useClock();
  const { soundEnabled, setSoundEnabled, playOpenSound, playCloseSound } = useSound();

  return (
    <div className="app">
      <div className="bg-grid" />
      <div className="bg-glow bg-glow-1" />
      <div className="bg-glow bg-glow-2" />

      <Header
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(prev => !prev)}
      />

      <main className="main">
        <Clock now={now} />

        <AlertControls onTestOpen={playOpenSound} onTestClose={playCloseSound} />

        <Timeline now={now} />

        <section className="sessions-section">
          <h2 className="section-title">
            <span className="section-icon">🎯</span>
            Sessões de Trading
          </h2>
          <div className="sessions-grid">
            {SESSIONS.map((session, i) => (
              <SessionCard key={session.id} session={session} now={now} index={i} />
            ))}
          </div>
        </section>

        <SessionTable now={now} />
      </main>

      <Footer />
    </div>
  );
}

export default App;
