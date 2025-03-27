document.addEventListener('DOMContentLoaded', function() {
   
    // Fungsi untuk carousel
    function initializeCarousel() {
        const slides = document.querySelectorAll('.carousel-slide');
        const dots = document.querySelectorAll('.dot');
        const prevButton = document.querySelector('.prev');
        const nextButton = document.querySelector('.next');
        let currentSlide = 0;

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

    // Initialize all functions

    initializeCarousel();

});

document.getElementById('titipKunciForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Mengambil nilai dari form
    const nama = document.getElementById('nama').value;
    const email = document.getElementById('email').value;
    const apartemen = document.getElementById('apartemen').value;
    const tower = document.getElementById('tower').value;
    const lantai = document.getElementById('lantai').value;
    const nomor = document.getElementById('nomor').value;
    const tipeKamar = document.getElementById('tipeKamar').value;
    const furniture = document.getElementById('furniture').value;
    const catatan = document.getElementById('catatan').value;

    // Menyusun pesan untuk WhatsApp
    const pesan = `Halo, saya ingin mendaftarkan unit untuk Titip Kunci:%0A
Nama: ${nama}%0A
Email: ${email}%0A
Apartemen: ${apartemen}%0A
Tower: ${tower}%0A
Lantai: ${lantai}%0A
Nomor Kamar: ${nomor}%0A
Tipe Kamar: ${tipeKamar}%0A
Furniture: ${furniture}%0A
Catatan: ${catatan}`;

    // Mengarahkan ke WhatsApp
    window.location.href = `https://wa.me/6287815933353?text=${pesan}`;
});