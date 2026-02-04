import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: "ساعة الفخامة السوداء - إصدار خاص",
    shortDescription: "تصميم أسود ملكي يجمع بين الأناقة والقوة.",
    fullDescription: "ساعة مصممة خصيصاً لأصحاب الذوق الرفيع. هيكل معدني مقاوم للخدش، زجاج ياقوتي، ومقاومة للماء حتى عمق 50 متر. تأتي في علبة فاخرة.",
    price: 499,
    oldPrice: 799,
    imageUrl: "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?q=80&w=800&auto=format&fit=crop",
    features: ["مقاومة للماء 5ATM", "زجاج غير قابل للخدش", "حركة كوارتز يابانية", "ضمان سنتين"]
  },
  {
    id: 'p2',
    name: "سماعات برو اللاسلكية",
    shortDescription: "صوت نقي وعزل ضوضاء ممتاز لتجربة استماع فريدة.",
    fullDescription: "استمتع بموسيقاك المفضلة مع تقنية عزل الضوضاء النشط. بطارية تدوم طويلاً وتصميم مريح للأذن.",
    price: 299,
    oldPrice: 450,
    imageUrl: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?q=80&w=800&auto=format&fit=crop",
    features: ["عزل ضوضاء", "بلوتوث 5.0", "ميكروفون عالي الجودة", "بطارية 24 ساعة"]
  },
  {
    id: 'p3',
    name: "عطر العود الملكي",
    shortDescription: "رائحة شرقية أصيلة تدوم طويلاً.",
    fullDescription: "مزيج ساحر من العود والعنبر والمسك. عطر يمنحك حضوراً قوياً وجذاباً في كل المناسبات.",
    price: 199,
    oldPrice: 350,
    imageUrl: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop",
    features: ["ثبات عالي", "رائحة فواحة", "عبوة 100 مل", "مناسب للجنسين"]
  }
];

export const MOROCCAN_CITIES = [
  "الدار البيضاء",
  "الرباط",
  "مراكش",
  "فاس",
  "طنجة",
  "أكادير",
  "مكناس",
  "وجدة",
  "القنيطرة",
  "تطوان",
  "آسفي",
  "مدينة أخرى"
];