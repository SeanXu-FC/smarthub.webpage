var clickFlag = "true";
$(function() {
    $(".sub-menu li a").click(function() {
        $("#bg1").show();
        $("#enterPass").show(500)
    });
    $("#bg1").on("click", function() {
        $("#bg1").hide();
        $("#enterPass").hide(500)
    });
    $("#side-nav #nav a").on("click", function() {
        $("#side-nav #nav a").removeClass("nav-a-active");
        $(this).addClass("nav-a-active");
        var a = $(this).attr("data-url");
        "home.html" == a || void 0 == a ? ($("#my-iframe").attr("src"), $("#my-iframe").attr("src", a)) : getCookie("LogInStaus") ? ($("#my-iframe").attr("src"), $("#my-iframe").attr("src", a)) : LoginMessage(a)
    })
});

function _isMobile() { return navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i) }

function getCookie(a) {
    var b = document.cookie;
    console.log(b);
    b = b.split("; ");
    for (var c = 0; c < b.length; c++) { var d = b[c].split("="); if (d[0] == a) return d[1] }
    return ""
}

function setCookie(a, b, c) {
    a = a + "=" + escape(b);
    0 < c && (b = new Date, b.setTime(b.getTime + 36E5 * c), a = a + "; expire=" + b.toGMTString());
    document.cookie = a + "; secure;"
}

function clearCookie() {
    delCookie("password");
    delCookie("username")
}

function delCookie(a) { setCookie(a, "", -1) };