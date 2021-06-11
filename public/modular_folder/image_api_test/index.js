var DEF_string_app_img_gallery = "/app/img/gallery";
$('#getgallerylist').on('click',()=>{
console.log("onclick~~~~~");
    $.get(DEF_string_app_img_gallery, {
        //empty
    }, (objects_returned_by_the_server) => {
        console.log("wtf??????????????");
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
});