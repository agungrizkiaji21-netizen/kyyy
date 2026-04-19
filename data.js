// KyyHanforu Product Database
const productsData = [
    { id: 1, name: "KyyHanforu Hoodie Signature", price: 589000, category: "apparel", imageIcon: "fa-hoodie", desc: "Oversized premium cotton" },
    { id: 2, name: "Kyy T-Shirt Essential", price: 249000, category: "apparel", imageIcon: "fa-tshirt", desc: "100% combed cotton" },
    { id: 3, name: "Kyy Snapback Cap", price: 179000, category: "accessories", imageIcon: "fa-hat-cowboy", desc: "Wool blend" },
    { id: 4, name: "KyyForu Sneaker V1", price: 899000, category: "footwear", imageIcon: "fa-shoe-prints", desc: "Limited edition" },
    { id: 5, name: "Kyy Denim Jacket", price: 1299000, category: "apparel", imageIcon: "fa-user", desc: "Distressed look" },
    { id: 6, name: "Leather Wristband", price: 99000, category: "accessories", imageIcon: "fa-clock", desc: "Genuine leather" },
    { id: 7, name: "Kyy Slides Sandals", price: 219000, category: "footwear", imageIcon: "fa-shoe-prints", desc: "Soft foam" },
    { id: 8, name: "Polo Shirt Kyy", price: 319000, category: "apparel", imageIcon: "fa-tshirt", desc: "Pique knit" },
    { id: 9, name: "Bucket Hat Kyy", price: 139000, category: "accessories", imageIcon: "fa-hat-cowboy", desc: "Reversible" },
    { id: 10, name: "Cargo Pants", price: 459000, category: "apparel", imageIcon: "fa-tshirt", desc: "Tactical pockets" },
    { id: 11, name: "Sling Bag", price: 299000, category: "accessories", imageIcon: "fa-bag-shopping", desc: "Water-repellent" },
    { id: 12, name: "Kyy Runner Shoes", price: 749000, category: "footwear", imageIcon: "fa-shoe-prints", desc: "Breathable mesh" }
];

let currentProducts = [...productsData];
let cart = JSON.parse(localStorage.getItem('kyy_cart')) || [];

function saveCartToLocal() {
    localStorage.setItem('kyy_cart', JSON.stringify(cart));
}

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').innerText = totalItems;
    if (document.getElementById('cart-total-price')) {
        const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        document.getElementById('cart-total-price').innerText = `Rp${totalPrice.toLocaleString('id-ID')}`;
    }
    saveCartToLocal();
}

function renderProducts(filterCat = "all") {
    const grid = document.getElementById('products-grid');
    if (!grid) return;
    let filtered = filterCat === "all" ? productsData : productsData.filter(p => p.category === filterCat);
    grid.innerHTML = filtered.map(prod => `
        <div class="product-card" data-id="${prod.id}">
            <div class="product-img"><i class="fas ${prod.imageIcon || 'fa-shirt'} fa-3x"></i></div>
            <div class="product-title">${prod.name}</div>
            <div class="product-price">Rp${prod.price.toLocaleString('id-ID')}</div>
            <button class="add-to-cart" data-id="${prod.id}">Tambah ke Keranjang</button>
        </div>
    `).join('');
    
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(btn.dataset.id);
            addToCart(id);
        });
    });
}

function addToCart(productId) {
    const product = productsData.find(p => p.id === productId);
    if (!product) return;
    const existing = cart.find(i => i.id === productId);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCartCount();
    renderCartItems();
    alert(`${product.name} ditambahkan ke keranjang!`);
}

function renderCartItems() {
    const cartContainer = document.getElementById('cart-items');
    if (!cartContainer) return;
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p style="text-align:center">Keranjang kosong</p>';
        document.getElementById('cart-total-price').innerText = 'Rp0';
        return;
    }
    cartContainer.innerHTML = cart.map(item => `
        <div class="cart-item" style="display:flex; justify-content:space-between; margin-bottom:12px;">
            <div>${item.name} x${item.quantity}</div>
            <div>Rp${(item.price * item.quantity).toLocaleString('id-ID')}
                <button class="remove-item" data-id="${item.id}" style="background:none; border:none; color:#c44536; margin-left:8px;"><i class="fas fa-trash"></i></button>
            </div>
        </div>
    `).join('');
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(btn.dataset.id);
            cart = cart.filter(i => i.id !== id);
            updateCartCount();
            renderCartItems();
        });
    });
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('cart-total-price').innerText = `Rp${totalPrice.toLocaleString('id-ID')}`;
}
