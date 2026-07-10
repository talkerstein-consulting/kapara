import { ShieldCheck } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const links = {
    menu: [
      { label: 'Starters & Hummus', href: '/menu' },
      { label: 'Crispy Schnitzels', href: '/menu' },
      { label: 'On The Grill', href: '/menu' },
      { label: 'More Kapara', href: '/menu' },
    ],
    catering: [
      { label: 'Event Catering', href: '/catering' },
      { label: 'Private Events', href: '/catering' },
      { label: 'Bar & Bat Mitzvahs', href: '/catering' },
      { label: 'Shabbat & Holidays', href: '/catering' },
    ],
    hours: [
      { label: 'Sun - Thu: 12pm - 10pm' },
      { label: 'Friday: Closed (Shabbat)' },
      { label: 'Saturday: 8pm - 12:30am' },
      { label: 'Order online via Clover' },
    ],
    contact: [
      { label: '7700 Bathurst St, Unit 12, Thornhill' },
      { label: 'Phone: (905) 886-7444' },
      { label: 'info@kapara.ca' },
      { label: 'Thornhill, ON L4J 0A7' },
    ],
  };

  return (
    <footer id="footer-main" className="bg-brand-cream border-t border-gray-200 px-6 pt-16 pb-12">
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
                src="/brand/kapara-logo-dark.png"
                alt="Kapara"
                className="h-10 w-auto"
              />
            </a>
            <p className="text-sm text-brand-espresso/80 max-w-xs leading-relaxed font-sans mb-6">
              Serving premium flame-grilled kosher skewers, legendary golden schnitzels, loaded street fries, and creamy house-made hummus in Thornhill/Vaughan.
            </p>
            <div className="flex items-center gap-2 bg-white border border-gray-200 p-2.5 px-3.5 rounded-2xl shadow-xs">
              <ShieldCheck className="w-4 h-4 text-brand-gold" />
              <span className="text-xs font-semibold text-brand-espresso font-sans">
                100% COR Kosher Certified Meat
              </span>
            </div>
          </div>

          {/* Links segment */}
          <div>
            <h6 className="text-xs font-semibold uppercase tracking-wider text-brand-gold mb-4 font-sans">Our Menu</h6>
            <div className="flex flex-col gap-2.5">
              {links.menu.map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  className="text-sm text-brand-espresso/70 hover:text-brand-gold transition-colors font-sans cursor-pointer"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h6 className="text-xs font-semibold uppercase tracking-wider text-brand-gold mb-4 font-sans">Custom Catering</h6>
            <div className="flex flex-col gap-2.5">
              {links.catering.map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  className="text-sm text-brand-espresso/70 hover:text-brand-gold transition-colors font-sans cursor-pointer"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h6 className="text-xs font-semibold uppercase tracking-wider text-brand-gold mb-4 font-sans">Cafe Hours</h6>
            <div className="flex flex-col gap-2.5">
              {links.hours.map((item, idx) => (
                <a
                  key={idx}
                  href="/location"
                  className="text-sm text-brand-espresso/70 font-sans hover:text-brand-gold cursor-pointer transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h6 className="text-xs font-semibold uppercase tracking-wider text-brand-gold mb-4 font-sans">Hours & Info</h6>
            <div className="flex flex-col gap-2.5">
              {links.contact.map((item, idx) => (
                <a
                  key={idx}
                  href="/location"
                  className="text-sm text-brand-espresso/70 font-sans hover:text-brand-gold cursor-pointer transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Disclaimer and Copyright */}
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-[11px] text-brand-espresso/60 leading-relaxed font-sans">
              Supervision: Kapara Bistro & Grill is operated under strict Kashruth Council of Canada (COR) Kosher meat supervision. All meats are premium Glatt Kosher. For detailed inquiries regarding our kashruth procedures, ingredients, or private event catering, please feel free to speak with our supervisor on-site or contact us directly.
            </p>
          </div>
          <div className="flex flex-col md:items-end justify-between shrink-0 font-sans gap-3">
            <span className="text-xs text-brand-espresso/70">
              &copy; {currentYear} Kapara. All rights reserved.
            </span>
            <div className="flex gap-4">
              <span className="text-xs text-brand-espresso/50 hover:text-brand-gold transition-colors cursor-pointer">Terms of Taste</span>
              <span className="text-xs text-brand-espresso/50 hover:text-brand-gold transition-colors cursor-pointer">Privacy Policy</span>
            </div>
            <a
              href="https://talkerstein.com/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 group mt-1 md:justify-end"
            >
              <span className="text-[11px] text-brand-espresso/50 group-hover:text-brand-espresso transition-colors">Designed by</span>
              <img
                src="/brand/talkerstein-logo.svg"
                alt="Talkerstein Consulting Group"
                className="h-4 w-auto max-w-[240px] opacity-70 group-hover:opacity-100 transition-opacity"
              />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
