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

function promptMessage(title, content) {
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
                var domain = window.location.host;
                // top.location.href = ('https:' == document.location.protocol ? 'https://' :
                // 'http://') + domain;
            }
        });
    })
}

function LoginMessage(url) {
    parent.layer.open({
        type: 2,
        id: 'loginMsg', //防止重复弹出   
        title: false,
        closeBtn: 0,
        shade: 0.8,
        area: ['541px', '390px'],
        content: ["LoginTip.html?url=" + url, 'no'],
        end: function() {}
    });
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