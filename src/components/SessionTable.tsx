import { motion } from 'framer-motion';
import { SESSIONS, isSessionActive, formatSessionTimeLocal } from '../data/sessions';
import { getTimezoneShort } from '../data/timezone';

interface SessionTableProps {
  now: Date;
}

export function SessionTable({ now }: SessionTableProps) {
  const tzShort = getTimezoneShort(now);

  return (
    <motion.section
      className="table-section"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <h2 className="section-title">
        <span className="section-icon">📋</span>
        Tabela Completa de Horários
      </h2>

      <div className="table-wrapper">
        <table className="sessions-table">
          <thead>
            <tr>
              <th>Sessão</th>
              <th>Horário ({tzShort})</th>
              <th>Características</th>
              <th>Ativos Principais</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {SESSIONS.map(session => {
              const active = isSessionActive(session, now);
              return (
                <tr key={session.id} className={active ? 'row-active' : ''}>
                  <td>
                    <div className="table-session-name">
                      <span
                        className="table-dot"
                        style={{ backgroundColor: session.color }}
                      />
                      <div>
                        <strong>{session.name}</strong>
                        <span className="table-location">{session.location}</span>
                      </div>
                    </div>
                  </td>
                  <td className="table-time">
                    {formatSessionTimeLocal(session, now)}
                  </td>
                  <td>{session.characteristics}</td>
                  <td>{session.assets.join(', ')}</td>
                  <td>
                    {active ? (
                      <span className="table-status-active">
                        <span className="table-status-dot" />
                        Ativa
                      </span>
                    ) : (
                      <span className="table-status-inactive">Inativa</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </motion.section>
  );
}
