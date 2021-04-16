var SIM, type, times;
$(function() {
    SIM = GetUrlParam("SIM");
    type = GetUrlParam("type");
    times = GetUrlParam("times");

    console.log("SIM2", SIM)

    $("#lock_type").text(type == 1 ? "lock" : "unlock");
    $("#unlock_name").text("SIM" + SIM);
    $("#lock_time").text(times)
        // 按钮禁掉和灰掉
    $(".connected button").prop("disabled", true);
    $(".connected button").css("opacity", "0.5");


    $('#PIN_input').bind("keyup", function() {
        var len = $('#PIN_input').val().length;
        if (len <= 2) {
            $("#OK_btn").attr("disabled", "true");
            $("#OK_btn").css("opacity", "0.5");
        } else {
            $("#OK_btn").removeAttr("disabled");
            $("#OK_btn").css("opacity", "1");
        }
    });

    $('#cancel').click(function() {
        $(parent.frames["my-iframe"].document).find("#unlockSIM").val(0);
        var index = parent.layer.getFrameIndex(window.name);
        parent.layer.close(index); //关闭当前页
    });


    $("#OK_btn").on("click", function() {
        console.log(111)
        layui.use(['layer'], function() {
            var layer = layui.layer;
            unlockSIM(layer)
        })
    })
});

//解锁SIM卡
function unlockSIM(layer, params) {
    var loading = layer.load(0, {
        shade: false
    });
    var meth = type == 1 ? "LockSim" : "SimUnlock"
    var data = {
        "jsonrpc": "2.0",
        "method": meth,
        "params": {
            "status": 1,
            "sim_id": Number(SIM - 1),
            "pin_code": $('#PIN_input').val()
        },
        "id": "9.1"
    }
    data = JSON.stringify(data);

    $.ajax({
        type: "post",
        url: "/action/action",
        data: data,
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function(res) {
            layer.close(loading);
            if (res.result && res.result.status == 1) {
                $(parent.frames["my-iframe"].document).find("#unlockSIM").val(1);
                var index = parent.layer.getFrameIndex(window.name);
                parent.layer.close(index); //关闭当前页
            } else if (res.error) {
                var tip = '<div style="padding: 20px;text-align: center;word-wrap:break-word;">' + res.error.message + '!</div>';
                promptMessage("Error message", tip, closeLockSim);
            } else {
                if (res.result.pintimes == 0) {
                    $(parent.frames["my-iframe"].document).find("#unlockSIM").val(1);
                    var index = parent.layer.getFrameIndex(window.name);
                    parent.layer.close(index); //关闭当前页
                } else {
                    $(".PIN-describe").addClass("color-red");
                    $("#lock_time").text(res.result.pintimes);
                }
            }
        },
        error: function(jqXHR) {
            layer.close(loading);
            console.log("Error message", JSON.stringify(jqXHR))
            var tip = '<div style="padding: 20px;text-align: center;word-wrap:break-word;">Abnormal communication, please try again later!</div>';
            promptMessage("Error message", tip);
        }
    });
}

function closeLockSim() {
    var index = parent.layer.getFrameIndex(window.name);
    parent.layer.close(index); //关闭当前页
}