// test
$("#social").click(function() {
    var re = /\/ts\/home/gi;
    var newstr = window.location.href.replace(re, "/ts/poop");
    window.location.href = newstr;
});
$("#stroll").click(function() {
    var re = /\/ts\/home/gi;
    var newstr = window.location.href.replace(re, "/ts/mapview");
    window.location.href = newstr;
});
$("#feed").click(function() {
    var re = /\/ts\/home/gi;
    var newstr = window.location.href.replace(re, "/ts/feed");
    window.location.href = newstr;
});
$("#level_value").animate({ 'width': '25vw' }, 3000)