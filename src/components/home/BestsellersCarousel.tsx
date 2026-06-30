import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";
import { BESTSELLERS, type Bestseller } from "@/data/bestsellers";

const BADGE_STYLES: Record<NonNullable<Bestseller["badge"]>, { bg: string; color: string }> = {
  "Хит": { bg: "var(--color-accent)", color: "var(--color-bg-dark)" },
  "Новинка": { bg: "var(--color-success)", color: "#f5efe0" },
  "-15%": { bg: "var(--color-error)", color: "#f5efe0" },
  "-20%": { bg: "var(--color-error)", color: "#f5efe0" },
};

const formatPrice = (v: number) => `${v.toLocaleString("ru-RU")} ₽`;

export function BestsellersCarousel() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateArrows = () => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    updateArrows();
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, []);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const onAdd = (id: string) => {
    // Заглушка: подключите свою корзину
    console.log("add to cart", id);
  };

  return (
    <section
      id="bestsellers"
      style={{
        backgroundColor: "var(--color-bg-cream)",
        padding: "80px 0 96px",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-10 flex flex-col gap-4 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 13,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--color-accent-dark)",
              }}
            >
              Бестселлеры
            </span>
            <h2
              className="mt-2 text-4xl md:text-5xl"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                color: "var(--color-accent)",
                lineHeight: 1.05,
                letterSpacing: "-0.01em",
              }}
            >
              Хиты продаж
            </h2>
          </div>

          <div className="hidden gap-2 md:flex">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              disabled={!canPrev}
              aria-label="Предыдущие товары"
              className="inline-flex items-center justify-center rounded-full border transition-all"
              style={{
                width: 44,
                height: 44,
                borderColor: "var(--color-accent)",
                color: "var(--color-accent-dark)",
                backgroundColor: "transparent",
                opacity: canPrev ? 1 : 0.35,
                cursor: canPrev ? "pointer" : "not-allowed",
              }}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              disabled={!canNext}
              aria-label="Следующие товары"
              className="inline-flex items-center justify-center rounded-full transition-all"
              style={{
                width: 44,
                height: 44,
                backgroundColor: "var(--color-accent)",
                color: "var(--color-bg-dark)",
                opacity: canNext ? 1 : 0.35,
                cursor: canNext ? "pointer" : "not-allowed",
              }}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="bs-scroller flex gap-5 overflow-x-auto pb-4"
          style={{
            scrollSnapType: "x mandatory",
            scrollPaddingLeft: 16,
            WebkitOverflowScrolling: "touch",
          }}
        >
          {BESTSELLERS.map((p, idx) => {
            const discount = p.oldPrice
              ? Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100)
              : 0;
            const badge = p.badge;
            return (
              <motion.article
                key={p.id}
                data-card
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: Math.min(idx, 4) * 0.05 }}
                className="bs-card group flex shrink-0 flex-col overflow-hidden"
                style={{
                  width: "calc((100% - 16px) / 1.5)",
                  maxWidth: 320,
                  scrollSnapAlign: "start",
                  backgroundColor: "#ffffff",
                  borderRadius: 16,
                  boxShadow: "var(--shadow-card)",
                  border: "1px solid rgba(31,26,14,0.06)",
                  transition: "var(--transition-smooth)",
                }}
              >
                {/* Image placeholder */}
                <div
                  className="relative"
                  style={{
                    aspectRatio: "1 / 1",
                    background: p.image,
                    overflow: "hidden",
                  }}
                >
                  <span
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(80% 60% at 100% 0%, rgba(255,255,255,0.22), transparent 60%)",
                    }}
                  />
                  {badge && (
                    <span
                      className="absolute left-3 top-3"
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        padding: "5px 10px",
                        borderRadius: 999,
                        backgroundColor: BADGE_STYLES[badge].bg,
                        color: BADGE_STYLES[badge].color,
                      }}
                    >
                      {badge}
                    </span>
                  )}
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col p-4 md:p-5">
                  <span
                    className="self-start"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 11,
                      fontWeight: 600,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      padding: "4px 9px",
                      borderRadius: 999,
                      backgroundColor: "rgba(200,150,62,0.12)",
                      color: "var(--color-accent-dark)",
                    }}
                  >
                    {p.category}
                  </span>

                  <h3
                    className="mt-3"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 15,
                      fontWeight: 600,
                      lineHeight: 1.3,
                      color: "var(--color-text)",
                      minHeight: 40,
                    }}
                  >
                    {p.name}
                  </h3>
                  <span
                    style={{
                      marginTop: 4,
                      fontFamily: "var(--font-body)",
                      fontSize: 12,
                      color: "var(--color-text-muted)",
                    }}
                  >
                    {p.weight}
                  </span>

                  <div className="mt-4 flex items-baseline gap-2">
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 600,
                        fontSize: 24,
                        color: p.oldPrice
                          ? "var(--color-accent-dark)"
                          : "var(--color-text)",
                        lineHeight: 1,
                      }}
                    >
                      {formatPrice(p.price)}
                    </span>
                    {p.oldPrice && (
                      <span
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: 13,
                          color: "var(--color-text-muted)",
                          textDecoration: "line-through",
                        }}
                      >
                        {formatPrice(p.oldPrice)}
                      </span>
                    )}
                  </div>
                  {discount > 0 && (
                    <span
                      style={{
                        marginTop: 2,
                        fontFamily: "var(--font-body)",
                        fontSize: 11,
                        fontWeight: 600,
                        color: "var(--color-success)",
                      }}
                    >
                      Выгода {discount}%
                    </span>
                  )}

                  <button
                    type="button"
                    onClick={() => onAdd(p.id)}
                    className="bs-cta mt-auto inline-flex items-center justify-center gap-2 rounded-full"
                    style={{
                      marginTop: 20,
                      backgroundColor: "var(--color-accent)",
                      color: "var(--color-bg-dark)",
                      fontFamily: "var(--font-body)",
                      fontWeight: 600,
                      fontSize: 14,
                      padding: "12px 18px",
                      minHeight: 44,
                      transition: "var(--transition-smooth)",
                    }}
                  >
                    <ShoppingBag size={16} />
                    В корзину
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      <style>{`
        .bs-scroller { scrollbar-width: thin; scrollbar-color: rgba(200,150,62,0.4) transparent; }
        .bs-scroller::-webkit-scrollbar { height: 6px; }
        .bs-scroller::-webkit-scrollbar-thumb { background: rgba(200,150,62,0.4); border-radius: 999px; }
        .bs-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-elevated); }
        .bs-cta:hover { background-color: var(--color-accent-light); }

        @media (min-width: 768px) {
          .bs-card { width: calc((100% - 40px) / 3) !important; }
        }
        @media (min-width: 1024px) {
          .bs-card { width: calc((100% - 60px) / 4) !important; }
        }
      `}</style>
    </section>
  );
}

export default BestsellersCarousel;
