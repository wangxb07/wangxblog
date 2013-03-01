/**
 * @file
 * A JavaScript file for the theme.
 *
 * In order for this JavaScript to be loaded on pages, see the instructions in
 * the README.txt next to this file.
 */

// JavaScript should be made compatible with libraries other than jQuery by
// wrapping it with an "anonymous closure". See:
// - http://drupal.org/node/1446420
// - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
(function ($, Drupal, window, document, undefined) {
    var RESPONSIVE_MODE_MINIMAL = 1;
    var RESPONSIVE_MODE_MEDIUM = 2;
    var RESPONSIVE_MODE_NORMALIZE = 3;

    var navigation_toggle_by_button = false;

    // To determine the responsive mode
    var judge_responsive_mode = function() {
        if ($(window).width() > 960 ) { return RESPONSIVE_MODE_NORMALIZE;}
        if ($(window).width() > 480 ) { return RESPONSIVE_MODE_MEDIUM;}
        return RESPONSIVE_MODE_MEDIUM;
    };

    // locate sideber function
    var sidebar_locate = function() {
        var scroll_top = $(document).scrollTop();
        $('.region-sidebar-first').animate({'top': scroll_top});

        if (scroll_top > 0) {
            $('#navigation-button').show();
            // If navigation toggle by button, do nothing
            if (navigation_toggle_by_button) {
                return false;
            }
            $('#block-system-navigation').hide();
        } else {
            $('#block-system-navigation').show();
            $('#navigation-button').hide();
        }
    };

    var locate_timeout = 0;

    // loaded observer
    $(function() {
        $(window).scroll(function() {
            clearTimeout(locate_timeout);
            if (judge_responsive_mode() >= RESPONSIVE_MODE_MEDIUM) {
                locate_timeout = setTimeout(sidebar_locate, 500);
            }
        });

        // navigation button click bind
        $('#navigation-button').click(function() {
            navigation_toggle_by_button = true;
            $('#block-system-navigation').toggle();
        });

        // navigation more button click bind
        $('#navigation-more-button').click(function() {
            $('.region-navigation').show();
            $('#navigation').animate({'height': '200px'});
        });
    });


})(jQuery, Drupal, this, this.document);
