$(document).ready(function () {
    let bgImg = $('.bg-img input').val();
    $('.bg-img').css("background-image", "url(" + bgImg + ")");

    $('.carousel.carousel-slider').carousel({
        fullWidth: true
    });

    setInterval(() => {
        $('.carousel.carousel-slider').carousel('next',1);
    }, 4000);

    console.log('ready');
});