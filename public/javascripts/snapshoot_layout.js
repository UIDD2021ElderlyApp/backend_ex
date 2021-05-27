import html2canvas from '../../snap/html2canvas/dist/html2canvas.esm.js';

document.getElementById("snap_shoot_screen").addEventListener("click", function () {
    html2canvas(document.querySelector("body")).then(canvas => {
        //canvas.style.display="none";
        //document.body.appendChild(canvas);
        console.log(canvas.toDataURL("image/jpeg", 1.0));
    });
});
