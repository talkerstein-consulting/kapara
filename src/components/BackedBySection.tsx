import React from 'react';

export function BackedBySection() {
  const standards = [
    { name: 'COR KOSHER CERTIFIED MEAT', style: { fontFamily: "'Inria Serif', serif", fontWeight: 700, letterSpacing: '0.04em', fontSize: '15px' } },
    { name: 'FLAME-GRILLED HOURLY', style: { fontFamily: 'sans-serif', fontWeight: 600, letterSpacing: '0.08em', fontSize: '13px' } },
    { name: 'OPEN CHARCOAL FIRE', style: { fontFamily: 'monospace', fontWeight: 500, letterSpacing: '0.1em', fontSize: '13px' } },
    { name: 'HOUSE-MADE MARINADES', style: { fontFamily: "'Inria Serif', serif", fontWeight: 700, letterSpacing: '0.04em', fontSize: '15px' } },
    { name: 'TRADITIONAL RECIPES', style: { fontFamily: 'sans-serif', fontWeight: 600, letterSpacing: '0.08em', fontSize: '13px' } },
    { name: 'FRESH MEDITERRANEAN HERBS', style: { fontFamily: 'monospace', fontWeight: 500, letterSpacing: '0.1em', fontSize: '13px' } },
    { name: 'LOCAL THORNHILL SOURCE', style: { fontFamily: "'Inria Serif', serif", fontWeight: 700, letterSpacing: '0.04em', fontSize: '15px' } },
    { name: 'CRISPY TO ORDER', style: { fontFamily: 'sans-serif', fontWeight: 600, letterSpacing: '0.08em', fontSize: '13px' } },
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
        .backers-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-[88rem] mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 items-center">
        {/* Left column (1/4) */}
        <div id="backed-by-text" className="text-brand-espresso/80 text-base leading-relaxed font-serif font-bold md:pr-4">
          100% COR Kosher Certified Meat
          <br />
          High Quality, Pristine Standards.
        </div>

        {/* Right column (3/4) */}
        <div id="backed-by-marquee-container" className="md:col-span-3 overflow-hidden select-none relative w-full">
          {/* Subtle horizontal blur mask to blend edges smoothly */}
          <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-brand-cream to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-brand-cream to-transparent z-10 pointer-events-none" />

          <div className="backers-track">
            {/* First render of standards list */}
            {standards.map((standard, idx) => (
              <span
                key={`standard-1-${idx}`}
                className="mx-10 shrink-0 text-brand-gold hover:text-brand-espresso transition-colors duration-200 cursor-default whitespace-nowrap align-middle self-center font-semibold"
                style={standard.style}
              >
                {standard.name}
              </span>
            ))}
            {/* Second render of standards list for seamless looping */}
            {standards.map((standard, idx) => (
              <span
                key={`standard-2-${idx}`}
                className="mx-10 shrink-0 text-brand-gold hover:text-brand-espresso transition-colors duration-200 cursor-default whitespace-nowrap align-middle self-center font-semibold"
                style={standard.style}
              >
                {standard.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
