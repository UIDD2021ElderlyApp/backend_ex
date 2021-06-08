
/*availableImgs = [
    { desc : "Peace of mind", src : "/Justified-Gallery/photos/24096687789_c37d45712f_m.jpg" },
    
    { desc : "Abu Dhabi", src : "/Justified-Gallery/photos/23753792354_bd75d8dabc_m.jpg" },
    
    { desc : "Never stop climbing", src : "/Justified-Gallery/photos/16961685188_f130144d60_m.jpg" },
    
    { desc : "Terme", src : "/Justified-Gallery/photos/24014174029_2cfa940264_m.jpg" },
    
    { desc : "Deep sea", src : "/Justified-Gallery/photos/13824674674_ca1e482394_m.jpg" },
    
    { desc : "Above the World", src : "/Justified-Gallery/photos/13824322785_104dc0968c_m.jpg" },
    
    { desc : "The Spring", src : "/Justified-Gallery/photos/8842312290_f310d491f4_m.jpg" },
    
    { desc : "Cat firmness", src : "/Justified-Gallery/photos/8811828736_88392f614a_m.jpg" },
    
    { desc : "Into the Sea", src : "/Justified-Gallery/photos/8400794773_932654a20e_m.jpg" },
    
    { desc : "Bologna's T-Day", src : "/Justified-Gallery/photos/8157236803_78aa1698b6_m.jpg" },
    
    { desc : "Just in a dream Place", src : "/Justified-Gallery/photos/7948632554_01f6ae6b6f_m.jpg" },
    
    { desc : "Erice", src : "/Justified-Gallery/photos/7822678460_ee98ff1f69_m.jpg" },
    
    { desc : "Freedom", src : "/Justified-Gallery/photos/7002395006_29fdc85f7a_m.jpg" },
    
    { desc : "Maybe spring", src : "/Justified-Gallery/photos/7062575651_b23918b11a_m.jpg" },
    
    { desc : "Love", src : "/Justified-Gallery/photos/6841267340_855273fd7e_m.jpg" },
    
    { desc : "These are the colors I love", src : "/Justified-Gallery/photos/6791628438_affaa19e10_m.jpg" },
    
    { desc : "The Hope", src : "/Justified-Gallery/photos/6916180091_9c9559e463_m.jpg" },
    
    { desc : "Florence streets. Florence people.", src : "/Justified-Gallery/photos/6880502467_d4b3c4b2a8_m.jpg" },
    
    { desc : "I Love You", src : "/Justified-Gallery/photos/6876412479_6268c6e2aa_m.jpg" },
    
    { desc : "The painter in Florence", src : "/Justified-Gallery/photos/6840627709_92ed52fb41_m.jpg" },
    
    { desc : "Me and My Belover", src : "/Justified-Gallery/photos/6812090617_5fd5bbdda0_m.jpg" },
    
    { desc : "Fiocco", src : "/Justified-Gallery/photos/6806687375_07d2b7a1f9_m.jpg" },
    
    { desc : "My first clothespin", src : "/Justified-Gallery/photos/6798453217_72dea2d06e_m.jpg" },
    ]*/

function addSomeImages(limit) {
    for (var i = 0; i < limit; i++) {
        //var imgIdx = Math.floor(Math.random() * availableImgs.length);
        $('#endless-gallery').append('<a>' +
            //'<img src="' + availableImgs[imgIdx].src + '" />' + 
            '<img src="http://dummyimage.com/' +
            Math.ceil(Math.random() * 250 + 150) +
            //                    '/' +
            'x' +
            Math.ceil(Math.random() * 250 + 150) +
            //                    '" />' +
            '/000/ffffff.png" />' +
            '</a>');
    }
    $('#endless-gallery').justifiedGallery('norewind');
}

$('#endless-gallery').justifiedGallery({
    rowHeight: 120
});

addSomeImages(10);
$(window).scroll(function () {
    if ($(window).scrollTop() + $(window).height() == $(document).height()) {
        addSomeImages(5);
    }
});
