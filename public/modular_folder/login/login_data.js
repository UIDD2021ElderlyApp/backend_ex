var DEF_DEBUG = true;
var GLOBAL_url = "/users/login";

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
        })
    }


}

function Beautify_the_login_button() {
    var comments = document.createElement("img");
    comments.src = '../modular_folder/login/image/facebook_login.svg';
    comments.id="Hitmeyouidiot"
    document.getElementById("fb_login").appendChild(comments);
    document.getElementById("Hitmeyouidiot").style.heigth = "100%";
    document.getElementById("Hitmeyouidiot").addEventListener("click", function () {
        console.log("Hitmeyouidiot");
        document.getElementById("fb_login").click();
    });
}


jQuery(function dom_ready(dom_ready_params) {
    //Beautify_the_login_button();
    document.getElementById("login_button").addEventListener("click", login_button_click);
});