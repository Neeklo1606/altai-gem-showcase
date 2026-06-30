import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { PROMOS } from "@/data/promos";

const AUTOPLAY_MS = 5000;

export function PromoBanner() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(
    () => setIndex((i) => (i + 1) % PROMOS.length),
    [],
  );
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + PROMOS.length) % PROMOS.length),
    [],
  );

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(next, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused, next]);

  const promo = PROMOS[index];
  const Icon = promo.icon;

  return (
    <section
      id="promo"
      style={{
        backgroundColor: "var(--color-bg-cream)",
        padding: "40px 0 80px",
      }}
    >
      <div
        className="mx-auto max-w-7xl px-4 md:px-8"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          className="relative overflow-hidden"
          style={{
            borderRadius: 24,
            minHeight: 220,
            boxShadow: "var(--shadow-card)",
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.a
              key={promo.id}
              href={promo.ctaLink}
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -32 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              whileHover={{ scale: 1.02 }}
              className="promo-card group relative flex cursor-pointer flex-col items-stretch overflow-hidden md:flex-row md:items-center"
              style={{
                background: promo.bgColor,
                minHeight: 220,
                textDecoration: "none",
                transition: "var(--transition-smooth)",
              }}
            >
              {/* Shine overlay */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(80% 60% at 100% 0%, rgba(255,255,255,0.18), transparent 60%)",
                }}
              />

              {/* Text */}
              <div
                className="relative flex-1 px-6 py-8 md:px-12 md:py-12"
                style={{ color: promo.accentColor }}
              >
                {promo.badge && (
                  <span
                    className="inline-flex"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 12,
                      fontWeight: 600,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      padding: "5px 11px",
                      borderRadius: 999,
                      backgroundColor: "rgba(255,255,255,0.18)",
                      backdropFilter: "blur(6px)",
                      color: promo.accentColor,
                    }}
                  >
                    {promo.badge}
                  </span>
                )}
                <h3
                  className="mt-4 text-3xl md:text-5xl"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    lineHeight: 1.05,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {promo.title}
                </h3>
                <p
                  className="mt-3 max-w-xl"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 15,
                    lineHeight: 1.55,
                    opacity: 0.88,
                  }}
                >
                  {promo.description}
                </p>
                <span
                  className="mt-6 inline-flex items-center gap-2 rounded-full"
                  style={{
                    backgroundColor: promo.accentColor,
                    color:
                      promo.accentColor === "#e8b44f"
                        ? "var(--color-bg-dark)"
                        : "var(--color-bg-dark)",
                    fontFamily: "var(--font-body)",
                    fontWeight: 600,
                    fontSize: 14,
                    padding: "12px 22px",
                    minHeight: 44,
                  }}
                >
                  {promo.ctaText}
                  <ArrowRight size={16} />
                </span>
              </div>

              {/* Icon area */}
              <div
                className="relative flex shrink-0 items-center justify-center px-6 pb-10 md:px-12 md:py-12"
                style={{ color: promo.accentColor }}
              >
                <motion.div
                  initial={{ rotate: -8, scale: 0.9, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                  className="flex items-center justify-center rounded-full"
                  style={{
                    width: 168,
                    height: 168,
                    backgroundColor: "rgba(255,255,255,0.12)",
                    backdropFilter: "blur(8px)",
                    boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.18)",
                  }}
                >
                  <Icon size={84} strokeWidth={1.4} />
                </motion.div>
              </div>
            </motion.a>
          </AnimatePresence>

          {/* Arrows */}
          <button
            type="button"
            onClick={prev}
            aria-label="Предыдущая акция"
            className="absolute left-3 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full transition-colors hover:bg-white/30 md:flex"
            style={{
              width: 44,
              height: 44,
              backgroundColor: "rgba(255,255,255,0.18)",
              backdropFilter: "blur(6px)",
              color: "var(--color-text-on-dark)",
            }}
          >
            <ChevronLeft size={22} />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Следующая акция"
            className="absolute right-3 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full transition-colors hover:bg-white/30 md:flex"
            style={{
              width: 44,
              height: 44,
              backgroundColor: "rgba(255,255,255,0.18)",
              backdropFilter: "blur(6px)",
              color: "var(--color-text-on-dark)",
            }}
          >
            <ChevronRight size={22} />
          </button>
        </div>

        {/* Indicators */}
        <div className="mt-5 flex items-center justify-center gap-2">
          {PROMOS.map((p, i) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Перейти к акции ${i + 1}`}
              className="group inline-flex items-center justify-center"
              style={{ width: 44, height: 44 }}
            >
              <span
                style={{
                  display: "block",
                  height: 8,
                  width: i === index ? 28 : 8,
                  borderRadius: 999,
                  backgroundColor:
                    i === index
                      ? "var(--color-accent)"
                      : "rgba(31,26,14,0.2)",
                  transition: "var(--transition-smooth)",
                }}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PromoBanner;
