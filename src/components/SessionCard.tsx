import { motion } from 'framer-motion';
import { Clock, Activity } from 'lucide-react';
import type { TradingSession } from '../data/sessions';
import { isSessionActive, getSessionProgress, getSessionDurationMinutes, formatTime } from '../data/sessions';

interface SessionCardProps {
  session: TradingSession;
  now: Date;
  index: number;
}

export function SessionCard({ session, now, index }: SessionCardProps) {
  const active = isSessionActive(session, now);
  const progress = getSessionProgress(session, now);
  const duration = getSessionDurationMinutes(session);

  return (
    <motion.div
      className={`session-card ${active ? 'session-card-active' : ''}`}
      style={{
        '--session-color': session.color,
        '--session-rgb': session.colorRgb,
      } as React.CSSProperties}
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <div className="session-card-glow" />

      <div className="session-card-header">
        <div className="session-card-title-row">
          <span className="session-card-icon">{session.icon}</span>
          <div>
            <h3 className="session-card-name">{session.name}</h3>
            <p className="session-card-location">{session.location}</p>
          </div>
        </div>
        {active && (
          <motion.div
            className="session-live-badge"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 500 }}
          >
            <span className="live-dot" />
            LIVE
          </motion.div>
        )}
      </div>

      <div className="session-card-time">
        <Clock size={14} />
        <span className="session-time-range">
          {formatTime(session.startHour, session.startMinute)} – {formatTime(session.endHour, session.endMinute)}
        </span>
        <span className="session-duration">{duration} min</span>
      </div>

      {active && (
        <div className="session-progress">
          <div className="session-progress-bar">
            <motion.div
              className="session-progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1 }}
            />
          </div>
          <span className="session-progress-text">{Math.round(progress)}%</span>
        </div>
      )}

      <div className="session-card-details">
        <div className="session-detail">
          <Activity size={14} />
          <span>{session.characteristics}</span>
        </div>
      </div>

      <div className="session-card-assets">
        {session.assets.map(asset => (
          <span key={asset} className="asset-tag">{asset}</span>
        ))}
      </div>
    </motion.div>
  );
}
