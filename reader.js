/* ══════════════════════════════
   Noble 知識書店 — 電子書閱讀器
   reader.js · 全站共用功能 v3
══════════════════════════════ */

(function () {

  /* ── 從 localStorage 讀取上次的設定 ── */
  const saved = {
    fs:    localStorage.getItem('noble-fs')    || '16',
    lh:    localStorage.getItem('noble-lh')    || '2.1',
    font:  localStorage.getItem('noble-font')  || 'Noto Serif TC',
    theme: localStorage.getItem('noble-theme') || '',
  };

  /* ── 字型 style 標籤 ── */
  const fontTag = document.createElement('style');
  document.head.appendChild(fontTag);

  /* ── 字體大小 style 標籤 ── */
  const fsTag = document.createElement('style');
  document.head.appendChild(fsTag);

  /* ── 套用字體大小：只針對內文，不動版面 ── */
  function applyFs(v) {
    // 只改這些內文 class，不碰 rem 版面
    fsTag.textContent = `
      .prose p,
      .article-lede,
      .point-text,
      .concept-body,
      .link-desc,
      .quote-item p,
      .summary p,
      .about-wrap p,
      .page-desc,
      .article-desc { font-size: ${v}px !important; line-height: ${saved.lh} !important; }
    `;
  }

  /* ── 套用所有設定到頁面 ── */
  function applyAll() {
    // 行距
    document.documentElement.style.setProperty('--lh', saved.lh);
    // 主題
    if (saved.theme) document.body.classList.add(saved.theme);
    // 字型
    if (saved.font !== 'Noto Serif TC') {
      fontTag.textContent = `body, body * { font-family: '${saved.font}', sans-serif !important; }`;
    }
    // 字體大小
    applyFs(parseInt(saved.fs));
    // 更新 UI
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

  /* ── 字體大小 ── */
  window.setFs = function(v) {
    v = Math.min(22, Math.max(13, parseInt(v)));
    saved.fs = String(v);
    localStorage.setItem('noble-fs', saved.fs);
    applyFs(v);
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
    // 行距改變時也重新套用字體大小（因為 line-height 一起寫在 fsTag 裡）
    applyFs(parseInt(saved.fs));
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
