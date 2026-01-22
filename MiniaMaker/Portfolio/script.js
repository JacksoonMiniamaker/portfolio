// --- FAQ INTERACTIVE ---
document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
        const item = q.parentElement;
        item.classList.toggle('active');
    });
});

// --- PORTFOLIO & LIGHTBOX ---
let currentImages = [];
let currentIndex = 0;

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('img-agrandie');
const filterBtns = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.card');
const mainContent = document.getElementById('main-content');

// Filtrage
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        
        cards.forEach(card => {
            card.style.display = (filter === 'all' || card.getAttribute('data-category') === filter) ? 'block' : 'none';
        });
    });
});

// Lightbox Navigation
cards.forEach(card => {
    card.addEventListener('click', () => {
        currentImages = Array.from(document.querySelectorAll('.card'))
            .filter(c => c.style.display !== 'none')
            .map(c => c.querySelector('img').src);
            
        currentIndex = currentImages.indexOf(card.querySelector('img').src);
        updateLightbox();
        lightbox.style.display = 'flex';
        mainContent.classList.add('blur-it');
    });
});

function updateLightbox() {
    lightboxImg.src = currentImages[currentIndex];
}

document.querySelector('.next-btn').onclick = (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % currentImages.length;
    updateLightbox();
};

document.querySelector('.prev-btn').onclick = (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    updateLightbox();
};

document.querySelector('.close').onclick = () => {
    lightbox.style.display = 'none';
    mainContent.classList.remove('blur-it');
};

lightbox.onclick = (e) => {
    if(e.target === lightbox) {
        lightbox.style.display = 'none';
        mainContent.classList.remove('blur-it');
    }
};

document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
        lightbox.style.display = 'none';
        mainContent.classList.remove('blur-it');
    }
    if (lightbox.style.display === 'flex') {
        if (e.key === "ArrowRight") document.querySelector('.next-btn').click();
        if (e.key === "ArrowLeft") document.querySelector('.prev-btn').click();
    }
});