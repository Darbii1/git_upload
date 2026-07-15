// Testimonials + review form logic
(function () {
    const initial = [
        { name: 'Akin', rating: 5, text: 'The beans flour is as natural as ground beans should be. This is just the best!' },
        { name: 'Mrs Gabby', rating: 5, text: "Yes Ma I have made it...both akara and moi moi it came out so nice I did enjoy it" },
        { name: 'Sis Bukola', rating: 5, text: 'The beans flour is nice — my children also love it; they said it tastes like pancakes.' },
        { name: 'Customer', rating: 5, text: 'The pap is so silky and filling. I love that the pap has ginger in it and makes it taste unique.' },
        { name: 'A Delight', rating: 5, text: 'Home delight is not only convenient and delicious but gives that natural taste made without additives.' },
        { name: 'Happy Buyer', rating: 5, text: 'The ogi is very much okay; I love the taste. I took it without sugar the first time and I enjoyed it.' }
    ];

    const IMG_BASE = 'images/review/';
    const reviewImgs = ['rev1.jpeg', 'rev2.jpeg', 'rev3.jpeg', 'rev4.jpeg', 'rev5.jpeg', 'rev6.jpeg', 'rev7.jpeg', 'rev8.jpeg', 'rev9.jpeg', 'rev10.jpeg', 'rev11.jpeg', 'rev12.jpeg'];

    function loadStored() {
        try { const raw = localStorage.getItem('reaphil_reviews'); return raw ? JSON.parse(raw) : []; } catch (e) { return [] }
    }
    function saveStored(arr) { localStorage.setItem('reaphil_reviews', JSON.stringify(arr)); }

    let stored = loadStored();
    let reviews = initial.concat(stored);

    const listEl = document.getElementById('reviews-list');
    function render() {
        listEl.innerHTML = '';
        reviews.forEach((r, i) => {
            const card = document.createElement('div'); card.className = 'review-card';
            const meta = document.createElement('div'); meta.className = 'review-meta';
            const name = document.createElement('strong'); name.textContent = r.name;
            const stars = document.createElement('div'); stars.className = 'stars-display';
            for (let s = 1; s <= 5; s++) { const sp = document.createElement('span'); sp.className = 'star' + (s <= r.rating ? ' filled' : ''); sp.textContent = '★'; stars.appendChild(sp) }
            meta.appendChild(name); meta.appendChild(stars);
            const p = document.createElement('p'); p.textContent = r.text;
            card.appendChild(meta); card.appendChild(p);
            listEl.appendChild(card);
        });
    }
    render();

    // Rating UI
    const starsUi = document.getElementById('rating');
    let selectedRating = 5;
    if (starsUi) {
        starsUi.addEventListener('click', (e) => {
            const t = e.target.closest('.star');
            if (!t) return;
            selectedRating = Number(t.getAttribute('data-value')) || 5;
            Array.from(starsUi.querySelectorAll('.star')).forEach(s => {
                s.classList.toggle('filled', Number(s.getAttribute('data-value')) <= selectedRating);
            });
        });
        // init
        Array.from(starsUi.querySelectorAll('.star')).forEach(s => s.classList.add('filled'));
    }

    // form submit
    const form = document.getElementById('reviewForm');
    form && form.addEventListener('submit', (ev) => {
        ev.preventDefault();
        const name = document.getElementById('reviewer').value.trim() || 'Anonymous';
        const message = document.getElementById('message').value.trim();
        if (!message) return;
        const newR = { name, rating: selectedRating, text: message };
        // prepend
        reviews.unshift(newR);
        stored.unshift(newR);
        saveStored(stored);
        render();
        form.reset();
        // reset stars
        selectedRating = 5; Array.from(document.querySelectorAll('#rating .star')).forEach(s => s.classList.add('filled'));
    });

    // small animations: reveal elements and subtle card float
    window.addEventListener('load', () => {
        document.querySelectorAll('.fade-in').forEach((el, i) => {
            setTimeout(() => el.classList.add('show'), 120 * i);
        });
        // reveal product cards
        document.querySelectorAll('.card').forEach((c, idx) => {
            setTimeout(() => c.classList.add('visible'), 80 * idx);
        });
        // header scroll behavior
        const header = document.querySelector('.nav');
        const onScroll = () => {
            if (window.scrollY > 24) header.classList.add('scrolled'); else header.classList.remove('scrolled');
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });

        // card tilt micro-interaction
        document.querySelectorAll('.card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left; // x position within the element.
                const y = e.clientY - rect.top;  // y position within the element.
                const cx = rect.width / 2;
                const cy = rect.height / 2;
                const dx = (x - cx) / cx;
                const dy = (y - cy) / cy;
                const rx = (-dy) * 6; const ry = dx * 6;
                card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
            });
            card.addEventListener('mouseleave', () => { card.style.transform = 'translateY(0)'; });
        });
    });
})();