import { SHOWCASE } from '../services/images.js';

// Text that scrolls across the strip under the hero
const MARQUEE = ['New drops every Friday', 'Free shipping over ₹999', 'Easy 7-day returns', 'Ask our AI stylist anything'];

export function renderHero(animate = false) {
  const strip = MARQUEE.map(text => `<span>${text}</span><span class="marquee-star">✦</span>`).join('');
  return `
  <section class="hero ${animate ? 'animate-in' : ''}">
    <div class="container hero-grid">
      <div class="hero-content">
        <div class="hero-badge">
          <span>✦ Drop 07 · 2026</span>
        </div>
        <h1 class="hero-title">Fits that <span class="hero-highlight">hit different.</span></h1>
        <p class="hero-desc">Streetwear, ethnic and everyday staples for men, women and kids. Can't decide? Ask the AI stylist.</p>
        <div class="hero-actions">
          <button class="btn btn-primary btn-lg" onclick="document.getElementById('shop').scrollIntoView({ behavior: 'smooth' })">Shop the drop →</button>
          <button class="btn btn-outline btn-lg" onclick="document.getElementById('chatToggle')?.click()">✦ Ask AI stylist</button>
        </div>
        <div class="hero-stats">
          <div class="hero-stat">
            <p>500+</p>
            <p>Styles live</p>
          </div>
          <div class="hero-stat">
            <p>₹299</p>
            <p>Starting price</p>
          </div>
          <div class="hero-stat">
            <p>24/7</p>
            <p>AI stylist</p>
          </div>
        </div>
      </div>
      <div class="hero-image-container">
        <div class="hero-image-bg"></div>
        <img src="${SHOWCASE.hero}" alt="Model in an oversized shirt and orange sunglasses" class="hero-image" />
        <img src="${SHOWCASE.heroSmall}" alt="Man in a yellow jacket" class="hero-image-small" />
        <span class="hero-sticker">🔥 Trending now</span>
      </div>
    </div>
    <div class="hero-decoration-1"></div>
    <div class="hero-decoration-2"></div>
  </section>
  <div class="marquee" aria-hidden="true">
    <div class="marquee-track">${strip}${strip}</div>
  </div>
`;
}
