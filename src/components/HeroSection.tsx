import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroSectionProps {
  onJoinUs: () => void;
}

export function HeroSection({ onJoinUs }: HeroSectionProps) {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

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

  const brandTags = [
    { name: 'FLAME-GRILLED KEBABS', style: { fontFamily: "'Inria Serif', serif", fontWeight: 700, letterSpacing: '0.04em', fontSize: '16px', textTransform: 'uppercase' as const } },
    { name: 'CRISPY SCHNITZELS', style: { fontFamily: 'sans-serif', fontWeight: 600, letterSpacing: '0.08em', fontSize: '13px', textTransform: 'uppercase' as const } },
    { name: 'KAPARA LOADED FRIES', style: { fontFamily: "'Inria Serif', serif", fontWeight: 700, letterSpacing: '0.04em', fontSize: '16px', textTransform: 'uppercase' as const } },
    { name: 'HUMMUS & FALAFEL BOWLS', style: { fontFamily: 'monospace', fontWeight: 500, letterSpacing: '0.1em', fontSize: '13px', textTransform: 'uppercase' as const } },
    { name: 'STEAK & PARGIOT SKEWERS', style: { fontFamily: "'Inria Serif', serif", fontWeight: 700, letterSpacing: '0.04em', fontSize: '16px', textTransform: 'uppercase' as const } },
    { name: 'CHEF-MADE SAUCES', style: { fontFamily: 'sans-serif', fontWeight: 600, letterSpacing: '0.08em', fontSize: '13px', textTransform: 'uppercase' as const } },
    { name: 'COR KOSHER CERTIFIED MEAT', style: { fontFamily: 'monospace', fontWeight: 500, letterSpacing: '0.1em', fontSize: '13px', textTransform: 'uppercase' as const } },
  ];

  return (
    <section id="hero-section" className="relative w-full">
      {/* Scoped style for infinite marquee */}
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
        .marquee-track:hover {
          animation-play-state: paused;
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
        <div id="hero-content" className="relative z-10 flex flex-col items-start justify-center h-full p-8 md:p-12">
          {/* Top/Middle Block: Typography & Button */}
          <div className="flex flex-col items-start">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold bg-white/15 text-white border border-white/25 mb-4 font-sans tracking-wide uppercase backdrop-blur-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-gold animate-pulse" />
              <span>Welcome to Kapara</span>
            </motion.div>

            <motion.h1
              id="hero-heading"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-white text-5xl md:text-7xl font-serif font-bold leading-none max-w-2xl mb-6 tracking-tight drop-shadow-lg"
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
              className="text-white/90 text-base md:text-lg max-w-md mb-8 leading-relaxed font-sans drop-shadow"
            >
              A Taste of Israel, Right Here in Toronto. Come for the food, stay for the vibe.
            </motion.p>

            <motion.button
              id="btn-join-us"
              onClick={onJoinUs}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="inline-flex items-center gap-2 border-2 border-white text-white text-sm md:text-base font-bold uppercase tracking-wider px-8 py-3.5 rounded-full hover:bg-white hover:text-brand-espresso transition-all duration-200 cursor-pointer active:scale-98 group"
            >
              View Full Menu
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.button>
          </div>

          {/* Bottom Block: Brand Marquee */}
          <div id="hero-brand-marquee" className="absolute bottom-8 left-8 md:left-12 w-full max-w-md overflow-hidden select-none">
            <div className="text-brand-gold text-xs font-semibold tracking-widest uppercase mb-3 font-sans drop-shadow">
              Flame-Grilled Fresh Daily on Open Fire
            </div>
            <div className="relative w-full overflow-hidden mask-gradient-x">
              <div className="marquee-track">
                {/* First list of brand tags */}
                {brandTags.map((tag, idx) => (
                  <span
                    key={`tag-1-${idx}`}
                    className="mx-7 shrink-0 text-white/70 hover:text-white transition-colors duration-200 cursor-default whitespace-nowrap"
                    style={tag.style}
                  >
                    {tag.name}
                  </span>
                ))}
                {/* Duplicated list of brand tags for looping */}
                {brandTags.map((tag, idx) => (
                  <span
                    key={`tag-2-${idx}`}
                    className="mx-7 shrink-0 text-white/70 hover:text-white transition-colors duration-200 cursor-default whitespace-nowrap"
                    style={tag.style}
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
