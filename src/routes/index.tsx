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
  Shield,
  ArrowRight,
  Home,
  LayoutGrid,
  Phone,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Жемчужина Алтая - натуральная продукция с Алтая" },
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
    title: "Мёд",
    desc: "Донниковый, горный, таёжный, прополис",
    count: 12,
    emoji: "🍯",
    gradient: "linear-gradient(135deg, #5C3A00 0%, #C8973A 100%)",
  },
  {
    title: "Травяные чаи",
    desc: "Иван-чай, чага, алтайский сбор",
    count: 8,
    emoji: "🌿",
    gradient: "linear-gradient(135deg, #0D2B1A 0%, #1E6B3A 100%)",
  },
  {
    title: "Деликатесы из марала",
    desc: "Вырезка, колбасы, копчёности",
    count: 6,
    emoji: "🦌",
    gradient: "linear-gradient(135deg, #2A0A0A 0%, #7A2020 100%)",
  },
  {
    title: "Натуральная косметика",
    desc: "Кремы, шампуни, мыло, масла",
    count: 15,
    emoji: "🌸",
    gradient: "linear-gradient(135deg, #0F2010 0%, #2D5A1E 100%)",
  },
  {
    title: "Пантогематоген",
    desc: "Бальзамы на травах, пантогематоген",
    count: 9,
    emoji: "💪",
    gradient: "linear-gradient(135deg, #0A0F2A 0%, #1E3A7A 100%)",
  },
  {
    title: "Подарочные наборы",
    desc: "Готовые наборы от 1 200 ₽",
    count: 10,
    emoji: "🎁",
    gradient: "linear-gradient(135deg, #2A1A00 0%, #7A5000 100%)",
  },
];

const BESTSELLERS = [
  { name: "Донниковый мёд", price: 890, unit: "₽/кг", cat: "Мёд", emoji: "🍯", desc: "Нежный ванильный аромат", bg: "#FBE9C2", delivery: "Доставка по РФ", producer: "Алтайская деревня" },
  { name: "Мясо марала (вырезка)", price: 2150, unit: "₽/кг", cat: "Марал", emoji: "🦌", desc: "Плотное, нежное, травяные нотки", bg: "#E8C8C8", delivery: "Доставка по РФ", producer: "Шлегель" },
  { name: "Набор Сладкоежка", price: 2650, unit: "₽", cat: "Подарки", emoji: "🎁", desc: "Мёд, конфеты, чай", bg: "#FBE0A8", delivery: "Доставка по РФ", producer: "Алтайская деревня" },
  { name: "Пантогематоген батончик", price: 380, unit: "₽/шт", cat: "Здоровье", emoji: "💪", desc: "С кровью марала", bg: "#D6E8DC", delivery: "Доставка по РФ", producer: "Алтайская деревня" },
  { name: "Горный мёд с миндалём", price: 950, unit: "₽/кг", cat: "Мёд", emoji: "🍯", desc: "Алтайский разнотравный", bg: "#FBE9C2", delivery: "Доставка по РФ", producer: "Алтайская деревня" },
  { name: "Чай Таёжный со смородиной", price: 520, unit: "₽/упак", cat: "Чаи", emoji: "🌿", desc: "Сбор горных трав", bg: "#D6E8DC", delivery: "Доставка по РФ", producer: "Алтайская деревня" },
  { name: "Крем Саган дайля", price: 890, unit: "₽", cat: "Косметика", emoji: "🌸", desc: "Для лица, натуральный", bg: "#E0EBD6", delivery: "Доставка по РФ", producer: "Алтайская деревня" },
  { name: "Молочная колбаса", price: 680, unit: "₽/кг", cat: "Мясное", emoji: "🥓", desc: "Нежная, домашнего рецепта", bg: "#E8C8C8", delivery: "Самовывоз", producer: "Шлегель" },
  { name: "Сыр Алтайский", price: 1290, unit: "₽/кг", cat: "Сыры", emoji: "🧀", desc: "Выдержанный, мягкий вкус", bg: "#FBE9C2", delivery: "Самовывоз", producer: "Шлегель" },
  { name: "Колбаса сырокопченая", price: 1450, unit: "₽/кг", cat: "Мясное", emoji: "🍖", desc: "Из мяса марала, копчёная на ольхе", bg: "#E8C8C8", delivery: "Доставка по РФ", producer: "Шлегель" },
];

const STATS = [
  { value: 4.4, suffix: " ⭐", label: "Рейтинг на Яндекс.Картах", decimals: 1 },
  { value: 180, suffix: "+", label: "Фотографий продукции", decimals: 0 },
  { value: 2, suffix: "", label: "Магазина в Новосибирске", decimals: 0 },
  { value: 2018, suffix: "", label: "Год основания", decimals: 0 },
];

const FEATURES = [
  { Icon: Leaf, title: "Только натуральное", desc: "Без консервантов, красителей и ароматизаторов. Каждый продукт - прямо от алтайских производителей" },
  { Icon: MapPin, title: "Два магазина в городе", desc: "ул. Титова, 32 (Левый берег) и Гурьевская, 55 (Правый берег). Приходите лично" },
  { Icon: Truck, title: "Доставка по России", desc: "Отправляем СДЭК в любой регион. Упаковка защитит продукцию в дороге" },
  { Icon: Star, title: "4.4 на Яндекс.Картах", desc: "Реальные отзывы реальных покупателей. Смотрите сами по ссылке на картах" },
];

const GIFT_SETS = [
  { name: "Набор Сладкоежка", price: 2650, desc: "Мёд, кедровые конфеты, травяной чай, варенье", gradient: "linear-gradient(135deg, #7B4F0A 0%, #C8973A 100%)", badge: "Хит", emoji: "🎁" },
  { name: "Набор Здоровье", price: 2390, desc: "Пантогематоген, бальзам, мазь пантовая, чай Батыр", gradient: "linear-gradient(135deg, #0D2B1A 0%, #1E6B3A 100%)", badge: null, emoji: "🌿" },
  { name: "Набор Энергия", price: 1200, desc: "Мёд, пантогематоген, бальзам Чемчудой", gradient: "linear-gradient(135deg, #2A1A00 0%, #7A5000 100%)", badge: null, emoji: "💪" },
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
    document.documentElement.style.scrollBehavior = "smooth";
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
    <div className="min-h-screen bg-cream text-ink pb-20 md:pb-0">
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

      <About />

      <Bestsellers onAdd={handleAdd} />

      <BrandStory />

      <WhyUs />

      <GiftSets onAdd={handleAdd} />


      <Footer />

      <CartDrawer
        open={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart.items}
        onRemove={cart.removeItem}
      />

      <MobileBottomNav
        cartCount={cart.totalCount}
        onCartOpen={() => setIsCartOpen(true)}
        scrollTo={scrollTo}
      />

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-24 md:bottom-8 left-1/2 z-[110] -translate-x-1/2 rounded-full bg-forest px-6 py-3 text-sm font-medium text-cream shadow-lg"
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
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 md:h-[72px] md:px-8">
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
            className="hidden grid h-10 w-10 place-items-center rounded-full text-forest"
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
      id="hero"
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
      className="sticky top-14 md:top-[72px] z-40"
      style={{
        backgroundColor: "rgba(249,243,232,0.97)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(200,151,58,0.15)",
      }}
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

        <div style={{ overflow: "hidden" }}>
          <div
            className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            style={{ minHeight: typeof window !== "undefined" && window.innerWidth < 768 ? 1200 : 900 }}
          >
            {CATEGORY_CARDS.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="category-card relative cursor-pointer overflow-hidden"
                style={{
                  height: "var(--cat-h)",
                  borderRadius: 20,
                  background: c.gradient,
                  transition: "filter 0.3s ease, box-shadow 0.3s ease",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.18)",
                }}
              >
                {/* noise texture */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/></svg>\")",
                    opacity: 0.04,
                    mixBlendMode: "overlay",
                  }}
                />
                {/* bottom shine */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(255,255,255,0.06) 0%, transparent 60%)",
                  }}
                />
                {/* text */}
                <div className="relative" style={{ margin: 20 }}>
                  <h3
                    style={{
                      fontFamily: "'Unbounded', sans-serif",
                      fontSize: 18,
                      fontWeight: 700,
                      color: "#FFFBF3",
                      lineHeight: 1.1,
                    }}
                  >
                    {c.title}
                  </h3>
                  <div
                    style={{
                      marginTop: 6,
                      fontSize: 13,
                      color: "rgba(255,251,243,0.55)",
                    }}
                  >
                    {c.count} товаров
                  </div>
                </div>
                {/* emoji */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute"
                  style={{
                    bottom: 16,
                    right: 16,
                    fontSize: 52,
                    lineHeight: 1,
                    transform: "rotate(10deg)",
                    filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.4))",
                  }}
                >
                  {c.emoji}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        .category-card { --cat-h: 160px; }
        @media (min-width: 768px) { .category-card { --cat-h: 200px; } }
        .category-card:hover { filter: brightness(1.12); }
      `}</style>
    </section>
  );
}

/* ---------- ABOUT ---------- */

function About() {
  const stats = [
    { num: "2", label: "Фермерских хозяйства" },
    { num: "2018", label: "Год основания" },
    { num: "2", label: "Магазина в НСК" },
    { num: "100%", label: "Натуральное" },
  ];

  return (
    <section id="about" className="w-full" style={{ background: "#1A3028" }}>
      <div className="grid grid-cols-1 lg:grid-cols-5">
        {/* LEFT - image */}
        <div className="relative lg:col-span-3">
          <img
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900&q=80&fit=crop"
            alt="Алтайские горы"
            className="block w-full object-cover"
            style={{ height: "var(--about-img-h, 300px)" }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(15,30,15,0.4) 100%)",
            }}
          />
        </div>

        {/* RIGHT - content */}
        <div
          className="flex flex-col justify-center lg:col-span-2"
          style={{ padding: "var(--about-pad, 40px 24px)" }}
        >
          <div
            style={{
              fontSize: 12,
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "#C8973A",
              fontWeight: 600,
            }}
          >
            О нас
          </div>

          <h2
            style={{
              fontFamily: "'Unbounded', sans-serif",
              fontSize: 28,
              fontWeight: 700,
              color: "#FFFBF3",
              marginTop: 12,
              lineHeight: 1.15,
            }}
          >
            Два хозяйства. Одна история.
          </h2>

          <p
            style={{
              fontSize: 15,
              color: "rgba(255,251,243,0.75)",
              lineHeight: 1.65,
              marginTop: 16,
            }}
          >
            Мы работаем с двумя фермерскими хозяйствами: Алтайская деревня и Шлегель. Оба находятся в Алтайском крае, оба производят натуральную продукцию без добавок.
          </p>
          <p
            style={{
              fontSize: 15,
              color: "rgba(255,251,243,0.75)",
              lineHeight: 1.65,
              marginTop: 12,
            }}
          >
            Алтайская деревня - немецкое поселение на Алтае. Шлегель - фермерское хозяйство возле Белокурихи. Продукция поступает напрямую от производителей.
          </p>

          <div
            className="grid grid-cols-2"
            style={{ gap: 16, marginTop: 28 }}
          >
            {stats.map((s) => (
              <div
                key={s.label}
                style={{
                  border: "1px solid rgba(200,151,58,0.2)",
                  borderRadius: 12,
                  padding: "14px 16px",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Unbounded', sans-serif",
                    fontSize: 26,
                    color: "#C8973A",
                    fontWeight: 700,
                    lineHeight: 1.1,
                  }}
                >
                  {s.num}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "rgba(255,251,243,0.55)",
                    marginTop: 4,
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          #about { --about-img-h: 500px; --about-pad: 60px 48px; }
        }
      `}</style>
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
              Жемчужина Алтая - это два магазина в Новосибирске, где собрано лучшее из алтайских гор и лесов:
              натуральный мёд, деликатесы из марала, травяные сборы и косметика на основе алтайских растений.
            </p>
            <p>
              Каждый продукт проходит строгий отбор. Мы работаем только с проверенными производителями из
              Алтайского края и Республики Алтай, где экологическая чистота - не маркетинг, а реальность.
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
  const cards = [
    { Icon: Leaf, title: "Только натуральное", desc: "Продукция напрямую от производителей. Без консервантов и ароматизаторов" },
    { Icon: MapPin, title: "Два магазина", desc: "ул. Титова, 32 и Гурьевская, 55. Приходите попробовать лично" },
    { Icon: Truck, title: "Доставка по России", desc: "Отправляем СДЭК. Мёд, колбасы, косметика - в любой регион" },
    { Icon: Shield, title: "Контроль качества", desc: "Работаем только с проверенными хозяйствами с 2018 года" },
  ];

  const shops = [
    { name: "Левый берег", addr: "ул. Титова, 32" },
    { name: "Правый берег", addr: "Гурьевская, 55" },
  ];

  return (
    <section id="locations" style={{ background: "#F9F3E8", padding: "72px 24px" }}>
      <div className="mx-auto max-w-7xl">
        <h2
          className="text-center"
          style={{
            fontFamily: "'Unbounded', sans-serif",
            fontSize: 32,
            fontWeight: 800,
            color: "#1A3028",
            lineHeight: 1.1,
          }}
        >
          Почему выбирают нас
        </h2>
        <div style={{ width: 60, height: 3, background: "#C8973A", margin: "12px auto 48px" }} />

        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="why-card"
              style={{
                background: "#FFFFFF",
                border: "1px solid rgba(200,151,58,0.15)",
                borderRadius: 20,
                padding: "28px 24px",
                boxShadow: "0 4px 20px rgba(30,58,47,0.06)",
                transition: "all 0.3s ease",
              }}
            >
              <div
                className="grid place-items-center"
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: "50%",
                  background: "rgba(200,151,58,0.1)",
                  marginBottom: 16,
                }}
              >
                <c.Icon size={26} color="#C8973A" />
              </div>
              <h3
                style={{
                  fontFamily: "'Unbounded', sans-serif",
                  fontSize: 16,
                  fontWeight: 700,
                  color: "#1A3028",
                  marginBottom: 8,
                }}
              >
                {c.title}
              </h3>
              <p style={{ fontSize: 14, color: "#6B5E4E", lineHeight: 1.6 }}>{c.desc}</p>
            </motion.div>
          ))}
        </div>

        <div style={{ marginTop: 64 }}>
          <h2
            className="text-center"
            style={{
              fontFamily: "'Unbounded', sans-serif",
              fontSize: 28,
              fontWeight: 800,
              color: "#1A3028",
              lineHeight: 1.1,
              marginBottom: 32,
            }}
          >
            Найдите нас
          </h2>
          <div className="grid gap-5 grid-cols-1 md:grid-cols-2">
            {shops.map((s) => (
              <div
                key={s.name}
                style={{
                  background: "#1A3028",
                  borderRadius: 20,
                  padding: 28,
                }}
              >
                <MapPin size={24} color="#C8973A" />
                <h3
                  style={{
                    fontFamily: "'Unbounded', sans-serif",
                    fontSize: 16,
                    color: "#FFFBF3",
                    marginTop: 12,
                  }}
                >
                  {s.name}
                </h3>
                <p style={{ fontSize: 15, color: "rgba(255,251,243,0.7)", margin: "8px 0" }}>
                  {s.addr}
                </p>
                <a
                  href="https://yandex.ru/maps/-/CDSir28U"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#C8973A", fontSize: 14 }}
                >
                  Открыть карту →
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .why-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(200,151,58,0.15);
          border-color: rgba(200,151,58,0.4);
        }
      `}</style>
    </section>
  );
}

/* ---------- GIFT SETS ---------- */

function GiftSets({ onAdd }: { onAdd: (i: CartItem) => void }) {
  return (
    <section
      id="gifts"
      style={{
        background:
          "linear-gradient(160deg, #0F1E18 0%, #1A3028 50%, #0F1E18 100%)",
        padding: "80px 24px",
      }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <span
            className="inline-block"
            style={{
              border: "1px solid rgba(200,151,58,0.3)",
              color: "#C8973A",
              fontSize: 13,
              padding: "6px 16px",
              borderRadius: 100,
            }}
          >
            Идеальный подарок
          </span>
          <h2
            style={{
              fontFamily: "'Unbounded', sans-serif",
              fontSize: 36,
              fontWeight: 800,
              color: "#FFFBF3",
              marginTop: 16,
              lineHeight: 1.1,
            }}
          >
            Подарочные наборы
          </h2>
          <p
            style={{
              fontSize: 16,
              color: "rgba(255,251,243,0.6)",
              marginTop: 8,
            }}
          >
            Собираем из лучшей продукции двух хозяйств
          </p>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-3"
          style={{ gap: 20, marginTop: 48 }}
        >
          {GIFT_SETS.map((g, i) => (
            <motion.div
              key={g.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              whileHover={{ y: -6 }}
              className="relative"
              style={{
                background: "rgba(255,251,243,0.07)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(200,151,58,0.2)",
                borderRadius: 24,
                padding: "28px 24px",
              }}
            >
              <div
                className="relative grid place-items-center"
                style={{
                  height: 160,
                  borderRadius: 16,
                  background: g.gradient,
                  fontSize: 64,
                }}
              >
                <span style={{ filter: "drop-shadow(0 6px 16px rgba(0,0,0,0.4))" }}>
                  {g.emoji}
                </span>
                {g.badge && (
                  <span
                    className="absolute"
                    style={{
                      top: 16,
                      right: 16,
                      background: "#C8973A",
                      color: "#1A3028",
                      fontFamily: "'Unbounded', sans-serif",
                      fontSize: 12,
                      fontWeight: 700,
                      padding: "4px 12px",
                      borderRadius: 100,
                    }}
                  >
                    {g.badge}
                  </span>
                )}
              </div>

              <h3
                style={{
                  fontFamily: "'Unbounded', sans-serif",
                  fontSize: 18,
                  fontWeight: 700,
                  color: "#FFFBF3",
                  marginTop: 18,
                }}
              >
                {g.name}
              </h3>
              <p
                style={{
                  fontSize: 13,
                  color: "rgba(255,251,243,0.55)",
                  lineHeight: 1.5,
                  marginTop: 6,
                }}
              >
                {g.desc}
              </p>
              <div
                style={{
                  fontFamily: "'Unbounded', sans-serif",
                  fontSize: 28,
                  fontWeight: 800,
                  color: "#C8973A",
                  marginTop: 14,
                }}
              >
                {g.price.toLocaleString("ru-RU")} ₽
              </div>
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onAdd({ id: g.name, name: g.name, price: g.price })}
                className="w-full gift-cta"
                style={{
                  background: "#C8973A",
                  color: "#1A3028",
                  fontFamily: "'Unbounded', sans-serif",
                  fontSize: 14,
                  fontWeight: 700,
                  padding: 14,
                  borderRadius: 12,
                  marginTop: 16,
                  transition: "background 0.2s ease",
                }}
              >
                В корзину
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .gift-cta:hover { background: #E8B84B !important; }
      `}</style>
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
    <footer id="footer" className="pt-16 pb-8" style={{ background: "var(--forest)" }}>
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
          <div className="flex items-center gap-4">
            <a
              href="/admin"
              style={{ fontSize: 11, color: "rgba(100,100,100,0.4)" }}
            >
              Admin
            </a>
            <span>
              Разработка:{" "}
              <a href="https://neeklo.studio" target="_blank" rel="noopener noreferrer" style={{ color: "var(--honey)" }}>
                neeklo.studio
              </a>
            </span>
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

/* ---------- MOBILE BOTTOM NAV ---------- */

function MobileBottomNav({
  cartCount,
  onCartOpen,
  scrollTo,
}: {
  cartCount: number;
  onCartOpen: () => void;
  scrollTo: (id: string) => void;
}) {
  const [active, setActive] = useState("hero");

  const items: {
    id: string;
    label: string;
    Icon: typeof Home;
    target: string;
  }[] = [
    { id: "hero", label: "Главная", Icon: Home, target: "hero" },
    { id: "catalog", label: "Каталог", Icon: LayoutGrid, target: "catalog" },
    { id: "locations", label: "Доставка", Icon: Truck, target: "locations" },
    { id: "footer", label: "Контакты", Icon: Phone, target: "footer" },
  ];

  const go = (id: string, target: string) => {
    setActive(id);
    scrollTo(target);
  };

  return (
    <nav
      className="md:hidden flex"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: 64,
        background: "rgba(15, 30, 24, 0.96)",
        backdropFilter: "blur(20px)",
        borderTop: "1px solid rgba(200, 151, 58, 0.15)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      {items.slice(0, 2).map((it) => {
        const isActive = active === it.id;
        return (
          <button
            key={it.id}
            onClick={() => go(it.id, it.target)}
            className="flex flex-col items-center"
            style={{
              gap: 3,
              padding: "8px 12px",
              color: isActive ? "#C8973A" : "rgba(255,251,243,0.4)",
            }}
          >
            <it.Icon size={22} />
            <span style={{ fontSize: 9, letterSpacing: "0.3px" }}>{it.label}</span>
          </button>
        );
      })}

      {/* Center cart */}
      <button
        onClick={onCartOpen}
        className="relative grid place-items-center"
        style={{
          width: 52,
          height: 52,
          borderRadius: "50%",
          background: "#C8973A",
          padding: 14,
          boxShadow: "0 6px 18px rgba(200,151,58,0.45)",
        }}
        aria-label="Корзина"
      >
        <ShoppingCart size={24} color="#1A3028" />
        {cartCount > 0 && (
          <span
            className="grid place-items-center"
            style={{
              position: "absolute",
              top: -2,
              right: -2,
              minWidth: 18,
              height: 18,
              padding: "0 5px",
              borderRadius: 100,
              background: "#D93030",
              color: "#FFFFFF",
              fontSize: 10,
              fontWeight: 700,
              border: "2px solid rgba(15,30,24,0.96)",
            }}
          >
            {cartCount}
          </span>
        )}
      </button>

      {items.slice(2).map((it) => {
        const isActive = active === it.id;
        return (
          <button
            key={it.id}
            onClick={() => go(it.id, it.target)}
            className="flex flex-col items-center"
            style={{
              gap: 3,
              padding: "8px 12px",
              color: isActive ? "#C8973A" : "rgba(255,251,243,0.4)",
            }}
          >
            <it.Icon size={22} />
            <span style={{ fontSize: 9, letterSpacing: "0.3px" }}>{it.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
