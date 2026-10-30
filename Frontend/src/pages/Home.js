import { state } from '../services/state.js';
import { fetchProducts, sendChatMessage, addToCart } from '../services/api_v2.js';
import { renderHeader } from '../components/Header.js';
import { renderHero } from '../components/Hero.js';
import { renderChatbot } from '../components/Chatbot.js';
import { navigate } from '../router.js';
import { productImage, SHOWCASE } from '../services/images.js';

// "Shop by vibe" picture tiles
const VIBES = [
  { cat: 'women', label: 'Women', note: 'Sarees to sequins' },
  { cat: 'men', label: 'Men', note: 'Jackets, fits, staples' },
  { cat: 'kids', label: 'Kids', note: 'Tiny fits, big energy' },
];

// Play entry animations only when the product list changes,
// not when the chat opens or an item is added to the cart
let lastGridKey = null;

// Price range options shown in the filter bar
const PRICE_RANGES = [
  { label: 'All Prices', min: null, max: null },
  { label: 'Under ₹500',  min: null, max: 500 },
  { label: '₹500–₹1000',  min: 500,  max: 1000 },
  { label: '₹1000–₹2000', min: 1000, max: 2000 },
  { label: '₹2000–₹5000', min: 2000, max: 5000 },
  { label: 'Above ₹5000', min: 5000, max: null },
];

export async function renderHome() {
  const { min, max } = state.priceFilter;
  const data = await fetchProducts(state.currentCategory, min, max);
  state.products = data;

  const gridKey = `${state.currentCategory}|${min}|${max}`;
  const animateHero = lastGridKey === null;
  const animateGrid = gridKey !== lastGridKey;
  lastGridKey = gridKey;

  document.getElementById('app').innerHTML = `
    ${renderHeader()}
    ${renderHero(animateHero)}
    <section class="vibes container">
      <h2 class="section-title">Shop by vibe</h2>
      <div class="vibe-grid">
        ${VIBES.map(v => `
          <button class="vibe-tile ${state.currentCategory === v.cat ? 'active' : ''}" onclick="handleCatClick('${v.cat}')">
            <img src="${SHOWCASE[v.cat]}" alt="${v.label} collection" loading="lazy" />
            <span class="vibe-label">${v.label}<small>${v.note}</small></span>
          </button>
        `).join('')}
      </div>
    </section>
    <div class="products-section container" id="shop">
      <h2 class="section-title">Fresh drops <span class="section-count">${state.products.length} styles</span></h2>

      <!-- Price Range Filter Bar -->
      <div class="price-filter-bar" id="price-filter-container">
        ${PRICE_RANGES.map((r, i) => {
          const isActive = state.priceFilter.min === r.min && state.priceFilter.max === r.max;
          return `<button
            class="price-filter-btn ${isActive ? 'active' : ''}"
            data-min="${r.min ?? ''}"
            data-max="${r.max ?? ''}"
          >${r.label}</button>`;
        }).join('')}
      </div>

      <div class="products-grid ${animateGrid ? 'animate-in' : ''}">
        ${state.products.length === 0
          ? `<p class="empty-state">No fits in this range yet. Try another filter.</p>`
          : state.products.map((p, i) => `
            <div class="product-card" data-id="${p.id}" style="--i: ${Math.min(i, 12)}">
              <div class="product-image">
                <img src="${productImage(p)}" alt="${p.name}" loading="lazy" />
                <span class="product-category">${p.category}</span>
              </div>
              <div class="product-info">
                <h3 class="product-name">${p.name}</h3>
                <p class="product-desc">${p.description}</p>
                <div class="product-footer">
                  <span class="product-price">₹${p.price}</span>
                  <span class="product-rating">★ ${p.rating}</span>
                </div>
                <button class="add-to-cart-btn" data-id="${p.id}">Add to Cart</button>
              </div>
            </div>
          `).join('')}
      </div>
    </div>
    ${renderChatbot()}
  `;

  setupHomeEvents();
}

/** Called by navbar buttons and inline onclick attributes */
window.handleCatClick = async function(cat) {
  state.currentCategory = cat;
  state.priceFilter = { min: null, max: null }; // reset price filter on category change
  // From the cart or a product page, go back to the store first
  if (window.location.hash && window.location.hash !== '#/') {
    window.location.hash = '#/';
    return;
  }
  await renderHome();
  document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
};

function setupHomeEvents() {
  // Highlight active nav button
  document.querySelectorAll('.nav-link').forEach(btn => {
    btn.classList.remove('active');
    if (btn.textContent.toLowerCase() === (state.currentCategory || 'all')) {
      btn.classList.add('active');
    }
  });

  // Price filter buttons
  document.querySelectorAll('#price-filter-container .price-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const min = btn.dataset.min !== '' ? Number(btn.dataset.min) : null;
      const max = btn.dataset.max !== '' ? Number(btn.dataset.max) : null;
      state.priceFilter = { min, max };
      renderHome();
    });
  });

  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', async (e) => {
      if (e.target.classList.contains('add-to-cart-btn')) {
        e.stopPropagation();
        
        try {
          const product = state.products.find(p => p.id === card.dataset.id || String(p.id) === card.dataset.id) || { name: 'Unknown Product' };
          e.target.disabled = true;
          e.target.textContent = 'Adding...';
          
          await addToCart(state.sessionId, product.name, 1);
          
          state.cartItemCount++;
          e.target.textContent = 'Added! ✅';
          setTimeout(() => {
            renderHome();
          }, 1000);
        } catch (err) {
          console.error('Failed to add to cart:', err);
          alert('Failed to add to cart.');
          e.target.disabled = false;
          e.target.textContent = 'Add to Cart';
        }
      } else {
        navigate(`#/product/${card.dataset.id}`);
      }
    });
  });

  // Chatbot toggle
  document.getElementById('chatToggle')?.addEventListener('click', () => {
    state.chatOpen = !state.chatOpen;
    renderHome();
  });

  document.getElementById('chatSend')?.addEventListener('click', handleChatSend);
  document.getElementById('chatInput')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleChatSend();
  });

  document.querySelectorAll('.product-recommendation').forEach(el => {
    el.addEventListener('click', () => navigate(`#/product/${el.dataset.id}`));
  });

  // Keep the latest chat message in view
  const chatBox = document.querySelector('.chatbot-messages');
  if (chatBox) chatBox.scrollTop = chatBox.scrollHeight;
}

async function handleChatSend() {
  const input = document.getElementById('chatInput');
  state.chatInput = input.value;
  if (!state.chatInput) return;

  state.chatMessages = [...state.chatMessages, { sender: 'user', text: state.chatInput }];
  state.chatLoading = true;
  renderHome();

  try {
    const data = await sendChatMessage(state.chatInput);
    state.chatMessages = [...state.chatMessages, {
      sender: 'bot',
      type: data.type,
      data: data.data,
      message: data.message
    }];
  } catch (err) {
    console.error(err);
  } finally {
    state.chatLoading = false;
    state.chatInput = '';
    renderHome();
  }
}
