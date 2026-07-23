import React, { useState, useEffect, useRef } from 'react';
import { Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { CtaButton } from './ui/CtaButton';

interface HeroSectionProps {
  onJoinUs: () => void;
}

export function HeroSection({ onJoinUs }: HeroSectionProps) {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const marqueeTrackRef = useRef<HTMLDivElement>(null);

  // Attempt autoplay. If a browser blocks autoplay (e.g. low-power mode), the
  // video still renders its first frame/poster as the background — we only fall
  // back to the still image on a genuine load error, never on an autoplay block.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.log("Autoplay was blocked; showing video first frame as background:", err);
      });
    }
  }, []);

  // The marquee runs as a plain CSS animation (see `.marquee-track` below) so
  // it keeps scrolling smoothly with no dependency on JS frame callbacks.
  // On hover we slow it down — rather than swapping `animation-duration`
  // (which makes the browser re-derive the current frame from elapsed-time /
  // new-duration and snap to a different position, the "glitch"), we use the
  // Web Animations API's `playbackRate`, which changes speed continuously
  // from the animation's current position with no jump.
  const setMarqueeSpeed = (rate: number) => {
    const track = marqueeTrackRef.current;
    if (!track) return;
    for (const anim of track.getAnimations()) {
      anim.playbackRate = rate;
    }
  };

  const brandTags = [
    'FLAME-GRILLED KEBABS',
    'CRISPY SCHNITZELS',
    'KAPARA LOADED FRIES',
    'HUMMUS & FALAFEL BOWLS',
    'STEAK & PARGIOT SKEWERS',
    'CHEF-MADE SAUCES',
    'COR KOSHER CERTIFIED MEAT',
  ];

  return (
    <section id="hero-section" className="relative w-full">
      {/* Scoped style for the infinite marquee and the hero's Ken Burns fallback image */}
      <style>{`
        @keyframes marquee {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        @keyframes kenburns {
          0% {
            transform: scale(1.02) translate(0, 0);
          }
          50% {
            transform: scale(1.08) translate(-1%, -0.5%);
          }
          100% {
            transform: scale(1.02) translate(0, 0);
          }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 22s linear infinite;
        }
        .ken-burns-fallback {
          animation: kenburns 36s ease-in-out infinite;
        }
      `}</style>

      <div
        id="hero-inner-card"
        className="relative w-full overflow-hidden bg-[#F6F3EC]"
        style={{ height: '100vh' }}
      >
        {/* Background Layer: Video with still-image fallback beneath it */}
        <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#F6F3EC]">
          {/* Still image: shown while the video loads, or if it fails to load */}
          {(videoError || !videoLoaded) && (
            <img
              src="/hero-poster.jpg"
              alt="Cinematic spread of Kapara's flame-grilled dishes"
              className="object-cover absolute inset-0 w-full h-full select-none ken-burns-fallback"
            />
          )}

          {/* Background video (public/hero-video.mp4) — always mounted so it can
              autoplay; fades in over the still image once it is ready to play. */}
          {!videoError && (
            <video
              ref={videoRef}
              id="hero-bg-video"
              className="object-cover absolute inset-0 w-full h-full select-none transition-opacity duration-700"
              style={{ opacity: videoLoaded ? 1 : 0 }}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              onLoadedData={() => setVideoLoaded(true)}
              onCanPlay={() => setVideoLoaded(true)}
              onError={() => {
                console.log("Video failed to load, using still-image background.");
                setVideoError(true);
              }}
              poster="/hero-poster.jpg"
            >
              <source src="/hero-video.mp4" type="video/mp4" />
            </video>
          )}
        </div>

        {/* Dark overlay for legibility over the video */}
        <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-black/25 z-1" />

        {/* Content Overlay */}
        <div id="hero-content" className="relative z-10 flex flex-col items-center justify-center text-center h-full p-8 md:p-12">
          {/* Top/Middle Block: Typography & Button */}
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-bold bg-white text-brand-espresso border border-white/40 mb-4 font-sans tracking-wide uppercase shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-gold animate-pulse" />
              <span>Welcome to Kapara</span>
            </motion.div>

            <motion.h1
              id="hero-heading"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-white text-5xl md:text-7xl font-serif font-bold leading-none max-w-2xl mx-auto mb-6 tracking-tight drop-shadow-lg"
              style={{ letterSpacing: '-0.02em' }}
            >
              Toronto's Best
              <br />
              Casual Kosher Spot
            </motion.h1>

            <motion.p
              id="hero-description"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-white/90 text-base md:text-lg max-w-md mx-auto mb-8 leading-relaxed font-sans drop-shadow"
            >
              A Taste of Israel, Right Here in Toronto. Come for the food, stay for the vibe.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="inline-block w-full sm:w-auto"
            >
              <CtaButton id="btn-join-us" onClick={onJoinUs} variant="outline" className="uppercase tracking-wider px-8 py-3.5">
                View Full Menu
              </CtaButton>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Green banner strip separating the hero from the next section,
          carrying the scrolling brand-tags marquee — styled after the
          Eli's Barbershop marquee: hairline borders framing the strip,
          a bright accent separator glyph between items, and a real
          edge fade (matching the strip's own background color) instead
          of the previous no-op mask utility. */}
      <div
        id="hero-brand-marquee"
        className="relative w-full bg-[#60745B] border-y border-white/15 py-4 overflow-hidden select-none"
      >
        <div
          className="relative w-full overflow-hidden"
          onMouseEnter={() => setMarqueeSpeed(0.15)}
          onMouseLeave={() => setMarqueeSpeed(1)}
        >
          {/* Edge fade overlays */}
          <div className="absolute inset-y-0 left-0 w-16 md:w-28 bg-linear-to-r from-[#60745B] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 md:w-28 bg-linear-to-l from-[#60745B] to-transparent z-10 pointer-events-none" />

          <div ref={marqueeTrackRef} className="marquee-track">
            {/* First list of brand tags */}
            {brandTags.map((tag, idx) => (
              <span
                key={`tag-1-${idx}`}
                className="shrink-0 inline-flex items-center text-white/75 hover:text-white transition-colors duration-200 cursor-default whitespace-nowrap font-sans font-bold text-sm tracking-widest uppercase"
              >
                {tag}
                <span className="mx-8 text-brand-cream text-sm" aria-hidden="true">✦</span>
              </span>
            ))}
            {/* Duplicated list of brand tags for looping */}
            {brandTags.map((tag, idx) => (
              <span
                key={`tag-2-${idx}`}
                className="shrink-0 inline-flex items-center text-white/75 hover:text-white transition-colors duration-200 cursor-default whitespace-nowrap font-sans font-bold text-sm tracking-widest uppercase"
              >
                {tag}
                <span className="mx-8 text-brand-cream text-sm" aria-hidden="true">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
