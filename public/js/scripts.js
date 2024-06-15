// Example JavaScript to enhance user interactivity
$(document).ready(function() {
    // Smooth scrolling for links
    $('a[href*="#"]').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top
        }, 500, 'linear');
    });

    // Parallax scrolling effect
    $(window).on('scroll', function() {
        var scrollPos = $(window).scrollTop();
        $('.parallax').css('background-position', 'center ' + (scrollPos * 0.5) + 'px');

        // Scroll reveal effect
        $('.scroll-reveal').each(function() {
            var revealPos = $(this).offset().top;
            var windowHeight = $(window).height();
            if (scrollPos + windowHeight > revealPos) {
                $(this).addClass('reveal');
            }
        });
    });
});
