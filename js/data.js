/* ================================================================
   data.js — بيانات المنتجات
   ================================================================

   🖼️ كيف تضيف صور للمنتجات؟
   ───────────────────────────
   1. ضع الصورة داخل مجلد  images/
   2. في كل منتج ابحث عن: image: ''
   3. اكتب اسم الملف بين علامتي اقتباس

   مثال:
   image: 'images/pubg.jpg'
   image: 'images/fortnite.png'

   ملاحظة: إذا تركت image: '' سيعرض الإيموجي تلقائياً ✓
   ================================================================ */

const PRODUCTS = [

  /* ──────────────────────────────────────────────
     🎮 قسم: شحن الألعاب
     ────────────────────────────────────────────── */
  {
    id: 1,
    slug: 'pubg-mobile',
    nameAr: 'ببجي موبايل',
    name: 'PUBG Mobile UC',
    category: 'games',
    subcat: 'شحن ألعاب',
    price: 4.99,
    originalPrice: 6.99,
    badge: 'الأكثر مبيعاً',
    emoji: '⚡',
    bgClass: 'bg-pubg',
    accentColor: '#FFD700',
    rating: 4.9,
    reviews: 2847,
    desc: 'شحن UC لببجي موبايل بسرعة وأمان مع ضمان استلام فوري بعد الدفع مباشرة.',
    image: 'images/pubg.jpg',
    variants: [
      { id: 'p1', name: '60 UC', price: 4.99, orig: 6.99 },
      { id: 'p2', name: '325 UC', price: 11.49, orig: 14.99 },
      { id: 'p3', name: '660 UC', price: 21.99, orig: 28.99 },
      { id: 'p4', name: '1800 UC', price: 54.99, orig: 69.99 },
    ]
  },

  {
    id: 2,
    slug: 'cod-mobile',
    nameAr: 'كول أوف ديوتي',
    name: 'Call of Duty CP',
    category: 'games',
    subcat: 'شحن ألعاب',
    price: 5.99,
    originalPrice: 7.49,
    badge: 'رائج',
    emoji: '🔫',
    bgClass: 'bg-cod',
    accentColor: '#8899AA',
    rating: 4.8,
    reviews: 1923,
    desc: 'شحن نقاط CP لكول أوف ديوتي موبايل. تسليم فوري وسعر منافس.',
    image: 'images/call.webp',   /* 🖼️ ضع هنا: 'images/cod.jpg' */
    variants: [
      { id: 'c1', name: '80 CP', price: 5.99, orig: 7.49 },
      { id: 'c2', name: '200 CP', price: 11.99, orig: 14.99 },
      { id: 'c3', name: '520 CP', price: 27.99, orig: 34.99 },
      { id: 'c4', name: '1500 CP', price: 74.99, orig: 89.99 },
    ]
  },

  {
    id: 3,
    slug: 'free-fire',
    nameAr: 'فري فاير',
    name: 'Free Fire جواهر',
    category: 'games',
    subcat: 'شحن ألعاب',
    price: 3.99,
    originalPrice: 5.49,
    badge: 'جديد',
    emoji: '💎',
    bgClass: 'bg-freefire',
    accentColor: '#FF6B35',
    rating: 4.7,
    reviews: 3241,
    desc: 'شحن جواهر فري فاير الرسمي بأقل الأسعار. منتج أصلي مضمون.',
    image: 'images/freefire.jpg',   /* 🖼️ ضع هنا: 'images/freefire.jpg' */
    variants: [
      { id: 'f1', name: '110 جوهرة', price: 3.99, orig: 5.49 },
      { id: 'f2', name: '220 جوهرة', price: 7.49, orig: 9.99 },
      { id: 'f3', name: '520 جوهرة', price: 16.99, orig: 21.99 },
      { id: 'f4', name: '1080 جوهرة', price: 32.99, orig: 41.99 },
    ]
  },

  {
    id: 4,
    slug: 'genshin-impact',
    nameAr: 'جنشن إمباكت',
    name: 'Genshin Impact',
    category: 'games',
    subcat: 'شحن ألعاب',
    price: 7.99,
    originalPrice: 10.49,
    badge: '',
    emoji: '🌸',
    bgClass: 'bg-genshin',
    accentColor: '#66B2FF',
    rating: 4.8,
    reviews: 1456,
    desc: 'شحن Genesis Crystals لجنشن إمباكت بأفضل الأسعار.',
    image: 'images/genshin.webp',   /* 🖼️ ضع هنا: 'images/genshin.jpg' */
    variants: [
      { id: 'g1', name: '60 Crystal', price: 7.99, orig: 10.49 },
      { id: 'g2', name: '330 Crystal', price: 37.99, orig: 47.99 },
      { id: 'g3', name: '980 Crystal', price: 99.99, orig: 119.99 },
    ]
  },

  {
    id: 5,
    slug: 'fortnite',
    nameAr: 'فورتنايت',
    name: 'Fortnite V-Bucks',
    category: 'games',
    subcat: 'شحن ألعاب',
    price: 8.49,
    originalPrice: 10.99,
    badge: '',
    emoji: '🌀',
    bgClass: 'bg-fortnite',
    accentColor: '#7EC8E3',
    rating: 4.6,
    reviews: 987,
    desc: 'شحن V-Bucks لفورتنايت. اشترِ مظاهر وعناصر اللعبة بأفضل سعر.',
    image: 'images/fortnite.webp',   /* 🖼️ ضع هنا: 'images/fortnite.jpg' */
    variants: [
      { id: 'fn1', name: '1000 V-Bucks', price: 8.49, orig: 10.99 },
      { id: 'fn2', name: '2800 V-Bucks', price: 21.99, orig: 27.99 },
      { id: 'fn3', name: '5000 V-Bucks', price: 36.99, orig: 44.99 },
    ]
  },

  {
    id: 6,
    slug: 'roblox',
    nameAr: 'روبلوكس',
    name: 'Roblox Robux',
    category: 'games',
    subcat: 'شحن ألعاب',
    price: 9.99,
    originalPrice: 12.99,
    badge: '',
    emoji: '🎪',
    bgClass: 'bg-roblox',
    accentColor: '#FF6B6B',
    rating: 4.7,
    reviews: 2103,
    desc: 'شراء Robux لعبة روبلوكس. اشترِ ملابس ومستلزمات شخصيتك.',
    image: 'images/roblox.jpg',   /* 🖼️ ضع هنا: 'images/roblox.jpg' */
    variants: [
      { id: 'r1', name: '400 Robux', price: 9.99, orig: 12.99 },
      { id: 'r2', name: '800 Robux', price: 18.99, orig: 23.99 },
      { id: 'r3', name: '1700 Robux', price: 36.99, orig: 44.99 },
    ]
  },

  {
    id: 7,
    slug: 'mobile-legends',
    nameAr: 'موبايل ليجندز',
    name: 'Mobile Legends',
    category: 'games',
    subcat: 'شحن ألعاب',
    price: 4.50,
    originalPrice: 5.99,
    badge: '',
    emoji: '⚔️',
    bgClass: 'bg-mlbb',
    accentColor: '#4488FF',
    rating: 4.6,
    reviews: 1677,
    desc: 'شحن الماس لموبايل ليجندز بانج بانج بأفضل الأسعار.',
    image: 'images/legendz.webp',   /* 🖼️ ضع هنا: 'images/mlbb.jpg' */
    variants: [
      { id: 'm1', name: '86 ألماس', price: 4.50, orig: 5.99 },
      { id: 'm2', name: '172 ألماس', price: 8.50, orig: 10.99 },
      { id: 'm3', name: '257 ألماس', price: 12.99, orig: 15.99 },
    ]
  },

  {
    id: 8,
    slug: 'clash-of-clans',
    nameAr: 'كلاش أوف كلانس',
    name: 'Clash of Clans',
    category: 'games',
    subcat: 'شحن ألعاب',
    price: 3.99,
    originalPrice: 5.49,
    badge: '',
    emoji: '🏰',
    bgClass: 'bg-coc',
    accentColor: '#FFD700',
    rating: 4.5,
    reviews: 892,
    desc: 'شراء جواهر كلاش أوف كلانس. ابنِ قريتك وطوّر قواتك.',
    image: 'images/clash.jpg',   /* 🖼️ ضع هنا: 'images/coc.jpg' */
    variants: [
      { id: 'cc1', name: '80 جوهرة', price: 3.99, orig: 5.49 },
      { id: 'cc2', name: '500 جوهرة', price: 19.99, orig: 24.99 },
      { id: 'cc3', name: '1200 جوهرة', price: 39.99, orig: 49.99 },
    ]
  },

  {
    id: 9,
    slug: 'honor-of-kings',
    nameAr: 'هونر أوف كينجز',
    name: 'Honor of Kings',
    category: 'games',
    subcat: 'شحن ألعاب',
    price: 5.99,
    originalPrice: 7.49,
    badge: '',
    emoji: '👑',
    bgClass: 'bg-honor',
    accentColor: '#C08CFF',
    rating: 4.7,
    reviews: 1124,
    desc: 'شحن توكن هونر أوف كينجز. اشترِ أبطال وأزياء حصرية.',
    image: 'images/honor.webp',   /* 🖼️ ضع هنا: 'images/honor.jpg' */
    variants: [
      { id: 'h1', name: '60 توكن', price: 5.99, orig: 7.49 },
      { id: 'h2', name: '240 توكن', price: 21.99, orig: 26.99 },
    ]
  },

  {
    id: 10,
    slug: 'zenless-zone-zero',
    nameAr: 'UNDAWN',
    name: 'UNDAWN',
    category: 'games',
    subcat: 'شحن ألعاب',
    price: 6.49,
    originalPrice: 8.49,
    badge: 'جديد',
    emoji: '🌀',
    bgClass: 'bg-zenless',
    accentColor: '#00E5FF',
    rating: 4.8,
    reviews: 621,
    desc: 'شحن UNDAWN UNDAWN. تجربة لعب فريدة من نوعها.',
    image: 'images/undawn.webp',   /* 🖼️ ضع هنا: 'images/zenless.jpg' */
    variants: [
      { id: 'z1', name: '60 Poly', price: 6.49, orig: 8.49 },
      { id: 'z2', name: '300 Poly', price: 29.99, orig: 36.99 },
    ]
  },

  {
    id: 11,
    slug: 'delta-force',
    nameAr: 'دلتا فورس',
    name: 'Delta Force',
    category: 'games',
    subcat: 'شحن ألعاب',
    price: 6.99,
    originalPrice: 8.99,
    badge: '',
    emoji: '🎯',
    bgClass: 'bg-delta',
    accentColor: '#E6E600',
    rating: 4.4,
    reviews: 342,
    desc: 'شحن عملات Delta Force Tactical. قاتل بأفضل الأسلحة.',
    image: 'images/delta.webp',   /* 🖼️ ضع هنا: 'images/delta.jpg' */
    variants: [
      { id: 'df1', name: '100 عملة', price: 6.99, orig: 8.99 },
      { id: 'df2', name: '300 عملة', price: 18.99, orig: 23.99 },
    ]
  },

  {
    id: 12,
    slug: 'whiteout-survival',
    nameAr: 'وايتاوت سيرفايفل',
    name: 'Whiteout Survival',
    category: 'games',
    subcat: 'شحن ألعاب',
    price: 5.49,
    originalPrice: 6.99,
    badge: '',
    emoji: '❄️',
    bgClass: 'bg-whiteout',
    accentColor: '#7EC8E3',
    rating: 4.5,
    reviews: 743,
    desc: 'شحن الماس لوايتاوت سيرفايفل. انجُ من الصقيع وابنِ قاعدتك.',
    image: 'images/withoutservivul.webp',   /* 🖼️ ضع هنا: 'images/whiteout.jpg' */
    variants: [
      { id: 'w1', name: '300 ألماس', price: 5.49, orig: 6.99 },
      { id: 'w2', name: '980 ألماس', price: 16.49, orig: 19.99 },
    ]
  },

  /* ──────────────────────────────────────────────
     📺 قسم: الاشتراكات
     ────────────────────────────────────────────── */
  {
    id: 13,
    slug: 'ps-plus',
    nameAr: 'بلايستيشن بلس',
    name: 'PS Plus Essential',
    category: 'subscriptions',
    subcat: 'اشتراكات',
    price: 23.99,
    originalPrice: 35,
    badge: 'الأكثر مبيعاً',
    emoji: '🎮',
    bgClass: 'bg-ps',
    accentColor: '#4a9eff',
    rating: 4.9,
    reviews: 4211,
    desc: 'اشتراك PS Plus إيسنشال — العب أونلاين + ألعاب شهرية مجانية لـ PS5 و PS4.',
    image: 'images/plays.jpg',   /* 🖼️ ضع هنا: 'images/ps-plus.jpg' */
    variants: [
      { id: 'ps1', name: 'شهر واحد', price: 23.99, orig: 35 },
      { id: 'ps2', name: '3 أشهر', price: 54.99, orig: 90 },
    ]
  },

  {
    id: 14,
    slug: 'amazon-prime',
    nameAr: 'أمازون برايم',
    name: 'Amazon Prime',
    category: 'subscriptions',
    subcat: 'اشتراكات',
    price: 7.99,
    originalPrice: 16,
    badge: 'عرض',
    emoji: '📦',
    bgClass: 'bg-amazon',
    accentColor: '#FF9900',
    rating: 4.7,
    reviews: 2103,
    desc: 'اشتراك أمازون برايم — شحن مجاني + Prime Video + Prime Music.',
    image: 'images/amazon-prime.webp',   /* 🖼️ ضع هنا: 'images/amazon-prime.jpg' */
    variants: [
      { id: 'ap1', name: 'شهر واحد', price: 7.99, orig: 16 },
    ]
  },

  {
    id: 15,
    slug: 'spotify',
    nameAr: 'سبوتيفاي بريميوم',
    name: 'Spotify Premium',
    category: 'subscriptions',
    subcat: 'اشتراكات',
    price: 11.50,
    originalPrice: 20,
    badge: 'رائج',
    emoji: '🎵',
    bgClass: 'bg-spotify',
    accentColor: '#1DB954',
    rating: 4.8,
    reviews: 1876,
    desc: 'اشتراك سبوتيفاي بريميوم — موسيقى بلا حدود وبدون إعلانات.',
    image: 'images/spotify.png',   /* 🖼️ ضع هنا: 'images/spotify.jpg' */
    variants: [
      { id: 'sp1', name: 'شهر — حساب ناجي', price: 11.50, orig: 20 },
      { id: 'sp2', name: '3 أشهر', price: 29.99, orig: 55 },
    ]
  },

  {
    id: 16,
    slug: 'watch-it',
    nameAr: 'ووتش إت',
    name: 'Watch IT Premium',
    category: 'subscriptions',
    subcat: 'اشتراكات',
    price: 20,
    originalPrice: 37.50,
    badge: 'جديد',
    emoji: '📺',
    bgClass: 'bg-watchit',
    accentColor: '#E50914',
    rating: 4.6,
    reviews: 934,
    desc: 'اشتراك ووتش إت بريميوم — بدون إعلانات + محتوى عربي حصري.',
    image: 'images/watchit.jpg',   /* 🖼️ ضع هنا: 'images/watchit.jpg' */
    variants: [
      { id: 'wi1', name: 'شهر واحد', price: 20, orig: 37.50 },
      { id: 'wi2', name: '3 أشهر', price: 55, orig: 100 },
    ]
  },

  /* ──────────────────────────────────────────────
     💬 قسم: شبكات التواصل
     ────────────────────────────────────────────── */
  {
    id: 17,
    slug: 'telegram-stars',
    nameAr: 'نجوم تليجرام',
    name: 'Telegram Stars',
    category: 'social',
    subcat: 'شبكات التواصل',
    price: 5.99,
    originalPrice: 7.99,
    badge: 'جديد',
    emoji: '⭐',
    bgClass: 'bg-telegram',
    accentColor: '#2678DC',
    rating: 4.8,
    reviews: 1123,
    desc: 'شراء نجوم تليجرام لدعم المبدعين وتفعيل خدمات تليجرام بريميوم.',
    image: 'images/telestars.jpeg',   /* 🖼️ ضع هنا: 'images/telegram.jpg' */
    variants: [
      { id: 'tg1', name: '25 نجمة', price: 5.99, orig: 7.99 },
      { id: 'tg2', name: '50 نجمة', price: 10.99, orig: 13.99 },
      { id: 'tg3', name: '100 نجمة', price: 19.99, orig: 24.99 },
    ]
  },

  {
    id: 18,
    slug: 'tiktok-coins',
    nameAr: 'تيك توك كوينز',
    name: 'TikTok Coins',
    category: 'social',
    subcat: 'شبكات التواصل',
    price: 6.99,
    originalPrice: 9.49,
    badge: 'رائج',
    emoji: '🎵',
    bgClass: 'bg-tiktok',
    accentColor: '#EE1D52',
    rating: 4.7,
    reviews: 887,
    desc: 'شحن عملات تيك توك لإرسال الهدايا للمبدعين المفضلين لديك.',
    image: 'images/tiktokk.jpg',   /* 🖼️ ضع هنا: 'images/tiktok.jpg' */
    variants: [
      { id: 'tk1', name: '100 عملة', price: 6.99, orig: 9.49 },
      { id: 'tk2', name: '500 عملة', price: 31.99, orig: 42.99 },
    ]
  },

  {
    id: 19,
    slug: 'bigo-live',
    nameAr: 'بيغو لايف',
    name: 'Bigo Live Diamonds',
    category: 'social',
    subcat: 'شبكات التواصل',
    price: 7.99,
    originalPrice: 10.49,
    badge: '',
    emoji: '💎',
    bgClass: 'bg-bigo',
    accentColor: '#00CC64',
    rating: 4.6,
    reviews: 1344,
    desc: 'شحن الماس بيغو لايف وأرسل الهدايا لمذيعيك المفضلين.',
    image: 'images/bigolive.png',   /* 🖼️ ضع هنا: 'images/bigo.jpg' */
    variants: [
      { id: 'bl1', name: '70 ألماس', price: 7.99, orig: 10.49 },
      { id: 'bl2', name: '350 ألماس', price: 35.99, orig: 44.99 },
    ]
  },

  /* ──────────────────────────────────────────────
     💻 قسم: مكتبيات وأعمال
     ────────────────────────────────────────────── */
  {
    id: 20,
    slug: 'office-2021',
    nameAr: 'مايكروسوفت أوفيس 2021',
    name: 'Office 2021 Pro',
    category: 'software',
    subcat: 'مكتبيات وأعمال',
    price: 26.74,
    originalPrice: 149.99,
    badge: '🔥 خصم كبير',
    emoji: '💻',
    bgClass: 'bg-office',
    accentColor: '#D04100',
    rating: 4.9,
    reviews: 3122,
    desc: 'مايكروسوفت أوفيس 2021 برو بلس — ترخيص مدى الحياة لجهاز واحد.',
    image: 'images/office2021.png',   /* 🖼️ ضع هنا: 'images/office.jpg' */
    variants: [
      { id: 'o1', name: 'جهاز واحد', price: 26.74, orig: 149.99 },
      { id: 'o2', name: '3 أجهزة', price: 64.99, orig: 299.99 },
    ]
  },

  {
    id: 21,
    slug: 'windows-11',
    nameAr: 'ويندوز 11 برو',
    name: 'Windows 11 Pro',
    category: 'software',
    subcat: 'مكتبيات وأعمال',
    price: 11.50,
    originalPrice: 57.50,
    badge: '',
    emoji: '🪟',
    bgClass: 'bg-windows',
    accentColor: '#0078D4',
    rating: 4.8,
    reviews: 2441,
    desc: 'مفتاح ويندوز 11 برو أصلي ودائم. تفعيل فوري ومضمون.',
    image: 'images/11pro.webp',   /* 🖼️ ضع هنا: 'images/windows.jpg' */
    variants: [
      { id: 'w11', name: 'جهاز واحد', price: 11.50, orig: 57.50 },
    ]
  },

  /* ──────────────────────────────────────────────
     📡 قسم: الاتصالات والإنترنت
     ────────────────────────────────────────────── */
  {
    id: 22,
    slug: 'zain-recharge',
    nameAr: 'بطاقات شحن زين',
    name: 'Zain Recharge',
    category: 'telecom',
    subcat: 'شحن اتصالات',
    price: 20.00,
    originalPrice: 20.00,
    badge: 'رائج',
    emoji: '🟢',
    bgClass: 'bg-zain',
    accentColor: '#005ac8',
    rating: 4.8,
    reviews: 1245,
    desc: 'شحن رصيد شبكة زين للاتصالات بأفضل الأسعار وبشكل فوري.',
    image: 'icons/zain.png',
    variants: [
      { id: 'z1', name: 'رصيد 20 ريال', price: 20.00, orig: 20.00 },
      { id: 'z2', name: 'رصيد 50 ريال', price: 50.00, orig: 50.00 },
      { id: 'z3', name: 'رصيد 100 ريال', price: 100.00, orig: 100.00 },
    ]
  },
  {
    id: 23,
    slug: 'mobily-recharge',
    nameAr: 'بطاقات شحن موبايلي',
    name: 'Mobily Recharge',
    category: 'telecom',
    subcat: 'شحن اتصالات',
    price: 20.00,
    originalPrice: 20.00,
    badge: '',
    emoji: '🔵',
    bgClass: 'bg-mobily',
    accentColor: '#008c46',
    rating: 4.7,
    reviews: 984,
    desc: 'احصل على رصيد موبايلي فورياً وابقَ على اتصال.',
    image: 'icons/mobilyd.png',
    variants: [
      { id: 'mb1', name: 'رصيد 20 ريال', price: 20.00, orig: 20.00 },
      { id: 'mb2', name: 'رصيد 50 ريال', price: 50.00, orig: 50.00 },
      { id: 'mb3', name: 'رصيد 100 ريال', price: 100.00, orig: 100.00 },
    ]
  },
  {
    id: 24,
    slug: 'stc-sawa',
    nameAr: 'بطاقات شحن سوا - stc',
    name: 'STC Sawa Recharge',
    category: 'telecom',
    subcat: 'شحن اتصالات',
    price: 23.00,
    originalPrice: 23.00,
    badge: 'الأكثر مبيعاً',
    emoji: '🟣',
    bgClass: 'bg-stc',
    accentColor: '#9632b4',
    rating: 4.9,
    reviews: 3102,
    desc: 'شحن رصيد سوا من stc بسرعة وأمان تام.',
    image: 'icons/stc.png',
    variants: [
      { id: 's1', name: 'سوا 20', price: 23.00, orig: 23.00 },
      { id: 's2', name: 'سوا 50', price: 57.50, orig: 57.50 },
      { id: 's3', name: 'سوا 100', price: 115.00, orig: 115.00 },
    ]
  },
  {
    id: 25,
    slug: 'aywa-recharge',
    nameAr: 'شحن أيوا',
    name: 'AYWA Recharge',
    category: 'telecom',
    subcat: 'بطاقات الإنترنت',
    price: 15.00,
    originalPrice: 15.00,
    badge: '',
    emoji: '🌐',
    bgClass: 'bg-aywa',
    accentColor: '#00b4d8',
    rating: 4.5,
    reviews: 423,
    desc: 'بطاقات شحن وانترنت لشبكة أيوا.',
    image: 'icons/aywa.jpg',
    variants: [
      { id: 'ay1', name: 'رصيد 15 ريال', price: 15.00, orig: 15.00 },
      { id: 'ay2', name: 'رصيد 50 ريال', price: 50.00, orig: 50.00 },
    ]
  },
  {
    id: 26,
    slug: 'friendi-recharge',
    nameAr: 'شحن فريندلي',
    name: 'Friendi Mobile',
    category: 'telecom',
    subcat: 'شحن اتصالات',
    price: 20.00,
    originalPrice: 20.00,
    badge: '',
    emoji: '📱',
    bgClass: 'bg-friendi',
    accentColor: '#ff6b35',
    rating: 4.6,
    reviews: 512,
    desc: 'شحن رصيد وباقات انترنت لفريندلي موبايل.',
    image: 'icons/بقهثىيغd.png',
    variants: [
      { id: 'fr1', name: 'رصيد 20 ريال', price: 20.00, orig: 20.00 },
      { id: 'fr2', name: 'رصيد 50 ريال', price: 50.00, orig: 50.00 },
    ]
  },
  {
    id: 27,
    slug: 'redbull-mobile',
    nameAr: 'ريد بول موبايل',
    name: 'Red Bull Mobile',
    category: 'telecom',
    subcat: 'شحن اتصالات',
    price: 20.00,
    originalPrice: 20.00,
    badge: 'جديد',
    emoji: '🐂',
    bgClass: 'bg-redbull',
    accentColor: '#e63946',
    rating: 4.7,
    reviews: 215,
    desc: 'شحن باقات ورصيد ريد بول موبايل.',
    image: 'icons/redbull.webp',
    variants: [
      { id: 'rb1', name: 'رصيد 20 ريال', price: 20.00, orig: 20.00 },
      { id: 'rb2', name: 'رصيد 50 ريال', price: 50.00, orig: 50.00 },
    ]
  }

];

/* ================================================================
   TELECOM DATA — بيانات الاتصالات
   ================================================================ */
const TELECOM = [
  { name: 'زين', brand: 'ZAIN', color: '#005ac8', image: 'icons/zain.png' /* 🖼️ 'images/zain.png'    */ },
  { name: 'موبايلي', brand: 'Mobily', color: '#008c46', image: 'icons/mobilyd.png' /* 🖼️ 'images/mobily.png'  */ },
  { name: 'STC', brand: 'stc', color: '#9632b4', image: 'icons/stc.png' /* 🖼️ 'images/stc.png'     */ },
  { name: 'أيوا', brand: 'AYWA', color: '#00b4d8', image: 'icons/aywa.jpg' /* 🖼️ 'images/aywa.png'    */ },
  { name: 'فريندلي', brand: 'Friendi', color: '#ff6b35', image: 'icons/بقهثىيغd.png' /* 🖼️ 'images/friendi.png' */ },
  { name: 'ريد بول', brand: 'Red Bull', color: '#e63946', image: 'icons/redbull.webp' /* 🖼️ 'images/redbull.png' */ },
];

/* ================================================================
   PLATFORMS DATA — بيانات المنصات
   ================================================================ */
const PLATFORMS = [
  { id: 'xbox', name: 'Xbox', color: '#52b043', cat: 'games', img: 'images/xbox.png' },
  { id: 'ps', name: 'PlayStation', color: '#4a9eff', cat: 'subscriptions', img: 'images/playstation.webp' },
  { id: 'steam', name: 'Steam', color: '#66c0f4', cat: 'games', img: 'images/steam.webp' },
  { id: 'epic', name: 'Epic Games', color: '#aaaaaa', cat: 'games', img: 'images/epic.webp' },
  { id: 'itunes', name: 'iTunes', color: '#fc3c44', cat: 'subscriptions', img: 'images/itunez.webp' },
  { id: 'google', name: 'Google Play', color: '#4285f4', cat: 'social', img: 'images/googleplay.webp' },
];

/* ================================================================
   REVIEWS DATA — بيانات التقييمات
   ================================================================ */
const REVIEWS = [
  {
    name: 'فلاح الحارثي',
    handle: '@flah_alharthi',
    text: 'أسرع موقع شحن جربته! البطاقة وصلت فوراً بعد الدفع. سأعود للشراء دائماً.',
    letter: 'ف',
    gradient: 'linear-gradient(135deg,#1a6dff,#7c3aed)',
    image: ''  /* 🖼️ ضع صورة المراجع: 'images/reviewer1.jpg' */
  },
  {
    name: 'محمد الشريف',
    handle: '@FARES_ALSHEREF',
    text: 'أفضل أسعار في المنطقة. دعم العملاء ممتاز وسريع الرد جداً.',
    letter: 'م',
    gradient: 'linear-gradient(135deg,#f5c518,#e6b800)',
    letterColor: '#0a0e1a',
    image: ''  /* 🖼️ ضع صورة المراجع: 'images/reviewer2.jpg' */
  },
  {
    name: 'سارة العمري',
    handle: '@sara_alomri',
    text: 'وفرت أكثر من 30% على اشتراكاتي الشهرية. الموقع سهل الاستخدام والدفع آمن.',
    letter: 'س',
    gradient: 'linear-gradient(135deg,#00c864,#009648)',
    image: ''  /* 🖼️ ضع صورة المراجع: 'images/reviewer3.jpg' */
  },
  {
    name: 'عبدالرحمن نور',
    handle: '@abdo_nour99',
    text: 'أول مرة أشتري من هنا وكانت التجربة رائعة. أرخص وأسرع من المحلات.',
    letter: 'ع',
    gradient: 'linear-gradient(135deg,#ff6b35,#c44a1a)',
    image: ''  /* 🖼️ ضع صورة المراجع: 'images/reviewer4.jpg' */
  },
];
