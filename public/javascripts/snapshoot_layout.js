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
var DEF_download_screenshot = true;

document.getElementById("snap_shoot_screen").addEventListener("click", function () {
    html2canvas(document.querySelector("body")).then(canvas => {
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

        /*$.post("https://"+window_location_href_host + DEF_app_img, {
            content: target_img
    }, (objects_returned_by_the_server) => {
        if (DEF_DEBUG) {
            console.log(String(objects_returned_by_the_server));
        }
    })*/
        //You can give your whole form to FormData() for processing

        var form = $('form')[0]; // You need to use standard javascript object here
        var formData = new FormData(form);
        //or specify exact data for FormData()

        //var formData = new FormData();
        //formData.append('section', 'general');
        //formData.append('action', 'previewImg');
        // Attach file
        var blob_tmp = dataURItoBlob(target_img);
        saveData(blob_tmp, "download_blob.jpg");
        formData.append('img', blob_tmp);
        //Sending form

        //Ajax request with jquery will looks like this:

        $.ajax({
            url: `${DEF_app_img}`,
            data: formData,
            type: 'POST',
            contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
            processData: false, // NEEDED, DON'T OMIT THIS
            accepts: {
                text: "text/html"
            },
            // ... Other options like success and etc
        });
        //After this it will send ajax request like you submit regular form with enctype="multipart/form-data"
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
