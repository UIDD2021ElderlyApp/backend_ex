$(function () {
    console.log($(window).width() / $(window).height());
    if ($(window).width() / $(window).height() > 1.0) {
        console.log('squuuuuuuuuuuuuuuuuuuuuuuuuuuuare');
        document.documentElement.style.setProperty('--var_vw', 'calc(9*(1vw/16))');
        document.documentElement.style.setProperty('--var_left_global_displacement', 'calc(100vw-var(--var_vw)*100)');
    }
    init();
});
function init() {
    document.getElementById('stroll').addEventListener('click', function (e) {
        window.location.href = "/ts/mapview";
    });
}