jQuery_3_6_0(function () {

    function checkFlag() {
        if (document.getElementById('is_a_squuuuuuuuuuuuuuare').innerText === 'yes') {
            setTimeout(() => {
                checkFlag();
            }, 5);
        } else {
            init_choose();
        }
    }
    checkFlag();
});

function init_choose() {
    var swiper = new Swiper(".mySwiper", {
        pagination: {
            el: ".swiper-pagination",
        },
        initialSlide: 1, //起始頁
        centeredSlides: false,
        slidesPerView: 'auto', //可自定義slide宽度，(配合css)
        loop: true //循環
    });

    var timer;

    function play() {
        timer = setInterval(function () {
            $("#choose_text").animate({ 'opacity': 0.5 }, 1000, function () {
                $("#choose_text").animate({ 'opacity': 1 }, 1000)
            })
        }, 1500)
    }
    play();

}

