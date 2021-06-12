//////////////////////// home.js ///////////////////

// select animal (1, 2, 3)
$.mobile.loading().hide();
var animal = parseInt((document.getElementById('jade_user_info_choosedanimal')) ? document.getElementById('jade_user_info_choosedanimal').innerText : "0", 10);
switch (animal) {
    case 1:
        $("#back_block").html('<div id="back1"></div><img src="image/home_back1_land.svg" style="position:absolute; width:100%; bottom:10%; z-index:2;"><img src="image/home_back1_cloud.svg" style="position:absolute; width:100%; top:10%; z-index:1;"></img>')
        $("#menu_back").css('background-color', '#61913D')
        break;
    case 2:
        $("#back_block").html('<div id="back2_1"></div><div id="back2_2"></div><img src="image/home_back2_cloud.svg" style="position:absolute; width:100%; top:10%; z-index:1;"><div id="sun"><img src="image/home_back2_sun.svg" style="height:100%;"></div><img src="image/home_back2_sand.svg" style="position:absolute; width:100%; bottom:10%; z-index:3;"><img src="image/home_back2_unbrella.svg" style="position:absolute; width:50%; right:0%; top:20%; z-index:4"><div id="tree"><img src="image/home_back2_tree.svg" style="width: 100%;"></div><div id="coconut"><img src="image/home_back2_coconut.svg" style="width: 100%;"></div>')
        $("#menu_back").css('background-color', '#004D69')
        break;
    case 3:
        $("#back_block").html('<div id="back3"></div><img src="image/home_back3_cloud.svg" style="position:absolute; width:100%; top:10%; z-index:1;"><img src="image/home_back3_land.svg" style="position:absolute; width:100%; bottom:10%; z-index:2;"></img>')
        $("#menu_back").css('background-color', '#61913D')
        break;
}

$("#house").bind('touchstart', function() {
    $(this).css('transform', "scale(1.1)")
})
$("#house").bind('touchend', function() {
    $(this).css('transform', "scale(1)")
})
var sleep = false
$("#house").click(function() {
    if (!sleep) {
        $(this).animate({}, 300, function() {
            $("#animal").css("display", "none");
            switch (animal) {
                case 1:
                    $("#house").html('<img src="image/home_sleep1.svg" width="100%">')
                    break;
                case 2:
                    $("#house").html('<img src="image/home_sleep2.svg" width="100%">')
                    $("#tree").css("left", "-2%")
                    $("#coconut").css("left", "10%")
                    break;
                case 3:
                    $("#house").html('<img src="image/home_sleep3.svg" width="100%">')
                    break;
            }
        })
        sleep = true
    } else {
        $(this).animate({}, 300, function() {
            if (animal == 2) {
                $("#tree").css("left", "25%")
                $("#coconut").css("left", "25%")
            }
            $("#animal").show()
            $("#house").html('')
        })
        sleep = false
    }
})

// mission remind // 0, 1(have "!")
var mission_complete = 0
if (mission_complete) {
    $("#remind").css("opacity", "1")
}

////////////////////////////// post.js //////////////////////

$("#social").click(function() {
    function checkFlag() {
        if (document.getElementById('snap_shoot_social_page_clean_html_stat').innerText !== '1') {
            setTimeout(() => {
                checkFlag();
            }, 5);
        } else {
            $("#post_html").show().css('z-index', "10")
            $.mobile.loading().hide(); // hide default "loading"
            var height = $(window).height() * (94 / 100) //calc(100% - 6vh)
            var width = $(window).width() - $(window).height() * (4 / 100) //calc(100% - 4vh)
            $('#upper_windows').animate({ "width": width, "height": height, "zoom": "100%", "left": "", "top": "" }, 500, 'easeInOutQuint', function() {
                $("#exit_button").animate({ "opacity": 1 }, 500);
                document.getElementById('social_page_stat').innerText = 1;
            });
        }
    }
    checkFlag();
});
$("#exit_button").click(function() {
    $("#post_html").css("display", "none")
    $('#upper_windows').css({ "left": "10%", "top": "13%", "width": "70 %", "height": "70%", "zoom": "70%" })
    $("#exit_button").css("opacity", 0);

});

$('#new_post_text').focus(function() {
    $("#new_post").animate({ 'height': '30%' }, 600, function() {
        $("#new_post_button_block").show().animate({ 'opacity': 1 }, 2000);
        $("#new_post_button_block #new_post_button").show().animate({ 'opacity': 1 }, 2000);
        $("#new_post_button_block #add_photo").show().animate({ 'opacity': 1 }, 2000, function() {
            /*
                        這裡是否會有事件重複宣告的問題*/
            // to Andy: 我之前試不這樣做會抓不到(偶爾會困在focus裡的樣子)
            document.getElementById('new_post_button_on_loaded_stat').innerText = '1';
            $(".button").bind('touchstart', function() {
                $(this).animate({ 'opacity': 0.5 }, 100)
            })
            $(".button").bind('touchend', function() {
                    $(this).animate({ 'opacity': 1 }, 100)
                })
                /*$("#new_post_button").click(function () {
                    // submit
                    $("#new_post_text").val('');
                })*/
            $("#browse_post").on("scrollstart", function() {
                $("#browse_post").off()
                $("#browse_post").off("scrollstart") // both OK

                $("#new_post_text").blur();
                $("#new_post_button_block").animate({ 'opacity': 0 }, 300, function() {
                    $("#new_post_button_block #new_post_button").hide();
                    $("#new_post_button_block #add_photo").hide();
                    $("#new_post").animate({ 'height': '15%' }, 300);

                })
            })
        })
    })
});

/*var comment_number = 0
$(".more_comment").html(comment_number + '則留言')
$(".more_comment").click(function () {
    $(".more_comment").css("display", "none")
    $(".comment").show()
})*/


/*$("#new_post_button").click(function () {
    // submit
    $("#new_post_text").val('');
})*/
/*$(".post_comment_button").click(function () {
    // submit
    $("#new_comment_text").val('')
})*/

///////////////////// 共用 ///////////////////////
$(".button").bind('touchstart', function() {
    $(this).animate({ 'opacity': 0.7 }, 100)
})
$(".button").bind('touchend', function() {
    $(this).animate({ 'opacity': 1 }, 100)
})