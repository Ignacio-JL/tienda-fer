//Initialize Swiper 
var swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    spaceBetween: 20,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        640: {
            slidesPerView: 3,
            spaceBetween: 20,
        },
        768: {
            slidesPerView: 3,
            spaceBetween: 50,
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 50,
        },
    },
});

var swiper2 = new Swiper(".mySwiper2", {
    direction: 'vertical',
    slidesPerView: 3,
    spaceBetween: 20,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        640: {
            slidesPerView: 3,
            spaceBetween: 20,
        },
        768: {
            
            slidesPerView: 3,
            spaceBetween: 50,
        },
        1024: {
            
            slidesPerView: 3,
            spaceBetween: 50,
        },
    },
});