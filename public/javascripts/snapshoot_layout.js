import html2canvas from '../../snap/html2canvas/dist/html2canvas.esm.js';

function saveData(blob, filename) {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    var url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
};

var DEF_app_img = "/app/img";
var DEF_DEBUG = true;
var DEF_consolelogdata = false;
var DEF_download_screenshot = false;
var DEF_download_Blob = false;

var DEF_medal_path = "/app/medal/"

document.getElementById("snap_shoot_screen").addEventListener("click", function() {
    document.getElementById("snap_shoot_finish").innerText = "0";
    html2canvas(document.querySelector("body"), { useCORS: true, }).then(canvas => {
        var url = window.location.href;
        var window_location_href_host = new URL(url).host;
        console.log(window_location_href_host);

        //canvas.style.display="none";
        //document.body.appendChild(canvas);
        var target_img = canvas.toDataURL("image/jpeg", 1.0);
        //console.log(canvas.toDataURL("image/jpeg", 1.0));
        if (DEF_consolelogdata) {
            console.log(canvas.toDataURL("image/jpeg", 1.0));
        }
        if (DEF_download_screenshot) {
            var a = document.createElement("a"); //Create <a>
            a.style = "display: none";
            a.href = canvas.toDataURL("image/jpeg", 1.0); //Image Base64 Goes here
            a.download = "Image.jpg"; //File name Here
            a.click(); //Downloaded file
        }

        var blob_tmp = dataURItoBlob(target_img);
        if (DEF_download_Blob) {
            saveData(blob_tmp, "download_blob.jpg");

        }
        if (blob_tmp.size < 6000000) {
            send_pic_to_backend(blob_tmp);
        } else {
            console.log("compress_ratio");
            var compress_ratio = 0.9;
            while (compress_ratio > 0 && (dataURItoBlob(canvas.toDataURL("image/jpeg", compress_ratio)).size > 6000000)) {
                compress_ratio = compress_ratio - 0.1;
            }
            if (dataURItoBlob(canvas.toDataURL("image/jpeg", compress_ratio)).size > 6000000) {
                console.error("this is a error, the page is tooooooooooooooooo large, so you can't trans this file to backend!!!!")
            }
            send_pic_to_backend(dataURItoBlob(canvas.toDataURL("image/jpeg", compress_ratio)));
        }

    });
});

function dataURItoBlob(dataURI) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    var byteString = atob(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    //Old Code
    //write the ArrayBuffer to a blob, and you're done
    //var bb = new BlobBuilder();
    //bb.append(ab);
    //return bb.getBlob(mimeString);

    //New Code
    return new Blob([ab], { type: mimeString });
}

function send_pic_to_backend(img_blob) {
    var form = jQuery_3_6_0('form')[0]; // You need to use standard javascript object here
    var formData = new FormData(form);

    formData.append('img', img_blob);

    jQuery_3_6_0.ajax({
        url: `${DEF_app_img}`,
        data: formData,
        type: 'POST',
        contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
        processData: false, // NEEDED, DON'T OMIT THIS
        accepts: {
            text: "text/html"
        },
        //http://blog.twbryce.com/jquery-ajax-callback-method/
        beforeSend: function(xhr) {
            document.getElementById("snap_shoot_finish").innerText = "2";

        },
        success: function(xhr) {
            //console.log("alert('Ajax request 發生錯誤');");
            //jQuery_3_6_0(e.target).attr('disabled', false);
            document.getElementById("snap_shoot_finish").innerText = "3";
        },
        error: function(xhr) {
            document.getElementById("snap_shoot_finish").innerText = "4";

            console.log("alert('Ajax request 發生錯誤');");
            //jQuery_3_6_0(e.target).attr('disabled', false);
        },
        complete: function(xhr) {
            if (document.getElementById("snap_shoot_finish").innerText === "3") {
                document.getElementById("snap_shoot_finish").innerText = "1";
            }
        },
    });
    $.post(DEF_medal_path, {
        medal: JSON.stringify({
            "type": 3,
            "goal": 1
        })
    });

}

function codeAddress() {
    console.log("ok2")
    $("#waiting_block").css('display', "none")
}
window.onload = codeAddress;

//from mapview
var NowDate;
var s;
var map;
// var radius;
var now_lat;
var now_lng;
var marker_array = new Array;
var animal_id = -1;
console.log(L)
map = L.map('map', { renderer: L.canvas() }).setView([22.5, 120.5], 15); //construct map
map.locate({ setView: true, watch: true, enableHighAccuracy: true });
map.removeControl(map.zoomControl);
L.control.scale({ imperial: false }).addTo(map);
L.control.zoom({
    position: 'topright',
    //zoomInTitle: 'increase',
    //zoomOutTitle: 'decrese'
}).addTo(map);
var customIcon1 = L.icon({
    iconUrl: '../modular_folder/mapview/c1.svg',
    iconSize: [250, 250], // size of the icon
    iconAnchor: [120, 0], // point of the icon which will correspond to marker's location
    popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
});
var customIcon2 = L.icon({
    iconUrl: '../modular_folder/mapview/c2.svg',
    iconSize: [250, 250], // size of the icon
    iconAnchor: [120, 0], // point of the icon which will correspond to marker's location
    popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
});
var customIcon3 = L.icon({
    iconUrl: '../modular_folder/mapview/c3.svg',
    iconSize: [250, 250], // size of the icon
    iconAnchor: [120, 0], // point of the icon which will correspond to marker's location
    popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
});
var customIcon_1 = L.icon({
    iconUrl: '../modular_folder/mapview/63.png',
    iconSize: [250, 250], // size of the icon
    iconAnchor: [90, 0], // point of the icon which will correspond to marker's location
    popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
});
var gpsMarker = null;
var gpsCircleMarker;
var user_name;
var check_first_time = 1;

function onLocationFound(e) {
    //console.log(e)//627
    now_lat = e.latlng.lat; // int!
    now_lng = e.latlng.lng;
    var radius = e.accuracy / 2;
    var popupContent = "You are within " + radius + " meters from this point";
    setTimeout(function() {
            $.get('/app/personal/', {}, (me) => {
                if (me) {
                    //var me = JSON.parse(user)
                    if (me.animal)
                        animal_id = me.animal
                    else
                        animal_id = -1
                    user_name = me.name
                    if (gpsMarker == null) {
                        if (animal_id == 1) {
                            gpsMarker = L.marker(e.latlng, { icon: customIcon1 }).addTo(map);
                        }
                        if (animal_id == 2) {
                            gpsMarker = L.marker(e.latlng, { icon: customIcon2 }).addTo(map);
                        }
                        if (animal_id == 3) {
                            gpsMarker = L.marker(e.latlng, { icon: customIcon3 }).addTo(map);
                        }
                        if (animal_id == -1) {
                            gpsMarker = L.marker(e.latlng, { icon: customIcon_1 }).addTo(map);
                        }
                        gpsMarker.bindPopup(`<font face="微軟正黑體"><b1 style="font-size: 60px" >${user_name}</b1></font>`).openPopup();
                        gpsCircleMarker = L.circle(e.latlng, radius).addTo(map);
                    }
                    if (gpsMarker != null) {
                        gpsMarker.getPopup().setContent(`<b1 style="font-size: 60px" >${user_name}</b1>`);
                        gpsMarker.setLatLng(e.latlng);
                        gpsCircleMarker.setLatLng(e.latlng);
                        gpsCircleMarker.setRadius(radius);
                    }
                }
            })
        }, 0)
        //document.getElementById('info').innerHTML = `you are at ( lat : ${e.latlng.lat} lng : ${e.latlng.lng} ) with accuracy ${e.accuracy} m!`
    ShowTime()
    var marker = L.marker(L.latLng(22.9998, 120.215));
    marker.bindPopup("<b>NCKU</b><br>the BEST University in south Taiwan").openPopup();
    marker.addTo(map);
    //console.log(e.latlng)//627
    //console.log(marker._latlng)//627
    if (last != current) {
        last = e.latlng
        map.setView([e.latlng.lat, e.latlng.lat], 15);
    }
    current = e.latlng;
    if (!check_first_time) {
        distance2 = last.distanceTo(current);
        last = current;
        //console.log('dis2 '+distance2)//627
        distance1 += distance2;

    }
    check_first_time = 0
}
var last;
var distance1;
var distance2;
var current;
setTimeout(function() {
    distance1 = 0;
    distance2 = 0;
    // currrent = NaN;
    last = NaN;
}, 0)
var getgoal;
setInterval(function() {
    //console.log(distance1)//627
    //console.log(distance2)//627
    //console.log('nowgoal '+getgoal+' dis2 '+distance2)   //627 
    $.post('/app/medal/', {
        medal: JSON.stringify({ "type": 5, "goal": distance2 })
    });
    if (distance2 != 0) {
        $.post('/app/medal/', {
            medal: JSON.stringify({
                "type": 4,
                "goal": 1
            })
        });
    }
    distance2 = 0;
    //error
    $.get('/app/medal/getWalk/', {}, (walk) => {
        console.log(walk)
        if (walk) {
            //console.log('walk '+walk)//627
            // var parse_walk = JSON.parse(walk) // error
            var parse_walk = walk
                //console.log(parse_walk)//627
            getgoal = parse_walk.goal
                //console.log('getgoal '+getgoal)//627
            if (getgoal === -1) {
                $.post('/app/medal/', {
                    medal: JSON.stringify({
                        "type": 5,
                        "goal": 0
                    })
                });
            }
        }
    });
    document.getElementById('info3').innerHTML = '距離' + Math.floor(distance1) + 'm';
    if (Math.floor(distance1) > 999) {
        document.getElementById('info3').innerHTML = '距離' + (Math.floor(distance1) - Math.floor(distance1) % 1000) / 1000 + 'km';
    }
}, 2000);

function onLocationError(e) {
    alert(e.message);
}
map.on('locationerror', onLocationError);
map.on('locationfound', onLocationFound);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '<a href="https://www.openstreetmap.org/">OSM</a>',
    maxZoom: 19,
}).addTo(map);
$(document).ready(function() { ///////////////////////////////////////////////added at 6/2
    var search_radius = 300;
    setInterval(function() {
        $.get('/app/PeopleOnMap/', {
            distance: search_radius,
            position: JSON.stringify({ lat: now_lat, lng: now_lng })
        }, (People) => {
            console.log("people")
            console.log(People)

            if (People) {
                //var people = JSON.parse(People) //error
                var people = People
                    /*people:[{
                    "id" = ""
                    "name" = ""
                    "animal" = 1
                    "position" = {lat:,lng:}
                    },
                    ]*/
                    //做事
                for (var i = 0; i < marker_array.length; i++) {
                    if (marker_array != null) {
                        map.removeLayer(marker_array[i])
                    }
                }
                for (var i = 0; i < people.length; i++) {
                    console.log("aaa")
                    console.log(people[i].position)
                    var temp_latlng = L.latLng(people[i].position.lat, people[i].position.lng); //error
                    if (people[i].animal == 1) {
                        marker_array[i] = L.marker(temp_latlng, { icon: customIcon1 }).addTo(map);
                        marker_array[i].bindPopup(`<b1 style="font-size: 60px" >${people[i].name}</b1>`).openPopup();
                    }
                    if (people[i].animal == 2) {
                        marker_array[i] = L.marker(temp_latlng, { icon: customIcon2 }).addTo(map);
                        marker_array[i].bindPopup(`<b1 style="font-size: 60px" >${people[i].name}</b1>`).openPopup();
                    }
                    if (people[i].animal == 3) {
                        marker_array[i] = L.marker(temp_latlng, { icon: customIcon3 }).addTo(map);
                        marker_array[i].bindPopup(`<b1 style="font-size: 60px" >${people[i].name}</b1>`).openPopup();
                    }
                    if (people[i].animal == -1) {
                        marker_array[i] = L.marker(temp_latlng, { icon: customIcon_1 }).addTo(map);
                        marker_array[i].bindPopup(`<b1 style="font-size: 60px" >${people[i].name}</b1>`).openPopup();
                    }
                }
            }
        })
    }, 10000)
    setInterval(function() {
        $.post('/app/PeopleOnMap/', {
            animal: animal_id,
            position_lat: now_lat,
            position_lng: now_lng
                // position: JSON.stringify({ lat: now_lat, lng: now_lng })
        }, (id) => {
            if (id) {
                //不一定用的到
            }
        })
    }, 10000)
});
var DEF_map = "/app/PeopleOnMap/deleteme";
var DEF_DEBUG = true;

$("#exit_button").click(function() {
    var url = window.location.href;
    var window_location_href_host = new URL(url).host;
    //console.log(window_location_href_host);  //627
    $.post("https://" + window_location_href_host + DEF_map, {}, (objects_returned_by_the_server) => {
        if (DEF_DEBUG) {
            //console.log(String(objects_returned_by_the_server));//627
        }
    })
    var re = /\/ts\/mapview/gi;
    var newstr = window.location.href.replace(re, "/main");
    window.location.href = newstr;
});

$(".button").bind('touchstart', function() {
    $(this).animate({ 'opacity': 0.7 }, 100)
})
$(".button").bind('touchend', function() {
        $(this).animate({ 'opacity': 1 }, 100)
    })
    // error
document.getElementById("snap_shoot_canvas_tmp").addEventListener("click", function() {
    document.getElementById("snap_shoot_finish").innerText = "0";
    html2canvas(document.querySelector("body"), { useCORS: true, }).then(canvas => {
        document.getElementById("snap_shoot_finish").innerHTML = "";
        canvas.style.display = "none";
        canvas.id = "snap_shoot_canvas_tmp_sub";
        document.body.appendChild(canvas);
        document.getElementById("snap_shoot_finish").innerText = "1";
    });
});