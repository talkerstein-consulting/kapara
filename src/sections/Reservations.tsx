import React, { useState } from 'react';
import { Calendar, Users, Phone, Mail, User, Clock, CheckCircle2, ArrowRight, HelpCircle, ChevronDown, PartyPopper, MessageSquare, Utensils } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function Reservations() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [guests, setGuests] = useState('2');
  const [eventType, setEventType] = useState('casual');
  const [comments, setComments] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [confirmId, setConfirmId] = useState(0);

  // FAQ open/close states
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const eventOptions = [
    { value: 'casual', label: 'Casual Dining' },
    { value: 'birthday', label: 'Birthday Celebration' },
    { value: 'anniversary', label: 'Anniversary' },
    { value: 'business', label: 'Business Meal' },
    { value: 'family', label: 'Family Gathering' },
    { value: 'private', label: 'Private Event' },
    { value: 'other', label: 'Something Else' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !date) return;
    setConfirmId(Math.floor(Math.random() * 800) + 215);
    setSubmitted(true);
  };

  const highlights = [
    {
      title: 'Come for the Food, Stay for the Vibe',
      desc: 'Kapara is a gathering place. Reserve a table and settle in for big, bold Israeli flavors in a warm, casual room.',
      icon: PartyPopper,
    },
    {
      title: 'Groups & Celebrations Welcome',
      desc: 'Birthdays, anniversaries, business dinners, or a night out with friends — tell us the occasion and we will set the table for it.',
      icon: Users,
    },
    {
      title: 'Know Before You Go',
      desc: 'We are open Sunday–Thursday 12pm–10pm and for a lively Motzei Shabbat service Saturday 8pm–12:30am. Closed Fridays for Shabbat.',
      icon: Clock,
    },
  ];

  const faqs = [
    {
      q: 'Do I need a reservation to eat at Kapara?',
      a: 'Not at all — walk-ins are always welcome! Reservations just guarantee your table, which we recommend for weekend evenings, larger groups, and special occasions.',
    },
    {
      q: 'What are your hours?',
      a: 'We are open Sunday through Thursday from 12:00 PM to 10:00 PM, and Saturday evening from 8:00 PM to 12:30 AM for our Motzei Shabbat late-night service. We are closed all day Friday in observance of Shabbat.',
    },
    {
      q: 'Can you host large groups or private events?',
      a: 'Yes! We love hosting celebrations and gatherings. For parties, private events, or full buyouts, choose "Private Event" above or visit our Catering & Events page, and our team will follow up to plan the details with you.',
    },
    {
      q: 'Is Kapara kosher?',
      a: 'Absolutely. Kapara is a fully kosher restaurant operating under strict supervision, serving premium kosher meat. You can dine with complete confidence.',
    },
  ];

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const selectedEventLabel = eventOptions.find((o) => o.value === eventType)?.label || 'Casual Dining';

  return (
    <div id="reservations-page" className="kp-page bg-brand-cream/30">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="kp-section-header">
          <span className="kp-eyebrow">
            Dine With Us in Thornhill
          </span>
          <h2 className="kp-heading">
            Book a Reservation at Kapara
          </h2>
          <p className="kp-subtext">
            A taste of Israel, right here in Toronto. Reserve your table and come hungry — casual vibes, serious eats, and a room made for gathering.
          </p>
        </div>

        {/* Form and Highlights Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">

          {/* Left Column: Form Card */}
          <div className="lg:col-span-7 bg-white rounded-lg p-8 border border-gray-100 shadow-md">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="flex gap-3 items-center pb-4 border-b border-gray-100">
                  <div className="w-10 h-10 rounded-xl bg-brand-gold/10 flex items-center justify-center text-brand-gold">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-lg text-brand-espresso leading-none">
                      Reservation Details
                    </h3>
                    <span className="text-sm text-brand-espresso/60 font-sans">
                      Tell us when you are coming and we will save your table.
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="kp-form-label">
                      Date
                    </label>
                    <div className="relative">
                      <Calendar className="kp-input-icon" />
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        className="kp-input-pill"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="kp-form-label">
                      Number of Guests
                    </label>
                    <div className="relative">
                      <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
                      <select
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        className="w-full bg-brand-cream/10 border border-gray-200 rounded-full pl-10 pr-4 py-3 text-sm focus:outline-hidden focus:border-brand-gold font-sans text-brand-espresso shadow-2xs appearance-none"
                      >
                        {Array.from({ length: 19 }, (_, i) => i + 1).map((n) => (
                          <option key={n} value={String(n)}>
                            {n} {n === 1 ? 'guest' : 'guests'}
                          </option>
                        ))}
                        <option value="20+">20+ guests (large party)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="kp-form-label">
                    Type of Event
                  </label>
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className="w-full bg-brand-cream/10 border border-gray-200 rounded-2xl px-5 py-3.5 text-sm focus:outline-hidden focus:border-brand-gold font-sans text-brand-espresso shadow-2xs appearance-none"
                  >
                    {eventOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="kp-form-label">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="kp-input-icon" />
                    <input
                      type="text"
                      placeholder="e.g. Sarah Cohen"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="kp-input-pill"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="kp-form-label">
                      Phone
                    </label>
                    <div className="relative">
                      <Phone className="kp-input-icon" />
                      <input
                        type="tel"
                        placeholder="(905) 886-7444"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="kp-input-pill"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="kp-form-label">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="kp-input-icon" />
                      <input
                        type="email"
                        placeholder="sarah@domain.ca"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="kp-input-pill"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="kp-form-label">
                    Additional Comments
                  </label>
                  <textarea
                    rows={3}
                    placeholder="High chair needed, celebrating a birthday, seating preferences, allergies..."
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    className="w-full bg-brand-cream/10 border border-gray-200 rounded-2xl px-5 py-3 text-sm focus:outline-hidden focus:border-brand-gold font-sans text-brand-espresso resize-none shadow-2xs"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand-forest text-brand-cream border-2 border-transparent hover:bg-white hover:text-brand-forest hover:border-brand-forest font-sans font-semibold py-4 rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm mt-2"
                >
                  Reserve a Spot
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <div className="text-center py-10">
                <div className="kp-success-icon">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-serif font-bold text-brand-espresso mb-3 tracking-tight">
                  Your Table is Requested!
                </h3>
                <p className="text-brand-espresso/80 text-base max-w-md mx-auto leading-relaxed mb-8 font-sans">
                  Thank you, <span className="font-semibold text-brand-espresso">{name}</span>! We have received your reservation request and our team will confirm shortly by phone or email.
                </p>

                <div className="bg-brand-cream/40 p-6 rounded-lg border border-gray-200 max-w-sm mx-auto mb-8 shadow-2xs text-left font-sans">
                  <span className="text-sm text-brand-gold block font-semibold uppercase tracking-wider mb-3">
                    Reservation Summary
                  </span>
                  <div className="space-y-1.5 text-sm text-brand-espresso">
                    <div className="flex justify-between">
                      <span className="text-brand-espresso/70">Confirmation</span>
                      <span className="font-mono font-bold">#KPR-{confirmId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-brand-espresso/70">Date</span>
                      <span className="font-bold">{date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-brand-espresso/70">Party Size</span>
                      <span className="font-bold">{guests} {guests === '1' ? 'guest' : 'guests'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-brand-espresso/70">Occasion</span>
                      <span className="font-bold">{selectedEventLabel}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setName('');
                      setEmail('');
                      setPhone('');
                      setDate('');
                      setComments('');
                    }}
                    className="bg-white border border-gray-200 hover:bg-gray-50 text-brand-espresso font-sans font-bold text-sm px-6 py-3 rounded-lg transition-colors cursor-pointer"
                  >
                    Make Another Reservation
                  </button>
                  <button
                    onClick={() => { window.location.href = '/menu'; }}
                    className="bg-brand-forest text-brand-cream border-2 border-transparent hover:bg-white hover:text-brand-forest hover:border-brand-forest font-sans font-bold text-sm px-6 py-3 rounded-lg transition-all cursor-pointer"
                  >
                    Browse the Menu
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Highlights */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <h3 className="text-2xl font-serif font-bold text-brand-espresso tracking-tight">
              Why Book Ahead
            </h3>
            <p className="text-base text-brand-espresso/80 leading-relaxed font-sans mb-2">
              Walk-ins are always welcome, but a quick reservation guarantees your spot on our busiest nights — and lets us roll out the red carpet for celebrations.
            </p>

            <div className="flex flex-col gap-6">
              {highlights.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div key={idx} className="flex gap-4 items-start p-5 bg-white rounded-lg border border-gray-50 shadow-3xs">
                    <div className="bg-brand-gold/15 text-brand-gold p-3 rounded-xl shrink-0">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-sm text-brand-espresso mb-1">
                        {item.title}
                      </h4>
                      <p className="text-base text-brand-espresso/70 leading-relaxed font-sans">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-brand-forest text-brand-cream rounded-2xl p-5 flex gap-3.5 items-start">
              <Utensils className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider mb-1 font-sans text-brand-gold-light">
                  Planning a bigger event?
                </h4>
                <p className="text-base text-brand-cream/85 leading-relaxed font-sans mb-3">
                  For private events, group buyouts, and full catering, our events team can build the perfect spread for your celebration.
                </p>
                <button
                  onClick={() => { window.location.href = '/catering'; }}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-gold-light hover:text-white transition-colors cursor-pointer font-sans"
                >
                  Explore Catering & Events <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* FAQs Accordion Section */}
        <div className="max-w-4xl mx-auto pt-10 border-t border-gray-200">
          <div className="text-center mb-10">
            <HelpCircle className="w-8 h-8 text-brand-gold mx-auto mb-3" />
            <h3 className="text-2xl font-serif font-bold text-brand-espresso tracking-tight">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="flex flex-col gap-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-lg border border-gray-100 overflow-hidden shadow-3xs"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-brand-cream/10 transition-colors cursor-pointer"
                  >
                    <span className="font-serif font-bold text-sm md:text-base text-brand-espresso">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-brand-espresso/60 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-5 pt-1 text-base md:text-base text-brand-espresso/80 leading-relaxed border-t border-gray-50 font-sans">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
