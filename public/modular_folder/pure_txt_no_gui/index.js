var DEF_DEBUG = true;
var DEF_NO_HTML_DISP = false;
var DEF_field_battle = true;
var DEF_use_https = true;
var DEF_domain_name = "luffy.ee.ncku.edu.tw";
var DEF_port = "38443";
var DEF_path = "/app/reward";
//var DEF_mission_path = "/app/mission";

var DEF_LOGIC_OF_FEED_food = 1;
var DEF_LOGIC_OF_FEED_dessert = 1;

GLOBAL_full_url = "";

/*function update_mission(){
    var tmpRegExp = new RegExp(DEF_path,'g');
    $.get(GLOBAL_full_url.replace(tmpRegExp, DEF_mission_path), {
        //empty
    }, (objects_returned_by_the_server) => {
        if (DEF_DEBUG) {
            console.log(str(objects_returned_by_the_server));
        }
        document.getElementById("mission_food").innerText = JSON.stringify(parseInt(JSON.parse(objects_returned_by_the_server).eat_mission,10).toString(2));
        document.getElementById("mission_dessert").innerText = JSON.stringify(JSON.parse(objects_returned_by_the_server).dessert_mission);
    })
    //(yourNumber).toString(2)
}*/

function refresh_basic_num() {
    $.get(GLOBAL_full_url, {
        //empty
    }, (objects_returned_by_the_server) => {
        if (DEF_DEBUG) {
            console.log(String(objects_returned_by_the_server));
        }
        document.getElementById("show_exp_num").innerText = JSON.parse(objects_returned_by_the_server).exp;
        document.getElementById("show_food_num").innerText = JSON.parse(objects_returned_by_the_server).food;
        document.getElementById("show_dessert_num").innerText = JSON.parse(objects_returned_by_the_server).dessert;
    })
}

function init() {
    if (DEF_DEBUG) {
        console.log("dummiesTest success");
    } else {
        DEF_NO_HTML_DISP = true;
        DEF_field_battle = false;
        SET_ajex_full_json = false;
    }
    if (DEF_NO_HTML_DISP) {
        document.getElementById("dont_show_this_in_published_client").style.display = "none";
    }
    if (DEF_field_battle) {
        for (let ddb98b_button_loop_index = 0; ddb98b_button_loop_index < document.getElementsByClassName("ddb98b_button").length; ddb98b_button_loop_index++) {
            const ddb98b_button_element = document.getElementsByClassName("ddb98b_button")[ddb98b_button_loop_index];
            ddb98b_button_element.style.backgroundColor = "#ddb98b";
            ddb98b_button_element.style.height = "30px";
            ddb98b_button_element.style.width = "auto";
        }

    }
    GLOBAL_full_url = ((DEF_use_https) ? "https" : "http") + "://" + DEF_domain_name + ":" + DEF_port + DEF_path;
    if (DEF_DEBUG) {
        console.log(GLOBAL_full_url);
    }
    refresh_basic_num();
    //update_mission();
}

function usr_inp_post_fcn() {
    if (DEF_DEBUG) {
        console.log("usr_inp_post_btn click");
    }

    $.post(GLOBAL_full_url, {
        time: Date(),
        title: document.getElementById("usr_inp_title").value,
        txt: document.getElementById("usr_inp_txt").innerText
    }, (objects_returned_by_the_server) => {
        if (DEF_DEBUG) {
            console.log(String(objects_returned_by_the_server));
        }
        usr_inp_post_success(objects_returned_by_the_server);
    })

}

function usr_inp_food_fcn(e) {
    $.post(GLOBAL_full_url, {
        exp: parseInt(document.getElementById("show_exp_num").innerText, 10) + 1 * DEF_LOGIC_OF_FEED_food,
        food: parseInt(document.getElementById("show_food_num").innerText, 10) - 1,
        dessert: document.getElementById("show_dessert_num").innerText
    }, (objects_returned_by_the_server) => {
        if (DEF_DEBUG) {
            console.log(String(objects_returned_by_the_server));
        }
        refresh_basic_num();
    })
}
function usr_inp_dessert_fcn(e) {
    $.post(GLOBAL_full_url, {
        exp: parseInt(document.getElementById("show_exp_num").innerText, 10) + 1 * DEF_LOGIC_OF_FEED_dessert,
        food: document.getElementById("show_food_num").innerText,
        dessert: parseInt(document.getElementById("show_dessert_num").innerText, 10) + 1
    }, (objects_returned_by_the_server) => {
        if (DEF_DEBUG) {
            console.log(String(objects_returned_by_the_server));
        }
        refresh_basic_num();
    })
}
function updownleftleftrightright_exp_plus_fcn(e) {
    $.post(GLOBAL_full_url, {
        exp: parseInt(document.getElementById("show_exp_num").innerText, 10) + 1,
        food: document.getElementById("show_food_num").innerText,
        dessert: document.getElementById("show_dessert_num").innerText
    }, (objects_returned_by_the_server) => {
        if (DEF_DEBUG) {
            console.log(String(objects_returned_by_the_server));
        }
        refresh_basic_num();
    })
}
function updownleftleftrightright_exp_minus_fcn(e) {
    $.post(GLOBAL_full_url, {
        exp: parseInt(document.getElementById("show_exp_num").innerText, 10) - 1,
        food: document.getElementById("show_food_num").innerText,
        dessert: document.getElementById("show_dessert_num").innerText
    }, (objects_returned_by_the_server) => {
        if (DEF_DEBUG) {
            console.log(String(objects_returned_by_the_server));
        }
        refresh_basic_num();
    })
}
function updownleftleftrightright_food_plus_fcn(e) {
    $.post(GLOBAL_full_url, {
        exp: document.getElementById("show_exp_num").innerText,
        food: parseInt(document.getElementById("show_food_num").innerText, 10) + 1,
        dessert: document.getElementById("show_dessert_num").innerText
    }, (objects_returned_by_the_server) => {
        if (DEF_DEBUG) {
            console.log(String(objects_returned_by_the_server));
        }
        refresh_basic_num();
    })
}
function updownleftleftrightright_food_minus_fcn(e) {
    $.post(GLOBAL_full_url, {
        exp: document.getElementById("show_exp_num").innerText,
        food: parseInt(document.getElementById("show_food_num").innerText, 10) - 1,
        dessert: document.getElementById("show_dessert_num").innerText
    }, (objects_returned_by_the_server) => {
        if (DEF_DEBUG) {
            console.log(String(objects_returned_by_the_server));
        }
        refresh_basic_num();
    })
}
function updownleftleftrightright_dessert_plus_fcn(e) {
    $.post(GLOBAL_full_url, {
        exp: document.getElementById("show_exp_num").innerText,
        food: document.getElementById("show_food_num").innerText,
        dessert: parseInt(document.getElementById("show_dessert_num").innerText, 10) + 1
    }, (objects_returned_by_the_server) => {
        if (DEF_DEBUG) {
            console.log(String(objects_returned_by_the_server));
        }
        refresh_basic_num();
    })
}
function updownleftleftrightright_dessert_minus_fcn(e) {
    $.post(GLOBAL_full_url, {
        exp: document.getElementById("show_exp_num").innerText,
        food: document.getElementById("show_food_num").innerText,
        dessert: parseInt(document.getElementById("show_dessert_num").innerText, 10) - 1
    }, (objects_returned_by_the_server) => {
        if (DEF_DEBUG) {
            console.log(String(objects_returned_by_the_server));
        }
        refresh_basic_num();
    })
}

jQuery(function dom_ready(dom_ready_params) {

    init();

    //events
    document.getElementById("usr_inp_btn_food").addEventListener("click", usr_inp_food_fcn);
    document.getElementById("usr_inp_btn_dessert").addEventListener("click", usr_inp_dessert_fcn);
    document.getElementById("updownleftleftrightright_exp_plus").addEventListener("click", updownleftleftrightright_exp_plus_fcn);
    document.getElementById("updownleftleftrightright_exp_minus").addEventListener("click", updownleftleftrightright_exp_minus_fcn);
    document.getElementById("updownleftleftrightright_food_plus").addEventListener("click", updownleftleftrightright_food_plus_fcn);
    document.getElementById("updownleftleftrightright_food_minus").addEventListener("click", updownleftleftrightright_food_minus_fcn);
    document.getElementById("updownleftleftrightright_dessert_plus").addEventListener("click", updownleftleftrightright_dessert_plus_fcn);
    document.getElementById("updownleftleftrightright_dessert_minus").addEventListener("click", updownleftleftrightright_dessert_minus_fcn);

});