jQuery_3_6_0(function () {
    init_layout();
});
function init_layout() {
    console.log(jQuery_3_6_0(window).width() / jQuery_3_6_0(window).height());
    if (jQuery_3_6_0(window).width() / jQuery_3_6_0(window).height() > 1.0) {
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
        }
    }
}