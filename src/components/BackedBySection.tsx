import React, { useRef } from 'react';

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
    <section id="backed-by-section" className="bg-brand-cream px-6 py-12 border-t border-b border-gray-200/50">
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

      <div className="max-w-[88rem] mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 items-center">
        {/* Left column (1/4) */}
        <h2 id="backed-by-text" className="text-brand-espresso text-2xl md:text-3xl leading-tight font-serif font-bold md:pr-4 tracking-tight">
          100% COR Kosher Certified Meat
          <br />
          High Quality, Pristine Standards.
        </h2>

        {/* Right column (3/4) */}
        <div
          id="backed-by-marquee-container"
          className="md:col-span-3 overflow-hidden select-none relative w-full"
          onMouseEnter={() => setMarqueeSpeed(0.15)}
          onMouseLeave={() => setMarqueeSpeed(1)}
        >
          {/* Subtle horizontal blur mask to blend edges smoothly */}
          <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-brand-cream to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-brand-cream to-transparent z-10 pointer-events-none" />

          <div ref={trackRef} className="backers-track">
            {/* First render of standards list */}
            {standards.map((name, idx) => (
              <span
                key={`standard-1-${idx}`}
                className="shrink-0 inline-flex items-center text-brand-gold hover:text-brand-espresso transition-colors duration-200 cursor-default whitespace-nowrap font-sans font-bold text-sm tracking-widest uppercase"
              >
                {name}
                <span className="mx-8 text-brand-espresso/30 text-sm" aria-hidden="true">✦</span>
              </span>
            ))}
            {/* Second render of standards list for seamless looping */}
            {standards.map((name, idx) => (
              <span
                key={`standard-2-${idx}`}
                className="shrink-0 inline-flex items-center text-brand-gold hover:text-brand-espresso transition-colors duration-200 cursor-default whitespace-nowrap font-sans font-bold text-sm tracking-widest uppercase"
              >
                {name}
                <span className="mx-8 text-brand-espresso/30 text-sm" aria-hidden="true">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
