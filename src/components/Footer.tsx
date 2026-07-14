import { MapPin, Phone, Mail, Instagram } from 'lucide-react';
import { TikTokIcon } from './icons/TikTokIcon';
import { DAY_NAMES, scheduleLabel, ADDRESS_LINE, INSTAGRAM_URL, TIKTOK_URL } from '../data/business';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const links = {
    menu: [
      { label: 'Full Menu', href: '/menu' },
      { label: 'Starters', href: '/menu?category=starters' },
      { label: 'Schnitzels', href: '/menu?category=schnitzels' },
      { label: 'On The Grill', href: '/menu?category=grill' },
      { label: 'More Kapara...', href: '/menu?category=more' },
      { label: 'Sides', href: '/menu?category=sides' },
    ],
    catering: [
      { label: 'Event Catering', href: '/catering' },
      { label: 'Private Events', href: '/catering' },
      { label: 'Bar & Bat Mitzvahs', href: '/catering' },
      { label: 'Shabbat & Holidays', href: '/catering' },
    ],
    // Sourced from the shared SCHEDULE in data/business.ts — update hours
    // there and this list (and the live Store Hours widget) both follow.
    hours: DAY_NAMES.map((day, idx) => ({ day, label: scheduleLabel(idx) })),
    contact: [
      { icon: MapPin, label: ADDRESS_LINE },
      { icon: Phone, label: 'Phone: (905) 886-7444' },
      { icon: Mail, label: 'info@kapara.ca' },
    ],
  };

  return (
    <footer id="footer-main" className="bg-brand-forest border-t border-white/10 px-6 pt-16 pb-12">
      <div className="max-w-[88rem] mx-auto animate-fade-in">

        {/* Top Grid */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10 mb-16">

          {/* Logo Brand Segment */}
          <div className="col-span-2 flex flex-col items-start">
            <a
              href="/"
              className="flex items-center select-none mb-6 cursor-pointer"
            >
              <img
                src="/brand/kapara-logo-light.png"
                alt="Kapara"
                className="h-10 w-auto"
              />
            </a>
            <p className="text-base text-brand-cream/75 max-w-xs leading-relaxed font-sans mb-6">
              Serving premium flame-grilled kosher skewers, legendary golden schnitzels, loaded street fries, and creamy house-made hummus in Thornhill/Vaughan.
            </p>
            <div className="flex items-center gap-2 bg-white border border-white/20 p-2.5 px-3.5 rounded-2xl shadow-xs">
              <img
                src="/brand/corcert2.png"
                alt="COR Kosher Certified"
                className="h-8 w-auto object-contain"
              />
              <span className="text-sm font-semibold text-brand-espresso font-sans">
                100% COR Kosher Certified Meat
              </span>
            </div>

            <div className="flex items-center gap-3 mt-6">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                aria-label="Kapara on Instagram"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 text-brand-cream flex items-center justify-center transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={TIKTOK_URL}
                target="_blank"
                rel="noreferrer"
                aria-label="Kapara on TikTok"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 text-brand-cream flex items-center justify-center transition-colors"
              >
                <TikTokIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links segment */}
          <div>
            <h6 className="kp-footer-heading">Our Menu</h6>
            <div className="flex flex-col gap-2.5">
              {links.menu.map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  className="text-sm text-brand-cream/75 hover:text-brand-gold-light transition-colors font-sans cursor-pointer"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h6 className="kp-footer-heading">Custom Catering</h6>
            <div className="flex flex-col gap-2.5">
              {links.catering.map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  className="text-sm text-brand-cream/75 hover:text-brand-gold-light transition-colors font-sans cursor-pointer"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h6 className="kp-footer-heading">Store Hours</h6>
            <div className="flex flex-col gap-2.5">
              {links.hours.map((item, idx) => (
                <a
                  key={idx}
                  href="/location"
                  className="text-sm text-brand-cream/75 font-sans hover:text-brand-gold-light cursor-pointer transition-colors"
                >
                  {item.day} {item.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h6 className="kp-footer-heading">Information</h6>
            <div className="flex flex-col gap-3">
              {links.contact.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <a
                    key={idx}
                    href="/location"
                    className="flex items-start gap-2 text-sm text-brand-cream/75 font-sans hover:text-brand-gold-light cursor-pointer transition-colors"
                  >
                    <Icon className="w-4 h-4 shrink-0 mt-0.5 text-brand-gold-light" />
                    <span>{item.label}</span>
                  </a>
                );
              })}
            </div>
          </div>

        </div>

        {/* Bottom Disclaimer and Copyright */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-base text-brand-cream/60 leading-relaxed font-sans">
              Supervision: Kapara Bistro & Grill is operated under strict Kashruth Council of Canada (COR) Kosher meat supervision. All meats are premium Glatt Kosher. For detailed inquiries regarding our kashruth procedures, ingredients, or private event catering, please feel free to speak with our supervisor on-site or contact us directly.
            </p>
          </div>
          <div className="flex flex-col md:items-end justify-between shrink-0 font-sans gap-3">
            <a
              href="https://talkerstein.com/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center group"
            >
              <img
                src="/brand/talkerstein-consulting-kapara.svg"
                alt="Talkerstein Consulting Group"
                className="h-6 w-auto max-w-[300px] opacity-90 group-hover:opacity-100 transition-opacity brightness-0 invert"
              />
            </a>
            <div className="flex flex-wrap items-center gap-4">
              <span className="text-sm text-brand-cream/70 whitespace-nowrap">
                &copy; {currentYear} Kapara. All rights reserved.
              </span>
              <span className="text-sm text-brand-cream/50 hover:text-brand-gold-light transition-colors cursor-pointer">Terms of Taste</span>
              <span className="text-sm text-brand-cream/50 hover:text-brand-gold-light transition-colors cursor-pointer">Privacy Policy</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
