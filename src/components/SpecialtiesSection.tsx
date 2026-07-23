import React from 'react';
import { Flame, Utensils, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { CtaButton } from './ui/CtaButton';

interface SpecialtiesSectionProps {
  onOrder: () => void;
}

export function SpecialtiesSection({ onOrder }: SpecialtiesSectionProps) {
  const specialties = [
    {
      id: 'kebab',
      title: 'Flame-Grilled Kebabs',
      subtitle: 'Charcoal Fire Masterpiece',
      desc: 'Our signature blend of premium seasoned ground beef and lamb, minced fresh daily with Mediterranean herbs, and grilled to absolute juicy perfection over open hardwood embers. Served in a warm, fluffy hand-braided challah, pocket pita, or as an abundant meat platter.',
      image: '/home/kapara-food.webp',
      badge: 'Bestseller',
      icon: Flame,
      color: 'border-brand-gold/20 text-brand-gold bg-brand-gold/10',
    },
    {
      id: 'schnitzel',
      title: 'Legendary Crispy Chicken Schnitzels',
      subtitle: 'Extra-Crunchy Golden Icon',
      desc: 'Tender chicken breast, hand-prepared daily, double-dredged in our artisanal breadcrumbs, and fried to golden, crackling-crisp perfection. Customize your flavor with Traditional Sesame, Fiery Moroccan Chili, or gourmet French Dijon breading options.',
      image: '/home/kapara-special_menu.webp',
      badge: 'House Favorite',
      icon: Utensils,
      color: 'border-brand-gold/20 text-brand-gold bg-brand-gold/10',
    }
  ];

  return (
    <section id="bistro-specialties-spotlight" className="bg-[#F6F3EC] px-6 py-24 border-t border-b border-gray-200/40">
      <div className="max-w-[88rem] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-bold bg-brand-gold/10 text-brand-gold border border-brand-gold/20 mb-3 font-sans uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" /> Signature Classics
          </div>
          <h2 className="text-brand-espresso text-4xl md:text-5xl font-serif font-bold mb-4 tracking-tight">
            Sizzling From the Hearth & Fryer
          </h2>
          <p className="text-brand-espresso/80 text-sm md:text-base font-sans max-w-2xl mx-auto">
            Experience the legendary crown jewels of Kapara Bistro & Grill. Cooked fresh to order under meticulous COR Kosher Meat standards using premium local ingredients.
          </p>
        </motion.div>

        {/* Two Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {specialties.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="bg-white rounded-lg overflow-hidden border border-gray-100 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col md:flex-row h-full group"
              >
                {/* Image Section */}
                <div className="md:w-1/2 h-64 md:h-auto min-h-[260px] relative overflow-hidden select-none bg-brand-cream/10">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent pointer-events-none md:hidden" />
                  
                  {/* Floating Badge */}
                  <span className="absolute top-4 left-4 inline-flex items-center gap-1 bg-brand-forest text-brand-cream text-sm font-bold font-sans uppercase tracking-wider px-3 py-1 rounded-full shadow-md z-10">
                    <Sparkles className="w-2.5 h-2.5 text-brand-gold-light shrink-0" /> {item.badge}
                  </span>
                </div>

                {/* Content Section */}
                <div className="md:w-1/2 p-8 flex flex-col justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`p-1.5 rounded-lg border ${item.color}`}>
                        <Icon className="w-4 h-4" />
                      </span>
                      <span className="text-sm font-bold uppercase tracking-widest text-brand-espresso/60 font-sans">
                        {item.subtitle}
                      </span>
                    </div>

                    <h3 className="text-brand-espresso text-2xl font-serif font-bold leading-tight mb-4 group-hover:text-brand-gold transition-colors duration-200">
                      {item.title}
                    </h3>

                    <p className="text-brand-espresso/75 text-base leading-relaxed font-sans mb-8">
                      {item.desc}
                    </p>
                  </div>

                  <CtaButton onClick={onOrder} variant="solid" size="sm" fullWidthMobile={false} className="uppercase">
                    Order Now
                  </CtaButton>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
