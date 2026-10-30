import { state } from '../services/state.js';
import { productImage } from '../services/images.js';

export function renderChatbot() {
  const { chatOpen, chatLoading, chatMessages, chatInput } = state;
  return `
  <div class="chatbot-container">
    ${chatOpen ? `
    <div class="chatbot-window">
      <div class="chatbot-header">
        <span>✦ AI stylist</span>
        <small>Ask for fits, colours or budgets</small>
      </div>
      <div class="chatbot-messages">
        ${chatMessages.length === 0 ? `
          <div class="message message-bot">
            <p>Hey! Tell me what you're looking for, like "black hoodie under ₹2000" or "kurti for a wedding".</p>
          </div>
        ` : ''}
        ${chatMessages.map(msg => {
          if (msg.sender === 'user') {
            return `
            <div class="message message-user">
              <p>${msg.text}</p>
            </div>
            `;
          } else if (msg.type === 'text') {
            return `
            <div class="message message-bot">
              <p>${msg.message}</p>
            </div>
            `;
          } else if (msg.type === 'products') {
            return `
            <div class="message message-bot">
              ${msg.message ? `<p class="message-note">${msg.message}</p>` : ''}
              ${msg.data && msg.data.length === 0 ? '<p class="message-note">No products found 😢</p>' : ''}
              ${msg.data && msg.data.length > 0 ? `
              <div class="message-products">
                ${msg.data.map(p => `
                <div class="product-recommendation" data-id="${p.id}">
                  <img src="${productImage(p)}" alt="${p.name}" />
                  <p>${p.name}</p>
                  <p class="price">₹${p.price}</p>
                </div>
                `).join('')}
              </div>
              ` : ''}
            </div>
            `;
          }
          return '';
        }).join('')}
        ${chatLoading ? '<p class="chatbot-typing" aria-label="Typing"><span></span><span></span><span></span></p>' : ''}
      </div>
      <div class="chatbot-input">
        <input type="text" id="chatInput" value="${chatInput}" placeholder="Ask about products..." />
        <button id="chatSend">Send</button>
      </div>
    </div>
    ` : ''}
    <button id="chatToggle" class="chatbot-toggle">${chatOpen ? '✕ Close' : '✦ Ask AI'}</button>
  </div>
`;
}
