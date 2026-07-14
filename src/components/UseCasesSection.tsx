import React, { useState } from 'react';
import { ArrowRight, Flame, Sparkles, Utensils, ChefHat } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface UseCasesSectionProps {
  onLearnMore: (mode: string) => void;
}

export function UseCasesSection({ onLearnMore }: UseCasesSectionProps) {
  const [activeModeId, setActiveModeId] = useState('grill');

  const modes = [
    {
      id: 'grill',
      label: 'The Flame Grill',
      icon: Flame,
      title: 'Sizzling Charcoal Skewers',
      description: 'Premium beef kebabs, tender pargiot (chicken thigh), and ribeye skewers seasoned with proprietary house spice blends and grilled to smoky perfection on our open fire grill.',
      imageUrl: '/home/kapara-food.webp',
    },
    {
      id: 'schnitzels',
      label: 'Signature Schnitzels',
      icon: Utensils,
      title: 'Extra-Crispy Chicken Schnitzel',
      description: 'Our pride and joy. Double-dredged chicken breast in sesame, garlic, or spicy herbed breadcrumbs, fried to a perfect golden crunch. Served as a plate, in a warm pita, or fresh baguette.',
      imageUrl: '/home/kapara-special_menu.webp',
    },
    {
      id: 'loaded-fries',
      label: 'Loaded Street Fries',
      icon: Sparkles,
      title: 'Kapara Loaded Fries',
      description: 'A mountain of golden homemade fries loaded with chopped crispy schnitzel, slow-cooked caramelized eggplant, fresh purple cabbage coleslaw, drizzled with velvety tahini and signature Kapara sauce.',
      imageUrl: '/home/kapara-sandwich-1.webp',
    },
    {
      id: 'catering',
      label: 'Mediterranean Catering',
      icon: ChefHat,
      title: 'Events & Family Platters',
      description: 'Let us feed your next gathering! Beautifully arranged platters of mini kebabs, schnitzel sliders, gourmet hummus bowls, Moroccan potato cigars, and fresh salads.',
      imageUrl: '/home/kapara-private-events.webp',
    },
  ];

  const activeMode = modes.find((m) => m.id === activeModeId) || modes[0];

  return (
    <section id="menu-showcase" className="bg-brand-cream px-6 py-24">
      <div className="max-w-[88rem] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div id="use-cases-left" className="md:pr-12 md:pt-2">
          <span className="kp-eyebrow">
            Kapara Bistro Classics
          </span>
          <h2
            className="text-brand-espresso text-5xl md:text-6xl font-serif font-bold leading-none mb-6"
            style={{ letterSpacing: '-0.02em' }}
          >
            Menu Highlights
          </h2>
          <p className="text-brand-espresso/80 text-base leading-relaxed max-w-sm mb-10 font-sans">
            Explore our premium categories, prepared with open flame precision, fresh ingredients, and time-tested Mediterranean family recipes.
          </p>

          {/* Interactive Mode List Selector */}
          <div className="flex flex-col gap-3">
            {modes.map((mode) => {
              const IconComp = mode.icon;
              const isActive = mode.id === activeModeId;
              return (
                <button
                  key={mode.id}
                  onClick={() => setActiveModeId(mode.id)}
                  className={`flex items-center gap-4 p-4 rounded-lg text-left transition-all duration-200 cursor-pointer w-full max-w-md ${
                    isActive
                      ? 'bg-brand-forest text-brand-cream shadow-md translate-x-2'
                      : 'bg-white hover:bg-gray-50 text-brand-espresso border border-gray-200/50'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isActive ? 'bg-white/15 text-white' : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-sm tracking-wide">{mode.label}</div>
                  </div>
                  <ArrowRight
                    className={`w-4 h-4 transition-transform duration-300 ${
                      isActive ? 'translate-x-0 opacity-100 text-white' : 'translate-x-[-4px] opacity-0 text-gray-400'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column (Image Card Overlay) */}
        <div id="use-cases-right" className="relative rounded-lg overflow-hidden min-h-[500px] md:min-h-[600px] shadow-xl border border-gray-200/40">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMode.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 w-full h-full"
            >
              {/* Background Image */}
              <img
                key={activeMode.imageUrl}
                className="object-cover absolute inset-0 w-full h-full"
                src={activeMode.imageUrl}
                alt={activeMode.title}
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </AnimatePresence>

          {/* Transparent Gradient Overlays for High Text Contrast */}
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-1 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30 z-1 pointer-events-none" />

          {/* Overlay Content */}
          <div className="absolute inset-0 z-10 p-8 md:p-12 flex flex-col justify-end items-start text-white">
            <motion.div
              key={`content-${activeMode.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <h3
                className="text-3xl md:text-4xl font-serif font-bold leading-tight mb-4"
                style={{ letterSpacing: '-0.01em' }}
              >
                {activeMode.title}
              </h3>
              <p className="text-white/85 text-base max-w-md mb-8 leading-relaxed font-sans">
                {activeMode.description}
              </p>

              {/* Inline-flex link */}
              <button
                onClick={() => onLearnMore(activeMode.title)}
                className="inline-flex items-center gap-3 group cursor-pointer"
              >
                <div className="w-9 h-9 rounded-full bg-brand-cream/95 backdrop-blur-md flex items-center justify-center group-hover:bg-white transition-colors">
                  <ArrowRight className="w-4 h-4 text-brand-espresso group-hover:translate-x-0.5 transition-transform" />
                </div>
                <span className="text-brand-cream group-hover:text-brand-gold-light font-semibold text-base tracking-wide transition-colors">
                  Pre-Order Catering
                </span>
              </button>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}
