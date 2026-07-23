import React from 'react';
import { Flame, PartyPopper } from 'lucide-react';
import { motion } from 'motion/react';
import { CtaButton } from './ui/CtaButton';

interface InfoSectionProps {
  onDiscover: () => void;
}

export function InfoSection({ onDiscover }: InfoSectionProps) {
  return (
    <section id="menu" className="bg-white px-6 py-24">
      <div className="max-w-[88rem] mx-auto">
        {/* Row 1: Dual column introduction */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-start"
          >
            <span className="text-brand-gold text-sm font-bold tracking-widest uppercase mb-3 block font-sans">
              Our Values
            </span>
            <h2
              id="info-title"
              className="text-brand-espresso text-4xl md:text-5xl font-serif font-bold leading-tight mb-8"
              style={{ letterSpacing: '-0.02em' }}
            >
              More Than a Restaurant.
            </h2>
            <CtaButton id="btn-discover" onClick={onDiscover} variant="solid">
              Estimate Event Catering
            </CtaButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <p
              id="info-description-text"
              className="text-brand-espresso/85 text-2xl md:text-3xl leading-relaxed font-serif"
            >
              Our menu is a love letter to Israel's street food scene, with everything made fresh and packed with flavor.
            </p>
          </motion.div>
        </div>

        {/* Row 2: bento grid — one tall feature card, two stacked cards beside it */}
        <div
          id="cards-grid"
          className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-2 gap-4 lg:h-[42rem]"
        >
          {/* Card 1: tall feature card */}
          <div
            id="info-card-bloom"
            className="kp-reveal rounded-lg lg:row-span-2 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-2px] flex flex-col group"
          >
            <div
              className="w-full flex-1 min-h-0 aspect-4/3 lg:aspect-auto bg-gray-100 bg-cover bg-center"
              style={{ backgroundImage: 'url("/home/kapara-food-celebration.webp")' }}
            />

            <div className="bg-brand-forest px-6 py-5 flex flex-col gap-2 shrink-0">
              <h3
                className="font-serif font-bold text-brand-cream text-2xl leading-tight"
                style={{ letterSpacing: '-0.01em' }}
              >
                A Gathering Place
              </h3>
              <p className="text-brand-cream/90 text-base max-w-sm leading-relaxed font-sans">
                More than a restaurant, Kapara is a gathering place — a warm room built for family, friends, and neighbours to come together over great food.
              </p>
            </div>
          </div>

          {/* Card 2: shorter, wide */}
          <div
            id="info-card-fluid"
            className="kp-reveal rounded-lg flex flex-col shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-2px] group overflow-hidden"
          >
            <div
              className="w-full flex-1 min-h-0 aspect-4/3 lg:aspect-auto bg-gray-100 bg-cover bg-center"
              style={{ backgroundImage: 'url("/menu/kebab.webp")' }}
            />

            <div className="bg-brand-forest px-6 py-5 flex flex-col gap-2 shrink-0">
              <div className="kp-icon-badge transition-transform duration-500 group-hover:rotate-12">
                <Flame className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-brand-cream text-2xl leading-tight">
                Flavor
              </h3>
              <p className="text-brand-cream/90 text-base leading-relaxed font-sans">
                Big, bold, and unforgettable. Flame-grilled skewers, golden schnitzels, and creamy house-made hummus, inspired by the food markets of Israel.
              </p>
            </div>
          </div>

          {/* Card 3: shorter, wide */}
          <div
            id="info-card-automated"
            className="kp-reveal rounded-lg flex flex-col shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-2px] group overflow-hidden"
          >
            <div
              className="w-full flex-1 min-h-0 aspect-4/3 lg:aspect-auto bg-gray-100 bg-cover bg-center"
              style={{ backgroundImage: 'url("/menu/loaded-fries.webp")' }}
            />

            <div className="bg-brand-forest px-6 py-5 flex flex-col gap-2 shrink-0">
              <div className="kp-icon-badge transition-transform duration-500 group-hover:scale-110">
                <PartyPopper className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-brand-cream text-2xl leading-tight">
                Fun
              </h3>
              <p className="text-brand-cream/90 text-base leading-relaxed font-sans">
                Casual vibes with serious eats. Come for the food, stay for the vibe — a taste of Israel, right here in Toronto.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
