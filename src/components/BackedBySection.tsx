import React, { useRef } from 'react';
import { motion } from 'motion/react';

export function BackedBySection() {
  const trackRef = useRef<HTMLDivElement>(null);

  // Same approach as the hero marquee: a plain CSS animation that keeps
  // scrolling smoothly, slowed via the Web Animations API's `playbackRate`
  // on hover (continuous, no position jump) instead of pausing outright.
  const setMarqueeSpeed = (rate: number) => {
    const track = trackRef.current;
    if (!track) return;
    for (const anim of track.getAnimations()) {
      anim.playbackRate = rate;
    }
  };

  const standards = [
    'COR KOSHER CERTIFIED MEAT',
    'FLAME-GRILLED HOURLY',
    'OPEN CHARCOAL FIRE',
    'HOUSE-MADE MARINADES',
    'TRADITIONAL RECIPES',
    'FRESH MEDITERRANEAN HERBS',
    'LOCAL THORNHILL SOURCE',
    'CRISPY TO ORDER',
  ];

  return (
    <section
      id="backed-by-section"
      className="relative w-full bg-[#60745B] border-y border-white/15 py-8 overflow-hidden select-none"
    >
      <style>{`
        @keyframes backers-marquee {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        .backers-track {
          display: flex;
          width: max-content;
          animation: backers-marquee 30s linear infinite;
        }
      `}</style>

      <div className="max-w-[88rem] mx-auto px-6 flex flex-col gap-4">
        {/* Title: kept compact, single line on desktop */}
        <motion.h2
          id="backed-by-text"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-white text-xl md:text-2xl leading-tight font-serif font-bold tracking-tight text-center"
        >
          100% COR Kosher Certified Meat — High Quality, Pristine Standards.
        </motion.h2>

        {/* Marquee */}
        <div
          id="backed-by-marquee-container"
          className="relative w-full overflow-hidden"
          onMouseEnter={() => setMarqueeSpeed(0.15)}
          onMouseLeave={() => setMarqueeSpeed(1)}
        >
          {/* Edge fade overlays */}
          <div className="absolute inset-y-0 left-0 w-16 md:w-28 bg-linear-to-r from-[#60745B] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 md:w-28 bg-linear-to-l from-[#60745B] to-transparent z-10 pointer-events-none" />

          <div ref={trackRef} className="backers-track">
            {/* First render of standards list */}
            {standards.map((name, idx) => (
              <span
                key={`standard-1-${idx}`}
                className="shrink-0 inline-flex items-center text-white/75 hover:text-white transition-colors duration-200 cursor-default whitespace-nowrap font-sans font-bold text-sm tracking-widest uppercase"
              >
                {name}
                <span className="mx-8 text-brand-cream text-sm" aria-hidden="true">✦</span>
              </span>
            ))}
            {/* Second render of standards list for seamless looping */}
            {standards.map((name, idx) => (
              <span
                key={`standard-2-${idx}`}
                className="shrink-0 inline-flex items-center text-white/75 hover:text-white transition-colors duration-200 cursor-default whitespace-nowrap font-sans font-bold text-sm tracking-widest uppercase"
              >
                {name}
                <span className="mx-8 text-brand-cream text-sm" aria-hidden="true">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
