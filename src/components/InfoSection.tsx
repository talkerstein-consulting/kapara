import React from 'react';
import { ArrowRight, Sparkles, Flame, PartyPopper } from 'lucide-react';
import { motion } from 'motion/react';

interface InfoSectionProps {
  onDiscover: () => void;
}

export function InfoSection({ onDiscover }: InfoSectionProps) {
  return (
    <section id="menu" className="bg-brand-cream px-6 py-24">
      <div className="max-w-[88rem] mx-auto">
        {/* Row 1: Dual column introduction */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-start">
          <div className="flex flex-col items-start">
            <span className="text-brand-gold text-xs font-bold tracking-widest uppercase mb-3 block font-sans">
              Our Values
            </span>
            <h2
              id="info-title"
              className="text-brand-espresso text-4xl md:text-5xl font-serif font-bold leading-tight mb-8"
              style={{ letterSpacing: '-0.02em' }}
            >
              More Than a Restaurant.
            </h2>
            <button
              id="btn-discover"
              onClick={onDiscover}
              className="inline-flex items-center gap-3 bg-brand-forest text-brand-cream text-base font-semibold pl-6 pr-2 py-2 rounded-lg hover:bg-white hover:text-brand-forest transition-all duration-200 cursor-pointer shadow-md hover:shadow-lg group"
            >
              Estimate Event Catering
              <span className="bg-brand-cream rounded-full p-1.5 transition-all duration-300 group-hover:translate-x-1 group-hover:bg-brand-forest">
                <ArrowRight className="w-4 h-4 text-brand-espresso transition-colors duration-300 group-hover:text-white" />
              </span>
            </button>
          </div>

          <div>
            <p
              id="info-description-text"
              className="text-brand-espresso/85 text-2xl md:text-3xl leading-relaxed font-serif"
            >
              Our menu is a love letter to Israel's street food scene, with everything made fresh and packed with flavor.
            </p>
          </div>
        </div>

        {/* Row 2: 3-column card grid */}
        <div id="cards-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1 (spans 2 cols on lg) */}
          <div
            id="info-card-bloom"
            className="rounded-lg lg:col-span-2 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between p-7 min-h-80 relative group"
            style={{
              backgroundImage: 'url("/home/kapara-food-celebration.webp")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Ambient overlay to protect text contrast */}
            <div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-black/80 pointer-events-none group-hover:bg-black/15 transition-colors duration-300" />

            <div className="relative z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-cream/90 backdrop-blur-md text-brand-espresso shadow-xs mb-4">
                <Sparkles className="w-3.5 h-3.5 text-brand-gold" /> Community
              </span>
              <h3
                className="kp-card-title text-2xl"
                style={{ letterSpacing: '-0.01em' }}
              >
                A Gathering Place
              </h3>
            </div>

            <div className="relative z-10">
              <p className="text-brand-cream/90 text-base max-w-sm leading-relaxed font-sans">
                More than a restaurant, Kapara is a gathering place — a warm room built for family, friends, and neighbours to come together over great food.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div
            id="info-card-fluid"
            className="rounded-lg p-7 min-h-80 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-2px] group relative overflow-hidden"
            style={{
              backgroundImage: 'url("/menu/kebab.webp")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Dark overlay for text legibility */}
            <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/45 to-black/80 pointer-events-none group-hover:from-black/45 group-hover:via-black/35 transition-colors duration-300" />

            <div className="relative z-10">
              <div className="kp-icon-badge mb-4 transition-transform duration-500 group-hover:rotate-12">
                <Flame className="w-8 h-8" />
              </div>
              <h3 className="kp-card-title text-2xl">
                Flavor
              </h3>
            </div>
            <div className="relative z-10">
              <p className="text-brand-cream/90 text-sm leading-relaxed font-sans">
                Big, bold, and unforgettable. Flame-grilled skewers, golden schnitzels, and creamy house-made hummus, inspired by the food markets of Israel.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div
            id="info-card-automated"
            className="rounded-lg p-7 min-h-80 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-2px] group relative overflow-hidden"
            style={{
              backgroundImage: 'url("/menu/loaded-fries.webp")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Dark overlay for text legibility */}
            <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/45 to-black/80 pointer-events-none group-hover:from-black/45 group-hover:via-black/35 transition-colors duration-300" />

            <div className="relative z-10">
              <div className="kp-icon-badge mb-4 transition-transform duration-500 group-hover:scale-110">
                <PartyPopper className="w-8 h-8" />
              </div>
              <h3 className="kp-card-title text-2xl">
                Fun
              </h3>
            </div>
            <div className="relative z-10">
              <p className="text-brand-cream/90 text-sm leading-relaxed font-sans">
                Casual vibes with serious eats. Come for the food, stay for the vibe — a taste of Israel, right here in Toronto.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
