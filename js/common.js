//var reqUrlProxy = "/proxy";
var restart0 = true;
var reqUrlProxy = "";
//获取url中的参数
function GetUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
}
//限制字节输入长度
function WidthCheck(str, maxLen) {
    var w = 0;
    var tempCount = 0;
    //length 获取字数数，不区分汉子和英文 
    for (var i = 0; i < str.value.length; i++) {
        //charCodeAt()获取字符串中某一个字符的编码 
        var c = str.value.charCodeAt(i);
        //单字节加1 
        if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
            w++;
        } else {
            w += 2;
        }
        if (w > maxLen) {
            str.value = str.value.substr(0, i);
            break;
        }
    }
}
//限制输入中文和字节输入长度
function WidthCheckIO(str, maxLen) {
    var w = 0;
    var tempCount = 0;

    str.value = str.value.replace(/[^\x00-\xff]+/g, '');
    str.value = str.value.replace(/(^\s*)/g, "");
    str.value = str.value.replace(/[')]/g, "");
    //length 获取字数数
    for (var i = 0; i < str.value.length; i++) {
        //charCodeAt()获取字符串中某一个字符的编码 
        var c = str.value.charCodeAt(i);
        //单字节加1 
        if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
            w++;
        } else {
            w += 2;
        }
        if (w > maxLen) {
            str.value = str.value.substr(0, i);
            break;
        }
    }
}


//限制输入中文、单引号和)和输入长度
function WidthCheckPassword(str, maxLen) {
    var w = 0;
    var tempCount = 0;
    if (str) {
        str.value = str.value.replace(/[^"!#$% &'()*+,-.:;<=>{~|^\\}`\x5B\x5D_?@/A-Za-z0-9]/g, ''); //不能放正则里的特殊字符可以用16进制代替，比如\x5B\x5D为[]

    }

    //length 获取字数数
    for (var i = 0; i < str.value.length; i++) {
        //charCodeAt()获取字符串中某一个字符的编码 
        var c = str.value.charCodeAt(i);
        //单字节加1 
        if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
            w++;
        } else {
            w += 2;
        }
        if (w > maxLen) {
            str.value = str.value.substr(0, i);
            break;
        }
    }
}

//限制输入中文、单引号和)和输入长度
function WidthCheckPassword1(str, maxLen) {
    var w = 0;
    var tempCount = 0;
    str.value = str.value.replace(/[！￥……（）——、【】？《》。，：；“”·‘’]/g, "");

    //str.value = str.value.replace(/[\u4e00-\u9fa5]/g, '');
    var reg = /^[\da-zA-Z!@#$%|+-^&*.~]{8,64}$/; //数字、字母、特殊字符
    str.value = str.value.replace(/^[\da-zA-Z!@#$%|+-^&*.~]{8,64}$/g, '');
    //length 获取字数数
    for (var i = 0; i < str.value.length; i++) {
        //charCodeAt()获取字符串中某一个字符的编码 
        var c = str.value.charCodeAt(i);
        //单字节加1 
        if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
            w++;
        } else {
            w += 2;
        }
        if (w > maxLen) {
            str.value = str.value.substr(0, i);
            break;
        }
    }
}


function promptMessage(title, content, fn) {
    layui.use(['layer'], function() {
        var layer = layui.layer;
        layer.open({
            type: 1,
            id: 'layerDemo1', //防止重复弹出   
            title: title,
            content: content,
            btn: 'close',
            btnAlign: 'c', //按钮居中 
            closeBtn: 0,
            shade: 0, //不显示遮罩                            
            yes: function(index) {
                layer.close(index);
                if (fn) {
                    fn();
                } else {
                    var domain = window.location.host;
                    top.location.href = ('https:' == document.location.protocol ? 'https://' :
                        'http://') + domain;
                }

            }
        });
    })
}

function parentPromptMessage(title, content, fn) {
    layui.use(['layer'], function() {
        var layer = layui.layer;
        var divWH = gitWinWH(420, 200);
        parent.layer.open({
            type: 1,
            id: 'layerDemo1', //防止重复弹出   
            title: title,
            content: content,
            area: ['421px', 'auto'],
            offset: [divWH.h, divWH.w],
            btn: 'close',
            btnAlign: 'c', //按钮居中 
            closeBtn: 0,
            hade: [0.8, '#000'], //显示遮罩                            
            yes: function(index) {
                parent.layer.close(index);
                if (fn) {
                    fn();
                } else {
                    var domain = window.location.host;
                    top.location.href = ('https:' == document.location.protocol ? 'https://' :
                        'http://') + domain;
                }

            }
        });
    })
}

function getDpr() {
    var dpr = 1;
    if (Number($(window).width()) <= 1360) {
        //dpr = (Number($(window).width() / 1360) - 0.07).toFixed(2);
        dpr = (Number($(window).width() / 1360)).toFixed(2);
    }
    localStorage.setItem("dpr", dpr);
    var whOBJ = { //获取window顶层可视窗口宽高
        w: Number($(window).width()),
        h: Number($(window).height())
    }
    whOBJ = JSON.stringify(whOBJ);
    localStorage.setItem("whOBJ", whOBJ);
    return dpr;
    //return 1
}

function LoginMessage(url) {
    var dpr = localStorage.getItem("dpr");
    var divWH = gitWinWH(540, 420);
    parent.layer.open({
        type: 2,
        id: 'loginMsg', //防止重复弹出   
        title: false,
        closeBtn: 0,
        shade: 0.8,
        area: ['541px', '420px'],
        //area: ['308px', '239px'],
        offset: [divWH.h, divWH.w],
        //offset: 'auto',
        content: ["LoginTip.html?url=" + url, 'no'],
        end: function() {}
    });
}
//获取window可视窗口宽高
function gitWinWH(divW, divH) {
    var dpr = localStorage.getItem("dpr");

    var whOBJ = JSON.parse(localStorage.getItem("whOBJ"));
    var divWH = {
        w: (whOBJ.w / dpr / 2 - divW / 2) + "px",
        h: (whOBJ.h / dpr / 2 - divH / 2) + "px"
    }
    return divWH;
}



function tipMessage(content) {
    layui.use(['layer'], function() {
        var layer = layui.layer;
        layer.msg(content, {
            skin: 'layui-layer-molv',
            time: 3000,
            area: '400px'
        });
    })
}

function parentTipMessage(content) {
    // layui.use(['layer'], function() {
    //     var layer = layui.layer;
    //     layer.msg(content, {
    //         skin: 'layui-layer-molv',
    //         time: 3000,
    //         area: '400px'
    //     });
    // })
    var divWH = gitWinWH(420, 136);
    var tip = parent.layer.msg(content, {
        skin: 'layui-layer-molv',
        shade: [0.4, '#000'],
        time: 0,
        area: ['421px', '136px'],
        offset: [divWH.h, divWH.w],
    });
    return tip;
}
//刷新当前iframe页面
function eco_refresh(id) {
    var _body = window.parent;
    var _iframe1 = _body.document.getElementById(id);
    window.onbeforeunload = function() {};
    _iframe1.contentWindow.location.reload(true);
}

function clearCookie(name) {
    setCookie(name, "", -1);
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}