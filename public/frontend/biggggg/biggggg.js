var window_width = ($(window).width() / $(window).height() > 1.0) ? (9.0 * ($(window).height() / 16.0)) : $(window).width();
//console.error(window_width);

//////////////////////// home.js ///////////////////

// select animal (1, 2, 3)
$.mobile.loading().hide();
var window_open = 0
var animal = parseInt((document.getElementById('jade_user_info_choosedanimal')) ? document.getElementById('jade_user_info_choosedanimal').innerText : "0", 10);
/*switch (animal) {
    case 1:
        $("#back_block").html(`<div id="back1"></div>
        <img class="desktop_width_100" src="./frontend/biggggg/image/home_back1_land.svg" style="position:absolute; 
        bottom:10%; z-index:2;"><img class="desktop_width_100" src="./frontend/biggggg/image/home_back1_cloud.svg" 
        style="position:absolute; top:10%; z-index:1;"></img>`)
        $("#menu_back").css('background-color', '#61913D')
        break;
    case 2:
        $("#back_block").html(`<div id="back2_1"></div><div id="back2_2"></div>
        <img class="desktop_width_100" src="./frontend/biggggg/image/home_back2_cloud.svg" style="position:absolute; 
        top:10%; z-index:1;"><div id="sun"><img src="./frontend/biggggg/image/home_back2_sun.svg" 
        style="height:100%;"></div><img class="desktop_width_100" src="./frontend/biggggg/image/home_back2_sand.svg" 
        style="position:absolute; bottom:10%; z-index:3;"><img class="desktop_width_50" src="./frontend/biggggg/image/home_back2_unbrella.svg" 
        style="position:absolute; right:calc(var(--var_right_global_displacement) + 0%); top:20%; 
        z-index:4"><div id="tree"><img src="./frontend/biggggg/image/home_back2_tree.svg" style="width: 100%;"></div>
        <div id="coconut"><img src="./frontend/biggggg/image/home_back2_coconut.svg" style="width: 100%;"></div>`)
        $("#menu_back").css('background-color', '#004D69')
        break;
    case 3:
        $("#back_block").html(`<div id="back3"></div><img class="desktop_width_100" src="./frontend/biggggg/image/home_back3_cloud.svg" 
        style="position:absolute; top:10%; z-index:1;">
        <img class="desktop_width_100" src="./frontend/biggggg/image/home_back3_land.svg" style="position:absolute; 
        bottom:10%; z-index:2;"></img>`)
        $("#menu_back").css('background-color', '#61913D')
        break;
}*/
if ($("#animal_name").width() > window_width * 0.16) {
    $("#animal_name").text($("#animal_name").text().substring(0, 6))
    if ($("#animal_name").width() > window_width * 0.16) {
        $("#animal_name").text($("#animal_name").text().substring(0, 3))
    }
    $("#animal_name").append('...')
}
$("#touch_house").bind('touchstart', function () {
    $("#house").css('transform', "scale(1.1)")
})
$("#touch_house").bind('touchend', function () {
    $("#house").css('transform', "scale(1)")
})
var sleep = (document.getElementById("onsleep_stat")) ? (document.getElementById("onsleep_stat").innerText === "yes") ? true : false : false;
$("#touch_house").click(function () {
    if (!sleep) {
        $("#house").animate({}, 300, function () {
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
        jQuery_3_6_0.post("/app/medal/setWake", {}, {});
    } else {
        $("#house").animate({}, 300, function () {
            if (animal == 2) {
                $("#tree").css("left", "25%")
                $("#coconut").css("left", "25%")
            }
            $("#animal").show()
            $("#house").html('')
        })
        sleep = false
        jQuery_3_6_0.post("/app/medal/setSleep", {}, {});
    }
    jQuery_3_6_0.post("/app/personal/is_sleep", {
        is_sleep: sleep
    }, (res) => {
        //empty
    });
});

////////////////////////////// post.js //////////////////////

$("#social").click(function () {
    function checkFlag() {
        if (document.getElementById('snap_shoot_social_page_clean_html_stat').innerText !== '1') {
            setTimeout(() => {
                checkFlag();
            }, 5);
        } else {
            if (window_open == 0) {
                window_open = 1
                $("#post_html").show().css('z-index', "10")
                $.mobile.loading().hide(); // hide default "loading"
                var height = $(window).height() * (94 / 100) //calc(100% - 6vh)
                var width = window_width - $(window).height() * (4 / 100) //calc(100% - 4vh)
                $('#upper_windows').animate({ "width": width, "height": height, "zoom": "100%", "left": "", "top": "" }, 500, 'easeInOutQuint', function () {
                    $("#exit_button").animate({ "opacity": 1 }, 500);
                    document.getElementById('social_page_stat').innerText = 1;
                });
            }
        }
    }
    checkFlag();
});
$("#exit_button").click(function () {
    window_open = 0
    $("#post_html").css("display", "none")
    $('#upper_windows').css({ "left": "10%", "top": "13%", "width": "calc(var(--var_vw)*70)", "height": "70%", "zoom": "70%" })
    $("#exit_button").css("opacity", 0);

});

$('#new_post_text').focus(function () {
    if (document.getElementById("app_PostTmp_get_poop_img_sel_tmmp").innerText) {
        document.getElementById("add_photo").classList.add("glow");
    }
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
                    document.getElementById("GLOBAL_browse_post_on_scroll").click();
                });
            });
        });
    });
});
////////////////////////////// setting.js //////////////////////
// assign default value (previously stored value)
var wakeup_h = 8
var wakeup_m = 30
var sleep_h = 21
var sleep_m = 00

$("#setting").click(function () {
    if (window_open == 0) {
        window_open = 1
        $("#setting_html").show().css('z-index', "10")
        $.mobile.loading().hide(); // hide default "loading"
        var height = $(window).height() * (94 / 100) //calc(100% - 6vh)
        var width = window_width - $(window).height() * 0.04 //calc(100% - 4vh)
        $('#upper_windows_1').animate({ "width": width, "height": height, "zoom": "100%", "left": "", "top": "" }, 500, 'easeInOutQuint', function () {
            $("#exit_button_1").animate({ "opacity": 1 }, 500)
        });
        jQuery_3_6_0.get("/app/personal", {
            //empty
        }, (res) => {
            console.log(res);
            wakeup_h = (res !== -1) ? res.getup_time.hh || 8 : 8;
            wakeup_m = (res !== -1) ? res.getup_time.mm || 30 : 30;
            sleep_h = (res !== -1) ? res.sleep_time.hh || 21 : 21;
            sleep_m = (res !== -1) ? res.sleep_time.mm || 0 : 0;
            $("#wakeup_hour").val(wakeup_h);
            $("#wakeup_minute").val(wakeup_m);
            $("#sleep_hour").val(sleep_h);
            $("#sleep_minute").val(sleep_m);
        });
    }
});

$("#exit_button_1").click(function () {
    window_open = 0
    $("#setting_html").css("display", "none");
    $('#upper_windows_1').css({ "left": "10%", "top": "13%", "width": "calc(var(--var_vw)*70)", "height": "70%", "zoom": "70%" });
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
    console.log($('#wakeup_hour').val());
    console.log($('#wakeup_minute').val());
    jQuery_3_6_0.post("/app/personal/getup", {
        getup_time_0: $('#wakeup_hour').val(),
        getup_time_1: $('#wakeup_minute').val()
    }, (res) => {
        //empty
    });
}

function send_sleep_time(params) {
    console.log($('#sleep_hour').val());
    console.log($('#sleep_minute').val());
    jQuery_3_6_0.post("/app/personal/sleep", {
        sleep_time_0: $('#sleep_hour').val(),
        sleep_time_1: $('#sleep_minute').val()
    }, (res) => {
        //empty
    });
}

// logout
/*$("#setting_logout").click(function () {
    console.log("logout")
})*/

/////////////////////////////////// mission.js ///////////////////
$("#mission").click(function () {
    always_at_press_all_exit_ot_reload(false);
    if (window_open == 0) {
        window_open = 1
        $("#mission_html").show().css('z-index', "10")
        var height = $(window).height() * (94 / 100) //calc(100% - 6vh)
        var width = window_width - $(window).height() * (4 / 100) //calc(100% - 4vh)
        $('#upper_windows_2').animate({ "width": width, "height": height, "zoom": "100%", "left": "", "top": "" }, 500, 'easeInOutQuint', function () {
            $("#exit_button_2").animate({ "opacity": 1 }, 500);
        });

    }
});
$("#exit_button_2").click(function () {
    window_open = 0
    $("#mission_html").css("display", "none");
    $('#upper_windows_2').css({ "left": "10%", "top": "13%", "width": "calc(var(--var_vw)*70)", "height": "70%", "zoom": "70%" });
    $("#exit_button_2").css("opacity", 0);
});

// andy 
// 日常任務完成狀態
/*if (1) {
    // 任務未完成 // 底色 : 灰 
    $("#daily_wakeup").css('background-color', '#dfdfdf')
}*/
//andy
// 持續任務目前階段
var conti_stroll = 0; //累積散步量
var conti_post = 0; //累積發文數 
var conti_comment = 0; // ...etc
var conti_level = 0;
var DEBUG_DATA_SHOW = true;
//var cancel_the_preset_logic = true;
var mis1_data_cur = {
    wake: false,
    sleep: false,
    picture: false,
    stroll: false
};
/*var mis1_data_tmp = {
    wake: false,
    sleep: false,
    picture: false,
    stroll: false
};*/

/*var exp_data_tmp = 0;*/
var exp_data = 0;
var goal_data_1 = 0;
var goal_data_2 = 0;
var goal_data_3 = 0;
var goal_data_4 = 0;
/*var goal_data_1_tmp = 0;
var goal_data_2_tmp = 0;
var goal_data_3_tmp = 0;
var goal_data_4_tmp = 0;*/

var ary_0 = 0; //finished post data backend trans
var ary_1 = [false, false, false, false, false, false, false, false, false, false, false, false]; //real data 散步累積
var ary_2 = [false, false, false, false, false, false, false, false]; //real data 發文累積
var ary_3 = [false, false, false, false, false, false, false, false]; //real data 留言累積
var ary_4 = [false, false, false, false, false, false, false, false]; //real data 等級達到 
/*var ary_1_tmp = [false, false, false, false, false, false, false, false, false, false, false, false]; //real data 散步累積
var ary_2_tmp = [false, false, false, false, false, false, false, false]; //real data 發文累積
var ary_3_tmp = [false, false, false, false, false, false, false, false]; //real data 留言累積
var ary_4_tmp = [false, false, false, false, false, false, false, false]; //real data 等級達到  */
var a_count_1 = 0;
var a_count_2 = 0;
var a_count_3 = 0;
var a_count_4 = 0; //real data countS
/*$("#continuous_stroll").html('散步累積 ' + conti_stroll + ' km')
$("#continuous_post").html('發文累積 ' + conti_post + ' 篇')
$("#continuous_comment").html('留言累積 ' + conti_comment + ' 則')
$("#continuous_level").html('等級達到 ' + conti_level + ' 等')*/

/////////////////////////////////// medal.js ///////////////////

$("#medal_button").click(function () {
    if (window_open == 0) {
        window_open = 1

        $("#medal_html").show().css('z-index', "10")
        var height = $(window).height() * (94 / 100) //calc(100% - 6vh)
        var width = window_width - $(window).height() * (4 / 100) //calc(100% - 4vh)
        $('#upper_windows_3').animate({ "width": width, "height": height, "zoom": "100%", "left": "", "top": "" }, 500, 'easeInOutQuint', function () {
            $("#exit_button_3").animate({ "opacity": 1 }, 500);
        });

        med_trig(true);
    }
});
$("#exit_button_3").click(function () {
    window_open = 0
    $("#medal_html").css("display", "none");
    $('#upper_windows_3').css({ "left": "10%", "top": "13%", "width": "calc(var(--var_vw)*70)", "height": "70%", "zoom": "70%" });
    $("#exit_button_3").css("opacity", 0);
});


function med_trig(cancel_the_preset_logic) {

    a_count_1 = 0;
    a_count_2 = 0;
    a_count_3 = 0;
    a_count_4 = 0;
    $.getJSON("./frontend/biggggg/medal.json", function (json) {

        document.getElementById('medal_table').innerHTML = "";
        var tb = document.createElement("table")
        $(tb).attr("width", "100%")
        var tbBody = document.createElement("tbody")
        for (var i = 0; i < 9; i++) {
            var row = document.createElement("tr")
            for (var j = 0; j < 4; j++) {
                var cell = document.createElement("td");
                var img = document.createElement("div")
                $(img).addClass("medal_img")
                var text = document.createElement("div")
                $(text).addClass("medal_font")
                if (i < 3) {
                    $(text).html(json.amount[i * 4 + j] + 'km')
                    if (!cancel_the_preset_logic) {
                        if (json.amount[i * 4 + j] > conti_stroll) { // 未達成
                            $(text).css("color", "#c9c9c9")
                            $(img).css('background-image', 'url(' + json.img_g[i] + ')')
                        } else { // 達成
                            $(img).css('background-image', 'url(' + json.img[i] + ')')
                        }
                    } else {
                        if (!JSON.parse(document.getElementById("obj_data_container").innerText).ary_1_tmp[a_count_1]) { // 未達成
                            $(text).css("color", "#c9c9c9")
                            $(img).css('background-image', 'url(' + json.img_g[i] + ')')
                        } else { // 達成
                            $(img).css('background-image', 'url(' + json.img[i] + ')')
                        }
                    }
                    a_count_1 = a_count_1 + 1;
                } else if (i < 5) {
                    $(text).html(json.amount[i * 4 + j] + '篇')
                    if (!cancel_the_preset_logic) {
                        if (json.amount[i * 4 + j] > conti_post) {
                            $(text).css("color", "#c9c9c9")
                            $(img).css('background-image', 'url(' + json.img_g[i] + ')')
                        } else {
                            $(img).css('background-image', 'url(' + json.img[i] + ')')
                        }
                    } else {
                        if (!JSON.parse(document.getElementById("obj_data_container").innerText).ary_2_tmp[a_count_2]) {
                            $(text).css("color", "#c9c9c9")
                            $(img).css('background-image', 'url(' + json.img_g[i] + ')')
                        } else {
                            $(img).css('background-image', 'url(' + json.img[i] + ')')
                        }
                    }
                    a_count_2 = a_count_2 + 1;
                } else if (i < 7) {
                    $(text).html(json.amount[i * 4 + j] + '則')
                    if (!cancel_the_preset_logic) {
                        if (json.amount[i * 4 + j] > conti_comment) {
                            $(text).css("color", "#c9c9c9")
                            $(img).css('background-image', 'url(' + json.img_g[i] + ')')
                        } else {
                            $(img).css('background-image', 'url(' + json.img[i] + ')')
                        }
                    } else {
                        if (!JSON.parse(document.getElementById("obj_data_container").innerText).ary_3_tmp[a_count_3]) {
                            $(text).css("color", "#c9c9c9")
                            $(img).css('background-image', 'url(' + json.img_g[i] + ')')
                        } else {
                            $(img).css('background-image', 'url(' + json.img[i] + ')')
                        }
                    }
                    a_count_3 = a_count_3 + 1;
                } else {
                    $(text).html(json.amount[i * 4 + j] + '等')
                    if (!cancel_the_preset_logic) {
                        if (json.amount[i * 4 + j] > conti_level) {
                            $(text).css("color", "#c9c9c9")
                            $(img).css('background-image', 'url(' + json.img_g[i] + ')')
                        } else {
                            $(img).css('background-image', 'url(' + json.img[i] + ')')
                        }
                    } else {
                        if (!JSON.parse(document.getElementById("obj_data_container").innerText).ary_4_tmp[a_count_4]) {
                            $(text).css("color", "#c9c9c9")
                            $(img).css('background-image', 'url(' + json.img_g[i] + ')')
                        } else {
                            $(img).css('background-image', 'url(' + json.img[i] + ')')
                        }
                    }
                    a_count_4 = a_count_4 + 1;
                }
                cell.append(img)
                cell.append(text)
                row.append(cell)
            }
            tbBody.append(row)
        }
        tb.append(tbBody)
        $("#medal_table").append(tb)
    });
}
med_trig(false);

$(".exit_button_function_to_return_to_the_main_screen").click((event) => {
    if (event.target.id === "exit_button_2") {
        always_at_exit_bton_of_miss_page_clicked(always_at_press_all_exit_ot_reload(true));
    } else {
        always_at_press_all_exit_ot_reload(true);
    }
});


function always_at_press_all_exit_ot_reload(not_always_at_mis_page_clicked) {
    //init
    ary_0 = 0;
    document.getElementById("obj_data_container_ary_0").innerText = "0";
    exp_data_cur = 0;
    exp_data_tmp = 0;
    mis1_data_cur = {
        wake: false,
        sleep: false,
        picture: false,
        stroll: false
    };
    goal_data_1 = 0;
    goal_data_2 = 0;
    goal_data_3 = 0;
    goal_data_4 = 0;
    ary_1 = [false, false, false, false, false, false, false, false, false, false, false, false]; //real data 散步累積
    ary_2 = [false, false, false, false, false, false, false, false]; //real data 發文累積
    ary_3 = [false, false, false, false, false, false, false, false]; //real data 留言累積
    ary_4 = [false, false, false, false, false, false, false, false]; //real data 等級達到 
    jQuery_3_6_0.get("/app/medal/getEXP", {
        //empty
    }, (res) => {
        if (res) {
            if (DEBUG_DATA_SHOW) console.log(typeof res);
            if (DEBUG_DATA_SHOW) console.log(res);
            ary_0 = ary_0 + 1;
            document.getElementById("obj_data_container_ary_0").innerText = String(parseInt(document.getElementById("obj_data_container_ary_0").innerText) + 1);
            exp_data_cur = parseInt(res);
        }
    });
    jQuery_3_6_0.get("/app/medal/getdaily", {
        //empty
    }, (res) => {
        if (res) {
            if (DEBUG_DATA_SHOW) console.log(typeof res);
            if (DEBUG_DATA_SHOW) console.log(res);
            ary_0 = ary_0 + 1;
            document.getElementById("obj_data_container_ary_0").innerText = String(parseInt(document.getElementById("obj_data_container_ary_0").innerText) + 1);

            mis1_data_cur.wake = res.wake;
            mis1_data_cur.sleep = res.sleep;
            mis1_data_cur.picture = res.picture;
            mis1_data_cur.stroll = res.stroll;
        }
    });
    jQuery_3_6_0.get("/app/medal/getWalk", {
        //empty
    }, (res) => {
        if (res) {
            if (DEBUG_DATA_SHOW) console.log(typeof res);
            if (DEBUG_DATA_SHOW) console.log(res);
            ary_0 = ary_0 + 1;
            document.getElementById("obj_data_container_ary_0").innerText = String(parseInt(document.getElementById("obj_data_container_ary_0").innerText) + 1);

            ary_1 = res.progress;
            goal_data_1 = res.goal;
            if (DEBUG_DATA_SHOW) console.log(res.progress);
        }
    });
    jQuery_3_6_0.get("/app/medal/getPost", {
        //empty
    }, (res) => {
        if (res) {
            goal_data_2 = res.goal;
            if (DEBUG_DATA_SHOW) console.log(typeof res);
            if (DEBUG_DATA_SHOW) console.log(res.progress);
            if (DEBUG_DATA_SHOW) console.log(res);
            ary_0 = ary_0 + 1;
            document.getElementById("obj_data_container_ary_0").innerText = String(parseInt(document.getElementById("obj_data_container_ary_0").innerText) + 1);

            ary_2 = res.progress;
        }
    });
    jQuery_3_6_0.get("/app/medal/getMessage", {
        //empty
    }, (res) => {
        if (res) {
            goal_data_3 = res.goal;
            if (DEBUG_DATA_SHOW) console.log(typeof res);
            if (DEBUG_DATA_SHOW) console.log(res.progress);
            if (DEBUG_DATA_SHOW) console.log(res);
            ary_0 = ary_0 + 1;
            document.getElementById("obj_data_container_ary_0").innerText = String(parseInt(document.getElementById("obj_data_container_ary_0").innerText) + 1);

            ary_3 = res.progress;
        }
    });
    jQuery_3_6_0.get("/app/medal/getLevel", {
        //empty
    }, (res) => {
        if (res) {
            goal_data_4 = res.goal;
            if (DEBUG_DATA_SHOW) console.log(typeof res);
            if (DEBUG_DATA_SHOW) console.log(res.progress);
            if (DEBUG_DATA_SHOW) console.log(res);
            ary_0 = ary_0 + 1;
            document.getElementById("obj_data_container_ary_0").innerText = String(parseInt(document.getElementById("obj_data_container_ary_0").innerText) + 1);

            ary_4 = res.progress;
        }
    });

    function checkFlag() {
        if ( /*ary_0 !== 6*/ document.getElementById("obj_data_container_ary_0").innerText !== "6") {
            setTimeout(() => {
                checkFlag();
            }, 5);
        } else {
            if (not_always_at_mis_page_clicked) {
                console.log("not_always_at_mis_page_clicked");
                var debaft = true;
                if (DEBUG_DATA_SHOW) console.log(`function checkFlag() {
            if (ary_0 !== 6) {
                setTimeout(() => {
                    checkFlag();
                }, 5);
            } else {console.log(`);
                if (DEBUG_DATA_SHOW || debaft) console.log(ary_1);
                if (DEBUG_DATA_SHOW || debaft) console.log(ary_2);
                if (DEBUG_DATA_SHOW || debaft) console.log(ary_3);
                if (DEBUG_DATA_SHOW || debaft) console.log(ary_4);
                if (DEBUG_DATA_SHOW || debaft) console.log(goal_data_1);
                if (DEBUG_DATA_SHOW || debaft) console.log(goal_data_2);
                if (DEBUG_DATA_SHOW || debaft) console.log(goal_data_3);
                if (DEBUG_DATA_SHOW || debaft) console.log(goal_data_4);
                if (DEBUG_DATA_SHOW || debaft) console.log(mis1_data_cur.wake);
                if (DEBUG_DATA_SHOW || debaft) console.log(mis1_data_cur.sleep);
                if (DEBUG_DATA_SHOW || debaft) console.log(mis1_data_cur.picture);

                if (DEBUG_DATA_SHOW || debaft) console.log(mis1_data_cur.stroll);
                /*exp_data_cur.wake = res.wake; exp_data_cur.sleep = res.sleep;
                            exp_data_cur.picture = res.picture; exp_data_cur.stroll = res.stroll;*/
                // console.log(exp_data_cur);

                if (DEBUG_DATA_SHOW || debaft) console.log(exp_data_cur);

                if (JSON.stringify(ary_1) !== JSON.stringify(JSON.parse(document.getElementById("obj_data_container").innerText).ary_1_tmp) ||
                    JSON.stringify(ary_2) !== JSON.stringify(JSON.parse(document.getElementById("obj_data_container").innerText).ary_2_tmp) ||
                    JSON.stringify(ary_3) !== JSON.stringify(JSON.parse(document.getElementById("obj_data_container").innerText).ary_3_tmp) ||
                    JSON.stringify(ary_4) !== JSON.stringify(JSON.parse(document.getElementById("obj_data_container").innerText).ary_4_tmp) ||
                    /*goal_data_1 !== goal_data_1_tmp || goal_data_2 !== goal_data_2_tmp || goal_data_3 !== goal_data_3_tmp || goal_data_4 !== goal_data_4_tmp ||*/
                    mis1_data_cur.wake !== JSON.parse(document.getElementById("obj_data_container").innerText).mis1_data_tmp_wake ||
                    mis1_data_cur.sleep !== JSON.parse(document.getElementById("obj_data_container").innerText).mis1_data_tmp_sleep ||
                    mis1_data_cur.picture !== JSON.parse(document.getElementById("obj_data_container").innerText).mis1_data_tmp_picture ||
                    mis1_data_cur.stroll !== JSON.parse(document.getElementById("obj_data_container").innerText).mis1_data_tmp_stroll ||
                    exp_data_cur !== JSON.parse(document.getElementById("obj_data_container").innerText).exp_data_tmp
                ) {
                    mission_remind_have_params(true);
                } else {
                    mission_remind_have_params(false);
                }
            } else { //always_at_mis_page_clicked

                $.getJSON("./frontend/biggggg/medal.json", function (json) {
                    console.log(ary_1);
                    for (let index = 0; index < json.stroll.exp.length; index++) {
                        if (index + 1 === json.stroll.exp.length) {
                            conti_stroll = json.stroll.amount[index];
                            break;
                        } else if (index === 0 && ary_1[index] === false) {
                            conti_stroll = json.stroll.amount[index];
                            break;
                        } else if (ary_1[index] === true && ary_1[index + 1] === false) {
                            conti_stroll = json.stroll.amount[index + 1];
                            break;
                        } else {
                            //empty
                        }
                    }
                    for (let index = 0; index < json.post.exp.length; index++) {
                        if (index + 1 === json.post.exp.length) {
                            conti_post = json.post.amount[index];
                            break;
                        } else if (index === 0 && ary_2[index] === false) {
                            conti_post = json.post.amount[index];
                            break;
                        } else if (ary_2[index] === true && ary_2[index + 1] === false) {
                            conti_post = json.post.amount[index + 1];
                            break;
                        } else {
                            //empty
                        }
                    }
                    for (let index = 0; index < json.comment.exp.length; index++) {
                        if (index + 1 === json.comment.exp.length) {
                            conti_comment = json.comment.amount[index];
                            break;
                        } else if (index === 0 && ary_3[index] === false) {
                            conti_comment = json.comment.amount[index];
                            break;
                        } else if (ary_3[index] === true && ary_3[index + 1] === false) {
                            conti_comment = json.comment.amount[index + 1];
                            break;
                        } else {
                            //empty
                        }
                    }
                    for (let index = 0; index < json.level.exp.length; index++) {
                        if (index + 1 === json.level.exp.length) {
                            conti_level = json.level.amount[index];
                            break;
                        } else if (index === 0 && ary_4[index] === false) {
                            conti_level = json.level.amount[index];
                            break;
                        } else if (ary_4[index] === true && ary_4[index + 1] === false) {
                            conti_level = json.level.amount[index + 1];
                            break;
                        } else {
                            //empty
                        }
                    }
                    /*conti_stroll=json.stroll
                    conti_post=json.post
                    conti_comment=json.comment
                    conti_level=json.level*/
                    $("#continuous_stroll").html('散步累積 ' + Math.round(goal_data_1 / 1000) + "/" + conti_stroll + ' km')
                    $("#continuous_post").html('發文累積 ' + goal_data_2 + "/" + conti_post + ' 篇')
                    $("#continuous_comment").html('留言累積 ' + goal_data_3 + "/" + conti_comment + ' 則')
                    $("#continuous_level").html('等級達到 ' + goal_data_4 + "/" + conti_level + ' 等')
                    $("#daily_wakeup").css('background-color', (mis1_data_cur.wake) ? "#dfdfdf" : "#D9E483")
                    $("#daily_sleep").css('background-color', (mis1_data_cur.sleep) ? "#dfdfdf" : "#D9E483")
                    $("#daily_shoot").css('background-color', (mis1_data_cur.picture) ? "#dfdfdf" : "#D9E483")
                    $("#daily_stroll").css('background-color', (mis1_data_cur.stroll) ? "#dfdfdf" : "#D9E483")
                    mission_remind_have_params(false);
                });
                document.getElementById("obj_data_container").innerText = JSON.stringify({
                    ary_1_tmp: ary_1,
                    ary_2_tmp: ary_2,
                    ary_3_tmp: ary_3,
                    ary_4_tmp: ary_4,
                    goal_data_1_tmp: goal_data_1,
                    goal_data_2_tmp: goal_data_2,
                    goal_data_3_tmp: goal_data_3,
                    goal_data_4_tmp: goal_data_4,
                    mis1_data_tmp_wake: mis1_data_cur.wake,
                    mis1_data_tmp_sleep: mis1_data_cur.sleep,
                    mis1_data_tmp_picture: mis1_data_cur.picture,
                    mis1_data_tmp_stroll: mis1_data_cur.stroll,
                    exp_data_tmp: exp_data_cur
                });
                jQuery_3_6_0.post("/app/mid_data_tmp", {
                    tmp: JSON.stringify({
                        ary_1_tmp: ary_1,
                        ary_2_tmp: ary_2,
                        ary_3_tmp: ary_3,
                        ary_4_tmp: ary_4,
                        goal_data_1_tmp: goal_data_1,
                        goal_data_2_tmp: goal_data_2,
                        goal_data_3_tmp: goal_data_3,
                        goal_data_4_tmp: goal_data_4,
                        mis1_data_tmp_wake: mis1_data_cur.wake,
                        mis1_data_tmp_sleep: mis1_data_cur.sleep,
                        mis1_data_tmp_picture: mis1_data_cur.picture,
                        mis1_data_tmp_stroll: mis1_data_cur.stroll,
                        exp_data_tmp: exp_data_cur
                    })
                }, (res) => {
                    //empty
                });
            }
        }
    }
    checkFlag();
}

function always_at_exit_bton_of_miss_page_clicked(callback) {
    exp_data_tmp = JSON.parse(document.getElementById("obj_data_container").innerText).exp_data_tmp;
    /*mis1_data_tmp.wake = mis1_data_cur.wake;
    mis1_data_tmp.sleep = mis1_data_cur.sleep;
    mis1_data_tmp.picture = mis1_data_cur.picture;
    mis1_data_tmp.stroll = mis1_data_cur.stroll;
    //exp_data_tmp = exp_data;
    //console.log(exp_data);
    goal_data_1_tmp = goal_data_1; goal_data_2_tmp = goal_data_2; goal_data_3_tmp = goal_data_3; goal_data_4_tmp = goal_data_4;
    for (let index = 0; index < ary_1.length; index++) {
        ary_1_tmp[index] = ary_1[index];
    } for (let index = 0; index < ary_2.length; index++) {
        ary_2_tmp[index] = ary_2[index];
    } for (let index = 0; index < ary_3.length; index++) {
        ary_3_tmp[index] = ary_3[index];
    } for (let index = 0; index < ary_4.length; index++) {
        ary_4_tmp[index] = ary_4[index];
    }*/
    //console.log((jQuery_3_6_0("#level_value").width));
    //console.log(exp_data_tmp);
    /*if (document.getElementById("expbar_if_const_set") === "0") {
        document.getElementById("expbar_if_const_set") = "1";
        document.getElementById("expbar_const") = String(jQuery_3_6_0("#level_value").width);*/
    jQuery_3_6_0("#level_value").css("width", `calc(var(--var_vw)*25*${exp_data_tmp}/100)`);
    document.getElementById("level_text").innerText = `LV${(!document.getElementById("obj_data_container")) ? "0" : String(JSON.parse(document.getElementById("obj_data_container").innerText).goal_data_4)}`;
    /*} else {
        jQuery_3_6_0("#level_value").width = parseInt(document.getElementById("expbar_const")) * exp_data_tmp;
    }*/
    med_trig(true);

    //The code below must be placed at the bottom of this function
    // 如果 callback 是個函式就呼叫它
    if (typeof callback === 'function') {
        callback();
    }
}


//////////////// map (index_main.js) /////////////////
$("#stroll").click(function () {
    if (window_open == 0) {
        window.location.href = "/ts/mapview";
    }
});

///////////////////// 共用 ///////////////////////
$(".button").bind('touchstart', function () {
    $(this).animate({ 'opacity': 0.7 }, 100)
})
$(".button").bind('touchend', function () {
    $(this).animate({ 'opacity': 1 }, 100)
});

//The code below must be placed at the end of this file. Random movement logic may be wrong
function mission_remind_have_params(true_false) {
    // mission remind // 0, 1(have "!")
    //var mission_complete = 0
    if (true_false) {
        $("#remind").css("opacity", "1");
    } else {
        $("#remind").css("opacity", "0");
    }
}
jQuery_3_6_0.get("/app/mid_data_tmp", {
    //empty
}, (res) => {
    document.getElementById("obj_data_container").innerText = JSON.stringify(res);
});
always_at_press_all_exit_ot_reload(true);

function codeAddress() {
    $("#waiting_block").css('display', "none")
}
window.onload = codeAddress;