import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { SpecialtiesSection } from '../components/SpecialtiesSection';
import { InfoSection } from '../components/InfoSection';
import { BackedBySection } from '../components/BackedBySection';
import { UseCasesSection } from '../components/UseCasesSection';
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
    </div>
  );
}
