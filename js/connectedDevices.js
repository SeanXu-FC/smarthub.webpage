$(function() {

    var data = {
        "jsonrpc": "2.0",
        "method": "GetConnectedDeviceList",
        "params": {

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
            for (var item in res) {
                `
                <table class="table table-bordered table-responsive table-condensed table-hover">
                    <thead>
                        <tr>
                            <th class="text-center active"></th>
                            <th class="text-center active">Device name</th>
                            <th class="text-center active">Type </th>
                            <th class="text-center active">IP address</th>
                            <th class="text-center active">Connection type</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="text-center">
                            <td class="align"><img src="images/img-mobile.png"></td>
                            <td class="align"><span id="DeviceName"></span>${item.DeviceName}</td>
                            <td class="align"><span id="Mobile"></span>${item.Mobile}</td>
                            <td class="align"><span id="IPAddress"></span>${item.IPAddress}</td>
                            <td class="align"><span id="ConnectMode"></span>${item.ConnectMode}</td>
                        </tr>
                    </tbody>
                </table>
                `
            }
            // $("#DeviceName").html(res.result.DeviceName);
            // $("#Mobile").html(res.result.Mobile);
            // $("#IPAddress").html(res.result.IPAddress);
            // $("#ConnectMode").html(res.result.ConnectMode);
        },
        error: function(jqXHR) {
            alert("发生错误：" + jqXHR.status);

        }
    });


})