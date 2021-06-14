//jQuery_3_6_0
var DEF_path = "/app/personal/create";
document.getElementById('animal1').addEventListener('click', animal1_click);
document.getElementById('animal2').addEventListener('click', animal2_click);
document.getElementById('animal3').addEventListener('click', animal3_click);
document.getElementById('overall').addEventListener('click', overall_click);
function overall_click() {
    //console.log("clicked");
    console.log(jQuery_3_6_0('.swiper-slide.swiper-slide-active').attr('data-swiper-slide-index'));
    var switchcase = jQuery_3_6_0('.swiper-slide.swiper-slide-active').attr('data-swiper-slide-index');
    if (switchcase === '0') {
        animal1_click();
    } else if (switchcase === '1') {
        animal2_click();
    } else if (switchcase === '2') {
        animal3_click();
    } else {
        console.error("This is a serious error, please contact the software vendor");
    }
}
function animal1_click() {
    jQuery_3_6_0.post(DEF_path, {
        animal: '1',
    }, (objects_returned_by_the_server) => {
        Redirect(objects_returned_by_the_server);
    });
}
function animal2_click() {
    jQuery_3_6_0.post(DEF_path, {
        animal: '2',
    }, (objects_returned_by_the_server) => {
        Redirect(objects_returned_by_the_server);
    });
}
function animal3_click() {
    jQuery_3_6_0.post(DEF_path, {
        animal: '3',
    }, (objects_returned_by_the_server) => {
        Redirect(objects_returned_by_the_server);
    });
}
function Redirect(objects_returned_by_the_server) {
    if (objects_returned_by_the_server === "success") {
        location.reload();
    } else {
        console.error("Network communication error");
    }
}