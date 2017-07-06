
window._ = require('lodash');

window.$ = window.jQuery = require('jquery');
require('jquery-ui');

$(document).ready(function() {

    $('h1.fit-text').fitText(1.2, { minFontSize: '18px', maxFontSize: '52px' });

    $('.responsive-video').fitVids();

    $('.smooth-scroll').smoothScroll({
        offset: -65,
    });

    $('.smooth-scroll-offset').smoothScroll({
        offset: 65,
    });

    $('input, textarea').placeholder();

    $('.match-height').matchHeight();

    $('#sticky-header').stickyHeader();

    $('.evp-menu').evpMenu();

    $('#breadcrumb-widget').breadcrumbWidget();

    $(".code-box").css({'height':'0px','overflow':'hidden','position':'relative'});
    $(".code-box").append('<a class="code-box-expand-trigger"><i class="fa fa-cog fa-spin"></i> Peek at the code...</a>');
    $(".code-box").append('<a class="code-box-collapse-trigger"><i class="fa fa-times"></i> All done</a>');

    $(".code-box-expand-trigger").click(function(){
        $(this).parent().css({'height':'auto'});
    });

    $(".code-box-collapse-trigger").click(function(){
        $(this).parent().css({'height':'0px'});
    });

});