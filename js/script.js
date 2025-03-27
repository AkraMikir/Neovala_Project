// Fungsi untuk navbar scroll
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    const header = document.querySelector('.header');
    const headerBottom = header.offsetTop + header.offsetHeight;
    const bookNowBtn = document.querySelector('.book-now-container');

    window.addEventListener('scroll', () => {
        if (window.scrollY > headerBottom - navbar.offsetHeight) {
            navbar.classList.add('scrolled');
            bookNowBtn.classList.add('visible');
        } else {
            navbar.classList.remove('scrolled');
            bookNowBtn.classList.remove('visible');
        }
    });

    // Set initial state
    if (window.scrollY > headerBottom - navbar.offsetHeight) {
        navbar.classList.add('scrolled');
        bookNowBtn.classList.add('visible');
    } else {
        bookNowBtn.classList.remove('visible');
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
    
    closeButton.innerHTML = '×';
    closeButton.className = 'close-menu-btn';
    navLinks.insertBefore(closeButton, navLinks.firstChild);

    function toggleMenu() {
        const isOpening = !navLinks.classList.contains('active');
        const bookNowBtn = document.querySelector('.book-now-container');
        
        if (isOpening) {
            // Ensure Book Now button stays visible if it was visible
            if (bookNowBtn.classList.contains('visible')) {
                bookNowBtn.style.zIndex = '100';
            }
        } else {
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

    prevButton.addEventListener('click', () => {
        showSlide(currentSlide - 1);
    });

    nextButton.addEventListener('click', () => {
        showSlide(currentSlide + 1);
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });

    setInterval(() => {
        showSlide(currentSlide + 1);
    }, 2000);

    showSlide(0);
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    handleNavbarScroll();   
    handleBurgerMenu();
    initializeCarousel();
    handleSmoothScroll();
});