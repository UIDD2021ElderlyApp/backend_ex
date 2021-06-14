// test level bar
// $("#level_value").animate({ 'width': '25vw' }, 3000)

// select animal (1, 2, 3)
var animal = 3
switch (animal) {
    case 1:
        $("#back_block").html('<div id="back1"></div><img src="image/home_back1_land.svg" style="position:absolute; width:100%; bottom:10%; z-index:2;"><img src="image/home_back1_cloud.svg" style="position:absolute; width:100%; top:10%; z-index:1;"></img>')
        $("#animal img").css("content", "url('image/home_animal1.svg')")
        $("#menu_back").css('background-color', '#61913D')
        break;
    case 2:
        $("#back_block").html('<div id="back2_1"></div><div id="back2_2"></div><img src="image/home_back2_cloud.svg" style="position:absolute; width:100%; top:10%; z-index:1;"><div id="sun"><img src="image/home_back2_sun.svg" style="height:100%;"></div><img src="image/home_back2_sand.svg" style="position:absolute; width:100%; bottom:10%; z-index:3;"><img src="image/home_back2_unbrella.svg" style="position:absolute; width:50%; right:0%; top:20%; z-index:4"><img src="image/home_back2_tree.svg" style="position:absolute; width:30%; left:25%; bottom:43vw; z-index:6"><img src="image/home_back2_coconut.svg" style="position:absolute; width: 15%; left:25%; bottom:35vw; z-index:8"></img>')
        $("#animal img").css("content", "url('image/home_animal2.svg')")
        $("#menu_back").css('background-color', '#004D69')
        break;
    case 3:
        $("#back_block").html('<div id="back3"></div><img src="image/home_back3_cloud.svg" style="position:absolute; width:100%; top:10%; z-index:1;"><img src="image/home_back3_land.svg" style="position:absolute; width:100%; bottom:10%; z-index:2;"></img>')
        $("#animal img").css("content", "url('image/home_animal3.svg')")
        $("#menu_back").css('background-color', '#61913D')
        break;
}

// vmousedown fail
$(".button").bind('touchstart', function() {
    $(this).animate({ 'opacity': 0.5 }, 100)
})
$(".button").bind('touchend', function() {
    $(this).animate({ 'opacity': 1 }, 100)
})

// $("#house").bind('touchstart', function() {
//     $(this).animate({ boxShadow: "0px 0px 5px 3px hsla(100, 70%, 60%, 0.8)" }, 100)
// })
// $("#house").bind('touchend', function() {
//     $(this).animate({ boxShadow: "0px 0px 5px 3px hsla(100, 70%, 60%, 0.8)" }, 100)
// })
$("#house").bind('touchstart', function() {
    $(this).animate({ 'opacity': 0.8 }, 100)
})
$("#house").bind('touchend', function() {
    $(this).animate({ 'opacity': 1 }, 100)
})
var sleep = false
$("#house").click(function() {
    if (!sleep) {
        $(this).animate({}, 300, function() {
            // $("#animal").css("opacity", "0");
            $("#animal").css("width", "0%");
            switch (animal) {
                case 1:
                    $("#house").css("background-image", "url(image/home_sleep1.svg)");
                    break;
                case 2:
                    $("#house").css("background-image", "url(image/home_sleep2.svg)");
                    break;
                case 3:
                    $("#house").css("background-image", "url(image/home_sleep3.svg)");
                    break;
            }
        })
        sleep = true
    } else {
        $(this).animate({}, 300, function() {
            $("#animal").css("width", "60%");
            $(this).css("background-image", "url(image/home_house.svg)");
        })
        sleep = false
    }
})

// mission remind // 0, 1(have "!")
var mission_complete = 0
if (mission_complete) {
    $("#remind").css("opacity", "1")
}