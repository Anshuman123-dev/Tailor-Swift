document.addEventListener('DOMContentLoaded', function() {
    const mainImage = document.querySelector('.main-image');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentIndex = 0;

    function updateMainImage(index) {
        mainImage.src = thumbnails[index].src;
        thumbnails.forEach(thumb => thumb.classList.remove('active'));
        thumbnails[index].classList.add('active');
        currentIndex = index;
    }

    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => updateMainImage(index));
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length;
        updateMainImage(currentIndex);
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % thumbnails.length;
        updateMainImage(currentIndex);
    });
    
    document.addEventListener('DOMContentLoaded', function() {
        const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
        const mobileMenu = document.querySelector('.mobile-menu');
    
        mobileMenuIcon.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
        });
    });
    
    // Initialize with the first image
    updateMainImage(0);
});