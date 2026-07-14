import React from 'react';

interface StoreMapProps {
  /** Set false when the caller already provides its own rounded/border/shadow wrapper. */
  bordered?: boolean;
  className?: string;
}

export function StoreMap({ bordered = true, className = '' }: StoreMapProps) {
  return (
    <div
      className={`overflow-hidden h-full min-h-[320px] ${
        bordered ? 'rounded-lg border border-gray-100 shadow-sm' : ''
      } ${className}`}
    >
      <iframe
        title="Map to Kapara"
        loading="lazy"
        className="w-full h-full min-h-[320px] border-0"
        src="https://maps.google.com/maps?cid=459065840808098260&t=m&z=16&output=embed&iwloc=near"
      />
    </div>
  );
}
