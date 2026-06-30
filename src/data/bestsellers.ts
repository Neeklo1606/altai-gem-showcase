export interface Bestseller {
  id: string;
  name: string;
  category: string;
  weight: string;
  price: number;
  oldPrice?: number;
  image: string; // gradient placeholder
  badge?: "Хит" | "Новинка" | "-15%" | "-20%";
}

export const BESTSELLERS: Bestseller[] = [
  {
    id: "honey-meadow",
    name: "Горный мёд разнотравье",
    category: "Мёд",
    weight: "500 г",
    price: 890,
    image: "linear-gradient(135deg, #c8963e 0%, #e8b44f 100%)",
    badge: "Хит",
  },
  {
    id: "chaga",
    name: "Чага алтайская",
    category: "Чаи и сборы",
    weight: "100 г",
    price: 450,
    image: "linear-gradient(135deg, #3a2417 0%, #6b4a2e 100%)",
    badge: "Хит",
  },
  {
    id: "cheese-altai",
    name: "Сыр Алтайский выдержанный",
    category: "Сыры",
    weight: "300 г",
    price: 620,
    oldPrice: 730,
    image: "linear-gradient(135deg, #d8b970 0%, #f0d99a 100%)",
    badge: "-15%",
  },
  {
    id: "maral-sausage",
    name: "Колбаса из марала сыровяленая",
    category: "Мясные деликатесы",
    weight: "200 г",
    price: 1250,
    image: "linear-gradient(135deg, #5a1f1a 0%, #a63d3d 100%)",
    badge: "Хит",
  },
  {
    id: "altai-balm",
    name: "Бальзам Сила Алтая",
    category: "Бальзамы и масла",
    weight: "100 мл",
    price: 780,
    image: "linear-gradient(135deg, #1f4a30 0%, #3b6e4a 100%)",
    badge: "Новинка",
  },
  {
    id: "pantohematogen",
    name: "Пантогематоген классический",
    category: "Пантогематоген",
    weight: "50 мл",
    price: 1100,
    oldPrice: 1380,
    image: "linear-gradient(135deg, #1a3028 0%, #2d5a3f 100%)",
    badge: "-20%",
  },
  {
    id: "cedar-oil",
    name: "Масло кедровое холодного отжима",
    category: "Бальзамы и масла",
    weight: "250 мл",
    price: 590,
    image: "linear-gradient(135deg, #6e8a3b 0%, #b6c97a 100%)",
    badge: "Новинка",
  },
  {
    id: "gift-premium",
    name: "Подарочный набор Премиум",
    category: "Подарочные наборы",
    weight: "5 предметов",
    price: 3200,
    image: "linear-gradient(135deg, #a67c2e 0%, #1a2a20 100%)",
    badge: "Хит",
  },
];
