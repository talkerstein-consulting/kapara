import React, { useEffect, useRef, useState } from 'react';
import { Instagram, ChevronLeft, ChevronRight, X, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { INSTAGRAM_URL } from '../data/business';
import { CtaButton } from './ui/CtaButton';

const REEL_COUNT = 14;

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

export function InstagramGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [muted, setMuted] = useState(true);
  const [paused, setPaused] = useState(false);
  const centerVideoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const goTo = (index: number) => {
    setActiveIndex(mod(index, REEL_COUNT));
    setPaused(false);
    if (progressBarRef.current) progressBarRef.current.style.width = '0%';
  };

  // Drive the progress bar off requestAnimationFrame (not the coarse
  // `timeupdate` event) and write directly to the DOM so it animates
  // smoothly every frame instead of ticking in ~4x/sec steps.
  useEffect(() => {
    const video = centerVideoRef.current;
    const bar = progressBarRef.current;
    if (!video || !bar) return undefined;

    let raf = 0;
    const tick = () => {
      if (video.duration) {
        bar.style.width = `${(video.currentTime / video.duration) * 100}%`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    video.play().catch(() => {});

    return () => cancelAnimationFrame(raf);
  }, [activeIndex]);

  const togglePause = () => {
    const video = centerVideoRef.current;
    if (!video) return;
    if (video.paused) { video.play(); setPaused(false); }
    else { video.pause(); setPaused(true); }
  };

  // Lightbox keyboard nav + scroll lock
  useEffect(() => {
    if (lightboxIndex === null) return undefined;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') setLightboxIndex((v) => (v === null ? v : mod(v + 1, REEL_COUNT)));
      if (e.key === 'ArrowLeft') setLightboxIndex((v) => (v === null ? v : mod(v - 1, REEL_COUNT)));
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightboxIndex]);

  const prevIndex2 = mod(activeIndex - 2, REEL_COUNT);
  const prevIndex = mod(activeIndex - 1, REEL_COUNT);
  const nextIndex = mod(activeIndex + 1, REEL_COUNT);
  const nextIndex2 = mod(activeIndex + 2, REEL_COUNT);

  return (
    <section id="instagram-gallery" className="bg-white px-6 py-16 md:py-24" aria-label="Kapara on Instagram">
      <div className="max-w-[88rem] mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
          <div>
            <span className="kp-eyebrow flex items-center gap-2">
              <Instagram className="w-4 h-4" /> @kaparatoronto
            </span>
            <h2 className="font-serif font-bold text-brand-espresso text-4xl md:text-5xl leading-none tracking-tight">
              See What's Fresh at Kapara
            </h2>
          </div>
          <CtaButton
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            variant="solid"
            size="sm"
            fullWidthMobile={false}
            className="uppercase tracking-widest shrink-0"
          >
            Follow on Instagram
          </CtaButton>
        </div>

        <div className="relative">
          <div className="relative flex items-stretch justify-center gap-2.5 h-[55vh] max-h-[560px] overflow-hidden rounded-lg">
            {/* Peek: previous-previous reel (desktop only) */}
            <button
              type="button"
              onClick={() => goTo(prevIndex2)}
              aria-label="Show reel"
              className="hidden lg:block shrink-0 h-full aspect-9/16 bg-black cursor-pointer rounded-lg overflow-hidden"
            >
              <img
                src={`/instagram/reel-${prevIndex2 + 1}.jpg`}
                alt=""
                className="w-full h-full object-cover"
              />
            </button>

            {/* Peek: previous reel */}
            <button
              type="button"
              onClick={() => goTo(prevIndex)}
              aria-label="Show previous reel"
              className="hidden sm:block shrink-0 h-full aspect-9/16 bg-black cursor-pointer rounded-lg overflow-hidden"
            >
              <img
                src={`/instagram/reel-${prevIndex + 1}.jpg`}
                alt=""
                className="w-full h-full object-cover"
              />
            </button>

            {/* Center: active reel, only one that plays */}
            <div className="relative shrink-0 h-full aspect-9/16 bg-black shadow-xl z-10 rounded-lg overflow-hidden">
              <video
                key={activeIndex}
                ref={centerVideoRef}
                src={`/instagram/reel-${activeIndex + 1}.mp4`}
                poster={`/instagram/reel-${activeIndex + 1}.jpg`}
                muted={muted}
                loop
                playsInline
                autoPlay
                onClick={() => setLightboxIndex(activeIndex)}
                className="w-full h-full object-cover cursor-pointer"
              />

              {/* Progress bar */}
              <div className="absolute top-3 left-3 right-3 h-1 bg-white/30 rounded-full overflow-hidden">
                <div ref={progressBarRef} className="h-full bg-white" style={{ width: '0%' }} />
              </div>

              {/* Pause / play toggle */}
              <button
                type="button"
                aria-label={paused ? 'Play' : 'Pause'}
                onClick={togglePause}
                className="absolute top-7 right-3 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center cursor-pointer transition-colors"
              >
                {paused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
              </button>

              {/* Mute toggle */}
              <button
                type="button"
                aria-label={muted ? 'Unmute' : 'Mute'}
                onClick={() => setMuted((m) => !m)}
                className="absolute top-17 right-3 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center cursor-pointer transition-colors"
              >
                {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>

            {/* Peek: next reel */}
            <button
              type="button"
              onClick={() => goTo(nextIndex)}
              aria-label="Show next reel"
              className="hidden sm:block shrink-0 h-full aspect-9/16 bg-black cursor-pointer rounded-lg overflow-hidden"
            >
              <img
                src={`/instagram/reel-${nextIndex + 1}.jpg`}
                alt=""
                className="w-full h-full object-cover"
              />
            </button>

            {/* Peek: next-next reel (desktop only) */}
            <button
              type="button"
              onClick={() => goTo(nextIndex2)}
              aria-label="Show reel"
              className="hidden lg:block shrink-0 h-full aspect-9/16 bg-black cursor-pointer rounded-lg overflow-hidden"
            >
              <img
                src={`/instagram/reel-${nextIndex2 + 1}.jpg`}
                alt=""
                className="w-full h-full object-cover"
              />
            </button>
          </div>

          <button
            type="button"
            aria-label="Previous reel"
            onClick={() => goTo(activeIndex - 1)}
            className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white text-brand-espresso flex items-center justify-center shadow-md hover:bg-brand-gold hover:text-white transition-colors cursor-pointer z-20"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            aria-label="Next reel"
            onClick={() => goTo(activeIndex + 1)}
            className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white text-brand-espresso flex items-center justify-center shadow-md hover:bg-brand-gold hover:text-white transition-colors cursor-pointer z-20"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-100 bg-black/90 flex items-center justify-center p-6"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <button
            type="button"
            aria-label="Previous reel"
            onClick={(e) => { e.stopPropagation(); setLightboxIndex((v) => (v === null ? v : mod(v - 1, REEL_COUNT))); }}
            className="hidden sm:flex absolute left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white items-center justify-center cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            type="button"
            aria-label="Next reel"
            onClick={(e) => { e.stopPropagation(); setLightboxIndex((v) => (v === null ? v : mod(v + 1, REEL_COUNT))); }}
            className="hidden sm:flex absolute right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white items-center justify-center cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div
            className="relative w-full max-w-sm aspect-9/16 rounded-lg overflow-hidden shadow-2xl bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              key={lightboxIndex}
              src={`/instagram/reel-${lightboxIndex + 1}.mp4`}
              poster={`/instagram/reel-${lightboxIndex + 1}.jpg`}
              autoPlay
              loop
              playsInline
              controls
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}
    </section>
  );
}
