/* ================================================================
   checkout.js — فورم الطلب + إرسال إيميل
   ================================================================

   📧 خطوات تفعيل إرسال الإيميل (مجاني):
   ─────────────────────────────────────────
   1. روح على https://www.emailjs.com وسجّل حساب مجاني
   2. أضف خدمة إيميل (Gmail أو Outlook) — Service
   3. أنشئ Template واحدة — Template
   4. في الـ Template اكتب المتغيرات هذي:
      {{customer_name}}  — اسم العميل
      {{customer_email}} — إيميل العميل
      {{product_name}}   — اسم المنتج
      {{variant_name}}   — الباقة
      {{price}}          — السعر
      {{game_fields}}    — بيانات اللعبة (ID وغيره)
      {{order_id}}       — رقم الطلب
   5. انسخ:
      - Public Key  ← حطه في EMAILJS_PUBLIC_KEY
      - Service ID  ← حطه في EMAILJS_SERVICE_ID
      - Template ID ← حطه في EMAILJS_TEMPLATE_ID
   ================================================================ */

/* ══════════════════════════════════════════════
   ⚙️ إعدادات EmailJS — غيّرها بمعلوماتك
   ══════════════════════════════════════════════ */
const EMAILJS_PUBLIC_KEY   = 'lftASZYxp_IQ2af1b';    /* من emailjs.com > Account */
const EMAILJS_SERVICE_ID   = 'service_h59rsjp';    /* من emailjs.com > Email Services */
const EMAILJS_TEMPLATE_ID  = 'template_sj1z74o';  /* من emailjs.com > Email Templates */
const STORE_OWNER_EMAIL    = 'hiythamali69@gmail.com';     /* إيميلك أنت صاحب المتجر */

/* ══════════════════════════════════════════════
   🎮 حقول كل لعبة/منتج
   أضف أو عدّل حسب منتجاتك
   ══════════════════════════════════════════════ */
const GAME_FIELDS = {

  /* ── ألعاب تحتاج ID اللاعب ── */
  'pubg-mobile': [
    { id: 'player_id',  label: 'Player ID — معرف اللاعب', type: 'text',   placeholder: '123456789',    required: true  },
    { id: 'server',     label: 'السيرفر',                  type: 'select', options: ['ASIA','EUROPE','NORTH AMERICA','SOUTH AMERICA'], required: true },
  ],
  'cod-mobile': [
    { id: 'player_id',  label: 'Player ID — معرف اللاعب', type: 'text',   placeholder: '123456789',    required: true  },
    { id: 'nickname',   label: 'اسم اللاعب (Nickname)',    type: 'text',   placeholder: 'PlayerName',   required: false },
  ],
  'free-fire': [
    { id: 'player_id',  label: 'Player ID — معرف اللاعب', type: 'text',   placeholder: '123456789',    required: true  },
    { id: 'nickname',   label: 'اسم اللاعب (Nickname)',    type: 'text',   placeholder: 'PlayerName',   required: true  },
  ],
  'genshin-impact': [
    { id: 'uid',        label: 'UID',                       type: 'text',   placeholder: '123456789',    required: true  },
    { id: 'server',     label: 'السيرفر',                  type: 'select', options: ['Asia','Europe','America','TW/HK/MO'], required: true },
  ],
  'fortnite': [
    { id: 'epic_id',    label: 'Epic Games ID / Username',  type: 'text',   placeholder: 'EpicUsername', required: true  },
  ],
  'roblox': [
    { id: 'username',   label: 'Roblox Username',           type: 'text',   placeholder: 'RobloxUser',   required: true  },
    { id: 'player_id',  label: 'Roblox User ID',            type: 'text',   placeholder: '123456789',    required: false },
  ],
  'mobile-legends': [
    { id: 'player_id',  label: 'Player ID',                 type: 'text',   placeholder: '123456789',    required: true  },
    { id: 'zone_id',    label: 'Zone ID',                   type: 'text',   placeholder: '1234',         required: true  },
  ],
  'clash-of-clans': [
    { id: 'player_tag', label: 'Player Tag',                type: 'text',   placeholder: '#XXXXXXXX',    required: true  },
  ],
  'honor-of-kings': [
    { id: 'player_id',  label: 'Player ID',                 type: 'text',   placeholder: '123456789',    required: true  },
    { id: 'server',     label: 'السيرفر',                  type: 'select', options: ['SEA','Global'],    required: true  },
  ],
  'zenless-zone-zero': [
    { id: 'uid',        label: 'UID',                       type: 'text',   placeholder: '123456789',    required: true  },
    { id: 'server',     label: 'السيرفر',                  type: 'select', options: ['Asia','Europe','America','TW/HK/MO'], required: true },
  ],
  'delta-force': [
    { id: 'player_id',  label: 'Player ID',                 type: 'text',   placeholder: '123456789',    required: true  },
  ],
  'whiteout-survival': [
    { id: 'player_id',  label: 'Player ID',                 type: 'text',   placeholder: '123456789',    required: true  },
  ],

  /* ── ألعاب تواصل اجتماعي ── */
  'telegram-stars': [
    { id: 'telegram_username', label: 'يوزر تليجرام',      type: 'text',   placeholder: '@username',    required: true  },
  ],
  'tiktok-coins': [
    { id: 'tiktok_id',  label: 'TikTok ID',                 type: 'text',   placeholder: 'TikTokUser',   required: true  },
  ],
  'bigo-live': [
    { id: 'bigo_id',    label: 'Bigo ID',                   type: 'text',   placeholder: '123456789',    required: true  },
  ],

  /* ── الاشتراكات (تحتاج فقط إيميل) ── */
  'ps-plus': [
    { id: 'psn_email',  label: 'إيميل حساب PlayStation',   type: 'email',  placeholder: 'ps@email.com', required: true  },
  ],
  'amazon-prime': [
    { id: 'amz_email',  label: 'إيميل حساب Amazon',        type: 'email',  placeholder: 'amazon@email.com', required: true },
  ],
  'spotify': [
    { id: 'sp_email',   label: 'إيميل حساب Spotify',       type: 'email',  placeholder: 'spotify@email.com', required: true },
  ],
  'watch-it': [
    { id: 'wi_email',   label: 'إيميل حساب Watch IT',      type: 'email',  placeholder: 'watchit@email.com', required: true },
  ],

  /* ── برامج ── */
  'office-2021': [
    { id: 'ms_email',   label: 'إيميل Microsoft الخاص بك', type: 'email',  placeholder: 'ms@email.com', required: true  },
  ],
  'windows-11': [
    { id: 'ms_email',   label: 'إيميل Microsoft الخاص بك', type: 'email',  placeholder: 'ms@email.com', required: true  },
  ],
};

/* المنتجات التي لا تحتاج بيانات إضافية */
const NO_FIELDS_NEEDED = [];

/* ══════════════════════════════════════════════
   CHECKOUT MODAL — فتح / إغلاق
   ══════════════════════════════════════════════ */
let checkoutProduct  = null;
let checkoutVariant  = null;

function openCheckout(productId, variantId) {
  /* تأكد المستخدم مسجّل دخول */
  if (!isLoggedIn()) {
    showToast('يجب تسجيل الدخول أولاً للشراء', 'err');
    openAuthModal('login');
    return;
  }

  const product = PRODUCTS.find(p => p.id === productId);
  const variant  = product.variants.find(v => v.id === variantId);
  if (!product || !variant) return;

  checkoutProduct = product;
  checkoutVariant = variant;

  renderCheckoutModal(product, variant);
  document.getElementById('checkoutModal').classList.add('open');
  document.getElementById('checkoutOverlay').classList.add('open');
}

function closeCheckout() {
  document.getElementById('checkoutModal').classList.remove('open');
  document.getElementById('checkoutOverlay').classList.remove('open');
  checkoutProduct = null;
  checkoutVariant = null;
}

/* ══════════════════════════════════════════════
   RENDER CHECKOUT FORM
   ══════════════════════════════════════════════ */
function renderCheckoutModal(product, variant) {
  const fields   = GAME_FIELDS[product.slug] || [];
  const discount = Math.round((1 - variant.price / variant.orig) * 100);

  const fieldsHTML = fields.map(f => {
    if (f.type === 'select') {
      return `
        <div class="co-field">
          <label class="auth-label">${f.label} ${f.required ? '<span style="color:#ff4444">*</span>' : ''}</label>
          <select class="auth-input" id="co_${f.id}">
            ${f.options.map(o => `<option value="${o}">${o}</option>`).join('')}
          </select>
        </div>`;
    }
    return `
      <div class="co-field">
        <label class="auth-label">${f.label} ${f.required ? '<span style="color:#ff4444">*</span>' : ''}</label>
        <input class="auth-input" id="co_${f.id}" type="${f.type}" placeholder="${f.placeholder}" />
      </div>`;
  }).join('');

  document.getElementById('checkoutBody').innerHTML = `

    <!-- ملخص المنتج -->
    <div class="co-product-summary">
      <div class="co-product-img ${product.bgClass}">${product.emoji}</div>
      <div class="co-product-info">
        <div class="co-product-name">${product.nameAr}</div>
        <div class="co-product-variant">${variant.name}</div>
        <div class="co-product-price">
          ${variant.price} ريال
          ${discount > 0 ? `<span class="co-discount">خصم ${discount}%</span>` : ''}
        </div>
      </div>
    </div>

    <!-- بيانات العميل - تتعبأ تلقائياً من الحساب -->
    <div class="co-section-title">📋 بيانات الطلب</div>

    <div class="co-field">
      <label class="auth-label">الاسم الكامل</label>
      <input class="auth-input" id="co_name" type="text" value="${currentUser?.name || ''}" readonly
             style="background:rgba(255,255,255,.04);cursor:default" />
    </div>
    <div class="co-field">
      <label class="auth-label">البريد الإلكتروني</label>
      <input class="auth-input" id="co_email" type="email" value="${currentUser?.email || ''}" readonly
             style="background:rgba(255,255,255,.04);cursor:default" />
    </div>

    ${fields.length > 0 ? `
      <div class="co-section-title" style="margin-top:18px">🎮 بيانات ${product.nameAr}</div>
      ${fieldsHTML}
    ` : ''}

    <!-- وسيلة الدفع -->
    <div class="co-section-title" style="margin-top:18px">💳 وسيلة الدفع</div>
    <div class="payment-methods-grid">
      <label class="pm-option">
        <input type="radio" name="payment" value="visa" checked>
        <span>💳 Visa / Mastercard</span>
      </label>
      <label class="pm-option">
        <input type="radio" name="payment" value="applepay">
        <span>🍎 Apple Pay</span>
      </label>
      <label class="pm-option">
        <input type="radio" name="payment" value="mada">
        <span>🟡 مدى</span>
      </label>
      <label class="pm-option">
        <input type="radio" name="payment" value="stcpay">
        <span>📱 STC Pay</span>
      </label>
    </div>

    <!-- خانة ملاحظات -->
    <div class="co-field" style="margin-top:14px">
      <label class="auth-label">ملاحظات إضافية (اختياري)</label>
      <textarea class="auth-input" id="co_notes" rows="2" placeholder="أي تعليمات خاصة..."
                style="resize:vertical;min-height:60px"></textarea>
    </div>

    <!-- خطأ -->
    <div class="auth-error" id="coError" style="margin-top:10px"></div>

    <!-- زر الطلب -->
    <button class="auth-submit" id="coSubmitBtn" onclick="submitOrder()" style="margin-top:16px">
      🛒 تأكيد الطلب — ${variant.price} ريال
    </button>
    <p style="font-size:11px;color:var(--text-sec);text-align:center;margin-top:8px">
      🔒 الدفع آمن ومشفر بالكامل
    </p>
  `;
}

/* ══════════════════════════════════════════════
   SUBMIT ORDER
   ══════════════════════════════════════════════ */
async function submitOrder() {
  const err = document.getElementById('coError');
  err.textContent = '';

  if (!checkoutProduct || !checkoutVariant) return;

  const fields = GAME_FIELDS[checkoutProduct.slug] || [];

  /* التحقق من الحقول المطلوبة */
  for (const f of fields) {
    if (f.required) {
      const el  = document.getElementById('co_' + f.id);
      const val = el ? el.value.trim() : '';
      if (!val) {
        err.textContent = `يرجى ملء حقل: ${f.label}`;
        el?.focus();
        return;
      }
    }
  }

  /* جمع بيانات الحقول */
  const gameData = fields.map(f => {
    const el = document.getElementById('co_' + f.id);
    return el ? `${f.label}: ${el.value.trim()}` : '';
  }).filter(Boolean).join('\n');

  const paymentMethod = document.querySelector('input[name="payment"]:checked')?.value || 'visa';
  const notes = document.getElementById('co_notes')?.value?.trim() || '';

  /* إنشاء رقم الطلب */
  const orderId = 'TC-' + Date.now().toString().slice(-8);

  /* تجهيز بيانات الإيميل */
  const emailData = {
    to_email:       STORE_OWNER_EMAIL,
    order_id:       orderId,
    customer_name:  currentUser.name,
    customer_email: currentUser.email,
    product_name:   checkoutProduct.nameAr,
    variant_name:   checkoutVariant.name,
    price:          checkoutVariant.price + ' ريال',
    payment_method: paymentMethod,
    game_fields:    gameData || 'لا توجد بيانات إضافية',
    notes:          notes || 'لا توجد ملاحظات',
    order_date:     new Date().toLocaleString('ar-SA'),
  };

  /* تعطيل الزر أثناء الإرسال */
  const btn = document.getElementById('coSubmitBtn');
  btn.textContent = '⏳ جاري إرسال الطلب...';
  btn.disabled = true;

  /* إرسال الإيميل عبر EmailJS */
  try {
    if (EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, emailData, EMAILJS_PUBLIC_KEY);
    }

    /* حفظ الطلب محلياً */
    const orders = JSON.parse(localStorage.getItem('tc_orders') || '[]');
    orders.push({ ...emailData, status: 'pending', createdAt: new Date().toISOString() });
    localStorage.setItem('tc_orders', JSON.stringify(orders));

    /* إفراغ السلة */
    cart = cart.filter(i => !(i.productId === checkoutProduct.id));
    saveCart();

    /* إغلاق وعرض نجاح */
    closeCheckout();
    showOrderSuccess(orderId, checkoutProduct, checkoutVariant);

  } catch (e) {
    console.error('EmailJS error:', e);
    err.textContent = 'حدث خطأ في إرسال الطلب. يرجى المحاولة مجدداً.';
    btn.textContent = '🛒 تأكيد الطلب — ' + checkoutVariant.price + ' ريال';
    btn.disabled = false;
  }
}

/* ══════════════════════════════════════════════
   ORDER SUCCESS SCREEN — شاشة نجاح الطلب
   ══════════════════════════════════════════════ */
function showOrderSuccess(orderId, product, variant) {
  document.getElementById('app').innerHTML = `
    <div style="max-width:560px;margin:60px auto;padding:0 20px;text-align:center" class="page-in">

      <!-- أيقونة النجاح -->
      <div style="width:90px;height:90px;border-radius:50%;background:linear-gradient(135deg,#00c864,#009648);
           margin:0 auto 24px;display:flex;align-items:center;justify-content:center;
           font-size:42px;box-shadow:0 0 40px rgba(0,200,100,.4);animation:pop .4s ease">
        ✓
      </div>

      <h2 style="font-family:'Tajawal',sans-serif;font-size:28px;font-weight:900;margin-bottom:8px">
        تم استلام طلبك! 🎉
      </h2>
      <p style="color:var(--text-sec);font-size:14px;margin-bottom:28px;line-height:1.7">
        طلبك قيد المعالجة وسيتم تنفيذه في أقرب وقت.<br>
        ستصلك رسالة على بريدك الإلكتروني عند الاكتمال.
      </p>

      <!-- تفاصيل الطلب -->
      <div style="background:var(--card);border:1.5px solid var(--border);border-radius:var(--r);
           padding:22px;text-align:right;margin-bottom:24px">
        <div style="display:flex;align-items:center;gap:14px;margin-bottom:16px">
          <div class="${product.bgClass}" style="width:54px;height:54px;border-radius:11px;
               display:flex;align-items:center;justify-content:center;font-size:26px;flex-shrink:0">
            ${product.emoji}
          </div>
          <div>
            <div style="font-size:15px;font-weight:700">${product.nameAr}</div>
            <div style="font-size:12px;color:var(--text-sec)">${variant.name}</div>
            <div style="font-size:16px;font-weight:800;color:var(--gold)">${variant.price} ريال</div>
          </div>
        </div>
        <div style="border-top:1px solid var(--border);padding-top:14px;display:flex;flex-direction:column;gap:8px">
          <div style="display:flex;justify-content:space-between;font-size:13px">
            <span style="color:var(--text-sec)">رقم الطلب</span>
            <span style="font-weight:700;color:var(--gold)">${orderId}</span>
          </div>
          <div style="display:flex;justify-content:space-between;font-size:13px">
            <span style="color:var(--text-sec)">الحساب</span>
            <span style="font-weight:600">${currentUser?.email}</span>
          </div>
          <div style="display:flex;justify-content:space-between;font-size:13px">
            <span style="color:var(--text-sec)">التاريخ</span>
            <span>${new Date().toLocaleString('ar-SA')}</span>
          </div>
        </div>
      </div>

      <!-- ملاحظة الإيميل -->
      <div style="background:rgba(26,109,255,.1);border:1px solid rgba(26,109,255,.3);
           border-radius:var(--r);padding:14px;margin-bottom:24px;font-size:13px;color:#6fb3ff;
           display:flex;align-items:center;gap:10px">
        <span style="font-size:20px">📧</span>
        <span>تم إرسال تفاصيل طلبك إلى إيميلنا وسنتواصل معك قريباً على
          <strong style="color:white">${currentUser?.email}</strong>
        </span>
      </div>

      <!-- أزرار -->
      <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
        <button class="btn btn-gold" onclick="navigateTo('home')" style="padding:12px 28px;font-size:14px">
          العودة للرئيسية 🏠
        </button>
        <a href="https://wa.me/?text=طلب رقم ${orderId} — ${product.nameAr}" target="_blank"
           class="btn btn-blue" style="padding:12px 28px;font-size:14px">
          تواصل واتساب 💬
        </a>
      </div>
    </div>
  `;
}

/* ══════════════════════════════════════════════
   INJECT CHECKOUT MODAL — يُنشأ مرة واحدة
   ══════════════════════════════════════════════ */
function injectCheckoutModal() {
  if (document.getElementById('checkoutModal')) return;
  document.body.insertAdjacentHTML('beforeend', `
    <div class="auth-overlay" id="checkoutOverlay" onclick="closeCheckout()"></div>
    <div class="auth-modal checkout-modal" id="checkoutModal">
      <div class="auth-modal-hdr">
        <div style="font-family:'Tajawal',sans-serif;font-size:17px;font-weight:800">🛒 تأكيد الطلب</div>
        <button class="drawer-close" onclick="closeCheckout()">✕</button>
      </div>
      <div class="auth-form" id="checkoutBody" style="display:flex;max-height:75vh;overflow-y:auto"></div>
    </div>
  `);
}

document.addEventListener('DOMContentLoaded', injectCheckoutModal);









/* ══════════════════════════════════════════════
   CART CHECKOUT — إتمام طلب من صفحة السلة
   ══════════════════════════════════════════════ */
function openCartCheckout() {
  // تأكد المستخدم مسجّل دخول
  if (!isLoggedIn()) {
    showToast('يجب تسجيل الدخول أولاً للشراء', 'err');
    openAuthModal('login');
    return;
  }
  if (cart.length === 0) return;

  renderCartCheckoutModal();
  document.getElementById('checkoutModal').classList.add('open');
  document.getElementById('checkoutOverlay').classList.add('open');
}

function renderCartCheckoutModal() {
  const total = cartTotal();

  // جمع حقول كل منتج في السلة
  const allFieldsHTML = cart.map(item => {
    const product = PRODUCTS.find(p => p.id === item.productId);
    if (!product) return '';
    const fields = GAME_FIELDS[product.slug] || [];
    if (fields.length === 0) return '';

    return `
      <div style="background:rgba(255,255,255,.04);border:1px solid var(--border);
           border-radius:10px;padding:14px;margin-bottom:12px">
        <!-- اسم المنتج -->
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px">
          <div class="${product.bgClass}"
               style="width:36px;height:36px;border-radius:8px;display:flex;
                      align-items:center;justify-content:center;font-size:18px;flex-shrink:0">
            ${product.emoji}
          </div>
          <div style="font-size:13px;font-weight:700">${product.nameAr} — ${item.variant}</div>
        </div>
        <!-- حقول اللعبة -->
        ${fields.map(f => {
          const fieldId = `co_${product.id}_${f.id}`;
          if (f.type === 'select') {
            return `
              <div class="co-field" style="margin-bottom:10px">
                <label class="auth-label">
                  ${f.label}
                  ${f.required ? '<span style="color:#ff4444">*</span>' : ''}
                </label>
                <select class="auth-input" id="${fieldId}">
                  ${f.options.map(o => `<option value="${o}">${o}</option>`).join('')}
                </select>
              </div>`;
          }
          return `
            <div class="co-field" style="margin-bottom:10px">
              <label class="auth-label">
                ${f.label}
                ${f.required ? '<span style="color:#ff4444">*</span>' : ''}
              </label>
              <input class="auth-input" id="${fieldId}"
                     type="${f.type}" placeholder="${f.placeholder}" />
            </div>`;
        }).join('')}
      </div>`;
  }).join('');

  document.getElementById('checkoutBody').innerHTML = `

    <!-- ملخص السلة -->
    <div style="background:rgba(245,197,24,.07);border:1.5px solid rgba(245,197,24,.2);
         border-radius:var(--r);padding:14px;margin-bottom:18px">
      <div style="font-size:13px;font-weight:700;margin-bottom:10px;color:var(--gold)">
        🛒 ملخص الطلب (${cartCount()} منتج)
      </div>
      ${cart.map(item => `
        <div style="display:flex;justify-content:space-between;font-size:12px;
             color:var(--text-sec);padding:4px 0;border-bottom:1px solid rgba(255,255,255,.05)">
          <span>${item.name} — ${item.variant} × ${item.qty}</span>
          <span style="color:var(--gold);font-weight:700">
            ${(item.price * item.qty).toFixed(2)} ريال
          </span>
        </div>
      `).join('')}
      <div style="display:flex;justify-content:space-between;font-size:15px;
           font-weight:800;padding-top:10px;margin-top:2px">
        <span>الإجمالي</span>
        <span style="color:var(--gold)">${total.toFixed(2)} ريال</span>
      </div>
    </div>

    <!-- بيانات العميل -->
    <div class="co-section-title">📋 بيانات الطلب</div>
    <div class="co-field">
      <label class="auth-label">الاسم الكامل</label>
      <input class="auth-input" id="co_name" type="text"
             value="${currentUser?.name || ''}" readonly
             style="background:rgba(255,255,255,.04);cursor:default" />
    </div>
    <div class="co-field">
      <label class="auth-label">البريد الإلكتروني</label>
      <input class="auth-input" id="co_email" type="email"
             value="${currentUser?.email || ''}" readonly
             style="background:rgba(255,255,255,.04);cursor:default" />
    </div>

    <!-- حقول الألعاب -->
    ${allFieldsHTML ? `
      <div class="co-section-title" style="margin-top:18px">🎮 بيانات الألعاب</div>
      ${allFieldsHTML}
    ` : ''}

    <!-- وسيلة الدفع -->
    <div class="co-section-title" style="margin-top:18px">💳 وسيلة الدفع</div>
    <div class="payment-methods-grid">
      <label class="pm-option">
        <input type="radio" name="payment" value="visa" checked>
        <span>💳 Visa / Mastercard</span>
      </label>
      <label class="pm-option">
        <input type="radio" name="payment" value="applepay">
        <span>🍎 Apple Pay</span>
      </label>
      <label class="pm-option">
        <input type="radio" name="payment" value="mada">
        <span>🟡 مدى</span>
      </label>
      <label class="pm-option">
        <input type="radio" name="payment" value="stcpay">
        <span>📱 STC Pay</span>
      </label>
    </div>

    <!-- ملاحظات -->
    <div class="co-field" style="margin-top:14px">
      <label class="auth-label">ملاحظات إضافية (اختياري)</label>
      <textarea class="auth-input" id="co_notes" rows="2"
                placeholder="أي تعليمات خاصة..."
                style="resize:vertical;min-height:60px"></textarea>
    </div>

    <div class="auth-error" id="coError" style="margin-top:10px"></div>

    <button class="auth-submit" id="coSubmitBtn"
            onclick="submitCartOrder()" style="margin-top:16px">
      🛒 تأكيد الطلب — ${total.toFixed(2)} ريال
    </button>
    <p style="font-size:11px;color:var(--text-sec);text-align:center;margin-top:8px">
      🔒 الدفع آمن ومشفر بالكامل
    </p>
  `;
}

/* ══════════════════════════════════════════════
   SUBMIT CART ORDER
   ══════════════════════════════════════════════ */
async function submitCartOrder() {
  const err = document.getElementById('coError');
  err.textContent = '';

  // تحقق من حقول كل منتج
  for (const item of cart) {
    const product = PRODUCTS.find(p => p.id === item.productId);
    if (!product) continue;
    const fields = GAME_FIELDS[product.slug] || [];

    for (const f of fields) {
      if (f.required) {
        const el  = document.getElementById(`co_${product.id}_${f.id}`);
        const val = el ? el.value.trim() : '';
        if (!val) {
          err.textContent = `${product.nameAr}: يرجى ملء حقل "${f.label}"`;
          el?.focus();
          return;
        }
      }
    }
  }

  // جمع البيانات
  const orderId = 'TC-' + Date.now().toString().slice(-8);
  const paymentMethod = document.querySelector('input[name="payment"]:checked')?.value || 'visa';
  const notes  = document.getElementById('co_notes')?.value?.trim() || '';
  const total  = cartTotal();

  // تجهيز تفاصيل كل منتج للإيميل
  const itemsDetails = cart.map(item => {
    const product = PRODUCTS.find(p => p.id === item.productId);
    if (!product) return '';
    const fields   = GAME_FIELDS[product.slug] || [];
    const gameData = fields.map(f => {
      const el = document.getElementById(`co_${product.id}_${f.id}`);
      return el?.value ? `${f.label}: ${el.value.trim()}` : '';
    }).filter(Boolean).join(' | ');

    return `${product.nameAr} (${item.variant}) × ${item.qty} = ${(item.price*item.qty).toFixed(2)} ريال`
         + (gameData ? `\n   ${gameData}` : '');
  }).join('\n');

  const emailData = {
    to_email:       STORE_OWNER_EMAIL,
    order_id:       orderId,
    customer_name:  currentUser.name,
    customer_email: currentUser.email,
    product_name:   `${cartCount()} منتجات`,
    variant_name:   '',
    price:          total.toFixed(2) + ' ريال',
    payment_method: paymentMethod,
    game_fields:    itemsDetails,
    notes:          notes || 'لا توجد ملاحظات',
    order_date:     new Date().toLocaleString('ar-SA'),
  };

  const btn = document.getElementById('coSubmitBtn');
  btn.textContent = '⏳ جاري إرسال الطلب...';
  btn.disabled = true;

  try {
    if (EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        emailData,
        EMAILJS_PUBLIC_KEY
      );
    }

    // حفظ الطلب
    const orders = JSON.parse(localStorage.getItem('tc_orders') || '[]');
    orders.push({ ...emailData, status: 'pending', createdAt: new Date().toISOString() });
    localStorage.setItem('tc_orders', JSON.stringify(orders));

    // إفراغ السلة
    clearCart();
    closeCheckout();

    // شاشة النجاح
    showCartOrderSuccess(orderId, total, cart.length);

  } catch (e) {
    console.error(e);
    err.textContent = 'حدث خطأ. يرجى المحاولة مجدداً.';
    btn.textContent = `🛒 تأكيد الطلب — ${total.toFixed(2)} ريال`;
    btn.disabled = false;
  }
}

/* شاشة نجاح طلب السلة */
function showCartOrderSuccess(orderId, total, itemCount) {
  document.getElementById('app').innerHTML = `
    <div style="max-width:560px;margin:60px auto;padding:0 20px;text-align:center" class="page-in">
      <div style="width:90px;height:90px;border-radius:50%;
           background:linear-gradient(135deg,#00c864,#009648);
           margin:0 auto 24px;display:flex;align-items:center;justify-content:center;
           font-size:42px;box-shadow:0 0 40px rgba(0,200,100,.4);animation:pop .4s ease">✓</div>

      <h2 style="font-family:'Tajawal',sans-serif;font-size:28px;font-weight:900;margin-bottom:8px">
        تم استلام طلبك! 🎉
      </h2>
      <p style="color:var(--text-sec);font-size:14px;margin-bottom:28px;line-height:1.7">
        طلبك قيد المعالجة وسيتم تنفيذه في أقرب وقت.
      </p>

      <div style="background:var(--card);border:1.5px solid var(--border);
           border-radius:var(--r);padding:22px;text-align:right;margin-bottom:24px">
        <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:10px">
          <span style="color:var(--text-sec)">رقم الطلب</span>
          <span style="font-weight:700;color:var(--gold)">${orderId}</span>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:10px">
          <span style="color:var(--text-sec)">عدد المنتجات</span>
          <span>${itemCount} منتج</span>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:15px;font-weight:800;
             padding-top:10px;border-top:1px solid var(--border)">
          <span>الإجمالي</span>
          <span style="color:var(--gold)">${total.toFixed(2)} ريال</span>
        </div>
      </div>

      <div style="background:rgba(26,109,255,.1);border:1px solid rgba(26,109,255,.3);
           border-radius:var(--r);padding:14px;margin-bottom:24px;
           font-size:13px;color:#6fb3ff;display:flex;align-items:center;gap:10px">
        <span style="font-size:20px">📧</span>
        <span>سنتواصل معك قريباً على
          <strong style="color:white">${currentUser?.email}</strong>
        </span>
      </div>

      <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
        <button class="btn btn-gold" onclick="navigateTo('home')"
                style="padding:12px 28px;font-size:14px">العودة للرئيسية 🏠</button>
        <button class="btn btn-outline" onclick="navigateToPage('orders')"
                style="padding:12px 28px;font-size:14px">طلباتي 📦</button>
      </div>
    </div>`;
}