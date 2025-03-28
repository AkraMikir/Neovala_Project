// Fungsi untuk navbar scroll
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    const header = document.querySelector('.header');
    const headerBottom = header.offsetTop + header.offsetHeight;
    const bookNowBtn = document.querySelector('.book-now-container');

    window.addEventListener('scroll', () => {
        if (window.scrollY > headerBottom - navbar.offsetHeight) {
            navbar.classList.add('scrolled');
            if (bookNowBtn) {
                bookNowBtn.classList.add('visible');
            }
        } else {
            navbar.classList.remove('scrolled');
            if (bookNowBtn) {
                bookNowBtn.classList.remove('visible');
            }
        }
    });

    // Set initial state
    if (window.scrollY > headerBottom - navbar.offsetHeight) {
        navbar.classList.add('scrolled');
        if (bookNowBtn) {
            bookNowBtn.classList.add('visible');
        }
    } else {
        if (bookNowBtn) {
            bookNowBtn.classList.remove('visible');
        }
    }
}

// Fungsi untuk smooth scroll
function handleSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-links a, .logo-left a');
    const navHeight = document.querySelector('.navbar').offsetHeight;

    function smoothScrollTo(targetId) {
        const targetSection = document.querySelector(targetId);
        let targetPosition;
        
        if (targetId === '#home') {
            targetPosition = 0;
        } else {
            targetPosition = targetSection.offsetTop - navHeight;
        }

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            smoothScrollTo(targetId);
        });
    });
}

// Fungsi untuk menu burger
function handleBurgerMenu() {
    const burgerMenu = document.querySelector('.burger-menu');
    const navLinks = document.querySelector('.nav-links');
    const overlay = document.querySelector('.nav-overlay');
    const navItems = document.querySelectorAll('.nav-links a');
    const closeButton = document.createElement('button');
    const bookNowBtn = document.querySelector('.book-now-container');
    
    closeButton.innerHTML = '×';
    closeButton.className = 'close-menu-btn';
    navLinks.insertBefore(closeButton, navLinks.firstChild);

    function toggleMenu() {
        const isOpening = !navLinks.classList.contains('active');
        
        if (bookNowBtn && isOpening) {
            if (bookNowBtn.classList.contains('visible')) {
                bookNowBtn.style.zIndex = '100';
            }
        } else if (bookNowBtn) {
            bookNowBtn.style.zIndex = '';
        }

        burgerMenu.classList.toggle('active');
        navLinks.classList.toggle('active');
        overlay.classList.toggle('active');
    }

    // Event listeners
    burgerMenu.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);
    closeButton.addEventListener('click', toggleMenu);

    // Event listener untuk navlinks
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = item.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            const navHeight = document.querySelector('.navbar').offsetHeight;
            
            // Scroll to target
            let targetPosition;
            if (targetId === '#home') {
                targetPosition = 0;
            } else {
                targetPosition = targetSection.offsetTop - navHeight;
            }

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
}

// Fungsi untuk carousel (existing code)
function initializeCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    let currentSlide = 0;

    // Fungsi untuk menampilkan slide
    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        let newSlide;
        if (n >= slides.length) {
            newSlide = 0;
        } else if (n < 0) {
            newSlide = slides.length - 1;
        } else {
            newSlide = n;
        }
        currentSlide = newSlide;

        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    // Event listener untuk tombol prev
    prevButton.addEventListener('click', () => {
        showSlide(currentSlide - 1);
    });

    // Event listener untuk tombol next
    nextButton.addEventListener('click', () => {
        showSlide(currentSlide + 1);
    });

    // Event listener untuk dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });

    // Auto slide setiap 5 detik
    setInterval(() => {
        showSlide(currentSlide + 1);
    }, 2000);

    // Tampilkan slide pertama
    showSlide(0);
}

// Fungsi untuk handling star rating
function handleStarRating() {
    const stars = document.querySelectorAll('.star-rating-select i');
    const ratingInput = document.getElementById('ratingInput');

    stars.forEach(star => {
        star.addEventListener('mouseover', function() {
            const rating = this.dataset.rating;
            highlightStars(stars, rating);
        });

        star.addEventListener('click', function() {
            const rating = this.dataset.rating;
            ratingInput.value = rating;
            highlightStars(stars, rating);
        });

        star.addEventListener('mouseout', function() {
            const currentRating = ratingInput.value;
            highlightStars(stars, currentRating);
        });
    });
}

function highlightStars(stars, rating) {
    stars.forEach(star => {
        const starRating = star.dataset.rating;
        if (starRating <= rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initializeCarousel();
    handleSmoothScroll();
    handleBurgerMenu();
    handleNavbarScroll();
    handleStarRating();
});


function sendToWhatsApp(event) {
    event.preventDefault();
    
    // Ambil nilai dari form
    const nama = document.getElementById('nama').value;
    const nomor = document.getElementById('nomor').value;
    const tipeKamar = document.getElementById('tipeKamar').value;
    const tanggalCheckin = document.getElementById('tanggalCheckin').value;
    const durasi = document.getElementById('durasi').value;
    const pesan = document.getElementById('pesan').value;
    
    // Format pesan untuk WhatsApp
    const pesanWhatsApp = `*Check-in Apartemen*%0A%0A` +
        `Nama: ${nama}%0A` +
        `Nomor WA: ${nomor}%0A` +
        `Tipe Kamar: ${tipeKamar}%0A` +
        `Tanggal Check-in: ${tanggalCheckin}%0A` +
        `Durasi: ${durasi}%0A` +
        `Pesan: ${pesan}`;
    
    // Ganti nomor WhatsApp di bawah ini dengan nomor yang dituju
    const nomorAdmin = '6281234567890'; // Ganti dengan nomor WhatsApp admin
    
    // Buat URL WhatsApp
    const urlWhatsApp = `https://wa.me/${nomorAdmin}?text=${pesanWhatsApp}`;
    
    // Buka WhatsApp di tab baru
    window.open(urlWhatsApp, '_blank');
}