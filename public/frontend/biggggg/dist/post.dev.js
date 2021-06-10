"use strict";

$.mobile.loading().hide(); // hide default "loading"

var height = $(window).height() * (94 / 100); //calc(100% - 6vh)

var width = $(window).width() - $(window).height() * (4 / 100); //calc(100% - 4vh)

$('#upper_windows').animate({
  "width": width,
  "height": height,
  "zoom": "100%",
  "left": "",
  "top": ""
}, 200, 'easeInOutQuint', function () {
  $("#exit_button").animate({
    "opacity": 1
  }, 1000);
});
$('#new_post_text').focus(function () {
  $("#new_post").animate({
    'height': '30%'
  }, 600, function () {
    $("#new_post_button_block").html('<div id=add_photo class="button">新增相片</div><div id="new_post_button" class="button">發佈</div>').animate({
      'opacity': 1
    }, 2000, function () {
      $(".button").bind('touchstart', function () {
        $(this).animate({
          'opacity': 0.5
        }, 100);
      });
      $(".button").bind('touchend', function () {
        $(this).animate({
          'opacity': 1
        }, 100);
      });
      $("#new_post_button").click(function () {
        // submit
        $("#new_post_text").val('');
      });
      $("#browse_post").on("scrollstart", function () {
        $("#browse_post").off();
        $("#browse_post").off("scrollstart"); // both OK

        $("#new_post_text").blur();
        $("#new_post_button_block").animate({
          'opacity': 0
        }, 300, function () {
          $("#new_post_button_block").html('');
          $("#new_post").animate({
            'height': '15%'
          }, 300);
        }); // $("#browse_post").scroll(function() {}); // run countless time till after hand leave
        // $('#browse_post').on('swipeup', function() {}) // fail
      });
    });
  });
}); // $('#new_post_text').focusout(function() {
//     $("#new_post_button_block").animate({ 'opacity': 0 }, 500, function() {
//         $("#new_post_button_block").html('')
//         $("#new_post").animate({ 'height': '15%' }, 500)
//     })
// })

var comment_number = 0;
$(".comment_group").html('<div class="more_comment">' + comment_number + "則留言" + '</div>');
$(".more_comment").click(function () {
  // 噴留言們 
  $(".comment_group").html("<div class='comment'><div class='commenter_name'>OOO</div><div class='comment_text'>XXXXXXXXXXXXXXXXX</div></div>");
  console.log("click");
}); // device's window width(px)
// $('body').append("window: " + $(window).width())
// scale // not imaging zooming XDD
// $('body').css("zoom", $(window).width() / 2)

$(".button").bind('touchstart', function () {
  $(this).animate({
    'opacity': 0.7
  }, 100);
});
$(".button").bind('touchend', function () {
  $(this).animate({
    'opacity': 1
  }, 100);
}); // color animate didn't work
// $(".post_comment_button").bind('touchstart', function() {
//     $(this).animate({ color: '#999' }, 100)
// })
// $(".post_comment_button").bind('touchend', function() {
//     $(this).animate({ color: '#000' }, 100)
// })

$("#new_post_button").click(function () {
  // submit
  $("#new_post_text").val('');
});
$(".post_comment_button").click(function () {
  // submit
  $("#new_comment_text").val('');
});