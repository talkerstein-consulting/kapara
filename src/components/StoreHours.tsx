import React, { useEffect, useState } from 'react';
import { MapPin } from 'lucide-react';

// index 0=Sun..6=Sat. `close` may exceed 1440 for shifts that cross midnight.
const SCHEDULE: ({ open: number; close: number } | null)[] = [
  { open: 12 * 60, close: 22 * 60 },        // Sun: 12–10 PM
  { open: 12 * 60, close: 22 * 60 },        // Mon: 12–10 PM
  { open: 12 * 60, close: 22 * 60 },        // Tue: 12–10 PM
  { open: 12 * 60, close: 22 * 60 },        // Wed: 12–10 PM
  { open: 12 * 60, close: 22 * 60 },        // Thu: 12–10 PM
  { open: 10 * 60, close: 15 * 60 + 30 },   // Fri: 10 AM–3:30 PM
  { open: 22 * 60, close: 24 * 60 + 30 },   // Sat: 10 PM–12:30 AM
];

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function torontoNow() {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Toronto',
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  }).formatToParts(new Date());
  const map: Record<string, string> = {};
  parts.forEach((p) => { map[p.type] = p.value; });
  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(map.weekday);
  const hour = parseInt(map.hour, 10) % 24;
  const minute = parseInt(map.minute, 10);
  return { day, minutes: hour * 60 + minute };
}

function fmtClock(mins: number) {
  const m = ((mins % 1440) + 1440) % 1440;
  const h = Math.floor(m / 60);
  const min = m % 60;
  const ampm = h >= 12 ? 'PM' : 'AM';
  let h12 = h % 12;
  if (h12 === 0) h12 = 12;
  return `${h12}${min ? ':' + String(min).padStart(2, '0') : ''} ${ampm}`;
}

function fmtDuration(mins: number) {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (h <= 0) return `${m}m`;
  return `${h}h${m ? ' ' + m + 'm' : ''}`;
}

/** Returns the active shift covering `minutes` on `day`, walking back to
 *  yesterday's schedule when it spills past midnight (e.g. Saturday night). */
function getActiveSpan(day: number, minutes: number) {
  const today = SCHEDULE[day];
  if (today) {
    if (today.close <= 1440) {
      if (minutes >= today.open && minutes < today.close) return { close: today.close };
    } else if (minutes >= today.open) {
      return { close: today.close };
    }
  }
  const yestIdx = (day + 6) % 7;
  const yest = SCHEDULE[yestIdx];
  if (yest && yest.close > 1440) {
    const wrapClose = yest.close - 1440;
    if (minutes < wrapClose) return { close: yest.close };
  }
  return null;
}

function nextOpen(day: number, minutes: number) {
  for (let i = 0; i <= 7; i++) {
    const d = (day + i) % 7;
    const sched = SCHEDULE[d];
    if (sched) {
      const startMin = i === 0 ? minutes : -1;
      if (sched.open > startMin) return { daysAhead: i, openAt: sched.open };
    }
  }
  return null;
}

export function StoreHours() {
  const [now, setNow] = useState(torontoNow());

  useEffect(() => {
    const id = setInterval(() => setNow(torontoNow()), 60000);
    return () => clearInterval(id);
  }, []);

  const activeSpan = getActiveSpan(now.day, now.minutes);
  const isOpenNow = !!activeSpan;

  let statusText: string;
  if (isOpenNow) {
    statusText = `Open now · closes at ${fmtClock(activeSpan!.close)}`;
  } else {
    const today = SCHEDULE[now.day];
    if (today && now.minutes < today.open) {
      statusText = `Closed · opens in ${fmtDuration(today.open - now.minutes)}`;
    } else {
      const nxt = nextOpen(now.day, now.minutes);
      if (!nxt) statusText = 'Closed';
      else if (nxt.daysAhead === 1) statusText = `Closed · opens tomorrow at ${fmtClock(nxt.openAt)}`;
      else statusText = `Closed · opens ${DAY_NAMES[(now.day + nxt.daysAhead) % 7]} at ${fmtClock(nxt.openAt)}`;
    }
  }

  return (
    <div id="store-hours-card" className="bg-brand-forest text-brand-cream rounded-lg p-6 md:p-8 shadow-sm w-full h-full">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <h3 className="font-serif font-bold text-xl md:text-2xl tracking-tight">Store Hours</h3>
        <span className="inline-flex items-center gap-2 text-xs font-bold font-sans px-3 py-1.5 rounded-lg bg-white text-brand-espresso">
          <span className="relative inline-flex w-1.5 h-1.5">
            <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping ${isOpenNow ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className={`relative inline-flex w-1.5 h-1.5 rounded-full ${isOpenNow ? 'bg-green-500' : 'bg-red-500'}`} />
          </span>
          {statusText}
        </span>
      </div>

      <a
        href="https://maps.google.com/?q=7700+Bathurst+St+Unit+12+Thornhill+ON+L4J+0A7"
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 text-sm text-brand-cream/70 hover:text-brand-cream transition-colors font-sans mb-6"
      >
        <MapPin className="w-4 h-4 text-brand-gold shrink-0" />
        7700 Bathurst St, Unit 12, Thornhill, ON L4J 0A7
      </a>

      <ul className="flex flex-col gap-1">
        {DAY_NAMES.map((name, idx) => {
          const sched = SCHEDULE[idx];
          const isToday = idx === now.day;
          const hoursLabel = sched
            ? `${fmtClock(sched.open)} – ${fmtClock(sched.close)}`
            : 'Closed';
          return (
            <li
              key={name}
              className={`flex items-center justify-between gap-3 px-3 py-2 rounded-lg text-sm font-sans ${
                isToday ? 'bg-white/10' : ''
              }`}
            >
              <span className="flex items-center gap-2 font-semibold">
                {name}
                {isToday && (
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-lg bg-white text-brand-espresso">
                    <span className="relative inline-flex w-1.5 h-1.5">
                      <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping ${isOpenNow ? 'bg-green-500' : 'bg-red-500'}`} />
                      <span className={`relative inline-flex w-1.5 h-1.5 rounded-full ${isOpenNow ? 'bg-green-500' : 'bg-red-500'}`} />
                    </span>
                    {isOpenNow ? 'Open now' : 'Closed'}
                  </span>
                )}
              </span>
              <span className="text-brand-cream/70">{hoursLabel}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
