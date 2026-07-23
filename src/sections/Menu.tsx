import React, { useState } from 'react';
import { Search, Sparkles, Check, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BAKERY_ITEMS } from '../data/menu';
import { ORDER_ONLINE_URL } from '../types';
import { CtaButton } from '../components/ui/CtaButton';

export function Menu() {
  const [selectedCategory, setSelectedCategory] = useState<string>(() => {
    if (typeof window === 'undefined') return 'all';
    return new URLSearchParams(window.location.search).get('category') || 'all';
  });
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showCustomizerInfo, setShowCustomizerInfo] = useState<boolean>(true);

  // Filter items
  const filteredItems = BAKERY_ITEMS.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const categories = [
    { id: 'all', name: 'Full Menu' },
    { id: 'starters', name: 'Starters' },
    { id: 'schnitzels', name: 'Schnitzels' },
    { id: 'grill', name: 'On The Grill' },
    { id: 'more', name: 'More Kapara...' },
    { id: 'sides', name: 'Sides' },
  ];

  const toppingsList = [
    'Hummus', 'Matbucha', 'Babaganoush', 'Schug', 'Coleslaw', 'Corn salad',
    'Tomatoes', 'Cucumbers', 'Pickles', 'Lettuce', 'Sumac onions',
    'Lemon kavoush', 'Purple coleslaw', 'Hot banana peppers'
  ];

  const saucesList = [
    'Tahini', 'Amba', 'Ketchup', 'Sweet chili', 'Honey garlic',
    'Garlic mayo', 'Spicy mayo', 'Thousand island', 'Secret house sauce',
    'Lemon + olive oil', 'Frank\'s hot sauce'
  ];

  return (
    <div id="menu-page-root" className="kp-page bg-brand-cream/40">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="kp-eyebrow">
            Flame Grill & Golden Crispy Schnitzels
          </span>
          <h2 className="kp-heading">
            Our Fresh Bistro Menu
          </h2>
          <p className="kp-subtext">
            All grilled meats and golden crispy schnitzels are cooked fresh to order under rigorous COR Kosher Supervision. Order online for fast in-store pickup.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8 items-start">

          {/* Sidebar: Category Tabs (sticky on every breakpoint) */}
          <div className="sticky top-20 z-30 lg:top-28 bg-white p-4 rounded-lg border border-gray-100 shadow-sm flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  const url = new URL(window.location.href);
                  if (cat.id === 'all') url.searchParams.delete('category');
                  else url.searchParams.set('category', cat.id);
                  window.history.replaceState({}, '', url);
                }}
                className={`px-5 py-2.5 rounded-lg text-sm font-semibold border transition-all cursor-pointer whitespace-nowrap text-left ${
                  selectedCategory === cat.id
                    ? 'bg-brand-forest text-brand-cream border-brand-espresso shadow-xs'
                    : 'bg-white text-brand-espresso/70 border-gray-200 hover:bg-gray-50'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div>
            {/* Search Input */}
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm mb-8">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-espresso/40 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search falafel, kebab, burgers, sides..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-brand-cream/30 border border-gray-200 rounded-lg pl-11 pr-5 py-3 text-sm focus:outline-hidden focus:border-brand-gold focus:ring-1 focus:ring-brand-gold font-sans text-brand-espresso shadow-2xs"
                />
              </div>
            </div>

        {/* Menu Items Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className="kp-reveal kp-hover-lift bg-white rounded-lg overflow-hidden border border-gray-100 shadow-xs hover:shadow-md transition-all flex flex-col group relative"
                  >
                    {/* Item Image */}
                    <div className="h-48 w-full overflow-hidden relative bg-brand-cream/20">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-4 left-4 flex flex-wrap gap-1.5 max-w-[80%]">
                        {item.dietary.filter((tag) => tag !== 'COR Kosher').slice(0, 3).map((tag, i) => (
                          <span
                            key={i}
                            className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-brand-cream/90 text-brand-espresso uppercase tracking-wider backdrop-blur-xs font-sans shadow-2xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className="absolute bottom-4 right-4 bg-brand-forest/90 text-brand-cream text-sm font-bold font-mono px-3 py-1 rounded-lg backdrop-blur-xs">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>

                    {/* Card Body */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-serif font-bold text-lg text-brand-espresso leading-snug">
                            {item.name}
                          </h3>
                        </div>
                        <p className="text-base text-brand-espresso/70 leading-relaxed font-sans mb-6">
                          {item.desc}
                        </p>
                      </div>

                      <div className="flex items-center justify-end pt-4 border-t border-gray-50 mt-auto">
                        {/* Order Online (Clover) */}
                        <CtaButton
                          href={ORDER_ONLINE_URL}
                          target="_blank"
                          rel="noreferrer"
                          variant="solid"
                          size="sm"
                          fullWidthMobile={false}
                          className="uppercase"
                        >
                          Order Online
                        </CtaButton>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-lg border border-dashed border-gray-200">
              <span className="text-4xl">🥙</span>
              <h3 className="text-lg font-serif font-bold text-brand-espresso mt-4 mb-2">No items found</h3>
              <p className="text-sm text-brand-espresso/60 font-sans max-w-xs mx-auto">
                Try selecting a different category or refining your search parameters.
              </p>
            </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Toppings & Sauces Customizer Station Banner */}
        {showCustomizerInfo && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white text-brand-espresso rounded-lg p-6 md:p-8 mt-10 border-2 border-brand-gold/40 shadow-xl ring-4 ring-brand-gold/10 relative overflow-hidden"
          >
            {/* Accent top bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-brand-gold" />

            <div className="absolute right-4 bottom-4 text-brand-gold/10 pointer-events-none font-serif text-9xl select-none font-bold">
              Kapara
            </div>

            <div className="flex justify-between items-start gap-4 mb-4">
              <div className="flex items-center gap-3">
                <span className="shrink-0 w-11 h-11 rounded-lg bg-brand-gold text-white flex items-center justify-center shadow-md">
                  <Sparkles className="w-6 h-6" />
                </span>
                <div>
                  <span className="block text-sm font-bold uppercase tracking-widest text-brand-gold mb-0.5 font-sans">
                    Included with every order
                  </span>
                  <h3 className="font-serif font-bold text-xl md:text-2xl text-brand-espresso leading-tight">
                    Customization Station: Complimentary Toppings & Sauces
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setShowCustomizerInfo(false)}
                className="shrink-0 text-brand-espresso/60 hover:text-brand-espresso hover:bg-brand-cream/60 text-sm font-bold transition-colors border border-gray-200 px-3 py-1.5 rounded-lg cursor-pointer"
              >
                Dismiss
              </button>
            </div>

            <p className="text-base md:text-base text-brand-espresso/80 max-w-3xl mb-6 leading-relaxed font-sans">
              All of our legendary sandwiches (served in fresh <strong className="text-brand-gold">challah</strong>, hot crusty <strong className="text-brand-gold">baguette</strong>, or a soft <strong className="text-brand-gold">wrap</strong>) and generous meat platters come with your unlimited choice of complimentary fresh toppings and chef-made sauces. State your preferences during pickup!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
              {/* Toppings */}
              <div className="bg-brand-cream/50 rounded-lg p-5 border border-gray-100">
                <h4 className="text-sm font-extrabold text-brand-gold uppercase tracking-widest mb-3 font-sans flex items-center gap-1.5">
                  <Check className="w-4 h-4" /> Fresh Toppings
                </h4>
                <div className="flex flex-wrap gap-2">
                  {toppingsList.map((top, index) => (
                    <span
                      key={index}
                      className="kp-chip"
                    >
                      {top}
                    </span>
                  ))}
                </div>
              </div>

              {/* Sauces */}
              <div className="bg-brand-cream/50 rounded-lg p-5 border border-gray-100">
                <h4 className="text-sm font-extrabold text-brand-gold uppercase tracking-widest mb-3 font-sans flex items-center gap-1.5">
                  <Flame className="w-4 h-4 animate-pulse" /> Chef-Made Sauces
                </h4>
                <div className="flex flex-wrap gap-2">
                  {saucesList.map((sauce, index) => (
                    <span
                      key={index}
                      className="kp-chip"
                    >
                      {sauce}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

          </div>
        </div>

      </div>
    </div>
  );
}
