var this_url_path_re = /\/main/gi;

var DEF_DEBUG = true;
var DEF_NO_HTML_DISP = false;
var DEF_field_battle = false;
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
        document.getElementById("new_post_text").rows = 5;
        document.getElementById("new_post_text").cols = 60;
        document.getElementById("new_post_button").style.height = "30px";
        document.getElementById("new_post_button").style.width = "30px";
        document.getElementById("new_post_button").style.backgroundColor = "#ddb98b";
        document.getElementById("usr_inp_title").value = "Preset things";
    }
    //GLOBAL_full_url = ((DEF_use_https) ? "https" : "http") + "://" + DEF_domain_name + ":" + DEF_port + DEF_path;
    if (DEF_DEBUG) {
        console.log(DEF_path);
    }
}

function usr_inp_post_success(objects_returned_by_the_server) {
    if (DEF_DEBUG) {
        console.log((JSON.parse(objects_returned_by_the_server).hasOwnProperty("id")) ? "yes" : "no");
    }
    document.getElementById("usr_inp_send_success").innerText = (JSON.parse(objects_returned_by_the_server).hasOwnProperty("id")) ? "post_success?yes" : "post_success?no";
    $("#new_post_text").val('');
    document.getElementById('add_photo').classList.remove('glow');
    jQuery_3_6_0.get('/app/posttmp/poop_tmmp_clear  ', {
        //empty
    }, (objects_returned_by_the_server) => {
        if (objects_returned_by_the_server === "success") {
            //only console log
        } else {
            //only console log
        }
    });
}

function usr_inp_post_fcn() {
    if (DEF_DEBUG) {
        console.log("usr_inp_post_btn click");
    }

    if (SET_ajex_full_json) {
        jQuery_3_6_0.post(DEF_path, {
            poop: "{\"id\":\"6092b210779ced6502375e01\",\"time\":\"1999-12-31T02:01:01.000Z\",\"title\":\"poop3\",\"text\":\"test\",\"img\":\"img03\",\"comment\":[\"{\\\"user_id\\\":\\\"akaishuichi\\\",\\\"time\\\":\\\"1999-12-31T23:01:01.000Z\\\",\\\"text\\\":\\\"test\\\"}\"]}"
        }, (objects_returned_by_the_server) => {
            if (DEF_DEBUG) {
                console.log(objects_returned_by_the_server);
                usr_inp_post_success(objects_returned_by_the_server);
            }
        });
    } else {
        if (DEF_DEBUG) {
            console.log(Date());
            console.log(document.getElementById("usr_inp_title").value);
            console.log(document.getElementById("new_post_text").value);
            console.log(document.getElementById("usr_inp_img_num").innerText);
        }

        jQuery_3_6_0.post(DEF_path, {
            time: Date(),
            title: document.getElementById("usr_inp_title").value,
            text: document.getElementById("new_post_text").value,
            imgid: document.getElementById("usr_inp_img_num").innerText,
        }, (objects_returned_by_the_server) => {
            if (DEF_DEBUG) {
                console.log(String(objects_returned_by_the_server));
            }
            usr_inp_post_success(objects_returned_by_the_server);
        });

    }

}

document.getElementById('social').addEventListener("click", function () {
    function checkFlag() {
        if (document.getElementById('new_post_button_on_loaded_stat').innerText !== '1') {
            setTimeout(() => {
                checkFlag();
            }, 5);
        } else {
            init();

            //events
            document.getElementById("new_post_button").addEventListener("click", usr_inp_post_fcn);

        }
    }
    checkFlag();
});

document.getElementById('add_photo').addEventListener("click", function () {
    jQuery_3_6_0.post('/app/posttmp/pooptmmp', {
        post_tmmp: document.getElementById("new_post_text").value
    }, (objects_returned_by_the_server) => {
        if (objects_returned_by_the_server === "success") {
            var newstr = window.location.href.replace(this_url_path_re, "/ga");
            window.location.href = newstr;
        } else {
            console.error("internet error when Open album");
        }
    });
});
