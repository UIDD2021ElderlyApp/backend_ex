console.log("windos-height:" + $(window).height()); console.log("windos-width:" + $(window).width());

document.body.addEventListener("change", function () {
    console.log("dom change!");
});

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

var mygallery_justifiedGallery = $("#mygallery").justifiedGallery({
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
});

mygallery_justifiedGallery.on('jg.rowflush', function () {
    $(this).find('a').colorbox({
        maxWidth: '80%',
        maxHeight: '80%',
        opacity: 0.8,
        transition: 'elastic',
        current: ''
    });
});

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

})
$("#confirmed_forwarding_path").on('click', function (e) {
    e.preventDefault();
    console.log("confirmed_forwarding_path");
})

$("#quit").on('click', function (e) {
    e.preventDefault();
    console.log("quit");
})

function page_escape(params) {

}

function getAllpicarray(params) {
    $.get('/app/img/gallery', {
        //empty
    }, (objects_returned_by_the_server) => {
        console.log(objects_returned_by_the_server);
    });
}

getAllpicarray();