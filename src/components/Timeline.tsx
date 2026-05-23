import { motion } from 'framer-motion';
import { SESSIONS, getSessionLocalTimes } from '../data/sessions';
import { getLisbonHours, getLisbonMinutes, getTimezoneShort } from '../data/timezone';

interface TimelineProps {
  now: Date;
}

const TOTAL_MINUTES = 24 * 60;

export function Timeline({ now }: TimelineProps) {
  const currentMinutes = getLisbonHours(now) * 60 + getLisbonMinutes(now);
  const nowPercent = (currentMinutes / TOTAL_MINUTES) * 100;
  const tzShort = getTimezoneShort(now);

  const hours = [0, 3, 6, 9, 12, 15, 18, 21];

  return (
    <motion.section
      className="timeline-section"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h2 className="section-title">
        <span className="section-icon">📊</span>
        Timeline 24H ({tzShort})
      </h2>

      <div className="timeline-container">
        <div className="timeline-hours">
          {hours.map(h => (
            <span
              key={h}
              className="timeline-hour"
              style={{ left: `${(h / 24) * 100}%` }}
            >
              {h.toString().padStart(2, '0')}:00
            </span>
          ))}
          <span className="timeline-hour" style={{ left: '100%' }}>24:00</span>
        </div>

        <div className="timeline-track">
          {SESSIONS.map((session, i) => {
            const { start, end } = getSessionLocalTimes(session, now);
            const startPercent = ((start.hour * 60 + start.minute) / TOTAL_MINUTES) * 100;
            const endPercent = ((end.hour * 60 + end.minute) / TOTAL_MINUTES) * 100;
            const width = endPercent - startPercent;

            return (
              <motion.div
                key={session.id}
                className="timeline-bar"
                style={{
                  left: `${startPercent}%`,
                  width: `${width}%`,
                  top: `${i * 14}px`,
                  backgroundColor: session.color,
                  opacity: 0.85,
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                title={`${session.name}: ${start.hour.toString().padStart(2, '0')}:${start.minute.toString().padStart(2, '0')} - ${end.hour.toString().padStart(2, '0')}:${end.minute.toString().padStart(2, '0')}`}
              >
                <span className="timeline-bar-label">{session.name}</span>
              </motion.div>
            );
          })}

          <div
            className="timeline-now"
            style={{ left: `${nowPercent}%` }}
          >
            <div className="timeline-now-line" />
            <span className="timeline-now-label">
              {getLisbonHours(now).toString().padStart(2, '0')}:{getLisbonMinutes(now).toString().padStart(2, '0')}
            </span>
          </div>
        </div>

        <div className="timeline-legend">
          {SESSIONS.map(session => (
            <div key={session.id} className="timeline-legend-item">
              <span className="timeline-legend-dot" style={{ backgroundColor: session.color }} />
              {session.name}
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
