var DEF_DEBUG = true;
var GLOBAL_url = "/users/login";
/*require.config({
    paths: { "bcrypt": "../javascripts/bcrypt.js-master/dist/bcrypt" }
});*/

function login_button_click() {
    var is_this_a_login_Q = true;
    var inputs = document.getElementsByTagName("input");
    var usrn = "";
    var acct = "";
    var pasw = "";
    var pasc = "";
    for (let inputs_index = 0; inputs_index < inputs.length; inputs_index++) {
        const inputs_element = inputs[inputs_index];
        if (DEF_DEBUG) {
            console.log(inputs_element.type);
            console.log(inputs_element.name);
        }
        if (String(inputs_element.type) === "text") {
            if (String(inputs_element.name) === "user_name") {
                usrn = inputs_element.value;
                if (DEF_DEBUG) {
                    console.log(usrn);
                }
            } else if (String(inputs_element.name) === "account") {
                acct = inputs_element.value;
                if (DEF_DEBUG) {
                    console.log(acct);
                }
            } else if (String(inputs_element.name) === "password") {
                pasw = inputs_element.value;
                if (DEF_DEBUG) {
                    console.log(pasw);
                }
            } else if (String(inputs_element.name) === "password_confirm") {
                pasc = inputs_element.value;
                if (DEF_DEBUG) {
                    console.log(pasc);
                }
            }
        }
    }

    if (!usrn) {
        if (DEF_DEBUG) {
            console.log("!usrn");
        }
        is_this_a_login_Q = true;
    }
    if (!acct) {
        if (DEF_DEBUG) {
            console.log("!acct");
        }
        is_this_a_login_Q = false;
    }
    if (!pasw) {
        if (DEF_DEBUG) {
            console.log("!pasw");
        }
        is_this_a_login_Q = false;
    }
    if (!pasc) {
        if (DEF_DEBUG) {
            console.log("!pasc");
        }
        is_this_a_login_Q = true;
    }
    if (is_this_a_login_Q) {
        $.post(GLOBAL_url, {
            username: acct,
            password: pasw
        }, (objects_returned_by_the_server) => {
            if (DEF_DEBUG) {
                console.log(objects_returned_by_the_server);
            }
            var re = /\/users\/login/gi;
            var newstr = window.location.href.replace(re, objects_returned_by_the_server);
            window.location.href = newstr;
        });
    }
}

/*function add_an_user() {
    $.post("/user/register", {
        name: "name",
        password: pasw,
        email: "email@email.com",
        username: Date.now().toString(),
        password: "psw",
        password2: "psw"
    }, (objects_returned_by_the_server) => {
        if (DEF_DEBUG) {
            console.log(objects_returned_by_the_server);
        }
        var re = /\/users\/login/gi;
        var newstr = window.location.href.replace(re, objects_returned_by_the_server);
        window.location.href = newstr;
    });
}*/

jQuery(function dom_ready(dom_ready_params) {
    document.getElementById("login_button").addEventListener("click", login_button_click);
    //document.getElementById("add_an_user").addEventListener("click", add_an_user);
    /*require(["bcrypt"], function (bcrypt) {
        bcrypt.genSalt(10, function (err, salt) {
            console.log(salt);
        });
    });*/
    document.getElementById("disp_mod").addEventListener("click", () => {
        for (let index = 0; index < document.getElementsByClassName("disp_for_mod").length; index++) {
            const element = document.getElementsByClassName("disp_for_mod")[index];
            element.style.display = "none";
        }
        //jQuery_3_6_0("#gray_block").height("18vh");
        jQuery_3_6_0("#gray_block").show().animate({ 'height': "18vh" }, 1000);
    });
    //The code below and the code above must maintain the current sequence
    document.getElementById("cre_acc_log_fk_bton_inner_txt").addEventListener("click", () => {
        console.log(`document.getElementById("cre_acc_log_fk_bton_inner_txt").addEventListener("click", () => {`);
        if (document.getElementById("disp_mod").innerText === "1") {
            jQuery_3_6_0("#gray_block").show().animate({ 'height': "30vh" }, 1000);
            setTimeout(() => {
                document.getElementById("login_button_txt_fix").innerText = "註冊";
                document.getElementById("cre_acc_log_fk_bton_inner_txt").innerText = "帳號登入";
                document.getElementById("disp_mod").innerText = "0";
                for (let index = 0; index < document.getElementsByClassName("disp_for_mod").length; index++) {
                    const element = document.getElementsByClassName("disp_for_mod")[index];
                    element.style.display = "block";
                }
                //jQuery_3_6_0("#gray_block").height("30vh");
            }, 500);
        } else/* if (document.getElementById("disp_mod").innerText === "0") */ {
            document.getElementById("disp_mod").innerText = "1";
            document.getElementById("login_button_txt_fix").innerText = "登入";
            document.getElementById("cre_acc_log_fk_bton_inner_txt").innerText = "創建帳號";
            document.getElementById("disp_mod").click();
        }/* else {
            console.error("This is a serious error, please contact the software developer!");
        }*/
    });
    //The code below and the code above must maintain the current sequence
    if (document.getElementById("disp_mod").innerText === "-1") {
        document.getElementById("cre_acc_log_fk_bton_inner_txt").click();
    }
});

/*document.getElementById("test_err_msg").addEventListener("click", ()=>{
    console.log("document.getElementById(test_err_msg).addEventListener(click, ()=>{");
    document.getElementById("error_msg_gui_group").click();
});*/

document.getElementById("line_login").addEventListener("click", () => {
    document.getElementById("error_msg_gui_word_part_color_1").innerText = "black";
    document.getElementById("error_msg_gui_word_part_color_2").innerText = "black";
    document.getElementById("error_msg_gui_text_1").innerText = "此功能將於日後推出";
    document.getElementById("error_msg_gui_text_2").innerText = "敬請期待喔!";
    document.getElementById("error_msg_gui_group").click();
});
