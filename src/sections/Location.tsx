import React, { useState } from 'react';
import { MapPin, Phone, Mail, Instagram, Compass, ExternalLink, CalendarDays, Send, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { StoreMap } from '../components/StoreMap';
import { TikTokIcon } from '../components/icons/TikTokIcon';
import { INSTAGRAM_URL, TIKTOK_URL, GOOGLE_MAPS_DIRECTIONS_URL } from '../data/business';

export function Location() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', address: '', message: '' });
  const [sent, setSent] = useState(false);
  const update = (key: keyof typeof form, value: string) => setForm((prev) => ({ ...prev, [key]: value }));
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setSent(true);
  };

  return (
    <div id="location-page-root" className="kp-page bg-brand-cream/30">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="kp-section-header">
          <span className="kp-eyebrow">
            Thornhill Neighborhood Hub
          </span>
          <h2 className="kp-heading">
            Contact Us
          </h2>
          <p className="kp-subtext">
            Questions, custom orders, or catering inquiries? Reach out any way that's easiest for you — our live hours and map are just below.
          </p>
        </div>

        {/* Content Split: Details vs Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">

          {/* Left Block: Contact Details (7 Columns) */}
          <div className="lg:col-span-7 flex flex-col gap-8">

            {/* Address & Quick Contacts Card */}
            <div className="bg-white p-6 md:p-8 rounded-lg border border-gray-100 shadow-sm">
              <h3 className="font-serif font-bold text-lg md:text-xl text-brand-espresso mb-6 flex items-center gap-2">
                <Compass className="w-5 h-5 text-brand-gold" /> Address & Contact
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-brand-gold uppercase tracking-wider mb-2 font-sans">
                    Storefront Address
                  </span>
                  <p className="flex items-start gap-1.5 text-base text-brand-espresso font-semibold leading-relaxed font-sans mb-3">
                    <MapPin className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                    <span>
                      7700 Bathurst St, Unit 12<br />
                      Thornhill, ON L4J 0A7<br />
                      Canada
                    </span>
                  </p>
                  <a
                    href={GOOGLE_MAPS_DIRECTIONS_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-brand-gold hover:underline font-bold inline-flex items-center gap-1 font-sans"
                  >
                    Open in Maps <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="flex flex-col">
                  <span className="text-sm font-bold text-brand-gold uppercase tracking-wider mb-2 font-sans">
                    Call / Email
                  </span>
                  <div className="flex flex-col gap-1 text-base text-brand-espresso font-semibold leading-relaxed font-sans mb-3">
                    <span className="flex items-center gap-1.5">
                      <Phone className="w-4 h-4 text-brand-gold shrink-0" /> (905) 886-7444
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Mail className="w-4 h-4 text-brand-gold shrink-0" /> info@kapara.ca
                    </span>
                  </div>
                  <span className="text-base text-brand-espresso/60 leading-relaxed font-sans">
                    Call ahead for custom orders or catering inquiries.
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="text-sm font-bold text-brand-gold uppercase tracking-wider mb-2 font-sans">
                    Social Media
                  </span>
                  <div className="flex flex-col gap-2 mb-3">
                    <a
                      href={INSTAGRAM_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 text-sm font-semibold text-brand-espresso hover:text-brand-gold transition-colors font-sans"
                    >
                      <Instagram className="w-4 h-4 text-brand-gold" /> @kaparatoronto
                    </a>
                    <a
                      href={TIKTOK_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 text-sm font-semibold text-brand-espresso hover:text-brand-gold transition-colors font-sans"
                    >
                      <TikTokIcon className="w-4 h-4 text-brand-gold" /> @kaparatoronto
                    </a>
                  </div>
                  <p className="text-base text-brand-espresso/60 leading-relaxed font-sans">
                    Order online anytime through Clover for fast in-store pickup!
                  </p>
                </div>

              </div>
            </div>

          </div>

          {/* Right Block: Map Mock (5 Columns) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Google Map Card */}
            <div className="bg-white rounded-lg overflow-hidden border border-gray-100 shadow-sm relative">
              <div className="p-4 bg-brand-cream/10 border-b border-gray-100 flex justify-between items-center">
                <span className="text-sm font-bold text-brand-espresso uppercase tracking-wider font-sans">
                  Interactive Store Finder
                </span>
                <span className="bg-brand-forest text-brand-cream text-sm font-bold px-2 py-0.5 rounded-full uppercase tracking-wider font-sans">
                  Bathurst & Clark
                </span>
              </div>

              <StoreMap bordered={false} />

              <div className="p-4 bg-brand-cream/15 text-center text-base text-brand-espresso/80 font-sans leading-relaxed">
                We are located at 7700 Bathurst St, Unit 12, in the plaza near Bathurst St. & Clark Ave. Free parking is available directly in front.
              </div>
            </div>

            {/* Special notices (Holiday early closures) */}
            <div className="bg-brand-gold/10 p-5 rounded-3xl border border-brand-gold/25 flex gap-3.5">
              <CalendarDays className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-brand-espresso uppercase tracking-wider mb-1 font-sans">
                  Holiday & Sabbath Closures
                </h4>
                <p className="text-base text-brand-espresso/85 leading-relaxed font-sans">
                  To honor Shabbat, Kapara keeps shorter hours on Friday (10 AM – 3:30 PM) and reopens Saturday night for a lively Motzei Shabbat late-night service (10 PM – 12:30 AM). We also close on primary Jewish festivals (Passover, Shavuot, Rosh Hashanah, Yom Kippur, Sukkot). Thank you for respecting our family values!
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* Contact Form */}
        <div className="border-t border-gray-200 pt-12 mb-16">
          <div className="text-center mb-10 max-w-xl mx-auto">
            <span className="kp-eyebrow">
              Contact Us
            </span>
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-brand-espresso tracking-tight">
              Write Us a Message
            </h3>
          </div>

          <div className="max-w-3xl mx-auto bg-white rounded-lg border border-gray-100 shadow-sm p-8 md:p-10">
            {!sent ? (
              <form onSubmit={handleContactSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="kp-form-label-sm">Name</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => update('name', e.target.value)}
                      required
                      className="kp-input-block"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="kp-form-label-sm">Phone</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => update('phone', e.target.value)}
                      className="kp-input-block"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="kp-form-label-sm">Email</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => update('email', e.target.value)}
                      required
                      className="kp-input-block"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="kp-form-label-sm">Address</label>
                    <input
                      type="text"
                      value={form.address}
                      onChange={(e) => update('address', e.target.value)}
                      className="kp-input-block"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="kp-form-label-sm">Personal Message</label>
                  <textarea
                    rows={5}
                    value={form.message}
                    onChange={(e) => update('message', e.target.value)}
                    className="w-full bg-brand-cream/10 border border-gray-200 rounded-2xl px-4 py-3 text-sm focus:outline-hidden focus:border-brand-gold font-sans text-brand-espresso resize-none shadow-2xs"
                  />
                </div>

                <p className="text-sm text-brand-espresso/40 font-sans">
                  This form is protected by reCAPTCHA — the Google Privacy Policy and Terms of Service apply.
                </p>

                <div className="flex justify-center pt-1">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 bg-brand-forest text-white font-bold text-sm uppercase tracking-wider px-10 py-3.5 rounded-lg hover:bg-white hover:text-brand-forest transition-colors duration-200 cursor-pointer shadow-sm active:scale-98"
                  >
                    Send Message
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-8">
                <div className="kp-success-icon">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-serif font-bold text-brand-espresso mb-2">
                  Message Sent!
                </h4>
                <p className="text-brand-espresso/80 text-base max-w-sm mx-auto leading-relaxed mb-6 font-sans">
                  Thank you, <span className="font-semibold text-brand-espresso">{form.name}</span>! We've received your message and will get back to you shortly.
                </p>
                <button
                  onClick={() => {
                    setSent(false);
                    setForm({ name: '', phone: '', email: '', address: '', message: '' });
                  }}
                  className="bg-white border border-gray-200 hover:bg-brand-cream/40 text-brand-espresso font-sans font-bold text-sm px-6 py-3 rounded-lg transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
