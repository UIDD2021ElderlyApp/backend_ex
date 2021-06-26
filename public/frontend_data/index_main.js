jQuery_3_6_0(function () {
    init_main();
});
function init_main() {
    document.getElementById('stroll').addEventListener('click', function (e) {
        window.location.href = "/ts/mapview";
    });
}