import type { LucideIcon } from "lucide-react";
import { Gift, Sparkles, Truck, Cookie } from "lucide-react";

export interface Promo {
  id: string;
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  bgColor: string;
  accentColor: string;
  icon: LucideIcon;
  badge?: string;
}

export const PROMOS: Promo[] = [
  {
    id: "honey-week",
    title: "Медовая неделя",
    description: "Скидка 15% на весь мёд по промокоду HONEY15. До конца недели.",
    ctaText: "За мёдом",
    ctaLink: "#cat-honey",
    bgColor: "linear-gradient(120deg, #8a5a1a 0%, #c8963e 100%)",
    accentColor: "#faf7f2",
    icon: Cookie,
    badge: "Промокод HONEY15",
  },
  {
    id: "gift-sets",
    title: "Подарочные наборы",
    description: "Готовые наборы со скидкой 20% от 1500 ₽. Красивая упаковка в подарок.",
    ctaText: "Смотреть наборы",
    ctaLink: "#cat-gifts",
    bgColor: "linear-gradient(120deg, #1f4a30 0%, #3b6e4a 100%)",
    accentColor: "#e8b44f",
    icon: Gift,
    badge: "-20%",
  },
  {
    id: "free-delivery",
    title: "Бесплатная доставка",
    description: "По Новосибирску при заказе от 3000 ₽. Привезём в день заказа.",
    ctaText: "Условия доставки",
    ctaLink: "#delivery",
    bgColor: "linear-gradient(120deg, #1a3028 0%, #2d5a3f 100%)",
    accentColor: "#e8b44f",
    icon: Truck,
    badge: "От 3000 ₽",
  },
  {
    id: "new-season",
    title: "Новинки сезона",
    description: "Свежие травяные сборы урожая 2026 - алтайское лето в каждой пачке.",
    ctaText: "Открыть новинки",
    ctaLink: "#cat-tea",
    bgColor: "linear-gradient(120deg, #6b2e5a 0%, #c46aa0 100%)",
    accentColor: "#faf7f2",
    icon: Sparkles,
    badge: "Новое",
  },
];
