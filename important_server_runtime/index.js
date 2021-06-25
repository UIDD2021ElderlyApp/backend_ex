/*DEF_string_app_img_title = "http://merry.ee.ncku.edu.tw:38788/img?id="
document.getElementById("test_ajax").style.backgroundColor = "#ddb98b";

$(document).ready(function () {
    document.getElementById("test_ajax").addEventListener("click", () => {
        console.log("test_ajax");
        document.querySelectorAll('.picture_count_counter').forEach(e => e.remove());
        $.post("/trig", {
            adj_resize_w: document.getElementById("adj_resize_w_v").innerText,
            adj_resize_h: document.getElementById("adj_resize_h_v").innerText,
            adj_bilateralFilter_d: document.getElementById("adj_bilateralFilter_d_v").innerText,
            adj_bilateralFilter_sigmaColor: document.getElementById("adj_bilateralFilter_sigmaColor_v").innerText,
            adj_bilateralFilter_sigmaSpace: document.getElementById("adj_bilateralFilter_sigmaSpace_v").innerText,
            adj_adaptiveThreshold_adaptiveMethod: document.getElementById("adj_adaptiveThreshold_adaptiveMethod_v").innerText,
            adj_adaptiveThreshold_thresholdType: document.getElementById("adj_adaptiveThreshold_thresholdType_v").innerText,
            adj_adaptiveThreshold_blockSize: document.getElementById("adj_adaptiveThreshold_blockSize_v").innerText,
            adj_adaptiveThreshold_C: document.getElementById("adj_adaptiveThreshold_C_v").innerText,
            adj_aspectRatio: document.getElementById("adj_aspectRatio_v").innerText,
            adj_MIN_AREA: document.getElementById("adj_MIN_AREA_v").innerText
        }, (res) => {
            var objects_returned_by_the_server = JSON.parse(res);
            console.log(objects_returned_by_the_server);
            for (var i = 0; i < objects_returned_by_the_server.length; i++) {
                add_img_obj(objects_returned_by_the_server[i]);
            }
            $('#mygallery').justifiedGallery();
        });
    });

    $('.btn.btn-secondary.dropdown-toggle').on('hidden.bs.dropdown', function (e) {
        //console.log(".btn.btn-secondary.dropdown-toggle");
        //console.log(e.target.id);
        document.getElementById(e.target.id.slice(0, -1) + "v").innerHTML = document.getElementById("tmp").innerText;
    });

    $('.dropdown-item').on('click', function () {
        //console.log($(this).text());
        document.getElementById("tmp").innerText = $(this).text();
    });

    $('.color_plate').on('click', function () {
        console.log('.color_plate, click');
    });
});

function add_img_obj(img_ttl) {
    $('#mygallery').append(`<a href="${DEF_string_app_img_title}${img_ttl}" class="picture_count_counter">
<img alt="${img_ttl}"
src="${DEF_string_app_img_title}${img_ttl}" />
</a>`);//important do not use document getelementbyid, it wont work
}

$("#mygallery").justifiedGallery({
    rowHeight: 70,
    lastRow: 'nojustify',
    rel: 'gallery1',
    margins: 3
}).on('jg.rowflush', function () {
});

$(function () {
    $(".slider").slider({
        create: function (event, ui) {
            $(`#${event.target.id}`).slider("value", 50);
        },
        change: function (event, ui) {
            //console.log(event.target.id);
            //console.log(ui.value);
            document.getElementById(event.target.id.slice(0, -1) + "v").innerHTML = String(ui.value);
        }
    });
});*/
$(function () {
    document.getElementById("all_repo").addEventListener("click", function(e){
        $.get("https://api.github.com/repos/UIDD2021ElderlyApp/backend_ex/commits", {
            //empty
        }, (res) => {
            console.log(res)
        });
    });
});