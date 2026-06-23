import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  ShoppingCart,
  PhoneCall,
  Menu,
  X,
  Leaf,
  MapPin,
  Truck,
  Star,
  ArrowRight,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Жемчужина Алтая — натуральная продукция с Алтая" },
      {
        name: "description",
        content:
          "Натуральный мёд, деликатесы из марала, травяные чаи и косметика прямо с Алтая. Два магазина в Новосибирске, доставка по России.",
      },
    ],
  }),
  component: LandingPage,
});

/* ---------- DATA ---------- */

const CATEGORIES = [
  { id: "all", label: "Весь каталог" },
  { id: "honey", label: "🍯 Мёд" },
  { id: "tea", label: "🌿 Чаи и травы" },
  { id: "maral", label: "🦌 Мясо марала" },
  { id: "cosmetics", label: "💄 Косметика" },
  { id: "gifts", label: "🎁 Подарки" },
];

const CATEGORY_CARDS = [
  {
    title: "Мёд и пчелопродукты",
    desc: "Донниковый, горный, таёжный, прополис",
    count: 12,
    emoji: "🍯",
    gradient: "linear-gradient(135deg, #F5C76A 0%, #C8973A 100%)",
  },
  {
    title: "Травяные чаи",
    desc: "Иван-чай, чага, алтайский сбор",
    count: 8,
    emoji: "🌿",
    gradient: "linear-gradient(135deg, #6AAE7E 0%, #1E5C3F 100%)",
  },
  {
    title: "Деликатесы из марала",
    desc: "Вырезка, колбасы, копчёности",
    count: 6,
    emoji: "🦌",
    gradient: "linear-gradient(135deg, #8B3A3A 0%, #4A1A1F 100%)",
  },
  {
    title: "Натуральная косметика",
    desc: "Кремы, шампуни, мыло, масла",
    count: 15,
    emoji: "🌸",
    gradient: "linear-gradient(135deg, #C8E6B8 0%, #5C8C6A 100%)",
  },
  {
    title: "Пантогематоген и бальзамы",
    desc: "Бальзамы на травах, пантогематоген",
    count: 9,
    emoji: "💪",
    gradient: "linear-gradient(135deg, #5DA9B5 0%, #2F4A3D 100%)",
  },
  {
    title: "Подарочные наборы",
    desc: "Готовые наборы от 1 200 ₽",
    count: 10,
    emoji: "🎁",
    gradient: "linear-gradient(135deg, #E8B84B 0%, #8B6B1E 100%)",
  },
];

const BESTSELLERS = [
  { name: "Донниковый мёд", price: 890, unit: "₽/кг", cat: "Мёд", emoji: "🍯", desc: "Нежный ванильный аромат", bg: "#FBE9C2" },
  { name: "Мясо марала (вырезка)", price: 2150, unit: "₽/кг", cat: "Марал", emoji: "🦌", desc: "Плотное, нежное, травяные нотки", bg: "#E8C8C8" },
  { name: "Набор Сладкоежка", price: 2650, unit: "₽", cat: "Подарки", emoji: "🎁", desc: "Мёд, конфеты, чай", bg: "#FBE0A8" },
  { name: "Пантогематоген батончик", price: 380, unit: "₽/шт", cat: "Здоровье", emoji: "💪", desc: "С кровью марала", bg: "#D6E8DC" },
  { name: "Горный мёд с миндалём", price: 950, unit: "₽/кг", cat: "Мёд", emoji: "🍯", desc: "Алтайский разнотравный", bg: "#FBE9C2" },
  { name: "Чай Таёжный со смородиной", price: 520, unit: "₽/упак", cat: "Чаи", emoji: "🌿", desc: "Сбор горных трав", bg: "#D6E8DC" },
  { name: "Крем Саган дайля", price: 890, unit: "₽", cat: "Косметика", emoji: "🌸", desc: "Для лица, натуральный", bg: "#E0EBD6" },
  { name: "Бальзам на травах Алтая", price: 450, unit: "₽", cat: "Бальзамы", emoji: "🌱", desc: "Сила здоровья", bg: "#D6E8DC" },
];

const STATS = [
  { value: 4.4, suffix: " ⭐", label: "Рейтинг на Яндекс.Картах", decimals: 1 },
  { value: 180, suffix: "+", label: "Фотографий продукции", decimals: 0 },
  { value: 2, suffix: "", label: "Магазина в Новосибирске", decimals: 0 },
  { value: 2018, suffix: "", label: "Год основания", decimals: 0 },
];

const FEATURES = [
  { Icon: Leaf, title: "Только натуральное", desc: "Без консервантов, красителей и ароматизаторов. Каждый продукт — прямо от алтайских производителей" },
  { Icon: MapPin, title: "Два магазина в городе", desc: "ул. Титова, 32 (Левый берег) и Гурьевская, 55 (Правый берег). Приходите лично" },
  { Icon: Truck, title: "Доставка по России", desc: "Отправляем СДЭК в любой регион. Упаковка защитит продукцию в дороге" },
  { Icon: Star, title: "4.4 на Яндекс.Картах", desc: "Реальные отзывы реальных покупателей. Смотрите сами по ссылке на картах" },
];

const GIFT_SETS = [
  { name: "Набор Сладкоежка", price: 2650, desc: "Мёд с орехами, конфеты ручной работы, кедровые матрёшки, чай", gradient: "linear-gradient(135deg, #F5C76A 0%, #C8973A 100%)", badge: "Популярный", emoji: "🎁" },
  { name: "Набор Здоровье", price: 2390, desc: "Алтайский чай, растирка, мазь пантовая, кедровая живица, бальзам", gradient: "linear-gradient(135deg, #6AAE7E 0%, #1E5C3F 100%)", badge: null, emoji: "🌿" },
  { name: "Набор Супермен", price: 1200, desc: "Мёд, бальзам Чемчудой, батончик пантогематоген, чай Батыр", gradient: "linear-gradient(135deg, #B89248 0%, #5C4416 100%)", badge: "Хит", emoji: "💪" },
];

/* ---------- CART HOOK ---------- */

type CartItem = { id: string; name: string; price: number };

function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const addItem = (item: CartItem) => setItems((p) => [...p, item]);
  const removeItem = (idx: number) => setItems((p) => p.filter((_, i) => i !== idx));
  return { items, addItem, removeItem, totalCount: items.length };
}

/* ---------- MAIN ---------- */

function LandingPage() {
  const cart = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCat, setActiveCat] = useState("all");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleAdd = (item: CartItem) => {
    cart.addItem(item);
    setToast("Добавлено в корзину!");
    setTimeout(() => setToast(null), 2000);
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileMenu(false);
  };

  return (
    <div className="min-h-screen bg-cream text-ink">
      <Header
        cartCount={cart.totalCount}
        onCartOpen={() => setIsCartOpen(true)}
        scrolled={scrolled}
        mobileMenu={mobileMenu}
        setMobileMenu={setMobileMenu}
        scrollTo={scrollTo}
      />

      <Hero scrollTo={scrollTo} />

      <CategoryBar active={activeCat} setActive={setActiveCat} />

      <Catalog onAdd={handleAdd} />

      <Bestsellers onAdd={handleAdd} />

      <BrandStory />

      <WhyUs />

      <GiftSets onAdd={handleAdd} />

      <Locations />

      <Footer />

      <CartDrawer
        open={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart.items}
        onRemove={cart.removeItem}
      />

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-8 left-1/2 z-[60] -translate-x-1/2 rounded-full bg-forest px-6 py-3 text-sm font-medium text-cream shadow-lg"
            style={{ boxShadow: "0 8px 32px rgba(200, 151, 58, 0.4)" }}
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------- HEADER ---------- */

function Header({ cartCount, onCartOpen, scrolled, mobileMenu, setMobileMenu, scrollTo }: any) {
  const navLinks = [
    { id: "catalog", label: "Каталог" },
    { id: "about", label: "О нас" },
    { id: "locations", label: "Доставка" },
    { id: "locations", label: "Контакты" },
  ];

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="sticky top-0 z-50 w-full transition-all"
      style={{
        backgroundColor: "rgba(255, 251, 243, 0.95)",
        backdropFilter: "blur(12px)",
        borderBottom: scrolled ? "1px solid rgba(200, 151, 58, 0.3)" : "1px solid transparent",
        boxShadow: scrolled ? "0 2px 12px rgba(30, 58, 47, 0.06)" : "none",
      }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:h-[72px] md:px-8">
        <a href="#" className="flex shrink-0 items-center gap-2">
          <span className="text-xl">🌿</span>
          <span className="font-display text-[20px] font-bold text-forest">Жемчужина Алтая</span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((l, i) => (
            <button
              key={i}
              onClick={() => scrollTo(l.id)}
              className="group relative text-sm font-medium text-ink transition-colors hover:text-honey"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-honey transition-all group-hover:w-full" />
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="tel:+79607981622"
            className="hidden sm:grid h-10 w-10 place-items-center rounded-full text-forest transition-colors hover:bg-cream-dark hover:text-honey"
            aria-label="Позвонить"
          >
            <PhoneCall className="h-5 w-5" />
          </a>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onCartOpen}
            className="relative flex items-center gap-2 rounded-full bg-forest px-4 py-2 text-sm font-medium text-cream transition-colors hover:bg-forest-mid"
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden sm:inline">Корзина</span>
            {cartCount > 0 && (
              <span className="grid h-5 min-w-5 place-items-center rounded-full bg-honey px-1 text-[11px] font-bold text-forest">
                {cartCount}
              </span>
            )}
          </motion.button>
          <button
            className="md:hidden grid h-10 w-10 place-items-center rounded-full text-forest"
            onClick={() => setMobileMenu(!mobileMenu)}
            aria-label="Меню"
          >
            {mobileMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-honey/20 bg-parchment"
          >
            <div className="flex flex-col p-4">
              {navLinks.map((l, i) => (
                <button
                  key={i}
                  onClick={() => scrollTo(l.id)}
                  className="py-3 text-left text-base font-medium text-forest hover:text-honey"
                >
                  {l.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

/* ---------- HERO ---------- */

function Hero({ scrollTo }: { scrollTo: (id: string) => void }) {
  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as any },
  });

  return (
    <section
      className="relative flex items-center overflow-hidden"
      style={{ height: "100svh", minHeight: 600 }}
    >
      {/* Background photo */}
      <img
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80&fit=crop&crop=center"
        alt="Горы Алтая"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: "center" }}
      />
      {/* Overlay 1 */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(10,25,15,0.92) 0%, rgba(10,25,15,0.75) 50%, rgba(10,25,15,0.3) 100%)",
        }}
      />
      {/* Overlay 2 */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(10,25,15,0.8) 0%, transparent 50%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-24 md:px-8">
        <div className="max-w-2xl">
          <motion.div {...fade(0.1)}>
            <span
              className="inline-flex items-center rounded-full border px-3.5 py-1 text-[13px] font-medium"
              style={{
                background: "rgba(200,151,58,0.2)",
                color: "var(--honey)",
                borderColor: "rgba(200,151,58,0.4)",
              }}
            >
              🏔 Продукция с Алтая
            </span>
          </motion.div>

          <motion.h1
            {...fade(0.3)}
            className="mt-6 text-[40px] md:text-[64px]"
            style={{
              color: "#FFFBF3",
              fontFamily: "'Unbounded', sans-serif",
              fontWeight: 800,
              lineHeight: 1.0,
            }}
          >
            Продукты
            <br />
            с душой <span style={{ color: "#C8973A" }}>Алтая</span>
          </motion.h1>

          <motion.p
            {...fade(0.5)}
            className="text-[17px] leading-relaxed"
            style={{
              color: "rgba(255,251,243,0.72)",
              maxWidth: 460,
              marginTop: 16,
            }}
          >
            Натуральная продукция двух алтайских фермерских хозяйств. Два магазина в Новосибирске. Доставка по России.
          </motion.p>

          <motion.div {...fade(0.7)} className="mt-8 flex flex-wrap gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollTo("catalog")}
              className="rounded-lg px-7 py-3.5 text-[15px] transition-colors hover:brightness-110"
              style={{ backgroundColor: "#C8973A", color: "#1A3028", fontWeight: 700 }}
            >
              Смотреть каталог
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollTo("gifts")}
              className="rounded-lg border-[1.5px] px-7 py-3.5 text-[15px] font-medium transition-colors hover:border-honey hover:text-honey"
              style={{ borderColor: "rgba(255,251,243,0.4)", color: "#FFFBF3" }}
            >
              Подарочные наборы
            </motion.button>
          </motion.div>

          <motion.p
            {...fade(0.9)}
            className="mt-6 text-[13px]"
            style={{ color: "rgba(255,251,243,0.6)" }}
          >
            ⭐ 4.4 на Яндекс.Картах · 180+ фото · 8 отзывов · Работаем с 2018 г.
          </motion.p>
        </div>

        {/* Floating product card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="absolute hidden lg:block right-12 top-1/2 -translate-y-1/2 w-[220px] rounded-2xl p-5"
          style={{
            background: "rgba(255,251,243,0.1)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(200,151,58,0.4)",
            animation: "heroFloat 4s ease-in-out infinite",
          }}
        >
          <div className="text-5xl mb-3">🍯</div>
          <div className="font-display text-lg font-semibold" style={{ color: "#FFFBF3" }}>
            Донниковый мёд
          </div>
          <div className="mt-1 text-sm" style={{ color: "rgba(255,251,243,0.7)" }}>
            890 ₽/кг
          </div>
          <div className="mt-3 inline-block text-[11px] font-semibold uppercase tracking-wider" style={{ color: "var(--honey)" }}>
            Хит продаж
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes heroFloat {
          0%, 100% { transform: translateY(-50%) translateY(0); }
          50% { transform: translateY(-50%) translateY(-12px); }
        }
      `}</style>
    </section>
  );
}

/* ---------- CATEGORY BAR ---------- */

function CategoryBar({ active, setActive }: { active: string; setActive: (id: string) => void }) {
  return (
    <div
      className="sticky top-16 md:top-[72px] z-40 border-b bg-cream-dark"
      style={{ borderColor: "rgba(200,151,58,0.2)" }}
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="no-scrollbar flex gap-2 overflow-x-auto py-3">
          {CATEGORIES.map((c) => {
            const isActive = active === c.id;
            return (
              <button
                key={c.id}
                onClick={() => {
                  setActive(c.id);
                  document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-all"
                style={{
                  background: isActive ? "var(--honey)" : "transparent",
                  color: isActive ? "var(--forest)" : "var(--text-muted)",
                  border: isActive ? "1px solid var(--honey)" : "1px solid rgba(200,151,58,0.3)",
                  fontWeight: isActive ? 600 : 500,
                }}
              >
                {c.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ---------- SECTION HEADING ---------- */

function SectionHeading({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <div className="mb-12 text-center">
      <h2
        className="font-display font-bold text-[28px] md:text-[40px]"
        style={{ color: dark ? "#FFFBF3" : "var(--forest)" }}
      >
        {children}
      </h2>
      <div className="mt-4 flex items-center justify-center gap-4">
        <span className="h-px w-12" style={{ background: "var(--honey)" }} />
        <span style={{ color: "var(--honey)" }}>🌿</span>
        <span className="h-px w-12" style={{ background: "var(--honey)" }} />
      </div>
    </div>
  );
}

/* ---------- CATALOG ---------- */

function Catalog({ onAdd }: { onAdd: (i: CartItem) => void }) {
  return (
    <section id="catalog" className="bg-cream py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading>Наша продукция</SectionHeading>

        <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {CATEGORY_CARDS.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="group h-[280px] cursor-pointer overflow-hidden rounded-2xl border bg-parchment shadow-card transition-all hover:shadow-card-hover"
              style={{ borderColor: "transparent" }}
            >
              <div
                className="grid h-[160px] place-items-center text-6xl"
                style={{ background: c.gradient }}
              >
                <span className="drop-shadow-lg">{c.emoji}</span>
              </div>
              <div className="p-4">
                <h3 className="font-display text-xl font-bold text-forest">{c.title}</h3>
                <p className="mt-1 text-[13px] text-ink-muted">{c.desc}</p>
                <div className="mt-3 flex items-center gap-1 text-[13px] font-medium" style={{ color: "var(--honey)" }}>
                  → {c.count} товаров
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- BESTSELLERS ---------- */

function ProductCard({ p, onAdd }: { p: typeof BESTSELLERS[number]; onAdd: (i: CartItem) => void }) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="shrink-0 w-[75vw] sm:w-[220px] snap-start rounded-xl bg-parchment p-4 shadow-card transition-all hover:shadow-card-hover"
    >
      <div
        className="grid h-[140px] place-items-center rounded-lg text-5xl"
        style={{ background: p.bg }}
      >
        {p.emoji}
      </div>
      <div className="mt-3 text-[11px] font-semibold uppercase tracking-wider" style={{ color: "var(--honey)" }}>
        {p.cat}
      </div>
      <h4 className="mt-1 font-display text-base font-bold text-forest line-clamp-2 min-h-[44px]">
        {p.name}
      </h4>
      <p className="mt-1 text-xs text-ink-muted line-clamp-1">{p.desc}</p>
      <div className="mt-2 font-bold text-forest text-xl">
        {p.price}
        <span className="text-sm font-medium text-ink-muted ml-1">{p.unit}</span>
      </div>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => onAdd({ id: p.name, name: p.name, price: p.price })}
        className="mt-3 w-full rounded-lg bg-honey py-2 text-sm font-semibold text-forest transition-colors hover:bg-honey-light"
      >
        В корзину
      </motion.button>
    </motion.div>
  );
}

function Bestsellers({ onAdd }: { onAdd: (i: CartItem) => void }) {
  return (
    <section className="bg-cream py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 className="font-display font-bold text-forest text-[28px] md:text-[40px]">
            Хиты продаж
          </h2>
          <button className="shrink-0 text-sm font-medium hover:underline" style={{ color: "var(--honey)" }}>
            Посмотреть все →
          </button>
        </div>

        <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 -mx-4 px-4">
          {BESTSELLERS.map((p) => (
            <ProductCard key={p.name} p={p} onAdd={onAdd} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- BRAND STORY ---------- */

function Counter({ value, decimals }: { value: number; decimals: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1500;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - start) / dur, 1);
      setN(value * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return <span ref={ref}>{n.toFixed(decimals)}</span>;
}

function BrandStory() {
  return (
    <section id="about" className="py-16 md:py-24" style={{ background: "var(--forest)" }}>
      <div className="mx-auto grid max-w-7xl gap-12 px-4 md:px-8 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: "var(--honey)" }}>
            О нас
          </span>
          <h2 className="mt-3 font-display font-bold text-[28px] md:text-[36px]" style={{ color: "#FFFBF3" }}>
            Продукция с душой Алтая
          </h2>
          <div className="mt-6 space-y-5 text-base leading-[1.7]" style={{ color: "rgba(255,251,243,0.8)" }}>
            <p>
              Жемчужина Алтая — это два магазина в Новосибирске, где собрано лучшее из алтайских гор и лесов:
              натуральный мёд, деликатесы из марала, травяные сборы и косметика на основе алтайских растений.
            </p>
            <p>
              Каждый продукт проходит строгий отбор. Мы работаем только с проверенными производителями из
              Алтайского края и Республики Алтай, где экологическая чистота — не маркетинг, а реальность.
            </p>
            <p>
              Мы начали с одного магазина в 2018 году. Сегодня нас находят туристы, которые хотят увезти
              настоящий вкус Алтая домой, и жители Новосибирска, которые знают: здесь не продают подделки.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 gap-4">
          {STATS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="rounded-xl border p-5"
              style={{ borderColor: "rgba(200,151,58,0.3)", background: "rgba(255,251,243,0.03)" }}
            >
              <div className="font-display text-[32px] md:text-[36px] font-bold" style={{ color: "var(--honey)" }}>
                <Counter value={s.value} decimals={s.decimals} />
                {s.suffix}
              </div>
              <div className="mt-2 text-[13px]" style={{ color: "rgba(255,251,243,0.6)" }}>
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- WHY US ---------- */

function WhyUs() {
  return (
    <section className="bg-cream py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading>Почему выбирают нас</SectionHeading>
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="rounded-xl border bg-parchment p-6 shadow-card transition-all hover:shadow-card-hover"
              style={{ borderColor: "rgba(200,151,58,0.15)" }}
            >
              <f.Icon className="h-12 w-12" style={{ color: "var(--honey)" }} />
              <h3 className="mt-4 font-display text-lg font-bold text-forest">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- GIFT SETS ---------- */

function GiftSets({ onAdd }: { onAdd: (i: CartItem) => void }) {
  return (
    <section
      id="gifts"
      className="py-16 md:py-24"
      style={{ background: "linear-gradient(180deg, #F9F3E8 0%, #EFE7D6 100%)" }}
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display font-bold text-[28px] md:text-[40px] text-forest">
            Подарочные наборы
          </h2>
          <p className="mt-3 text-base text-ink-muted">Готовые подарки с историей</p>
        </div>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
          {GIFT_SETS.map((g, i) => (
            <motion.div
              key={g.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              whileHover={{ y: -6 }}
              className="overflow-hidden rounded-2xl bg-parchment shadow-card transition-all hover:shadow-card-hover"
            >
              <div className="relative grid h-[200px] place-items-center text-7xl" style={{ background: g.gradient }}>
                <span className="drop-shadow-lg">{g.emoji}</span>
                {g.badge && (
                  <span className="absolute right-4 top-4 rounded-full bg-forest px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-honey">
                    {g.badge}
                  </span>
                )}
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-bold text-forest">{g.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted min-h-[60px]">{g.desc}</p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="font-bold text-forest text-2xl">{g.price} ₽</div>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onAdd({ id: g.name, name: g.name, price: g.price })}
                    className="rounded-lg bg-honey px-4 py-2 text-sm font-semibold text-forest transition-colors hover:bg-honey-light"
                  >
                    В корзину
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button
            className="inline-flex items-center gap-2 rounded-lg border-[1.5px] px-7 py-3 text-sm font-semibold transition-all hover:bg-honey hover:text-forest"
            style={{ borderColor: "var(--honey)", color: "var(--honey)" }}
          >
            Все подарочные наборы <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ---------- LOCATIONS ---------- */

function Locations() {
  const shops = [
    { name: "Левый берег", addr: "ул. Титова, 32", info: "Metro: Октябрьская (1.1 км)", hours: "Время работы: уточняйте", link: "https://yandex.ru/maps/-/CDSir28U" },
    { name: "Правый берег", addr: "Гурьевская, 55, этаж 1", info: "В пешей доступности от центра", hours: "Время работы: уточняйте", link: "https://yandex.ru/maps/-/CDSir28U" },
  ];
  return (
    <section id="locations" className="py-16 md:py-24" style={{ background: "var(--forest)" }}>
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading dark>Где нас найти</SectionHeading>

        <div className="grid gap-5 md:grid-cols-2">
          {shops.map((s) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl border p-6 md:p-8"
              style={{ borderColor: "rgba(200,151,58,0.3)", background: "rgba(255,251,243,0.07)" }}
            >
              <MapPin className="h-6 w-6" style={{ color: "var(--honey)" }} />
              <h3 className="mt-4 font-display text-xl font-bold" style={{ color: "#FFFBF3" }}>
                {s.name}
              </h3>
              <p className="mt-2 text-base" style={{ color: "rgba(255,251,243,0.85)" }}>{s.addr}</p>
              <p className="mt-1 text-sm" style={{ color: "rgba(255,251,243,0.6)" }}>{s.info}</p>
              <p className="mt-1 text-sm" style={{ color: "rgba(255,251,243,0.6)" }}>{s.hours}</p>
              <a
                href={s.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-honey px-5 py-2.5 text-sm font-semibold text-forest transition-colors hover:bg-honey-light"
              >
                Открыть на Яндекс.Картах <ArrowRight className="h-4 w-4" />
              </a>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center text-sm" style={{ color: "rgba(255,251,243,0.7)" }}>
          📞 <a href="tel:+79607981622" className="hover:text-honey">+7 (960) 798-16-22</a> · WhatsApp · Telegram · VK
        </div>
      </div>
    </section>
  );
}

/* ---------- FOOTER ---------- */

function Footer() {
  return (
    <footer className="pt-16 pb-8" style={{ background: "var(--forest)" }}>
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid gap-10 grid-cols-2 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2">
              <span>🌿</span>
              <span className="font-display text-xl font-bold" style={{ color: "#FFFBF3" }}>
                Жемчужина Алтая
              </span>
            </div>
            <p className="mt-3 text-sm" style={{ color: "rgba(255,251,243,0.6)" }}>
              Дарим лучшее от алтайской природы
            </p>
            <div className="mt-4 flex gap-3">
              {["VK", "TG", "WA"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="grid h-10 w-10 place-items-center rounded-full border text-xs font-bold transition-colors hover:bg-honey hover:text-forest"
                  style={{ borderColor: "rgba(200,151,58,0.3)", color: "var(--honey)" }}
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          <FooterCol title="Каталог" links={["Мёд", "Чаи и травы", "Мясо марала", "Косметика", "Подарки"]} />
          <FooterCol title="Информация" links={["О нас", "Доставка и оплата", "Возврат", "Контакты"]} />
          <div>
            <h4 className="font-display text-base font-bold" style={{ color: "#FFFBF3" }}>Контакты</h4>
            <ul className="mt-4 space-y-2 text-sm" style={{ color: "rgba(255,251,243,0.7)" }}>
              <li>+7 (960) 798-16-22</li>
              <li>ул. Титова, 32</li>
              <li>Гурьевская, 55</li>
              <li>Ежедневно: уточняйте</li>
            </ul>
          </div>
        </div>

        <div
          className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-3 border-t pt-6 text-xs"
          style={{ borderColor: "rgba(200,151,58,0.2)", color: "rgba(255,251,243,0.5)" }}
        >
          <div>© 2026 Жемчужина Алтая · Новосибирск</div>
          <div>
            Разработка:{" "}
            <a href="https://neeklo.studio" target="_blank" rel="noopener noreferrer" style={{ color: "var(--honey)" }}>
              neeklo.studio
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h4 className="font-display text-base font-bold" style={{ color: "#FFFBF3" }}>{title}</h4>
      <ul className="mt-4 space-y-2 text-sm">
        {links.map((l) => (
          <li key={l}>
            <a href="#" className="transition-colors hover:text-honey" style={{ color: "rgba(255,251,243,0.7)" }}>
              {l}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- CART DRAWER ---------- */

function CartDrawer({
  open,
  onClose,
  items,
  onRemove,
}: {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (idx: number) => void;
}) {
  const total = items.reduce((s, i) => s + i.price, 0);
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[55] bg-black/40"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 280 }}
            className="fixed right-0 top-0 z-[60] flex h-full w-full sm:w-[360px] flex-col bg-parchment shadow-2xl"
          >
            <div className="flex items-center justify-between border-b p-5" style={{ borderColor: "rgba(200,151,58,0.2)" }}>
              <h3 className="font-display text-xl font-bold text-forest">Корзина</h3>
              <button onClick={onClose} className="grid h-9 w-9 place-items-center rounded-full hover:bg-cream-dark">
                <X className="h-5 w-5 text-forest" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              {items.length === 0 ? (
                <div className="grid h-full place-items-center text-center">
                  <div>
                    <div className="text-5xl mb-3">🛒</div>
                    <p className="text-sm text-ink-muted">Здесь появятся ваши товары</p>
                  </div>
                </div>
              ) : (
                <ul className="space-y-3">
                  {items.map((it, i) => (
                    <li key={i} className="flex items-center justify-between gap-3 rounded-lg border border-cream-dark bg-cream p-3">
                      <div className="min-w-0">
                        <div className="truncate text-sm font-semibold text-forest">{it.name}</div>
                        <div className="text-xs text-ink-muted">{it.price} ₽</div>
                      </div>
                      <button
                        onClick={() => onRemove(i)}
                        className="shrink-0 text-xs text-ink-muted hover:text-forest"
                      >
                        Удалить
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="border-t p-5" style={{ borderColor: "rgba(200,151,58,0.2)" }}>
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm text-ink-muted">Итого</span>
                <span className="font-display text-xl font-bold text-forest">{total} ₽</span>
              </div>
              <button
                disabled={items.length === 0}
                className="w-full rounded-lg bg-honey py-3 text-sm font-semibold text-forest transition-colors hover:bg-honey-light disabled:opacity-50"
              >
                Оформить заказ
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
