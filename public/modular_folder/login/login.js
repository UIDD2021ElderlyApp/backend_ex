// const { $ } = require("dom7")
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


//-------------------- try fadein/out the scrollbar when mouseon(or when scrolling)
// $('#gray_block').scroll(function() {
// $(this).removeClass("hide-scrollbar")
//$('.hide-scrollbar').fadeOut();
// $(this).fadeOut("slow", function() {
//     $(this).removeClass("hide-scrollbar");
// });

// $(this).removeClass('hide-scrollbar').fadeOut(3000);
// setTimeout(function() { $(this).removeClass('hide-scrollbar'); }, 3000);

// $(this + idTurno).removeClass('hide-scrollbar').fadeIn(3000);
//     $(this).removeClass("hide-scrollbar", 3000)
// })

//-------------------try login button animate
// $('#login_button').on('tap', function(e) { //n
//     console.log('tapped');
//     $(this).hide();
//     e.preventDefault();
// });

// $(document).on('vclick', '#login_button', function() { //n
//     $(this).animate({ 'opacity': 0 }, 1000)
// });

$('#login_button img').click(function() { // pc:y mobile:y
    $(this).animate({ 'opacity': 0.5 }, 10)
    $(this).delay(100).animate({ 'opacity': 1 }, 10)
})