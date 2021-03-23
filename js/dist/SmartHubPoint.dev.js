"use strict";

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
        success: function success(res) {
            var json = res.result.wifi_config;
            var str = "";
            var str0 = "";

            for (var index in json) {
                str0 += '<li class="current"><span">' + json[index].phy_name + '</span><span> :' + json[index].vap_config[index].Ssid + '</span><span class="layui-form layui-form-pane layui-form-item"><i><input type="checkbox" checked="" name="open" lay-skin="switch" lay-filter="switchTest" lay-text="ON|OFF"></i></span></li>';
                str += "<form>";
                str += '<ul style="display:none;">';
                str += '<table class="table table-hover table-responsive">';
                str += '<tr><th colspan="2">Access point connection settings</th></tr>';
                str += '<tr><th colspan="2">Use these details when connecting a device to the router\'s access point</th></tr>';
                str += '<tr><td class="col-sm-3 czjz">Access point name:</td><td class="col-sm-9"><input type="text" class="form-control ssid" value="' + json[index].vap_config[index].Ssid + '" style="width:70%"></td></tr>';
                str += '<tr><td class="czjz">Preferred Wi-Fi channel:</td><td><select name="type" class="form-control select_00 channel" style="width:70%"></select></td></tr>';
                str += '<tr><td class="czjz">Mode:</td><td><select name="type" class="form-control select_01 hwmode" style="width:70%"></select></td></tr>';
                str += '<tr><td class="czjz">Encryption type:</td><td><select name="type" id="EncryptionType" class="form-control select_02 EncryptionType" style="width:70%"></select></td></tr>';
                str += '<tr id="pwd"><td class="col-sm-3 czjz">Password:</td><td class="col-sm-9"><input type="password" class="form-control pwd" value="' + json[index].vap_config[index].WpaKey + '" style="width:70%"><span id="eye" onclick="change()" style="margin-left:10px;">SHOW</span><div><span></span></div></td></tr>';
                str += '<tr id="pwd1"><td class="col-sm-3 czjz">Password:</td><td class="col-sm-9"><input type="password" class="form-control pwd1" value="' + json[index].vap_config[index].WepKey + '" style="width:70%"><span id="eye1" onclick="change()" style="margin-left:10px;">SHOW</span><div><span></span></div></td></tr>';
                str += '<tr><td class="czjz">country Code:</td><td><select name="type" class="form-control select_03 countryCode" style="width:70%"></select></td></tr>';
                str += ' <tr><td></td><td><div class="form-group form-line btn-group"><button type="button" id="edit" class="btn btn-primary btn-primary active">Edit</button><button type="reset" id="cancel" class="btn btn-primary btn-primary active ml-10">Cancel</button><button type="button" id="btn1" class="btn btn-primary btn-primary active ml-10" onclick="save()">Save</button></div></td></tr>';
                str += '</table>';
                str += '</ul>';
                str += '</form>';
            }

            $("#tab").html(str0);
            $("#content").html(str);

            for (var i = 0; i < json.length; i++) {
                //channel
                var optionChannel = document.createElement("option");
                $(optionChannel).val(json[index].channel).attr("selected", "selected");
                $(optionChannel).text(json[index].channel);
                var channelArr = ['0 auto', '1 (2.412 GHz)', '2 (2.417 GHz)', '3 (2.422 GHz)', '4 (2.427 GHz)', '5 (2.432 GHz)', '6 (2.437 GHz)', '7 (2.442 GHz)', '8 (2.447 GHz)', '9 (2.452 GHz)', '10 (2.457 GHz)', '11 (2.462 GHz)'];

                for (var i = 0; i < channelArr.length; i++) {
                    var channel = "<option value=" + i + ">" + channelArr[i] + "</option>"; // $channel = $(channel).get(0).value;
                    // $channelText = $(channel).get(0).text;

                    $('.channel').append(channel);
                }

                var channelSelected = "<option value=" + i + " selected='selected' >" + json[index].channel + " </option>";
                $('.channel').prepend(channelSelected);

                if (json[index].channel == 11) {
                    $('.channel option:selected').text(channelArr[11]);
                    $('.channel option[value=11]').hide();
                }

                if (json[index].channel == 10) {
                    $('.channel option:selected').text(channelArr[10]);
                    $('.channel option[value=10]').hide();
                }

                if (json[index].channel == 9) {
                    $('.channel option:selected').text(channelArr[9]);
                    $('.channel option[value=9]').hide();
                }

                if (json[index].channel == 8) {
                    $('.channel option:selected').text(channelArr[8]);
                    $('.channel option[value=8]').hide();
                }

                if (json[index].channel == 7) {
                    $('.channel option:selected').text(channelArr[7]);
                    $('.channel option[value=7]').hide();
                }

                if (json[index].channel == 6) {
                    $('.channel option:selected').text(channelArr[6]);
                    $('.channel option[value=6]').hide();
                }

                if (json[index].channel == 5) {
                    $('.channel option:selected').text(channelArr[5]);
                    $('.channel option[value=5]').hide();
                }

                if (json[index].channel == 4) {
                    $('.channel option:selected').text(channelArr[4]);
                    $('.channel option[value=4]').hide();
                }

                if (json[index].channel == 3) {
                    $('.channel option:selected').text(channelArr[3]);
                    $('.channel option[value=3]').hide();
                }

                if (json[index].channel == 2) {
                    $('.channel option:selected').text(channelArr[2]);
                    $('.channel option[value=2]').hide();
                }

                if (json[index].channel == 1) {
                    $('.channel option:selected').text(channelArr[1]);
                    $('.channel option[value=1]').hide();
                }

                if (json[index].channel == 0) {
                    $('.channel option:selected').text(channelArr[0]);
                    $('.channel option[value=0]').hide();
                } //hwmode


                var optionHWMode = document.createElement("option");
                $(optionHWMode).val(json[index].hwmode).attr("selected", "selected");
                $(optionHWMode).text(json[index].hwmode);
                var hwmodeArr = ['0 auto', '1 (802.11b)', '2 (802.11g)', '3 (802.11g+n)'];

                for (var i = 0; i < hwmodeArr.length; i++) {
                    var hwmode = "<option value=" + i + ">" + hwmodeArr[i] + "</option>"; //$hwmode = $(hwmode).get(0).value;

                    $('.hwmode').append(hwmode);
                }

                var hwmodeSelected = "<option value=" + i + " selected='selected'>" + json[index].hwmode + " </option>";
                $('.hwmode').prepend(hwmodeSelected);

                if (json[index].hwmode == 3) {
                    $('.hwmode option:selected').text(hwmodeArr[3]);
                    $('.hwmode option[value=3]').hide();
                }

                if (json[index].hwmode == 2) {
                    $('.hwmode option:selected').text(hwmodeArr[2]);
                    $('.hwmode option[value=2]').hide();
                }

                if (json[index].hwmode == 1) {
                    $('.hwmode option:selected').text(hwmodeArr[1]);
                    $('.hwmode option[value=1]').hide();
                }

                if (json[index].hwmode == 0) {
                    $('.hwmode option:selected').text(hwmodeArr[0]);
                    $('.hwmode option[value=0]').hide();
                } //EncryptionType


                var optionEncryptionType = document.createElement("option");
                $(optionEncryptionType).val(json[index].vap_config[index].SecurityMode).attr("selected", "selected");
                $(optionEncryptionType).text(json[index].vap_config[index].SecurityMode);
                var encryptionTypeArr = ['No Encryption', 'WEP', 'WPA-PSA', 'WPA2-PSA', 'psk-mixed'];

                for (var i = 0; i < encryptionTypeArr.length; i++) {
                    var EncryptionType = "<option value=" + i + ">" + encryptionTypeArr[i] + "</option>"; //$EncryptionType = $(EncryptionType).get(0).value;

                    $('.EncryptionType').append(EncryptionType);
                }

                var encryptionTypeSelected = "<option value=" + i + " selected='selected'>" + json[index].vap_config[index].SecurityMode + " </option>";
                $('.EncryptionType').prepend(encryptionTypeSelected);

                if (json[index].vap_config[index].SecurityMode == 4) {
                    $('.EncryptionType option:selected').text(encryptionTypeArr[4]);
                    $('.EncryptionType option[value=4]').hide();
                }

                if (json[index].vap_config[index].SecurityMode == 3) {
                    $('.EncryptionType option:selected').text(encryptionTypeArr[3]);
                    $('.EncryptionType option[value=3]').hide();
                }

                if (json[index].vap_config[index].SecurityMode == 2) {
                    $('.EncryptionType option:selected').text(encryptionTypeArr[2]);
                    $('.EncryptionType option[value=2]').hide();
                }

                if (json[index].vap_config[index].SecurityMode == 1) {
                    $('.EncryptionType option:selected').text(encryptionTypeArr[1]);
                    $('.EncryptionType option[value=1]').hide();
                }

                if (json[index].vap_config[index].SecurityMode == 0) {
                    $('.EncryptionType option:selected').text(encryptionTypeArr[0]);
                    $('.EncryptionType option[value=0]').hide();
                } // countryCode


                var optionCountryCode = document.createElement("option");
                $(optionCountryCode).val(json[index].CountryCode).attr("selected", "selected");
                $(optionCountryCode).text(json[index].CountryCode);
                var countryCodeArr = ["00 - World", "AE - United Arab Emirates", "AL - Albania", "AM - Armenia", "AR - Argentina", "AT - Austria", "AU - Australia", "AZ - Azerbaijan", "BE - Belgium", "BG - Bulgaria", "BH - Bahrain", "BN - Brunei Darussalam", "BO - Bolivia", "BR - Brazil", "BY - Belarus", "BZ - Belize", "CA - Canada", "CH - Switzerland ", "CL - Chile", "CN - China", "CO - Colombia", "CR - Costa Rica", "CY - Cyprus", "CZ - Czech Republic", "DE - Germany", "DK - Denmark", "DO - Dominican Republic", "DZ - Algeria", "EC - Ecuador", "EE - Estonia", "EG - Egypt", "ES - Spain", "FI - Finland", "FO - Faroe Islands", "FR - France", "GB - United Kingdom", "GE - Georgia", "GR - Greece", "GT - Guatemala", "HK - Hong Kong", "HN - Honduras", "HR - Croatia", "HU - Hungary ", "ID - Indonesia", "IE - Ireland", "IL - Israel", "IN - India", "IQ - Iraq", "IR - Iran", "IS - Iceland", "IT - Italy", "JM - Jamaica", "JO - Jordan", "JP - Japan", "KE - Kenya", "KP - North Korea", "KR - South Korea", "KW - Kuwait", "KZ - Kazakhstan", "LB - Lebanon", "LI - Liechtenstein", "LT - Lithuania", "LU - Luxembourg", "LV - Latvia", "LY - Libyan Arab Jamahiriya", "MA - Morocco", "MC - Monaco", "MK - Macedonia", "MO - Macao", "MX - Mexico", "MY - Malaysia", "NI - Nicaragua", "NL - Netherlands", "NO - Norway", "NZ - New Zealand", "OM - Oman", "PA - Panama", "PE - Peru", "PH - Philippines", "PK - Pakistan", "PL - Poland", "PR - Puerto Rico", "PT - Portugal", "PY - Paraguay", "QA - Qatar", "RO - Romania", "RU - Russian Federation", "SA - Saudi Arabia", "SE - Sweden", "SG - Singapore", "SI - Slovenia", "SK - Slovakia", "SV - El Salvador", "SY - Syrian Arab Republic", "TH - Thailand", "TN - Tunisia", "TR - Turkey", "TT - Trinidad and Tobago", "TW - Taiwan", "UA - Ukraine", "US - United States", "UY - Uruguay", "UZ - Uzbekistan", "VE - Venezuela", "VN - Viet Nam", "YE - Yemen", "ZA - South Africa", "ZW - Zimbabwe"];

                for (var i = 0; i < countryCodeArr.length; i++) {
                    var countryCode = "<option value=" + countryCodeArr[i].slice(0, 2) + ">" + countryCodeArr[i] + "</option>";
                    $('.countryCode').append(countryCode);
                }

                var countryCodeSelected = "<option value=" + json[index].CountryCode + " selected='selected'>" + json[index].CountryCode + " </option>";
                $('.countryCode').prepend(countryCodeSelected);
                $("#content select").change(function() {
                    oldVal = $(this).attr("old");

                    var _thisVal = $(this).find('option:selected').val();

                    var id = $(this).attr("id"); //$(this).find("option[value=" + _thisVal + "]").not("option[value=0]").hide();

                    $(this).find("option[value=" + _thisVal + "]").hide();
                    $(this).find("option[value=" + oldVal + "]").show();
                    $(this).attr("old", _thisVal);
                });
                var oldVal = "";
                $('.channel').change(function() {
                    if ($(this).find("option:selected")) {
                        var _thisVal = $(this).find('option:selected').val();

                        oldVal = $(this).attr("old", _thisVal);
                        $('.channel').find("option[value=" + _thisVal + "]").not("option[value=0]").hide();
                    }
                });
                $('.hwmode').change(function() {
                    if ($(this).find("option:selected")) {
                        var _thisVal = $(this).find('option:selected').val();

                        oldVal = $(this).attr("old", _thisVal);
                        $('.hwmode').find("option[value=" + _thisVal + "]").hide();
                    }
                });
                $('.EncryptionType').change(function() {
                    if ($(this).find("option:selected")) {
                        var _thisVal = $(this).find('option:selected').val();

                        oldVal = $(this).attr("old", _thisVal);
                        $('.EncryptionType').find("option[value=" + _thisVal + "]").not("option[value=0]").hide();
                    }
                });
                $('.countryCode').change(function() {
                    if ($(this).find("option:selected")) {
                        var _thisVal = $(this).find('option:selected').val();

                        oldVal = $(this).attr("old", _thisVal);
                        $('.countryCode').find("option[value=" + _thisVal + "]").not("option[value=0]").hide();
                    }
                });
            }

            $("#content ul").eq(0).show();
            $("#content select,#content input,#content button").prop("disabled", true);
            $('#EncryptionType').each(function() {
                if (this.value == 0) {
                    $("#pwd").prop("disabled", true);
                    $("#pwd1").prop("disabled", true);
                    $("#eye").hide();
                    $("#eye1").hide();
                    $("#pwd").hide();
                    $("#pwd1").hide();
                    console.log('000');
                } else if (this.value == 5 && this.value == 0) {
                    $("#pwd1").show();
                    console.log('111000');
                    $("#pwd").hide();
                } else if (this.value == 1) {
                    $("#pwd1").show();
                    console.log('111');
                    $("#pwd").hide();
                } else if (this.value == 5 && this.value == 1) {
                    $("#pwd1").show();
                    console.log('555111');
                    $("#pwd").hide();
                } else if (this.value == 5) {
                    $("#eye").show();
                    $("#eye1").hide();
                    $("#pwd").show();
                    $("#pwd1").hide();
                    console.log('555');
                } else if (this.value == 5 && this.value == 2 && this.value == 3 && this.value == 4) {
                    $("#eye").hide();
                    $("#eye1").hide();
                    $("#pwd").hide();
                    $("#pwd1").hide();
                    console.log('555000');
                } else {
                    $("#pwd").val(json[index].vap_config[index].WpaKey);
                    $("#pwd1").hide();
                    console.log('222333');
                    $("#pwd").show();
                    $("#eye").hide();
                    $("#eye1").hide();
                    $("#pwd").hide();
                    $("#pwd1").hide();
                }
            });
            $("#edit").click(function() {
                $("#content select,#content input,#content button").removeAttr("disabled");
            });
            $('#EncryptionType').change(function() {
                //console.log(this.options[this.options.selectedIndex].value === this.value)
                //console.log(this.options[this.options.selectedIndex].value);
                if (this.value == 0) {
                    $("#pwd").prop("disabled", true);
                    $("#pwd1").prop("disabled", true);
                    $("#eye").hide();
                    $("#eye1").hide();
                    $("#pwd").hide();
                    $("#pwd1").hide();
                    console.log('000');
                } else if (this.value == 1) {
                    $("#pwd1").show();
                    console.log('111');
                    $("#pwd").hide();
                } else if (this.value == 5) {
                    $("#eye").show();
                    $("#eye1").hide();
                    $("#pwd").show();
                    $("#pwd1").hide();
                    console.log('555');
                } else {
                    $("#pwd").val(json[index].vap_config[index].WpaKey);
                    $("#pwd1").hide();
                    console.log('222333');
                    $("#pwd").show();
                } //console.log($("#pwd").val(json[index].vap_config[index].WpaKey));

            });
            $("#content").mouseenter(function() {
                //$('#edit').removeAttr("disabled");
                $('#edit').prop("disabled", false); // $('#cancel').attr("disabled", false);
            });
            $('.pwd, .pwd1').focus(function() {
                var pwd = $("#pwd").val();
                pwd = false;
                $(this).siblings().find('span').text('Please enter a password with more than 8 digits!').removeClass('state1 state4 state3').addClass('state2');
            }).blur(function() {
                var len = $(this).val().length;

                if (len >= 8 && len <= 20 && $(this).val() != '' && isNaN($(this).val()) == false) {
                    $(this).siblings().find('span').text('The password is correct!').removeClass('state1 state4 state3').addClass('state4');
                    pwd = true;
                } else {
                    $(this).siblings().find('span').text('Please enter a password with more than 8 digits!').removeClass('state1 state2 state4').addClass('state3');
                }
            });
        },
        error: function error(jqXHR) {
            console.log("Error message", JSON.stringify(jqXHR))
            parent.layer.close(loading);
            var tip = '<div style="padding: 20px;text-align: center;word-wrap:break-word;">Abnormal communication, please try again later!</div>';
            promptMessage("Error message", tip);
        }
    });
    layui.use(['form'], function() {
        var form = layui.form;
        form.on('switch(switchTest)', function(data) {
            var checked = data.elem.checked;
            var serverStatus = 1;

            if (serverStatus) {
                data.elem.checked = checked;
            } else {
                data.elem.checked = !checked;
            }

            form.render();
            var data = {
                "jsonrpc": "2.0",
                "method": "GetWlanSettings",
                "params": {
                    "vap_name": "ath2",
                    "operate_code": 1
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
                success: function success(res) {
                    var json = res.result.wifi_config;

                    for (var index in json) {
                        if (checked && json[index].phy_enable == 0) {
                            $("#content").show();
                        } else {
                            $("#content").hide();
                        }
                    }
                },
                error: function error(jqXHR) {
                    console.log("Error message", JSON.stringify(jqXHR))
                    parent.layer.close(loading);
                    var tip = '<div style="padding: 20px;text-align: center;word-wrap:break-word;">Abnormal communication, please try again later!</div>';
                    promptMessage("Error message", tip);
                }
            });
        });
    });
});