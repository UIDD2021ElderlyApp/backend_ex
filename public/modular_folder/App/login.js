jQuery('#login_page').css({ 'opacity': 0 })
    // for test
jQuery('#status').css({ 'opacity': 0 })
jQuery('#logout').css({ 'opacity': 0 })

$("#loading_logo").animate({ 'marginTop': '10vh' }, 3000, "easeInOutQuart", function() {
        $(this).animate({ 'opacity': 0 }, 1000)
        $("#login_page").animate({ 'opacity': 1 }, 1000)
    })
    // margin-top --> marginTop
    // jQuery animate easing
    // in:衝 out:緩 // Quad:(平方)梯度小 Quart:(四次方)梯度大
    // 有順序的animate: .animate().animate()  or  .animate(properties, duration, easing, 後接function())