import { Product, Category } from './types';

export const CATEGORIES: Category[] = [
  { id: 'all', name: 'الكل' },
  { id: 'watches', name: 'ساعات' },
  { id: 'glasses', name: 'نظارات' },
  { id: 'car', name: 'اكسسوارات السيارات' },
  { id: 'misc', name: 'منوعات' },
];

export const PRODUCTS: Product[] = [
  // Watches
  {
    id: 'w1',
    category: 'watches',
    name: "ساعة الفخامة السوداء - إصدار خاص",
    shortDescription: "تصميم أسود ملكي يجمع بين الأناقة والقوة.",
    fullDescription: "ساعة مصممة خصيصاً لأصحاب الذوق الرفيع. هيكل معدني مقاوم للخدش، زجاج ياقوتي، ومقاومة للماء حتى عمق 50 متر. تأتي في علبة فاخرة.",
    price: 499,
    oldPrice: 799,
    imageUrl: "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?q=80&w=800&auto=format&fit=crop",
    features: ["مقاومة للماء 5ATM", "زجاج غير قابل للخدش", "حركة كوارتز يابانية", "ضمان سنتين"]
  },
  {
    id: 'w2',
    category: 'watches',
    name: "ساعة ذكية رياضية برو",
    shortDescription: "رفيقك المثالي للرياضة والصحة.",
    fullDescription: "شاشة AMOLED عالية الدقة، قياس نبضات القلب، تتبع النوم، وبطارية تدوم 14 يوماً.",
    price: 399,
    oldPrice: 550,
    imageUrl: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=800&auto=format&fit=crop",
    features: ["شاشة لمس كاملة", "مقاومة للماء IP68", "ربط مع الهاتف", "بطارية طويلة العمر"]
  },
  
  // Glasses
  {
    id: 'g1',
    category: 'glasses',
    name: "نظارات شمسية كلاسيك - طيار",
    shortDescription: "حماية كاملة من الأشعة فوق البنفسجية.",
    fullDescription: "إطار معدني خفيف الوزن وعدسات مستقطبة (Polarized) لرؤية واضحة وحماية قصوى للعين.",
    price: 199,
    oldPrice: 299,
    imageUrl: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=800&auto=format&fit=crop",
    features: ["حماية UV400", "عدسات Polarized", "إطار متين", "حافظة جلدية مجانية"]
  },
  {
    id: 'g2',
    category: 'glasses',
    name: "نظارات حماية من الضوء الأزرق",
    shortDescription: "احمِ عينيك أثناء استخدام الهاتف والحاسوب.",
    fullDescription: "تصميم عصري مناسب للعمل والدراسة، يقلل من إجهاد العين والصداع الناتج عن الشاشات.",
    price: 149,
    oldPrice: 220,
    imageUrl: "https://images.unsplash.com/photo-1577803645773-f96470509666?q=80&w=800&auto=format&fit=crop",
    features: ["حماية بلو لايت", "خفيفة الوزن", "مريحة للأذن", "تصميم للجنسين"]
  },

  // Car Accessories
  {
    id: 'c1',
    category: 'car',
    name: "حامل هاتف مغناطيسي للسيارة",
    shortDescription: "ثبات قوي وقيادة آمنة.",
    fullDescription: "حامل يثبت بقوة على فتحة التكييف أو الطبلون، يدعم الدوران 360 درجة.",
    price: 89,
    oldPrice: 150,
    imageUrl: "https://images.unsplash.com/photo-1627443126780-6b6639c06584?q=80&w=800&auto=format&fit=crop",
    features: ["مغناطيس قوي جداً", "دوران 360 درجة", "سهل التركيب", "لا يؤثر على الإشارة"]
  },
  {
    id: 'c2',
    category: 'car',
    name: "مكنسة سيارة لاسلكية محمولة",
    shortDescription: "حافظ على نظافة سيارتك في أي مكان.",
    fullDescription: "شفط قوي للأتربة والأوساخ، بطارية قابلة للشحن، وتأتي مع رؤوس متعددة للأماكن الضيقة.",
    price: 249,
    oldPrice: 399,
    imageUrl: "https://images.unsplash.com/photo-1582046460395-5d92f4405900?q=80&w=800&auto=format&fit=crop",
    features: ["شفط قوي 6000Pa", "بطارية قابلة للشحن", "فلتر قابل للغسل", "حجم مدمج"]
  },

  // Misc
  {
    id: 'm1',
    category: 'misc',
    name: "سماعات برو اللاسلكية",
    shortDescription: "صوت نقي وعزل ضوضاء ممتاز لتجربة استماع فريدة.",
    fullDescription: "استمتع بموسيقاك المفضلة مع تقنية عزل الضوضاء النشط. بطارية تدوم طويلاً وتصميم مريح للأذن.",
    price: 299,
    oldPrice: 450,
    imageUrl: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?q=80&w=800&auto=format&fit=crop",
    features: ["عزل ضوضاء", "بلوتوث 5.0", "ميكروفون عالي الجودة", "بطارية 24 ساعة"]
  },
  {
    id: 'm2',
    category: 'misc',
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