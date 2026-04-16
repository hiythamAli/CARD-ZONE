# 📋 التعديلات المطلوبة على الملفات الموجودة
# اتبع الخطوات بالترتيب

═══════════════════════════════════════════════════════
## 1️⃣  index.html — 4 تعديلات
═══════════════════════════════════════════════════════

### تعديل A — أضف ملف additions.css في الـ <head>
ابحث عن هذا السطر:
  <link rel="stylesheet" href="css/style.css" />

أضف تحته مباشرة:
  <link rel="stylesheet" href="css/additions.css" />

───────────────────────────────────────────────────────

### تعديل B — استبدل أزرار الـ Navbar
ابحث عن:
  <button class="btn btn-outline" onclick="showToast('سيتم إضافة تسجيل الدخول قريباً','info')">تسجيل الدخول</button>
  <button class="btn btn-gold" onclick="showToast('سيتم إضافة إنشاء الحساب قريباً','info')">إنشاء حساب ⭐</button>

استبدلها بـ:
  <button class="btn btn-outline" id="loginBtn" onclick="openAuthModal('login')">تسجيل الدخول</button>
  <button class="btn btn-gold"    id="registerBtn" onclick="openAuthModal('register')">إنشاء حساب ⭐</button>
  <div class="user-menu" id="userMenu">
    <div class="user-avatar" id="userAvatar">👤</div>
    <span class="user-name-display" id="userNameDisplay"></span>
    <div class="user-dropdown">
      <button class="ud-item" onclick="navigateToPage('orders')">📦 طلباتي</button>
      <button class="ud-item" onclick="navigateToPage('loyalty')">🎁 نقاطي</button>
      <div class="ud-sep"></div>
      <button class="ud-item logout" onclick="logout()">🚪 تسجيل الخروج</button>
    </div>
  </div>

───────────────────────────────────────────────────────

### تعديل C — أضف EmailJS قبل ملفات الـ JS
ابحث عن:
  <script src="js/data.js"></script>

أضف قبله مباشرة:
  <!-- EmailJS - لإرسال الإيميلات -->
  <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>

───────────────────────────────────────────────────────

### تعديل D — أضف الملفات الجديدة آخر الصفحة
ابحث عن:
  <script src="js/data.js"></script>
  <script src="js/app.js"></script>

استبدلها بـ:
  <script src="js/data.js"></script>
  <script src="js/auth.js"></script>
  <script src="js/checkout.js"></script>
  <script src="js/pages.js"></script>
  <script src="js/app.js"></script>


═══════════════════════════════════════════════════════
## 2️⃣  js/app.js — 3 تعديلات
═══════════════════════════════════════════════════════

### تعديل A — ربط زر "أضف للسلة" بفورم الطلب
ابحث في دالة renderProductPage عن هذا السطر:
  <button class="prod-add-btn" id="prodAddBtn" onclick="handleProdAdd('${p.slug}')">

استبدله بـ:
  <button class="prod-add-btn" id="prodAddBtn" onclick="openCheckout(${p.id},'${selectedVariant.id}')">

───────────────────────────────────────────────────────

### تعديل B — ربط زر الكارد الصغير بفورم الطلب
ابحث في renderCatCards عن:
  <button class="cat-add" onclick="event.stopPropagation();addToCart(${p.id},'${p.variants[0].id}')">+</button>

استبدله بـ:
  <button class="cat-add" onclick="event.stopPropagation();openCheckout(${p.id},'${p.variants[0].id}')">+</button>

───────────────────────────────────────────────────────

### تعديل C — ربط روابط الفوتر بالصفحات
ابحث في دالة renderFooter() عن هذا الجزء:
  { title:'روابط مهمة', links:['من نحن','الشروط والأحكام','نقاط الولاء','سياسة الاسترداد','الاقتراحات'] },

استبدل كامل مصفوفة cols في renderFooter بـ:

  const cols = [
    { title:'روابط مهمة', items:[
      { label:'من نحن',              page:'about'   },
      { label:'الشروط والأحكام',     page:'terms'   },
      { label:'سياسة الخصوصية',     page:'privacy' },
      { label:'سياسة الاسترداد',    page:'refund'  },
      { label:'الأسئلة الشائعة',    page:'faq'     },
    ]},
    { title:'الألعاب', items:[
      { label:'شحن PUBG Mobile',     page:null, slug:'pubg-mobile'  },
      { label:'شحن Free Fire',       page:null, slug:'free-fire'    },
      { label:'شحن COD Mobile',      page:null, slug:'cod-mobile'   },
      { label:'شحن Genshin Impact',  page:null, slug:'genshin-impact'},
      { label:'شحن Fortnite',        page:null, slug:'fortnite'     },
    ]},
    { title:'الاشتراكات', items:[
      { label:'PS Plus',             page:null, slug:'ps-plus'      },
      { label:'Amazon Prime',        page:null, slug:'amazon-prime' },
      { label:'Spotify Premium',     page:null, slug:'spotify'      },
      { label:'Watch IT',            page:null, slug:'watch-it'     },
    ]},
    { title:'تواصل معنا', items:[
      { label:'📱 +968xxxxxxxx',     page:'contact' },
      { label:'📧 info@take-card.com', page:'contact'},
      { label:'✈️ @Take_card0',      page:'contact' },
      { label:'💬 واتساب',           page:'contact' },
    ]},
  ];

وبعد التعريف أضف مباشرة:
  return `
    <footer>
      <div class="container footer-in">
        <div class="footer-brand">
          <div class="logo" style="margin-bottom:12px">
            <div class="logo-ico">T</div>
            <span class="logo-txt">تيك <span>كارد</span></span>
          </div>
          <p>متجر تيك كارد لبيع البطاقات الإلكترونية بجميع أنواعها، بأسعار مناسبة وخدمة عملاء 24 ساعة.</p>
          <div class="footer-social">
            ${['💬','✈️','🐦','📸','▶️','👻'].map(e => `<a href="#" class="soc-btn">${e}</a>`).join('')}
          </div>
        </div>
        ${cols.map(col => `
          <div class="footer-col">
            <h4>${col.title}</h4>
            <ul>
              ${col.items.map(item => `
                <li>
                  <a href="#" onclick="event.preventDefault();${
                    item.page
                      ? `navigateToPage('${item.page}')`
                      : `navigateTo('product','${item.slug}')`
                  }">
                    ${item.label}
                  </a>
                </li>
              `).join('')}
            </ul>
          </div>
        `).join('')}
      </div>
      <div class="footer-bot">
        <div class="footer-copy">© تيك كارد 2025 | جميع الحقوق محفوظة — <a href="#" onclick="navigateToPage('privacy')">سياسة الخصوصية</a></div>
        <div class="trust-badges">
          <div class="trust-b"><span class="ok">✓</span> SSL محمي</div>
          <div class="trust-b"><span class="ok">✓</span> مرخص رسمياً</div>
          <div class="trust-b"><span class="ok">✓</span> دفع آمن 100%</div>
        </div>
      </div>
    </footer>`;


═══════════════════════════════════════════════════════
## 3️⃣  إعداد EmailJS (لإرسال الإيميلات)
═══════════════════════════════════════════════════════

1. روح على: https://www.emailjs.com
2. أنشئ حساب مجاني
3. Email Services > Add Service > اختر Gmail أو Outlook
4. Email Templates > Create Template
   اكتب في جسم الإيميل:
   ─────────────────────
   طلب جديد #{{order_id}}
   العميل: {{customer_name}}
   الإيميل: {{customer_email}}
   المنتج: {{product_name}} - {{variant_name}}
   السعر: {{price}}
   الدفع: {{payment_method}}
   بيانات اللعبة: {{game_fields}}
   ملاحظات: {{notes}}
   التاريخ: {{order_date}}
   ─────────────────────
5. افتح js/checkout.js وعدّل هذه الأسطر الثلاثة:
   const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';   ← من Account > Public Key
   const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';   ← من Email Services
   const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';  ← من Email Templates
   const STORE_OWNER_EMAIL   = 'your@email.com';    ← إيميلك أنت


═══════════════════════════════════════════════════════
## 4️⃣  هيكل المجلد النهائي
═══════════════════════════════════════════════════════

takecard/
├── index.html          ← عُدِّل (تعديلات A,B,C,D)
├── css/
│   ├── style.css       ← بدون تغيير
│   └── additions.css   ← جديد ✨
├── js/
│   ├── data.js         ← بدون تغيير
│   ├── auth.js         ← جديد ✨
│   ├── checkout.js     ← جديد ✨
│   ├── pages.js        ← جديد ✨
│   └── app.js          ← عُدِّل (تعديلات A,B,C)
└── images/
    └── (صورك هنا)
