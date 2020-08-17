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

            var str = "";
            var str0 = "";

            for (var index in json) {
                str0 += '<li class="current"><span">' + json[index].phy_name + '</span><span> :' + json[index].vap_config[index].Ssid + '</span><span class="layui-form layui-form-pane layui-form-item"><i><input type="checkbox" checked="" name="open" lay-skin="switch" lay-filter="switchTest" lay-text="ON|OFF"></i></span></li>';

                str += "<form>"
                str += '<ul style="display:none;">';
                str += '<table class="table table-hover table-responsive">';
                str += '<tr><th colspan="2">Access point connection settings</th></tr>';
                str += '<tr><th colspan="2">Use these details when connecting a device to the SmartHub\'s access point</th></tr>';
                str += '<tr><td class="col-sm-3">Access point name:</td><td class="col-sm-9"><input type="text" class="form-control ssid" value="' + json[index].vap_config[index].Ssid + '" style="width:40%"></td></tr>';
                str += '<tr><td>Preferred Wi-Fi channel:</td><td><select name="type" class="form-control select_00 channel" style="width:40%"></select></td></tr>';
                str += '<tr><td>Mode:</td><td><select name="type" class="form-control select_01 hwmode" style="width:40%"></select></td></tr>';
                str += '<tr><td>Encryption type:</td><td><select name="type" class="form-control select_02 EncryptionType" style="width:40%"></select></td></tr>';
                str += '<tr><td>Password:</td><td><input type="password" class="form-control pwd" value="' + json[index].vap_config[index].WpaKey + '" style="width:40%"><span id="eye" onclick="change()">SHOW</span></td></tr>';
                str += '<tr><td>country Code:</td><td><select name="type" class="form-control select_03 countryCode" style="width:40%"></select></td></tr>';
                str += ' <tr><td></td><td><div class="form-group form-line"><button type="reset" class="btn layui-btn">Cancel</button><button type="button" id="btn1" class="btn layui-btn" onclick="save()">Save</button></div></td></tr>';
                str += '</table>';
                str += '</ul>';
                str += '</form>';


            }
            $("#tab").html(str0);
            $("#content").html(str);




            for (var i = 0; i < json.length; i++) {
                //channel
                var optionChannel = document.createElement("option");
                var channelselected = $(optionChannel).val(json[index].channel).attr("selected", "selected");
                $(optionChannel).text(json[index].channel);
                var channelArr = ['0 auto', '1 (2.412 GHz)', '2 (2.417 GHz)', '3 (2.422 GHz)', '4 (2.427 GHz)', '5 (2.432 GHz)', '6 (2.437 GHz)', '7 (2.442 GHz)', '8 (2.447 GHz)', '9 (2.452 GHz)', '10 (2.457 GHz)', '11 (2.462 GHz)']
                for (var i = 0; i < channelArr.length; i++) {
                    var channel = "<option value=" + i + ">" + channelArr[i] + "</option>";
                    $channel = $(channel).get(0).value;
                    $channelText = $(channel).get(0).text;
                    $('.channel').append(channel);
                }
                var channelSelected = "<option value=" + i + " selected='selected' >" + json[index].channel + " </option>"
                $('.channel').prepend(channelSelected);
                if (json[index].channel == 11) {
                    $('.channel option:selected').text(channelArr[11]);
                }
                if (json[index].channel == 10) {
                    $('.channel option:selected').text(channelArr[10]);
                }
                if (json[index].channel == 9) {
                    $('.channel option:selected').text(channelArr[9]);
                }
                if (json[index].channel == 8) {
                    $('.channel option:selected').text(channelArr[8]);
                }
                if (json[index].channel == 7) {
                    $('.channel option:selected').text(channelArr[7]);
                }
                if (json[index].channel == 6) {
                    $('.channel option:selected').text(channelArr[6]);
                }
                if (json[index].channel == 5) {
                    $('.channel option:selected').text(channelArr[5]);
                }
                if (json[index].channel == 4) {
                    $('.channel option:selected').text(channelArr[4]);
                }
                if (json[index].channel == 3) {
                    $('.channel option:selected').text(channelArr[3]);
                }
                if (json[index].channel == 2) {
                    $('.channel option:selected').text(channelArr[2]);
                }
                if (json[index].channel == 1) {
                    $('.channel option:selected').text(channelArr[1]);
                }
                if (json[index].channel == 0) {
                    $('.channel option:selected').text(channelArr[0]);
                    $(".channel option:first").remove();
                }

                //hwmode
                var optionHWMode = document.createElement("option");
                $(optionHWMode).val(json[index].hwmode).attr("selected", "selected");
                $(optionHWMode).text(json[index].hwmode);
                var hwmodeArr = ['0 auto', '1 (802.11b)', '2 (802.11g)', '3 (802.11g+n)'];
                for (var i = 0; i < hwmodeArr.length; i++) {
                    var hwmode = "<option value=" + i + ">" + hwmodeArr[i] + "</option>";
                    $hwmode = $(hwmode).get(0).value;
                    $('.hwmode').append(hwmode);
                }
                var hwmodeSelected = "<option value=" + i + " selected='selected'>" + json[index].hwmode + " </option>"
                $('.hwmode').prepend(hwmodeSelected);

                if (json[index].hwmode == i && hwmodeSelected.selected == true) {
                    $('.hwmode option').text(hwmodeArr[i]);
                } else if (json[index].hwmode == i && hwmodeSelected.selected == true) {
                    $('.hwmode option:selected').text("0 auto");
                } else if (json[index].hwmode == i && hwmodeSelected.selected == true) {
                    $('.hwmode option:selected').text("1 (802.11b)");
                } else if (json[index].hwmode == i && hwmodeSelected.selected == true) {
                    $('.hwmode option:selected').text("2 (802.11g)");
                } else {
                    $('.hwmode option:selected').text("3 (802.11g+n)");
                    $(".hwmode option:last").remove();
                }

                //EncryptionType
                var optionEncryptionType = document.createElement("option");
                $(optionEncryptionType).val(json[index].vap_config[index].SecurityMode).attr("selected", "selected");
                $(optionEncryptionType).text(json[index].vap_config[index].SecurityMode);
                var encryptionTypeArr = ['No Encryption', 'WEP', 'WPA-PSA', 'WPA2-PSA', 'psk-mixed'];
                for (var i = 0; i < encryptionTypeArr.length; i++) {
                    var EncryptionType = "<option value=" + i + ">" + encryptionTypeArr[i] + "</option>";
                    $EncryptionType = $(EncryptionType).get(0).value;
                    $('.EncryptionType').append(EncryptionType);
                }
                var encryptionTypeSelected = "<option value=" + i + " selected='selected'>" + json[index].vap_config[index].SecurityMode + " </option>"
                $('.EncryptionType').prepend(encryptionTypeSelected);

                if (json[index].vap_config[index].SecurityMode == 4) {
                    $('.EncryptionType option:selected').text(encryptionTypeArr[4]);
                    $(".EncryptionType option:last").remove();
                }
                if (json[index].vap_config[index].SecurityMode == 3) {
                    $('.EncryptionType option:selected').text(encryptionTypeArr[3]);
                    //$(this).remove();
                }
                if (json[index].vap_config[index].SecurityMode == 2) {
                    $('.EncryptionType option:selected').text(encryptionTypeArr[2]);
                    //$(this).remove();
                }
                if (json[index].vap_config[index].SecurityMode == 1) {
                    $('.EncryptionType option:selected').text(encryptionTypeArr[1]);
                }
                if (json[index].vap_config[index].SecurityMode == 0) {
                    $('.EncryptionType option:selected').text(encryptionTypeArr[0]);
                }

                // countryCode
                var optionCountryCode = document.createElement("option");
                $(optionCountryCode).val(json[index].CountryCode).attr("selected", "selected");
                $(optionCountryCode).text(json[index].CountryCode);
                var countryCodeArr = [
                    "00 - World", "AE - United Arab Emirates", "AL - Albania", "AM - Armenia", "AR - Argentina", "AT - Austria", "AU - Australia", "AZ - Azerbaijan", "BE - Belgium", "BG - Bulgaria", "BH - Bahrain", "BN - Brunei Darussalam", "BO - Bolivia", "BR - Brazil", "BY - Belarus", "BZ - Belize", "CA - Canada", "CH - Switzerland ", "CL - Chile", "CN - China", "CO - Colombia", "CR - Costa Rica", "CY - Cyprus", "CZ - Czech Republic", "DE - Germany", "DK - Denmark", "DO - Dominican Republic", "DZ - Algeria", "EC - Ecuador", "EE - Estonia", "EG - Egypt", "ES - Spain", "FI - Finland", "FO - Faroe Islands", "FR - France", "GB - United Kingdom", "GE - Georgia", "GR - Greece", "GT - Guatemala", "HK - Hong Kong", "HN - Honduras", "HR - Croatia", "HU - Hungary ", "ID - Indonesia", "IE - Ireland", "IL - Israel", "IN - India", "IQ - Iraq", "IR - Iran", "IS - Iceland", "IT - Italy", "JM - Jamaica", "JO - Jordan", "JP - Japan", "KE - Kenya", "KP - North Korea", "KR - South Korea", "KW - Kuwait", "KZ - Kazakhstan", "LB - Lebanon", "LI - Liechtenstein", "LT - Lithuania", "LU - Luxembourg", "LV - Latvia", "LY - Libyan Arab Jamahiriya", "MA - Morocco", "MC - Monaco", "MK - Macedonia", "MO - Macao", "MX - Mexico", "MY - Malaysia", "NI - Nicaragua", "NL - Netherlands", "NO - Norway", "NZ - New Zealand", "OM - Oman", "PA - Panama", "PE - Peru", "PH - Philippines", "PK - Pakistan", "PL - Poland", "PR - Puerto Rico", "PT - Portugal", "PY - Paraguay", "QA - Qatar", "RO - Romania", "RU - Russian Federation", "SA - Saudi Arabia", "SE - Sweden", "SG - Singapore", "SI - Slovenia", "SK - Slovakia", "SV - El Salvador", "SY - Syrian Arab Republic", "TH - Thailand", "TN - Tunisia", "TR - Turkey", "TT - Trinidad and Tobago", "TW - Taiwan", "UA - Ukraine", "US - United States", "UY - Uruguay", "UZ - Uzbekistan", "VE - Venezuela", "VN - Viet Nam", "YE - Yemen", "ZA - South Africa", "ZW - Zimbabwe"
                ];
                for (var i = 0; i < countryCodeArr.length; i++) {
                    var countryCode = "<option value=" + countryCodeArr[i].slice(0, 2) + ">" + countryCodeArr[i] + "</option>"
                    $('.countryCode').append(countryCode);
                }
                var countryCodeSelected = "<option value=" + json[index].CountryCode + " selected='selected'>" + json[index].CountryCode + " </option>"
                $('.countryCode').prepend(countryCodeSelected);

                $("#content select").change(function() {
                    oldVal = $(this).attr("old");
                    var _thisVal = $(this).find('option:selected').val();
                    var id = $(this).attr("id");
                    //$(this).find("option[value=" + _thisVal + "]").not("option[value=0]").hide();
                    $(this).find("option[value=" + _thisVal + "]").hide();
                    $(this).find("option[value=" + oldVal + "]").show();
                    $(this).attr("old", _thisVal);
                })

                var oldVal = "";
                $('.countryCode').each(function() {
                    if ($(this).find("option:selected")) {
                        var _thisVal = $(this).find('option:selected').val();
                        oldVal = $(this).attr("old", _thisVal);
                        $('.countryCode').find("option[value=" + _thisVal + "]").not("option[value=0]").hide()
                    }
                })

            }



            $("#content ul").eq(0).show();

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
                success: function(res) {
                    if (checked) {
                        $("#content").show();
                    } else {
                        $("#content").hide();
                    }

                },
                error: function(jqXHR) {
                    alert("An error occurred：" + jqXHR.status);

                }
            });

        });
    });

});