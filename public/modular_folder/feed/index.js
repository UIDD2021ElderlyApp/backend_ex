var DEF_DEBUG = true;
var DEF_DEBUG_progress_bar = false;
var DEF_DEBUG_progress_bar_preview = true;

function init(dom_ready_params) {
    if (!DEF_DEBUG_progress_bar) {
        for (let progress_bar_run_forEach = 0; progress_bar_run_forEach < document.getElementsByClassName("progress-bar_run").length; progress_bar_run_forEach++) {
            const element = document.getElementsByClassName("progress-bar_run")[progress_bar_run_forEach];
            element.style.background = "#61913D";
        }

        for (let progress_bar_run_forEach = 0; progress_bar_run_forEach < document.getElementsByClassName("progress_bar_control_button_this_can_t_be_seen").length; progress_bar_run_forEach++) {
            const element = document.getElementsByClassName("progress_bar_control_button_this_can_t_be_seen")[progress_bar_run_forEach];
            element.style.display="none";
        }
    }
    document.getElementsByTagName("body")[0].classList.add("bodyClass");
}

function progress_bar_preview() {
    if (DEF_DEBUG_progress_bar_preview) {
        var counter = 0;
        function startTime() {

            if (!DEF_DEBUG_progress_bar) {
                for (let progress_bar_run_forEach = 0; progress_bar_run_forEach < document.getElementsByClassName("progress-bar_run").length; progress_bar_run_forEach++) {
                    const element = document.getElementsByClassName("progress-bar_run")[progress_bar_run_forEach];
                    element.style.background = "#61913D";
                    element.style.width = String(counter) + "%";
                    element.style.height=String($(window).height()*0.015)+"px";
//$(window).width();
                }
            }
            counter = (counter + 1 >= 100) ? 0 : counter + 1;
            t = setTimeout(function () {
                startTime()
            }, 500);
        }
        startTime();
    } else {
        function startTime() {
            if (!DEF_DEBUG_progress_bar) {
                for (let progress_bar_run_forEach = 0; progress_bar_run_forEach < document.getElementsByClassName("progress-bar_run").length; progress_bar_run_forEach++) {
                    const element = document.getElementsByClassName("progress-bar_run")[progress_bar_run_forEach];
                    element.style.background = "#61913D";
                }
            }

            t = setTimeout(function () {
                startTime()
            }, 5);
        }
        startTime();

    }
}

jQuery(function dom_ready(dom_ready_params) {
    init(dom_ready_params);
    progress_bar_preview();
});

$("#exit_button").click(function() {
    var re = /\/ts\/feed/gi;
    var newstr = window.location.href.replace(re, "/ts/home");
    window.location.href = newstr;
});