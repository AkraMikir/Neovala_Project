document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    let currentSlide = 0;

    // Fungsi untuk menampilkan slide
    function showSlide(n) {
        // Hapus kelas active dari semua slide dan dot
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Reset ke slide pertama jika mencapai batas
        currentSlide = n >= slides.length ? 0 : n < 0 ? slides.length - 1 : n;

        // Tambah kelas active ke slide dan dot yang aktif
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
});