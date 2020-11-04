$(function() {
    var data = {
        "jsonrpc": "2.0",
        "method": "GetWlanSettings",
        "params": {},
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
            var json = res.result.wifi_config;
            //console.log(json[0].vap_config[0].WpaKey);
            var str = "";
            var str0 = "";

            for (var index in json) {
                $('.ssid').val(json[index].vap_config[index].Ssid);
                $('.pwd').val(json[index].vap_config[index].WpaKey);
                $('.pwd1').val(json[index].vap_config[index].WepKey);
                // str0 += '<div class="layui-form layui-form-pane layui-form-item"><div class="col-md-3 Wireless Allow-devices-to-connect-to-SmartHub-access-point mt-20">Allow devices to connect to SmartHub access point:</div><div class="col-md-9 current" style="margin-top: 22px"><input type="checkbox" checked="" value="" name="open" lay-skin="switch" lay-filter="switchTest" lay-text="ON|OFF"><div class="layui-unselect layui-form-switch layui-form-onswitch" lay-skin="_switch"><em>ON</em><i></i></div></div></div>';

                // str += "<form>"
                // str += '<ul style="display:none;">';
                // str += '<table class="table table-hover table-responsive">';
                // str += '<tr><th colspan="2" class="Access-point-connection-settings mt-20">Access point connection settings</th></tr>';
                // str += '<tr><th colspan="2" class="Use-these-details-when-connecting-a-device-to-the-SmartHubs-access-point">Use these details when connecting a device to the SmartHub\'s access point</th></tr>';
                // str += '<tr><td class="col-sm-3 czjz Access-point-name mt-20">Access point name:</td><td class="col-sm-9"><input type="text" class="form-control ssid My-access-point" value="' + json[index].vap_config[index].Ssid + '" style="width:80%"></td></tr>';
                // str += '<tr id="pwd"> <td class="col-sm-3 czjz Access-point-name">Password:</td><td class="col-sm-9"><input type="password" id="pw" class="form-control pwd  My-access-point" value="' + json[index].vap_config[index].WpaKey + '" style="width:80%"><span id="eye"  onclick="change()" style="margin-left:10px;">SHOW</span><div><span></span></div></td></tr>';
                // str += '<tr id="pwd1"><td class="col-sm-3 czjz Access-point-name">Password:</td><td class="col-sm-9"><input type="password" id="pw1" class="form-control pwd1 My-access-point" value="' + json[index].vap_config[index].WepKey + '" style="width:80%"><span id="eye1" onclick="change()" style="margin-left:10px;">SHOW</span><div><span></span></div></td></tr>';
                // str += '<tr><td class="czjz Access-point-name">Preferred Wi-Fi channel:</td><td><select name="type" class="form-control select_00 channel My-access-point" style="width:80%"></select></td></tr>';
                // str += '<tr><td class="czjz Access-point-name">Encryption type:</td><td><select name="type" id="EncryptionType" class="form-control select_02 EncryptionType My-access-point"  style="width:80%"></select></td></tr>';
                // str += '<tr style="display:none;"><td class="czjz Access-point-name">country Code:</td><td><select name="type" class="form-control select_03 countryCode My-access-point" style="width:80%"></select></td></tr>';
                // str += ' <tr><td></td><td><div id="btnGroup" class="form-group form-line btn-group edit"><button type="button" id="edit" style="cursor:pointer; -webkit-tap-highlight-color: transparent;" class="Rectangle-1182 active OK">Edit</button><button type="button" id="btn1" class="Rectangle-1182 active OK" style="margin-left:10px;cursor: pointer;" onclick="save()">Save</button></div></td></tr>';
                // str += '</table>';
                // str += '</ul>';
                // str += '</form>';

            }
            // $("#tab").html(str0);
            // $("#content").html(str);




            for (var i = 0; i < json.length; i++) {
                //channel
                var optionChannel = document.createElement("option");
                $(optionChannel).val(json[index].channel).attr("selected", "selected");
                $(optionChannel).text(json[index].channel);
                var channelArr = ['0 auto', '1 (2.412 GHz)', '2 (2.417 GHz)', '3 (2.422 GHz)', '4 (2.427 GHz)', '5 (2.432 GHz)', '6 (2.437 GHz)', '7 (2.442 GHz)', '8 (2.447 GHz)', '9 (2.452 GHz)', '10 (2.457 GHz)', '11 (2.462 GHz)']
                for (var i = 0; i < channelArr.length; i++) {
                    var channel = "<option value=" + i + ">" + channelArr[i] + "</option>";
                    //$channel = $(channel).get(0).value;
                    //$channelText = $(channel).get(0).text;
                    $('.channel').append(channel);
                }
                var channelSelected = "<option value=" + i + " selected='selected' >" + json[index].channel + " </option>"
                $('.channel').prepend(channelSelected);

                var oldVal = "";

                $('.channel').change(function() {
                    if ($(this).find("option:selected")) {
                        var _thisVal = $(this).find('option:selected').val();
                        oldVal = $(this).attr("old", _thisVal);
                        //$('.channel').find("option[value=" + _thisVal + "]").not("option[value=0]").hide();
                        $('.channel').find("option[value=" + _thisVal + "]").show();
                        $('.channel option[value=12]').hide();
                        $('.channel option[value=0]').show();

                    }
                })
                if (json[index].channel == 11) {
                    $('.channel option:selected').text(channelArr[11]);
                    $('.channel option:selected').hide();
                    $('.channel option[value=11]').attr("selected", "selected");
                }
                if (json[index].channel == 10) {
                    $('.channel option:selected').text(channelArr[10]);
                    $('.channel option:selected').hide();
                    $('.channel option[value=10]').attr("selected", "selected");
                }
                if (json[index].channel == 9) {
                    $('.channel option:selected').text(channelArr[9]);
                    $('.channel option:selected').hide();
                    $('.channel option[value=9]').attr("selected", "selected");
                }
                if (json[index].channel == 8) {
                    $('.channel option:selected').text(channelArr[8]);
                    $('.channel option:selected').hide();
                    $('.channel option[value=8]').attr("selected", "selected");
                }
                if (json[index].channel == 7) {
                    $('.channel option:selected').text(channelArr[7]);
                    $('.channel option:selected').hide();
                    $('.channel option[value=7]').attr("selected", "selected");
                }
                if (json[index].channel == 6) {
                    $('.channel option:selected').text(channelArr[6]);
                    $('.channel option:selected').hide();
                    $('.channel option[value=6]').attr("selected", "selected");
                }
                if (json[index].channel == 5) {
                    $('.channel option:selected').text(channelArr[5]);
                    $('.channel option:selected').hide();
                    $('.channel option[value=5]').attr("selected", "selected");
                }
                if (json[index].channel == 4) {
                    $('.channel option:selected').text(channelArr[4]);
                    $('.channel option:selected').hide();
                    $('.channel option[value=4]').attr("selected", "selected");
                }
                if (json[index].channel == 3) {
                    $('.channel option:selected').text(channelArr[3]);
                    $('.channel option:selected').hide();
                    $('.channel option[value=3]').attr("selected", "selected");
                }
                if (json[index].channel == 2) {
                    $('.channel option:selected').text(channelArr[2]);
                    $('.channel option:selected').hide();
                    $('.channel option[value=2]').attr("selected", "selected");
                }
                if (json[index].channel == 1) {
                    $('.channel option:selected').text(channelArr[1]);
                    $('.channel option:selected').hide();
                    $('.channel option[value=1]').attr("selected", "selected");
                }
                if (json[index].channel == 0) {
                    $('.channel option:selected').text(channelArr[0]);
                    $('.channel option:selected').hide();
                    $('.channel option[value=0]').attr("selected", "selected");
                }
                if (!json[index].channel) {
                    $('.channel option:selected').text(channelArr[0]);
                    $('.channel option[value=0]').hide();
                }


                //hwmode
                var optionHWMode = document.createElement("option");
                $(optionHWMode).val(json[index].hwmode).attr("selected", "selected");
                $(optionHWMode).text(json[index].hwmode);
                var hwmodeArr = ['0 auto', '1 (802.11b)', '2 (802.11g)', '3 (802.11g+n)'];
                for (var i = 0; i < hwmodeArr.length; i++) {
                    var hwmode = "<option value=" + i + ">" + hwmodeArr[i] + "</option>";
                    $('.hwmode').append(hwmode);
                }
                var hwmodeSelected = "<option value=" + i + " selected='selected'>" + json[index].hwmode + " </option>"
                $('.hwmode').append(hwmodeSelected);

                $('.hwmode').change(function() {
                    if ($(this).find("option:selected")) {
                        var _thisVal = $(this).find('option:selected').val();
                        oldVal = $(this).attr("old", _thisVal);
                        $('.hwmode').find("option[value=" + _thisVal + "]").show()
                        $('.hwmode option:last').hide();
                        $('.hwmode option[value=0]').show();
                    }
                })

                if (json[index].hwmode == 3) {
                    $('.hwmode option:selected').text(hwmodeArr[3]);
                    $('.hwmode option:selected').hide();
                    $('.hwmode option[value=3]').attr("selected", "selected");
                }

                if (json[index].hwmode == 2) {
                    $('.hwmode option:selected').text(hwmodeArr[2]);
                    $('.hwmode option:selected').hide();
                    $('.hwmode option[value=2]').attr("selected", "selected");
                }

                if (json[index].hwmode == 1) {
                    $('.hwmode option:selected').text(hwmodeArr[1]);
                    $('.hwmode option:selected').hide();
                    $('.hwmode option[value=1]').attr("selected", "selected");
                }

                if (json[index].hwmode == 0) {
                    $('.hwmode option:selected').text(hwmodeArr[0]);
                    $('.hwmode option:selected').hide();
                    $('.hwmode option[value=0]').attr("selected", "selected");
                }

                if (!json[index].hwmode) {
                    $('.hwmode option:selected').text(hwmodeArr[0]);
                    $('.hwmode option[value=0]').hide();
                }

                //EncryptionType
                var optionEncryptionType = document.createElement("option");
                $(optionEncryptionType).val(json[index].vap_config[index].SecurityMode).attr("selected", "selected");
                $(optionEncryptionType).text(json[index].vap_config[index].SecurityMode);
                var encryptionTypeArr = ['No Encryption', 'WEP', 'WPA-PSA', 'WPA2-PSA', 'psk-mixed'];
                for (var i = 0; i < encryptionTypeArr.length; i++) {
                    var EncryptionType = "<option value=" + i + ">" + encryptionTypeArr[i] + "</option>";
                    $('.EncryptionType').append(EncryptionType);

                }
                var encryptionTypeSelected = "<option value=" + i + " selected='selected'>" + json[index].vap_config[index].SecurityMode + " </option>"
                $('.EncryptionType').append(encryptionTypeSelected);

                if (json[index].vap_config[index].SecurityMode == 4) {
                    $('.EncryptionType option:selected').text(encryptionTypeArr[4]);
                    $('.EncryptionType option:selected').hide();
                    $('.EncryptionType option[value=4]').attr("selected", "selected");
                }
                if (json[index].vap_config[index].SecurityMode == 3) {
                    $('.EncryptionType option:selected').text(encryptionTypeArr[3]);
                    $('.EncryptionType option:selected').hide();
                    $('.EncryptionType option[value=3]').attr("selected", "selected");
                }
                if (json[index].vap_config[index].SecurityMode == 2) {
                    $('.EncryptionType option:selected').text(encryptionTypeArr[2]);
                    $('.EncryptionType option:selected').hide();
                    $('.EncryptionType option[value=2]').attr("selected", "selected");
                }
                if (json[index].vap_config[index].SecurityMode == 1) {
                    $('.EncryptionType option:selected').text(encryptionTypeArr[1]);
                    $('.EncryptionType option:selected').hide();
                    $('.EncryptionType option[value=1]').attr("selected", "selected");
                }
                if (json[index].vap_config[index].SecurityMode == 0) {
                    $('.EncryptionType option:selected').text(encryptionTypeArr[0]);
                    $('.EncryptionType option:selected').hide();
                    $('.EncryptionType option[value=0]').attr("selected", "selected");
                }
                if (!json[index].vap_config[index].SecurityMode) {
                    $('.EncryptionType option:selected').text(encryptionTypeArr[5]);
                    $('.EncryptionType option[value=5]').hide();
                }
                // $('.EncryptionType').change(function() {
                //     if ($(this).find("option:selected")) {
                //         var _thisVal = $(this).find('option:selected').val();
                //         oldVal = $(this).attr("old", _thisVal);
                //         $('.EncryptionType').find("option[value=" + _thisVal + "]").show();
                //         $('.EncryptionType option[value=5]').hide();
                //         $('.EncryptionType option[value=0]').show();

                //     }
                // })

                // countryCode
                var optionCountryCode = document.createElement("option");
                $(optionCountryCode).val(json[index].CountryCode).attr("selected", "selected");
                $(optionCountryCode).text(json[index].CountryCode);
                var countryCodeArr = [
                    "00 - World", "AE - United Arab Emirates", "AL - Albania", "AM - Armenia", "AR - Argentina", "AT - Austria", "AU - Australia", "AZ - Azerbaijan", "BE - Belgium", "BG - Bulgaria", "BH - Bahrain", "BN - Brunei Darussalam", "BO - Bolivia", "BR - Brazil", "BY - Belarus", "BZ - Belize", "CA - Canada", "CH - Switzerland ", "CL - Chile", "CN - China", "CO - Colombia", "CR - Costa Rica", "CY - Cyprus", "CZ - Czech Republic", "DE - Germany", "DK - Denmark", "DO - Dominican Republic", "DZ - Algeria", "EC - Ecuador", "EE - Estonia", "EG - Egypt", "ES - Spain", "FI - Finland", "FO - Faroe Islands", "FR - France", "GB - United Kingdom", "GE - Georgia", "GR - Greece", "GT - Guatemala", "HK - Hong Kong", "HN - Honduras", "HR - Croatia", "HU - Hungary ", "ID - Indonesia", "IE - Ireland", "IL - Israel", "IN - India", "IQ - Iraq", "IR - Iran", "IS - Iceland", "IT - Italy", "JM - Jamaica", "JO - Jordan", "JP - Japan", "KE - Kenya", "KP - North Korea", "KR - South Korea", "KW - Kuwait", "KZ - Kazakhstan", "LB - Lebanon", "LI - Liechtenstein", "LT - Lithuania", "LU - Luxembourg", "LV - Latvia", "LY - Libyan Arab Jamahiriya", "MA - Morocco", "MC - Monaco", "MK - Macedonia", "MO - Macao", "MX - Mexico", "MY - Malaysia", "NI - Nicaragua", "NL - Netherlands", "NO - Norway", "NZ - New Zealand", "OM - Oman", "PA - Panama", "PE - Peru", "PH - Philippines", "PK - Pakistan", "PL - Poland", "PR - Puerto Rico", "PT - Portugal", "PY - Paraguay", "QA - Qatar", "RO - Romania", "RU - Russian Federation", "SA - Saudi Arabia", "SE - Sweden", "SG - Singapore", "SI - Slovenia", "SK - Slovakia", "SV - El Salvador", "SY - Syrian Arab Republic", "TH - Thailand", "TN - Tunisia", "TR - Turkey", "TT - Trinidad and Tobago", "TW - China Taiwan", "UA - Ukraine", "US - United States", "UY - Uruguay", "UZ - Uzbekistan", "VE - Venezuela", "VN - Viet Nam", "YE - Yemen", "ZA - South Africa", "ZW - Zimbabwe"
                ];

                for (var i = 0; i < countryCodeArr.length; i++) {
                    var countryCode = "<option value=" + countryCodeArr[i].slice(0, 2) + ">" + countryCodeArr[i] + "</option>"
                    $('.countryCode').append(countryCode);
                }
                var countryCodeSelected = "<option value=" + json[index].CountryCode + " selected='selected'>" + json[index].CountryCode + " </option>"
                $('.countryCode').append(countryCodeSelected);

                $('.countryCode option:last').hide();
                $('.countryCode').find("option[value=" + json[index].CountryCode + "]").attr("selected", "selected");

                $('.countryCode').change(function() {
                    if ($(this).find("option:selected")) {
                        var _thisVal = $(this).find('option:selected').val();
                        oldVal = $(this).attr("old", _thisVal);
                        $('.countryCode').find("option[value=" + _thisVal + "]").show();
                        $('.countryCode option[value=00]').show();
                        $('.countryCode option:last').hide();
                    }
                })

            }

            $("#content ul").eq(0).show();

            // $("#content select,#content input,#content button").prop("disabled", true);

            $(document).on("click", ".edit", function() {
                $("#content select,#content input,#content button").removeAttr("disabled");
            })

            if ($(".pwd1").val()) {
                $(".pwd1").val("")
            }
            if ($(".pwd").val()) {
                $(".pwd").val("")
            }
            // $('#cancel').click(function() {
            //     $('#pwd').hide();
            //     $('#pwd1').hide();
            // })

            //document.body.addEventListener('touchstart,touchend', function() {});
            //document.getElementById('edit').addEventListener('touchstart,touchend', function() {});
            $('#EncryptionType').change(function() {

                if (this.value == "4") {
                    $("#pwd1").hide();
                    $("#pwd").show();
                    $(".pwd1").val("");
                } else if (this.value == "3") {
                    $("#pwd1").hide();
                    $("#pwd").show();
                    $(".pwd1").val("");
                } else if (this.value == "2") {
                    $("#pwd1").hide();
                    $("#pwd").show();
                    $(".pwd1").val("");
                } else if (this.value == "1") {
                    $("#pwd1").show();
                    $("#pwd").hide();
                    $(".pwd").val("");
                } else if (this.value == "0") {
                    $("#pwd1").hide();
                    $("#pwd").hide();
                    $(".pwd").val("");
                    $(".pwd1").val("");
                } else {
                    $("#pwd").show();
                    $("#pwd1").hide();
                    $(".pwd1").val("");
                }

            })

            //console.log($('#EncryptionType option[value=1]').text() == "WEP");
            //console.log(json[index].vap_config[index].SecurityMode);
            if (json[index].vap_config[index].SecurityMode == "1") {
                $("#pwd").hide();
                $("#pwd1").show();
                $(".pwd1").val(json[index].vap_config[index].WepKey);
                $(".pwd").val("");
            }
            if (json[index].vap_config[index].SecurityMode == "2") {
                $("#pwd").show();
                $("#pwd1").hide();
                $('.pwd').val(json[index].vap_config[index].WpaKey)
                $(".pwd1").val("");
                //console.log($('#EncryptionType option[value=2]').text())
            }
            if (json[index].vap_config[index].SecurityMode == "3") {
                $("#pwd").show();
                $("#pwd1").hide();
                $('.pwd').val(json[index].vap_config[index].WpaKey)
                $(".pwd1").val("");
            }
            if (json[index].vap_config[index].SecurityMode == "4") {
                $("#pwd").show();
                $("#pwd1").hide();
                $('.pwd').val(json[index].vap_config[index].WpaKey)
                $(".pwd1").val("");
            }
            if (json[index].vap_config[index].SecurityMode == "0") {
                $("#pwd").hide();
                $("#pwd1").hide();

            }
            // if ($('#EncryptionType option[value=1]').text() == "WEP") {
            //     $("#pwd").hide();
            //     $("#pwd1").show();
            //     $(".pwd1").val(json[index].vap_config[index].SecurityMode);
            //     $(".pwd").val("");
            // }
            // if ($('#EncryptionType option[value=2]').text() == "WPA-PSA") {
            //     $("#pwd").show();
            //     $("#pwd1").hide();
            //     $(".pwd1").val("");
            //     //console.log($('#EncryptionType option[value=2]').text())
            // }
            // if ($('#EncryptionType option[value=3]').text() == "WPA2-PSA") {
            //     $("#pwd").show();
            //     $("#pwd1").hide();
            //     $(".pwd1").val("");
            // }
            // if ($('#EncryptionType option[value=4]').text() == "psk-mixed") {
            //     $("#pwd").show();
            //     $("#pwd1").hide();
            //     $(".pwd1").val("");
            // }
            // if ($('#EncryptionType option[value=0]').text() == "No Encryption") {
            //     $("#pwd").hide();
            //     $("#pwd1").hide();

            // }
            // $('#EncryptionType').change(function() {

            //     if (json[index].vap_config[index].SecurityMode == "4") {
            //         $("#pwd1").hide();
            //         $("#pwd").show();
            //         $(".pwd1").val("");
            //     } else if (json[index].vap_config[index].SecurityMode == "3") {
            //         $("#pwd1").hide();
            //         $("#pwd").show();
            //         $(".pwd1").val("");
            //     } else if (json[index].vap_config[index].SecurityMode == "2") {
            //         $("#pwd1").hide();
            //         $("#pwd").show();
            //         $(".pwd1").val("");
            //     } else if (json[index].vap_config[index].SecurityMode == "1") {
            //         $("#pwd1").show();
            //         $("#pwd").hide();
            //         $(".pwd").val("");
            //     } else if (json[index].vap_config[index].SecurityMode == "0") {
            //         $("#pwd1").hide();
            //         $("#pwd").hide();
            //         $(".pwd").val("");
            //         $(".pwd1").val("");
            //     } else {
            //         $("#pwd").show();
            //         $("#pwd1").hide();
            //         $(".pwd1").val("");
            //     }

            // })

            var isShow = true;

            change = function() {
                var v = $(".pwd").get(0);
                var v1 = $(".pwd1").get(0);
                if (isShow) {
                    v.type = "text";
                    v1.type = "text";
                    isShow = false;
                } else {
                    v.type = "password";
                    v1.type = "password";
                    isShow = true;
                }
            };
            change();



            $('.pwd, .pwd1').focus(function() {
                var pwd = $("#pwd").val();
                pwd = false;
                $(this).siblings()
                    .find('span')
                    .text('Please enter a password with more than 8 digits!')
                    .removeClass('state1 state4 state3').addClass('state2');
            }).blur(function() {
                var len = $(this).val().length;
                if (len >= 8 && len <= 20 && $(this).val() != '' && isNaN($(this).val()) == false) {
                    $(this).siblings()
                        .find('span')
                        .text('The password is correct!')
                        .removeClass('state1 state4 state3').addClass('state4');
                    pwd = true;
                } else {
                    $(this).siblings()
                        .find('span')
                        .text('Please enter a password with more than 8 digits!')
                        .removeClass('state1 state2 state4')
                        .addClass('state3');
                }
            })

        },
        error: function(jqXHR) {
            alert("An error occurred：" + jqXHR.status);

        }
    });

    layui.use(['form'], function() {
        var form = layui.form;
        form.on('switch(switchTest)', function(data) {
            var checked = data.elem.checked;
            var serverStatus = 1;

            var onoff = this.checked ? 1 : 0;
            //console.log(data.value);
            // console.log(data.elem); // 得到checkbox原始DOM对象
            // console.log(data.elem.checked); // 开关是否开启，true或者false
            // console.log(data.value); // 开关value值，也可以通过data.elem.value得到
            // console.log(data.othis); // 得到美化后的DOM对象

            if (this.checked == 1) {
                $("#content select,#content input,#content button,#btnGroup button").prop("disabled", false);
                //$("#content select,#content input,#content button,#btnGroup button").css("opacity", "0.5");
                $('.current input').eq(0).removeAttr("checked");
            } else {
                $("#content").removeAttr("disabled");
                $("#content select,#content input,#content button,#btnGroup button").prop("disabled", true);
                //$("#content select,#content input,#content button,#btnGroup button").css("opacity", "1");
            }
            $("#content").mouseenter(function() {
                //this.checked = 0;
                //form.render();
                $('#edit').removeAttr("disabled");
                if (this.checked == 0) {
                    $("#content select,#content input,#content button,#btnGroup button").prop("disabled", true);
                    console.log(data.elem.checked)
                        // var o = $(".layui-form-switch");
                        // o.find("em").text("OFF")
                        // o.prop("class", "layui-unselect layui-form-switch")
                        // o.removeClass("class", "layui-form-switch")
                } else if (this.checked == 1) {
                    $("#content select,#content input,#content button,#btnGroup button").prop("disabled", false);
                    data.elem.checked = !data.elem.checked;
                    // var o = $(".layui-form-switch");
                    // o.find("em").text("ON")
                    // o.prop("class", "layui-unselect layui-form-switch")
                }
                //$("#btnGroup button").css("opacity", "1");
                //$('#edit').prop("disabled", false);
                // $('#cancel').attr("disabled", false);
            })
            if (serverStatus) {
                data.elem.checked = checked;
            } else {
                data.elem.checked = !checked;
            }
            form.render();

            // $(document).delegate("click", ".edit", function() {
            //     $("#content select,#content input,#content button").removeAttr("disabled");
            // })
            var data = {
                "jsonrpc": "2.0",
                "method": "SetWlanSettings",
                "params": {
                    "wifi_config": [{
                        //"phy_enable": Number($('.current input[type="checkbox"]').val()), //对于开关，0是关，1是开
                        "phy_enable": onoff, //对于开关，0是关，1是开
                        // "hwmode": parseInt($(".hwmode option:selected").text()), //可变
                        "htmode": 3, //固定
                        "Channel": parseInt($(".channel option:selected").text()), //可变
                        "CountryCode": $(".countryCode option:selected").val(), //可变
                        "vap_config": [{
                            "Ssid": $(".ssid").val(), //可变
                            "SecurityMode": Number($(".EncryptionType option:selected").val()), //可变
                            "WepType": 0, //可变
                            "WpaType": 2, //可变
                            "WepKey": $(".pwd1").val(), //可变
                            "WpaKey": $(".pwd").val(), //可变

                        }]
                    }]
                },

                "id": "9.1",

            };
            data = JSON.stringify(data);
            console.log(data);

            $.ajax({
                type: "post",
                url: "/action/action",
                data: data,
                dataType: "json",
                contentType: "application/json;charset=utf-8",
                success: function(res) {

                    //var json = res.result.wifi_config;


                    // for (var index in json) {
                    //     console.log(json[index].phy_enable);
                    //     if (onoff == 1) {
                    //         //$("#content").show();
                    //     } else {
                    //         if (!onoff);
                    //     }

                    // }
                },
                error: function(jqXHR) {
                    alert("An error occurred：" + jqXHR.status);

                }
            });

        });
    });

});