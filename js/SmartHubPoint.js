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
            //console.log(res);
            var json = res.result.wifi_config;
            //console.log(json[0].phy_name);
            $("#wifi_00").html(json[0].phy_name);
            // $("#wifi_01").html(json[1].phy_name);
            // $("#wifi_02").html(json[2].phy_name);
            //$("#wifi_03").html(json[3].phy_name);

            //选中的文本
            //console.log($('#select_00 option:selected').text());
            //console.log($('#select_00 option:selected').val()); //选中的值
            //console.log($("#select_00").get(0).selectedIndex); //索引

            var str = "";
            var str0 = "";
            //方法一:es5字符串拼接：
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
                str += '<tr><td>Encryption type:</td><td><select name="type" id="EncryptionType" class="form-control select_02 EncryptionType" style="width:40%"></select></td></tr>';
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
                $(optionChannel).val(json[index].channel).attr("selected", "selected");
                $(optionChannel).text(json[index].channel);
                var channelArr = ['auto', '1 (2.412 GHz)', '2 (2.417 GHz)', '3 (2.422 GHz)', '4 (2.427 GHz)', '5 (2.432 GHz)', '6 (2.437 GHz)', '7 (2.442 GHz)', '8 (2.447 GHz)', '9 (2.452 GHz)', '10 (2.457 GHz)', '11 (2.462 GHz)']
                for (var i = 0; i < channelArr.length; i++) {
                    var channel = "<option value=" + channelArr[i] + ">" + channelArr[i] + "</option>";
                    $channel = $(channel).get(0).value;
                    //console.log($(optionChannel).val(json[index].channel).attr("selected", "selected"));

                    $('.channel').append(channel);

                    //$(".channel option[value='11']").remove();

                    $('.channel').change(function() {
                        $('.channel option:selected').text(channelArr[i]);
                    });
                    // if ($channel == json[index].channel) {
                    //     $('.channel option:selected').text(channelArr[i]);
                    //     $(".channel option[value='3']").remove();
                    // } else if ($(channel) == json[index].channel) {
                    //     $('.channel option:selected').text(channelArr[i]);
                    //     $(".channel option[value='10']").remove();
                    // } else if ($channel == json[index].channel) {
                    //     $('.channel option:selected').text(channelArr[i]);
                    //     $(".channel option[value='9']").remove();
                    // } else if ($channel == json[index].channel) {
                    //     $('.channel option:selected').text(channelArr[i]);
                    //     $(".channel option[value='8']").remove();
                    // } else if ($channel == json[index].channel) {
                    //     $('.channel option:selected').text(channelArr[i]);
                    //     $(".channel option[value='7']").remove();
                    // } else if ($channel == json[index].channel) {
                    //     $('.channel option:selected').text(channelArr[i]);
                    //     $(".channel option[value='6']").remove();
                    // } else if ($channel == json[index].channel) {
                    //     $('.channel option:selected').text(channelArr[i]);
                    //     $(".channel option[value='5']").remove();
                    // } else if ($channel == json[index].channel) {
                    //     $('.channel option:selected').text(channelArr[i]);
                    //     $(".channel option[value='4']").remove();
                    // } else if ($channel == json[index].channel) {
                    //     $('.channel option:selected').text(channelArr[i]);
                    //     $(".channel option[value='11']").remove();
                    // } else if ($channel == json[index].channel) {
                    //     $('.channel option:selected').text(channelArr[i]);
                    //     $(".channel option[value='2']").remove();
                    // } else if ($channel == json[index].channel) {
                    //     $('.channel option:selected').text(channelArr[i]);
                    //     $(".channel option[value='1']").remove();
                    // } else if ($channel == json[index].channel) {
                    //     $('.channel option:selected').text(channelArr[i]);
                    //     $(".channel option[value='0']").remove();
                    // }
                }
                var channelSelected = "<option value=" + json[index].channel + " selected='selected'>" + json[index].channel + " </option>"
                $('.channel').append(channelSelected);

                //hwmode
                var optionHWMode = document.createElement("option");
                $(optionHWMode).val(json[index].hwmode).attr("selected", "selected");
                $(optionHWMode).text(json[index].hwmode);
                var hwmodeArr = ['auto', '1 (802.11b)', '2 (802.11g)', '3 (802.11g+n)'];
                for (var i = 0; i < hwmodeArr.length; i++) {
                    var hwmode = "<option value=" + hwmodeArr[i] + ">" + hwmodeArr[i] + "</option>";
                    $hwmode = $(hwmode).get(0).value;
                    $('.hwmode').append(hwmode);
                    if ($hwmode == json[index].hwmode) {
                        $('.hwmode option:selected').text(hwmodeArr[i]);
                        $(".hwmode option[value='3']").remove();
                    } else if ($hwmode == json[index].hwmode) {
                        $('.hwmode option:selected').text(hwmodeArr[i]);
                        $(".hwmode option[value='2']").remove();
                    } else if ($hwmode == json[index].hwmode) {
                        $('.hwmode option:selected').text(hwmodeArr[i]);
                        $(".hwmode option[value='1']").remove();
                    } else if ($hwmode == json[index].hwmode) {
                        $('.hwmode option:selected').text(hwmodeArr[i]);
                        $(".hwmode option[value='0']").remove();
                    }
                }

                // $('.hwmode option').each(function() {
                //     if ($(this).val() == '5') {
                //         $(this).remove();
                //     }
                // });


                // if ($('.hwmode option:selected').val() == 3) {
                //     $('.hwmode option:selected').text('3 (802.11g+n)');
                // } else if ($('.mode option:selected').val() == 2) {
                //     $('.hwmode option:selected').text('2 (802.11g)');
                // } else if ($('.mode option:selected').val() == 1) {
                //     $('.hwmode option:selected').text('1 (802.11b)');
                // } else {
                //     $('.hwmode option:selected').text('auto');
                // }

                //EncryptionType

                var optionEncryptionType = document.createElement("option");
                $(optionEncryptionType).val(json[index].vap_config[index].SecurityMode).attr("selected", "selected");
                $(optionEncryptionType).text(json[index].vap_config[index].SecurityMode);
                var encryptionTypeArr = ['No Encryption', 'WEP', 'WPA-PSA', 'WPA2-PSA', 'psk-mixed'];
                for (var i = 0; i < encryptionTypeArr.length; i++) {
                    var EncryptionType = "<option value=" + encryptionTypeArr[i] + ">" + encryptionTypeArr[i] + "</option>";
                    $EncryptionType = $(EncryptionType).get(0).value;
                    $('.EncryptionType').append(EncryptionType);
                    if ($EncryptionType == json[index].vap_config[index].SecurityMode) {
                        $('.EncryptionType option:selected').text(encryptionTypeArr[i]);
                        $(".EncryptionType option[value='4']").remove();
                    } else if ($EncryptionType == json[index].vap_config[index].SecurityMode) {
                        $('.EncryptionType option:selected').text(encryptionTypeArr[i]);
                        $(".EncryptionType option[value='3']").remove();
                    } else if ($EncryptionType == json[index].vap_config[index].SecurityMode) {
                        $('.EncryptionType option:selected').text(encryptionTypeArr[i]);
                        $(".EncryptionType option[value='2']").remove();
                    } else if ($EncryptionType == json[index].vap_config[index].SecurityMode) {
                        $('.EncryptionType option:selected').text(encryptionTypeArr[i]);
                        $(".EncryptionType option[value='1']").remove();
                    } else if ($EncryptionType == json[index].vap_config[index].SecurityMode) {
                        $('.EncryptionType option:selected').text(encryptionTypeArr[i]);
                        $(".EncryptionType option[value='0']").remove();
                    }
                }


                // var optionEncryptionType = document.createElement("option");
                // $(optionEncryptionType).val(json[index].vap_config[index].SecurityMode).attr("selected", "selected");
                // $(optionEncryptionType).text(json[index].vap_config[index].SecurityMode);
                // var encryptionTypeArr = ['No Encryption', 'WEP', 'WPA-PSA', 'WPA2-PSA', 'psk-mixed'];

                // for (var i = 0; i < encryptionTypeArr.length; i++) {
                //     var encryptionType = "<option value=" + encryptionTypeArr[i] + ">" + encryptionTypeArr[i] + "</option>";
                //     $encryptionType = $(encryptionType).get(0).value;
                //     encryptionTypeIndex = $(encryptionType).get(0).selectedIndex;
                //     console.log(encryptionTypeIndex);
                //     console.log($encryptionType);
                //     //console.log(json[index].vap_config[index].SecurityMode);
                //     //console.log(encryptionType);
                //     $('.EncryptionType').append(encryptionType);
                //     if ($encryptionType == json[index].vap_config[index].SecurityMode) {
                //         alert(111)
                //         $('.EncryptionType option:selected').text(encryptionTypeArr[i]);
                //         $(".EncryptionType option[value='4']").remove();
                //     } else if ($encryptionType == json[index].vap_config[index].SecurityMode) {
                //         $('.EncryptionType option:selected').text(encryptionTypeArr[i]);
                //         $(".EncryptionType option[value='3']").remove();
                //     } else if ($encryptionType == json[index].vap_config[index].SecurityMode) {
                //         $('.EncryptionType option:selected').text(encryptionTypeArr[i]);
                //         $(".EncryptionType option[value='2']").remove();
                //     } else if ($encryptionType == json[index].vap_config[index].SecurityMode) {
                //         $('.EncryptionType option:selected').text(encryptionTypeArr[i]);
                //         $(".EncryptionType option[value='1']").remove();
                //     } else if ($encryptionType == json[index].vap_config[index].SecurityMode) {
                //         $('.EncryptionType option:selected').text(encryptionTypeArr[i]);
                //         $(".EncryptionType option[value='0']").remove();
                //     }

                // }


                // countryCode
                var optionCountryCode = document.createElement("option");
                $(optionCountryCode).val(json[index].countryCode).attr("selected", "selected");
                $(optionCountryCode).text(json[index].countryCode);
                var countryCodeArr = [
                    "00 - World", "AE - United Arab Emirates", "AL - Albania", "AM - Armenia", "AR - Argentina", "AT - Austria", "AU - Australia", "AZ - Azerbaijan", "BE - Belgium", "BG - Bulgaria", "BH - Bahrain", "BN - Brunei Darussalam", "BO - Bolivia", "BR - Brazil", "BY - Belarus", "BZ - Belize", "CA - Canada", "CH - Switzerland ", "CL - Chile", "CN - China", "CO - Colombia", "CR - Costa Rica", "CY - Cyprus", "CZ - Czech Republic", "DE - Germany", "DK - Denmark", "DO - Dominican Republic", "DZ - Algeria", "EC - Ecuador", "EE - Estonia", "EG - Egypt", "ES - Spain", "FI - Finland", "FO - Faroe Islands", "FR - France", "GB - United Kingdom", "GE - Georgia", "GR - Greece", "GT - Guatemala", "HK - Hong Kong", "HN - Honduras", "HR - Croatia", "HU - Hungary ", "ID - Indonesia", "IE - Ireland", "IL - Israel", "IN - India", "IQ - Iraq", "IR - Iran", "IS - Iceland", "IT - Italy", "JM - Jamaica", "JO - Jordan", "JP - Japan", "KE - Kenya", "KP - North Korea", "KR - South Korea", "KW - Kuwait", "KZ - Kazakhstan", "LB - Lebanon", "LI - Liechtenstein", "LT - Lithuania", "LU - Luxembourg", "LV - Latvia", "LY - Libyan Arab Jamahiriya", "MA - Morocco", "MC - Monaco", "MK - Macedonia", "MO - Macao", "MX - Mexico", "MY - Malaysia", "NI - Nicaragua", "NL - Netherlands", "NO - Norway", "NZ - New Zealand", "OM - Oman", "PA - Panama", "PE - Peru", "PH - Philippines", "PK - Pakistan", "PL - Poland", "PR - Puerto Rico", "PT - Portugal", "PY - Paraguay", "QA - Qatar", "RO - Romania", "RU - Russian Federation", "SA - Saudi Arabia", "SE - Sweden", "SG - Singapore", "SI - Slovenia", "SK - Slovakia", "SV - El Salvador", "SY - Syrian Arab Republic", "TH - Thailand", "TN - Tunisia", "TR - Turkey", "TT - Trinidad and Tobago", "TW - Taiwan", "UA - Ukraine", "US - United States", "UY - Uruguay", "UZ - Uzbekistan", "VE - Venezuela", "VN - Viet Nam", "YE - Yemen", "ZA - South Africa", "ZW - Zimbabwe"
                ];
                for (var i = 0; i < countryCodeArr.length; i++) {
                    var countryCode = "<option value=" + countryCodeArr[i].slice(0, 2) + ">" + countryCodeArr[i] + "</option>"
                        //console.log(countryCode);
                    $('.countryCode').append(countryCode);
                }

                // $('.select_00').append(option);
                // $('.select_01').append(option);
                // $('.select_02').append(option);
                // $('.select_03').append(option);
                //console.log(text);



                // if ($('.channel option:selected').val() == 1) {
                //     $('.channel option:selected').text('1 (2.412 GHz)');
                // } else if ($('.channel option:selected').val() == 2) {
                //     $('.channel option:selected').text('2 (2.417 GHz)');
                // } else if ($('.channel option:selected').val() == 3) {
                //     $('.channel option:selected').text('3 (2.422 GHz)');
                // } else if ($('.channel option:selected').val() == 4) {
                //     $('.channel option:selected').text('4 (2.427 GHz');
                // } else if ($('.channel option:selected').val() == 5) {
                //     $('.channel option:selected').text('5 (2.432 GHz)');
                // } else if ($('.channel option:selected').val() == 6) {
                //     $('.channel option:selected').text('6 (2.437 GHz)');
                // } else if ($('.channel option:selected').val() == 7) {
                //     $('.channel option:selected').text('7 (2.442 GHz)');
                // } else if ($('.channel option:selected').val() == 8) {
                //     $('.channel option:selected').text('8 (2.447 GHz)');
                // } else if ($('.channel option:selected').val() == 9) {
                //     $('.channel option:selected').text('9 (2.452 GHz)');
                // } else if ($('.channel option:selected').val() == 10) {
                //     $('.channel option:selected').text('10 (2.457 GHz)');
                // } else if ($('.channel option:selected').val() == 11) {
                //     $('.channel option:selected').text('11 (2.462 GHz)');
                // } else {
                //     $('.channel option:selected').text('auto');
                // }
                // console.log($(option).text(json[i].channel.val()));
                // if ($(option).text(json[i].channel.val()) == 0) {
                //     $('.channel option:selected').text('auto');
                // } else if ($(option).text(json[i].channel.val()) == 1) {
                //     $('.channel option:selected').text('1 (2.412 GHz)');
                // } else if ($(option).text(json[i].channel.val()) == 2) {
                //     $('.channel option:selected').text('2 (2.417 GHz)');
                // } else if ($(option).text(json[i].channel.val()) == 3) {
                //     $('.channel option:selected').text('3 (2.422 GHz)');
                // } else if ($(option).text(json[i].channel.val()) == 4) {
                //     $('.channel option:selected').text('4 (2.427 GHz');
                // } else if ($(option).text(json[i].channel.val()) == 5) {
                //     $('.channel option:selected').text('5 (2.432 GHz)');
                // } else if ($(option).text(json[i].channel.val()) == 6) {
                //     $('.channel option:selected').text('6 (2.437 GHz)');
                // } else if ($(option).text(json[i].channel.val()) == 7) {
                //     $('.channel option:selected').text('7 (2.442 GHz)');
                // } else if ($(option).text(json[i].channel.val()) == 8) {
                //     $('.channel option:selected').text('8 (2.447 GHz)');
                // } else if ($(option).text(json[i].channel.val()) == 9) {
                //     $('.channel option:selected').text('9 (2.452 GHz)');
                // } else if ($(option).text(json[i].channel.val()) == 10) {
                //     $('.channel option:selected').text('10 (2.457 GHz)');
                // } else if ($(option).text(json[i].channel.val()) == 11) {
                //     $('.channel option:selected').text('11 (2.462 GHz)');
                // }

                // $(option).val(json[i].hwmode).attr("selected", "selected");
                // $(option).text(json[i].hwmode);
                // var modeArr = ['auto', '1 (802.11b)', '2 (802.11g)', '3 (802.11g+n)'];
                // if ($('.mode option:selected').val() == 3) {
                //     $('.mode option:selected').text(modeArr[3]);
                // } else if ($('.mode option:selected').val() == 2) {
                //     $('.mode option:selected').text(modeArr[2]);
                // } else if ($('.mode option:selected').val() == 1) {
                //     $('.mode option:selected').text(modeArr[1]);
                // } else {
                //     $('.mode option:selected').text(modeArr[0]);
                // }
                // if ($('.mode option:selected').val() == 3) {
                //     $('.mode option:selected').text('3 (802.11g+n)');
                // } else if ($('.mode option:selected').val() == 2) {
                //     $('.mode option:selected').text('2 (802.11g)');
                // } else if ($('.mode option:selected').val() == 1) {
                //     $('.mode option:selected').text('1 (802.11b)');
                // } else {
                //     $('.mode option:selected').text('auto');
                // }

                // var SecurityMode = json[i].vap_config[i].SecurityMode;
                // $(option).val(json[i].vap_config[i].SecurityMode).attr("selected", "selected");
                //console.log(json[i].vap_config[i].SecurityMode);
                //var index = $('.EncryptionType').get(0).selectedIndex;
                // var index = $('.EncryptionType').index();
                // console.log(index);

                // if (SecurityMode == 2) {
                //     $('.EncryptionType option:selected').text('WPA-PSA');
                // } else if (SecurityMode == 3) {
                //     $('.EncryptionType option:selected').text('WPA2-PSA');
                // } else if (SecurityMode == 4) {
                //     $('.EncryptionType option:selected').text('psk-mixed');
                // } else if (SecurityMode == 1) {
                //     $('.EncryptionType option:selected').text('WEP');
                // } else {
                //     $('.EncryptionType option:selected').text('No Encryption');
                // }

                //var arrCountryCode = []
                // var CountryCode = json[i].CountryCode;
                // $(option).val(json[i].countryCode).attr("selected", "selected");
                // if (CountryCode == 'ZW') {
                //     $('.countryCode option:selected').text('ZW');
                // }

                // var SecurityMode = json[i].vap_config[i].SecurityMode;
                // $(option).val(json[i].vap_config[i].SecurityMode).attr("selected", "selected");

                // if (SecurityMode == 2) {
                //     $('.EncryptionType option:selected').text('psk-mixed');

                // }


                //$(option).val(json[i].WepType).attr("selected", "selected");
                // if ($('.EncryptionType :selected').val() == 1) {
                //     document.getElementById("cbi-value-field1").style.display = "none";
                // } else if ($('.EncryptionType :selected').val() == 2) {
                //     document.getElementById("cbi-value-field2").style.display = "none";
                // } else if ($('.EncryptionType :selected').val() == 3) {
                //     alert('WPA2-PSK');
                // } else if ($('.EncryptionType :selected').val() == 4) {
                //     alert('psk-mixed');
                // }


                // if (SecurityMode == 1) {
                //     document.getElementById("cbi-value-field1").style.display = "none";
                // } else if (SecurityMode == 2) {
                //     document.getElementById("cbi-value-field2").style.display = "none";
                // } else if (SecurityMode == 3) {
                //     document.getElementById("cbi-value-field3").style.display = "none";
                // } else if (SecurityMode == 4) {
                //     document.getElementById("cbi-value-field4").style.display = "block";
                //     $("#cbi-value-field4").show();
                //     $(this).siblings().hide();
                // }

                // if ($('.EncryptionType :selected').text() == 'No Encryption') {
                //     $('#cbi-value-field1').show();
                //     // document.getElementById("cbi-value-field1").style.display = "none";
                // }
                // if ($('.EncryptionType :selected').text() == 'WPA-PSK') {
                //     // $('.cbi-value-field').show();
                //     console.log(1);
                //     document.getElementById("cbi-value-field2").style.display = "block";
                // }
                // if ($('.EncryptionType :selected').text() == 'WPA2-PSK') {
                //     // $('.cbi-value-field').show();
                //     document.getElementById("cbi-value-field3").style.display = "block";
                // }
                // if ($('.EncryptionType :selected').text() == 'WPA-PSK/WPA2-PSK Mixed Mode') {
                //     // $('.cbi-value-field').show();
                //     document.getElementById("cbi-value-field4").style.display = "block";
                // }

                // var obj = document.getElementById("EncryptionType");
                // var index = obj.selectedIndex;
                // var text = obj.options[index].text;
                // console.log(text);

                // if (text == 'WPA-PSK') { $('.cbi-value-field').show(); }
                // if (text == 'WPA2-PSK') { $('.cbi-value-field').show(); }
                // if (text == 'WPA-PSK/WPA2-PSK Mixed Mode') { $('.cbi-value-field').show(); }
                // if (text == 'No Encryption') { $('.cbi-value-field').hide(); }
                // if ($('.EncryptionType :selected').text() == 'No Encryption') {
                //     $('.cbi-value-field').hide();
                // }
                // if ($('.EncryptionType :selected').text() == 'WPA-PSK') {
                //     $('.cbi-value-field').show();
                // }
                // if ($('.EncryptionType :selected').text() == 'No Encryption') {
                //     $('.cbi-value-field').hide();
                // } else if ($('.EncryptionType :selected').text() == 'WPA-PSK') {
                //     $('.cbi-value-field').show();
                // } else if ($('.EncryptionType :selected').text() == 'WPA2-PSK') {
                //     $('.cbi-value-field').show();
                // } else if ($('.EncryptionType :selected').text() == 'WPA-PSK/WPA2-PSK Mixed Mode') {
                //     $('.cbi-value-field').show();
                // }

            }




            // for (var i = 0; i < json.length; i++) {
            //     var option = document.createElement("option");
            //     $(option).val(json[i].hwmode);
            //     $(option).text(json[i].hwmode);
            //     $('.EncryptionType_00').append(option);
            // }

            //var options = $("#select_00 option: selected").val(); //获取选中的项
            //console.log(options);
            //var val00 = options.val(options); //拿到选中项的值
            //$("#select_00").val(val00);

            //$("#apn_00").val(json[0].phy_name);
            //$("#wifiChannel_00").val(json[0].channel);
            //$("#EncryptionType").val(json[0].)
            //$("#apn_01").val(json[1].phy_name);
            //$("#wifiChannel_01").val(json[1].channel);

            //$("#apn_02").val(json[2].phy_name);
            // $("#wifiChannel_02").val(json[2].channel);

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
            //var switch_goods_id = data.elem.attributes['switch_goods_id'].nodeValue;
            // console.log(switch_goods_id);
            var serverStatus = 1;
            if (serverStatus) {
                data.elem.checked = checked;
            } else {
                data.elem.checked = !checked;
            }
            form.render();
            // TODO
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
                        //$("#wn_name_01").html(res.result.sta_info[0].ssid)
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