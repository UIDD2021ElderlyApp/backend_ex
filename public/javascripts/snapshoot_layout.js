import html2canvas from '../../snap/html2canvas/dist/html2canvas.esm.js';
var DEF_app_img="/app/img";
var DEF_DEBUG=true;

document.getElementById("snap_shoot_screen").addEventListener("click", function () {
    html2canvas(document.querySelector("body")).then(canvas => {
        var url = window.location.href;
        var window_location_href_host = new URL(url).host;
        console.log(window_location_href_host);

        //canvas.style.display="none";
        //document.body.appendChild(canvas);
        var target_img=canvas.toDataURL("image/jpeg", 1.0);
        //console.log(canvas.toDataURL("image/jpeg", 1.0));
        //var a = document.createElement("a"); //Create <a>
        //a.href = canvas.toDataURL("image/jpeg", 1.0); //Image Base64 Goes here
        //a.download = "Image.jpg"; //File name Here
        //a.click(); //Downloaded file

        $.post("https://"+window_location_href_host + DEF_app_img, {
            content: target_img
        }, (objects_returned_by_the_server) => {
            if (DEF_DEBUG) {
                console.log(String(objects_returned_by_the_server));
            }
        })
    });
});
