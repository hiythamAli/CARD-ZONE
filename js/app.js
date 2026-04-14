/* ================================================================
   app.js — منطق التطبيق الكامل
   ================================================================ */

/* ──────────────────────────────────────────────
   CART — السلة
   ────────────────────────────────────────────── */
let cart = JSON.parse(localStorage.getItem('tc_cart') || '[]');

function saveCart() {
    localStorage.setItem('tc_cart', JSON.stringify(cart));
    updateCartUI();
}

function addToCart(productId, variantId) {
    const product = PRODUCTS.find(p => p.id === productId);
    const variant = product.variants.find(v => v.id === variantId);
    const cartId = productId + '_' + variantId;
    const existing = cart.find(i => i.cartId === cartId);

    if (existing) {
        existing.qty++;
    } else {
        cart.push({
            cartId,
            productId,
            variantId,
            name: product.nameAr,
            variant: variant.name,
            price: variant.price,
            emoji: product.emoji,
            bgClass: product.bgClass,
            image: product.image || '',
            qty: 1,
        });
    }
    saveCart();
    showToast('تمت الإضافة للسلة ✓', 'ok');
}

function removeFromCart(cartId) {
    cart = cart.filter(i => i.cartId !== cartId);
    saveCart();
    showToast('تم الحذف من السلة', 'inf');
    renderDrawerItems();
    if (document.getElementById('cartPageItems')) renderCartPage();
}

function changeQty(cartId, delta) {
    const item = cart.find(i => i.cartId === cartId);
    if (!item) return;
    item.qty = Math.max(1, item.qty + delta);
    saveCart();
    renderDrawerItems();
    if (document.getElementById('cartPageItems')) renderCartPage();
}

function clearCart() {
    cart = [];
    saveCart();
    showToast('تم تفريغ السلة', 'inf');
    renderDrawerItems();
    if (document.getElementById('cartPageItems')) renderCartPage();
}

function cartTotal() {
    return cart.reduce((s, i) => s + i.price * i.qty, 0);
}
function cartCount() {
    return cart.reduce((s, i) => s + i.qty, 0);
}

function updateCartUI() {
    const badge = document.getElementById('cartBadge');
    const count = cartCount();
    if (badge) {
        badge.textContent = count > 99 ? '99+' : count;
        badge.classList.toggle('hidden', count === 0);
    }
}

/* ──────────────────────────────────────────────
   CART DRAWER
   ────────────────────────────────────────────── */
function toggleCartDrawer() {
    const drawer = document.getElementById('cartDrawer');
    const overlay = document.getElementById('cartOverlay');
    const isOpen = drawer.classList.contains('open');
    drawer.classList.toggle('open', !isOpen);
    overlay.classList.toggle('open', !isOpen);
    if (!isOpen) renderDrawerItems();
}

function renderDrawerItems() {
    const el = document.getElementById('drawerItems');
    const foot = document.getElementById('drawerFoot');
    const title = document.getElementById('drawerTitle');
    if (!el) return;

    const count = cartCount();
    title.textContent = 'السلة' + (count ? ' (' + count + ' منتج)' : '');

    if (cart.length === 0) {
        foot.style.display = 'none';
        el.innerHTML = `
      <div class="cart-empty">
        <div class="empty-ico">🛒</div>
        <div class="empty-title">سلتك فارغة</div>
        <div class="empty-sub">أضف منتجات لتبدأ التسوق</div>
        <button class="btn btn-gold" style="margin-top:12px" onclick="toggleCartDrawer();navigateTo('home')">تصفح المنتجات</button>
      </div>`;
        return;
    }

    foot.style.display = 'block';
    document.getElementById('drawerTotal').textContent = cartTotal().toFixed(2);

    el.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="ci-img ${item.bgClass}" style="${item.image ? 'background-image:url(' + item.image + ');background-size:cover;background-position:center;font-size:0' : ''}">
        ${item.image ? '' : item.emoji}
      </div>
      <div class="ci-info">
        <div class="ci-name">${item.name}</div>
        <div class="ci-variant">${item.variant}</div>
        <div class="ci-price">${(item.price * item.qty).toFixed(2)} ريال</div>
        <div class="ci-controls">
          <button class="qty-btn" onclick="changeQty('${item.cartId}',-1)">−</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty('${item.cartId}',1)">+</button>
        </div>
      </div>
      <button class="ci-del" onclick="removeFromCart('${item.cartId}')">🗑</button>
    </div>
  `).join('');
}

/* ──────────────────────────────────────────────
   SEARCH
   ────────────────────────────────────────────── */
function toggleSearch() {
    const ov = document.getElementById('searchOv');
    const isOpen = ov.classList.contains('open');
    ov.classList.toggle('open', !isOpen);
    if (!isOpen) {
        setTimeout(() => document.getElementById('searchBig').focus(), 100);
    } else {
        document.getElementById('searchBig').value = '';
        document.getElementById('searchRes').innerHTML = '';
    }
}

function closeSearch(e) {
    if (e.target === document.getElementById('searchOv')) toggleSearch();
}

function doSearch(q) {
    const res = document.getElementById('searchRes');
    if (!q.trim()) { res.innerHTML = ''; return; }

    const matches = PRODUCTS.filter(p =>
        p.nameAr.includes(q) ||
        p.name.toLowerCase().includes(q.toLowerCase()) ||
        p.subcat.includes(q)
    ).slice(0, 8);

    if (matches.length === 0) {
        res.innerHTML = `<div class="no-results">لا توجد نتائج لـ "${q}"</div>`;
        return;
    }

    res.innerHTML = matches.map(p => `
    <div class="sr-item" onclick="toggleSearch();navigateTo('product','${p.slug}')">
      <div class="sr-ico ${p.bgClass}" style="${p.image ? 'background-image:url(' + p.image + ');background-size:cover;font-size:0' : ''}">${p.image ? '' : p.emoji}</div>
      <div>
        <div class="sr-nm">${p.nameAr}</div>
        <div class="sr-cat">${p.subcat}</div>
      </div>
      <div class="sr-price">من ${p.price} ريال</div>
    </div>
  `).join('');
}

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        const ov = document.getElementById('searchOv');
        if (ov.classList.contains('open')) toggleSearch();
    }
});

/* ──────────────────────────────────────────────
   TOAST NOTIFICATIONS
   ────────────────────────────────────────────── */
function showToast(msg, type = 'ok') {
    const wrap = document.getElementById('toastWrap');
    const toast = document.createElement('div');
    toast.className = 'toast ' + type;
    const icons = { ok: '✓', err: '✕', inf: 'ℹ' };
    toast.innerHTML = `<span>${icons[type] || '✓'}</span> ${msg}`;
    wrap.appendChild(toast);
    setTimeout(() => toast.remove(), 2800);
}

/* ──────────────────────────────────────────────
   ROUTER — نظام التنقل بين الصفحات
   ────────────────────────────────────────────── */
function navigateTo(page, param) {
    window.scrollTo(0, 0);

    // تحديث شريط التصنيفات
    document.querySelectorAll('.catnav-item').forEach(btn => {
        btn.classList.remove('act');
        if (btn.dataset.cat === page || btn.dataset.cat === param) {
            btn.classList.add('act');
        }
    });

    const app = document.getElementById('app');

    if (page === 'home') {
        document.querySelector('[data-cat="home"]').classList.add('act');
        app.innerHTML = renderHome();
        initHomeEvents();
    } else if (page === 'cat') {
        app.innerHTML = renderCategoryPage(param);
        initCatEvents(param);
    } else if (page === 'product') {
        app.innerHTML = renderProductPage(param);
        initProductEvents(param);
    } else if (page === 'cart') {
        app.innerHTML = renderCartPageHTML();
        renderCartPage();
        initCartPageEvents();
    }
}

/* ──────────────────────────────────────────────
   HELPERS
   ────────────────────────────────────────────── */
function productImage(p, extraStyle = '') {
    /* يعرض الصورة إذا وُجدت، وإلا يعرض الإيموجي */
    if (p.image) {
        return `style="background-image:url(${p.image});background-size:cover;background-position:center;${extraStyle}"`;
    }
    return `style="${extraStyle}"`;
}

function starRating(r) {
    return '★'.repeat(Math.round(r)) + '☆'.repeat(5 - Math.round(r));
}

function discountPct(price, orig) {
    return Math.round((1 - price / orig) * 100);
}

/* ──────────────────────────────────────────────
   HOME PAGE — الصفحة الرئيسية
   ────────────────────────────────────────────── */
function renderHome() {
    const games = PRODUCTS.filter(p => p.category === 'games');
    const subs = PRODUCTS.filter(p => p.category === 'subscriptions');
    const topSold = [...PRODUCTS].sort((a, b) => b.reviews - a.reviews).slice(0, 6);

    return `
 <div class="page-in">

  <!-- ══════════════════════════════════════════
       HERO — البانر الرئيسي (صورة فقط)
       ══════════════════════════════════════════ -->
  <div class="hero">
    <div class="hero-main">
      <img class="hero-img" src="images/banner.webp" onclick="navigateTo('cat','games')" />
      <!-- عدل الصورة من هنا ↑ -->
    </div>

    <div class="hero-side">
      <img class="side-banner" src="images/tappy.webp" onclick="navigateTo('cat','games')" />
      <!-- عدل الصورة من هنا ↑ -->

      <img class="side-banner" src="images/talebanner.webp" onclick="navigateTo('product','telegram-stars')" />
      <!-- عدل الصورة من هنا ↑ -->
    </div>
  </div>


  <!-- باقي الكود كما هو بدون تغيير -->
  <div class="section">
    <div class="section-hdr">
      <h2 class="section-title">⚡ شحن الألعاب</h2>
      <button class="see-all" onclick="navigateTo('cat','games')">عرض الكل ◄</button>
    </div>
    <div class="games-grid">
      ${games.map(p => `
        <div class="game-card ${p.bgClass}" ${p.image ? `style="background-image:url(${p.image});background-size:cover;background-position:center"` : ''} onclick="navigateTo('product','${p.slug}')">
          <div class="game-card-overlay"></div>
          ${p.badge ? `<div class="game-badge">${p.badge}</div>` : ''}
          <div class="game-fav">🤍</div>
          <button class="game-add" onclick="event.stopPropagation();addToCart(${p.id},'${p.variants[0].id}')">+</button>
          <div class="game-card-info">
            <div class="game-label" style="color:${p.accentColor}">${p.name}</div>
            <div class="game-sublbl">${p.subcat}</div>
            <div class="game-price">من ${p.price} ريال</div>
          </div>
        </div>
      `).join('')}
    </div>
  </div>


  <!-- ══════════════════════════════════════════
       بانر سبايدر — صورة فقط
       ══════════════════════════════════════════ -->
  <div class="section">
    <img class="full-banner" src="images/spiderbanner.webp" onclick="window.open('t.me/hitham_5','_blank')" />
    <!-- عدل الصورة من هنا ↑ -->
  </div>


  <!-- منصات الألعاب (بدون تغيير) -->
  <div class="section">
    <div class="section-hdr">
      <h2 class="section-title">🎯 منصات الألعاب</h2>
      <button class="see-all" onclick="navigateTo('cat','games')">عرض الكل ◄</button>
    </div>
    
    <div class="platforms-grid">
      ${PLATFORMS.map(pl => `
        <div class="platform-card ${pl.id}" onclick="navigateTo('cat','${pl.cat}')" style="cursor:pointer">
          <div class="plat-icon" style="background:transparent; padding:0; display:flex; align-items:center; justify-content:center;">
            <img src="${pl.img}" alt="${pl.name}" style="width: 42px; height: 42px; object-fit: contain;">
          </div>
          <div>
            <div class="plat-name">${pl.name}</div>
            <div class="plat-count">شاهد المنتجات ◄</div>
          </div>
        </div>
      `).join('')}
    </div>
  </div>

  <!-- ══════════════════════════════════════════
       الاشتراكات
       ══════════════════════════════════════════ -->
  <div class="section">
    <div class="section-hdr">
      <h2 class="section-title">📺 لا توقف مشاهدتك</h2>
      <button class="see-all" onclick="navigateTo('cat','subscriptions')">اكتشف المزيد ◄</button>
    </div>
    <div class="subs-grid">
      ${subs.map(p => {
        const badgeClass = p.badge === 'الأكثر مبيعاً' || p.badge === 'رائج' ? 'hot' : p.badge === 'جديد' ? 'new' : 'sale';
        return `
        <div class="sub-card" onclick="navigateTo('product','${p.slug}')">
          <div class="sub-hdr">
            <div class="sub-logo-img ${p.bgClass}" style="${p.image ? `background-image:url(${p.image});background-size:cover;font-size:0` : ''}">${p.image ? '' : p.emoji}</div>
            ${p.badge ? `<span class="sub-badge-pill ${badgeClass}">${p.badge}</span>` : ''}
          </div>
          <div class="sub-name">${p.nameAr}</div>
          <div class="sub-desc">${p.desc}</div>
          <div class="sub-foot">
            <div>
              <div class="sub-old">${p.originalPrice} ريال</div>
              <div class="sub-new">${p.price}</div>
              <div class="sub-cur">ريال سعودي</div>
            </div>
            <button class="add-btn" id="addBtn_${p.id}_${p.variants[0].id}"
              onclick="event.stopPropagation();handleSubAdd(${p.id},'${p.variants[0].id}')">+</button>
          </div>
        </div>`;
    }).join('')}
    </div>
  </div>

  <!-- ══════════════════════════════════════════
       بانر فوكس — صورة فقط
       ══════════════════════════════════════════ -->
  <div class="section">
    <img class="full-banner" src="images/fox.webp" onclick="navigateTo('cat','social')" />
    <!-- عدل الصورة من هنا ↑ -->
  </div>
    <!-- ══════════════════════════════════════════
         الاتصالات والإنترنت
         ══════════════════════════════════════════ -->
    <div class="section">
      <div class="section-hdr">
        <h2 class="section-title">📡 الاتصالات والإنترنت</h2>
        <button class="see-all" onclick="navigateTo('cat','telecom')">عرض الكل ◄</button>
      </div>
      <div class="telecom-grid">
        ${TELECOM.map(t => `
          <div class="telecom-card" style="border-color:${t.color}33" onclick="navigateTo('cat','telecom')">
            ${t.image
            ? `<img src="${t.image}" alt="${t.brand}" style="width:48px;height:32px;object-fit:contain">`
            : `<div class="telecom-logo" style="color:${t.color}">${t.name}</div>`
        }
            <div class="telecom-nm">${t.brand}</div>
            <div class="telecom-ct">شاهد المنتجات</div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- ══════════════════════════════════════════
         الأكثر مبيعاً
         ══════════════════════════════════════════ -->
    <div class="section">
      <div class="section-hdr">
        <h2 class="section-title">🏆 الأكثر مبيعاً</h2>
      </div>
      <div class="mostsold-grid">
        ${topSold.map((p, i) => {
            const rankClass = i === 0 ? 'r1' : i === 1 ? 'r2' : i === 2 ? 'r3' : 'rn';
            return `
          <div class="sold-card" onclick="navigateTo('product','${p.slug}')">
            <div class="sold-rank ${rankClass}">${i + 1}</div>
            <div class="sold-img ${p.bgClass}" ${p.image ? `style="background-image:url(${p.image});background-size:cover;background-position:center;font-size:0"` : ''}>
              ${p.image ? '' : p.emoji}
            </div>
            <div style="flex:1;min-width:0">
              <div class="sold-nm">${p.nameAr} — ${p.variants[0].name}</div>
              <div class="sold-sub">${p.subcat}</div>
              <div class="sold-price">${p.price} ريال</div>
            </div>
          </div>`;
        }).join('')}
      </div>
    </div>

    <!-- ══════════════════════════════════════════
         نقاط الولاء
         ══════════════════════════════════════════ -->
    <div class="section">
      <img class="full-banner" src="images/walla.webp" onclick="navigateTo('cat','social')" />
    </div>
    <!-- ══════════════════════════════════════════
         مميزات كارد زون
         ══════════════════════════════════════════ -->
    <div class="features">
      <div class="container features-in">
        ${[
            { ico: '⚡', title: 'سرعة إتمام الطلب', desc: 'استلم منتجك فورياً بعد إتمام الدفع' },
            { ico: '🛡️', title: 'أسعار لا تُضاهى', desc: 'عروض مستمرة وأسعار تنافسية' },
            { ico: '🎧', title: 'دعم فني 24/7', desc: 'فريق دعم متكامل سبعة أيام الأسبوع' },
            { ico: '✅', title: 'منتجات موثوقة 100%', desc: 'جميع منتجاتنا أصلية مع ضمان استرداد' },
        ].map(f => `
          <div class="feat">
            <div class="feat-ico">${f.ico}</div>
            <div class="feat-title">${f.title}</div>
            <div class="feat-desc">${f.desc}</div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- ══════════════════════════════════════════
         تحميل التطبيق
         ══════════════════════════════════════════ -->
    <div class="section">
      <img class="full-banner" src="images/phoneapp.webp" onclick="navigateTo('cat','social')" />
    </div>

    <!-- ══════════════════════════════════════════
         آراء العملاء
         ══════════════════════════════════════════ -->
    <div class="section">
      <div class="section-hdr"><h2 class="section-title">💬 آراء العملاء</h2></div>
      <div class="reviews-grid">
        ${REVIEWS.map(r => `
          <div class="review-card">
            <div class="rev-stars">★★★★★</div>
            <p class="rev-txt">"${r.text}"</p>
            <div class="rev-author">
              <div class="rev-avatar" style="background:${r.gradient};${r.letterColor ? 'color:' + r.letterColor : ''}">
                ${r.image ? `<img src="${r.image}" alt="${r.name}" style="width:100%;height:100%;object-fit:cover;border-radius:50%">` : r.letter}
              </div>
              <div>
                <div class="rev-name">${r.name}</div>
                <div class="rev-handle">${r.handle}</div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- ══════════════════════════════════════════
         وسائل الدفع
         ══════════════════════════════════════════ -->
    <div style="text-align:center;padding:28px 20px">
      <div style="font-size:13px;color:var(--text-sec);margin-bottom:14px">وسائل الدفع المتاحة</div>
      <div class="payments-row">
        ${['💳 VISA', '💳 Mastercard', '🍎 Apple Pay', '🟡 مدى', '📱 STC Pay', '💱 Urpay', '💱 Tether', '💳 Amex'].map(m =>
            `<div class="pay-chip">${m}</div>`
        ).join('')}
      </div>
    </div>

    <!-- ══════════════════════════════════════════
         FOOTER
         ══════════════════════════════════════════ -->
    ${renderFooter()}

  </div>`;
}

function initHomeEvents() {
    // لا يحتاج شيئاً — كل شيء في onclick
}

function handleSubAdd(productId, variantId) {
    addToCart(productId, variantId);
    const btn = document.getElementById(`addBtn_${productId}_${variantId}`);
    if (btn) {
        btn.textContent = '✓';
        btn.classList.add('done');
        setTimeout(() => { btn.textContent = '+'; btn.classList.remove('done'); }, 1400);
    }
}

/* ──────────────────────────────────────────────
   CATEGORY PAGE — صفحة التصنيف
   ────────────────────────────────────────────── */
const CAT_INFO = {
    games: { title: 'شحن الألعاب', icon: '🎮' },
    subscriptions: { title: 'الاشتراكات', icon: '📺' },
    social: { title: 'شبكات التواصل', icon: '💬' },
    software: { title: 'مكتبيات وأعمال', icon: '💻' },
    telecom: { title: 'الاتصالات', icon: '📡' },
};

function renderCategoryPage(cat) {
    const info = CAT_INFO[cat] || { title: 'جميع المنتجات', icon: '🏠' };
    const products = PRODUCTS.filter(p => p.category === cat);
    const subcats = ['all', ...new Set(products.map(p => p.subcat))];

    return `
  <div class="cat-page page-in">
    <button class="back-btn" onclick="navigateTo('home')">◄ العودة</button>
    <div class="cat-title-row">
      <h1 class="cat-big-title">${info.icon} ${info.title}</h1>
      <span class="cat-count" id="catCount">(${products.length} منتج)</span>
    </div>

    <div class="filter-bar">
      <span class="filter-lbl">تصنيف:</span>
      <div class="filter-chips" id="filterChips">
        ${subcats.map(s => `
          <button class="fc ${s === 'all' ? 'act' : ''}" data-filter="${s}" onclick="filterCat('${cat}','${s}')">
            ${s === 'all' ? 'الكل' : s}
          </button>
        `).join('')}
      </div>
      <div style="margin-right:auto;display:flex;align-items:center;gap:8px">
        <span class="filter-lbl">ترتيب:</span>
        <select class="sort-sel" id="sortSel" onchange="filterCat('${cat}','all')">
          <option value="popular">الأكثر مبيعاً</option>
          <option value="price-asc">السعر: الأقل أولاً</option>
          <option value="price-desc">السعر: الأعلى أولاً</option>
        </select>
      </div>
    </div>

    <div class="cat-grid" id="catGrid">
      ${renderCatCards(products)}
    </div>
  </div>`;
}

function filterCat(cat, selectedFilter) {
    // تحديث الأزرار
    document.querySelectorAll('.filter-chips .fc').forEach(btn => {
        btn.classList.toggle('act', btn.dataset.filter === selectedFilter);
    });

    let products = PRODUCTS.filter(p => p.category === cat);
    if (selectedFilter !== 'all') {
        products = products.filter(p => p.subcat === selectedFilter);
    }

    const sort = document.getElementById('sortSel')?.value || 'popular';
    if (sort === 'price-asc') products = [...products].sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') products = [...products].sort((a, b) => b.price - a.price);
    if (sort === 'popular') products = [...products].sort((a, b) => b.reviews - a.reviews);

    const grid = document.getElementById('catGrid');
    const count = document.getElementById('catCount');
    if (grid) grid.innerHTML = renderCatCards(products);
    if (count) count.textContent = `(${products.length} منتج)`;
}

function renderCatCards(products) {
    if (products.length === 0) {
        return `<div style="grid-column:1/-1;text-align:center;padding:60px;color:var(--text-sec)">
      <div style="font-size:48px;margin-bottom:12px">🔍</div>
      <div style="font-size:16px;font-weight:700">لا توجد منتجات في هذا التصنيف</div>
    </div>`;
    }
    return products.map(p => {
        const disc = discountPct(p.price, p.originalPrice);
        return `
    <div class="cat-pcard" onclick="navigateTo('product','${p.slug}')">
      <div class="cat-visual ${p.bgClass}" ${p.image ? `style="background-image:url(${p.image});background-size:cover;background-position:center;font-size:0"` : ''}>
        ${p.image ? '' : p.emoji}
        ${p.badge ? `<div class="cat-badge" style="background:rgba(245,197,24,.9);color:#0a0e1a">${p.badge}</div>` : disc > 0 ? `<div class="cat-badge" style="background:rgba(0,200,100,.9);color:white">خصم ${disc}%</div>` : ''}
      </div>
      <div class="cat-body">
        <div class="cat-pname">${p.nameAr}</div>
        <div class="cat-psub">${p.desc.substring(0, 50)}...</div>
        <div style="font-size:11px;color:var(--gold);margin-bottom:8px">${starRating(p.rating)} ${p.rating} (${p.reviews.toLocaleString()})</div>
        <div class="cat-pfoot">
          <div>
            <div style="font-size:11px;color:var(--text-sec);text-decoration:line-through">${p.originalPrice} ريال</div>
            <div class="cat-price">من ${p.price} ريال</div>
          </div>
          <button class="cat-add" onclick="event.stopPropagation();addToCart(${p.id},'${p.variants[0].id}')">+</button>
        </div>
      </div>
    </div>`;
    }).join('');
}

function initCatEvents(cat) { /* لا يحتاج */ }

/* ──────────────────────────────────────────────
   PRODUCT PAGE — صفحة المنتج
   ────────────────────────────────────────────── */
let selectedVariant = null;
let activeTab = 'desc';

function renderProductPage(slug) {
    const p = PRODUCTS.find(x => x.slug === slug);
    if (!p) return `
    <div style="text-align:center;padding:80px 20px">
      <div style="font-size:64px;margin-bottom:16px">😕</div>
      <h2 style="color:var(--text-sec);margin-bottom:12px">المنتج غير موجود</h2>
      <button class="btn btn-gold" onclick="navigateTo('home')">العودة للرئيسية</button>
    </div>`;

    selectedVariant = p.variants[0];
    activeTab = 'desc';

    const related = PRODUCTS.filter(x => x.category === p.category && x.id !== p.id).slice(0, 4);
    const disc = discountPct(selectedVariant.price, selectedVariant.orig);

    return `
  <div class="prod-page page-in">
    <button class="back-btn" onclick="history.back()">◄ العودة</button>
    <div class="prod-grid">

      <!-- الصورة/الفيجوال -->
      <div>
        <div class="prod-visual ${p.bgClass}" id="prodVisual"
          ${p.image ? `style="background-image:url(${p.image});background-size:cover;background-position:center;font-size:0"` : ''}>
          ${p.image ? '' : p.emoji}
          ${p.badge ? `<div class="game-badge" style="top:12px;right:12px;font-size:12px;padding:4px 12px">${p.badge}</div>` : ''}
        </div>

        <!-- منتجات مشابهة -->
        ${related.length > 0 ? `
        <div style="margin-top:20px">
          <div style="font-size:15px;font-weight:700;margin-bottom:12px">منتجات مشابهة</div>
          <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px">
            ${related.map(r => `
              <div class="related-card" onclick="navigateTo('product','${r.slug}')">
                <div class="${r.bgClass}" style="width:40px;height:40px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;${r.image ? `background-image:url(${r.image});background-size:cover;font-size:0` : ''}">
                  ${r.image ? '' : r.emoji}
                </div>
                <div>
                  <div style="font-size:12px;font-weight:700">${r.nameAr}</div>
                  <div style="font-size:11px;color:var(--gold)">${r.price} ريال</div>
                </div>
              </div>`).join('')}
          </div>
        </div>` : ''}
      </div>

      <!-- معلومات المنتج -->
      <div>
        <div class="prod-tags">
          <span class="prod-tag">${p.subcat}</span>
          <span class="prod-tag">${p.category === 'games' ? '🎮 ألعاب' : p.category === 'subscriptions' ? '📺 اشتراكات' : '💬 تواصل'}</span>
        </div>
        <h1 class="prod-name">${p.nameAr}</h1>
        <div class="prod-rating">
          <span class="prod-stars">${starRating(p.rating)}</span>
          <span style="color:var(--gold);font-size:14px;font-weight:700">${p.rating}</span>
          <span class="prod-reviews">(${p.reviews.toLocaleString()} تقييم)</span>
        </div>
        <p class="prod-desc">${p.desc}</p>

        <!-- اختيار الباقة -->
        ${p.variants.length > 1 ? `
        <div style="margin-bottom:20px">
          <div class="variants-label">اختر الباقة:</div>
          <div class="variants-grid" id="variantsGrid">
            ${p.variants.map((v, idx) => `
              <div class="variant-btn ${idx === 0 ? 'sel' : ''}" onclick="selectVariant('${p.slug}','${v.id}')">
                <div class="var-nm">${v.name}</div>
                <div class="var-p">${v.price} ريال</div>
                <div class="var-old">${v.orig} ريال</div>
              </div>`).join('')}
          </div>
        </div>` : ''}

        <!-- السعر وزر الشراء -->
        <div class="prod-action">
          <div class="final-price">
            <div class="fp-price" id="fpPrice">${selectedVariant.price} ريال</div>
            ${disc > 0 ? `<div class="fp-disc" id="fpDisc">خصم ${disc}%</div>` : '<div id="fpDisc"></div>'}
          </div>
          <div class="fp-old" id="fpOld">السعر الأصلي: ${selectedVariant.orig} ريال</div>
          <button class="prod-add-btn" id="prodAddBtn" onclick="handleProdAdd('${p.slug}')">
            🛒 أضف للسلة — ${selectedVariant.name}
          </button>
          <div class="prod-guarantees">
            <div class="prod-g">⚡ تسليم فوري</div>
            <div class="prod-g">🛡️ منتج أصلي</div>
            <div class="prod-g">↩️ ضمان استرداد</div>
          </div>
        </div>

        <!-- التبويبات -->
        <div class="prod-tabs">
          <button class="prod-tab act" onclick="switchTab('desc')">التفاصيل</button>
          <button class="prod-tab" onclick="switchTab('how')">كيفية الاستخدام</button>
          <button class="prod-tab" onclick="switchTab('faq')">الأسئلة الشائعة</button>
        </div>
        <ul class="tab-content" id="tabContent">
          <li>تسليم فوري إلكتروني بعد إتمام الدفع مباشرة</li>
          <li>منتج رسمي وأصلي 100% مضمون</li>
          <li>يعمل في جميع دول الخليج العربي</li>
          <li>دعم فني متكامل 24/7</li>
          <li>ضمان استرداد كامل في حالة أي مشكلة</li>
        </ul>
      </div>
    </div>
  </div>`;
}

function selectVariant(slug, variantId) {
    const p = PRODUCTS.find(x => x.slug === slug);
    if (!p) return;
    selectedVariant = p.variants.find(v => v.id === variantId);

    // تحديث التصميم
    document.querySelectorAll('.variant-btn').forEach(btn => btn.classList.remove('sel'));
    event.currentTarget.classList.add('sel');

    // تحديث السعر
    const disc = discountPct(selectedVariant.price, selectedVariant.orig);
    document.getElementById('fpPrice').textContent = selectedVariant.price + ' ريال';
    document.getElementById('fpOld').textContent = 'السعر الأصلي: ' + selectedVariant.orig + ' ريال';
    document.getElementById('fpDisc').textContent = disc > 0 ? 'خصم ' + disc + '%' : '';
    document.getElementById('prodAddBtn').textContent = '🛒 أضف للسلة — ' + selectedVariant.name;
}

function handleProdAdd(slug) {
    const p = PRODUCTS.find(x => x.slug === slug);
    if (!p || !selectedVariant) return;
    addToCart(p.id, selectedVariant.id);
    const btn = document.getElementById('prodAddBtn');
    btn.textContent = '✓ تمت الإضافة للسلة';
    btn.classList.add('done');
    setTimeout(() => {
        btn.textContent = '🛒 أضف للسلة — ' + selectedVariant.name;
        btn.classList.remove('done');
    }, 1400);
}

function switchTab(tab) {
    activeTab = tab;
    document.querySelectorAll('.prod-tab').forEach(t => t.classList.remove('act'));
    event.currentTarget.classList.add('act');

    const contents = {
        desc: ['تسليم فوري إلكتروني بعد إتمام الدفع مباشرة', 'منتج رسمي وأصلي 100% مضمون', 'يعمل في جميع دول الخليج العربي', 'دعم فني متكامل 24/7', 'ضمان استرداد كامل في حالة أي مشكلة'],
        how: ['أضف المنتج لسلة التسوق واختر الباقة المناسبة', 'أكمل عملية الدفع الآمنة بوسيلة الدفع المفضلة', 'استلم كود التفعيل فوراً على بريدك الإلكتروني', 'أدخل الكود داخل اللعبة أو التطبيق'],
        faq: ['هل الشحن فوري؟ نعم، خلال ثوانٍ من إتمام الدفع', 'هل يعمل في دولتي؟ نعم، يعمل في جميع دول الخليج', 'ما وسائل الدفع؟ VISA، Mastercard، Apple Pay، مدى، STC Pay وغيرها', 'كيف أتواصل مع الدعم؟ عبر واتساب أو تليجرام @Take_card0'],
    };

    document.getElementById('tabContent').innerHTML = (contents[tab] || []).map(t => `<li>${t}</li>`).join('');
}

function initProductEvents(slug) { /* لا يحتاج */ }

/* ──────────────────────────────────────────────
   CART PAGE — صفحة السلة
   ────────────────────────────────────────────── */
let couponApplied = false;

function renderCartPageHTML() {
    return `
  <div class="cartpage page-in">
    <div class="cartpage-title">🛒 سلة التسوق <span id="cartPageCount" style="font-size:16px;color:var(--text-sec);font-weight:500"></span></div>
    <div id="cartPageBody"></div>
  </div>`;
}

function renderCartPage() {
    const body = document.getElementById('cartPageBody');
    if (!body) return;

    if (cart.length === 0) {
        couponApplied = false;
        body.innerHTML = `
      <div style="text-align:center;padding:80px 20px">
        <div style="font-size:80px;opacity:.35;margin-bottom:18px">🛒</div>
        <h2 style="font-size:22px;font-weight:800;margin-bottom:8px;color:var(--text-sec)">سلتك فارغة</h2>
        <p style="font-size:14px;color:var(--text-muted);margin-bottom:22px">أضف بعض المنتجات الرائعة!</p>
        <button class="btn btn-gold" onclick="navigateTo('home')">تصفح المنتجات ◄</button>
      </div>`;
        return;
    }

    const total = cartTotal();
    const disc = couponApplied ? total * 0.1 : 0;
    const final = total - disc;
    const count = cartCount();

    document.getElementById('cartPageCount').textContent = '(' + count + ' منتج)';

    body.innerHTML = `
    <div class="cartpage-grid">
      <div class="cartpage-items">
        ${cart.map(item => `
          <div class="cp-item">
            <div class="cp-img ${item.bgClass}" ${item.image ? `style="background-image:url(${item.image});background-size:cover;font-size:0"` : ''}>
              ${item.image ? '' : item.emoji}
            </div>
            <div class="cp-info">
              <div class="cp-name">${item.name}</div>
              <div class="cp-variant">${item.variant}</div>
            </div>
            <div class="cp-actions">
              <button class="qty-btn" onclick="changeQty('${item.cartId}',-1)">−</button>
              <span class="qty-num">${item.qty}</span>
              <button class="qty-btn" onclick="changeQty('${item.cartId}',1)">+</button>
              <div class="cp-price">${(item.price * item.qty).toFixed(2)} ريال</div>
              <button class="del-btn" onclick="removeFromCart('${item.cartId}')">🗑</button>
            </div>
          </div>
        `).join('')}
        <div style="display:flex;justify-content:flex-end;margin-top:10px">
          <button onclick="clearCart()" style="background:none;border:1.5px solid var(--border);border-radius:8px;padding:8px 16px;color:var(--text-sec);font-size:13px;cursor:pointer;font-family:Cairo,sans-serif;transition:all .2s"
            onmouseover="this.style.borderColor='#ff4444';this.style.color='#ff4444'"
            onmouseout="this.style.borderColor='var(--border)';this.style.color='var(--text-sec)'">
            🗑 تفريغ السلة
          </button>
        </div>
      </div>

      <div class="summary-box">
        <div class="sum-title">ملخص الطلب</div>
        <div class="cs"><span>المجموع الفرعي</span><span>${total.toFixed(2)} ريال</span></div>
        ${couponApplied ? `<div class="cs" style="color:#00c864"><span>خصم كوبون 10%</span><span>-${disc.toFixed(2)} ريال</span></div>` : ''}
        <div class="cs"><span>الشحن</span><span style="color:#00c864">مجاني</span></div>
        <div class="cs big"><span>الإجمالي</span><span>${final.toFixed(2)} ريال</span></div>

        <div class="coupon-row">
          <input class="coupon-inp" id="couponInp" type="text" placeholder="كوبون الخصم..." ${couponApplied ? 'disabled' : ''} value="${couponApplied ? 'TAKECARD10' : ''}" />
          <button class="coupon-btn" onclick="applyCoupon()" ${couponApplied ? 'disabled' : ''}>${couponApplied ? '✓ مطبّق' : 'تطبيق'}</button>
        </div>
        ${!couponApplied ? `<div style="font-size:11px;color:var(--text-muted);margin-bottom:4px">جرّب كوبون: TAKECARD10</div>` : ''}

        <button class="cart-checkout" onclick="showToast('جاري معالجة طلبك... 🎉','ok')">
          إتمام الشراء الآمن 🔒
        </button>
        <div style="display:flex;gap:8px;margin-top:12px;justify-content:center">
          ${['💳', '🍎', '📱', '🟡'].map(i => `<span style="font-size:20px">${i}</span>`).join('')}
        </div>
      </div>
    </div>`;
}

function applyCoupon() {
    const val = document.getElementById('couponInp')?.value?.toUpperCase();
    if (val === 'TAKECARD10') {
        couponApplied = true;
        showToast('تم تطبيق خصم 10% ✓', 'ok');
    } else {
        showToast('كوبون غير صحيح', 'err');
    }
    renderCartPage();
}

function initCartPageEvents() { /* لا يحتاج */ }

/* ──────────────────────────────────────────────
   FOOTER
   ────────────────────────────────────────────── */
function renderFooter() {
    return `
  <footer>
    <div class="container footer-in">
      <div class="footer-brand">
        <div class="logo" style="margin-bottom:12px">
          <div class="logo-ico">C</div>
          <span class="logo-txt">كارد <span>زون</span></span>
        </div>
        <p>متجر "كارد زون" لبيع البطاقات الإلكترونية بجميع أنواعها، بأسعار مناسبة وخدمة عملاء 24 ساعة.</p>
        <div class="footer-social">
          ${['💬', '✈️', '🐦', '📸', '▶️', '👻'].map(e => `<a href="#" class="soc-btn">${e}</a>`).join('')}
        </div>
      </div>
      ${[
            { title: 'روابط مهمة', links: ['من نحن', 'الشروط والأحكام', 'نقاط الولاء', 'سياسة الاسترداد', 'الاقتراحات'] },
            { title: 'الألعاب', links: ['شحن PUBG Mobile', 'شحن Free Fire', 'شحن COD Mobile', 'شحن Genshin', 'شحن Fortnite'] },
            { title: 'الاشتراكات', links: ['PS Plus', 'Amazon Prime', 'Spotify Premium', 'Watch IT', 'Netflix'] },
            { title: 'تواصل معنا', links: ['📱 +968xxxxxxxx', '📧 info@take-card.com', '✈️ @Take_card0', '💬 @Take_card0'] },
        ].map(col => `
        <div class="footer-col">
          <h4>${col.title}</h4>
          <ul>${col.links.map(l => `<li><a href="#">${l}</a></li>`).join('')}</ul>
        </div>
      `).join('')}
    </div>
    <div class="footer-bot">
      <div class="footer-copy">© كارد زون 2025 | جميع الحقوق محفوظة — <a href="#">سياسة الخصوصية</a></div>
      <div class="trust-badges">
        <div class="trust-b"><span class="ok">✓</span> SSL محمي</div>
        <div class="trust-b"><span class="ok">✓</span> مرخص رسمياً</div>
        <div class="trust-b"><span class="ok">✓</span> دفع آمن 100%</div>
      </div>
    </div>
  </footer>`;
}

/* ──────────────────────────────────────────────
   INIT — تشغيل التطبيق
   ────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
    updateCartUI();
    navigateTo('home');

    // ربط مربع البحث في الـ Navbar
    const navInput = document.getElementById('searchInput');
    if (navInput) {
        navInput.addEventListener('focus', toggleSearch);
    }
});