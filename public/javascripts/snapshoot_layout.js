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

document.getElementById("snap_shoot_screen").addEventListener("click", function () {
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
        beforeSend: function (xhr) {
            document.getElementById("snap_shoot_finish").innerText = "2";

        },
        success: function (xhr) {
            //console.log("alert('Ajax request 發生錯誤');");
            //jQuery_3_6_0(e.target).attr('disabled', false);
            document.getElementById("snap_shoot_finish").innerText = "3";
        },
        error: function (xhr) {
            document.getElementById("snap_shoot_finish").innerText = "4";

            console.log("alert('Ajax request 發生錯誤');");
            //jQuery_3_6_0(e.target).attr('disabled', false);
        },
        complete: function (xhr) {
            if (document.getElementById("snap_shoot_finish").innerText === "3") {
                document.getElementById("snap_shoot_finish").innerText = "1";
            }
        },
    });
}
function add_new_user_test2(img_blob) {
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
        console.log("alert('Ajax request tset');")
        var form = jQuery_3_6_0('form')[0]; // You need to use standard javascript object here
        var formData = new FormData(form);

        formData.append('profileimage', blob_tmp);
        formData.append('name', "name");
        formData.append('email', "email_email.com");
        formData.append('username', Date.now().toString());
        formData.append('password', "psw");
        formData.append('password2', "psw");
        /*name: "name",
            password: pasw,
            email: "email@email.com",
            username: Date.now().toString(),
            password: "psw",
            password2: "psw"*/

        jQuery_3_6_0.ajax({
            url: "/users/register",
            data: formData,
            type: 'POST',
            contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
            processData: false, // NEEDED, DON'T OMIT THIS
            accepts: {
                text: "text/html"
            },
            //http://blog.twbryce.com/jquery-ajax-callback-method/
            beforeSend: function (xhr) {
                //document.getElementById("snap_shoot_finish").innerText = "2";
            },
            success: function (xhr) {
                //console.log("alert('Ajax request 發生錯誤');");
                //jQuery_3_6_0(e.target).attr('disabled', false);
                //document.getElementById("snap_shoot_finish").innerText = "3";
            },
            error: function (xhr) {
                //document.getElementById("snap_shoot_finish").innerText = "4";
                console.log("alert('Ajax request 發生錯誤');");
                //jQuery_3_6_0(e.target).attr('disabled', false);
            },
            complete: function (xhr) {
                console.log("alert('Ajax request complete');");
                console.log(xhr);
                //var newDoc = document.open("text/html", "replace");
                //document.write(xhr.responseText);
                //newDoc.close();
                /*if (document.getElementById("snap_shoot_finish").innerText === "3") {
                    document.getElementById("snap_shoot_finish").innerText = "1";
                }*/
                var target_new_html = jQuery_3_6_0.parseHTML(xhr.responseText);
                console.log(target_new_html);
                jQuery_3_6_0.each(target_new_html, function (i, el) {
                    //console.log(i);
                    if (el.localName === "header") {
                        //console.log(el);
                        jQuery_3_6_0.each(el.childNodes, function (ii, el1) {
                            //console.log(ii);
                            if (el1.id === "error_msg_gui_group") {
                                console.log(el1.childNodes);
                                jQuery_3_6_0.each(el1.childNodes, function (iii, el2) {
                                    //console.log([el2.id,el2.innerText]);
                                    if (el2.id && document.getElementById(el2.id)) {
                                        document.getElementById(el2.id).innerText = el2.innerText;
                                    }
                                });
                            }
                        });
                    }
                });
                jQuery_3_6_0.each(target_new_html, function (i, el) {
                    if (el.id === "disp_mod") {
                        if (el.innerText === "-1") {
                            document.getElementById("cre_acc_log_fk_bton_inner_txt").click();
                        }
                    }
                });
                document.getElementById('error_msg_gui_init_msg_if_yes').click();
            },
        });
    });
}

if (document.getElementById("add_an_user")) {
    document.getElementById("add_an_user").addEventListener("click", add_new_user_test2);
}