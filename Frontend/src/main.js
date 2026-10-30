import { router } from './router.js';
import { FALLBACK_IMAGE } from './services/images.js';

// Initialize application - listen for hash changes to navigate pages
window.addEventListener('hashchange', router);

// If any product photo fails to load, show a fallback photo instead of a broken image
document.addEventListener('error', (e) => {
  const img = e.target;
  if (img.tagName === 'IMG' && !img.dataset.fallback) {
    img.dataset.fallback = 'true';
    img.src = FALLBACK_IMAGE;
  }
}, true);

window.addEventListener('DOMContentLoaded', () => {
  // Kick off the router immediately on page load
  router();
});