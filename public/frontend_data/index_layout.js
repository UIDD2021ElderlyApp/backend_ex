jQuery_3_6_0(function () {
    init_layout();
});
function init_layout() {
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
            document.body.insertBefore(vsc_initialized, document.body.lastChild);
            document.getElementById("is_a_squuuuuuuuuuuuuuare").innerText = "ok";
        }
    }
}
