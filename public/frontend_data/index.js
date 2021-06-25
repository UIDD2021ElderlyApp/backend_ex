$(function () {
    init();
});
function init() {
    document.getElementById('stroll').addEventListener('click',function (e) {
        window.location.href = "/ts/mapview";
    });
}