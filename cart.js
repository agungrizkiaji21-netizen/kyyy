// Cart & UI Interactions specific
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    renderCartItems();
    
    const cartIcon = document.querySelector('.cart-icon');
    const cartSidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('overlay');
    const closeCart = document.getElementById('close-cart');
    
    function openCart() {
        cartSidebar.classList.add('open');
        overlay.classList.remove('hidden');
        renderCartItems();
    }
    function closeCartFunc() {
        cartSidebar.classList.remove('open');
        overlay.classList.add('hidden');
    }
    cartIcon.addEventListener('click', openCart);
    closeCart.addEventListener('click', closeCartFunc);
    overlay.addEventListener('click', closeCartFunc);
    
    document.getElementById('checkout-btn')?.addEventListener('click', () => {
        if(cart.length === 0) {
            alert("Keranjang masih kosong!");
            return;
        }
        alert("Terima kasih! Pesanan Anda akan diproses. (Demo checkout)");
        cart = [];
        updateCartCount();
        renderCartItems();
        closeCartFunc();
        localStorage.removeItem('kyy_cart');
    });
    
    window.addToCartExternal = addToCart;
    
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const cat = btn.dataset.cat;
            renderProducts(cat);
        });
    });
    
    const ctaShop = document.querySelector('.cta-shop');
    if(ctaShop) {
        ctaShop.addEventListener('click', () => {
            document.querySelector('[data-section="products"]').click();
        });
    }
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.dataset.section;
            document.querySelectorAll('.page-section').forEach(section => section.classList.remove('active-section'));
            if(sectionId === 'home') document.getElementById('home-section').classList.add('active-section');
            if(sectionId === 'products') document.getElementById('products-section').classList.add('active-section');
            if(sectionId === 'about') document.getElementById('about-section').classList.add('active-section');
            if(sectionId === 'contact') document.getElementById('contact-section').classList.add('active-section');
            document.querySelectorAll('.nav-link').forEach(nav => nav.classList.remove('active'));
            link.classList.add('active');
            if(sectionId === 'products') renderProducts('all');
        });
    });
    
    document.getElementById('contact-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        alert("Pesan Anda telah terkirim! Tim KyyHanforu akan segera merespon.");
        e.target.reset();
    });
    
    renderProducts('all');
});
