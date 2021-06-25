//////////////////////// home.js ///////////////////

// select animal (1, 2, 3)
$.mobile.loading().hide();
var animal = parseInt((document.getElementById('jade_user_info_choosedanimal')) ? document.getElementById('jade_user_info_choosedanimal').innerText : "0", 10);
switch (animal) {
    case 1:
        $("#back_block").html('<div id="back1"></div><img src="./frontend/biggggg/image/home_back1_land.svg" style="position:absolute; width:100%; bottom:10%; z-index:2;"><img src="./frontend/biggggg/image/home_back1_cloud.svg" style="position:absolute; width:100%; top:10%; z-index:1;"></img>')
        $("#menu_back").css('background-color', '#61913D')
        break;
    case 2:
        $("#back_block").html('<div id="back2_1"></div><div id="back2_2"></div><img src="./frontend/biggggg/image/home_back2_cloud.svg" style="position:absolute; width:100%; top:10%; z-index:1;"><div id="sun"><img src="./frontend/biggggg/image/home_back2_sun.svg" style="height:100%;"></div><img src="./frontend/biggggg/image/home_back2_sand.svg" style="position:absolute; width:100%; bottom:10%; z-index:3;"><img src="./frontend/biggggg/image/home_back2_unbrella.svg" style="position:absolute; width:50%; right:0%; top:20%; z-index:4"><div id="tree"><img src="./frontend/biggggg/image/home_back2_tree.svg" style="width: 100%;"></div><div id="coconut"><img src="./frontend/biggggg/image/home_back2_coconut.svg" style="width: 100%;"></div>')
        $("#menu_back").css('background-color', '#004D69')
        break;
    case 3:
        $("#back_block").html('<div id="back3"></div><img src="./frontend/biggggg/image/home_back3_cloud.svg" style="position:absolute; width:100%; top:10%; z-index:1;"><img src="./frontend/biggggg/image/home_back3_land.svg" style="position:absolute; width:100%; bottom:10%; z-index:2;"></img>')
        $("#menu_back").css('background-color', '#61913D')
        break;
}

$("#house").bind('touchstart', function () {
    $(this).css('transform', "scale(1.1)")
})
$("#house").bind('touchend', function () {
    $(this).css('transform', "scale(1)")
})
var sleep = false
$("#house").click(function () {
    if (!sleep) {
        $(this).animate({}, 300, function () {
            $("#animal").css("display", "none");
            switch (animal) {
                case 1:
                    $("#house").html('<img src="./frontend/biggggg/image/home_sleep1.svg" width="100%">')
                    break;
                case 2:
                    $("#house").html('<img src="./frontend/biggggg/image/home_sleep2.svg" width="100%">')
                    $("#tree").css("left", "-2%")
                    $("#coconut").css("left", "10%")
                    break;
                case 3:
                    $("#house").html('<img src="./frontend/biggggg/image/home_sleep3.svg" width="100%">')
                    break;
            }
        })
        sleep = true
    } else {
        $(this).animate({}, 300, function () {
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

$("#social").click(function () {
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
            $('#upper_windows').animate({ "width": width, "height": height, "zoom": "100%", "left": "", "top": "" }, 500, 'easeInOutQuint', function () {
                $("#exit_button").animate({ "opacity": 1 }, 500);
                document.getElementById('social_page_stat').innerText = 1;
            });
        }
    }
    checkFlag();
});
$("#exit_button").click(function () {
    $("#post_html").css("display", "none")
    $('#upper_windows').css({ "left": "10%", "top": "13%", "width": "70 %", "height": "70%", "zoom": "70%" })
    $("#exit_button").css("opacity", 0);

});

$('#new_post_text').focus(function () {
    $("#new_post").animate({ 'height': '30%' }, 600, function () {
        $("#new_post_button_block").show().animate({ 'opacity': 1 }, 2000);
        $("#new_post_button_block #new_post_button").show().animate({ 'opacity': 1 }, 2000);
        $("#new_post_button_block #add_photo").show().animate({ 'opacity': 1 }, 2000, function () {
            document.getElementById('new_post_button_on_loaded_stat').innerText = '1';
            $(".button").bind('touchstart', function () {
                $(this).animate({ 'opacity': 0.5 }, 100)
            })
            $(".button").bind('touchend', function () {
                $(this).animate({ 'opacity': 1 }, 100)
            })
            $("#browse_post").on("scrollstart", function () {
                $("#browse_post").off()
                $("#browse_post").off("scrollstart") // both OK

                $("#new_post_text").blur();
                $("#new_post_button_block").animate({ 'opacity': 0 }, 300, function () {
                    $("#new_post_button_block #new_post_button").hide();
                    $("#new_post_button_block #add_photo").hide();
                    $("#new_post").animate({ 'height': '15%' }, 300);

                })
            })
        })
    })
});
////////////////////////////// setting.js //////////////////////
// assign default value (previously stored value)
var wakeup_h = 8
var wakeup_m = 30
var sleep_h = 21
var sleep_m = 00

$("#setting").click(function () {
    $("#setting_html").show().css('z-index', "10")
    $.mobile.loading().hide(); // hide default "loading"
    var height = $(window).height() * (94 / 100) //calc(100% - 6vh)
    var width = $(window).width() - $(window).height() * 0.04 //calc(100% - 4vh)
    $('#upper_windows_1').animate({ "width": width, "height": height, "zoom": "100%", "left": "", "top": "" }, 500, 'easeInOutQuint', function () {
        $("#exit_button_1").animate({ "opacity": 1 }, 500)
    });
    jQuery_3_6_0.get("/app/personal", {
        //empty
    }, (res) => {
        console.log(res);
        wakeup_h = (res !== -1) ? res.getup_time[0] : 8;
        wakeup_m = (res !== -1) ? res.getup_time[0] : 30;
        sleep_h = (res !== -1) ? res.sleep_time[0] : 21;
        sleep_m = (res !== -1) ? res.sleep_time[0] : 0;
        $("#wakeup_hour").val(wakeup_h);
        $("#wakeup_minute").val(wakeup_m);
        $("#sleep_hour").val(sleep_h);
        $("#sleep_minute").val(sleep_m);
    });
});

$("#exit_button_1").click(function () {
    $("#setting_html").css("display", "none");
    $('#upper_windows_1').css({ "left": "10%", "top": "13%", "width": "70 %", "height": "70%", "zoom": "70%" });
    $("#exit_button_1").css("opacity", 0);
});

// get recent value (input)
$("#wakeup_hour").blur(function () {
    if ($(this).val() > 23 || $(this).val() < 0) {
        $(this).val("0")
    }
    if ($(this).val() % 1 != 0) {
        $(this).val(Math.floor($(this).val()))
    }
    console.log($(this).val());
    send_wake_time();
})
$("#wakeup_minute").blur(function () {
    if ($(this).val() > 59 || $(this).val() < 0) {
        $(this).val("0")
    }
    if ($(this).val() % 1 != 0) {
        $(this).val(Math.floor($(this).val()))
    }
    console.log($(this).val());
    send_wake_time();

})
$("#sleep_hour").blur(function () {
    if ($(this).val() > 23 || $(this).val() < 0) {
        $(this).val("0")
    }
    if ($(this).val() % 1 != 0) {
        $(this).val(Math.floor($(this).val()))
    }
    console.log($(this).val());
    send_sleep_time();

})
$("#sleep_minute").blur(function () {
    if ($(this).val() > 59 || $(this).val() < 0) {
        $(this).val("0")
    }
    if ($(this).val() % 1 != 0) {
        $(this).val(Math.floor($(this).val()))
    }
    console.log($(this).val());
    send_sleep_time();

})

function send_wake_time(params) {
    console.log($('wakeup_hour').val());
    console.log($('wakeup_minute').val());
    jQuery_3_6_0.post("/app/personal/getup", {
        getup_time:[$('wakeup_hour').val(),$('wakeup_minute').val()]
    }, (res) => {
        //empty
    });
}

function send_sleep_time(params) {
    console.log($('sleep_hour').val());
    console.log($('sleep_minute').val());
    jQuery_3_6_0.post("/app/personal/sleep", {
        sleep_time:[$('sleep_hour').val(),$('sleep_minute').val()]
    }, (res) => {
        //empty
    });
}

// logout
/*$("#setting_logout").click(function () {
    console.log("logout")
})*/

///////////////////// 共用 ///////////////////////
$(".button").bind('touchstart', function () {
    $(this).animate({ 'opacity': 0.7 }, 100)
})
$(".button").bind('touchend', function () {
    $(this).animate({ 'opacity': 1 }, 100)
})