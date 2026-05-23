import { motion } from 'framer-motion';
import { isWeekday, SESSIONS, isSessionActive, getNextSessionEvent } from '../data/sessions';
import { getLisbonHours, getLisbonMinutes, getLisbonSeconds, getLisbonWeekday, getLisbonDay, getLisbonMonth, getLisbonYear, getTimezoneLabel } from '../data/timezone';

interface ClockProps {
  now: Date;
}

function formatCountdown(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h > 0) return `${h}h ${m}min`;
  return `${m}min`;
}

export function Clock({ now }: ClockProps) {
  const hours = getLisbonHours(now).toString().padStart(2, '0');
  const minutes = getLisbonMinutes(now).toString().padStart(2, '0');
  const seconds = getLisbonSeconds(now).toString().padStart(2, '0');

  const weekday = getLisbonWeekday(now);
  const day = getLisbonDay(now);
  const month = getLisbonMonth(now);
  const year = getLisbonYear(now);
  const tzLabel = getTimezoneLabel(now);

  const marketsOpen = isWeekday(now);
  const activeSessions = SESSIONS.filter(s => isSessionActive(s, now));
  const nextEvent = getNextSessionEvent(now);

  return (
    <motion.section
      className="clock-section"
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <div className="clock-bg-pattern" />

      <div className="clock-time">
        <span className="clock-digit">{hours[0]}</span>
        <span className="clock-digit">{hours[1]}</span>
        <span className="clock-separator">:</span>
        <span className="clock-digit">{minutes[0]}</span>
        <span className="clock-digit">{minutes[1]}</span>
        <span className="clock-seconds">:{seconds}</span>
      </div>

      <div className="clock-label">
        <span className="clock-label-dot" />
        Hora de Portugal — {tzLabel}
      </div>

      <p className="clock-date">
        {weekday}, {day} de {month} de {year}
      </p>

      {marketsOpen ? (
        <div className="market-status market-open">
          <span className="status-pulse" />
          MERCADOS ABERTOS
          {activeSessions.length > 0 && (
            <span className="active-count">{activeSessions.length} sessão(ões) ativa(s)</span>
          )}
        </div>
      ) : (
        <div className="market-status market-closed">
          <span className="status-icon">🔒</span>
          MERCADOS FECHADOS
          <span className="market-reopen">Os mercados reabrem segunda-feira</span>
        </div>
      )}

      {nextEvent && marketsOpen && (
        <div className="next-event">
          <span className="next-event-label">Próximo evento:</span>
          <span className="next-event-name">
            {nextEvent.session.name} — {nextEvent.type === 'open' ? 'Abertura' : 'Fecho'}
          </span>
          <span className="next-event-countdown">em {formatCountdown(nextEvent.minutesUntil)}</span>
        </div>
      )}
    </motion.section>
  );
}
