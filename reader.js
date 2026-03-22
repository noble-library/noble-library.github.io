/* ══════════════════════════════
   Noble 知識書店 — 閱讀器
   reader.js · 精簡版
══════════════════════════════ */

(function () {

  const saved = {
    theme: localStorage.getItem('noble-theme') || '',
    font:  localStorage.getItem('noble-font')  || 'Noto Serif TC',
  };

  const fontTag = document.createElement('style');
  document.head.appendChild(fontTag);

  function applyAll() {
    if (saved.theme) document.body.classList.add(saved.theme);
    if (saved.font !== 'Noto Serif TC') {
      fontTag.textContent = `body, body * { font-family: '${saved.font}', sans-serif !important; }`;
    }
    document.querySelectorAll('.font-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.font === saved.font);
    });
    document.querySelectorAll('.theme-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.theme === saved.theme);
    });
  }

  /* ── 字型 ── */
  window.setFont = function(f, btn) {
    saved.font = f;
    localStorage.setItem('noble-font', f);
    fontTag.textContent = f !== 'Noto Serif TC'
      ? `body, body * { font-family: '${f}', sans-serif !important; }`
      : '';
    document.querySelectorAll('.font-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
  };

  /* ── 主題 ── */
  window.setTheme = function(cls, btn) {
    document.body.classList.remove('night', 'eye');
    if (cls) document.body.classList.add(cls);
    saved.theme = cls;
    localStorage.setItem('noble-theme', cls);
    document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
  };

  /* ── 設定面板開關 ── */
  window.toggleSettings = function() {
    const sp = document.getElementById('sp');
    if (sp) sp.classList.toggle('open');
  };

  document.addEventListener('click', function(e) {
    const sp = document.getElementById('sp');
    if (!sp) return;
    if (!sp.contains(e.target) && !e.target.closest('.settings-btn')) {
      sp.classList.remove('open');
    }
  });

  /* ── 閱讀進度條 ── */
  window.addEventListener('scroll', function() {
    const bar = document.getElementById('reading-bar');
    if (!bar) return;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (total > 0 ? window.scrollY / total * 100 : 0) + '%';
  });

  document.addEventListener('DOMContentLoaded', applyAll);

})();
