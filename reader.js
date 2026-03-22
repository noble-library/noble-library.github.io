/* ══════════════════════════════
   Noble 知識書店 — 電子書閱讀器
   reader.js · 全站共用功能
══════════════════════════════ */

(function () {

  /* ── 從 localStorage 讀取上次的設定 ── */
  const saved = {
    fs:    localStorage.getItem('noble-fs')    || '16',
    lh:    localStorage.getItem('noble-lh')    || '2.1',
    font:  localStorage.getItem('noble-font')  || 'Noto Serif TC',
    theme: localStorage.getItem('noble-theme') || '',
  };

  /* ── 套用設定到頁面 ── */
  function applyAll() {
    const r = document.documentElement;
    r.style.setProperty('--fs',   saved.fs + 'px');
    r.style.setProperty('--lh',   saved.lh);
    if (saved.theme) document.body.classList.add(saved.theme);

    // 字型注入
    fontTag.textContent = saved.font !== 'Noto Serif TC'
      ? `body, body * { font-family: '${saved.font}', sans-serif !important; }`
      : '';

    // 更新 UI 狀態
    const fsl = document.getElementById('fsl');
    const fsv = document.getElementById('fsv');
    if (fsl) fsl.value = saved.fs;
    if (fsv) fsv.textContent = saved.fs + 'px';

    // 行距按鈕
    document.querySelectorAll('.lh-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.lh === saved.lh);
    });

    // 字型按鈕
    document.querySelectorAll('.font-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.font === saved.font);
    });

    // 主題按鈕
    document.querySelectorAll('.theme-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.theme === saved.theme);
    });
  }

  /* ── 字型 style 標籤 ── */
  const fontTag = document.createElement('style');
  document.head.appendChild(fontTag);

  /* ── 字體大小 ── */
  window.setFs = function(v) {
    v = Math.min(22, Math.max(13, parseInt(v)));
    saved.fs = String(v);
    localStorage.setItem('noble-fs', saved.fs);
    // 同時設定 CSS 變數和 body 的 font-size
    document.documentElement.style.setProperty('--fs', v + 'px');
    document.body.style.fontSize = v + 'px';
    const fsl = document.getElementById('fsl');
    const fsv = document.getElementById('fsv');
    if (fsl) fsl.value = v;
    if (fsv) fsv.textContent = v + 'px';
  };
  window.chgFs = function(d) {
    setFs(parseInt(saved.fs) + d);
  };

  /* ── 行距 ── */
  window.setLh = function(v, btn) {
    saved.lh = String(v);
    localStorage.setItem('noble-lh', saved.lh);
    document.documentElement.style.setProperty('--lh', v);
    document.querySelectorAll('.lh-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
  };

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

  /* ── 點外部關閉設定面板 ── */
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

  /* ── 頁面載入時套用設定 ── */
  document.addEventListener('DOMContentLoaded', applyAll);

})();
