import React, { useState } from 'react';
import { MapPin, Clock, ShieldCheck, Phone, Mail, Instagram, Compass, ExternalLink, CalendarDays, Send, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export function Location() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', address: '', message: '' });
  const [sent, setSent] = useState(false);
  const update = (key: keyof typeof form, value: string) => setForm((prev) => ({ ...prev, [key]: value }));
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setSent(true);
  };

  const schedule = [
    { days: 'Sunday - Thursday', hours: '12:00 PM - 10:00 PM', note: 'Full menu & kitchen open' },
    { days: 'Friday', hours: 'CLOSED', note: 'Closed for Shabbat', closed: true },
    { days: 'Saturday', hours: '8:00 PM - 12:30 AM', note: 'Motzei Shabbat late-night service', highlight: true },
  ];

  const standards = [
    { title: 'COR Kosher Meat Certification', desc: 'Operating under strict local Kashruth Council of Canada (COR) meat supervision. High standards of Glatt Kosher integrity.' },
    { title: 'House-Made Marinades', desc: 'All meats are marinated daily with fresh traditional Mediterranean herbs, extra virgin olive oil, and premium spices.' },
    { title: 'Glatt Kosher Meats', desc: 'Our beef, lamb, and pargiot (chicken thighs) are exclusively Glatt Kosher, sourced from the finest local distributors.' },
  ];

  return (
    <div id="location-page-root" className="min-h-screen bg-brand-cream/30 pt-28 pb-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-brand-gold text-xs font-bold tracking-widest uppercase mb-2 block font-sans">
            Thornhill Neighborhood Hub
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-espresso mb-4 tracking-tight">
            Hours & Location
          </h2>
          <p className="text-brand-espresso/80 text-sm md:text-base font-sans">
            Come visit our warm brick-and-mortar storefront or order online for fast in-store pickup. We look forward to welcoming you!
          </p>
        </div>

        {/* Content Split: Details vs Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          
          {/* Left Block: Location / Hours (7 Columns) */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            
            {/* Hours card */}
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="font-serif font-bold text-lg md:text-xl text-brand-espresso mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-brand-gold" /> Weekly Store Hours
              </h3>
              
              <div className="flex flex-col gap-3">
                {schedule.map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border transition-all ${
                      item.highlight
                        ? 'bg-brand-gold/10 border-brand-gold/30'
                        : item.closed
                        ? 'bg-brand-cream/10 border-gray-100'
                        : 'bg-white border-gray-100'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className={`text-sm font-bold ${
                        item.closed ? 'text-brand-espresso/50' : 'text-brand-espresso'
                      }`}>
                        {item.days}
                      </span>
                      <span className={`font-mono text-xs font-bold ${
                        item.highlight
                          ? 'text-brand-espresso bg-brand-gold px-2.5 py-0.5 rounded-full'
                          : item.closed
                          ? 'text-red-600 font-sans'
                          : 'text-brand-espresso/80'
                      }`}>
                        {item.hours}
                      </span>
                    </div>
                    <span className="text-[11px] text-brand-espresso/60 block font-sans">
                      {item.note}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Address & Quick Contacts Card */}
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="font-serif font-bold text-lg md:text-xl text-brand-espresso mb-6 flex items-center gap-2">
                <Compass className="w-5 h-5 text-brand-gold" /> Address & Contact
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-brand-gold uppercase tracking-wider mb-2 font-sans">
                    Storefront Address
                  </span>
                  <p className="text-sm text-brand-espresso font-semibold leading-relaxed font-sans mb-3">
                    7700 Bathurst St, Unit 12<br />
                    Thornhill, ON L4J 0A7<br />
                    Canada
                  </p>
                  <a
                    href="https://maps.google.com/?q=7700+Bathurst+St+Unit+12+Thornhill+ON+L4J+0A7"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-brand-gold hover:underline font-bold inline-flex items-center gap-1 font-sans"
                  >
                    Open in Maps <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-brand-gold uppercase tracking-wider mb-2 font-sans">
                    Call / Email
                  </span>
                  <p className="text-sm text-brand-espresso font-semibold leading-relaxed font-sans mb-3">
                    Phone: (905) 886-7444<br />
                    info@kapara.ca
                  </p>
                  <span className="text-xs text-brand-espresso/60 leading-relaxed font-sans">
                    Call ahead for custom orders or catering inquiries.
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-brand-gold uppercase tracking-wider mb-2 font-sans">
                    Social Media
                  </span>
                  <a
                    href="https://www.clover.com/online-ordering/kapara-by-keechenpappi-vaughan"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-sm font-semibold text-brand-espresso hover:text-brand-gold transition-colors font-sans mb-3"
                  >
                    <Instagram className="w-4 h-4 text-brand-gold" /> @kaparatoronto
                  </a>
                  <p className="text-xs text-brand-espresso/60 leading-relaxed font-sans">
                    Order online anytime through Clover for fast in-store pickup!
                  </p>
                </div>

              </div>
            </div>

          </div>

          {/* Right Block: Map Mock (5 Columns) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Visual Vector Map Card */}
            <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm relative">
              <div className="p-4 bg-brand-cream/10 border-b border-gray-100 flex justify-between items-center">
                <span className="text-xs font-bold text-brand-espresso uppercase tracking-wider font-sans">
                  Interactive Store Finder
                </span>
                <span className="bg-brand-espresso text-brand-cream text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider font-sans">
                  Bathurst & Clark
                </span>
              </div>

              {/* Styled Vector Map Mock */}
              <div className="h-80 bg-brand-cream/20 relative overflow-hidden select-none flex items-center justify-center">
                {/* Simulated Roads/Blocks */}
                <div className="absolute inset-0 opacity-15">
                  <div className="absolute top-1/2 left-0 w-full h-8 bg-brand-espresso -translate-y-1/2" /> {/* Bathurst St */}
                  <div className="absolute top-0 left-1/3 w-8 h-full bg-brand-espresso" /> {/* Centre St */}
                  <div className="absolute top-1/3 left-0 w-full h-4 bg-brand-espresso" />
                  <div className="absolute top-0 left-2/3 w-4 h-full bg-brand-espresso" />
                </div>

                {/* Nearby landmarks */}
                <div className="absolute top-8 left-6 text-[10px] text-brand-espresso/40 font-bold tracking-wide">
                  Promenade Mall
                </div>
                <div className="absolute bottom-8 right-6 text-[10px] text-brand-espresso/40 font-bold tracking-wide">
                  Garnet A. Williams CC
                </div>

                {/* Main Bakery Pin Pulse */}
                <div className="absolute top-[45%] left-[32%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  <div className="absolute w-12 h-12 bg-brand-gold/25 rounded-full animate-ping" />
                  <div className="w-10 h-10 bg-brand-espresso text-brand-gold rounded-full flex items-center justify-center shadow-lg border-2 border-brand-cream relative z-10">
                    <MapPin className="w-5 h-5 animate-bounce" />
                  </div>
                  <div className="bg-brand-espresso text-white text-[10px] font-bold px-3 py-1 rounded-md mt-2 shadow-md border border-brand-gold/30 z-10 whitespace-nowrap font-sans">
                    KAPARA
                  </div>
                </div>

                {/* Map Grid controls (Visual decorative elements) */}
                <div className="absolute bottom-4 left-4 bg-white/80 p-1.5 rounded-lg flex flex-col gap-1 shadow-2xs border border-gray-100">
                  <button className="w-6 h-6 rounded-md bg-white hover:bg-gray-100 flex items-center justify-center font-bold text-xs text-brand-espresso cursor-pointer shadow-3xs">+</button>
                  <button className="w-6 h-6 rounded-md bg-white hover:bg-gray-100 flex items-center justify-center font-bold text-xs text-brand-espresso cursor-pointer shadow-3xs">-</button>
                </div>
              </div>

              <div className="p-4 bg-brand-cream/15 text-center text-xs text-brand-espresso/80 font-sans leading-relaxed">
                We are located at 7700 Bathurst St, Unit 12, in the plaza near Bathurst St. & Clark Ave. Free parking is available directly in front.
              </div>
            </div>

            {/* Special notices (Holiday early closures) */}
            <div className="bg-brand-gold/10 p-5 rounded-3xl border border-brand-gold/25 flex gap-3.5">
              <CalendarDays className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-brand-espresso uppercase tracking-wider mb-1 font-sans">
                  Holiday & Sabbath Closures
                </h4>
                <p className="text-xs text-brand-espresso/85 leading-relaxed font-sans">
                  To honor Shabbat, Kapara is closed all day Friday and reopens Saturday evening for a lively Motzei Shabbat late-night service (8:00 PM – 12:30 AM). We also close on primary Jewish festivals (Passover, Shavuot, Rosh Hashanah, Yom Kippur, Sukkot). Thank you for respecting our family values!
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* Contact Form */}
        <div className="border-t border-gray-200 pt-12 mb-16">
          <div className="text-center mb-10 max-w-xl mx-auto">
            <span className="text-brand-gold text-xs font-bold tracking-widest uppercase mb-2 block font-sans">
              Contact Us
            </span>
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-brand-espresso tracking-tight">
              Write Us a Message
            </h3>
          </div>

          <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-gray-100 shadow-sm p-8 md:p-10">
            {!sent ? (
              <form onSubmit={handleContactSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-brand-espresso/70 uppercase px-1 font-sans">Name</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => update('name', e.target.value)}
                      required
                      className="w-full bg-brand-cream/10 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-hidden focus:border-brand-gold font-sans text-brand-espresso shadow-2xs"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-brand-espresso/70 uppercase px-1 font-sans">Phone</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => update('phone', e.target.value)}
                      className="w-full bg-brand-cream/10 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-hidden focus:border-brand-gold font-sans text-brand-espresso shadow-2xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-brand-espresso/70 uppercase px-1 font-sans">Email</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => update('email', e.target.value)}
                      required
                      className="w-full bg-brand-cream/10 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-hidden focus:border-brand-gold font-sans text-brand-espresso shadow-2xs"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-brand-espresso/70 uppercase px-1 font-sans">Address</label>
                    <input
                      type="text"
                      value={form.address}
                      onChange={(e) => update('address', e.target.value)}
                      className="w-full bg-brand-cream/10 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-hidden focus:border-brand-gold font-sans text-brand-espresso shadow-2xs"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-brand-espresso/70 uppercase px-1 font-sans">Personal Message</label>
                  <textarea
                    rows={5}
                    value={form.message}
                    onChange={(e) => update('message', e.target.value)}
                    className="w-full bg-brand-cream/10 border border-gray-200 rounded-2xl px-4 py-3 text-sm focus:outline-hidden focus:border-brand-gold font-sans text-brand-espresso resize-none shadow-2xs"
                  />
                </div>

                <p className="text-[11px] text-brand-espresso/40 font-sans">
                  This form is protected by reCAPTCHA — the Google Privacy Policy and Terms of Service apply.
                </p>

                <div className="flex justify-center pt-1">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 bg-brand-espresso text-white font-bold text-sm uppercase tracking-wider px-10 py-3.5 rounded-full hover:bg-brand-gold transition-colors duration-200 cursor-pointer shadow-sm active:scale-98"
                  >
                    Send Message
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-serif font-bold text-brand-espresso mb-2">
                  Message Sent!
                </h4>
                <p className="text-brand-espresso/80 text-sm max-w-sm mx-auto leading-relaxed mb-6 font-sans">
                  Thank you, <span className="font-semibold text-brand-espresso">{form.name}</span>! We've received your message and will get back to you shortly.
                </p>
                <button
                  onClick={() => {
                    setSent(false);
                    setForm({ name: '', phone: '', email: '', address: '', message: '' });
                  }}
                  className="bg-white border border-gray-200 hover:bg-brand-cream/40 text-brand-espresso font-sans font-bold text-xs px-6 py-3 rounded-full transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Dietary Standards Summary Box */}
        <div className="border-t border-gray-200 pt-12">
          <div className="text-center mb-10 max-w-xl mx-auto">
            <h3 className="text-2xl font-serif font-bold text-brand-espresso tracking-tight">
              Kashruth & Supervision Standards
            </h3>
            <p className="text-xs text-brand-espresso/60 leading-relaxed font-sans mt-2">
              We take kosher laws seriously. Full-time supervisors are present on-site during all hours of baking and ingredient receiving.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {standards.map((std, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-3xs text-center">
                <div className="w-10 h-10 bg-brand-gold/10 text-brand-gold rounded-full flex items-center justify-center mx-auto mb-4 border border-brand-gold/20">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="font-serif font-bold text-sm text-brand-espresso mb-2">
                  {std.title}
                </h4>
                <p className="text-xs text-brand-espresso/70 leading-relaxed font-sans">
                  {std.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
