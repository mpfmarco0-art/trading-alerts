const TZ = 'Europe/Lisbon';

const hourFormatter = new Intl.DateTimeFormat('pt-PT', { timeZone: TZ, hour: '2-digit', hour12: false });
const minuteFormatter = new Intl.DateTimeFormat('pt-PT', { timeZone: TZ, minute: '2-digit' });
const secondFormatter = new Intl.DateTimeFormat('pt-PT', { timeZone: TZ, second: '2-digit' });
const weekdayFormatter = new Intl.DateTimeFormat('pt-PT', { timeZone: TZ, weekday: 'long' });
const dayFormatter = new Intl.DateTimeFormat('pt-PT', { timeZone: TZ, day: 'numeric' });
const monthFormatter = new Intl.DateTimeFormat('pt-PT', { timeZone: TZ, month: 'long' });
const yearFormatter = new Intl.DateTimeFormat('pt-PT', { timeZone: TZ, year: 'numeric' });
const dayOfWeekFormatter = new Intl.DateTimeFormat('en-US', { timeZone: TZ, weekday: 'short' });

export function getLisbonHours(now: Date): number {
  return parseInt(hourFormatter.format(now), 10);
}

export function getLisbonMinutes(now: Date): number {
  return parseInt(minuteFormatter.format(now), 10);
}

export function getLisbonSeconds(now: Date): number {
  return parseInt(secondFormatter.format(now), 10);
}

export function getLisbonWeekday(now: Date): string {
  const raw = weekdayFormatter.format(now);
  return raw.charAt(0).toUpperCase() + raw.slice(1);
}

export function getLisbonDay(now: Date): number {
  return parseInt(dayFormatter.format(now), 10);
}

export function getLisbonMonth(now: Date): string {
  const raw = monthFormatter.format(now);
  return raw.charAt(0).toUpperCase() + raw.slice(1);
}

export function getLisbonYear(now: Date): number {
  return parseInt(yearFormatter.format(now), 10);
}

export function isLisbonWeekday(now: Date): boolean {
  const day = dayOfWeekFormatter.format(now);
  return day !== 'Sat' && day !== 'Sun';
}

export function getLisbonCurrentMinutes(now: Date): number {
  return getLisbonHours(now) * 60 + getLisbonMinutes(now);
}

export function getUtcOffsetHours(now: Date): number {
  const utcH = now.getUTCHours();
  const lisbonH = getLisbonHours(now);
  let diff = lisbonH - utcH;
  if (diff < -12) diff += 24;
  if (diff > 12) diff -= 24;
  return diff;
}

export function utcHourToLisbon(utcHour: number, utcMinute: number, now: Date): { hour: number; minute: number } {
  const offset = getUtcOffsetHours(now);
  let hour = utcHour + offset;
  const minute = utcMinute;
  if (hour < 0) hour += 24;
  if (hour >= 24) hour -= 24;
  return { hour, minute };
}

export function getTimezoneLabel(now: Date): string {
  const offset = getUtcOffsetHours(now);
  return offset === 0 ? 'WET (UTC+0)' : 'WEST (UTC+1)';
}

export function getTimezoneShort(now: Date): string {
  const offset = getUtcOffsetHours(now);
  return offset === 0 ? 'WET' : 'WEST';
}
