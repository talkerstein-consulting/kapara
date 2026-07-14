import React from 'react';
import { StoreHours } from './StoreHours';
import { StoreMap } from './StoreMap';

/** Global "Hours & Location" block — rendered once in BaseLayout so every
 *  page shows the same live Store Hours + map, always in sync with the
 *  shared schedule in data/business.ts. */
export function HoursAndMapSection() {
  return (
    <div id="global-store-hours" className="bg-brand-cream/30 px-6 py-16 md:py-24">
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
  );
}
