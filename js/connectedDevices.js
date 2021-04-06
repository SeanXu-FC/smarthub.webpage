var frequency = 0;
$(function() {
    layui.use('layer', function() {
        var layer = layui.layer;
        var loading = layer.load(0, {
            shade: false
        });
        getConnected(layer, loading);
    });
})

function getConnected(layer, loading) {
    var data = { "jsonrpc": "2.0", "method": "GetConnectedDevices", "params": {}, "id": "9.1" };

    data = JSON.stringify(data);
    $.ajax({
        type: "post",
        url: "/action/action",
        data: data,
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function(res) {
            layer.close(loading);
            if (res.result && res.result.dev_list) {
                var json = res.result.dev_list;
                var main = "";

                var arr = ["Ethernet", "Wi-Fi"];
                var arrImg = ["Group 2902.png", "Group 2901.png", "Group 2903.png"];
                for (var i = 0; i < json.length; i++) {
                    //main += '<tr class="text-center"><td class="align"><img class="img_a" src=""></td><td class="align"><span id="DeviceName"></span>' + json[item].DName + '</td><td class="align"><span id="MACAddress"></span>' + json[item].MACAddress + '</td><td class="align"><span id="IPAddress"></span>' + json[item].IPAddress + '</td><td class="align"><span id="ConnectMode" class="ConnectMode"></span>' + json[item].DType + '</td></tr>';
                    //main += '<tr class="text-center"><td class="align"><img class="img_a" src=""></td><td class="align"><span class="DeviceName"></span>' + json[item].DName + '</td><td class="align"><span class="MACAddress"></span></td><td class="align"><span class="IPAddress"></span>' + json[item].IPAddress + '</td><td class="align"><span  class="ConnectMode"></span></td></tr>';
                    if (json[i].DType == 0) {
                        main += '<tr class="text-center"><td style="text-align: center;"><img class="img_a" src="images/' + arrImg[0] + '"></td><td class="align"><span class="DeviceName"></span>' + json[i].DName + '</td><td class="align"><span class="MACAddress">' + json[i].MACAddress + '</span></td><td class="align"><span class="IPAddress"></span>' + json[i].IPAddress + '</td><td class="align"><span  class="ConnectMode">' + arr[0] + '</span></td></tr>';
                    } else if (json[i].DType == 1) {
                        main += '<tr class="text-center"><td style="text-align: center;"><img class="img_b" src="images/' + arrImg[1] + '"></td><td class="align"><span class="DeviceName"></span>' + json[i].DName + '</td><td class="align"><span class="MACAddress">' + json[i].MACAddress + '</span></td><td class="align"><span class="IPAddress"></span>' + json[i].IPAddress + '</td><td class="align"><span  class="ConnectMode">' + arr[1] + '</span></td></tr>';
                    } else {
                        main += '<tr class="text-center"><td style="text-align: center;"><img class="img_a" src="images/' + arrImg[2] + '"></td><td class="align"><span class="DeviceName"></span>' + json[i].DName + '</td><td class="align"><span class="MACAddress">' + json[i].MACAddress + '</span></td><td class="align"><span class="IPAddress"></span>' + json[i].IPAddress + '</td><td class="align"><span  class="ConnectMode">' + arr[0] + '</span></td></tr>';
                    };

                }
                $('#main').html(main);

                var arr = ['Ethernet', 'Wireless'];
                var arrImg = ['Group 2902.png', 'Group 2901.png', 'Group 2903.png'];
                for (var i = 0; i < json.length; i++) {
                    if (json[i].DType == 0) {
                        $(".img_a").eq(i).attr("src", 'images/' + arrImg[0]);
                    } else if (json[i].DType == 1) {
                        $(".img_b").eq(i).attr("src", 'images/' + arrImg[1]);
                    } else {
                        $(".img_a").eq(i).attr("src", 'images/Group 2903.png');
                    };
                }
            } else if (res.error) {
                layui.use(['form', 'layer'], function() {
                    var layer = layui.layer;
                    layer.msg("An error occurred：" + res.error.message);
                })
            }

        },
        error: function(jqXHR) {
            console.log("Error message", JSON.stringify(jqXHR))
            frequency++;
            if (frequency < 3) {
                setTimeout(() => {
                    getConnected(layer, loading);
                }, 5000);
            } else {
                frequency = 0;
                layer.close(loading);
                var tip = '<div style="padding: 20px;text-align: center;word-wrap:break-word;">Abnormal communication!</div>';
                promptMessage("Error message", tip);
            }
        }
    })
}