import React, { useState, useEffect } from 'react';
import { X, ArrowRight, ShoppingBag, ShieldCheck, RefreshCw, Phone, Calendar, User, TrendingUp, CheckCircle2, ChevronRight, Award, Plus, Minus, ChefHat } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- MENU DATA ---
const BAKERY_ITEMS = [
  { id: 'sweet_challah', name: 'Sweet Honey Challah', desc: 'Indulgent, glossy sweet braided loaf', price: 8.50 },
  { id: 'plain_challah', name: 'Sesame Braided Challah', desc: 'Traditional savory-topped Friday classic', price: 8.00 },
  { id: 'choc_babka', name: 'Rich Chocolate Babka', desc: 'Swirled with premium Belgian dark chocolate', price: 16.50 },
  { id: 'potato_bourekas', name: 'Potato Bourekas (Pack of 6)', desc: 'Flaky puff pastries filled with seasoned potato', price: 12.00 },
  { id: 'spinach_bourekas', name: 'Feta & Spinach Bourekas (Pack of 6)', desc: 'Crispy dough with Greek feta and organic spinach', price: 14.00 },
  { id: 'rugelach_tray', name: 'Sweet Rugelach Tray (12 pcs)', desc: 'Chocolate swirled Jewish-style bite size pastries', price: 18.00 },
];

// --- ORDER / BASKET MODAL (Replaces WalletModal) ---
interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WalletModal({ isOpen, onClose }: WalletModalProps) {
  const [step, setStep] = useState<'select' | 'connecting' | 'dashboard'>('select');
  const [cart, setCart] = useState<Record<string, number>>({
    sweet_challah: 1,
    potato_bourekas: 1,
  });
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [pickupDate, setPickupDate] = useState('This Friday morning');
  
  const updateQty = (id: string, delta: number) => {
    setCart(prev => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      const updated = { ...prev };
      if (next === 0) {
        delete updated[id];
      } else {
        updated[id] = next;
      }
      return updated;
    });
  };

  const cartTotal = Object.entries(cart).reduce((sum: number, [id, qty]) => {
    const item = BAKERY_ITEMS.find(i => i.id === id);
    return sum + (item ? item.price * (qty as number) : 0);
  }, 0);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.keys(cart).length === 0) return;
    setStep('connecting');
    setTimeout(() => {
      setStep('dashboard');
    }, 1800);
  };

  const handleReset = () => {
    setCart({ sweet_challah: 1, potato_bourekas: 1 });
    setName('');
    setPhone('');
    setStep('select');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="bg-brand-cream rounded-3xl overflow-hidden shadow-2xl border border-gray-100 max-w-lg w-full z-10 relative flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white/50">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-5 h-5 text-brand-espresso" />
                <span className="font-serif font-bold text-brand-espresso text-lg tracking-tight">
                  {step === 'dashboard' ? 'Order Confirmed!' : 'Kapara Fresh Basket'}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-gray-200 text-gray-500 hover:text-brand-espresso transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Switcher */}
            <div className="flex-1 overflow-y-auto p-6">
              {step === 'select' && (
                <div>
                  <h4 className="text-xl font-serif font-bold text-brand-espresso mb-1 tracking-tight">Build your fresh order</h4>
                  <p className="text-sm text-brand-espresso/70 mb-6 font-sans">
                    Reserve artisanal breads and pastries fresh from our stone ovens. No upfront payment required; pay in-store during pickup.
                  </p>

                  {/* Bakery Items Selector */}
                  <div className="flex flex-col gap-3 mb-6">
                    {BAKERY_ITEMS.map((item) => {
                      const qty = cart[item.id] || 0;
                      return (
                        <div
                          key={item.id}
                          className="flex items-center justify-between p-3.5 rounded-2xl border border-gray-200 bg-white shadow-xs"
                        >
                          <div className="flex-1 pr-3">
                            <div className="font-serif font-bold text-sm text-brand-espresso">
                              {item.name}
                            </div>
                            <span className="text-sm text-brand-espresso/60 font-sans block mt-0.5 leading-snug">
                              {item.desc}
                            </span>
                            <span className="text-sm font-semibold text-brand-gold font-mono mt-1 block">
                              ${item.price.toFixed(2)} each
                            </span>
                          </div>

                          <div className="flex items-center gap-3">
                            {qty > 0 ? (
                              <>
                                <button
                                  type="button"
                                  onClick={() => updateQty(item.id, -1)}
                                  className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-brand-espresso hover:bg-gray-100 transition-colors"
                                >
                                  <Minus className="w-3.5 h-3.5" />
                                </button>
                                <span className="font-mono font-bold text-brand-espresso text-sm w-4 text-center">
                                  {qty}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => updateQty(item.id, 1)}
                                  className="w-8 h-8 rounded-full bg-brand-forest text-white flex items-center justify-center hover:bg-white hover:text-brand-forest transition-colors"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                </button>
                              </>
                            ) : (
                              <button
                                type="button"
                                onClick={() => updateQty(item.id, 1)}
                                className="px-3.5 py-1.5 rounded-full border border-brand-espresso text-sm font-semibold text-brand-espresso hover:bg-brand-forest hover:text-white transition-all cursor-pointer"
                              >
                                Add
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Order Submission Form */}
                  {cartTotal > 0 && (
                    <form onSubmit={handlePlaceOrder} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
                      <h5 className="font-serif font-bold text-sm text-brand-espresso mb-3">Pickup & Customer Details</h5>
                      <div className="flex flex-col gap-3">
                        <div className="relative">
                          <User className="kp-input-icon" />
                          <input
                            type="text"
                            placeholder="Your full name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full bg-gray-50/50 border border-gray-200 rounded-full pl-10 pr-4 py-2.5 text-sm focus:outline-hidden focus:border-brand-gold font-sans text-brand-espresso"
                          />
                        </div>

                        <div className="relative">
                          <Phone className="kp-input-icon" />
                          <input
                            type="tel"
                            placeholder="Phone number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                            className="w-full bg-gray-50/50 border border-gray-200 rounded-full pl-10 pr-4 py-2.5 text-sm focus:outline-hidden focus:border-brand-gold font-sans text-brand-espresso"
                          />
                        </div>

                        <div className="relative">
                          <Calendar className="kp-input-icon" />
                          <select
                            value={pickupDate}
                            onChange={(e) => setPickupDate(e.target.value)}
                            className="w-full bg-gray-50/50 border border-gray-200 rounded-full pl-10 pr-4 py-2.5 text-sm focus:outline-hidden focus:border-brand-gold font-sans text-brand-espresso appearance-none"
                          >
                            <option value="This Friday morning">This Friday morning (Challah Special)</option>
                            <option value="This Friday afternoon">This Friday afternoon (Before Shabbat)</option>
                            <option value="Sunday morning">Sunday morning</option>
                            <option value="Weekday morning (Mon-Thu)">Weekday morning (Mon-Thu)</option>
                          </select>
                        </div>

                        <div className="mt-2 pt-3 border-t border-gray-100 flex justify-between items-center">
                          <span className="text-sm font-semibold text-brand-espresso/60 uppercase">Estimated Total</span>
                          <span className="text-xl font-mono font-bold text-brand-espresso">${cartTotal.toFixed(2)}</span>
                        </div>

                        <button
                          type="submit"
                          className="w-full mt-3 bg-brand-forest text-brand-cream text-sm font-semibold py-3.5 rounded-full hover:bg-white hover:text-brand-forest transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                        >
                          Confirm & Book Pickup
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </form>
                  )}

                  {cartTotal === 0 && (
                    <div className="py-12 text-center bg-white rounded-2xl border border-dashed border-gray-300">
                      <ShoppingBag className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                      <p className="text-sm font-medium text-brand-espresso/60 font-sans">Your fresh basket is empty. Add items above!</p>
                    </div>
                  )}

                  <div className="mt-4 p-4 bg-white rounded-2xl flex items-start gap-3 border border-gray-200 shadow-xs">
                    <ShieldCheck className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                    <p className="text-base text-brand-espresso/70 leading-relaxed font-sans">
                      All orders are hand-prepared at our Thornhill location under strict COR Kosher supervision. Pick up and pay at 8000 Bathurst St.
                    </p>
                  </div>
                </div>
              )}

              {step === 'connecting' && (
                <div className="py-12 flex flex-col items-center justify-center text-center">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 rounded-full border-4 border-gray-100 border-t-brand-gold animate-spin" />
                    <ChefHat className="w-6 h-6 text-brand-espresso absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  </div>
                  <h4 className="text-lg font-serif font-bold text-brand-espresso mb-1">Transmitting order to Kapara Kitchen...</h4>
                  <p className="text-sm text-brand-espresso/70 max-w-xs font-sans">
                    Setting aside your fresh hand-braided loaves and baking bourekas to golden perfection.
                  </p>
                </div>
              )}

              {step === 'dashboard' && (
                <div className="flex flex-col gap-6">
                  {/* Premium balance widget */}
                  <div className="bg-brand-forest text-white rounded-3xl p-6 relative overflow-hidden shadow-md">
                    <div className="absolute right-0 bottom-0 translate-x-4 translate-y-4 opacity-5 pointer-events-none">
                      <ChefHat className="w-48 h-48" />
                    </div>

                    <div className="flex justify-between items-start mb-2">
                      <span className="text-brand-gold text-sm font-semibold tracking-wider uppercase font-sans">
                        Kapara Ticket Code
                      </span>
                      <span className="bg-brand-gold text-brand-espresso text-sm font-bold px-2 py-0.5 rounded-full tracking-wide uppercase font-sans">
                        COR Certified
                      </span>
                    </div>

                    <div className="text-3xl md:text-4xl font-mono font-bold tracking-tight mb-2 text-brand-cream">
                      #KPR-{(Math.floor(Math.random() * 8000) + 1200)}
                    </div>

                    <div className="text-sm text-brand-cream/80 flex items-center gap-1.5 font-sans">
                      <RefreshCw className="w-3 h-3 animate-spin text-brand-gold" /> Ready for pickup: {pickupDate}
                    </div>
                  </div>

                  {/* Summary Box */}
                  <div className="p-5 bg-white rounded-2xl border border-gray-200">
                    <h5 className="font-serif font-bold text-brand-espresso text-sm mb-3">Order Summary for {name || 'Valued Guest'}</h5>
                    <div className="flex flex-col gap-2 mb-3">
                      {Object.entries(cart).map(([id, _qty]) => {
                        const qty = _qty as number;
                        const item = BAKERY_ITEMS.find(i => i.id === id);
                        if (!item) return null;
                        return (
                          <div key={id} className="flex justify-between text-sm text-brand-espresso/80 font-sans">
                            <span>{qty}x {item.name}</span>
                            <span className="font-mono font-semibold">${(item.price * qty).toFixed(2)}</span>
                          </div>
                        );
                      })}
                    </div>
                    <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
                      <span className="text-sm font-bold text-brand-espresso">Total Due In-Store</span>
                      <span className="text-base font-mono font-bold text-brand-espresso">${cartTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Instructions */}
                  <div className="text-center py-2">
                    <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h4 className="text-base font-serif font-bold text-brand-espresso mb-1">Your Reservation is Secured</h4>
                    <p className="text-base text-brand-espresso/70 max-w-xs mx-auto leading-relaxed font-sans">
                      Just state your name or ticket code to our cashier. Payment is processed on pickup via Credit/Debit or Cash. Thanks for supporting local!
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={handleReset}
                      className="flex-1 bg-white border border-gray-200 text-brand-espresso text-sm font-semibold py-3 rounded-full hover:bg-gray-50 transition-colors cursor-pointer text-center"
                    >
                      Bake Another Order
                    </button>
                    <button
                      onClick={onClose}
                      className="flex-1 bg-brand-forest text-brand-cream text-sm font-semibold py-3 rounded-full hover:bg-white hover:text-brand-forest transition-colors cursor-pointer text-center"
                    >
                      Close Window
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Footer details */}
            <div className="p-4 bg-white border-t border-gray-100 flex items-center justify-between text-sm text-brand-espresso/60 font-sans">
              <span>Kitchen Status: Stone Oven Active</span>
              <span className="font-semibold text-brand-gold">Proudly Shabbat Observant</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}


// --- FRIDAY CHALLAH CLUB WAITLIST MODAL (Replaces JoinUsModal) ---
interface JoinUsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function JoinUsModal({ isOpen, onClose }: JoinUsModalProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loafSelection, setLoafSelection] = useState('sweet_honey');
  const [submitted, setSubmitted] = useState(false);
  const [queueNumber, setQueueNumber] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    // Simulate high-tier waitlist number assignment
    setQueueNumber(Math.floor(Math.random() * 200) + 104);
    setSubmitted(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="bg-brand-cream rounded-3xl overflow-hidden shadow-2xl border border-gray-100 max-w-md w-full z-10 p-8 relative"
          >
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-gray-100 text-gray-500 hover:text-brand-espresso transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {!submitted ? (
              <div>
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 border border-gray-200">
                  <Award className="w-6 h-6 text-brand-gold" />
                </div>
                <h4 className="text-2xl font-serif font-bold text-brand-espresso mb-2 tracking-tight">Friday Challah Club</h4>
                <p className="text-brand-espresso/80 text-base mb-6 leading-relaxed font-sans">
                  Our hand-braided Friday Shabbat challahs sell out by 10 AM! Join our free Challah Club to auto-secure your fresh loaves weekly. We save it, you pick it up.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full bg-white border border-gray-200 rounded-full px-5 py-3 text-sm focus:outline-hidden focus:border-brand-gold font-sans text-brand-espresso shadow-xs"
                  />
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-white border border-gray-200 rounded-full px-5 py-3 text-sm focus:outline-hidden focus:border-brand-gold font-sans text-brand-espresso shadow-xs"
                  />
                  
                  <div className="flex flex-col gap-1.5 mt-1">
                    <label className="text-sm font-bold text-brand-espresso/60 uppercase px-3">Loaf Preference</label>
                    <select
                      value={loafSelection}
                      onChange={(e) => setLoafSelection(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-full px-5 py-3 text-sm focus:outline-hidden focus:border-brand-gold font-sans text-brand-espresso shadow-xs appearance-none"
                    >
                      <option value="sweet_honey">Sweet Honey Challah ($8.50)</option>
                      <option value="sesame_braid">Traditional Sesame Challah ($8.00)</option>
                      <option value="chocolate_stuffed">Belgian Chocolate Stuffed ($9.50)</option>
                      <option value="whole_wheat">Whole Wheat Honey Challah ($8.50)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 bg-brand-forest text-brand-cream text-sm font-semibold py-3.5 rounded-full hover:bg-white hover:text-brand-forest transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    Lock Weekly Loaf
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>

                <p className="text-sm text-brand-espresso/50 mt-4 text-center font-sans">
                  No commitment required. You will receive an SMS/Email reminder on Thursdays to confirm or skip pickup.
                </p>
              </div>
            ) : (
              <div className="text-center py-6">
                <div className="w-14 h-14 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-serif font-bold text-brand-espresso mb-2 tracking-tight">You are in the club!</h4>
                <p className="text-brand-espresso/70 text-base max-w-xs mx-auto mb-6 leading-relaxed font-sans">
                  Welcome to the Friday Challah Club, <span className="font-semibold text-brand-espresso">{name}</span>! We’ve registered your preference.
                </p>

                <div className="bg-white p-4 rounded-2xl border border-gray-200 max-w-xs mx-auto mb-6 shadow-xs">
                  <span className="text-sm text-brand-gold block font-semibold uppercase tracking-wider mb-0.5 font-sans">Club Member ID</span>
                  <span className="text-3xl font-mono font-bold text-brand-espresso">#CHL-{queueNumber}</span>
                </div>

                <button
                  onClick={onClose}
                  className="bg-brand-forest text-brand-cream text-sm font-semibold px-8 py-3 rounded-full hover:bg-white hover:text-brand-forest transition-colors cursor-pointer"
                >
                  Return to Site
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}


// --- CATERING & EVENT ESTIMATOR (Replaces RewardCalculatorModal) ---
interface RewardCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RewardCalculatorModal({ isOpen, onClose }: RewardCalculatorModalProps) {
  const [guests, setGuests] = useState(25);
  const [mealType, setMealType] = useState<'brunch' | 'shabbat' | 'dessert'>('brunch');

  // Multipliers based on meal choice
  const configs = {
    brunch: {
      rate: 14.50,
      label: 'Mediterranean Morning Spread',
      challahRatio: 0.15,
      bourekasRatio: 1.5,
      babkaRatio: 0.5,
      sweetsRatio: 1.0,
    },
    shabbat: {
      rate: 28.00,
      label: 'Complete Shabbat Feast',
      challahRatio: 0.25,
      bourekasRatio: 2.0,
      babkaRatio: 0.8,
      sweetsRatio: 1.5,
    },
    dessert: {
      rate: 11.50,
      label: 'Sweet Treat & Yeast Platter',
      challahRatio: 0.05,
      bourekasRatio: 0.5,
      babkaRatio: 1.0,
      sweetsRatio: 2.5,
    },
  };

  const activeConfig = configs[mealType];
  const estChallahs = Math.max(1, Math.ceil(guests * activeConfig.challahRatio));
  const estBourekas = Math.ceil(guests * activeConfig.bourekasRatio);
  const estBabkas = Math.max(1, Math.ceil(guests * activeConfig.babkaRatio));
  const estSweets = Math.ceil(guests * activeConfig.sweetsRatio);
  const totalCost = guests * activeConfig.rate;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="bg-brand-cream rounded-3xl overflow-hidden shadow-2xl border border-gray-100 max-w-lg w-full z-10 p-8 relative"
          >
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-gray-100 text-gray-500 hover:text-brand-espresso transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 bg-white text-brand-espresso border border-gray-200 rounded-2xl flex items-center justify-center mb-6">
              <TrendingUp className="w-6 h-6 text-brand-gold" />
            </div>

            <h4 className="text-2xl font-serif font-bold text-brand-espresso mb-1 tracking-tight">Catering Event Planner</h4>
            <p className="text-brand-espresso/70 text-base mb-6 leading-relaxed font-sans">
              Enter your guest count and select a meal style to estimate required baked goods and budget projections instantly.
            </p>

            {/* Slider and meal types */}
            <div className="flex flex-col gap-6 mb-8">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-serif font-bold text-brand-espresso">Number of Guests</span>
                  <span className="text-lg font-mono font-bold text-brand-espresso bg-white px-3 py-1 rounded-full border border-gray-200 shadow-2xs">
                    {guests} guests
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="150"
                  step="5"
                  value={guests}
                  onChange={(e) => setGuests(parseInt(e.target.value))}
                  className="w-full accent-brand-espresso cursor-pointer h-1.5 bg-gray-200 rounded-lg appearance-none"
                />
                <div className="flex justify-between text-sm text-brand-espresso/50 font-sans mt-1">
                  <span>5 guests</span>
                  <span>75 guests</span>
                  <span>150 guests</span>
                </div>
              </div>

              <div>
                <span className="text-sm font-serif font-bold text-brand-espresso block mb-3">Meal Style Selection</span>
                <div className="grid grid-cols-3 gap-2">
                  {(['brunch', 'shabbat', 'dessert'] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setMealType(type)}
                      className={`py-2 rounded-xl text-sm font-semibold border transition-all cursor-pointer ${
                        mealType === type
                          ? 'bg-brand-forest text-brand-cream border-brand-espresso shadow-xs'
                          : 'bg-white text-brand-espresso/70 border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      {type === 'brunch' ? 'Morning Spread' : type === 'shabbat' ? 'Shabbat Feast' : 'Sweet Platter'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Catering projections */}
            <div className="p-6 bg-white rounded-3xl border border-gray-200 flex flex-col gap-4 shadow-2xs mb-6">
              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <span className="text-sm text-brand-espresso/60 font-semibold uppercase font-sans">Estimated Spread Breakdown</span>
                <span className="text-sm font-bold text-brand-gold bg-amber-50 px-2 py-0.5 rounded-full">COR Kosher</span>
              </div>

              <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm text-brand-espresso/90">
                <div className="flex justify-between border-b border-gray-50 pb-1.5 font-sans">
                  <span className="text-brand-espresso/70">Challah Loaves</span>
                  <span className="font-mono font-bold">{estChallahs}</span>
                </div>
                <div className="flex justify-between border-b border-gray-50 pb-1.5 font-sans">
                  <span className="text-brand-espresso/70">Savory Bourekas</span>
                  <span className="font-mono font-bold">{estBourekas} pcs</span>
                </div>
                <div className="flex justify-between border-b border-gray-50 pb-1.5 font-sans">
                  <span className="text-brand-espresso/70">Yeast Babka slices</span>
                  <span className="font-mono font-bold">{estBabkas * 8} servings</span>
                </div>
                <div className="flex justify-between border-b border-gray-50 pb-1.5 font-sans">
                  <span className="text-brand-espresso/70">Sweet Rugelach</span>
                  <span className="font-mono font-bold">{estSweets} pcs</span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4 flex justify-between items-end">
                <div>
                  <span className="text-sm text-brand-espresso/60 block font-semibold uppercase font-sans mb-1">Catering Budget Estimate</span>
                  <span className="text-2xl font-mono font-bold text-brand-espresso">
                    ${totalCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                <span className="text-sm text-brand-espresso/50 font-sans">~${activeConfig.rate.toFixed(2)} / guest</span>
              </div>
            </div>

            <div>
              <button
                onClick={() => {
                  onClose();
                  alert(`Thank you! Catering inquiry generated for ${guests} guests of meal style '${activeConfig.label}'. Our Thornhill supervisor will contact you shortly to finalize flavors.`);
                }}
                className="w-full bg-brand-forest text-brand-cream text-sm font-semibold py-3.5 rounded-full hover:bg-white hover:text-brand-forest transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                Submit Catering Request
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
