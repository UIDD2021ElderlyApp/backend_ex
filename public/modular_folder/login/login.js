jQuery('#status').css({ 'opacity': 0 })
jQuery('#logout').css({ 'opacity': 0 })

$("#loading_logo").animate({ 'marginTop': '10vh' }, 3000, "easeInOutQuart", function() {
    $(this).animate({ 'opacity': 0 }, 1000)
    $("#login_page").animate({ 'opacity': 1 }, 1000)
})
$("#login_button").click(function() {
    $("#waiting_block").show().css('z-index', "10")
})

$(".button").bind('touchstart', function() {
    $(this).animate({ 'opacity': 0.7 }, 100)
})
$(".button").bind('touchend', function() {
    $(this).animate({ 'opacity': 1 }, 100)
})

jQuery(function dom_ready(dom_ready_params) {
    $("#fb_login").click(function() {
        var re = /\/users\/login/gi;
        var newstr = window.location.href.replace(re, "/auth/facebook");
        window.location.href = newstr;
    });
});