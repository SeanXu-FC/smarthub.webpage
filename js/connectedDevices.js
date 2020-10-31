$(function() {

    var data = { "jsonrpc": "2.0", "method": "connect_device", "params": {}, "id": "9.1" };

    data = JSON.stringify(data);
    $.ajax({
        type: "post",
        url: "/action/action",
        data: data,
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function(res) {
            var json = res.result.dev_list;
            var main = "";

            //main += '<table class="table table-bordered table-responsive table-condensed table-hover">';
            // main += '<thead><tr><th class="text-center Device-name active">Device</th><th class="text-center Device-name active">Device name</th><th class="text-center Device-name active">MAC address</th><th class="text-center Device-name active">IP address</th><th class="text-center Device-name active">Connection type</th></tr></thead>';
            for (var item in json) {
                main += '<tr class="text-center"><td class="align"><img class="img_a" src=""></td><td class="align"><span id="DeviceName"></span>' + json[item].DName + '</td><td class="align"><span id="MACAddress"></span>' + json[item].MACAddress + '</td><td class="align"><span id="IPAddress"></span>' + json[item].IPAddress + '</td><td class="align"><span id="ConnectMode" class="ConnectMode"></span>' + json[item].DType + '</td></tr>';
            }
            //main += '</table>'
            $('#main').html(main);

            var arr = ['Ethernet', 'Wireless'];
            var arrImg = ['Group 2902.png', 'Group 2901.png'];
            for (var i = 0; i < json.length; i++) {
                if (json[i].DType == 0) {
                    $('.ConnectMode').eq(i).text(arr[0]);
                    $(".img_a").eq(i).attr("src", 'images/' + arrImg[0]);
                } else if (json[i].DType == 1) {
                    $('.ConnectMode').eq(i).text(arr[1]);
                    $(".img_a").eq(i).attr("src", 'images/' + arrImg[1]);
                };
            }
        },

        error: function(jqXHR) {
            alert("发生错误：" + jqXHR.status);

        }
    })


})