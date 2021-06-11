//////////////////////// home.js ///////////////////

// select animal (1, 2, 3)
var animal = 2
switch (animal) {
    case 1:
        $("#back_block").html('<div id="back1"></div><img src="./frontend/biggggg/image/home_back1_land.svg" style="position:absolute; width:100%; bottom:10%; z-index:2;"><img src="./frontend/biggggg/image/home_back1_cloud.svg" style="position:absolute; width:100%; top:10%; z-index:1;"></img>')
        $("#animal img").css("content", "url('./frontend/biggggg/image/home_animal1.svg')")
        $("#menu_back").css('background-color', '#61913D')
        break;
    case 2:
        $("#back_block").html('<div id="back2_1"></div><div id="back2_2"></div><img src="./frontend/biggggg/image/home_back2_cloud.svg" style="position:absolute; width:100%; top:10%; z-index:1;"><div id="sun"><img src="./frontend/biggggg/image/home_back2_sun.svg" style="height:100%;"></div><img src="./frontend/biggggg/image/home_back2_sand.svg" style="position:absolute; width:100%; bottom:10%; z-index:3;"><img src="./frontend/biggggg/image/home_back2_unbrella.svg" style="position:absolute; width:50%; right:0%; top:20%; z-index:4"><img src="./frontend/biggggg/image/home_back2_tree.svg" style="position:absolute; width:30%; left:25%; bottom:43vw; z-index:6"><img src="./frontend/biggggg/image/home_back2_coconut.svg" style="position:absolute; width: 15%; left:25%; bottom:35vw; z-index:8"></img>')
        $("#animal img").css("content", "url('./frontend/biggggg/image/home_animal2.svg')")
        $("#menu_back").css('background-color', '#004D69')
        break;
    case 3:
        $("#back_block").html('<div id="back3"></div><img src="./frontend/biggggg/image/home_back3_cloud.svg" style="position:absolute; width:100%; top:10%; z-index:1;"><img src="./frontend/biggggg/image/home_back3_land.svg" style="position:absolute; width:100%; bottom:10%; z-index:2;"></img>')
        $("#animal img").css("content", "url('./frontend/biggggg/image/home_animal3.svg')")
        $("#menu_back").css('background-color', '#61913D')
        break;
}

$("#house").bind('touchstart', function() {
    $(this).animate({ 'opacity': 0.8 }, 100)
})
$("#house").bind('touchend', function() {
    $(this).animate({ 'opacity': 1 }, 100)
})
var sleep = false
$("#house").click(function() {
    if (!sleep) {
        $(this).animate({}, 300, function() {
            // $("#animal").css("opacity", "0");
            $("#animal").css("width", "0%");
            switch (animal) {
                case 1:
                    $("#house").css("background-image", "url(./frontend/biggggg/image/home_sleep1.svg)");
                    break;
                case 2:
                    $("#house").css("background-image", "url(./frontend/biggggg/image/home_sleep2.svg)");
                    break;
                case 3:
                    $("#house").css("background-image", "url(./frontend/biggggg/image/home_sleep3.svg)");
                    break;
            }
        })
        sleep = true
    } else {
        $(this).animate({}, 300, function() {
            $("#animal").css("width", "60%");
            $(this).css("background-image", "url(./frontend/biggggg/image/home_house.svg)");
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
    $("#post_html").show().css('z-index', "10")
    $.mobile.loading().hide(); // hide default "loading"
    var height = $(window).height() * (94 / 100) //calc(100% - 6vh)
    var width = $(window).width() - $(window).height() * (4 / 100) //calc(100% - 4vh)
    $('#upper_windows').animate({ "width": width, "height": height, "zoom": "100%", "left": "", "top": "" }, 500, 'easeInOutQuint', function() {
        $("#exit_button").animate({ "opacity": 1 }, 1000)
    })

})
$("#exit_button").click(function() {
    $("#post_html").css("display", "none")
    $('#upper_windows').css({ "left": "10%", "top": "13%", "width": "70 %", "height": "70%", "zoom": "70%" })
    $("#exit_button").css("opacity", 0)
})

$('#new_post_text').focus(function() {
    $("#new_post").animate({ 'height': '30%' }, 600, function() {
        $("#new_post_button_block").html('<div id=add_photo class="button">新增相片</div><div id="new_post_button" class="button">發佈</div>').animate({ 'opacity': 1 }, 2000, function() {
            $(".button").bind('touchstart', function() {
                $(this).animate({ 'opacity': 0.5 }, 100)
            })
            $(".button").bind('touchend', function() {
                $(this).animate({ 'opacity': 1 }, 100)
            })
            $("#new_post_button").click(function() {
                // submit
                $("#new_post_text").val('');
            })
            $("#browse_post").on("scrollstart", function() {
                $("#browse_post").off()
                $("#browse_post").off("scrollstart") // both OK

                $("#new_post_text").blur();
                $("#new_post_button_block").animate({ 'opacity': 0 }, 300, function() {
                    $("#new_post_button_block").html('')
                    $("#new_post").animate({ 'height': '15%' }, 300)
                })
            })
        })
    })
})

var comment_number = 0
$(".more_comment").html(comment_number + '則留言')
$(".more_comment").click(function() {
    $(".more_comment").css("display", "none")
    $(".comment").show()
})


$("#new_post_button").click(function() {
    // submit
    $("#new_post_text").val('');
})
$(".post_comment_button").click(function() {
    // submit
    $("#new_comment_text").val('')
})

///////////////////// 共用 ///////////////////////
$(".button").bind('touchstart', function() {
    $(this).animate({ 'opacity': 0.7 }, 100)
})
$(".button").bind('touchend', function() {
    $(this).animate({ 'opacity': 1 }, 100)
})