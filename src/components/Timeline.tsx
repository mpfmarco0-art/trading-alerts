import { motion } from 'framer-motion';
import { SESSIONS } from '../data/sessions';

interface TimelineProps {
  now: Date;
}

const TOTAL_MINUTES = 24 * 60;

export function Timeline({ now }: TimelineProps) {
  const currentMinutes = now.getUTCHours() * 60 + now.getUTCMinutes();
  const nowPercent = (currentMinutes / TOTAL_MINUTES) * 100;

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
        Timeline 24H (UTC)
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
            const startPercent = ((session.startHour * 60 + session.startMinute) / TOTAL_MINUTES) * 100;
            const endPercent = ((session.endHour * 60 + session.endMinute) / TOTAL_MINUTES) * 100;
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
                title={`${session.name}: ${session.startHour.toString().padStart(2, '0')}:${session.startMinute.toString().padStart(2, '0')} - ${session.endHour.toString().padStart(2, '0')}:${session.endMinute.toString().padStart(2, '0')}`}
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
              {now.getUTCHours().toString().padStart(2, '0')}:{now.getUTCMinutes().toString().padStart(2, '0')}
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
