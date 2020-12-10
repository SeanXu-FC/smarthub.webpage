$(function() {


    var $wrapper = $('.tab-wrapper'),
        $allTabs = $wrapper.find('.tab-content > div'),
        $tabMenu = $wrapper.find('.tab-menu li'),
        $line = $('<div class="line"></div>').appendTo($tabMenu)

    $allTabs.not(':first-of-type').hide();
    $tabMenu.filter(':first-of-type').find(':first').width('90%')

    $tabMenu.each(function(i) {
        $(this).attr('data-tab', 'tab' + i);
    });

    $allTabs.each(function(i) {
        if (i == 0) { //Data usage公用视图，$allTabs隐藏了一个，data-tab="tab1"要去掉
            $(this).attr('data-tab', 'tab' + i);
        } else {
            $(this).attr('data-tab', 'tab' + (i + 1)); //data-tab="tab1"去掉
        }

    });

    $tabMenu.on('click', function() {

        var dataTab = $(this).data('tab');
        console.log(dataTab);

        var $getWrapper = $(this).closest($wrapper);
        $getWrapper.find($tabMenu).removeClass('active');
        $(this).addClass('active');

        $getWrapper.find('.line').width(0);
        $(this).find($line).animate({
            'width': '90%'
        }, 'fast');
        if (dataTab == "tab0") {
            renderDataUsage(MobileData, 0); //渲染Data usage SIM1数据
        } else if (dataTab == "tab1") {
            renderDataUsage(MobileData, 1); //渲染Data usage SIM2数据
            return;
        }
        $getWrapper.find($allTabs).hide();
        $getWrapper.find($allTabs).filter('[data-tab=' + dataTab + ']').show();
    });

    // $(".SIMChange-tab").on("click",function(){

    // })

    var images = ['images/icon-arrow-up.png', 'images/icon-arrow-down.png'];
    $('#arrow_tab').click(function() {
        if ($('#arrow').attr("class") == "up") {
            $('#arrow').attr("src", images[1]);
            $('#arrow').removeClass();
            $(".advancedContent").show();
        } else {
            $('#arrow').attr("src", images[0]);
            $('#arrow').addClass("up");
            $(".advancedContent").hide();
        }
    });

    var images1 = ['images/icon-arrow-right.png', 'images/icon-arrow-down-1.png'];

    // function SwitchMenu(obj) {
    //     if (document.getElementById) {
    //         var el = document.getElementById(obj);
    //         var ar = document.getElementById("expand").getElementsByTagName("content ");
    //         if (el.style.display != "block ") {
    //             for (var i = 0; i < ar.length; i++) {
    //                 if (ar[i].className == "content ")
    //                     ar[i].style.display = "none ";
    //             }
    //             el.style.display = "block ";
    //         } else {
    //             el.style.display = "none ";
    //         }
    //     }
    // }

    //弹出一个iframe层
    $('.Change-SIM-pin').on('click', function() {
        //var changeSimPin = '<div id="enterPass1" class="Rectangle-1187"><h3 class="Enter-admin-password Enter-the-password-for-network-Mynetwork1">Enter the password for network</h3><p class="Enter-the-admin-password-to-make-changes mt-20 Enter-the-password-for-network-Mynetwork1">"Mynetwork1"</p><div style="position:relative"><label class="Password mt-30" style="display: inline-block;">password:</label><input type="password" value="" class="Rectangle-1188 pwd" style="display: inline-block;" /><span class="SHOW" style="position:absolute; top:37px;left:378px;cursor: pointer;" onclick="change()">show</span></div><div class="row mt-40"><div class="col-md-3 col-md-offset-3"><button class="Path-101 Cancel">Cancel</button></div><div class="col-md-5 col-md-offset-1 connected"><button class="Rectangle-1182 active OK">Connected</button></div></div></div>';
        //iframe层
        parent.layer.open({
            type: 2,
            title: false,
            //shadeClose: true,
            shade: 0.8,
            area: ['500px', '410px'],
            //content: ['内容', '#id'] ,
            // content: $('#enterPass1')

            //content: changeSimPin
            content: ['changeSimPin.html', 'no'],
        });
    });

    layui.use(['layer', 'form'], function() {
        var layer = layui.layer;
        var form = layui.form;
        getMainParameters(layer, form);
        //getMobileData(layer, form);
        form.on('switch(mobileData)', function(data) {
            var checked1 = data.elem.checked;
            var checked2 = $("#DataRoaming input").is(":checked");
            changeSwitchStatus(layer, form, checked1, checked2)
        });
        form.on('switch(dataRoaming)', function(data) {
            var checked2 = data.elem.checked;
            var checked1 = $("#mobileData input").is(":checked");
            changeSwitchStatus(layer, form, checked1, checked2)
        });

        form.on('switch(dataLimit)', function(data) {
            var checked = data.elem.checked;
            console.log(checked)
            if (checked) {
                $("#dataLimit input").removeAttr("disabled");
                $("#switchMB").removeAttr("disabled");
                $("#limit_time").removeAttr("disabled");
                $("#last_manth_s").removeAttr("disabled");

            } else {
                $("#dataLimit input").attr("disabled", true);
                $("#switchMB").attr("disabled", true);
                $("#limit_time").attr("disabled", true);
                $("#last_manth_s").attr("disabled", true);
            }
            form.render();
        });

        $("#arrow1").click(function() {
            var content = document.getElementById("content");
            if (content.style.display == "none") {
                content.style.display = "block ";
                $('#arrow1 span .up').attr("src", images1[1]);
                getDatausage(layer, form);
            } else {
                content.style.display = "none ";
                $('#arrow1 span .up').attr("src", images1[0]);
                $tabMenu.filter('[data-tab=tab0]').click();
            }
        });

        $("#arrow2").click(function() {
            var content1 = document.getElementById("content1");
            if (content1.style.display == "none") {
                content1.style.display = "block ";
                $('#arrow2 span .up').attr("src", images1[1]);
                getSimManagement(layer, form)
            } else {
                content1.style.display = "none ";
                $('#arrow2 span .up').attr("src", images1[0]);
            }
        });

    });



});

function changeSwitchStatus(layer, form, checked1, checked2) {
    var mode1, mode2;
    if (checked1 == false) {
        mode1 = 0;
    } else if (checked1 == true) {
        mode1 = 1;
    }
    if (checked2 == false) {
        mode2 = 0;
    } else if (checked2 == true) {
        mode2 = 1;
    }
    var data = {
        "jsonrpc": "2.0",
        "method": "SetLteMainParameters",
        "params": {
            "mobile_data": mode1,
            "roam_data": mode2
        },
        "id": "9.1"
    }

    data = JSON.stringify(data);
    $.ajax({
        type: "post",
        url: req + "/action/action",
        data: data,
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function(res) {
            if (res.result) {
                //layer.msg(res.result.status);
            } else if (res.error) {
                layer.msg("An error occurred：" + res.error.message);
            }
        },
        error: function(jqXHR) {
            alert("An error occurred：" + jqXHR.status);

        }
    });
}

function getMainParameters(layer, form) {
    var loading = layer.load(0, {
        shade: false
    });
    var data = {
        "jsonrpc": "2.0",
        "method": "GetLteMainParameters",
        "params": {},
        "id": "9.1"
    }
    data = JSON.stringify(data);
    $.ajax({
        type: "post",
        url: req + "/action/action",
        data: data,
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function(res) {
            layer.close(loading);
            if (res.result) {
                var json = res.result;
                if (json.mobile_data == 1) { //Mobile data:                
                    $("#mobileData input").attr("checked", "checked");
                } else {
                    $("#mobileData input").removeAttr("checked");
                }
                if (json.roam_data == 1) { //Data roaming:
                    $("#DataRoaming input").attr("checked", "checked");
                } else {
                    $("#DataRoaming input").removeAttr("checked");
                }
                form.render();
                $("#mobileData").show();
                $("#DataRoaming").show();
            } else {
                layer.msg(res.error.message)
            }

        },
        error: function(jqXHR) {
            alert("An error occurred：" + jqXHR.status);
        }
    });
}
var MobileData;

function getDatausage(layer, form) {
    var loading = layer.load(0, {
        shade: false
    });
    var data = {
        "jsonrpc": "2.0",
        "method": "GetLteDataUsage",
        "params": {},
        "id": "9.1"
    }
    data = JSON.stringify(data);
    $.ajax({
        type: "post",
        url: req + "/action/action",
        data: data,
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function(res) {
            layer.close(loading);
            if (res.result) {
                var json = res.result;
                MobileData = json.data_usages;
                //var dataTab =$('.tab-wrapper .tab-menu li').data('tab');
                renderDataUsage(MobileData, 0); //默认渲染Data usage SIM1
            }


            // if (json.moblie_data == 1 && json.sim.monthly_data_limit_flag == 1) {
            //     $("#monthlydatalimit input").prop("checked", true);
            //     var mobileData = $("#monthlydatalimit .layui-form-switch");
            //     mobileData.find("em").text("ON");
            //     mobileData.prop("class", "layui-unselect layui-form-switch layui-form-onswitch");
            //     console.log('monthly_data_limit on')
            // }
            // if (json.moblie_data == 0 && json.sim.monthly_data_limit_flag == 0) {
            //     $("#monthlydatalimit input").prop("checked", false);
            //     var mobileData = $("#monthlydatalimit .layui-form-switch");
            //     mobileData.find("em").text("OFF");
            //     mobileData.prop("class", "layui-unselect layui-form-switch");
            //     console.log('monthlydatalimit off')
            //     alert(0)
            // }
            // if (json.sim.usage_reminder_flag == 1) {
            //     $("#usagereminders input").prop("checked", true);
            //     var mobileData = $("#usagereminders .layui-form-switch");
            //     mobileData.find("em").text("ON");
            //     mobileData.prop("class", "layui-unselect layui-form-switch layui-form-onswitch");
            //     console.log('usagereminders on')
            // }
            // if (json.sim.usage_reminder_flag == 0) {
            //     $("#usagereminders input").prop("checked", false);
            //     var mobileData = $("#usagereminders .layui-form-switch");
            //     mobileData.find("em").text("OFF");
            //     mobileData.prop("class", "layui-unselect layui-form-switch");
            //     console.log('usagereminders off')
            // }


        },
        error: function(jqXHR) {
            alert("An error occurred：" + jqXHR.status);
        }
    });
}
//渲染Data usage
function renderDataUsage(json, i) {

    if (json[i] && json[i].monthly_data_limit_flag == 1) { //Set monthly data limit:
        $("#monthlydatalimit input").attr("checked", "checked");
        $("#dataLimit input").removeAttr("disabled");
        $("#switchMB").removeAttr("disabled");
        $("#limit_time").removeAttr("disabled");
        $("#last_manth_s").removeAttr("disabled");
    } else {
        $("#monthlydatalimit input").removeAttr("checked");
        $("#dataLimit input").attr("disabled", true);
        $("#switchMB").attr("disabled", true);
        $("#limit_time").attr("disabled", true);
        $("#last_manth_s").attr("disabled", true);
    }

    if (json[i].usage_reminder_flag == 1) { //Usage reminders
        $("#usagereminders input").attr("checked", "checked");
    } else {
        ("#usagereminders input").removeAttr("checked");
    }

    if (json[i].sim_data_limt_unit == 0) {
        $(".limit_unit").text("MB");
        $("#allUsed_MB").text(json[i].current_data_used);
        var redmianMB = (json[i].monthly_data_limit - json[i].current_data_used).toFixed(0);
        $("#redmian_MB").text(redmianMB);
        $("#dataLimit input").val(redmianMB);
    } else {
        $(".limit_unit").text("GB");
        var current_used = (json[i].current_data_used / 1024).toFixed(2)
        $("#allUsed_MB").text(current_used);
        var redmianMB = ((json[i].monthly_data_limit - json[i].current_data_used) / 1024).toFixed(1);
        $("#redmian_MB").text(redmianMB);
        $("#dataLimit input").val(redmianMB);
    }



    $("#switchMB option[value='" + json[i].sim_data_limt_unit + "']").prop("selected", true);

    if (json[i].start_date) { //Start data limit on
        layui.use(['laydate'], function() {
            laydate = layui.laydate;
            laydate.render({
                elem: '#test1',
                lang: 'en',
                value: json[i].start_date,
                isInitValue: true,
                done: function(value, date) {
                    console.log(value, date)
                    $("#test1").val(value)
                }
            });
        });
    } else {
        layui.use(['laydate'], function() {
            laydate = layui.laydate;
            laydate.render({
                elem: '#test1',
                lang: 'en',
                done: function(value, date) {
                    console.log(value, date)
                    $("#test1").val(value)
                }
            });
        });
    }

    if (json[i].last_month) {
        $("#last_manth_s option[value='" + Number(json[i].last_month) + "']").prop("selected", true);
    }




    if (i == 0) {
        var Xdate = [];
        var Ydata = json[i].days;
        if (Ydata.length > 0) {
            for (var i = 1; i < Ydata.length; i++) {
                Xdate.push(i);
            }
        }
        renderEchart("used_MB", Xdate, Ydata)
    } else {
        var Xdate1 = [];
        var Ydata1 = json[i].days;
        if (Ydata1.length > 0) {
            for (var i = 1; i < Ydata1.length; i++) {
                Xdate1.push(i);
            }
        }
        renderEchart("used_MB", Xdate1, Ydata1)
    }
    layui.use(['form'], function() {
        var form = layui.form;
        form.render();
        $("#monthlydatalimit").show();
        $("#usagereminders").show();

    });
}

function getSimManagement(layer, form) {
    var loading = layer.load(0, {
        shade: false
    });
    var data = {
        "jsonrpc": "2.0",
        "method": "GetLteSimManagement",
        "params": {},
        "id": "9.1"
    }
    data = JSON.stringify(data);
    $.ajax({
        type: "post",
        url: req + "/action/action",
        data: data,
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function(res) {
            layer.close(loading);
            if (res.result) {
                var json = res.result;
                rendSIMManagement(json)
            }
        },
        error: function(jqXHR) {
            alert("An error occurred：" + jqXHR.status);
        }
    });
}
//渲染SIM management
function rendSIMManagement(json) {
    if (json.active_sim) { //Active SIM:
        $("#SIM option[value='" + Nunber(json.active_sim) + "']").prop("selected", true);
    }

    if (json.auo_switch == 1) { //Auto SIM switching:
        $("#AutoSim input").attr("checked", "checked");
    } else {
        $("#DataRoaming input").removeAttr("checked");
    }
    //SIM1
    if (json.sim[0].rule_weak_signal == 1) { //SIM switching rules:
        $("#Weak_signal_1").attr("checked", "checked");
    } else {
        $("#Weak_signal_1").removeAttr("checked");
    }
    if (json.sim[0].rule_dlimit == 1) { //SIM switching rules:
        $("#rule_dlimit_1").attr("checked", "checked");
    } else {
        $("#rule_dlimit_1").removeAttr("checked");
    }
    if (json.sim[0].rule_roamming == 1) { //SIM switching rules:
        $("#rule_roamming_1").attr("checked", "checked");
    } else {
        $("#rule_roamming_1").removeAttr("checked");
    }
    if (json.sim[0].rule_noservice == 1) { //SIM switching rules:
        $("#rule_noservice_1").attr("checked", "checked");
    } else {
        $("#rule_noservice_1").removeAttr("checked");
    }

    $("#provider1").text(json.sim[0].provider);
    $("#sim_imsi1").text(json.sim[0].imsi);
    $("#sim_tele_num1").text(json.sim[0].phone_num);
    $("#sim_puk_num1").text(json.sim[0].puk);

    if (json.sim[0].pinlock == 1) { //SIM switching rules:
        $("#SIM_pin_lock1").attr("checked", "checked");
    } else {
        $("#SIM_pin_lock1").removeAttr("checked");
    }

    //SIM2
    if (json.sim[1].rule_weak_signal == 1) { //SIM switching rules:
        $("#Weak_signal_2").attr("checked", "checked");
    } else {
        $("#Weak_signal_2").removeAttr("checked");
    }
    if (json.sim[1].rule_dlimit == 1) { //SIM switching rules:
        $("#rule_dlimit_2").attr("checked", "checked");
    } else {
        $("#rule_dlimit_2").removeAttr("checked");
    }
    if (json.sim[1].rule_roamming == 1) { //SIM switching rules:
        $("#rule_roamming_2").attr("checked", "checked");
    } else {
        $("#rule_roamming_2").removeAttr("checked");
    }
    if (json.sim[1].rule_noservice == 1) { //SIM switching rules:
        $("#rule_noservice_2").attr("checked", "checked");
    } else {
        $("#rule_noservice_2").removeAttr("checked");
    }

    $("#provider2").text(json.sim[1].provider);
    $("#sim_imsi2").text(json.sim[1].imsi);
    $("#sim_tele_num2").text(json.sim[1].phone_num);
    $("#sim_puk_num2").text(json.sim[1].puk);

    if (json.sim[1].pinlock == 1) { //SIM switching rules:
        $("#SIM_pin_lock2").attr("checked", "checked");
    } else {
        $("#SIM_pin_lock2").removeAttr("checked");
    }

    layui.use(['form'], function() {
        var form = layui.form;
        form.render();
    });
}
// 渲染图表
function renderEchart(id, Xdate, Ydata) {
    var myChartGL = echarts.init(document.getElementById(id));
    myChartGL.clear();
    var optionBranchGL = {
        title: {
            show: Ydata.length == 0,
            extStyle: {
                color: "#999",
                fontSize: 14
            },
            text: "暂无数据",
            left: "center",
            top: "center"
        },
        tooltip: {
            trigger: 'axis',
            formatter: function(params, ticket, callback) {
                if (params.length <= 0) return "";
                var html = "d" + params[0].axisValue + "<br />\r\n";
                for (var i = 0; i < params.length; i++) {
                    var dataObj = params[i];
                    html += dataObj.value + " MB<br />\r\n";
                }
                return html;
            }
        },
        grid: {
            left: '0px',
            right: '0px',
            bottom: '2px',
            top: '2%',
            containLabel: true
        },
        dataZoom: [{
            type: 'inside',
            start: 0
        }],
        xAxis: [{
            type: 'category',
            boundaryGap: false,
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
            data: Ydata
        }]
    };

    myChartGL.setOption(optionBranchGL);
    //自适应分辨率
    setTimeout(function() {
        window.onresize = function() {

            myChartGL.resize();

        }
    }, 200);
}

//设置SIM management
function setSimManagement(layer, form) {
    var loading = layer.load(0, {
        shade: false
    });
    var data = {
        "jsonrpc": "2.0",
        "method": "SetLteSimManagement",
        "params": {},
        "id": "9.1"
    }
    data = JSON.stringify(data);
    $.ajax({
        type: "post",
        url: req + "/action/action",
        data: data,
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function(res) {
            layer.close(loading);
            if (res.result) {
                var json = res.result;
                rendSIMManagement(json)
            }
        },
        error: function(jqXHR) {
            alert("An error occurred：" + jqXHR.status);
        }
    });
}