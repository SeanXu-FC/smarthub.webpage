var currentSIM = 1;
var frequency = 0;
$(function() {
    var $wrapper = $('.tab-wrapper'),
        $allTabs = $wrapper.find('.tab-content > div'),
        $tabMenu = $wrapper.find('.tab-menu li'),
        $line = $('<div class="line"></div>').appendTo($tabMenu)

    $allTabs.not(':first-of-type').hide();
    $tabMenu.filter(':first-of-type').find(':first').width('90%');
    $tabMenu.each(function(i) {
        $(this).attr('data-tab', 'tab' + i);
    });

    $allTabs.each(function(i) {
        $(this).attr('data-tab', 'tab' + i);
    });

    $tabMenu.on('click', function() {
        var dataTab = $(this).data('tab');
        var $getWrapper = $(this).closest($wrapper);
        $(this).siblings().removeClass('active');
        $(this).addClass('active');

        $(this).siblings().find('.line').width(0);
        $(this).find($line).animate({
            'width': '90%'
        }, 'fast');
        if (dataTab == "tab0") {
            currentSIM = 1;
            $getWrapper.find($allTabs).filter('[data-tab=tab1]').hide();
            $getWrapper.find($allTabs).filter('[data-tab=tab0]').show();
        } else if (dataTab == "tab1") {
            currentSIM = 2;
            $getWrapper.find($allTabs).filter('[data-tab=tab0]').hide();
            $getWrapper.find($allTabs).filter('[data-tab=tab1]').show();
        }

    })

    //弹出一个iframe层
    initBindEvent("Change_SIM_pin1");
    initBindEvent("Change_SIM_pin2");
    bindUnblockEvent("unblock_SIM");
    bindUnblockEvent("unblock_SIM1");

    layui.use(['layer', 'form'], function() {
        var layer = layui.layer;
        var form = layui.form;
        getMainParameters(layer, form);

        form.on('checkbox(SIMpin)', function(data) {
            var checked = data.elem.checked;
            lockSimPinTip(checked);
        });
        form.on('checkbox(SIMpin2)', function(data) {
            var checked = data.elem.checked;
            lockSimPinTip(checked);

        });
    })

    $("#btn_saved1").on("click", function() {
        getDatausageVal();
    })
    $("#cancel1").on("click", function() {
        layui.use(['layer', 'form'], function() {
            var layer = layui.layer;
            var form = layui.form;
            getMainParameters(layer, form);
        })
    })

    // $("#dataWaring input").on('input', function(e) {
    //     var valLimit = $("#dataLimit input").val();
    //     var uintLimit = $("#switchMBLim").val();
    //     var uintWarning = $("#switchMBWar").val();
    //     valLimit = Number(uintLimit) == 1 ? valLimit * 1024 : valLimit;
    //     var valWarning = Number(uintWarning) == 1 ? $(this).val * 1024 : $(this).val;
    //     if (valWarning > valLimit) {

    //     }
    // })

})

function lockSimPinTip(checked) {
    var type, times;
    if (checked) {
        type = 1 //lock
    } else {
        type = 2 //unlock
    }
    times = MobileData[(currentSIM - 1)].pin_times;
    parent.layer.open({
        type: 2,
        title: false,
        closeBtn: 0,
        //shadeClose: true,
        shade: 0.8,
        area: ['400px', '320px'],
        content: ['lockSimPin.html?SIM=' + currentSIM + '&type=' + type + '&times=' + times, 'no'],
        end: function(index, layero) {
            var unlockSIM = $("#unlockSIM").val();
            if (unlockSIM == 1) {
                layui.use(['layer', 'form'], function() {
                    var layer = layui.layer;
                    var form = layui.form;
                    getMainParameters(layer, form);
                })
            } else {
                if (MobileData[(currentSIM - 1)].pin_lock == 0) {
                    $("#SIM_pin_lock" + currentSIM + " input").prop("checked", false);
                    $("#Change_SIM_pin" + currentSIM).attr("disabled", "disabled");
                } else {
                    $("#SIM_pin_lock" + currentSIM + " input").prop("checked", true);
                    $("#Change_SIM_pin" + currentSIM).removeAttr("disabled");
                }
                layui.use(['form'], function() {
                    var form = layui.form;
                    form.render();
                });
            }
        }
    });
}

function initBindEvent(id) {
    console.log(id)
    $('#' + id).on('click', function() {
        console.log(currentSIM)
            //iframe层
        parent.layer.open({
            type: 2,
            title: false,
            closeBtn: 0,
            //shadeClose: true,
            shade: 0.8,
            area: ['400px', '415px'],
            content: ['changeSimPin.html?SIM=' + currentSIM, 'no'],
            end: function(index, layero) {
                var unlockSIM = $("#unlockSIM").val();
                if (unlockSIM == 1) {
                    layui.use(['layer', 'form'], function() {
                        var layer = layui.layer;
                        var form = layui.form;
                        getMainParameters(layer, form);
                    })
                }
            }
        });
    });

}

function bindUnblockEvent(id) {
    $('#' + id).on('click', function() {
        console.log(currentSIM)
        var times = MobileData[(currentSIM - 1)].puk_times;
        //iframe层
        parent.layer.open({
            type: 2,
            title: false,
            closeBtn: 0,
            //shadeClose: true,
            shade: 0.8,
            area: ['400px', '510px'],
            content: ['unblockSIM.html?SIM=' + currentSIM + '&times=' + times, 'no'],
            end: function(index, layero) {
                var unlockSIM = $("#unlockSIM").val();
                if (unlockSIM == 1) {
                    layui.use(['layer', 'form'], function() {
                        var layer = layui.layer;
                        var form = layui.form;
                        getMainParameters(layer, form);
                    })
                }
            }
        });
    });
}
var MobileData;

function getMainParameters(layer, form) {
    var loading = layer.load(0, {
        shade: false
    });
    var data = {
        "jsonrpc": "2.0",
        "method": "GetMobile",
        "params": {},
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
            if (res.result) {
                var json = res.result;

                //模拟数据
                // json.sim[0].isblock = 1;
                // json.sim[0].pin_lock = 0;
                // json.sim[0].pin_times = 3;
                // json.sim[0].puk_times = 10;
                // json.sim[1].isblock = 0;
                // json.sim[1].pin_lock = 1;
                // json.sim[1].pin_times = 3;
                // json.sim[1].puk_times = 10;



                if (json.auo_switch == 0) { //Mobile data:                
                    $("#autoSwitch input").removeAttr("checked");
                } else {
                    $("#autoSwitch input").attr("checked", "checked");
                }


                MobileData = json.sim;
                console.log("MobileData", MobileData)
                renderDataUsage(MobileData, 0);
                setTimeout(() => {
                    renderDataUsage(MobileData, 1);
                }, 500);
            } else {
                layer.msg(res.error.message)
            }

        },
        error: function(jqXHR) {
            console.log("Error message", JSON.stringify(jqXHR))
            frequency++;
            if (frequency < 3) {
                setTimeout(() => {
                    getMainParameters(layer, form);
                }, 5000);
            } else {
                frequency = 0;
                layer.close(loading);
                var tip = '<div style="padding: 20px;text-align: center;word-wrap:break-word;">Abnormal communication!</div>';
                promptMessage("Error message", tip);
            }
        }
    });
}

function renderDataUsage(json, i) {
    var limitNum1, limitNum2, waringNum1, waringNum2;
    if (i == 0) {
        if (json[i].provider) {
            $("#SIM_provider1").text("(" + json[i].provider + ")");
        }
        if (json[i].isblock == 1) {
            $(".content1 .content1-contianer").hide();
            $(".sim-block-c").show();
            return;
        } else {
            $(".content1 .content1-contianer").show();
            $(".sim-block-c").hide();
        }
        if (json[i].pin_lock == 0) {
            $("#SIM_pin_lock1 input").removeAttr("checked");
            $("#Change_SIM_pin1").attr("disabled", "disabled");
        } else {
            $("#SIM_pin_lock1 input").attr("checked", "checked");
            $("#Change_SIM_pin1").removeAttr("disabled");
        }

        if (json[i].mobile_data == 1) { //Mobile data:                
            $("#mobileData input").attr("checked", "checked");
        } else {
            $("#mobileData input").removeAttr("checked");
        }
        if (json[i].roam_data == 1) { //Data roaming:
            $("#DataRoaming input").attr("checked", "checked");
        } else {
            $("#DataRoaming input").removeAttr("checked");
        }

        $("#day_left").text(json[i].left_days);
        $("#limit_startTime").text(json[i].rese_date);

        if (json[i].sim_data_limt_unit == 0) {
            $(".limit_unit").text("MB");
            $("#allUsed_MB").text(json[i].current_data_used);
            limitNum1 = json[i].monthly_data_limit;
            var redmianMB = (json[i].monthly_data_limit - json[i].current_data_used).toFixed(2);
            $("#redmian_MB").text(limitNum1);

        } else {
            $(".limit_unit").text("GB");
            var current_used = (json[i].current_data_used / 1024).toFixed(2)
            $("#allUsed_MB").text(current_used);
            limitNum1 = (Number(json[i].monthly_data_limit) / 1024).toFixed(3);
            var redmianMB = ((json[i].monthly_data_limit - json[i].current_data_used) / 1024).toFixed(2);
            $("#redmian_MB").text(limitNum1);
        }

        $("#last_manth_s option[value='" + json[i].usage_cycle + "']").prop("selected", true);
        if (json[i].data_warning_flag == 1) {
            $("#setDataWaring input").attr("checked", "checked");
        } else {
            $("#setDataWaring input").removeAttr("checked");
        }
        $("#switchMBWar option[value='" + json[i].warning_limit_unit + "']").prop("selected", true);
        if (json[i].warning_limit_unit == 0) {
            $("#dataWaring input").val(json[i].data_warning_size);
        } else {
            $("#dataWaring input").val((Number(json[i].data_warning_size) / 1024).toFixed(2));

        }

        if (json[i].usage_reminder_flag == 1) {
            $("#setDataLimit input").attr("checked", "checked");
        } else {
            $("#setDataLimit input").removeAttr("checked");
        }
        $("#switchMBLim option[value='" + json[i].sim_data_limt_unit + "']").prop("selected", true);
        if (json[i].sim_data_limt_unit == 0) {
            $("#dataLimit input").val(json[i].monthly_data_limit);
        } else {
            $("#dataLimit input").val((Number(json[i].monthly_data_limit) / 1024).toFixed(2));
        }

        $("#provider").text(json[i].provider);
        $("#sim_imsi").text(json[i].imsi);

    } else {
        if (json[i].provider) {
            $("#SIM_provider2").text("(" + json[i].provider + ")");
        }

        if (json[i].isblock == 1) {
            $(".content2 .content2-contianer").hide();
            $(".sim-block-c2").show();
            return;
        } else {
            $(".content2 .content2-contianer").show();
            $(".sim-block-c2").hide();
        }

        if (json[i].pin_lock == 0) {
            $("#SIM_pin_lock2 input").removeAttr("checked");
            $("#Change_SIM_pin2").prop("disabled", "disabled");
        } else {
            $("#SIM_pin_lock2 input").attr("checked", "checked");
            $("#Change_SIM_pin2").prop("disabled", false);
        }

        if (json[i].mobile_data == 1) {
            $("#mobileData2 input").attr("checked", "checked");
        } else {
            $("#mobileData2 input").removeAttr("checked");
        }
        if (json[i].roam_data == 1) {
            $("#DataRoaming2 input").attr("checked", "checked");
        } else {
            $("#DataRoaming2 input").removeAttr("checked");
        }

        $("#day_left2").text(json[i].left_days);
        $("#limit_startTime2").text(json[i].rese_date);

        if (json[i].sim_data_limt_unit == 0) {
            $(".limit_unit2").text("MB");
            $("#allUsed_MB2").text(json[i].current_data_used);
            limitNum2 = json[i].monthly_data_limit;
            var redmianMB = (json[i].monthly_data_limit - json[i].current_data_used).toFixed(2);
            $("#redmian_MB2").text(limitNum2);

        } else {
            $(".limit_unit2").text("GB");
            var current_used = (json[i].current_data_used / 1024).toFixed(2)
            $("#allUsed_MB2").text(current_used);
            limitNum2 = (Number(json[i].monthly_data_limit) / 1024).toFixed(3);
            var redmianMB = ((json[i].monthly_data_limit - json[i].current_data_used) / 1024).toFixed(2);
            $("#redmian_MB2").text(limitNum2);
        }

        $("#last_manth_s2 option[value='" + json[i].usage_cycle + "']").prop("selected", true);
        if (json[i].data_warning_flag == 1) {
            $("#setDataWaring2 input").attr("checked", "checked");
        } else {
            $("#setDataWaring2 input").removeAttr("checked");
        }
        $("#switchMBWar2 option[value='" + json[i].warning_limit_unit + "']").prop("selected", true);
        if (json[i].warning_limit_unit == 0) {
            $("#dataWaring2 input").val(json[i].data_warning_size);
            waringNum2 = json[i].data_warning_size;
        } else {
            $("#dataWaring2 input").val((Number(json[i].data_warning_size) / 1024).toFixed(2));
            waringNum2 = (Number(json[i].data_warning_size) / 1024).toFixed(2);
        }

        if (json[i].usage_reminder_flag == 1) {
            $("#setDataLimit2 input").attr("checked", "checked");
        } else {
            $("#setDataLimit2 input").removeAttr("checked");
        }
        $("#switchMBLim2 option[value='" + json[i].sim_data_limt_unit + "']").prop("selected", true);
        if (json[i].sim_data_limt_unit == 0) {
            $("#dataLimit2 input").val(json[i].monthly_data_limit);
        } else {
            $("#dataLimit2 input").val((Number(json[i].monthly_data_limit) / 1024).toFixed(2));
        }

        $("#provider2").text(json[i].provider);
        $("#sim_imsi2").text(json[i].imsi);

    }

    var unit = json[i].sim_data_limt_unit == 0 ? "MB" : "GB"
    var unit2 = json[i].warning_limit_unit == 0 ? "MB" : "GB"
    if (i == 0) {

        var Xdate = [];
        var Ydata = [];
        var AllY = 0;
        if (json[i].sim_data_limt_unit == 0) {

            for (var k = 0; k < json[i].data.length; k++) {
                AllY += Number(json[i].data[k]);
                Ydata[k] = AllY.toFixed(3);
            }
            waringNum1 = Number(json[i].data_warning_size);
        } else {

            for (var p = 0; p < json[i].data.length; p++) {
                Ydata[p] = (Number(json[i].data[p]) / 1024).toFixed(3);
                AllY += Number(Ydata[p]);
                Ydata[p] = AllY.toFixed(3);
            }
            waringNum1 = (Number(json[i].data_warning_size) / 1024).toFixed(2);
        }
        // if (Ydata.length > 0) {
        //     for (var j = 0; j < Ydata.length; j++) {
        //         Xdate.push(j);
        //     }
        // }
        Xdate = json[i].days;
        $(".now-month1").text(Xdate[0]);
        var len2 = Xdate.length;
        $(".now-month2").text(Xdate[len2 - 1]);
        renderEchart("used_MB", Xdate, Ydata, unit, limitNum1, unit2, waringNum1)
    } else {
        var Xdate1 = [];
        var Ydata1 = [];
        var AllY1 = 0;
        if (json[i].sim_data_limt_unit == 0) {

            for (var a = 0; a < json[i].data.length; a++) {
                AllY1 += Number(json[i].data[a]);
                Ydata1[a] = AllY1.toFixed(3);
            }
            waringNum2 = Number(json[i].data_warning_size);
        } else {
            //Ydata1 = json[i].days;
            for (var b = 0; b < json[i].data.length; b++) {
                Ydata1[b] = (Number(json[i].data[b]) / 1024).toFixed(3);
                AllY1 += Number(Ydata1[b]);
                Ydata1[b] = AllY1.toFixed(3);
            }
            waringNum2 = (Number(json[i].data_warning_size) / 1024).toFixed(2);
        }
        // if (Ydata1.length > 0) {
        //     for (var k = 0; k < Ydata1.length; k++) {
        //         Xdate1.push(k);
        //     }
        // }
        Xdate1 = json[i].days;
        $(".now-month3").text(Xdate1[0]);
        var len4 = Xdate1.length;
        $(".now-month4").text(Xdate1[len4 - 1]);
        //Xdate1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
        //Ydata1 = [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 9001, 90002, 90002, 90002];
        //Ydata1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 30, 40];
        //Ydata1 = [];
        renderEchart("used_MB2", Xdate1, Ydata1, unit, limitNum2, unit2, waringNum2)
    }

    layui.use(['form'], function() {
        var form = layui.form;
        form.render();
        $("#autoSwitch").show();
        $("#mobileData").show();
        $("#DataRoaming").show();
        $("#setDataWaring").show();
        $("#setDataLimit").show();
        $("#SIM_pin_lock1").show();

    });
}

// 渲染图表
function renderEchart(id, Xdate, Ydata, unit, limitNum, unit2, waringNum) {
    var myChartGL = echarts.init(document.getElementById(id));
    myChartGL.clear();
    var markLineObj = null;
    var textLine = '';

    var len = Ydata.length;
    var fenmu = limitNum > Ydata[len - 1] ? limitNum : Ydata[len - 1]
    var differNum = (limitNum / fenmu) - (waringNum / fenmu);
    textLine = differNum > 0.1 ? '' : '\r\n'

    if (Ydata.length > 0) {
        markLineObj = {
            symbol: ['none', 'none'], //['none']表示是一条横线；['arrow', 'none']表示线的左边是箭头，右边没右箭头；['none','arrow']表示线的左边没有箭头，右边有箭头
            label: {
                position: "end", //将警示值放在哪个位置，三个值“start”,"middle","end" 开始 中点 结束
                //formatter: limitNum + unit + " limit"
            },
            data: [{
                name: "limit",
                label: { formatter: limitNum + unit + " limit" + textLine },
                silent: false, //鼠标悬停事件 true没有，false有
                lineStyle: { //警戒线的样式 ，虚实 颜色
                    type: "solid", //样式  ‘solid’和'dotted'
                    color: "#ff002a",
                    padding: "0 60px 0 0px",
                    width: 1 //宽度
                },
                yAxis: limitNum // 警戒线的标注值，可以有多个yAxis,多条警示线 或者采用 {type : 'average', name: '平均值'}，type值有 max min average，分为最大，最小，平均值
            }, {
                name: "waring",
                label: { formatter: textLine + waringNum + unit + " waring", },
                silent: false, //鼠标悬停事件 true没有，false有
                lineStyle: { //警戒线的样式 ，虚实 颜色
                    type: "solid", //样式  ‘solid’和'dotted'
                    color: "#f77b00",
                    padding: "0px 60px 0 0",
                    width: 1 //宽度
                },
                yAxis: waringNum // 警戒线的标注值，可以有多个yAxis,多条警示线 或者采用 {type : 'average', name: '平均值'}，type值有 max min average，分为最大，最小，平均值
            }]
        }
    }
    var optionBranchGL = {
        title: {
            show: Ydata.length == 0,
            extStyle: {
                color: "#999",
                fontSize: 14
            },
            text: "No data",
            left: "center",
            top: "center"
        },
        tooltip: {
            trigger: 'axis',
            formatter: function(params, ticket, callback) {
                if (params.length <= 0) return "";
                var html = "day:" + (Number(params[0].axisValue)) + "<br />\r\n";
                for (var i = 0; i < params.length; i++) {
                    var dataObj = params[i];
                    html += dataObj.value + " " + unit + "<br />\r\n";
                }
                return html;
            }
        },
        grid: {
            left: '0px',
            right: '135px',
            bottom: '10px',
            top: '20px',
            containLabel: true
        },
        dataZoom: [{
            type: 'inside',
            start: 0
        }],
        xAxis: [{
            type: 'category',
            boundaryGap: true,
            axisTick: { show: false },
            axisLabel: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: '#b7b7b7',
                    width: 1
                }
            },
            data: Xdate
        }],
        yAxis: [{
            type: 'value',
            max: limitNum,
            max: function(extent) {
                console.log(extent)

                if (extent.max != "-Infinity") {
                    console.log(limitNum)
                    return extent.max > limitNum ? extent.max : limitNum //强制改变Y周最大值，以便定值横线能显示
                } else {
                    console.log(limitNum)
                    return limitNum
                }

            },
            axisLabel: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: '#b7b7b7',
                    width: 1,
                }
            },
            splitLine: {
                show: false
            },
            axisTick: { show: false },
        }],
        series: [{
                type: 'line',
                symbolSize: 6,
                symbol: 'circle',
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1, [
                                { offset: 0, color: '#cda4b1' },
                                { offset: 1, color: '#faf5f7' },

                            ]
                        )
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#861f41'
                    }
                },
                data: Ydata,
                markLine: markLineObj
            },

        ]
    };

    myChartGL.setOption(optionBranchGL);
    //自适应分辨率
    setTimeout(function() {
        window.onresize = function() {

            myChartGL.resize();

        }
    }, 200);
}

//设置前获取Datausage各项的值
function getDatausageVal() {
    var autoSwitch = $("#autoSwitch input").is(":checked") == true ? 1 : 0;
    var mobileData = $("#mobileData input").is(":checked") == true ? 1 : 0;
    var DataRoaming = $("#DataRoaming input").is(":checked") == true ? 1 : 0;
    var last_manth_s = $("#last_manth_s").val();
    var setDataWaring = $("#setDataWaring input").is(":checked") == true ? 1 : 0;
    var dataWaring = $("#dataWaring input").val();
    var switchMBWar = $("#switchMBWar").val();
    if (switchMBWar == 1) {
        dataWaring = dataWaring * 1024;
    }
    var setDataLimit = $("#setDataLimit input").is(":checked") == true ? 1 : 0;
    var dataLimit = $("#dataLimit input").val();
    var switchMBLim = $("#switchMBLim").val();
    if (switchMBLim == 1) {
        dataLimit = dataLimit * 1024;
    }
    var SIM_pin_lock = $("#SIM_pin_lock1 input").is(":checked") == true ? 1 : 0;


    var mobileData2 = $("#mobileData2 input").is(":checked") == true ? 1 : 0;
    var DataRoaming2 = $("#DataRoaming2 input").is(":checked") == true ? 1 : 0;
    var last_manth_s2 = $("#last_manth_s2").val();
    var setDataWaring2 = $("#setDataWaring2 input").is(":checked") == true ? 1 : 0;
    var dataWaring2 = $("#dataWaring2 input").val();
    var switchMBWar2 = $("#switchMBWar2").val();
    if (switchMBWar2 == 1) {
        dataWaring2 = dataWaring2 * 1024;
    }
    var setDataLimit2 = $("#setDataLimit2 input").is(":checked") == true ? 1 : 0;
    var dataLimit2 = $("#dataLimit2 input").val();
    var switchMBLim2 = $("#switchMBLim2").val();
    if (switchMBLim2 == 1) {
        dataLimit2 = dataLimit2 * 1024;
    }
    var SIM_pin_lock2 = $("#SIM_pin_lock2 input").is(":checked") == true ? 1 : 0;


    if (Number(dataWaring) > Number(dataLimit)) {
        console.log(dataWaring, dataLimit)
        layer.msg("data warning cannot be greater than data limit");
        return;
    }
    if (Number(dataWaring2) > Number(dataLimit2)) {
        layer.msg("data warning cannot be greater than data limit");
        return;
    }

    var params = {
        "auto_switch": autoSwitch,
        "sim": [{
                "sim_id": 0,
                "mobile_data": Number(mobileData),
                "roam_data": Number(DataRoaming),
                "usage_cycle": Number(last_manth_s),
                "data_warning_flag": Number(setDataWaring),
                "data_warning_size": Number(dataWaring),
                "warning_limit_unit": Number(switchMBWar),
                "usage_reminder_flag": Number(setDataLimit),
                "monthly_data_limit": Number(dataLimit),
                "sim_data_limt_unit": Number(switchMBLim),
                "lock_sim": Number(SIM_pin_lock)
            },
            {
                "sim_id": 1,
                "mobile_data": Number(mobileData2),
                "roam_data": Number(DataRoaming2),
                "usage_cycle": Number(last_manth_s2),
                "data_warning_flag": Number(setDataWaring2),
                "data_warning_size": Number(dataWaring2),
                "warning_limit_unit": Number(switchMBWar2),
                "usage_reminder_flag": Number(setDataLimit2),
                "monthly_data_limit": Number(dataLimit2),
                "sim_data_limt_unit": Number(switchMBLim2),
                "lock_sim": Number(SIM_pin_lock2)
            }
        ]

    }
    layui.use(['layer'], function() {
        var layer = layui.layer;
        setDatausage(layer, params)
    })
}
//设置Datausage
function setDatausage(layer, params) {

    var loading = layer.load(0, {
        shade: false
    });
    var data = {
        "jsonrpc": "2.0",
        "method": "SetMobile",
        "params": params,
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
            if (res.result) {
                layui.use(['layer', 'form'], function() {
                    var layer = layui.layer;
                    var form = layui.form;
                    getMainParameters(layer, form);
                })
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