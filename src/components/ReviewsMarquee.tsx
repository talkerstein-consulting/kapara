import React, { useEffect, useRef, useState } from 'react';
import { REVIEWS, GOOGLE_RATING, GOOGLE_REVIEW_COUNT, GOOGLE_REVIEWS_URL, type Review } from '../data/reviews';
import { CtaButton } from './ui/CtaButton';

function GoogleG({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
    </svg>
  );
}

function Stars({ count = 5 }: { count?: number }) {
  return (
    <span className="inline-flex gap-0.5 text-sm" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} aria-hidden="true" className={i < count ? 'text-brand-gold' : 'text-gray-200'}>
          &#9733;
        </span>
      ))}
    </span>
  );
}

function ReviewCard({ review, index }: { review: Review; index: number }) {
  return (
    <figure className={`kp-review-card ${index % 2 === 0 ? 'kp-review-card--beige' : ''}`}>
      <Stars count={review.stars} />
      <blockquote className="m-0 font-sans font-semibold text-base leading-relaxed text-brand-espresso">
        {review.quote}
      </blockquote>
      <figcaption className="flex items-center gap-2 mt-auto pt-1 font-sans text-sm tracking-wide">
        <GoogleG />
        <span className="font-bold uppercase tracking-wider text-brand-espresso">{review.name}</span>
        <span className="text-brand-espresso/50">on Google</span>
      </figcaption>
    </figure>
  );
}

/** One auto-scrolling, draggable row. `direction` is +1 (scrolls left) or -1 (scrolls right). */
function MarqueeRow({ reviews, direction = 1 }: { reviews: Review[]; direction?: 1 | -1 }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const sets = 2; // duplicated so the auto-scroll loop never reveals a gap

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canHover = window.matchMedia('(hover: hover)').matches;
    const SPEED = 0.5; // px per frame (~30px/s)

    let raf = 0;
    let pos = 0;
    let paused = false;
    let down = false;
    let startX = 0;
    let startScroll = 0;

    const half = () => track.scrollWidth / 2;
    const active = () => canHover && !reduce && !paused && !down;

    pos = direction < 0 ? half() : 0;

    const tick = () => {
      const h = half();
      if (active() && h > 0) {
        pos += SPEED * direction;
        if (pos >= h) pos -= h;
        else if (pos < 0) pos += h;
        track.scrollLeft = pos;
      } else {
        pos = track.scrollLeft;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onEnter = () => { paused = true; };
    const onLeave = () => { paused = false; down = false; track.classList.remove('is-dragging'); };
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      down = true;
      startX = e.clientX;
      startScroll = track.scrollLeft;
      track.classList.add('is-dragging');
    };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      e.preventDefault();
      let next = startScroll - (e.clientX - startX);
      const h = half();
      if (h > 0) {
        if (next < 0) { next += h; startScroll += h; }
        else if (next >= h) { next -= h; startScroll -= h; }
      }
      track.scrollLeft = next;
    };
    const onUp = () => { down = false; track.classList.remove('is-dragging'); };
    const onTouch = () => { paused = true; };

    track.addEventListener('pointerenter', onEnter);
    track.addEventListener('pointerleave', onLeave);
    track.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove, { passive: false });
    window.addEventListener('pointerup', onUp);
    track.addEventListener('touchstart', onTouch, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      track.removeEventListener('pointerenter', onEnter);
      track.removeEventListener('pointerleave', onLeave);
      track.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      track.removeEventListener('touchstart', onTouch);
    };
  }, [direction]);

  return (
    <div className="kp-reviews-track" ref={trackRef}>
      {Array.from({ length: sets }).map((_, s) => (
        <React.Fragment key={s}>
          {reviews.map((review, i) => (
            <ReviewCard key={`${s}-${i}`} review={review} index={i} />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}

export function ReviewsMarquee() {
  const [twoRows, setTwoRows] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches
  );

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const onChange = () => setTwoRows(mq.matches);
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const mid = Math.ceil(REVIEWS.length / 2);
  const rowA = REVIEWS.slice(0, mid);
  const rowB = REVIEWS.slice(mid);

  return (
    <section id="reviews-band" className="bg-white px-6 py-16 md:py-24" aria-label="Google reviews">
      <div className="max-w-[88rem] mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
          <div>
            <span className="kp-eyebrow">Straight From Our Customers</span>
            <h2 className="kp-heading mb-0">
              {GOOGLE_RATING} Stars From {GOOGLE_REVIEW_COUNT} Reviews.
            </h2>
          </div>
          <CtaButton
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noreferrer"
            variant="inverse"
            size="sm"
            fullWidthMobile={false}
            className="uppercase tracking-widest border-gray-200 shrink-0"
          >
            Read all on Google
          </CtaButton>
        </div>

        <div className="rounded-lg overflow-hidden flex flex-col gap-4">
          {twoRows ? (
            <>
              <MarqueeRow reviews={rowA} direction={1} />
              <MarqueeRow reviews={rowB} direction={-1} />
            </>
          ) : (
            <MarqueeRow reviews={REVIEWS} direction={1} />
          )}
        </div>
      </div>
    </section>
  );
}
