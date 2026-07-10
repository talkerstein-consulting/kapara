import React, { useState } from 'react';
import { Calendar, Users, Phone, Mail, User, Info, ArrowRight, CheckCircle2, Flame, Sparkles, ChefHat, Utensils } from 'lucide-react';
import { motion } from 'motion/react';

export function Catering() {
  const [guests, setGuests] = useState(30);
  const [mealType, setMealType] = useState<'quickserve' | 'grill' | 'spread'>('grill');

  // Form submission state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const configs = {
    quickserve: {
      rate: 18.00,
      tag: 'Quick Serve',
      label: 'Build-Your-Own Pita Bar',
      desc: 'Fresh, warm pitas with your choice of shawarma, falafel, or sabich, plus Israeli chopped salads, house-made hummus, tahini, and all the fixings. Casual, fast, and always a crowd-pleaser.',
      pitaRatio: 2.0,
      skewerRatio: 1.0,
      hummusRatio: 0.4,
      saladRatio: 0.3,
    },
    grill: {
      rate: 32.00,
      tag: 'Full Catering',
      label: 'The Kapara Grill Feast',
      desc: 'Our signature spread: flame-grilled kebabs, chicken and steak skewers, golden crispy schnitzels, fragrant basmati rice, hand-cut fries, fresh salads, and a full sauce bar. Cooked fresh for your event.',
      pitaRatio: 1.0,
      skewerRatio: 2.0,
      hummusRatio: 0.4,
      saladRatio: 0.4,
    },
    spread: {
      rate: 42.00,
      tag: 'Private Events',
      label: 'Full Mediterranean Spread',
      desc: 'The works, ideal for private events and celebrations: grill platters, a loaded hummus and mezze bar, Moroccan cigars, fresh salads, hot sides, and dessert. We handle the whole table so you can host.',
      pitaRatio: 1.2,
      skewerRatio: 2.5,
      hummusRatio: 0.6,
      saladRatio: 0.5,
    },
  };

  const activeConfig = configs[mealType];
  const estPitas = Math.ceil(guests * activeConfig.pitaRatio);
  const estSkewers = Math.ceil(guests * activeConfig.skewerRatio);
  const estHummus = Math.max(1, Math.ceil(guests * activeConfig.hummusRatio));
  const estSalads = Math.max(1, Math.ceil(guests * activeConfig.saladRatio));
  const totalCost = guests * activeConfig.rate;

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email) return;
    setSubmitted(true);
  };

  const servicePillars = [
    {
      icon: Utensils,
      title: 'Quick Serve',
      desc: 'Fresh pita bars with shawarma, falafel, or sabich — fast, casual catering for offices and drop-offs.',
    },
    {
      icon: Flame,
      title: 'Event Catering',
      desc: 'Flame-grilled skewers, schnitzels, salads, and sides delivered fresh for gatherings of any size.',
    },
    {
      icon: Sparkles,
      title: 'Private Events',
      desc: 'Host your celebration with us. Birthdays, Bar/Bat Mitzvahs, corporate dinners, and full buyouts.',
    },
  ];

  return (
    <div id="catering-page-root" className="min-h-screen bg-brand-cream/30 pt-28 pb-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-brand-gold text-xs font-bold tracking-widest uppercase mb-2 block font-sans">
            Thornhill Catering & Private Events
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-espresso mb-4 tracking-tight">
            Catering & Events
          </h2>
          <p className="text-brand-espresso/80 text-sm md:text-base font-sans">
            Bring the flavors of Kapara to your celebration. From casual pita bars to full private-event spreads, we cater birthdays, Bar/Bat Mitzvahs, corporate dinners, and Shabbat gatherings — all kosher.
          </p>
        </div>

        {/* Service Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-14">
          {servicePillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div key={idx} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-3xs flex flex-col items-start">
                <div className="w-11 h-11 rounded-2xl bg-brand-gold/15 text-brand-gold flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-lg text-brand-espresso mb-1.5">{pillar.title}</h3>
                <p className="text-xs text-brand-espresso/70 leading-relaxed font-sans">{pillar.desc}</p>
              </div>
            );
          })}
        </div>

        {!submitted ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

            {/* Left Column: Live Calculator & Package Selectors (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col gap-6">

              {/* Package Selection Box */}
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                <span className="text-xs font-bold text-brand-gold uppercase tracking-widest mb-3 block font-sans">
                  Step 1: Choose Your Catering Package
                </span>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
                  {(['quickserve', 'grill', 'spread'] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setMealType(type)}
                      className={`p-4 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                        mealType === type
                          ? 'bg-brand-espresso text-brand-cream border-brand-espresso shadow-md'
                          : 'bg-brand-cream/15 text-brand-espresso border-gray-200 hover:bg-brand-cream/30'
                      }`}
                    >
                      <span className={`text-xs font-bold uppercase tracking-wider mb-2 block ${
                        mealType === type ? 'text-brand-gold' : 'text-brand-gold/80'
                      }`}>
                        {configs[type].tag}
                      </span>
                      <span className="font-serif font-bold text-sm block mb-1">
                        {configs[type].label}
                      </span>
                      <span className="text-xs font-mono font-semibold mt-4 block">
                        ${configs[type].rate.toFixed(2)}/guest
                      </span>
                    </button>
                  ))}
                </div>

                <div className="bg-brand-cream/20 p-4 rounded-xl border border-gray-100">
                  <p className="text-xs text-brand-espresso/85 leading-relaxed font-sans">
                    <span className="font-bold block mb-0.5 text-brand-espresso font-serif">Package Details:</span>
                    {activeConfig.desc}
                  </p>
                </div>
              </div>

              {/* Guests Count Slider */}
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <span className="text-xs font-bold text-brand-gold uppercase tracking-widest block font-sans">
                      Step 2: Guest Count
                    </span>
                    <span className="text-sm font-serif font-bold text-brand-espresso">
                      How many guests are you feeding?
                    </span>
                  </div>
                  <span className="text-xl font-mono font-bold text-brand-cream bg-brand-espresso px-4 py-1.5 rounded-full shadow-sm">
                    {guests} guests
                  </span>
                </div>

                <input
                  type="range"
                  min="10"
                  max="200"
                  step="5"
                  value={guests}
                  onChange={(e) => setGuests(parseInt(e.target.value))}
                  className="w-full accent-brand-gold cursor-pointer h-2 bg-gray-200 rounded-lg appearance-none my-4"
                />

                <div className="flex justify-between text-[11px] text-brand-espresso/50 font-sans">
                  <span>10 guests (Min)</span>
                  <span>100 guests</span>
                  <span>200 guests (Max)</span>
                </div>
              </div>

              {/* Real-time Food Volume Recommendations */}
              <div className="bg-brand-espresso text-brand-cream rounded-3xl p-6 relative overflow-hidden shadow-md">
                <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 opacity-5 pointer-events-none">
                  <ChefHat className="w-56 h-56" />
                </div>

                <div className="flex justify-between items-center mb-4 pb-4 border-b border-brand-cream/15">
                  <span className="text-brand-gold text-xs font-bold tracking-widest uppercase font-sans">
                    Step 3: Recommended Amounts
                  </span>
                  <span className="bg-brand-gold text-brand-espresso text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wide uppercase font-sans">
                    Kosher Certified
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white/10 p-4 rounded-2xl border border-white/5 text-center">
                    <span className="text-brand-gold text-xs font-bold uppercase block tracking-wider mb-1 font-sans">
                      Pitas
                    </span>
                    <span className="text-2xl font-mono font-bold block text-brand-cream">
                      {estPitas}
                    </span>
                    <span className="text-[10px] text-brand-cream/60 font-sans block mt-0.5">
                      Fresh & warm
                    </span>
                  </div>

                  <div className="bg-white/10 p-4 rounded-2xl border border-white/5 text-center">
                    <span className="text-brand-gold text-xs font-bold uppercase block tracking-wider mb-1 font-sans">
                      Skewers
                    </span>
                    <span className="text-2xl font-mono font-bold block text-brand-cream">
                      {estSkewers}
                    </span>
                    <span className="text-[10px] text-brand-cream/60 font-sans block mt-0.5">
                      Grill & schnitzel
                    </span>
                  </div>

                  <div className="bg-white/10 p-4 rounded-2xl border border-white/5 text-center">
                    <span className="text-brand-gold text-xs font-bold uppercase block tracking-wider mb-1 font-sans">
                      Hummus Bowls
                    </span>
                    <span className="text-2xl font-mono font-bold block text-brand-cream">
                      {estHummus}
                    </span>
                    <span className="text-[10px] text-brand-cream/60 font-sans block mt-0.5">
                      Mezze & dips
                    </span>
                  </div>

                  <div className="bg-white/10 p-4 rounded-2xl border border-white/5 text-center">
                    <span className="text-brand-gold text-xs font-bold uppercase block tracking-wider mb-1 font-sans">
                      Salad Trays
                    </span>
                    <span className="text-2xl font-mono font-bold block text-brand-cream">
                      {estSalads}
                    </span>
                    <span className="text-[10px] text-brand-cream/60 font-sans block mt-0.5">
                      Fresh sides
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-brand-cream/15 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                  <div>
                    <span className="text-[11px] text-brand-cream/60 block font-semibold uppercase tracking-wider font-sans">
                      Estimated Catering Subtotal
                    </span>
                    <span className="text-3xl font-mono font-bold text-brand-gold">
                      ${totalCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="text-[11px] text-brand-cream/70 font-sans bg-white/5 p-2 rounded-xl text-left max-w-xs">
                    *Estimate based on current per-guest pricing. Tax, delivery, and optional on-site setup not included.
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Booking Form (5 Cols) */}
            <div className="lg:col-span-5 bg-white p-8 rounded-3xl border border-gray-100 shadow-md">
              <div className="flex gap-3 items-center pb-4 border-b border-gray-100 mb-6">
                <div className="w-10 h-10 rounded-xl bg-brand-gold/10 flex items-center justify-center text-brand-gold">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base text-brand-espresso leading-none">
                    Request Catering
                  </h3>
                  <span className="text-xs text-brand-espresso/60 font-sans">
                    Tell us about your event and we will follow up.
                  </span>
                </div>
              </div>

              <form onSubmit={handleSubmitInquiry} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-brand-espresso/60 uppercase px-2 font-sans">
                    Contact Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full bg-brand-cream/10 border border-gray-200 rounded-full pl-10 pr-4 py-2.5 text-sm focus:outline-hidden focus:border-brand-gold font-sans text-brand-espresso"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-brand-espresso/60 uppercase px-2 font-sans">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="tel"
                        placeholder="(905) 886-7444"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="w-full bg-brand-cream/10 border border-gray-200 rounded-full pl-10 pr-4 py-2.5 text-sm focus:outline-hidden focus:border-brand-gold font-sans text-brand-espresso"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-brand-espresso/60 uppercase px-2 font-sans">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="email"
                        placeholder="sarah@domain.ca"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full bg-brand-cream/10 border border-gray-200 rounded-full pl-10 pr-4 py-2.5 text-sm focus:outline-hidden focus:border-brand-gold font-sans text-brand-espresso"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-brand-espresso/60 uppercase px-2 font-sans">
                    Date of Event
                  </label>
                  <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    required
                    className="w-full bg-brand-cream/10 border border-gray-200 rounded-2xl px-5 py-2.5 text-sm focus:outline-hidden focus:border-brand-gold font-sans text-brand-espresso"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-brand-espresso/60 uppercase px-2 font-sans">
                    Menu Requests or Dietary Notes
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g., Please include extra falafel and a vegan platter. Delivery to a venue in Vaughan. Any allergies to note..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-brand-cream/10 border border-gray-200 rounded-2xl px-5 py-3 text-sm focus:outline-hidden focus:border-brand-gold font-sans text-brand-espresso resize-none"
                  />
                </div>

                <div className="flex gap-2.5 bg-brand-gold/10 p-3 rounded-2xl border border-brand-gold/20 text-brand-espresso text-xs font-sans">
                  <Info className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                  <span>
                    No upfront payment required to request a quote. Our team will call you within 1 business day to customize the menu, arrange delivery or on-site setup, and finalize details.
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand-espresso text-brand-cream hover:bg-brand-gold hover:text-brand-espresso font-sans font-semibold py-3.5 rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm mt-2"
                >
                  Request Catering Quote
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>

          </div>
        ) : (
          <div className="max-w-2xl mx-auto bg-white p-12 rounded-3xl border border-gray-100 text-center shadow-lg">
            <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-3xl font-serif font-bold text-brand-espresso mb-3 tracking-tight">
              Catering Request Sent!
            </h3>
            <p className="text-brand-espresso/80 text-sm leading-relaxed mb-8 max-w-md mx-auto font-sans">
              Thank you, <span className="font-semibold text-brand-espresso">{name}</span>! Our events team has received your request for <span className="font-semibold text-brand-espresso">{guests} guests</span> on <span className="font-semibold text-brand-espresso">{eventDate}</span>.
            </p>

            <div className="bg-brand-cream/40 p-6 rounded-2xl border border-gray-200 text-left max-w-md mx-auto mb-8 font-sans">
              <span className="text-xs text-brand-gold block font-semibold uppercase tracking-wider mb-2">
                Draft Event Estimate
              </span>
              <div className="space-y-1.5 text-xs text-brand-espresso">
                <div className="flex justify-between">
                  <span>Package Selected:</span>
                  <span className="font-bold">{activeConfig.label}</span>
                </div>
                <div className="flex justify-between">
                  <span>Fresh Pitas:</span>
                  <span className="font-mono font-bold">{estPitas}</span>
                </div>
                <div className="flex justify-between">
                  <span>Grill & Schnitzel Skewers:</span>
                  <span className="font-mono font-bold">{estSkewers} pcs</span>
                </div>
                <div className="flex justify-between">
                  <span>Hummus & Mezze Bowls:</span>
                  <span className="font-mono font-bold">{estHummus}</span>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-2 font-bold">
                  <span>Estimated Budget:</span>
                  <span className="font-mono text-brand-gold">${totalCost.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-brand-espresso/60 mb-8 max-w-sm mx-auto font-sans">
              We will confirm availability for your date and reach out shortly at <span className="font-bold">{phone}</span> or <span className="font-bold">{email}</span> to finalize the menu and setup details!
            </p>

            <button
              onClick={() => {
                setSubmitted(false);
                setName('');
                setPhone('');
                setEmail('');
                setEventDate('');
                setNotes('');
              }}
              className="bg-brand-espresso text-brand-cream hover:bg-brand-gold hover:text-brand-espresso font-sans font-bold text-xs px-8 py-3.5 rounded-full transition-all cursor-pointer"
            >
              Plan Another Event
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
