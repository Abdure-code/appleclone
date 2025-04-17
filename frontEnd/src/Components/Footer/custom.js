import $ from 'jquery';
    $('.footer-links-wrapper h3').on('click', function() {
        $(this).toggleClass('expanded');
        $(this).next('ul').slideToggle();
    });
    $(window).on('resize', function() {
        if ($(window).width() > 768 || $(window).width() <= 768) {
            location.reload();
        }
    });
