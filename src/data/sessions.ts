export interface TradingSession {
  id: string;
  name: string;
  location: string;
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
  characteristics: string;
  assets: string[];
  color: string;
  colorRgb: string;
  icon: string;
}

export const SESSIONS: TradingSession[] = [
  {
    id: 'asiatica',
    name: 'Asiática',
    location: 'Austrália, Tóquio',
    startHour: 0,
    startMinute: 0,
    endHour: 9,
    endMinute: 0,
    characteristics: 'Baixa volatilidade, consolidação',
    assets: ['JPY', 'AUD', 'NZD'],
    color: '#ef4444',
    colorRgb: '239, 68, 68',
    icon: '🌏',
  },
  {
    id: 'europeia',
    name: 'Europeia',
    location: 'Londres',
    startHour: 8,
    startMinute: 0,
    endHour: 17,
    endMinute: 30,
    characteristics: 'Alta liquidez e volatilidade',
    assets: ['EUR', 'GBP', 'CHF'],
    color: '#22c55e',
    colorRgb: '34, 197, 94',
    icon: '🌍',
  },
  {
    id: 'americana',
    name: 'Americana',
    location: 'Nova Iorque',
    startHour: 14,
    startMinute: 30,
    endHour: 22,
    endMinute: 0,
    characteristics: 'Volatilidade por dados macro',
    assets: ['USD', 'Índices EUA', 'Ouro'],
    color: '#3b82f6',
    colorRgb: '59, 130, 246',
    icon: '🌎',
  },
  {
    id: 'solapamento',
    name: 'Solapamento LND-NY',
    location: 'Londres + Nova Iorque',
    startHour: 14,
    startMinute: 30,
    endHour: 17,
    endMinute: 30,
    characteristics: 'Máxima liquidez e volatilidade',
    assets: ['Pares maiores', 'Índices'],
    color: '#f59e0b',
    colorRgb: '245, 158, 11',
    icon: '⚡',
  },
];

export function getSessionDurationMinutes(session: TradingSession): number {
  const startMinutes = session.startHour * 60 + session.startMinute;
  const endMinutes = session.endHour * 60 + session.endMinute;
  return endMinutes - startMinutes;
}

export function isSessionActive(session: TradingSession, now: Date): boolean {
  const currentMinutes = now.getUTCHours() * 60 + now.getUTCMinutes();
  const startMinutes = session.startHour * 60 + session.startMinute;
  const endMinutes = session.endHour * 60 + session.endMinute;
  return currentMinutes >= startMinutes && currentMinutes < endMinutes;
}

export function getSessionProgress(session: TradingSession, now: Date): number {
  const currentMinutes = now.getUTCHours() * 60 + now.getUTCMinutes();
  const startMinutes = session.startHour * 60 + session.startMinute;
  const endMinutes = session.endHour * 60 + session.endMinute;
  const duration = endMinutes - startMinutes;
  const elapsed = currentMinutes - startMinutes;
  if (elapsed < 0) return 0;
  if (elapsed >= duration) return 100;
  return (elapsed / duration) * 100;
}

export function isWeekday(now: Date): boolean {
  const day = now.getUTCDay();
  return day >= 1 && day <= 5;
}

export function getNextSessionEvent(now: Date): { session: TradingSession; type: 'open' | 'close'; minutesUntil: number } | null {
  if (!isWeekday(now)) return null;

  const currentMinutes = now.getUTCHours() * 60 + now.getUTCMinutes();

  let closest: { session: TradingSession; type: 'open' | 'close'; minutesUntil: number } | null = null;

  for (const session of SESSIONS) {
    const startMinutes = session.startHour * 60 + session.startMinute;
    const endMinutes = session.endHour * 60 + session.endMinute;

    if (currentMinutes < startMinutes) {
      const diff = startMinutes - currentMinutes;
      if (!closest || diff < closest.minutesUntil) {
        closest = { session, type: 'open', minutesUntil: diff };
      }
    }

    if (currentMinutes < endMinutes) {
      const diff = endMinutes - currentMinutes;
      if (!closest || diff < closest.minutesUntil) {
        closest = { session, type: 'close', minutesUntil: diff };
      }
    }
  }

  return closest;
}

export function formatTime(hour: number, minute: number): string {
  return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
}
