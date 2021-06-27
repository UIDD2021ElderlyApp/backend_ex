jQuery_3_6_0(function () {
    init_layout();
});
function init_layout() {
    document.getElementById('error_msg_gui_group').addEventListener('click', show_err_msg);
    document.getElementById('error_msg_gui_close').addEventListener('click', disp_err_msg);
    console.log(jQuery_3_6_0(window).width() / jQuery_3_6_0(window).height());
    if (jQuery_3_6_0(window).width() / jQuery_3_6_0(window).height() > 1.0) {
        document.getElementById("is_a_squuuuuuuuuuuuuuare").innerText = "yes";
        console.log('squuuuuuuuuuuuuuuuuuuuuuuuuuuuare');
        document.documentElement.style.setProperty('--var_vw', '(9*(1vh/16))');
        document.documentElement.style.setProperty('--var_right_global_displacement', '(100vw - var(--var_vw)*100)');
        var is_choose = false;
        for (let index = 0; index < document.body.classList.length; index++) {
            if (document.body.classList[index] === "vsc-initialized") {
                is_choose = true;
            }
        }
        if (is_choose) {
            console.log("ARARARAR");
            var vsc_initialized = document.createElement("div");
            var overall = document.createElement("div");
            overall.classList = document.getElementById("overall").classList;
            overall.innerHTML = document.getElementById("overall").innerHTML;
            document.getElementById("overall").innerHTML = "";
            jQuery_3_6_0("#overall").removeClass();
            document.getElementById("overall").id = "garbage";
            jQuery_3_6_0("body").removeClass();
            overall.id = "overall";
            vsc_initialized.classList.add("vsc_initialized");
            vsc_initialized.classList.add("vsc_desktop");
            vsc_initialized.appendChild(overall);
            /*position: relative;
    height: 100%;
    background: #eee;
    font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
    font-size: 14px;
    color: #000;
    margin: 0;
    padding: 0;*/
            /*vsc_initialized.style.height = "100%";
            vsc_initialized.style.marginLeft = "0";
            vsc_initialized.style.marginTop = "0";
            vsc_initialized.style.marginBottom = "0";
            vsc_initialized.style.marginRight = String(jQuery_3_6_0(window).width() - (9 * (jQuery_3_6_0(window).height() / 16)));
            vsc_initialized.style.padding = "0";*/
            document.body.insertBefore(vsc_initialized, document.body.lastChild);
            /*var scp = document.createElement("div");
            scp.style="display:none;";
            scp.innerHTML=`
            <script src="./frontend_data/chooseanimal.js"></script>`;
            document.body.insertBefore(scp, document.body.lastChild);*/
            document.getElementById("is_a_squuuuuuuuuuuuuuare").innerText = "ok";
        }
    }
}

function show_err_msg(params) {
    console.log("function show_err_msg(params) {");
    var simhtml = document.createElement("div");
    var backcolor = document.createElement("div");
    var exit_bton_copy = document.createElement("div");
    var pic1 = document.createElement("img");
    var pic2 = document.createElement("img");
    exit_bton_copy.id = "exit_button_copy";
    exit_bton_copy.classList.add("show_err_msg_gen");
    pic1.src = "/frontend_data/img/p1.svg";
    pic2.src = "/frontend_data/img/p2.svg";
    pic2.classList.add("show_err_msg_gen");
    pic1.classList.add("show_err_msg_gen");
    pic2.id = "show_err_msg_pic2";
    pic1.id = "show_err_msg_pic1";
    simhtml.classList.add("show_err_msg_gen");
    simhtml.id = "show_err_msg_simhtml";
    backcolor.classList.add("show_err_msg_gen");
    backcolor.id = "show_err_msg_backcolor";
    simhtml.style.backgroundColor = document.getElementById("error_msg_gui_blank_part_color").innerText;
    document.getElementById("error_msg_obj").appendChild(simhtml);
    document.getElementById("error_msg_obj").appendChild(backcolor);
    document.getElementById("error_msg_obj").appendChild(pic1);
    document.getElementById("error_msg_obj").appendChild(pic2);
    document.getElementById("error_msg_obj").appendChild(exit_bton_copy);
    jQuery_3_6_0("#exit_button_copy").bind('touchstart', function () {
        jQuery_3_6_0(this).animate({ 'opacity': 0.7 }, 100)
    });
    jQuery_3_6_0("#exit_button_copy").bind('touchend', function () {
        jQuery_3_6_0(this).animate({ 'opacity': 1 }, 100)
    });
    document.getElementById("exit_button_copy").addEventListener("click", () => {
        document.getElementById('error_msg_gui_close').click();
    });
    document.getElementById("error_msg_obj").style.display = "block";
}

function disp_err_msg(){
    console.log("document.getElementById('error_msg_gui_close').click();");
    document.getElementById("error_msg_obj").style.display = "none";
    jQuery_3_6_0('.show_err_msg_gen').remove();
}