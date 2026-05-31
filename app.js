// Quantum Rigs E-Commerce Application Engine

// --- STATE MANAGEMENT ---
let cart = JSON.parse(localStorage.getItem('qr_cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('qr_wishlist')) || [];
let builderConfig = {
  cpus: null,
  coolers: null,
  motherboards: null,
  gpus: null,
  ram: null,
  storage: null,
  cases: null,
  psus: null
};

let activeView = 'home';
let selectedProductDetails = null;
let appliedCoupon = null;
const COUPONS = {
  'QUANTUM10': 0.10, // 10% off
  'CYBERRUSH': 0.15, // 15% off
  'RIGBUILDER': 50.00 // Flat $50 off
};

// --- ROUTER & VIEW INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
  initRouter();
  initShopFilters();
  initPCBuilder();
  initCartAndCheckout();
  renderFeaturedProducts();
  updateCartBadge();
  updateWishlistBadge();
  
  // Scrolled header effect
  window.addEventListener('scroll', () => {
    const header = document.getElementById('main-header');
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Global search trigger
  const searchInput = document.getElementById('global-search');
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim();
    if (query.length > 0) {
      navigateTo('shop');
      // Apply search query filter
      document.querySelectorAll('.cat-filter').forEach(c => c.checked = false);
      renderShopCatalog(query);
    } else {
      renderShopCatalog();
    }
  });
  
  // Render Lucide Icons
  lucide.createIcons();
});

// Simple Router
function initRouter() {
  const navLinks = document.querySelectorAll('nav a, #nav-logo');
  
  const handleRouting = () => {
    const hash = window.location.hash || '#home';
    const viewName = hash.replace('#', '');
    
    // Validate view
    const targetSection = document.getElementById(`view-${viewName}`);
    if (targetSection) {
      // Toggle views
      document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));
      targetSection.classList.add('active');
      
      // Update nav link active states
      document.querySelectorAll('nav a').forEach(link => {
        if (link.getAttribute('href') === hash) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
      
      activeView = viewName;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      // Run view-specific rendering updates
      if (viewName === 'shop') {
        renderShopCatalog();
      } else if (viewName === 'builder') {
        renderPCBuilderRows();
      } else if (viewName === 'cart') {
        renderCartView();
      }
    }
  };

  window.addEventListener('hashchange', handleRouting);
  // Trigger on initial page load
  if (window.location.hash) {
    handleRouting();
  }

  // Bind Home View CTA Buttons
  document.getElementById('hero-btn-builder').addEventListener('click', () => navigateTo('builder'));
  document.getElementById('hero-btn-shop').addEventListener('click', () => navigateTo('shop'));
  document.getElementById('home-view-all-btn').addEventListener('click', () => navigateTo('shop'));
  document.getElementById('header-cart').addEventListener('click', () => navigateTo('cart'));
  document.getElementById('header-wishlist').addEventListener('click', () => {
    navigateTo('shop');
    // Filter to wishlist items
    renderShopCatalog(null, true);
    showToast('Showing your Wishlist items', 'info');
  });
}

function navigateTo(viewName) {
  window.location.hash = `#${viewName}`;
}

// --- UTILITY: TOAST NOTIFICATIONS ---
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-notification-container');
  const toast = document.createElement('div');
  toast.className = `toast glass-panel ${type}`;
  
  let iconName = 'info';
  if (type === 'success') iconName = 'check-circle';
  if (type === 'warning') iconName = 'alert-triangle';
  
  toast.innerHTML = `
    <i data-lucide="${iconName}"></i>
    <span>${message}</span>
  `;
  
  container.appendChild(toast);
  lucide.createIcons();
  
  // Slide out and remove toast
  setTimeout(() => {
    toast.style.transform = 'translateX(120%)';
    toast.style.opacity = '0';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// --- PRODUCT CATALOG (SHOP & FEATURED) ---
function renderFeaturedProducts() {
  const container = document.getElementById('featured-products-container');
  const featured = window.products.filter(p => p.featured);
  
  container.innerHTML = featured.map(p => createProductCardHTML(p)).join('');
  attachProductCardEvents(container);
  lucide.createIcons();
}

function initShopFilters() {
  const priceInput = document.getElementById('price-range-input');
  const priceDisplay = document.getElementById('price-limit-display');
  const clearBtn = document.getElementById('btn-clear-filters');
  const sortSelect = document.getElementById('catalog-sort');
  
  priceInput.addEventListener('input', (e) => {
    priceDisplay.textContent = `$${e.target.value}`;
    renderShopCatalog();
  });
  
  // Checkbox triggers
  document.querySelectorAll('.cat-filter').forEach(checkbox => {
    checkbox.addEventListener('change', () => renderShopCatalog());
  });
  
  sortSelect.addEventListener('change', () => renderShopCatalog());
  
  clearBtn.addEventListener('click', () => {
    document.querySelectorAll('.cat-filter').forEach(c => c.checked = false);
    priceInput.value = 2600;
    priceDisplay.textContent = `$2600`;
    sortSelect.value = 'default';
    document.getElementById('global-search').value = '';
    renderShopCatalog();
    showToast('Filters reset', 'info');
  });
}

function renderShopCatalog(searchQuery = null, filterWishlist = false) {
  const container = document.getElementById('shop-products-container');
  const priceLimit = parseFloat(document.getElementById('price-range-input').value);
  const sortOption = document.getElementById('catalog-sort').value;
  
  // Selected Categories
  const selectedCats = Array.from(document.querySelectorAll('.cat-filter:checked')).map(c => c.value);
  
  let filtered = [...window.products];
  
  // 1. Category filter
  if (selectedCats.length > 0) {
    filtered = filtered.filter(p => selectedCats.includes(p.category));
  }
  
  // 2. Price filter
  filtered = filtered.filter(p => p.price <= priceLimit);
  
  // 3. Search filter
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  }
  
  // 4. Wishlist filter
  if (filterWishlist) {
    filtered = filtered.filter(p => wishlist.includes(p.id));
  }
  
  // 5. Sorting
  if (sortOption === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortOption === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortOption === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  }
  
  // Render
  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-secondary);">
        <i data-lucide="alert-circle" style="width: 48px; height: 48px; margin-bottom: 15px;"></i>
        <h3>No products found matching the criteria</h3>
        <p>Try expanding your price range or clearing search words.</p>
      </div>
    `;
  } else {
    container.innerHTML = filtered.map(p => createProductCardHTML(p)).join('');
    attachProductCardEvents(container);
  }
  
  document.getElementById('results-count-display').textContent = `Showing ${filtered.length} products`;
  lucide.createIcons();
}

function createProductCardHTML(p) {
  const isWishlisted = wishlist.includes(p.id) ? 'active' : '';
  const starIcons = getStarIconsHTML(p.rating);
  
  return `
    <div class="product-card glass-panel" data-id="${p.id}">
      <div class="wishlist-btn-card ${isWishlisted}" data-id="${p.id}" title="Add to Wishlist">
        <i data-lucide="heart"></i>
      </div>
      <div class="product-image-container click-details" data-id="${p.id}">
        <img src="${p.image}" alt="${p.name}">
      </div>
      <div class="product-cat">${p.category}</div>
      <div class="product-title click-details" data-id="${p.id}">${p.name}</div>
      <div class="product-rating">
        ${starIcons}
        <span>(${p.reviewsCount})</span>
      </div>
      <div class="product-footer">
        <span class="product-price">$${p.price.toFixed(2)}</span>
        <div class="add-cart-card btn-add-cart-fast" data-id="${p.id}" title="Add to Cart">
          <i data-lucide="shopping-cart"></i>
        </div>
      </div>
    </div>
  `;
}

function getStarIconsHTML(rating) {
  let stars = '';
  const floor = Math.floor(rating);
  const half = rating - floor >= 0.5;
  for (let i = 1; i <= 5; i++) {
    if (i <= floor) {
      stars += `<i data-lucide="star" style="fill: var(--warning); width: 14px; height: 14px;"></i>`;
    } else if (i === floor + 1 && half) {
      stars += `<i data-lucide="star-half" style="fill: var(--warning); width: 14px; height: 14px;"></i>`;
    } else {
      stars += `<i data-lucide="star" style="width: 14px; height: 14px;"></i>`;
    }
  }
  return stars;
}

function attachProductCardEvents(parentElement) {
  // Wishlist toggle
  parentElement.querySelectorAll('.wishlist-btn-card').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      toggleWishlist(id, btn);
    });
  });
  
  // Fast Add to Cart
  parentElement.querySelectorAll('.btn-add-cart-fast').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      const product = window.products.find(p => p.id === id);
      addToCart(product);
    });
  });

  // Navigate to details
  parentElement.querySelectorAll('.click-details').forEach(el => {
    el.addEventListener('click', () => {
      const id = el.getAttribute('data-id');
      const product = window.products.find(p => p.id === id);
      openProductDetails(product);
    });
  });
}

function toggleWishlist(productId, element = null) {
  const index = wishlist.indexOf(productId);
  if (index === -1) {
    wishlist.push(productId);
    showToast('Added to Wishlist', 'success');
    if (element) element.classList.add('active');
  } else {
    wishlist.splice(index, 1);
    showToast('Removed from Wishlist', 'info');
    if (element) element.classList.remove('active');
  }
  localStorage.setItem('qr_wishlist', JSON.stringify(wishlist));
  updateWishlistBadge();
}

function updateWishlistBadge() {
  document.getElementById('wishlist-count').textContent = wishlist.length;
}

// --- CART STATE HANDLING ---
function addToCart(product, quantity = 1) {
  const existing = cart.find(item => item.product.id === product.id);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ product, quantity });
  }
  saveCart();
  updateCartBadge();
  showToast(`Added ${product.name} to cart`, 'success');
}

function updateCartQuantity(productId, delta) {
  const item = cart.find(item => item.product.id === productId);
  if (item) {
    item.quantity += delta;
    if (item.quantity <= 0) {
      cart = cart.filter(i => i.product.id !== productId);
      showToast(`${item.product.name} removed from cart`, 'info');
    }
    saveCart();
    updateCartBadge();
    renderCartView();
  }
}

function removeFromCart(productId) {
  const item = cart.find(item => item.product.id === productId);
  if (item) {
    cart = cart.filter(i => i.product.id !== productId);
    showToast(`${item.product.name} removed from cart`, 'info');
    saveCart();
    updateCartBadge();
    renderCartView();
  }
}

function saveCart() {
  localStorage.setItem('qr_cart', JSON.stringify(cart));
}

function updateCartBadge() {
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  document.getElementById('cart-count').textContent = totalItems;
}

// --- PRODUCT DETAILS CONTROLLER ---
function openProductDetails(product) {
  selectedProductDetails = product;
  
  // Bind simple DOM values
  document.getElementById('details-category').textContent = product.category;
  document.getElementById('details-title').textContent = product.name;
  document.getElementById('details-large-image').src = product.image;
  document.getElementById('details-description').textContent = product.description;
  document.getElementById('details-price').textContent = `$${product.price.toFixed(2)}`;
  
  // In-stock label
  const stockEl = document.getElementById('details-stock-status');
  if (product.inStock) {
    stockEl.textContent = 'In Stock / Ready to Ship';
    stockEl.style.color = 'var(--success)';
  } else {
    stockEl.textContent = 'Out of Stock';
    stockEl.style.color = 'var(--danger)';
  }
  
  // Rating stars
  document.getElementById('details-rating').innerHTML = `
    ${getStarIconsHTML(product.rating)}
    <span>(${product.reviewsCount} customer reviews)</span>
  `;
  
  // Render specs list table
  const specsBody = document.getElementById('details-specs-body');
  specsBody.innerHTML = Object.entries(product.specs).map(([key, val]) => `
    <tr>
      <th>${key.replace(/([A-Z])/g, ' $1').trim()}</th>
      <td>${val}</td>
    </tr>
  `).join('');
  
  // Wishlist state check
  const wishlistBtn = document.getElementById('details-wishlist-btn');
  if (wishlist.includes(product.id)) {
    wishlistBtn.classList.add('btn-primary');
    wishlistBtn.classList.remove('btn-secondary');
  } else {
    wishlistBtn.classList.add('btn-secondary');
    wishlistBtn.classList.remove('btn-primary');
  }
  
  // Setup buttons
  const addCartBtn = document.getElementById('details-add-to-cart-btn');
  // clear event listeners
  const newAddCartBtn = addCartBtn.cloneNode(true);
  addCartBtn.parentNode.replaceChild(newAddCartBtn, addCartBtn);
  newAddCartBtn.addEventListener('click', () => addToCart(product));
  
  const newWishlistBtn = wishlistBtn.cloneNode(true);
  wishlistBtn.parentNode.replaceChild(newWishlistBtn, wishlistBtn);
  newWishlistBtn.addEventListener('click', () => {
    toggleWishlist(product.id);
    // Refresh visual state
    if (wishlist.includes(product.id)) {
      newWishlistBtn.classList.add('btn-primary');
      newWishlistBtn.classList.remove('btn-secondary');
    } else {
      newWishlistBtn.classList.add('btn-secondary');
      newWishlistBtn.classList.remove('btn-primary');
    }
  });

  document.getElementById('details-back-btn').onclick = () => navigateTo('shop');
  
  navigateTo('details');
  lucide.createIcons();
}

// --- PC BUILDER / CONFIGURATOR CONTROLLER ---
function initPCBuilder() {
  const modal = document.getElementById('part-selector-modal-overlay');
  const closeBtn = document.getElementById('part-modal-close');
  
  closeBtn.addEventListener('click', () => modal.classList.remove('active'));
  
  // Reset Config
  document.getElementById('builder-reset-btn').addEventListener('click', () => {
    Object.keys(builderConfig).forEach(key => builderConfig[key] = null);
    renderPCBuilderRows();
    showToast('Configuration cleared', 'info');
  });
  
  // Add Build to Cart Action
  const addToCartBtn = document.getElementById('builder-add-to-cart');
  addToCartBtn.addEventListener('click', () => {
    const buildPrice = calculateBuildPrice();
    const compositeProduct = {
      id: `custom-build-${Date.now()}`,
      name: `Custom Gaming PC Rig (Configured)`,
      category: `prebuilt`,
      price: buildPrice,
      image: `images/hero.png`,
      description: `Custom configured high-performance PC: CPU (${builderConfig.cpus.name}), GPU (${builderConfig.gpus.name}), Case (${builderConfig.cases.name}).`,
      specs: {
        cpu: builderConfig.cpus.name,
        gpu: builderConfig.gpus ? builderConfig.gpus.name : "Integrated Graphics",
        ram: builderConfig.ram.name,
        motherboard: builderConfig.motherboards.name,
        case: builderConfig.cases.name,
        powerSupply: builderConfig.psus.name
      },
      inStock: true,
      isCustomBuild: true
    };
    
    addToCart(compositeProduct);
    navigateTo('cart');
  });

  // Delegate Row buttons
  document.querySelector('.builder-steps-container').addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-choose-part')) {
      const cat = e.target.getAttribute('data-category');
      openPartSelectorModal(cat);
    } else if (e.target.closest('.btn-remove-part')) {
      const cat = e.target.closest('.btn-remove-part').getAttribute('data-category');
      builderConfig[cat] = null;
      renderPCBuilderRows();
      showToast('Removed component', 'info');
    }
  });
}

function openPartSelectorModal(category) {
  activeBuilderCategory = category;
  const modal = document.getElementById('part-selector-modal-overlay');
  const container = document.getElementById('modal-parts-container');
  const title = document.getElementById('modal-category-title');
  
  title.textContent = `Select ${category.toUpperCase()}`;
  
  // Filter catalog list to match selected category
  const partsList = window.products.filter(p => p.category === category);
  
  if (partsList.length === 0) {
    container.innerHTML = `<p style="padding: 20px; color: var(--text-secondary);">No parts available in this category.</p>`;
  } else {
    container.innerHTML = partsList.map(part => {
      // Compatibility quick status
      const tempConfig = { ...builderConfig, [category]: part };
      const check = window.checkBuilderCompatibility(tempConfig);
      
      const compatHTML = check.isCompatible 
        ? `<span style="color: var(--success); font-size: 0.75rem;"><i data-lucide="check-circle" style="width:12px; height: 12px; vertical-align: middle;"></i> Compatible</span>`
        : `<span style="color: var(--danger); font-size: 0.75rem;"><i data-lucide="alert-triangle" style="width:12px; height:12px; vertical-align: middle;"></i> Incompatible Specs</span>`;
      
      const specSnippet = Object.entries(part.specs).slice(0, 3).map(([key, val]) => `
        <span>${key}: ${val}</span>
      `).join('');

      return `
        <div class="modal-part-row">
          <img src="${part.image}" alt="${part.name}">
          <div>
            <h4 style="font-family: var(--font-title);">${part.name}</h4>
            <div class="modal-part-specs">
              ${compatHTML}
              ${specSnippet}
            </div>
          </div>
          <div class="modal-part-price">$${part.price.toFixed(2)}</div>
          <button class="btn btn-primary btn-select-modal-part" data-id="${part.id}">Select</button>
        </div>
      `;
    }).join('');
    
    // Bind select buttons
    container.querySelectorAll('.btn-select-modal-part').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const selectedPart = window.products.find(p => p.id === id);
        
        builderConfig[category] = selectedPart;
        modal.classList.remove('active');
        renderPCBuilderRows();
        showToast(`Selected ${selectedPart.name}`, 'success');
      });
    });
  }

  modal.classList.add('active');
  lucide.createIcons();
}

function calculateBuildPrice() {
  return Object.values(builderConfig).reduce((acc, part) => {
    return part ? acc + part.price : acc;
  }, 0);
}

function renderPCBuilderRows() {
  const activeKeys = Object.keys(builderConfig);
  
  activeKeys.forEach(key => {
    const part = builderConfig[key];
    const row = document.getElementById(`step-row-${key}`);
    const selectArea = document.getElementById(`part-selected-${key}`);
    const actionArea = row.querySelector('.step-action-col');
    
    if (part) {
      row.classList.add('completed');
      selectArea.innerHTML = `
        <img src="${part.image}" alt="${part.name}" class="part-thumbnail">
        <div class="part-info-block">
          <div class="part-info-name">${part.name}</div>
          <div class="part-info-price">$${part.price.toFixed(2)}</div>
        </div>
      `;
      actionArea.innerHTML = `
        <button class="btn btn-secondary btn-choose-part" data-category="${key}">Change</button>
        <button class="btn btn-danger btn-remove-part" data-category="${key}" title="Remove Part">
          <i data-lucide="trash-2"></i>
        </button>
      `;
    } else {
      row.classList.remove('completed');
      selectArea.innerHTML = `<span class="part-empty-msg">Select ${key}...</span>`;
      actionArea.innerHTML = `<button class="btn btn-accent btn-choose-part" data-category="${key}">Choose</button>`;
    }
  });

  // Calculate compatibility, prices, etc.
  const diagnostic = window.checkBuilderCompatibility(builderConfig);
  
  // Update UI sidebar
  document.getElementById('builder-wattage-val').textContent = `${diagnostic.estimatedWattage} W`;
  
  const count = Object.values(builderConfig).filter(Boolean).length;
  document.getElementById('builder-parts-count').textContent = `${count} / 8`;
  
  const totalPrice = calculateBuildPrice();
  document.getElementById('builder-total-price').textContent = `$${totalPrice.toFixed(2)}`;
  
  // Enable add build button only if critical components are selected
  // Required: CPU, Motherboard, RAM, PSU, Case, Cooler
  const hasCoreComponents = builderConfig.cpus && builderConfig.motherboards && builderConfig.ram && builderConfig.psus && builderConfig.cases;
  
  const addBtn = document.getElementById('builder-add-to-cart');
  if (hasCoreComponents && diagnostic.isCompatible) {
    addBtn.removeAttribute('disabled');
  } else {
    addBtn.setAttribute('disabled', 'true');
  }
  
  // Render diagnostics logs
  const statusBanner = document.getElementById('builder-compat-status');
  const logsContainer = document.getElementById('builder-compatibility-logs');
  
  if (count === 0) {
    statusBanner.className = "builder-compatibility-banner compatible";
    statusBanner.innerHTML = `<i data-lucide="check-circle-2"></i> All parts compatible. Start choosing components!`;
    logsContainer.innerHTML = '';
  } else if (!diagnostic.isCompatible) {
    statusBanner.className = "builder-compatibility-banner incompatible";
    statusBanner.innerHTML = `<i data-lucide="x-circle"></i> Compatibility Warning: ${diagnostic.errors.length} Critical Error(s) found.`;
    
    logsContainer.innerHTML = `
      <ul class="builder-log-list" style="color: var(--danger);">
        ${diagnostic.errors.map(err => `<li><i data-lucide="alert-triangle"></i> <span>${err}</span></li>`).join('')}
        ${diagnostic.warnings.map(warn => `<li style="color: var(--warning);"><i data-lucide="info"></i> <span>${warn}</span></li>`).join('')}
      </ul>
    `;
  } else {
    statusBanner.className = "builder-compatibility-banner compatible";
    
    if (diagnostic.warnings.length > 0) {
      statusBanner.innerHTML = `<i data-lucide="alert-triangle" style="color: var(--warning);"></i> Setup compatible with ${diagnostic.warnings.length} alert(s).`;
      logsContainer.innerHTML = `
        <ul class="builder-log-list" style="color: var(--warning);">
          ${diagnostic.warnings.map(warn => `<li><i data-lucide="info"></i> <span>${warn}</span></li>`).join('')}
        </ul>
      `;
    } else {
      statusBanner.innerHTML = `<i data-lucide="check-circle-2"></i> Custom Rig is fully compatible and ready to order!`;
      logsContainer.innerHTML = '';
    }
  }
  
  lucide.createIcons();
}

// --- CART & VISUAL CHECKOUT CONTROLLER ---
function initCartAndCheckout() {
  const checkoutModal = document.getElementById('checkout-modal-overlay');
  const checkoutClose = document.getElementById('checkout-modal-close');
  const checkoutBtn = document.getElementById('cart-checkout-btn');
  
  checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
      showToast('Your cart is empty', 'warning');
      return;
    }
    openCheckoutModal();
  });
  
  checkoutClose.addEventListener('click', () => checkoutModal.classList.remove('active'));
  
  // Promo codes apply
  document.getElementById('apply-coupon-btn').addEventListener('click', () => {
    const input = document.getElementById('coupon-code-input').value.trim().toUpperCase();
    if (COUPONS[input]) {
      appliedCoupon = input;
      showToast(`Coupon ${input} applied!`, 'success');
      renderCartView();
    } else {
      showToast('Invalid Coupon Code', 'warning');
    }
  });

  document.getElementById('cart-empty-shop-btn').addEventListener('click', () => navigateTo('shop'));

  // Visual Credit Card listeners
  const cardInput = document.getElementById('card-num-input');
  const nameInput = document.getElementById('shipping-name');
  const expInput = document.getElementById('card-exp-input');
  const cvvInput = document.getElementById('card-cvv-input');
  const cardVisual = document.getElementById('interactive-credit-card');

  // Format Card Number (adds spaces every 4 digits)
  cardInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    let formatted = '';
    for (let i = 0; i < value.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formatted += ' ';
      }
      formatted += value[i];
    }
    e.target.value = formatted;
    document.getElementById('visual-card-number').textContent = formatted || '•••• •••• •••• ••••';
  });

  // Name updates card holder
  nameInput.addEventListener('input', (e) => {
    document.getElementById('visual-card-holder').textContent = e.target.value.toUpperCase() || 'YOUR NAME';
  });

  // Format expiry (MM/YY)
  expInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\//g, '').replace(/[^0-9]/gi, '');
    if (value.length > 2) {
      e.target.value = value.substring(0, 2) + '/' + value.substring(2, 4);
    } else {
      e.target.value = value;
    }
    document.getElementById('visual-card-expiry').textContent = e.target.value || 'MM/YY';
  });

  // CVV flips credit card
  cvvInput.addEventListener('focus', () => {
    cardVisual.classList.add('flipped');
  });
  cvvInput.addEventListener('blur', () => {
    cardVisual.classList.remove('flipped');
  });
  cvvInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/[^0-9]/gi, '');
    e.target.value = value;
    document.getElementById('visual-card-cvv').textContent = value || '•••';
  });

  // Submit Order Form
  const checkoutForm = document.getElementById('checkout-shipping-form');
  checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Simulate payment processing loader
    const submitBtn = document.getElementById('btn-submit-order');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Processing Transaction...';
    submitBtn.setAttribute('disabled', 'true');

    setTimeout(() => {
      // Success screen show
      document.getElementById('checkout-grid-form').style.display = 'none';
      document.getElementById('checkout-success-view').style.display = 'block';
      document.getElementById('success-email-display').textContent = document.getElementById('shipping-email').value;
      
      // Clear Cart
      cart = [];
      appliedCoupon = null;
      document.getElementById('coupon-code-input').value = '';
      saveCart();
      updateCartBadge();
      
      showToast('Order placed successfully!', 'success');
      submitBtn.textContent = originalText;
      submitBtn.removeAttribute('disabled');
    }, 2000);
  });

  document.getElementById('success-done-btn').addEventListener('click', () => {
    checkoutModal.classList.remove('active');
    navigateTo('shop');
  });
}

function renderCartView() {
  const container = document.getElementById('cart-items-list');
  const layout = document.getElementById('cart-layout-container');
  const emptyState = document.getElementById('cart-empty-state');
  
  if (cart.length === 0) {
    layout.style.display = 'none';
    emptyState.style.display = 'flex';
    return;
  }
  
  layout.style.display = 'grid';
  emptyState.style.display = 'none';
  
  container.innerHTML = cart.map(item => `
    <div class="cart-item-row" data-id="${item.product.id}">
      <img src="${item.product.image}" alt="${item.product.name}" class="cart-item-img">
      <div class="cart-item-details">
        <h4>${item.product.name}</h4>
        <p>${item.product.category}</p>
      </div>
      <div class="quantity-controls">
        <div class="qty-btn" onclick="updateCartQuantity('${item.product.id}', -1)">-</div>
        <div class="qty-val">${item.quantity}</div>
        <div class="qty-btn" onclick="updateCartQuantity('${item.product.id}', 1)">+</div>
      </div>
      <div class="cart-item-price">$${(item.product.price * item.quantity).toFixed(2)}</div>
      <button class="cart-remove-btn" onclick="removeFromCart('${item.product.id}')">
        <i data-lucide="trash-2"></i>
      </button>
    </div>
  `).join('');
  
  // Update checkout order calculations
  calculateCartSummary();
  lucide.createIcons();
}

function calculateCartSummary() {
  const subtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  let discount = 0;
  
  if (appliedCoupon) {
    const couponVal = COUPONS[appliedCoupon];
    if (couponVal <= 1.0) {
      discount = subtotal * couponVal; // percentage
    } else {
      discount = couponVal; // flat rate
    }
  }
  
  const total = Math.max(0, subtotal + tax - discount);
  
  // Write values
  document.getElementById('cart-summary-subtotal').textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById('cart-summary-tax').textContent = `$${tax.toFixed(2)}`;
  
  const discountRow = document.getElementById('discount-row-display');
  if (appliedCoupon) {
    discountRow.style.display = 'flex';
    document.getElementById('cart-summary-discount').textContent = `-$${discount.toFixed(2)}`;
  } else {
    discountRow.style.display = 'none';
  }
  
  document.getElementById('cart-summary-total').textContent = `$${total.toFixed(2)}`;
}

function openCheckoutModal() {
  const modal = document.getElementById('checkout-modal-overlay');
  
  // Set amounts
  const subtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  let discount = 0;
  if (appliedCoupon) {
    const couponVal = COUPONS[appliedCoupon];
    discount = couponVal <= 1.0 ? subtotal * couponVal : couponVal;
  }
  const total = Math.max(0, subtotal + tax - discount);
  
  document.getElementById('checkout-amount-display').textContent = `$${total.toFixed(2)}`;
  
  // Reset form views
  document.getElementById('checkout-grid-form').style.display = 'grid';
  document.getElementById('checkout-success-view').style.display = 'none';
  document.getElementById('checkout-shipping-form').reset();
  
  // Reset credit card displays
  document.getElementById('visual-card-number').textContent = '•••• •••• •••• ••••';
  document.getElementById('visual-card-holder').textContent = 'YOUR NAME';
  document.getElementById('visual-card-expiry').textContent = 'MM/YY';
  document.getElementById('visual-card-cvv').textContent = '•••';
  
  modal.classList.add('active');
  lucide.createIcons();
}
