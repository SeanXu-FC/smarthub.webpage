$(function() {
    $('#saveBtn').one('click', function() {
            // var data = {
            //     "jsonrpc": "2.0",
            //     "method": "change_password",
            //     "params": {
            //         "oldPwd": $("#pwd").val(),
            //         "newPwd": $("#newPwd").val()
            //     },
            //     "id": "9.1"
            // };

            // data = JSON.stringify(data);
            $.ajax({
                type: "post",
                url: "/action/password",
                // data: data,
                dataType: "json",
                data: $("#form").serialize();
                //contentType: "application/json;charset=utf-8",
                contentType: "application/x-www-form-urlencoded;charset=utf-8",
                success: function(res) {
                    if (res.result.flag == "success") {
                        console.log(res);
                    } else {
                        console.log("An error occurred：" + res.result.flag);
                    }
                },
                error: function(jqXHR) {
                    alert("An error occurred：" + jqXHR.status);

                }
            });
        })
        // $('#saveBtn').click(function() {
        //     var data = {
        //         "jsonrpc": "2.0",
        //         "method": "change_password",
        //         "params": {
        //             "oldPwd": $("#pwd").val(),
        //             "newPwd": $("#newPwd").val()
        //         },
        //         "id": "9.1"
        //     };

    //     data = JSON.stringify(data);
    //     $.ajax({
    //         type: "post",
    //         url: "/action/password",
    //         data: data,
    //         dataType: "json",
    //         contentType: "application/json;charset=utf-8",
    //         success: function(data) {
    //             if (data.status == "success") {
    //                 console.log(data.msg);
    //             } else {
    //                 console.log("出现错误：" + data.msg);
    //             }
    //         },
    //         error: function(jqXHR) {
    //             alert("发生错误：" + jqXHR.status);

    //         }
    //     });

    // });
})