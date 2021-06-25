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
    document.getElementById("get_info").addEventListener("click", function(){
        $.post("/git_version_info", {
            //empty
        }, (res) => {
            document.getElementById("get_infoV").innerText=res;
        });
    });
    document.getElementById("game_main_website_status").addEventListener("click", function(){
        $.post("/game_main_website_status", {
            //empty
        }, (res) => {
            document.getElementById("game_main_website_statusV").innerText=res;
        });
    });
    document.getElementById("Pull_the_remote_code_to_the_local_end_and_trigger_the_update").addEventListener("click", function(){
        $.post("/Pull_the_remote_code_to_the_local_end_and_trigger_the_update", {
            //empty
        }, (res) => {
            if (res == "success") {
                console.log("success");
            } else {
                console.error(res);
            }
            location.reload();
        });
    });
    document.getElementById("all_repo").addEventListener("click", function (e) {
        document.getElementById("all_commits").innerHTML = "";
        $.get("https://api.github.com/repos/UIDD2021ElderlyApp/backend_ex/commits", {
            //empty
        }, (res) => {
            console.log(res)
            for (let index = 0; index < res.length; index++) {
                /*console.log(index);
                console.log(res[index].sha);
                console.log(res[index].commit.author.name);console.log(res[index].commit.author.date);
                console.log(res[index].commit.committer.name);console.log(res[index].commit.committer.date);
                console.log(res[index].commit.message);
                console.log(res[index].html_url);*/
                document.getElementById("all_commits").innerHTML = document.getElementById("all_commits").innerHTML + `<tr>
<th scope="row">${index}</th>
<th scope="row">
<button type="button" class="btn btn-primary trigger_version_change" id="${res[index].sha}_trigger_version_change">Use this version and restart the server</button>
</th>
<th scope="col">${res[index].sha}</th>
<th scope="col">${res[index].commit.author.name}</th>
<th scope="col">${res[index].commit.author.date}</th>
<th scope="col">${res[index].commit.committer.name}</th>
<th scope="col">${res[index].commit.committer.date}</th>
<th scope="col">${res[index].commit.message}</th>
<th scope="col">${res[index].html_url}</th>
</tr>`;
            }
            $('.trigger_version_change').on('click', function (e) {
                console.log(`trigger_version_change-->${e.target.id}`);
                $.post("/trigger_version_change_git_reset_hard", {
                    trigger_version_change_git_reset_hard_sha: e.target.id.replace("_trigger_version_change", "")
                }, (res) => {
                    if (res == "success") {
                        console.log("success");
                    } else {
                        console.error(res);
                    }
                    location.reload();
                });
            });
        });
    });
    init();
});
function init(){
    document.getElementById("get_info").click();
    document.getElementById("all_repo").click();
    document.getElementById("game_main_website_status").click();
}