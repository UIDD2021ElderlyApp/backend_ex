var swiper = new Swiper(".mySwiper", {
    pagination: {
        el: ".swiper-pagination",
    },
});

$("#This_is_a_temporary_ID").click(function() {
    console.log("ssssssocial");
    var re = /\/app\/sel/gi;
    var newstr = window.location.href.replace(re, "/ts/home");
    window.location.href = newstr;
});
// swiper.pagination.bullets[0].classList.remove("swiper-pagination-bullet-active");
// swiper.pagination.bullets[1].classList.add("swiper-pagination-bullet-active");
/*
see : https://swiperjs.com/swiper-api  
https://www.tutorialdocs.com/tutorial/swiper/api-pagination.html
https://swiperjs.com/demos
https://swiperjs.com/get-started
*/