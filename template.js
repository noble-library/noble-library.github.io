/* Noble 知識書店 — template.js */
/* 共用導覽列 + 頁尾，無閱讀設定面板 */

(function () {

  const path = window.location.pathname.split('/').pop() || 'index.html';
  const isFinance = path.startsWith('finance');
  const isAbout   = path === 'about.html';

  const navHTML = `
<div id="reading-bar"></div>
<nav>
  <a href="index.html" class="logo">📚 Noble 的<span>閱讀</span>與思考</a>
  <ul class="nav-links">
    <li><a href="index.html" ${!isFinance && !isAbout ? 'class="active"' : ''}>書架</a></li>
    <li><a href="finance.html" ${isFinance ? 'class="active"' : ''}>財商專區</a></li>
    <li><a href="about.html" ${isAbout ? 'class="active"' : ''}>關於 Noble</a></li>
  </ul>
</nav>`;

  const footerHTML = `
<footer>
  <p>© 2025 <span>Noble 的閱讀與思考</span> · 知識書店 · 用閱讀對抗遺忘，用分享創造價值</p>
</footer>`;

  document.addEventListener('DOMContentLoaded', function () {
    document.body.insertAdjacentHTML('afterbegin', navHTML);
    document.body.insertAdjacentHTML('beforeend', footerHTML);
  });

})();
