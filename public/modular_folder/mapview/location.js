var map, marker, lat, lng;
var info3 = document.querySelector(".info3");
info3.innerHTML = 'nobody found';

function initMap() {
    navigator.geolocation.watchPosition((position) => {
        console.log(position.coords);
        lat = position.coords.latitude;
        lng = position.coords.longitude;
        // 初始化地圖
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 18,
            center: { lat: lat, lng: lng }
        });
        marker = new google.maps.Marker({
            position: { lat: lat, lng: lng },
            map: map
        });
    });
}

$("#exit_button").click(function() {
    console.log("btn");
    var re = /\/ts\/mapview/gi;
    var newstr = window.location.href.replace(re, "/ts/home");
    window.location.href = newstr;
});
$(".button").bind('touchstart', function() {
    $(this).animate({ 'opacity': 0.7 }, 100)
})
$(".button").bind('touchend', function() {
    $(this).animate({ 'opacity': 1 }, 100)
})