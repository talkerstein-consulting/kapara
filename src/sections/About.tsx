import React from 'react';
import { Users, Flame, PartyPopper } from 'lucide-react';
import { motion } from 'motion/react';
import { ORDER_ONLINE_URL } from '../types';
import Cta4 from '../components/blocks/cta-4';

export function About() {
  const values = [
    {
      icon: Users,
      title: 'Community',
      desc: 'More than a restaurant, Kapara is a gathering place — a warm room built for family, friends, and neighbours to come together over great food.',
    },
    {
      icon: Flame,
      title: 'Flavor',
      desc: 'Big, bold, and unforgettable. Flame-grilled skewers, golden schnitzels, and creamy house-made hummus, inspired by the food markets of Israel.',
    },
    {
      icon: PartyPopper,
      title: 'Fun',
      desc: 'Casual vibes with serious eats. Come for the food, stay for the vibe — a taste of Israel, right here in Toronto.',
    },
  ];

  return (
    <div id="about-page-root" className="kp-page bg-brand-cream/30">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="kp-section-header"
        >
          <span className="kp-eyebrow">
            Welcome to Kapara
          </span>
          <h2 className="kp-heading">
            More Than a Restaurant
          </h2>
          <p className="kp-subtext">
            Toronto's best casual kosher spot — a taste of Israel, right here in Thornhill. Come for the food, stay for the vibe.
          </p>
        </motion.div>

        {/* Feature image + Story (two columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch mb-14">
          {/* Feature image */}
          <div className="rounded-lg overflow-hidden border border-gray-100 shadow-md">
            <img
              src="/home/kapara-food-celebration.webp"
              alt="A celebratory feast at Kapara — flame-grilled meats, loaded fries, and fresh mezze"
              className="w-full h-72 lg:h-full object-cover"
            />
          </div>

          {/* Story */}
          <div className="bg-white rounded-lg p-8 md:p-10 border border-gray-100 shadow-sm relative overflow-hidden flex flex-col justify-center">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-brand-gold" />
            <h3 className="font-serif font-bold text-2xl md:text-3xl text-brand-espresso mb-5">
              The Kapara Story
            </h3>
            <p className="text-brand-espresso/80 leading-relaxed font-sans mb-4">
              Kapara draws its inspiration from the bustling food markets of Israel and the warmth of Mediterranean
              hospitality. We're here for great food, good vibes, and bringing people together.
            </p>
            <p className="text-brand-espresso/80 leading-relaxed font-sans">
              Our team blends culinary passion with authentic Israeli hospitality — serving premium, COR-certified
              kosher meat, flame-grilled skewers, legendary crispy schnitzels, loaded street fries, and creamy
              house-made hummus. Big, bold, and unforgettable, every single time.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {values.map((value, idx) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-lg p-7 border border-gray-100 shadow-3xs flex flex-col items-start kp-hover-lift"
              >
                <div className="w-12 h-12 rounded-2xl bg-brand-gold/15 text-brand-gold flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="font-serif font-bold text-xl text-brand-espresso mb-2">
                  {value.title}
                </h4>
                <p className="text-base text-brand-espresso/70 leading-relaxed font-sans">
                  {value.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <Cta4
          heading={<>Eat Like <span className="italic font-normal">an Israeli</span></>}
          description="Whether it's a quick pita, a family feast, or a table for the whole crew — we can't wait to feed you."
          primaryHref={ORDER_ONLINE_URL}
          primaryTarget="_blank"
          primaryRel="noreferrer"
          primaryLabel="Order Online"
          onSecondaryClick={() => { window.location.href = '/reservations'; }}
          secondaryLabel="Book a Table"
        />

      </div>
    </div>
  );
}
