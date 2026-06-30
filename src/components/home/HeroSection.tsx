import { motion } from "framer-motion";
import { useMemo } from "react";
import { ArrowRight, Sparkles } from "lucide-react";

const PARTICLES = 18;

export function HeroSection() {
  const particles = useMemo(
    () =>
      Array.from({ length: PARTICLES }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 2 + Math.random() * 4,
        delay: Math.random() * 4,
        duration: 6 + Math.random() * 6,
        drift: -20 + Math.random() * 40,
      })),
    [],
  );

  const titleLines = ["Настоящие продукты", "Алтая"];

  return (
    <section
      className="relative isolate flex items-center overflow-hidden"
      style={{
        minHeight: "90vh",
        background:
          "linear-gradient(160deg, var(--color-bg-dark) 0%, #0d1812 100%)",
      }}
    >
      {/* Mountain placeholder background */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(120% 80% at 20% 30%, rgba(200,150,62,0.18), transparent 60%)," +
            "radial-gradient(100% 70% at 80% 70%, rgba(45,90,63,0.45), transparent 65%)," +
            "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.5) 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-1/2 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(180deg, transparent 0%, #0d1812 95%)," +
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 400'><path d='M0 320 L120 240 L240 280 L360 180 L480 260 L600 160 L720 240 L840 140 L960 220 L1080 180 L1200 260 L1200 400 L0 400 Z' fill='%232d5a3f' opacity='0.5'/><path d='M0 360 L160 300 L320 340 L480 260 L640 320 L800 240 L960 300 L1120 260 L1200 320 L1200 400 L0 400 Z' fill='%231a3028' opacity='0.7'/></svg>\")",
          backgroundSize: "cover",
          backgroundPosition: "bottom",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Particles */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {particles.map((p) => (
          <motion.span
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: p.size,
              height: p.size,
              backgroundColor: "var(--color-accent-light)",
              boxShadow: "0 0 8px rgba(232,180,79,0.7)",
            }}
            initial={{ opacity: 0, y: 0 }}
            animate={{
              opacity: [0, 0.9, 0],
              y: [0, -40, -80],
              x: [0, p.drift, 0],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-24 md:px-8 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5"
          style={{
            borderColor: "rgba(200,150,62,0.4)",
            backgroundColor: "rgba(200,150,62,0.08)",
            color: "var(--color-accent-light)",
            fontFamily: "var(--font-body)",
            fontSize: 13,
            letterSpacing: "0.08em",
          }}
        >
          <Sparkles size={14} />
          <span style={{ textTransform: "uppercase" }}>С душой Алтая</span>
        </motion.div>

        <h1
          className="mt-6 text-5xl md:text-7xl"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            color: "var(--color-accent-light)",
            lineHeight: 1.02,
            letterSpacing: "-0.01em",
            maxWidth: "16ch",
          }}
        >
          {titleLines.map((line, i) => (
            <motion.span
              key={line}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 + i * 0.2, ease: "easeOut" }}
              style={{ display: "block" }}
            >
              {line}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-6 text-lg md:text-xl"
          style={{
            fontFamily: "var(--font-body)",
            color: "#c8bfa8",
            maxWidth: 560,
            lineHeight: 1.6,
          }}
        >
          Мёд, чаи, сыры, деликатесы и натуральная косметика от алтайских
          производителей.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <motion.a
            href="#catalog"
            animate={{ boxShadow: [
              "0 0 0 0 rgba(200,150,62,0.5)",
              "0 0 0 16px rgba(200,150,62,0)",
              "0 0 0 0 rgba(200,150,62,0)",
            ] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 rounded-full px-7 py-4 transition-colors"
            style={{
              backgroundColor: "var(--color-accent)",
              color: "var(--color-bg-dark)",
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              fontSize: 16,
              minHeight: 44,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                "var(--color-accent-light)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                "var(--color-accent)";
            }}
          >
            В каталог
            <ArrowRight size={18} />
          </motion.a>

          <motion.a
            href="#promo"
            whileHover={{ scale: 1.02, backgroundColor: "rgba(200,150,62,0.1)" }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center rounded-full border px-7 py-4 transition-colors"
            style={{
              borderColor: "var(--color-accent)",
              color: "var(--color-accent-light)",
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              fontSize: 16,
              minHeight: 44,
              backgroundColor: "transparent",
            }}
          >
            Акции
          </motion.a>
        </motion.div>
      </div>

      {/* Topographic divider */}
      <svg
        aria-hidden
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-0 w-full"
        style={{ height: 60, color: "#2d5a3f" }}
      >
        <path
          d="M0 50 C 120 20, 240 80, 360 50 C 480 20, 600 80, 720 50 C 840 20, 960 80, 1080 50 C 1200 20, 1320 80, 1440 50"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.6"
        />
        <path
          d="M0 65 C 120 35, 240 95, 360 65 C 480 35, 600 95, 720 65 C 840 35, 960 95, 1080 65 C 1200 35, 1320 95, 1440 65"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.35"
        />
      </svg>
    </section>
  );
}

export default HeroSection;
