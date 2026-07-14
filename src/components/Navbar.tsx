import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ORDER_ONLINE_URL } from '../types';

interface NavbarProps {
  /** The current route id, e.g. "home" | "about" | "menu" — used to highlight the active link. */
  activePage?: string;
}

export function Navbar({ activePage = 'home' }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: string; label: string; href: string }[] = [
    { id: 'home', label: 'Home', href: '/' },
    { id: 'about', label: 'About Us', href: '/about' },
    { id: 'location', label: 'Contact Us', href: '/location' },
    { id: 'menu', label: 'Menu', href: '/menu' },
    { id: 'catering', label: 'Catering', href: '/catering' },
    { id: 'reservations', label: 'Reservations', href: '/reservations' },
  ];

  return (
    <nav id="navbar-main" className="fixed top-4 inset-x-0 z-50 px-4">
      {/* Floating pill */}
      <div className="max-w-4xl mx-auto bg-[#60745B]/95 backdrop-blur-md rounded-lg shadow-lg border border-white/10 pl-6 pr-3 py-2 flex items-center justify-between">
        {/* Left: Logo */}
        <a
          id="nav-brand"
          href="/"
          className="flex items-center select-none group cursor-pointer"
        >
          <img
            src="/brand/kapara-logo-light.png"
            alt="Kapara"
            className="h-8 w-auto transition-transform duration-300 group-hover:scale-105"
          />
        </a>

        {/* Right cluster: desktop links + CTA + mobile toggle */}
        <div className="flex items-center gap-4">
          {/* Text nav links (hidden below lg) */}
          <div id="nav-links-center" className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = activePage === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`text-sm font-semibold font-sans transition-colors duration-200 relative py-1 cursor-pointer ${
                    isActive
                      ? 'text-white'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavLine"
                      className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-white rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* Dark CTA pill: Order Online */}
          <a
            id="btn-order-online-nav"
            href={ORDER_ONLINE_URL}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center bg-white text-[#60745B] text-sm font-bold px-6 py-2.5 rounded-lg border border-transparent hover:bg-transparent hover:border-white hover:text-white transition-colors duration-200 shadow-sm cursor-pointer active:scale-98"
          >
            Order Online
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            id="btn-mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-white hover:bg-white/15 rounded-lg transition-colors cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu-overlay"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-4 right-4 mt-2 bg-brand-cream rounded-lg border border-black/5 shadow-lg px-6 py-6 flex flex-col gap-5 lg:hidden z-50"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => {
                const isActive = activePage === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-lg font-bold py-2 border-b border-gray-100 transition-colors cursor-pointer ${
                      isActive ? 'text-brand-gold pl-2 border-l-4 border-brand-gold' : 'text-brand-espresso hover:text-brand-gold'
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </div>

            <a
              href={ORDER_ONLINE_URL}
              target="_blank"
              rel="noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center bg-brand-forest text-white text-base font-bold py-3 rounded-lg hover:bg-brand-gold transition-colors cursor-pointer"
            >
              Order Online
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
