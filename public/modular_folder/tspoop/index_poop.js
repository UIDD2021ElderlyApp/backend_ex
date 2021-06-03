var this_url_path_re=/\/ts\/poop/gi;

var DEF_DEBUG = true;
var DEF_NO_HTML_DISP = false;
var DEF_field_battle = true;
var DEF_use_https = true;
//var DEF_domain_name = "luffy.ee.ncku.edu.tw";
//var DEF_port = "38443";
//var DEF_path = "/app/poop";
var SET_ajex_full_json = false;//need false when pub.!

GLOBAL_full_url = window.location.href.replace(this_url_path_re, "/app/poop");//"";

function init() {
    if (DEF_DEBUG) {
        console.log("dummiesTest success");
    } else {
        DEF_NO_HTML_DISP = true;
        DEF_field_battle = false;
        SET_ajex_full_json = false;
    }
    
    if (DEF_field_battle) {
        document.getElementById("usr_inp_txt").rows = 5;
        document.getElementById("usr_inp_txt").cols = 60;
        document.getElementById("usr_inp_post_btn").style.height = "30px";
        document.getElementById("usr_inp_post_btn").style.width = "30px";
        document.getElementById("usr_inp_post_btn").style.backgroundColor = "#ddb98b";
        document.getElementById("usr_inp_title").value = "Preset things";
    }
    //GLOBAL_full_url = ((DEF_use_https) ? "https" : "http") + "://" + DEF_domain_name + ":" + DEF_port + DEF_path;
    if (DEF_DEBUG) {
        console.log(GLOBAL_full_url);
    }
}

function usr_inp_post_success(objects_returned_by_the_server) {
    if (DEF_DEBUG) {
        console.log((JSON.parse(objects_returned_by_the_server).hasOwnProperty("id")) ? "yes" : "no");
    }
    document.getElementById("usr_inp_send_success").innerText = (JSON.parse(objects_returned_by_the_server).hasOwnProperty("id")) ? "post_success?yes" : "post_success?no";
}

function usr_inp_post_fcn() {
    if (DEF_DEBUG) {
        console.log("usr_inp_post_btn click");
    }

    if (SET_ajex_full_json) {
        $.post(GLOBAL_full_url, {
            poop: "{\"id\":\"6092b210779ced6502375e01\",\"time\":\"1999-12-31T02:01:01.000Z\",\"title\":\"poop3\",\"text\":\"test\",\"img\":\"img03\",\"comment\":[\"{\\\"user_id\\\":\\\"akaishuichi\\\",\\\"time\\\":\\\"1999-12-31T23:01:01.000Z\\\",\\\"text\\\":\\\"test\\\"}\"]}"
        }, (objects_returned_by_the_server) => {
            if (DEF_DEBUG) {
                console.log(objects_returned_by_the_server);
                usr_inp_post_success(objects_returned_by_the_server);
            }
        })
    } else {
        if (DEF_DEBUG) {
            console.log(Date());
            console.log(document.getElementById("usr_inp_title").value);
            console.log(document.getElementById("usr_inp_txt").value);
            console.log(document.getElementById("usr_inp_img_num").innerText);
        }

        $.post(GLOBAL_full_url, {
            time: Date(),
            title: document.getElementById("usr_inp_title").value,
            text: document.getElementById("usr_inp_txt").value,
            imgid: document.getElementById("usr_inp_img_num").innerText,
        }, (objects_returned_by_the_server) => {
            if (DEF_DEBUG) {
                console.log(String(objects_returned_by_the_server));
            }
            usr_inp_post_success(objects_returned_by_the_server);
        })

    }

}

jQuery(function dom_ready(dom_ready_params) {

    init();

    //events
    document.getElementById("usr_inp_post_btn").addEventListener("click", usr_inp_post_fcn);

});