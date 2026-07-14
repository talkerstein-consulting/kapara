// Single source of truth for business info shared across the whole site
// (Store Hours widget, Footer, Location page, Instagram gallery). Update
// values here and every page picks it up automatically — nothing about
// hours, address, or social links should be hardcoded elsewhere.

export const INSTAGRAM_URL = 'https://www.instagram.com/kaparatoronto/?hl=en';
export const TIKTOK_URL = 'https://www.tiktok.com/@kaparatoronto';

export const ADDRESS_LINE = '7700 Bathurst St, Unit 12, Thornhill, ON L4J 0A7';
export const GOOGLE_MAPS_DIRECTIONS_URL =
  'https://maps.google.com/?q=7700+Bathurst+St+Unit+12+Thornhill+ON+L4J+0A7';

export interface DaySchedule {
  open: number;
  close: number;
}

// index 0=Sun..6=Sat. `close` may exceed 1440 for shifts that cross midnight.
export const SCHEDULE: (DaySchedule | null)[] = [
  { open: 12 * 60, close: 22 * 60 },        // Sun: 12–10 PM
  { open: 12 * 60, close: 22 * 60 },        // Mon: 12–10 PM
  { open: 12 * 60, close: 22 * 60 },        // Tue: 12–10 PM
  { open: 12 * 60, close: 22 * 60 },        // Wed: 12–10 PM
  { open: 12 * 60, close: 22 * 60 },        // Thu: 12–10 PM
  { open: 10 * 60, close: 15 * 60 + 30 },   // Fri: 10 AM–3:30 PM
  { open: 22 * 60, close: 24 * 60 + 30 },   // Sat: 10 PM–12:30 AM
];

export const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function fmtClock(mins: number): string {
  const m = ((mins % 1440) + 1440) % 1440;
  const h = Math.floor(m / 60);
  const min = m % 60;
  const ampm = h >= 12 ? 'PM' : 'AM';
  let h12 = h % 12;
  if (h12 === 0) h12 = 12;
  return `${h12}${min ? ':' + String(min).padStart(2, '0') : ''} ${ampm}`;
}

/** e.g. "12 PM – 10 PM" / "Closed" for a given day index (0=Sun..6=Sat). */
export function scheduleLabel(dayIndex: number): string {
  const sched = SCHEDULE[dayIndex];
  return sched ? `${fmtClock(sched.open)} – ${fmtClock(sched.close)}` : 'Closed';
}
