/* ================================================================
   auth.js — نظام تسجيل الدخول والحسابات
   ================================================================
   يعتمد على localStorage — لا يحتاج سيرفر
   ================================================================ */

/* ──────────────────────────────────────────────
   STATE
   ────────────────────────────────────────────── */
let currentUser = JSON.parse(localStorage.getItem('tc_user') || 'null');

/* ──────────────────────────────────────────────
   HELPERS
   ────────────────────────────────────────────── */
function getUsers() {
  return JSON.parse(localStorage.getItem('tc_users') || '[]');
}
function saveUsers(users) {
  localStorage.setItem('tc_users', JSON.stringify(users));
}
function setCurrentUser(user) {
  currentUser = user;
  localStorage.setItem('tc_user', JSON.stringify(user));
  updateAuthUI();
}
function logout() {
  currentUser = null;
  localStorage.removeItem('tc_user');
  updateAuthUI();
  showToast('تم تسجيل الخروج', 'inf');
  closeAuthModal();
}
function isLoggedIn() {
  return currentUser !== null;
}

/* ──────────────────────────────────────────────
   UPDATE NAVBAR حسب حالة الدخول
   ────────────────────────────────────────────── */
function updateAuthUI() {
  const loginBtn  = document.getElementById('loginBtn');
  const registerBtn = document.getElementById('registerBtn');
  const userMenu  = document.getElementById('userMenu');
  const userNameEl = document.getElementById('userNameDisplay');

  if (!loginBtn) return;

  if (currentUser) {
    loginBtn.style.display    = 'none';
    registerBtn.style.display = 'none';
    userMenu.style.display    = 'flex';
    if (userNameEl) userNameEl.textContent = currentUser.name.split(' ')[0];
  } else {
    loginBtn.style.display    = '';
    registerBtn.style.display = '';
    userMenu.style.display    = 'none';
  }
}

/* ──────────────────────────────────────────────
   MODAL OPEN / CLOSE
   ────────────────────────────────────────────── */
function openAuthModal(tab = 'login') {
  document.getElementById('authModal').classList.add('open');
  document.getElementById('authOverlay').classList.add('open');
  switchAuthTab(tab);
}
function closeAuthModal() {
  document.getElementById('authModal').classList.remove('open');
  document.getElementById('authOverlay').classList.remove('open');
  document.getElementById('authError').textContent = '';
}
function switchAuthTab(tab) {
  document.getElementById('authError').textContent = '';
  document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('act'));
  document.querySelector(`.auth-tab[data-tab="${tab}"]`).classList.add('act');
  document.getElementById('loginForm').style.display   = tab === 'login'    ? 'flex' : 'none';
  document.getElementById('registerForm').style.display = tab === 'register' ? 'flex' : 'none';
}

/* ──────────────────────────────────────────────
   REGISTER
   ────────────────────────────────────────────── */
function doRegister() {
  const name  = document.getElementById('regName').value.trim();
  const email = document.getElementById('regEmail').value.trim().toLowerCase();
  const pass  = document.getElementById('regPass').value;
  const pass2 = document.getElementById('regPass2').value;
  const err   = document.getElementById('authError');

  if (!name || !email || !pass) { err.textContent = 'يرجى ملء جميع الحقول'; return; }
  if (pass.length < 6)          { err.textContent = 'كلمة المرور 6 أحرف على الأقل'; return; }
  if (pass !== pass2)           { err.textContent = 'كلمتا المرور غير متطابقتين'; return; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { err.textContent = 'البريد الإلكتروني غير صحيح'; return; }

  const users = getUsers();
  if (users.find(u => u.email === email)) { err.textContent = 'هذا البريد مسجّل مسبقاً'; return; }

  const user = { id: Date.now(), name, email, pass, createdAt: new Date().toISOString() };
  users.push(user);
  saveUsers(users);
  setCurrentUser({ id: user.id, name, email });
  closeAuthModal();
  showToast(`مرحباً ${name}! تم إنشاء حسابك ✓`, 'ok');
}

/* ──────────────────────────────────────────────
   LOGIN
   ────────────────────────────────────────────── */
function doLogin() {
  const email = document.getElementById('loginEmail').value.trim().toLowerCase();
  const pass  = document.getElementById('loginPass').value;
  const err   = document.getElementById('authError');

  if (!email || !pass) { err.textContent = 'يرجى ملء جميع الحقول'; return; }

  const users = getUsers();
  const user  = users.find(u => u.email === email && u.pass === pass);
  if (!user) { err.textContent = 'البريد أو كلمة المرور غير صحيحة'; return; }

  setCurrentUser({ id: user.id, name: user.name, email: user.email });
  closeAuthModal();
  showToast(`أهلاً ${user.name}! 👋`, 'ok');
}

/* ──────────────────────────────────────────────
   AUTH MODAL HTML — يُحقن في index.html مرة واحدة
   ────────────────────────────────────────────── */
function injectAuthModal() {
  if (document.getElementById('authModal')) return;
  document.body.insertAdjacentHTML('beforeend', `

    <!-- overlay -->
    <div class="auth-overlay" id="authOverlay" onclick="closeAuthModal()"></div>

    <!-- modal -->
    <div class="auth-modal" id="authModal">
      <div class="auth-modal-hdr">
        <div class="logo">
          <div class="logo-ico">T</div>
          <span class="logo-txt">تيك <span>كارد</span></span>
        </div>
        <button class="drawer-close" onclick="closeAuthModal()">✕</button>
      </div>

      <!-- tabs -->
      <div class="auth-tabs">
        <button class="auth-tab act" data-tab="login"    onclick="switchAuthTab('login')">تسجيل الدخول</button>
        <button class="auth-tab"    data-tab="register"  onclick="switchAuthTab('register')">إنشاء حساب</button>
      </div>

      <!-- error -->
      <div class="auth-error" id="authError"></div>

      <!-- LOGIN FORM -->
      <div class="auth-form" id="loginForm" style="display:flex">
        <label class="auth-label">البريد الإلكتروني</label>
        <input class="auth-input" id="loginEmail" type="email" placeholder="example@email.com" />

        <label class="auth-label">كلمة المرور</label>
        <input class="auth-input" id="loginPass" type="password" placeholder="••••••••"
               onkeydown="if(event.key==='Enter') doLogin()" />

        <button class="auth-submit" onclick="doLogin()">تسجيل الدخول</button>
        <p class="auth-switch">ما عندك حساب؟
          <span onclick="switchAuthTab('register')">إنشاء حساب جديد</span>
        </p>
      </div>

      <!-- REGISTER FORM -->
      <div class="auth-form" id="registerForm" style="display:none">
        <label class="auth-label">الاسم الكامل</label>
        <input class="auth-input" id="regName" type="text" placeholder="محمد أحمد" />

        <label class="auth-label">البريد الإلكتروني</label>
        <input class="auth-input" id="regEmail" type="email" placeholder="example@email.com" />

        <label class="auth-label">كلمة المرور</label>
        <input class="auth-input" id="regPass" type="password" placeholder="6 أحرف على الأقل" />

        <label class="auth-label">تأكيد كلمة المرور</label>
        <input class="auth-input" id="regPass2" type="password" placeholder="••••••••"
               onkeydown="if(event.key==='Enter') doRegister()" />

        <button class="auth-submit" onclick="doRegister()">إنشاء الحساب</button>
        <p class="auth-switch">عندك حساب؟
          <span onclick="switchAuthTab('login')">تسجيل الدخول</span>
        </p>
      </div>
    </div>
  `);
}

/* تشغيل عند تحميل الصفحة */
document.addEventListener('DOMContentLoaded', () => {
  injectAuthModal();
  updateAuthUI();
});
