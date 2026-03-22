/* ══════════════════════════════
   Noble 知識書店 — 共用模板
   template.js · 導覽列 + 設定面板 + 頁尾
══════════════════════════════ */

(function () {

  /* ── 判斷當前頁面，用來標記 active 導覽連結 ── */
  const path = window.location.pathname.split('/').pop() || 'index.html';
  const isFinance = path.startsWith('finance');
  const isBook    = path.startsWith('book');
  const isAbout   = path === 'about.html';

  /* ── 導覽列 HTML ── */
  const navHTML = `
<div id="reading-bar"></div>
<nav>
  <a href="index.html" class="logo">📚 Noble 的<span>閱讀</span>與思考</a>
  <ul class="nav-links">
    <li><a href="index.html" ${!isFinance && !isBook && !isAbout ? 'class="active"' : ''}>書架</a></li>
    <li><a href="finance.html" ${isFinance ? 'class="active"' : ''}>財商專區</a></li>
    <li><a href="about.html" ${isAbout ? 'class="active"' : ''}>關於 Noble</a></li>
    <li><button class="settings-btn" onclick="toggleSettings()">⚙️ 閱讀設定</button></li>
  </ul>
</nav>`;

  /* ── 設定面板 HTML ── */
  const panelHTML = `
<div class="settings-panel" id="sp">
  <div class="setting-group">
    <div class="setting-label">字型</div>
    <div class="ctrl-btns">
      <button class="ctrl-btn font-btn active" data-font="Noto Serif TC" onclick="setFont('Noto Serif TC',this)">明體</button>
      <button class="ctrl-btn font-btn" data-font="Noto Sans TC" onclick="setFont('Noto Sans TC',this)">黑體</button>
    </div>
  </div>
  <div class="setting-group">
    <div class="setting-label">背景</div>
    <div class="ctrl-btns">
      <button class="ctrl-btn theme-btn theme-day active" data-theme="" onclick="setTheme('',this)">☀️ 日間</button>
      <button class="ctrl-btn theme-btn theme-night" data-theme="night" onclick="setTheme('night',this)">🌙 夜間</button>
      <button class="ctrl-btn theme-btn theme-eye" data-theme="eye" onclick="setTheme('eye',this)">🌿 護眼</button>
    </div>
  </div>
</div>`;

  /* ── 頁尾 HTML ── */
  const footerHTML = `
<footer>
  <p>© 2025 <span>Noble 的閱讀與思考</span> · 知識書店 · 用閱讀對抗遺忘，用分享創造價值</p>
</footer>`;

  /* ── 插入到頁面 ── */
  document.addEventListener('DOMContentLoaded', function () {
    // 導覽列 + 設定面板插入到 body 最前面
    document.body.insertAdjacentHTML('afterbegin', navHTML + panelHTML);

    // 頁尾插入到 body 最後面
    document.body.insertAdjacentHTML('beforeend', footerHTML);
  });

})();
