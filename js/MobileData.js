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
        $(this).attr('data-tab', 'tab' + i);
        // if (i == 0) { //Data usage公用视图，$allTabs隐藏了一个，data-tab="tab1"要去掉
        //     $(this).attr('data-tab', 'tab' + i);
        // } else {
        //     $(this).attr('data-tab', 'tab' + (i + 1)); //data-tab="tab1"去掉
        // }

    });

    $tabMenu.on('click', function() {

        var dataTab = $(this).data('tab');


        var $getWrapper = $(this).closest($wrapper);
        //$getWrapper.find($tabMenu).removeClass('active');
        $(this).siblings().removeClass('active');
        $(this).addClass('active');

        //$getWrapper.find('.line').width(0);
        $(this).siblings().find('.line').width(0);
        $(this).find($line).animate({
            'width': '90%'
        }, 'fast');
        if (dataTab == "tab0") {
            $getWrapper.find($allTabs).filter('[data-tab=tab1]').hide();
            $getWrapper.find($allTabs).filter('[data-tab=tab0]').show();
            renderDataUsage(MobileData, 0); //渲染Data usage SIM1数据           
        } else if (dataTab == "tab1") {
            $getWrapper.find($allTabs).filter('[data-tab=tab0]').hide();
            $getWrapper.find($allTabs).filter('[data-tab=tab1]').show();
            renderDataUsage(MobileData, 1); //渲染Data usage SIM2数据
        }
        if (dataTab == "tab3") {
            $getWrapper.find($allTabs).filter('[data-tab=tab2]').hide();
            $getWrapper.find($allTabs).filter('[data-tab=tab3]').show();
        } else if (dataTab == "tab2") {
            $getWrapper.find($allTabs).filter('[data-tab=tab3]').hide();
            $getWrapper.find($allTabs).filter('[data-tab=tab2]').show();
        }
        if (dataTab == "tab4") {
            $getWrapper.find($allTabs).filter('[data-tab=tab5]').hide();
            $getWrapper.find($allTabs).filter('[data-tab=tab4]').show();
        } else if (dataTab == "tab5") {
            $getWrapper.find($allTabs).filter('[data-tab=tab4]').hide();
            $getWrapper.find($allTabs).filter('[data-tab=tab5]').show();
        }
        // $getWrapper.find($allTabs).hide();
        // $getWrapper.find($allTabs).filter('[data-tab=' + dataTab + ']').show();
    });


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
            closeBtn: 0,
            //shadeClose: true,
            shade: 0.8,
            area: ['500px', '410px'],
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

        form.on('checkbox(dataLimit)', function(data) {
            var checked = data.elem.checked;
            if (checked) {
                $("#dataLimit input").removeAttr("disabled");
                $("#switchMB").removeAttr("disabled");
                $("#limit_time").removeAttr("disabled");
                $("#last_manth_s").removeAttr("disabled");
                $("#usagereminders input").removeAttr("disabled");

            } else {
                $("#dataLimit input").attr("disabled", true);
                $("#switchMB").attr("disabled", true);
                $("#limit_time").attr("disabled", true);
                $("#last_manth_s").attr("disabled", true);
                $("#usagereminders input").attr("disabled", true);
            }
            form.render();
            //getDatausageVal();
        });
        $("#dataLimit").change(function() {
            //getDatausageVal();
        });
        $("#switchMB").change(function() {
            //getDatausageVal();
        });
        $("#last_manth_s").change(function() {
            //getDatausageVal();
        });
        form.on('checkbox(limitInfo)', function(data) {
            //getDatausageVal();
        });

        form.on('checkbox(dataLimit2)', function(data) {
            var checked = data.elem.checked;
            if (checked) {
                $("#dataLimit2 input").removeAttr("disabled");
                $("#switchMB2").removeAttr("disabled");
                $("#limit_time2").removeAttr("disabled");
                $("#last_manth_s2").removeAttr("disabled");

            } else {
                $("#dataLimit2 input").attr("disabled", true);
                $("#switchMB2").attr("disabled", true);
                $("#limit_time2").attr("disabled", true);
                $("#last_manth_s2").attr("disabled", true);
            }
            form.render();
            //getDatausageVal();
        });
        $("#dataLimit2").change(function() {
            //getDatausageVal();
        });
        $("#switchMB2").change(function() {
            //getDatausageVal();
        });
        $("#last_manth_s2").change(function() {
            //getDatausageVal();
        });
        form.on('checkbox(limitInfo2)', function(data) {
            //getDatausageVal();
        });




        form.on('radio(activeSIM)', function(data) {
            //getSimManagementVal();
        });
        form.on('checkbox(SIMswitch)', function(data) {
            //getSimManagementVal();
        });
        form.on('checkbox(Weak_signal_1)', function(data) {
            //getSimManagementVal();
        });
        form.on('checkbox(Weak_signal_2)', function(data) {
            //getSimManagementVal();
        });
        form.on('checkbox(rule_dlimit_1)', function(data) {
            //getSimManagementVal();
        });
        form.on('checkbox(rule_dlimit_2)', function(data) {
            //getSimManagementVal();
        });
        form.on('checkbox(rule_roamming_1)', function(data) {
            //getSimManagementVal();
        });
        form.on('checkbox(rule_roamming_2)', function(data) {
            //getSimManagementVal();
        });
        form.on('checkbox(rule_noservice_1)', function(data) {
            //getSimManagementVal();
        });
        form.on('checkbox(rule_noservice_2)', function(data) {
            //getSimManagementVal();
        });

        $("#arrow1").click(function() {
            var content = document.getElementById("content");
            if (content.style.display == "none") {
                content.style.display = "block ";
                $('#arrow1 span .up').attr("src", images1[1]);
                var loading = layer.load(0, {
                    shade: false
                });
                getDatausageFirst(layer, form, loading);
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
                var loading = layer.load(0, {
                    shade: false
                });
                getSimManagement(layer, form, loading);
            } else {
                content1.style.display = "none ";
                $('#arrow2 span .up').attr("src", images1[0]);
            }
        });

        $("#btn_saved1").click(function() {
            getDatausageVal();
        })
        $("#btn_saved2").click(function() {
            getSimManagementVal();
        })

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
        url: "/action/action",
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
            var tip = '<div style="padding: 20px;text-align: center;word-wrap:break-word;">' + JSON.stringify(jqXHR) + '</div>';
            promptMessage("Error message", tip);

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
        url: "/action/action",
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
            layer.close(loading);
            var tip = '<div style="padding: 20px;text-align: center;word-wrap:break-word;">' + JSON.stringify(jqXHR) + '</div>';
            promptMessage("Error message", tip);
        }
    });
}
var MobileData;

function getDatausageFirst(layer, form, loading) {
    var data = {
        "jsonrpc": "2.0",
        "method": "GetLteDataUsage",
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
                MobileData = json.data_usages;
                //MobileData[0].start_date = "";
                renderDataUsage(MobileData, 0);
                setTimeout(() => {
                    renderDataUsage(MobileData, 1);
                }, 1000);
            }
        },
        error: function(jqXHR) {
            layer.close(loading);
            var tip = '<div style="padding: 20px;text-align: center;word-wrap:break-word;">' + JSON.stringify(jqXHR) + '</div>';
            promptMessage("Error message", tip);
        }
    });
}

function getDatausage(layer, form, loading) {
    var data = {
        "jsonrpc": "2.0",
        "method": "GetLteDataUsage",
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
                MobileData = json.data_usages;
                var dataTab = $('.tab-wrapper .Data-usage-simmenu li.active').data('tab');
                console.log("dataTab11", dataTab)
                if (dataTab == "tab0") {
                    renderDataUsage(MobileData, 0); //默认渲染Data usage SIM1
                } else {
                    renderDataUsage(MobileData, 1);
                }

            }
        },
        error: function(jqXHR) {
            layer.close(loading);
            var tip = '<div style="padding: 20px;text-align: center;word-wrap:break-word;">' + JSON.stringify(jqXHR) + '</div>';
            promptMessage("Error message", tip);
        }
    });
}
//渲染Data usage
function renderDataUsage(json, i) {
    if (i == 0) {
        $("#sim_data_limt_unit").val(json[i].sim_data_limt_unit);
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
            console.log($("#usagereminders input"))
            $("#usagereminders input").removeAttr("checked");
        }

        if (json[i].sim_data_limt_unit == 0) {
            $(".limit_unit").text("MB");
            $("#allUsed_MB").text(json[i].current_data_used);
            var redmianMB = (json[i].monthly_data_limit - json[i].current_data_used).toFixed(2);
            $("#redmian_MB").text(redmianMB);
            $("#dataLimit input").val(json[i].monthly_data_limit);
        } else {
            $(".limit_unit").text("GB");
            var current_used = (json[i].current_data_used / 1024).toFixed(2)
            $("#allUsed_MB").text(current_used);
            var redmianMB = ((json[i].monthly_data_limit - json[i].current_data_used) / 1024).toFixed(2);
            $("#redmian_MB").text(redmianMB);
            $("#dataLimit input").val((json[i].monthly_data_limit / 1024).toFixed(2));
        }

        $("#switchMB option[value='" + json[i].sim_data_limt_unit + "']").prop("selected", true);

        var nextDate = getNextDate(json[i].start_date);
        var nowdate = getNowFormatDate();
        var dayLeft = DateDiff(nowdate, nextDate);
        $("#day_left1").text(dayLeft);
        $("#limit_startTime1").text(nextDate);
        $("#reset_time1").text(json[i].start_date);
        if (json[i].start_date) { //Start data limit on
            layui.use(['laydate'], function() {
                laydate = layui.laydate;
                laydate.render({
                    elem: '#limit_time',
                    lang: 'en',
                    value: json[i].start_date,
                    isInitValue: true,
                    trigger: 'click',
                    done: function(value, date) {
                        console.log(value)
                        $("#limit_time").val(value);
                        //getDatausageVal();
                    }
                });
            });
        } else {
            layui.use(['laydate'], function() {
                laydate = layui.laydate;
                laydate.render({
                    elem: '#limit_time',
                    lang: 'en',
                    trigger: 'click',
                    done: function(value, date) {
                        console.log(value)
                        $("#limit_time").val(value);
                        //getDatausageVal();
                    }
                });
            });
        }

        if (json[i].last_month) {
            $("#last_manth_s option[value='" + Number(json[i].last_month) + "']").prop("selected", true);
        }
    } else {
        $("#sim_data_limt_unit2").val(json[i].sim_data_limt_unit);
        if (json[i] && json[i].monthly_data_limit_flag == 1) { //Set monthly data limit:
            $("#monthlydatalimit2 input").attr("checked", "checked");
            $("#dataLimit2 input").removeAttr("disabled");
            $("#switchMB2").removeAttr("disabled");
            $("#limit_time2").removeAttr("disabled");
            $("#last_manth_s2").removeAttr("disabled");
        } else {
            $("#monthlydatalimit2 input").removeAttr("checked");
            $("#dataLimit2 input").attr("disabled", true);
            $("#switchMB2").attr("disabled", true);
            $("#limit_time2").attr("disabled", true);
            $("#last_manth_s2").attr("disabled", true);
        }

        if (json[i].usage_reminder_flag == 1) { //Usage reminders
            $("#usagereminders2 input").attr("checked", "checked");
        } else {
            $("#usagereminders2 input").removeAttr("checked");
        }
        if (json[i].sim_data_limt_unit == 0) {
            $(".limit_unit2").text("MB");
            $("#allUsed_MB2").text(json[i].current_data_used);
            var redmianMB = (json[i].monthly_data_limit - json[i].current_data_used).toFixed(2);
            $("#redmian_MB2").text(redmianMB);
            $("#dataLimit2 input").val(json[i].monthly_data_limit);
        } else {
            $(".limit_unit2").text("GB");
            var current_used = (json[i].current_data_used / 1024).toFixed(2)
            $("#allUsed_MB2").text(current_used);
            var redmianMB = ((json[i].monthly_data_limit - json[i].current_data_used) / 1024).toFixed(2);
            $("#redmian_MB2").text(redmianMB);
            $("#dataLimit2 input").val((json[i].monthly_data_limit / 1024).toFixed(2));
        }

        $("#switchMB2 option[value='" + json[i].sim_data_limt_unit + "']").prop("selected", true);

        var nextDate = getNextDate(json[i].start_date);
        var nowdate = getNowFormatDate();
        var dayLeft = DateDiff(nowdate, nextDate);
        $("#day_left2").text(dayLeft);
        $("#limit_startTime2").text(nextDate);
        $("#reset_time2").text(json[i].start_date);
        if (json[i].start_date) { //Start data limit on
            layui.use(['laydate'], function() {
                laydate = layui.laydate;
                laydate.render({
                    elem: '#limit_time2',
                    lang: 'en',
                    value: json[i].start_date,
                    isInitValue: true,
                    trigger: 'click',
                    done: function(value, date) {
                        $("#limit_time2").val(value);
                        //getDatausageVal();
                    }
                });
            });
        } else {
            layui.use(['laydate'], function() {
                laydate = layui.laydate;
                laydate.render({
                    elem: '#limit_time2',
                    lang: 'en',
                    trigger: 'click',
                    done: function(value, date) {
                        $("#limit_time2").val(value);
                        //getDatausageVal();
                    }
                });
            });
        }

        if (json[i].last_month) {
            $("#last_manth_s2 option[value='" + Number(json[i].last_month) + "']").prop("selected", true);
        }

    }

    var unit = json[i].sim_data_limt_unit == 0 ? "MB" : "GB"
    if (i == 0) {
        var Xdate = [];
        var Ydata;
        if (json[i].sim_data_limt_unit == 0) {
            Ydata = json[i].days;
        } else {
            Ydata = (json[i].days / 1024).toFixed(2);
        }
        if (Ydata.length > 0) {
            for (var i = 0; i < Ydata.length; i++) {
                Xdate.push(i);
            }
        }
        renderEchart("used_MB", Xdate, Ydata, unit)
    } else {
        var Xdate1 = [];
        var Ydata1;
        if (json[i].sim_data_limt_unit == 0) {
            Ydata1 = json[i].days;
        } else {
            Ydata1 = (json[i].days / 1024).toFixed(2);
        }
        if (Ydata1.length > 0) {
            for (var i = 0; i < Ydata1.length; i++) {
                Xdate1.push(i);
            }
        }
        renderEchart("used_MB2", Xdate1, Ydata1, unit)
    }
    layui.use(['form'], function() {
        var form = layui.form;
        form.render();
        $("#monthlydatalimit").show();
        $("#usagereminders").show();

    });
}

//计算天数差的函数(2016-09-09)，通用 
function DateDiff(begintime, endtime) { //sDate1和sDate2是2006-12-18格式 
    var begintime_ms = Date.parse(new Date(begintime.replace(/-/g, "/"))); //begintime 为开始时间   
    var endtime_ms = Date.parse(new Date(endtime.replace(/-/g, "/"))); // endtime 为结束时间 
    var ms = endtime_ms - begintime_ms;
    var days = Math.floor(ms / (24 * 3600 * 1000))
    return days;
}
//获取当前日期
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
}
//获取下月1号
function getNextDate(date) {
    var arr = date.split('-');
    var day = arr[2]; //获取当前日期的日
    var date = new Date();
    var year = date.getFullYear()
    var month = date.getMonth() + 2;
    if (month == 13) {
        year = parseInt(year) + 1;
        month = 1;
    }
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    return (year + "-" + month + "-" + day)
}
//根据指定日期获取下个月的这个日期
function getNextMonth(date) {
    var arr = date.split('-');
    var year = arr[0]; //获取当前日期的年份
    var month = arr[1]; //获取当前日期的月份
    var day = arr[2]; //获取当前日期的日
    var days = new Date(year, month, 0);
    days = days.getDate(); //获取当前日期中的月的天数
    var year2 = year;
    var month2 = parseInt(month) + 1;
    if (month2 == 13) {
        year2 = parseInt(year2) + 1;
        month2 = 1;
    }
    var day2 = day;
    var days2 = new Date(year2, month2, 0);
    days2 = days2.getDate();
    if (day2 > days2) {
        day2 = days2;
    }
    if (month2 < 10) {
        month2 = '0' + month2;
    }

    var t2 = year2 + '-' + month2 + '-' + day2;
    return t2;
}

function getSimManagement(layer, form, loading) {

    var data = {
        "jsonrpc": "2.0",
        "method": "GetLteSimManagement",
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
                rendSIMManagement(json)
            }
        },
        error: function(jqXHR) {
            layer.close(loading);
            var tip = '<div style="padding: 20px;text-align: center;word-wrap:break-word;">' + JSON.stringify(jqXHR) + '</div>';
            promptMessage("Error message", tip);
        }
    });
}
//渲染SIM management
function rendSIMManagement(json) {

    $('input[name="activeSIM"]').removeAttr("checked");
    $('input[name="activeSIM"]').eq(json.active_sim).attr("checked", "checked");

    if (json.auo_switch == 1) { //Auto SIM switching:
        $("#AutoSim input").attr("checked", "checked");
    } else {
        $("#AutoSim input").removeAttr("checked");
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

    if (json.sim[0].sim_status) {
        var status = json.sim[0].sim_status;
        switch (status) {
            case 0:
                status = "SIM Unknown";
                break;
            case 1:
                status = "SIM Not Insert";
                break;
            case 2:
                status = "SIM Ready";
                break;
            case 3:
                status = "SIM PIN Lock";
                break;
            case 4:
                status = "SIM PUK Lock";
                break;
            default:
                break;
        }
        $("#SIM_status1").text(status);
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
    if (json.sim[1].sim_status) {
        var status = json.sim[1].sim_status;
        switch (status) {
            case 0:
                status = "SIM Unknown";
                break;
            case 1:
                status = "SIM Not Insert";
                break;
            case 2:
                status = "SIM Ready";
                break;
            case 3:
                status = "SIM PIN Lock";
                break;
            case 4:
                status = "SIM PUK Lock";
                break;
            default:
                break;
        }
        $("#SIM_status2").text(status);
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
function renderEchart(id, Xdate, Ydata, unit) {
    console.log(unit)
    var myChartGL = echarts.init(document.getElementById(id));
    myChartGL.clear();
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
                var html = "day:" + (Number(params[0].axisValue) + 1) + "<br />\r\n";
                for (var i = 0; i < params.length; i++) {
                    var dataObj = params[i];
                    html += dataObj.value + " " + unit + "<br />\r\n";
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
//设置前获取SimManagement各项的值
function getSimManagementVal() {
    var SIM = $("input[name='activeSIM']:checked").val();
    var autoSwitch = $("#AutoSim input").is(":checked") == true ? 1 : 0;
    var Weak_signal_1 = $("#Weak_signal_1").is(":checked") == true ? 1 : 0;
    var rule_dlimit_1 = $("#rule_dlimit_1").is(":checked") == true ? 1 : 0;
    var rule_roamming_1 = $("#rule_roamming_1").is(":checked") == true ? 1 : 0;
    var rule_noservice_1 = $("#rule_noservice_1").is(":checked") == true ? 1 : 0;
    var Weak_signal_2 = $("#Weak_signal_2").is(":checked") == true ? 1 : 0;
    var rule_dlimit_2 = $("#rule_dlimit_2").is(":checked") == true ? 1 : 0;
    var rule_roamming_2 = $("#rule_roamming_2").is(":checked") == true ? 1 : 0;
    var rule_noservice_2 = $("#rule_noservice_2").is(":checked") == true ? 1 : 0;
    var params = {
        "active_sim": Number(SIM),
        "auto_switch": autoSwitch,
        "sim": [{
                "sim_id": 0,
                "rule_weak_signal": Weak_signal_1,
                "rule_dlimit": rule_dlimit_1,
                "rule_roamming": rule_roamming_1,
                "rule_noservice": rule_noservice_1,
            },
            {
                "sim_id": 1,
                "rule_weak_signal": Weak_signal_2,
                "rule_dlimit": rule_dlimit_2,
                "rule_roamming": rule_roamming_2,
                "rule_noservice": rule_noservice_2,
            }
        ]
    }
    console.log(params)
    setSimManagement(layer, params)
}
//设置SIM management
function setSimManagement(layer, params) {
    var loading = layer.load(0, {
        shade: false
    });
    var data = {
        "jsonrpc": "2.0",
        "method": "SetLteSimManagement",
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
                    getSimManagement(layer, form, loading)
                })
            }
        },
        error: function(jqXHR) {
            layer.close(loading);
            var tip = '<div style="padding: 20px;text-align: center;word-wrap:break-word;">' + JSON.stringify(jqXHR) + '</div>';
            promptMessage("Error message", tip);
        }
    });
}
//设置前获取Datausage各项的值
function getDatausageVal() {
    var switchMB = $("#switchMB").val();
    var data_limit_flag = $("#monthlydatalimit input").is(":checked") == true ? 1 : 0;
    var dataLimit = $("#dataLimit input").val();
    if (switchMB == 1) {
        dataLimit = dataLimit * 1024;
    }
    var limit_time = $("#limit_time").val();
    console.log(limit_time)
    var last_manth_s = $("#last_manth_s").val();
    var usagereminders = $("#usagereminders input").is(":checked") == true ? 1 : 0;

    var switchMB2 = $("#switchMB2").val();
    var data_limit_flag2 = $("#monthlydatalimit2 input").is(":checked") == true ? 1 : 0;
    var dataLimit2 = $("#dataLimit2 input").val();
    if (switchMB2 == 1) {
        dataLimit2 = dataLimit2 * 1024;
    }
    var limit_time2 = $("#limit_time2").val();
    console.log(limit_time2);
    var last_manth_s2 = $("#last_manth_s2").val();
    var usagereminders2 = $("#usagereminders2 input").is(":checked") == true ? 1 : 0;

    var params = {
        "data_usages": [{
                "sim_id": 0,
                "monthly_data_limit_flag": Number(data_limit_flag),
                "monthly_data_limit": Number(dataLimit),
                "sim_data_limt_unit": Number(switchMB),
                "start_date": limit_time,
                "last_month": Number(last_manth_s),
                "usage_reminder_flag": Number(usagereminders)
            },
            {
                "sim_id": 1,
                "monthly_data_limit_flag": Number(data_limit_flag2),
                "monthly_data_limit": Number(dataLimit2),
                "sim_data_limt_unit": Number(switchMB2),
                "start_date": limit_time2,
                "last_month": Number(last_manth_s2),
                "usage_reminder_flag": Number(usagereminders2)
            }
        ]
    }
    console.log(params)
    setDatausage(layer, params)
}
//设置Datausage
function setDatausage(layer, params) {
    var loading = layer.load(0, {
        shade: false
    });
    var data = {
        "jsonrpc": "2.0",
        "method": "SetLteDataUsage",
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
                    getDatausage(layer, form, loading);
                })
            }
        },
        error: function(jqXHR) {
            layer.close(loading);
            var tip = '<div style="padding: 20px;text-align: center;word-wrap:break-word;">' + JSON.stringify(jqXHR) + '</div>';
            promptMessage("Error message", tip);
        }
    });
}