// Product card interaction animations
const productItems = document.querySelectorAll('.product-item');

function attachProductInteractions(item) {
    item.addEventListener('click', (e) => {
        const ripple = document.createElement('span');
        const rect = item.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.classList.add('ripple');

        item.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
}

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

productItems.forEach(item => {
    attachProductInteractions(item);
    observer.observe(item);
});

// Parallax effect on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    const scrollPosition = window.scrollY;
    header.style.transform = `translateY(${scrollPosition * 0.5}px)`;
});

document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');
});

const adminButton = document.getElementById('admin-access-btn');
const adminMessage = document.getElementById('admin-message');
const adminPanel = document.getElementById('admin-panel');
const adminForm = document.getElementById('admin-form');
const productGallery = document.querySelector('.product-gallery');
const ADMIN_SECRET = 'Darbii';
const ADMIN_STORAGE_KEY = 'sep15Admin';
const ADMIN_TIMESTAMP_KEY = 'sep15AdminTimestamp';
const ADMIN_EXPIRY_MS = 60 * 60 * 1000;
const ADMIN_CONTACT_EMAIL = 'nwachitwins@gmail.com' ;

function getAdminTimestamp() {
    const value = localStorage.getItem(ADMIN_TIMESTAMP_KEY);
    return value ? Number(value) : null;
}

function clearAdminStorage() {
    localStorage.removeItem(ADMIN_STORAGE_KEY);
    localStorage.removeItem(ADMIN_TIMESTAMP_KEY);
}

function setAdminStorage() {
    localStorage.setItem(ADMIN_STORAGE_KEY, 'true');
    localStorage.setItem(ADMIN_TIMESTAMP_KEY, String(Date.now()));
}

function adminAccessValid() {
    const storedAdmin = localStorage.getItem(ADMIN_STORAGE_KEY) === 'true';
    if (!storedAdmin) return false;

    const timestamp = getAdminTimestamp();
    if (!timestamp) {
        clearAdminStorage();
        return false;
    }

    if (Date.now() - timestamp > ADMIN_EXPIRY_MS) {
        clearAdminStorage();
        return false;
    }

    return true;
}

let isAdmin = adminAccessValid();

function showAdminPanel(show) {
    if (!adminPanel) return;
    adminPanel.classList.toggle('visible', show);
    adminPanel.setAttribute('aria-hidden', show ? 'false' : 'true');
}

function displayAdminMessage(message) {
    if (!adminMessage) return;
    adminMessage.textContent = message;
    adminMessage.classList.add('visible');
}

function clearAdminMessage() {
    if (!adminMessage) return;
    adminMessage.textContent = '';
    adminMessage.classList.remove('visible');
}

function displayAdminRequestLink(message) {
    if (!adminMessage) return;
    const subject = encodeURIComponent('Admin Access Request');
    const body = encodeURIComponent('Hello, I would like to request admin access to add a product. Please provide the admin key or instructions.');
    const mailto = `mailto:${ADMIN_CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    adminMessage.innerHTML = `${message}. <a href="${mailto}" target="_blank" rel="noopener">Request access via email</a>`;
    adminMessage.classList.add('visible');
}

if (adminButton) {
    adminButton.addEventListener('click', () => {
        isAdmin = adminAccessValid();
        if (isAdmin) {
            showAdminPanel(!adminPanel.classList.contains('visible'));
            clearAdminMessage();
            return;
        }

        const key = prompt('Admin approval required. Enter admin key or click Cancel to request access.');
        if (key === ADMIN_SECRET) {
            isAdmin = true;
            setAdminStorage();
            displayAdminMessage('Admin access granted; you may now add a new product');
            showAdminPanel(true);
            return;
        }

        isAdmin = false;
        clearAdminStorage();
        displayAdminRequestLink('Admin access is required to add products');
    });
}

if (adminForm) {
    adminForm.addEventListener('submit', (event) => {
        event.preventDefault();

        isAdmin = adminAccessValid();
        if (!isAdmin) {
            displayAdminRequestLink('Admin access is required to add products');
            return;
        }

        const nameInput = document.getElementById('product-name');
        const descriptionInput = document.getElementById('product-description');
        const priceInput = document.getElementById('product-price');
        const imageUrlInput = document.getElementById('product-image-url');
        const imageFileInput = document.getElementById('product-image-file');

        const name = nameInput?.value.trim();
        const description = descriptionInput?.value.trim();
        const price = priceInput?.value.trim();
        const imageUrl = imageUrlInput?.value.trim();
        const imageFile = imageFileInput?.files?.[0];

        if (!name || !description || !price) {
            displayAdminMessage('Please complete every product field before adding');
            return;
        }

        let imageSrc = imageUrl;
        if (!imageSrc && imageFile) {
            imageSrc = URL.createObjectURL(imageFile);
        }

        if (!imageSrc) {
            imageSrc = 'images/adire1.jpeg';
        }

        const newProduct = document.createElement('div');
        newProduct.className = 'product-item';
        newProduct.innerHTML = `
            <div class="product-image">
                <img src="${imageSrc}" alt="${name}">
            </div>
            <h2>${name}</h2>
            <p>${description}</p>
            <div class="product-price">${price}</div>
        `;

        if (productGallery) {
            productGallery.prepend(newProduct);
            attachProductInteractions(newProduct);
            observer.observe(newProduct);
        }

        adminForm.reset();
        displayAdminMessage('New product added successfully');
    });
}

console.log('🎨 September15 Enterprise - Premium UI Loaded');
