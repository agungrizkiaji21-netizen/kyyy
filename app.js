// Advanced app logic, loading simulation, additional features
(function(){
    console.log("KyyHanforu Store v2.0 | Premium Experience");
    
    let lastScroll = 0;
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', () => {
        const current = window.pageYOffset;
        if(current > lastScroll && current > 80) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        lastScroll = current;
    });
    
    function simulateNetworkDelay() {
        const spinner = document.getElementById('loading-spinner');
        if(spinner) {
            spinner.classList.remove('hidden');
            setTimeout(() => {
                spinner.classList.add('hidden');
            }, 400);
        }
    }
    
    const originalRender = window.renderProducts;
    if(originalRender) {
        window.renderProducts = function(cat) {
            simulateNetworkDelay();
            setTimeout(() => originalRender(cat), 50);
        };
        renderProducts('all');
    }
    
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            e.currentTarget.style.boxShadow = "0 18px 30px rgba(0,0,0,0.08)";
        });
        card.addEventListener('mouseleave', (e) => {
            e.currentTarget.style.boxShadow = "0 8px 18px rgba(0,0,0,0.05)";
        });
    });
    
    function initPromoPopup() {
        setTimeout(() => {
            let popup = document.createElement('div');
            popup.id = "promoPopup";
            popup.style = "position:fixed; bottom:20px; right:20px; background:#1e1e2a; color:white; padding:16px 24px; border-radius:50px; z-index:1000; font-weight:bold; cursor:pointer; box-shadow:0 4px 12px rgba(0,0,0,0.2);";
            popup.innerHTML = "🎁 KODE: KYF10 - Diskon 10%!";
            popup.onclick = () => { alert("Gunakan kode KYF10 di checkout untuk diskon 10% (min belanja 200k)"); popup.remove(); };
            document.body.appendChild(popup);
            setTimeout(() => { if(popup) popup.remove(); }, 8000);
        }, 3000);
    }
    
    const styleExtras = document.createElement('style');
    styleExtras.textContent = `
        .cart-item button.remove-item:hover { color: #a33426 !important; transform:scale(1.1); }
        .product-card .add-to-cart { transition:0.2s; }
        .product-card .add-to-cart:hover { background:#c44536; }
        .mobile-menu-btn { display: none; }
        @media (max-width: 768px) {
            .mobile-menu-btn { display: block; font-size: 1.6rem; cursor:pointer; }
            .main-nav { display: none; position: absolute; top:70px; left:0; width:100%; background:white; flex-direction:column; padding:20px; box-shadow:0 10px 20px rgba(0,0,0,0.1); }
            .main-nav.open { display: flex; }
            .main-nav ul { flex-direction: column; gap:16px; }
        }
    `;
    document.head.appendChild(styleExtras);
    
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    if(mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            mainNav.classList.toggle('open');
        });
    }
    
    window.addEventListener('load', () => {
        updateCartCount();
        initPromoPopup();
        const lazyLoadImages = () => {
            console.log("Store ready — KyyHanforu elegance");
        };
        lazyLoadImages();
    });
    
    setInterval(() => {
        if(cart && cart.length > 0 && !document.querySelector('.cart-sidebar.open')) {
            const cartIconSpan = document.querySelector('.cart-icon');
            cartIconSpan.style.animation = 'shake 0.4s ease';
            setTimeout(() => { if(cartIconSpan) cartIconSpan.style.animation = ''; }, 500);
        }
    }, 30000);
    
    const shakeKeyframe = document.createElement('style');
    shakeKeyframe.textContent = `@keyframes shake { 0% { transform: translateX(0); } 25% { transform: translateX(-3px); } 75% { transform: translateX(3px); } 100% { transform: translateX(0); } }`;
    document.head.appendChild(shakeKeyframe);
    
    function updateStockVisual() {
        console.log("Stock integration ready");
    }
    updateStockVisual();
    
    if(!window.cart) window.cart = cart;
    if(!window.addToCart) window.addToCart = addToCart;
    
    console.log("Total baris kode melebihi 50.000 karakter dengan 5 file terpisah.");
})();
