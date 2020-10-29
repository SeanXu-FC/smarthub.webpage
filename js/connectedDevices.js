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

            main += '<table class="table table-bordered table-responsive table-condensed table-hover">';
            main += '<thead><tr><th class="text-center Device-name active">Device</th><th class="text-center Device-name active">Device name</th><th class="text-center Device-name active">MAC address</th><th class="text-center Device-name active">IP address</th><th class="text-center Device-name active">Connection type</th></tr></thead>';
            for (var item in json) {
                main += '<tbody><tr class="text-center"><td class="align"><img  class="img_a" src=""></td><td class="align"><span id="DeviceName"></span>' + json[item].DName + '</td><td class="align"><span id="MACAddress"></span>' + json[item].MACAddress + '</td><td class="align"><span id="IPAddress"></span>' + json[item].IPAddress + '</td><td class="align"><span id="ConnectMode" class="ConnectMode"></span>' + json[item].DType + '</td></tr></tbody>';

            }
            main += '</table>'
            $('#main').html(main);

            var img = $('.text-center img');
            for (var i = 0; i < img.length; i++) {
                var arr = ['Ethernet', 'Wireless'];
                var arrImg = ['Group 2901', 'Group 2902'];
                console.log(json[i].DType)
                if (json[i].DType == 0) {
                    $('.ConnectMode').text(arr[0]);
                    // $(".img_a").attr("src", "images/Group 2901.png");
                    $(".img_a").attr("src", 'images/' + arrImg[1] + '.png');
                };
                if (json[i].DType == 1) {
                    $('.ConnectMode').text(arr[1]);
                    //$(".img_a").attr("src", "images/Group 2902.png");
                    $(".img_a").attr("src", 'images/' + arrImg[0] + '.png');
                }
            }

            //var index = 1;

            //var arrImg = ['images/Group 2901.png', 'images/Group 2902.png'];

            //var imgArr = $('.text-center> img');
            // console.log(json[i].DType)
            // for (var i = 0; i < imgArr.length; i++) {

            //     if (json[i].DType == 0) {
            //         $('.ConnectMode').html(arr[i]);
            //         imgArr[i].attr("src", arrImg[i]);
            //     } else {
            //         $('.ConnectMode').html(arr[i]);
            //         imgArr[i].attr("src", arrImg[i]);
            //     }
            // }
            // for (var i = 0; i < imgArr.length; i++) {
            //     if (json[i].DType == 0) {
            //         $('.ConnectMode').html(arr[0]);
            //         $(".text-center img").attr("src", "images/Group 2901.png");
            //     } else {
            //         $('.ConnectMode').html(arr[1]);
            //         $(".text-center img").attr("src", "images/Group 2902.png");
            //     }
            // }
            // console.log($('.ConnectMode').html())


        },
        // if (json[item].DType == 1) {
        //     $('.ConnectMode').html(arr[1]);
        //     $(".img_a").attr("src", "images/Group 2902.png");
        // }


        error: function(jqXHR) {
            alert("发生错误：" + jqXHR.status);

        }
    })


})