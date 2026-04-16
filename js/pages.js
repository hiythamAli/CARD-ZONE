/* ================================================================
   pages.js — صفحات الفوتر والصفحات الثابتة
   ================================================================
   كل صفحة تُعرض عند الضغط على روابط الفوتر
   ================================================================ */

/* ══════════════════════════════════════════════
   ROUTER — أضف هذه الصفحات لـ navigateTo
   ══════════════════════════════════════════════ */
function navigateToPage(pageKey) {
  window.scrollTo(0, 0);

  /* إزالة active من catnav */
  document.querySelectorAll('.catnav-item').forEach(b => b.classList.remove('act'));

  const pages = {
    'about':        renderAboutPage,
    'terms':        renderTermsPage,
    'privacy':      renderPrivacyPage,
    'refund':       renderRefundPage,
    'contact':      renderContactPage,
    'loyalty':      renderLoyaltyPage,
    'orders':       renderMyOrdersPage,
    'faq':          renderFAQPage,
  };

  const renderer = pages[pageKey];
  if (renderer) {
    document.getElementById('app').innerHTML = renderer();
  }
}

/* ══════════════════════════════════════════════
   SHARED — مكونات مشتركة
   ══════════════════════════════════════════════ */
function pageWrapper(icon, title, subtitle, content) {
  return `
  <div style="max-width:860px;margin:0 auto;padding:40px 20px" class="page-in">
    <button class="back-btn" onclick="navigateTo('home')">◄ العودة للرئيسية</button>
    <div style="text-align:center;margin-bottom:36px">
      <div style="font-size:56px;margin-bottom:12px">${icon}</div>
      <h1 style="font-family:'Tajawal',sans-serif;font-size:28px;font-weight:900;margin-bottom:8px">${title}</h1>
      ${subtitle ? `<p style="color:var(--text-sec);font-size:14px">${subtitle}</p>` : ''}
    </div>
    <div class="static-page-content">${content}</div>
  </div>`;
}

function section(title, text) {
  return `
    <div class="spc-section">
      <h3 class="spc-title">${title}</h3>
      <p class="spc-text">${text}</p>
    </div>`;
}

/* ══════════════════════════════════════════════
   1. من نحن
   ══════════════════════════════════════════════ */
function renderAboutPage() {
  return pageWrapper('🏆', 'من نحن', 'تعرّف على تيك كارد وقصتنا', `

    ${section('قصتنا', 'تيك كارد هو متجر إلكتروني متخصص في بيع البطاقات الرقمية والاشتراكات الإلكترونية. أسسنا المتجر بهدف واحد: تقديم أفضل الأسعار مع أسرع خدمة تسليم في المنطقة العربية.')}

    ${section('رسالتنا', 'نؤمن بأن الشحن الرقمي يجب أن يكون سريعاً وآمناً وبأسعار عادلة. لذلك نعمل يومياً على توسيع قائمة منتجاتنا وتحسين تجربة المستخدم.')}

    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin:24px 0">
      ${[
        { num: '21+', label: 'منتج رقمي', icon: '🎮' },
        { num: '5000+', label: 'عميل سعيد', icon: '😊' },
        { num: '24/7', label: 'دعم فني', icon: '🎧' },
      ].map(s => `
        <div style="background:var(--card);border:1.5px solid var(--border);border-radius:var(--r);
             padding:22px;text-align:center">
          <div style="font-size:32px;margin-bottom:8px">${s.icon}</div>
          <div style="font-size:26px;font-weight:900;color:var(--gold)">${s.num}</div>
          <div style="font-size:13px;color:var(--text-sec);margin-top:4px">${s.label}</div>
        </div>
      `).join('')}
    </div>

    ${section('لماذا تيك كارد؟', `
      <ul style="list-style:none;padding:0;margin-top:10px;display:flex;flex-direction:column;gap:10px">
        ${['تسليم فوري خلال ثوانٍ بعد الدفع',
           'أسعار تنافسية وعروض مستمرة',
           'منتجات أصلية مضمونة 100%',
           'دعم عملاء متاح 24/7',
           'وسائل دفع متعددة وآمنة'].map(i =>
          `<li style="display:flex;align-items:center;gap:10px;font-size:14px">
             <span style="color:#00c864;font-size:16px">✓</span> ${i}
           </li>`
        ).join('')}
      </ul>
    `)}
  `);
}

/* ══════════════════════════════════════════════
   2. الشروط والأحكام
   ══════════════════════════════════════════════ */
function renderTermsPage() {
  return pageWrapper('📜', 'الشروط والأحكام', 'آخر تحديث: يناير 2025', `

    <div style="background:rgba(26,109,255,.1);border:1px solid rgba(26,109,255,.3);
         border-radius:var(--r);padding:14px 18px;margin-bottom:24px;font-size:13px;color:#6fb3ff">
      ⚠️ باستخدامك لموقع تيك كارد فأنت توافق على جميع الشروط والأحكام المذكورة أدناه.
    </div>

    ${section('1. القبول والموافقة', 'يُعدّ استخدامك لهذا الموقع موافقةً صريحة منك على جميع الشروط والأحكام. إذا كنت لا توافق على أي من هذه الشروط، يرجى التوقف عن استخدام الموقع فوراً.')}

    ${section('2. المنتجات والخدمات', 'نقدم بطاقات رقمية وخدمات شحن إلكترونية لألعاب ومنصات متعددة. جميع المنتجات أصلية ومرخصة من الشركات المُصنِّعة. قد تتغير الأسعار دون إشعار مسبق.')}

    ${section('3. عملية الشراء والتسليم', 'يتم التسليم فوراً بعد تأكيد الدفع إلكترونياً. في حالة أي تأخير، يحق للعميل التواصل مع الدعم الفني خلال 24 ساعة من الشراء.')}

    ${section('4. سياسة الاسترداد', 'لا يمكن استرداد قيمة المنتجات الرقمية بعد تسليمها وتفعيلها. في حالة وجود مشكلة في المنتج، يمكن طلب الاسترداد خلال 48 ساعة من الشراء مع إثبات المشكلة.')}

    ${section('5. الحسابات والخصوصية', 'أنت مسؤول عن حماية معلومات حسابك وكلمة مرورك. يُحظر مشاركة الحساب مع أشخاص آخرين. نحتفظ بالحق في إيقاف أي حساب يخالف شروط الاستخدام.')}

    ${section('6. القانون المطبق', 'تخضع هذه الشروط لقوانين المملكة العربية السعودية أو سلطنة عُمان حسب موقع المستخدم. أي نزاع يُحال إلى الجهات القضائية المختصة.')}
  `);
}

/* ══════════════════════════════════════════════
   3. سياسة الخصوصية
   ══════════════════════════════════════════════ */
function renderPrivacyPage() {
  return pageWrapper('🔒', 'سياسة الخصوصية', 'نحن نحمي بياناتك الشخصية', `

    ${section('ما البيانات التي نجمعها؟', `
      نجمع فقط البيانات الضرورية لإتمام طلبك:
      <ul style="list-style:none;padding:10px 0 0;display:flex;flex-direction:column;gap:8px">
        ${['الاسم الكامل والبريد الإلكتروني','معرفات اللعبة (Player ID, UID) عند الشحن','معلومات الدفع — ولا نحتفظ ببيانات البطاقات','سجل الطلبات السابقة'].map(i =>
          `<li style="display:flex;align-items:flex-start;gap:8px;font-size:14px;color:var(--text-sec)">
             <span style="color:var(--blue);margin-top:2px">•</span> ${i}
           </li>`
        ).join('')}
      </ul>
    `)}

    ${section('كيف نستخدم بياناتك؟', 'نستخدم بياناتك فقط لأغراض تنفيذ طلباتك، وإرسال تأكيدات الشراء، وتقديم الدعم الفني. لا نبيع بياناتك لأطراف ثالثة بأي شكل من الأشكال.')}

    ${section('حماية البيانات', 'نستخدم بروتوكول HTTPS لتشفير جميع البيانات المنقولة. كلمات المرور مشفرة ولا يمكن الاطلاع عليها حتى لفريق العمل.')}

    ${section('حقوقك', 'يحق لك في أي وقت: طلب نسخة من بياناتك، طلب تعديل أو حذف بياناتك، إلغاء اشتراكك في الرسائل الترويجية. للتواصل: info@take-card.com')}

    ${section('ملفات تعريف الارتباط (Cookies)', 'نستخدم ملفات الكوكيز لحفظ تفضيلاتك وسلة التسوق. يمكنك تعطيلها من إعدادات المتصفح، لكن قد يؤثر ذلك على بعض مميزات الموقع.')}
  `);
}

/* ══════════════════════════════════════════════
   4. سياسة الاسترداد
   ══════════════════════════════════════════════ */
function renderRefundPage() {
  return pageWrapper('↩️', 'سياسة الاسترداد', 'نضمن حقك وراحتك', `

    <div style="background:rgba(0,200,100,.1);border:1px solid rgba(0,200,100,.3);
         border-radius:var(--r);padding:16px 18px;margin-bottom:24px">
      <div style="font-size:16px;font-weight:700;color:#00c864;margin-bottom:6px">✓ ضمان رضا العميل</div>
      <div style="font-size:13px;color:var(--text-sec)">نسعى دائماً لتقديم أفضل تجربة شراء. في حالة وجود أي مشكلة، فريقنا مستعد للمساعدة.</div>
    </div>

    ${section('متى يمكن طلب الاسترداد؟', `
      <ul style="list-style:none;padding:10px 0 0;display:flex;flex-direction:column;gap:10px">
        ${[
          { ok: true,  text: 'المنتج لم يُسلَّم بعد مرور 24 ساعة من الشراء' },
          { ok: true,  text: 'المنتج المُسلَّم لا يعمل بسبب خطأ من جانبنا' },
          { ok: true,  text: 'تم الشراء بطريق الخطأ وتم الإبلاغ فوراً' },
          { ok: false, text: 'بعد تفعيل واستخدام المنتج' },
          { ok: false, text: 'إذا أدخل العميل بيانات خاطئة (ID, UID, etc.)' },
          { ok: false, text: 'بعد مرور 48 ساعة من الشراء' },
        ].map(i => `
          <li style="display:flex;align-items:flex-start;gap:10px;font-size:14px">
            <span style="color:${i.ok ? '#00c864' : '#ff4444'};flex-shrink:0;margin-top:1px">${i.ok ? '✓' : '✕'}</span>
            <span style="color:var(--text-sec)">${i.text}</span>
          </li>
        `).join('')}
      </ul>
    `)}

    ${section('كيف تطلب الاسترداد؟', `
      <ol style="list-style:none;padding:10px 0 0;display:flex;flex-direction:column;gap:12px;counter-reset:steps">
        ${[
          'تواصل معنا عبر واتساب أو إيميل',
          'أرسل رقم طلبك وسبب طلب الاسترداد',
          'سيتم مراجعة طلبك خلال 24 ساعة',
          'في حالة القبول يُعاد المبلغ خلال 3-5 أيام عمل',
        ].map((t, i) => `
          <li style="display:flex;align-items:flex-start;gap:12px;font-size:14px">
            <span style="width:26px;height:26px;border-radius:50%;background:var(--blue);
                 display:flex;align-items:center;justify-content:center;font-size:12px;
                 font-weight:700;flex-shrink:0">${i+1}</span>
            <span style="color:var(--text-sec);padding-top:4px">${t}</span>
          </li>
        `).join('')}
      </ol>
    `)}

    <div style="background:var(--card);border:1.5px solid var(--border);border-radius:var(--r);
         padding:18px;margin-top:20px;text-align:center">
      <p style="font-size:14px;margin-bottom:14px">للتواصل بخصوص الاسترداد</p>
      <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
        <a href="https://wa.me/" class="btn btn-gold" style="padding:10px 22px">💬 واتساب</a>
        <a href="mailto:info@take-card.com" class="btn btn-outline" style="padding:10px 22px">📧 إيميل</a>
      </div>
    </div>
  `);
}

/* ══════════════════════════════════════════════
   5. تواصل معنا
   ══════════════════════════════════════════════ */
function renderContactPage() {
  return pageWrapper('📞', 'تواصل معنا', 'نحن هنا لمساعدتك دائماً', `

    <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:16px;margin-bottom:32px">
      ${[
        { icon:'💬', title:'واتساب',         desc:'متاح 24/7',  val:'تواصل الآن', link:'https://wa.me/' },
        { icon:'✈️', title:'تليجرام',        desc:'@Take_card0', val:'انضم الآن', link:'https://t.me/' },
        { icon:'📧', title:'البريد الإلكتروني', desc:'info@take-card.com', val:'راسلنا', link:'mailto:info@take-card.com' },
        { icon:'📱', title:'الهاتف',          desc:'+968 xxxx xxxx', val:'اتصل الآن', link:'tel:+968' },
      ].map(c => `
        <a href="${c.link}" target="_blank"
           style="background:var(--card);border:1.5px solid var(--border);border-radius:var(--r);
                  padding:22px;display:flex;align-items:center;gap:14px;transition:all .2s;
                  text-decoration:none"
           onmouseover="this.style.borderColor='var(--gold)';this.style.transform='translateY(-2px)'"
           onmouseout="this.style.borderColor='var(--border)';this.style.transform='translateY(0)'">
          <div style="font-size:34px">${c.icon}</div>
          <div>
            <div style="font-size:14px;font-weight:700">${c.title}</div>
            <div style="font-size:12px;color:var(--text-sec);margin:3px 0">${c.desc}</div>
            <div style="font-size:12px;color:var(--gold);font-weight:600">${c.val} ◄</div>
          </div>
        </a>
      `).join('')}
    </div>

    <!-- نموذج التواصل -->
    <div style="background:var(--card);border:1.5px solid var(--border);border-radius:var(--r);padding:24px">
      <h3 style="font-family:'Tajawal',sans-serif;font-size:18px;font-weight:800;margin-bottom:20px">
        أرسل رسالة مباشرة
      </h3>
      <div style="display:flex;flex-direction:column;gap:14px">
        <div>
          <label class="auth-label">الاسم</label>
          <input class="auth-input" id="ct_name" type="text" placeholder="اسمك الكريم"
                 value="${currentUser?.name || ''}" />
        </div>
        <div>
          <label class="auth-label">البريد الإلكتروني</label>
          <input class="auth-input" id="ct_email" type="email" placeholder="email@example.com"
                 value="${currentUser?.email || ''}" />
        </div>
        <div>
          <label class="auth-label">الموضوع</label>
          <select class="auth-input" id="ct_subject">
            <option>استفسار عن منتج</option>
            <option>مشكلة في طلب</option>
            <option>طلب استرداد</option>
            <option>اقتراح</option>
            <option>أخرى</option>
          </select>
        </div>
        <div>
          <label class="auth-label">رسالتك</label>
          <textarea class="auth-input" id="ct_msg" rows="4"
                    placeholder="اكتب رسالتك هنا..."
                    style="resize:vertical;min-height:100px"></textarea>
        </div>
        <button class="auth-submit" onclick="submitContactForm()">إرسال الرسالة 📨</button>
      </div>
    </div>
  `);
}

function submitContactForm() {
  const name    = document.getElementById('ct_name')?.value?.trim();
  const email   = document.getElementById('ct_email')?.value?.trim();
  const subject = document.getElementById('ct_subject')?.value;
  const msg     = document.getElementById('ct_msg')?.value?.trim();

  if (!name || !email || !msg) {
    showToast('يرجى ملء جميع الحقول', 'err');
    return;
  }
  /* يمكن ربطه بـ EmailJS لاحقاً */
  showToast('تم إرسال رسالتك بنجاح! سنرد عليك قريباً ✓', 'ok');
  document.getElementById('ct_msg').value = '';
}

/* ══════════════════════════════════════════════
   6. نقاط الولاء
   ══════════════════════════════════════════════ */
function renderLoyaltyPage() {
  const points = currentUser
    ? (JSON.parse(localStorage.getItem('tc_orders') || '[]')
        .filter(o => o.customer_email === currentUser.email)
        .reduce((s, o) => s + Math.floor(parseFloat(o.price) * 10), 0))
    : 0;

  return pageWrapper('🎁', 'نقاط الولاء', 'كل شراء يكسبك نقاطاً قيمة', `

    ${currentUser ? `
      <div style="background:linear-gradient(135deg,#1a0a30,#2d1060);border:1px solid rgba(200,100,255,.3);
           border-radius:var(--r-lg);padding:30px;text-align:center;margin-bottom:28px;position:relative;overflow:hidden">
        <div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 50%,rgba(200,100,255,.2) 0,transparent 70%)"></div>
        <div style="position:relative;z-index:2">
          <div style="font-size:14px;color:var(--text-sec);margin-bottom:8px">نقاطك الحالية</div>
          <div style="font-size:56px;font-weight:900;color:#c864ff;line-height:1">${points}</div>
          <div style="font-size:14px;color:var(--text-sec);margin-top:8px">نقطة ولاء</div>
          <div style="margin-top:16px;font-size:13px;color:rgba(255,255,255,.7)">
            = ${Math.floor(points / 100)} ريال كاش باك تقريباً
          </div>
        </div>
      </div>
    ` : `
      <div style="background:var(--card);border:1.5px solid var(--border);border-radius:var(--r);
           padding:24px;text-align:center;margin-bottom:28px">
        <div style="font-size:36px;margin-bottom:12px">🔒</div>
        <p style="color:var(--text-sec);margin-bottom:16px">سجّل دخول لرؤية نقاطك</p>
        <button class="btn btn-gold" onclick="openAuthModal('login')">تسجيل الدخول</button>
      </div>
    `}

    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-bottom:28px">
      ${[
        { icon:'🛒', title:'اشترِ أي منتج',   desc:'10 نقاط لكل ريال' },
        { icon:'🎂', title:'عيد ميلادك',      desc:'500 نقطة هدية' },
        { icon:'👥', title:'دعوة صديق',       desc:'200 نقطة لكل دعوة' },
      ].map(t => `
        <div style="background:var(--card);border:1.5px solid var(--border);border-radius:var(--r);
             padding:18px;text-align:center">
          <div style="font-size:28px;margin-bottom:8px">${t.icon}</div>
          <div style="font-size:13px;font-weight:700;margin-bottom:4px">${t.title}</div>
          <div style="font-size:12px;color:var(--gold)">${t.desc}</div>
        </div>
      `).join('')}
    </div>

    <div style="background:var(--card);border:1.5px solid var(--border);border-radius:var(--r);padding:20px">
      <h3 style="font-family:'Tajawal',sans-serif;font-size:16px;font-weight:800;margin-bottom:16px">
        كيف تستبدل نقاطك؟
      </h3>
      ${['100 نقطة = 1 ريال خصم على طلبك القادم',
         '500 نقطة = شحن مجاني + هدية مفاجأة',
         '1000 نقطة = منتج رقمي مجاني من اختيارك'].map(t => `
        <div style="display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid var(--border);font-size:13px">
          <span style="color:#c864ff;font-size:16px">⭐</span>
          <span>${t}</span>
        </div>
      `).join('')}
    </div>
  `);
}

/* ══════════════════════════════════════════════
   7. طلباتي
   ══════════════════════════════════════════════ */
function renderMyOrdersPage() {
  if (!isLoggedIn()) {
    return pageWrapper('📦', 'طلباتي', '', `
      <div style="text-align:center;padding:40px 20px">
        <div style="font-size:56px;margin-bottom:16px;opacity:.4">📦</div>
        <h3 style="color:var(--text-sec);margin-bottom:14px">سجّل دخول لعرض طلباتك</h3>
        <button class="btn btn-gold" onclick="openAuthModal('login')">تسجيل الدخول</button>
      </div>
    `);
  }

  const allOrders = JSON.parse(localStorage.getItem('tc_orders') || '[]');
  const myOrders  = allOrders.filter(o => o.customer_email === currentUser.email).reverse();

  const ordersHTML = myOrders.length === 0
    ? `<div style="text-align:center;padding:48px;color:var(--text-sec)">
         <div style="font-size:48px;opacity:.35;margin-bottom:14px">📦</div>
         <p>ما سوّيت أي طلب بعد</p>
         <button class="btn btn-gold" style="margin-top:14px" onclick="navigateTo('home')">تصفح المنتجات</button>
       </div>`
    : myOrders.map(o => `
      <div style="background:var(--card);border:1.5px solid var(--border);border-radius:var(--r);
           padding:18px;margin-bottom:12px">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;flex-wrap:wrap;gap:8px">
          <div style="font-size:13px;font-weight:700;color:var(--gold)">${o.order_id}</div>
          <span style="background:rgba(0,200,100,.15);color:#00c864;border:1px solid rgba(0,200,100,.3);
               border-radius:50px;padding:3px 10px;font-size:11px;font-weight:700">
            ${o.status === 'pending' ? '⏳ قيد التنفيذ' : '✓ مكتمل'}
          </span>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:13px">
          <div style="color:var(--text-sec)">المنتج</div>
          <div style="font-weight:600">${o.product_name}</div>
          <div style="color:var(--text-sec)">الباقة</div>
          <div>${o.variant_name}</div>
          <div style="color:var(--text-sec)">السعر</div>
          <div style="color:var(--gold);font-weight:700">${o.price}</div>
          <div style="color:var(--text-sec)">التاريخ</div>
          <div>${new Date(o.createdAt).toLocaleDateString('ar-SA')}</div>
        </div>
      </div>
    `).join('');

  return pageWrapper('📦', 'طلباتي', `${myOrders.length} طلب`, ordersHTML);
}

/* ══════════════════════════════════════════════
   8. الأسئلة الشائعة
   ══════════════════════════════════════════════ */
function renderFAQPage() {
  const faqs = [
    { q: 'هل التسليم فوري؟',                  a: 'نعم، خلال ثوانٍ من تأكيد الدفع. في بعض الحالات قد يستغرق حتى 5 دقائق.' },
    { q: 'هل المنتجات أصلية؟',               a: 'جميع منتجاتنا أصلية 100% مرخصة من الشركات الرسمية.' },
    { q: 'ما وسائل الدفع المتاحة؟',           a: 'Visa، Mastercard، Apple Pay، مدى، STC Pay، وغيرها.' },
    { q: 'هل يعمل الموقع في دولتي؟',         a: 'نعم، نخدم جميع دول الخليج العربي والدول العربية.' },
    { q: 'كيف أعرف Player ID الخاص بي؟',     a: 'افتح اللعبة > الملف الشخصي (Profile) > ستجد الـ ID بجانب اسمك.' },
    { q: 'ماذا لو أدخلت بيانات خاطئة؟',      a: 'في حالة إدخال بيانات خاطئة (ID خاطئ) لا يمكن الاسترداد. تأكد جيداً قبل الإرسال.' },
    { q: 'كم وقت يستغرق الرد على الدعم؟',   a: 'خلال دقائق عبر واتساب في أوقات الدوام، وحتى ساعتين في باقي الأوقات.' },
    { q: 'هل هناك عروض وخصومات؟',            a: 'نعم! اشترك في قناتنا على واتساب وتليجرام للحصول على آخر العروض الحصرية.' },
  ];

  return pageWrapper('❓', 'الأسئلة الشائعة', 'كل ما تريد معرفته', `
    <div style="display:flex;flex-direction:column;gap:12px">
      ${faqs.map((f, i) => `
        <div style="background:var(--card);border:1.5px solid var(--border);border-radius:var(--r);
             overflow:hidden">
          <button onclick="toggleFAQ(${i})"
                  style="width:100%;padding:16px 18px;background:none;border:none;cursor:pointer;
                         display:flex;align-items:center;justify-content:space-between;
                         font-family:'Cairo',sans-serif;font-size:14px;font-weight:700;
                         color:var(--text);text-align:right">
            <span>${f.q}</span>
            <span id="faq-icon-${i}" style="color:var(--gold);font-size:18px;flex-shrink:0;margin-right:8px">+</span>
          </button>
          <div id="faq-body-${i}" style="display:none;padding:0 18px 16px;font-size:13px;
               color:var(--text-sec);line-height:1.75;border-top:1px solid var(--border)">
            <div style="padding-top:12px">${f.a}</div>
          </div>
        </div>
      `).join('')}
    </div>
  `);
}

function toggleFAQ(i) {
  const body = document.getElementById('faq-body-' + i);
  const icon = document.getElementById('faq-icon-' + i);
  if (!body) return;
  const isOpen = body.style.display !== 'none';
  body.style.display = isOpen ? 'none' : 'block';
  icon.textContent   = isOpen ? '+' : '−';
  icon.style.color   = isOpen ? 'var(--gold)' : '#c864ff';
}
