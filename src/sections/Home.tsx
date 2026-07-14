import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { SpecialtiesSection } from '../components/SpecialtiesSection';
import { InfoSection } from '../components/InfoSection';
import { BackedBySection } from '../components/BackedBySection';
import { UseCasesSection } from '../components/UseCasesSection';
import { StoreHours } from '../components/StoreHours';
import { StoreMap } from '../components/StoreMap';
import { ReviewsMarquee } from '../components/ReviewsMarquee';
import { InstagramGallery } from '../components/InstagramGallery';
import { ORDER_ONLINE_URL } from '../types';

export function Home() {
  const go = (path: string) => { window.location.href = path; };
  const orderOnline = () => window.open(ORDER_ONLINE_URL, '_blank', 'noopener,noreferrer');

  return (
    <div id="home-page-container" className="flex flex-col">
      {/* Hero Section */}
      <div id="hero-wrapper" className="relative">
        <HeroSection onJoinUs={() => go('/menu')} />
      </div>

      {/* Specialties Highlight Section */}
      <SpecialtiesSection onOrder={orderOnline} />

      {/* Info/Intro Section */}
      <InfoSection onDiscover={() => go('/catering')} />

      {/* Backed By Partners / Certification Badges */}
      <BackedBySection />

      {/* Interactive Highlights section */}
      <UseCasesSection onLearnMore={() => go('/catering')} />

      {/* Google Reviews */}
      <ReviewsMarquee />

      {/* Store Hours */}
      <div id="home-store-hours" className="bg-brand-cream/30 px-6 py-16 md:py-24">
        <div className="max-w-[88rem] mx-auto">
          <div className="kp-section-header">
            <span className="kp-eyebrow">Thornhill Neighborhood Hub</span>
            <h2 className="kp-heading">Hours & Location</h2>
            <p className="kp-subtext">
              Come visit our warm brick-and-mortar storefront or order online for fast in-store pickup. We look forward to welcoming you!
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            <StoreHours />
            <StoreMap />
          </div>
        </div>
      </div>

      {/* Instagram Gallery */}
      <InstagramGallery />
    </div>
  );
}
