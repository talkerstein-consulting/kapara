import { motion } from "motion/react";
import { CtaButton } from "../ui/CtaButton";

interface Cta4Props {
  heading?: React.ReactNode;
  description?: string;
  primaryHref?: string;
  primaryLabel?: string;
  primaryTarget?: string;
  primaryRel?: string;
  onPrimaryClick?: () => void;
  secondaryHref?: string;
  secondaryLabel?: string;
  onSecondaryClick?: () => void;
}

const images = [
  { id: 1, url: "/home/kapara-food.webp", alt: "Flame-grilled skewers fresh off the charcoal grill" },
  { id: 2, url: "/menu/loaded-fries.webp", alt: "Kapara's signature loaded street fries" },
  { id: 3, url: "/home/kapara-food-celebration.webp", alt: "A celebratory spread of Kapara favorites" },
  { id: 4, url: "/menu/schnitzel-classic.webp", alt: "Golden crispy chicken schnitzel" },
  { id: 5, url: "/home/kapara-meat-board-1.webp", alt: "A loaded Kapara meat board" },
  { id: 6, url: "/menu/hummus.webp", alt: "Creamy house-made hummus" },
  { id: 7, url: "/home/kapara-on-thegrill.webp", alt: "Kebabs sizzling on the open flame grill" },
  { id: 8, url: "/menu/potato-cigars.webp", alt: "Crispy Moroccan potato cigars" },
];

const duplicatedImages = [...images, ...images];

export default function Cta4({
  heading = (
    <>
      Come Hungry, <span className="italic font-normal">Leave Happy</span>
    </>
  ),
  description = "A taste of Israel, right here in Toronto. Come for the food, stay for the vibe — we can't wait to feed you.",
  primaryHref,
  primaryLabel = "Order Online",
  primaryTarget,
  primaryRel,
  onPrimaryClick,
  secondaryHref,
  secondaryLabel = "Book a Table",
  onSecondaryClick,
}: Cta4Props) {
  return (
    <section className="relative w-full flex flex-col items-center bg-brand-forest overflow-hidden rounded-lg">
      {/* Top Content */}
      <div className="max-w-[1400px] mx-auto w-full flex items-center justify-center pt-14 sm:pt-16 md:pt-20 pb-10 sm:pb-12 md:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-brand-cream leading-[1.15]"
          >
            {heading}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-sm sm:text-base md:text-lg text-brand-cream/80 font-sans leading-relaxed max-w-xl mx-auto"
          >
            {description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3"
          >
            <CtaButton
              href={primaryHref}
              target={primaryTarget}
              rel={primaryRel}
              onClick={onPrimaryClick}
              variant="inverse"
              className="px-7 py-3.5"
            >
              {primaryLabel}
            </CtaButton>
            <CtaButton
              href={secondaryHref}
              onClick={onSecondaryClick}
              variant="inverse"
              className="px-7 py-3.5"
            >
              {secondaryLabel}
            </CtaButton>
          </motion.div>
        </div>
      </div>

      {/* Bottom Marquee */}
      <div className="w-full pb-14 sm:pb-16 md:pb-20 pt-20 md:pt-24 overflow-x-clip">
        <div className="relative">
          <motion.div
            className="flex gap-4 sm:gap-6 md:gap-8"
            animate={{ x: ["-0%", "-50%"] }}
            transition={{
              x: { duration: 40, ease: "linear", repeat: Infinity, repeatType: "loop" },
            }}
            style={{ willChange: "transform" }}
          >
            {duplicatedImages.map((image, index) => (
              <div
                key={`${image.id}-${index}`}
                className={`shrink-0 w-32 h-44 sm:w-36 sm:h-48 md:w-44 md:h-56 lg:w-48 lg:h-64 rounded-lg overflow-hidden bg-black/10 ${
                  index % 2 === 1 ? "-mt-8 sm:-mt-10 md:-mt-12 lg:-mt-16" : ""
                }`}
              >
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </motion.div>
          {/* Edge fades to blend the marquee into the section background */}
          <div className="absolute inset-y-0 left-0 w-16 md:w-28 bg-linear-to-r from-brand-forest to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 md:w-28 bg-linear-to-l from-brand-forest to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
