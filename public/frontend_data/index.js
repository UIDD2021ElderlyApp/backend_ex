$(function () {
    console.log($(window).width() / $(window).height());
    if ($(window).width() / $(window).height() > 1.0) {
        console.log('squuuuuuuuuuuuuuuuuuuuuuuuuuuuare');
        document.documentElement.style.setProperty('--var_vw', '(9*(1vh/16))');
        document.documentElement.style.setProperty('--var_right_global_displacement', '(100vw - var(--var_vw)*100)');
    }
    init();
});
function init() {
    document.getElementById('stroll').addEventListener('click', function (e) {
        window.location.href = "/ts/mapview";
    });
}