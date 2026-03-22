/* Noble 知識書店 — reader.js */
/* 只保留閱讀進度條 */

window.addEventListener('scroll', function() {
  const bar = document.getElementById('reading-bar');
  if (!bar) return;
  const total = document.documentElement.scrollHeight - window.innerHeight;
  bar.style.width = (total > 0 ? window.scrollY / total * 100 : 0) + '%';
});
