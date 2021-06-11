var DEF_string_app_img_gallery = "/app/img/gallery";
var DEF_string_app_img_title = "/app/img/?title=";
var DEF_default_load_img_num = 6;
var DEF_default_load_img_one = 5;

console.log("windos-height:" + $(window).height()); console.log("windos-width:" + $(window).width());

function checkFlag() {
    if (!document.getElementById("cboxLoadingGraphic")) {
        setTimeout(() => {
            checkFlag();
        }, 5);
    } else {
        document.getElementById("cboxLoadingGraphic").innerHTML = "<div class=\"loading css_var_center\" id=\"loading_id\"><div class=\"loading_container\"><span class=\"loading_object\"></span></div><div class=\"loading_container\"><span class=\"loading_object\"></span></div><div class=\"loading_container\"><span class=\"loading_object\"></span></div><div class=\"loading_container\"><span class=\"loading_object\"></span></div><div class=\"loading_container\"><span class=\"loading_object\"></span></div><div class=\"loading_container\"><span class=\"loading_object\"></span></div><div class=\"loading_container\"><span class=\"loading_object\"></span></div><div class=\"loading_container\"><span class=\"loading_object\"></span></div><div class=\"loading_container\"><span class=\"loading_object\"></span></div><div class=\"loading_container\"><span class=\"loading_object\"></span></div><div class=\"loading_container\"><span class=\"loading_object\"></span></div><div class=\"loading_container\"><span class=\"loading_object\"></span></div><div class=\"loading_container\"><span class=\"loading_object\"></span></div><div class=\"loading_container\"><span class=\"loading_object\"></span></div><div class=\"loading_container\"><span class=\"loading_object\"></span></div><div class=\"loading_container\"><span class=\"loading_object\"></span></div><div class=\"loading_container\"><span class=\"loading_object\"></span></div><div class=\"loading_container\"><span class=\"loading_object\"></span></div><div class=\"loading_container\"><span class=\"loading_object\"></span></div><div class=\"loading_container\"><span class=\"loading_object\"></span></div></div>";
    }
}
checkFlag();

//function mygallery_justifiedGallery(params) {
$("#mygallery").justifiedGallery({
    rowHeight: 700,
    lastRow: 'nojustify',
    rel: 'gallery1',
    margins: 3,
    sizeRangeSuffixes: {
        100: '_t', // used with images which are less than 100px on the longest side
        240: '_m', // used with images which are between 100px and 240px on the longest side
        320: '_n', // ...
        500: '',
        640: '_z',
        1024: '_b' // used which images that are more than 640px on the longest side
    }
}).on('jg.rowflush', function () {
    $(this).find('a').colorbox({
        maxWidth: '80%',
        maxHeight: '80%',
        opacity: 0.8,
        transition: 'elastic',
        current: ''
    });
});
//}

// vmousedown fail
$(".button").bind('touchstart', function () {
    $(this).animate({ 'opacity': 0.5 }, 100)
})
$(".button").bind('touchend', function () {
    $(this).animate({ 'opacity': 1 }, 100)
})
$(window).scroll(function () {
    //console.log("scrolltop:" + $(this).scrollTop());
    document.getElementById("label").style.marginTop = $(this).scrollTop().toString() + "px";
    document.getElementById("quit").style.marginTop = $(this).scrollTop().toString() + "px";

    if (Math.abs(($(window).scrollTop() + $(window).height()) / $(document).height()) >= 0.7) {
        $.get(DEF_string_app_img_gallery, {
            //empty
        }, (objects_returned_by_the_server) => {
            add_img_by_roll(objects_returned_by_the_server);

        });
    }
})
$("#confirmed_forwarding_path").on('click', function (e) {
    e.preventDefault();
    console.log("confirmed_forwarding_path");
})

$("#quit").on('click', function (e) {
    e.preventDefault();
    console.log("quit");
})
$('#label').on('click', function (e) {e.preventDefault();
    document.getElementById("snap_shoot_screen").click();
})

function page_escape(params) {

}

function init_load_img(params) {
    console.log(" init_load_img(params) ");
    $.get(DEF_string_app_img_gallery, {
        //empty
    }, (objects_returned_by_the_server) => {
        console.log(objects_returned_by_the_server);
        if (objects_returned_by_the_server.length >= DEF_default_load_img_num) {
            for (var i = 0; i < DEF_default_load_img_num; i++) {
                add_img_obj(objects_returned_by_the_server[i]);
            }
            $('#mygallery').justifiedGallery('norewind');
            //mygallery_justifiedGallery();
        } else {
            console.log("error default img not enough 6!!!");
            console.log(objects_returned_by_the_server);
        }
    });
}

function add_img_obj(img_ttl) {
    $('#mygallery').append(`<a href="${DEF_string_app_img_title}${img_ttl}" class="picture_count_counter">
<img alt="${img_ttl}"
src="${DEF_string_app_img_title}${fileNameAndExt(img_ttl)[0]}_tb.${fileNameAndExt(img_ttl)[1]}" />
</a>`);//important do not use document getelementbyid, it wont work
}

function fileNameAndExt(str) {
    //var file = str.split('/').pop();
    return [str.substr(0, str.lastIndexOf('.')), str.substr(str.lastIndexOf('.') + 1, str.length)]
}

function add_img_by_roll(objects_returned_by_the_server) {
    if (objects_returned_by_the_server.length - document.getElementsByClassName("picture_count_counter").length > 0) {
        var addhowmeny = (objects_returned_by_the_server.length - document.getElementsByClassName("picture_count_counter").length >= DEF_default_load_img_one) ? DEF_default_load_img_one : (objects_returned_by_the_server.length - document.getElementsByClassName("picture_count_counter").length);
        //console.log("addhowmeny" + addhowmeny.toString());
        var addstartform = document.getElementsByClassName("picture_count_counter").length;
        for (var i = addstartform; i < addstartform + addhowmeny; i++) {
            add_img_obj(objects_returned_by_the_server[i]);
            //  console.log(i);
        }
        $('#mygallery').justifiedGallery('norewind');
        //console.log("-");
    }
}

init_load_img();