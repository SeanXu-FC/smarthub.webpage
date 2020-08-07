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

                str += '<tr><td>Preferred Wi-Fi channel:</td><td><select name="type" class="form-control select_00 channel" style="width:40%"><option value="' + json[index].channel + '"></option><option value="0">auto</option><option value="1">1 (2.412 GHz)</option><option value="2">2 (2.417 GHz)</option><option value="3">3 (2.422 GHz)</option><option value="4">4 (2.427 GHz)</option><option value="5">5 (2.432 GHz)</option><option value="6">6 (2.437 GHz)</option><option value="7">7 (2.442 GHz)</option><option value="8">8 (2.447 GHz)</option><option value="9">9 (2.452 GHz)</option><option value="10">10 (2.457 GHz)</option><option value="11">11 (2.462 GHz)</option></select></td></tr>';
                str += '<tr><td>Mode:</td><td><select name="type" class="form-control select_01 mode" style="width:40%"><option value="' + json[index].hwmode + '"></option><option value="1">1 (802.11b)</option><option value="2">2 (802.11g)</option><option value="3">3 (802.11g+n)</option></select></td></tr>';
                str += '<tr><td>Encryption type:</td><td><select name="type" id="EncryptionType" class="form-control select_02 EncryptionType" style="width:40%"><option value="0">' + json[index].vap_config[index].SecurityMode + '</option><option value="0">No Encryption</option><option value="1">WEP</option><option value="2">WPA-PSK</option><option value="3">WPA2-PSK</option><option value="4">psk-mixed</option></select></td></tr>';
                str += '<tr><td>Password:</td><td><input type="password" class="form-control pwd" value="' + json[index].vap_config[index].WpaKey + '" style="width:40%"><span id="eye" onclick="change()">SHOW</span></td></tr>';
                str += '<tr><td>country Code:</td><td><select name="type" class="form-control select_03 countryCode" style="width:40%"><option value="00" >00 - World</option><option id="cbi-wireless-wifi0-country-AE" value="AE">AE - United Arab Emirates</option><option id="cbi-wireless-wifi0-country-AL" value="AL">AL - Albania</option><option id="cbi-wireless-wifi0-country-AM" value="AM">AM - Armenia</option><option id="cbi-wireless-wifi0-country-AR" value="AR">AR - Argentina</option><option id="cbi-wireless-wifi0-country-AT" value="AT">AT - Austria</option><option id="cbi-wireless-wifi0-country-AU" value="AU">AU - Australia</option><option id="cbi-wireless-wifi0-country-AZ" value="AZ">AZ - Azerbaijan</option><option id="cbi-wireless-wifi0-country-BE" value="BE">BE - Belgium</option><option id="cbi-wireless-wifi0-country-BG" value="BG">BG - Bulgaria</option><option id="cbi-wireless-wifi0-country-BH" value="BH">BH - Bahrain</option><option id="cbi-wireless-wifi0-country-BN" value="BN">BN - Brunei Darussalam</option><option id="cbi-wireless-wifi0-country-BO" value="BO">BO - Bolivia</option><option id="cbi-wireless-wifi0-country-BR" value="BR">BR - Brazil</option><option id="cbi-wireless-wifi0-country-BY" value="BY">BY - Belarus</option><option id="cbi-wireless-wifi0-country-BZ" value="BZ">BZ - Belize</option><option id="cbi-wireless-wifi0-country-CA" value="CA">CA - Canada</option><option id="cbi-wireless-wifi0-country-CH" value="CH">CH - Switzerland</option><option id="cbi-wireless-wifi0-country-CL" value="CL">CL - Chile</option><option id="cbi-wireless-wifi0-country-CN" value="CN">CN - China</option><option id="cbi-wireless-wifi0-country-CO" value="CO">CO - Colombia</option><option id="cbi-wireless-wifi0-country-CR" value="CR">CR - Costa Rica</option><option id="cbi-wireless-wifi0-country-CY" value="CY">CY - Cyprus</option><option id="cbi-wireless-wifi0-country-CZ" value="CZ">CZ - Czech Republic</option><option id="cbi-wireless-wifi0-country-DE" value="DE">DE - Germany</option><option id="cbi-wireless-wifi0-country-DK" value="DK">DK - Denmark</option><option id="cbi-wireless-wifi0-country-DO" value="DO">DO - Dominican Republic</option><option id="cbi-wireless-wifi0-country-DZ" value="DZ">DZ - Algeria</option><option id="cbi-wireless-wifi0-country-EC" value="EC">EC - Ecuador</option><option id="cbi-wireless-wifi0-country-EE" value="EE">EE - Estonia</option><option id="cbi-wireless-wifi0-country-EG" value="EG">EG - Egypt</option><option id="cbi-wireless-wifi0-country-ES" value="ES">ES - Spain</option><option id="cbi-wireless-wifi0-country-FI" value="FI">FI - Finland</option><option id="cbi-wireless-wifi0-country-FO" value="FO">FO - Faroe Islands</option><option id="cbi-wireless-wifi0-country-FR" value="FR">FR - France</option><option id="cbi-wireless-wifi0-country-GB" value="GB">GB - United Kingdom</option><option id="cbi-wireless-wifi0-country-GE" value="GE">GE - Georgia</option><option id="cbi-wireless-wifi0-country-GR" value="GR">GR - Greece</option><option id="cbi-wireless-wifi0-country-GT" value="GT">GT - Guatemala</option><option id="cbi-wireless-wifi0-country-HK" value="HK">HK - Hong Kong</option><option id="cbi-wireless-wifi0-country-HN" value="HN">HN - Honduras</option><option id="cbi-wireless-wifi0-country-HR" value="HR">HR - Croatia</option><option id="cbi-wireless-wifi0-country-HU" value="HU">HU - Hungary</option><option id="cbi-wireless-wifi0-country-ID" value="ID">ID - Indonesia</option><option id="cbi-wireless-wifi0-country-IE" value="IE">IE - Ireland</option><option id="cbi-wireless-wifi0-country-IL" value="IL">IL - Israel</option><option id="cbi-wireless-wifi0-country-IN" value="IN">IN - India</option><option id="cbi-wireless-wifi0-country-IQ" value="IQ">IQ - Iraq</option><option id="cbi-wireless-wifi0-country-IR" value="IR">IR - Iran</option><option id="cbi-wireless-wifi0-country-IS" value="IS">IS - Iceland</option><option id="cbi-wireless-wifi0-country-IT" value="IT">IT - Italy</option><option id="cbi-wireless-wifi0-country-JM" value="JM">JM - Jamaica</option><option id="cbi-wireless-wifi0-country-JO" value="JO">JO - Jordan</option><option id="cbi-wireless-wifi0-country-JP" value="JP">JP - Japan</option><option id="cbi-wireless-wifi0-country-KE" value="KE">KE - Kenya</option><option id="cbi-wireless-wifi0-country-KP" value="KP">KP - North Korea</option><option id="cbi-wireless-wifi0-country-KR" value="KR">KR - South Korea</option><option id="cbi-wireless-wifi0-country-KW" value="KW">KW - Kuwait</option><option id="cbi-wireless-wifi0-country-KZ" value="KZ">KZ - Kazakhstan</option><option id="cbi-wireless-wifi0-country-LB" value="LB">LB - Lebanon</option><option id="cbi-wireless-wifi0-country-LI" value="LI">LI - Liechtenstein</option><option id="cbi-wireless-wifi0-country-LT" value="LT">LT - Lithuania</option><option id="cbi-wireless-wifi0-country-LU" value="LU">LU - Luxembourg</option><option id="cbi-wireless-wifi0-country-LV" value="LV">LV - Latvia</option><option id="cbi-wireless-wifi0-country-LY" value="LY">LY - Libyan Arab Jamahiriya</option><option id="cbi-wireless-wifi0-country-MA" value="MA">MA - Morocco</option><option id="cbi-wireless-wifi0-country-MC" value="MC">MC - Monaco</option><option id="cbi-wireless-wifi0-country-MK" value="MK">MK - Macedonia</option><option id="cbi-wireless-wifi0-country-MO" value="MO">MO - Macao</option><option id="cbi-wireless-wifi0-country-MX" value="MX">MX - Mexico</option><option id="cbi-wireless-wifi0-country-MY" value="MY">MY - Malaysia</option><option id="cbi-wireless-wifi0-country-NI" value="NI">NI - Nicaragua</option><option id="cbi-wireless-wifi0-country-NL" value="NL">NL - Netherlands</option><option id="cbi-wireless-wifi0-country-NO" value="NO">NO - Norway</option><option id="cbi-wireless-wifi0-country-NZ" value="NZ">NZ - New Zealand</option><option id="cbi-wireless-wifi0-country-OM" value="OM">OM - Oman</option><option id="cbi-wireless-wifi0-country-PA" value="PA">PA - Panama</option><option id="cbi-wireless-wifi0-country-PE" value="PE">PE - Peru</option><option id="cbi-wireless-wifi0-country-PH" value="PH">PH - Philippines</option><option id="cbi-wireless-wifi0-country-PK" value="PK">PK - Pakistan</option><option id="cbi-wireless-wifi0-country-PL" value="PL">PL - Poland</option><option id="cbi-wireless-wifi0-country-PR" value="PR">PR - Puerto Rico</option><option id="cbi-wireless-wifi0-country-PT" value="PT">PT - Portugal</option><option id="cbi-wireless-wifi0-country-PY" value="PY">PY - Paraguay</option><option id="cbi-wireless-wifi0-country-QA" value="QA">QA - Qatar</option><option id="cbi-wireless-wifi0-country-RO" value="RO">RO - Romania</option><option id="cbi-wireless-wifi0-country-RU" value="RU">RU - Russian Federation</option><option id="cbi-wireless-wifi0-country-SA" value="SA">SA - Saudi Arabia</option><option id="cbi-wireless-wifi0-country-SE" value="SE">SE - Sweden</option><option id="cbi-wireless-wifi0-country-SG" value="SG">SG - Singapore</option><option id="cbi-wireless-wifi0-country-SI" value="SI">SI - Slovenia</option><option id="cbi-wireless-wifi0-country-SK" value="SK">SK - Slovakia</option><option id="cbi-wireless-wifi0-country-SV" value="SV">SV - El Salvador</option><option id="cbi-wireless-wifi0-country-SY" value="SY">SY - Syrian Arab Republic</option><option id="cbi-wireless-wifi0-country-TH" value="TH">TH - Thailand</option><option id="cbi-wireless-wifi0-country-TN" value="TN">TN - Tunisia</option><option id="cbi-wireless-wifi0-country-TR" value="TR">TR - Turkey</option><option id="cbi-wireless-wifi0-country-TT" value="TT">TT - Trinidad and Tobago</option><option id="cbi-wireless-wifi0-country-TW" value="TW">TW - Taiwan</option><option id="cbi-wireless-wifi0-country-UA" value="UA">UA - Ukraine</option><option id="cbi-wireless-wifi0-country-US" value="US">US - United States</option><option id="cbi-wireless-wifi0-country-UY" value="UY">UY - Uruguay</option><option id="cbi-wireless-wifi0-country-UZ" value="UZ">UZ - Uzbekistan</option><option id="cbi-wireless-wifi0-country-VE" value="VE">VE - Venezuela</option><option id="cbi-wireless-wifi0-country-VN" value="VN">VN - Viet Nam</option><option id="cbi-wireless-wifi0-country-YE" value="YE">YE - Yemen</option><option id="cbi-wireless-wifi0-country-ZA" value="ZA">ZA - South Africa</option><option id="cbi-wireless-wifi0-country-ZW" value="ZW">ZW - Zimbabwe</option></select></td></tr>';
                str += ' <tr><td></td><td><div class="form-group form-line"><button type="reset" class="btn layui-btn">Cancel</button><button type="button" id="btn1" class="btn layui-btn" onclick="save()">Save</button></div></td></tr>';
                str += '</table>';
                str += '</ul>';
                str += '</form>';


            }
            $("#tab").html(str0);
            $("#content").html(str);


            for (var i = 0; i < json.length; i++) {
                var option = document.createElement("option");
                $(option).val(json[i].channel).attr("selected", "selected");
                $(option).text(json[i].channel);
                //console.log($(option).text(json[i].channel))

                $('.select_00').append(option);
                $('.select_01').append(option);
                $('.select_02').append(option);
                $('.select_03').append(option);
                //console.log(text);
                if ($('.channel option:selected').val() == 1) {
                    $('.channel option:selected').text('1 (2.412 GHz)');
                } else if ($('.channel option:selected').val() == 2) {
                    $('.channel option:selected').text('2 (2.417 GHz)');
                } else if ($('.channel option:selected').val() == 3) {
                    $('.channel option:selected').text('3 (2.422 GHz)');
                } else if ($('.channel option:selected').val() == 4) {
                    $('.channel option:selected').text('4 (2.427 GHz');
                } else if ($('.channel option:selected').val() == 5) {
                    $('.channel option:selected').text('5 (2.432 GHz)');
                } else if ($('.channel option:selected').val() == 6) {
                    $('.channel option:selected').text('6 (2.437 GHz)');
                } else if ($('.channel option:selected').val() == 7) {
                    $('.channel option:selected').text('7 (2.442 GHz)');
                } else if ($('.channel option:selected').val() == 8) {
                    $('.channel option:selected').text('8 (2.447 GHz)');
                } else if ($('.channel option:selected').val() == 9) {
                    $('.channel option:selected').text('9 (2.452 GHz)');
                } else if ($('.channel option:selected').val() == 10) {
                    $('.channel option:selected').text('10 (2.457 GHz)');
                } else if ($('.channel option:selected').val() == 11) {
                    $('.channel option:selected').text('11 (2.462 GHz)');
                } else {
                    $('.channel option:selected').text('auto');
                }
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

                $(option).val(json[i].hwmode).attr("selected", "selected");
                $(option).text(json[i].hwmode);
                var modeArr = ['auto', '1 (802.11b)', '2 (802.11g)', '3 (802.11g+n)'];
                if ($('.mode option:selected').val() == 3) {
                    $('.mode option:selected').text(modeArr[3]);
                } else if ($('.mode option:selected').val() == 2) {
                    $('.mode option:selected').text(modeArr[2]);
                } else if ($('.mode option:selected').val() == 1) {
                    $('.mode option:selected').text(modeArr[1]);
                } else {
                    $('.mode option:selected').text(modeArr[0]);
                }
                // if ($('.mode option:selected').val() == 3) {
                //     $('.mode option:selected').text('3 (802.11g+n)');
                // } else if ($('.mode option:selected').val() == 2) {
                //     $('.mode option:selected').text('2 (802.11g)');
                // } else if ($('.mode option:selected').val() == 1) {
                //     $('.mode option:selected').text('1 (802.11b)');
                // } else {
                //     $('.mode option:selected').text('auto');
                // }

                var SecurityMode = json[i].vap_config[i].SecurityMode;
                $(option).val(json[i].vap_config[i].SecurityMode).attr("selected", "selected");
                //console.log(json[i].vap_config[i].SecurityMode);
                //var index = $('.EncryptionType').get(0).selectedIndex;
                // var index = $('.EncryptionType').index();
                // console.log(index);

                if (SecurityMode == 2) {
                    $('.EncryptionType option:selected').text('WPA-PSA');
                } else if (SecurityMode == 3) {
                    $('.EncryptionType option:selected').text('WPA2-PSA');
                } else if (SecurityMode == 4) {
                    $('.EncryptionType option:selected').text('psk-mixed');
                } else if (SecurityMode == 1) {
                    $('.EncryptionType option:selected').text('WEP');
                } else {
                    $('.EncryptionType option:selected').text('No Encryption');
                }

                //var arrCountryCode = []
                var CountryCode = json[i].CountryCode;
                $(option).val(json[i].countryCode).attr("selected", "selected");
                if (CountryCode == 'ZW') {
                    $('.countryCode option:selected').text('ZW');
                }

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