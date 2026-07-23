import React from 'react';
import { ArrowRight } from 'lucide-react';

type CtaVariant = 'solid' | 'outline' | 'inverse';
type CtaSize = 'sm' | 'md';

interface CtaButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  variant?: CtaVariant;
  size?: CtaSize;
  icon?: boolean;
  fullWidthMobile?: boolean;
  fullWidth?: boolean;
  rounded?: 'lg' | 'full';
  className?: string;
  target?: string;
  rel?: string;
  id?: string;
}

/* Each variant defines a resting state with guaranteed contrast, plus the
   color the hover "wipe" sweeps in and the text color it settles on —
   never an accidental low-contrast pairing. */
const VARIANT_STYLES: Record<CtaVariant, { base: string; wipe: string; hoverText: string }> = {
  // Default brand CTA: forest surface, cream text, wipes to white/forest text.
  solid: {
    base: 'bg-brand-forest text-brand-cream border-2 border-brand-forest',
    wipe: 'bg-white',
    hoverText: 'group-hover:text-brand-forest',
  },
  // For dark/photo backgrounds (hero): white outline, wipes to a solid white fill.
  outline: {
    base: 'bg-transparent text-white border-2 border-white',
    wipe: 'bg-white',
    hoverText: 'group-hover:text-brand-espresso',
  },
  // For dark green surfaces that need a light resting button (About section).
  inverse: {
    base: 'bg-white text-brand-espresso border-2 border-white',
    wipe: 'bg-brand-forest',
    hoverText: 'group-hover:text-white',
  },
};

const SIZE_STYLES: Record<CtaSize, { pad: string; text: string; gap: string; icon: string }> = {
  md: { pad: 'px-6 py-3', text: 'text-sm md:text-base', gap: 'gap-2', icon: 'w-4 h-4' },
  sm: { pad: 'px-4 py-1.5', text: 'text-sm', gap: 'gap-1.5', icon: 'w-3.5 h-3.5' },
};

export function CtaButton({
  children,
  href,
  onClick,
  type = 'button',
  variant = 'solid',
  size = 'md',
  icon = true,
  fullWidthMobile = true,
  fullWidth = false,
  rounded = 'lg',
  className = '',
  target,
  rel,
  id,
}: CtaButtonProps) {
  const v = VARIANT_STYLES[variant];
  const s = SIZE_STYLES[size];

  const widthClass = fullWidth ? 'w-full' : fullWidthMobile ? 'w-full sm:w-auto' : '';
  const roundedClass = rounded === 'full' ? 'rounded-full' : 'rounded-lg';

  const sharedClassName = `group relative inline-flex items-center justify-center overflow-hidden ${roundedClass} ${s.pad} ${s.text} font-sans font-bold tracking-wide cursor-pointer shadow-sm hover:shadow-md transition-shadow duration-300 ${widthClass} ${v.base} ${className}`;

  const content = (
    <>
      {/* Hover wipe: sweeps in from the left rather than an instant color swap */}
      <span
        aria-hidden="true"
        className={`absolute inset-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out ${v.wipe}`}
      />
      <span className={`relative z-10 flex items-center justify-center ${s.gap} transition-colors duration-300 ${v.hoverText}`}>
        {children}
        {icon && (
          <ArrowRight className={`${s.icon} shrink-0 transition-transform duration-300 group-hover:translate-x-1`} />
        )}
      </span>
    </>
  );

  if (href) {
    return (
      <a id={id} href={href} target={target} rel={rel} className={sharedClassName} onClick={onClick}>
        {content}
      </a>
    );
  }

  return (
    <button id={id} type={type} onClick={onClick} className={sharedClassName}>
      {content}
    </button>
  );
}
