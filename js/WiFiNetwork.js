$(function() {
    var data = {
        "jsonrpc": "2.0",
        "method": "triger_scan_wifi",
        "params": {
            "vap_name": "ath2",
            "operate_code": 1
        },
        "id": "9.1"
    };

    data = JSON.stringify(data);
    $.ajax({
        type: "post",
        url: "/action/action",
        data: data,
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function(res) {
            var json = res.result.sta_info;
            var str = "";

            //方法一:es5字符串拼接：
            str += '<table style="width:100%" class=" table-responsive">';
            // str += '<tr>';
            // str += '<td width="60%"><div class="btFs ml20 mt20" id="wn_name_00">' + json[0].ssid + '</div><div class="green ml20">Channel:<span class="channel_00">' + json[0].channel + '</span> </div><div class="green ml20" id="wn_openStatus_00">' + json[0].encryption + '</div></td>';
            // str += '<td width="25%"><div class="mt10"><img class="imgIcon" src="images/icon-wifi01.png"></div><div class="mt10"><span id="signal_00">' + json[0].signal + '</span>%</div></td>';
            // str += '<td><img src="images/icon-info.png"></td>';
            // str += '</tr>';
            str += '<tr><td colspan="3" class="fsFw"><div class="ml20 ">Available networks</div></td></tr>';
            for (var index in json) {
                str += '<tr>';
                str += '<td width="60%"><div class="btFs ml20 mt20" id="wn_name_00">' + json[index].ssid + '</div><div class="green ml20">Channel:<span class="channel_00">' + json[index].channel + '</span> <span class="green ml20" id="wn_openStatus_00">encryption:' + json[index].encryption + '</span><span class="green ml20">mode:' + json[index].mode + '</span><span class="green ml20">bssid:' + json[index].bssid + '</span></div></td>';
                str += '<td width="25%"><div class="mt10"><img class="imgIcon" src="images/icon-wifi01.png"></div><div class="mt10"><span id="signal_00">' + json[index].signal + '</span>%</div></td>';
                // str += '<td><img src="images/icon-info.png"></td>';
                str += '</tr>';
            }
            str += '<tr><td colspan="3"><img src="images/icon-add.png" style="margin-top:-6px !important;margin-left:18px"><span class="addN">Add network</span></td></tr>';
            str += '</table>'

            $(".mCont").html(str);

            var $img = $(".imgIcon");
            // for (var i = 0; i < $img.length; i++) {
            //     console.log($img[i]);
            // }

            for (let i = 0; i < json.length; i++) {
                var signal = json[i].signal;
                // console.log(signal);
                if (signal);
                if (signal == 0) {
                    $img.eq(i).attr("src", "/images/signal-0.png");
                } else if (signal <= 25) {
                    $img.eq(i).attr("src", "/images/signal-0-25.png");
                } else if (signal <= 50) {
                    $img.eq(i).attr("src", "/images/signal-25-50.png");
                } else if (signal <= 75) {
                    $img.eq(i).attr("src", "/images/signal-50-75.png");
                } else if (signal <= 100) {
                    $img.eq(i).attr("src", "/images/signal-75-100.png");
                }
            }    

        },
        error: function(jqXHR) {
            alert("An error occurred：" + jqXHR.status);

        }
    });

    layui.use(['form'], function() {
        var form = layui.form;
        form.on('switch(switchTest)', function(data) {
            var checked = data.elem.checked;
            //var switch_goods_id = data.elem.attributes['switch_goods_id'].nodeValue;
            var serverStatus = 1;
            if (serverStatus) {
                data.elem.checked = checked;
            } else {
                data.elem.checked = !checked;
            }
            form.render();
            // TODO
            var data = {
                "jsonrpc": "2.0",
                "method": "triger_scan_wifi",
                "params": {
                    "vap_name": "ath2",
                    "operate_code": 1
                },
                "id": "9.1"
            };

            data = JSON.stringify(data);
            $.ajax({
                type: "post",
                url: "/action/action" + new Date().getTime(),
                data: data,
                dataType: "json",
                contentType: "application/json;charset=utf-8",
                success: function(res) {
                    if (checked) {
                        $("#wn_name_01").html(res.result.sta_info[0].ssid)
                        $(".mCont").show();
                    } else {
                        $(".mCont").hide();
                    }

                },
                error: function(jqXHR) {
                    alert("An error occurred：" + jqXHR.status);

                }
            });


        });
    });
})