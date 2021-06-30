jQuery('#status').css({ 'opacity': 0 })
jQuery('#logout').css({ 'opacity': 0 })

$("#loading_logo").animate({ 'marginTop': '10vh' }, 3000, "easeInOutQuart", function() {
    $(this).animate({ 'opacity': 0 }, 1000)
    $("#login_page").animate({ 'opacity': 1 }, 1000)
})

$(".button").bind('touchstart', function() {
    $(this).animate({ 'opacity': 0.7 }, 100)
})
$(".button").bind('touchend', function() {
    $(this).animate({ 'opacity': 1 }, 100)
})