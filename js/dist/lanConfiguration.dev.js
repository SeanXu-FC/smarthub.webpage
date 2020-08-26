"use strict";

$(function () {
  //$(":disabled");
  var map = {
    "Raymarine auto": "d1",
    "Static IP": "d2",
    "DHCP server": "d3"
  }; // 方法1：
  // $("#rsd").bind("change", function() {
  //     var divId = map[this.value];
  //     $("#" + divId).show().siblings().hide();
  //     $("#" + divId).eq(0).slideDown();;
  //     $("#ipMode").slideDown();
  //     $("#btn").slideDown();
  // });
  // $('#rsd').each(function() {
  //     if ($(this).find("option:selected")) {
  //         var _thisVal = $(this).find('option').val();
  //         console.log(this.value);
  //         oldVal = $(this).attr("value", _thisVal);
  //         console.log(oldVal);
  //         $('#rsd option').find('option[value=" + _thisVal + "]').not("option[value=0]").hide()
  //     }
  // })
  //方法2：

  $('#rsd').change(function () {
    if ($(this).find("option:selected")) {
      var _thisVal = $(this).find('option').val(); //console.log(this.value);


      oldVal = $(this).attr("value", _thisVal); //console.log(oldVal);

      $('#rsd option').find('option[value=" + _thisVal + "]').not("option[value=0]").hide();
      var divId = map[this.value];
      $("#" + divId).show().siblings().hide();
      $("#" + divId).eq(0).slideDown();
      $("#ipMode").slideDown();
      $("#btn").slideDown();
    }
  });
  $("#d1 input,#btn button").prop("disabled", true);
  $("#edit").click(function () {
    $("#d1 input").removeAttr("disabled");
    return false;
  }); // $("#edit").trigger("click");

  $("#content").mouseenter(function () {
    //$('#edit').removeAttr("disabled");
    $('#edit').prop("disabled", false);
    $('#save').prop("disabled", false);
  }); // var InputName1 = $("#InputName1").val();
  // var InputName2 = $("#InputName2").val();
  // var InputName3 = $("#InputName3").val();
  // var InputName5 = $("#InputName4").val();
  // $("#InputName1").blur(function() {
  //     console.log($("#InputName1").val())
  // });
  //判断ip地址的合法性
  // function checkIP(value) {
  //     obj = document.getElementById("InputName1").value;
  //     var exp = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
  //     var reg = obj.match(exp);
  //     if (reg == null) {
  //         alert("请输入IP地址！");
  //     } else {
  //         console.log("IP地址合法！");
  //     }
  // }
  // function checkIP(value) {
  //     var exp = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
  //     var reg = value.match(exp);
  //     if (reg == null) {
  //         alert("开始的IP地址不合法！");
  //         return false;
  //     }
  // }
  // function check() {
  //     str = document.getElementById("InputName1").value;
  //     str = str.match(/(\d+)\.(\d+)\.(\d+)\.(\d+)/g);
  //     if (str == null) {
  //         alert("输入不能为空");
  //         return false;
  //     } else if (RegExp.$1 > 255 || RegExp.$2 > 255 || RegExp.$3 > 255 || RegExp.$4 > 255) {
  //         alert("你输入的IP地址无效");
  //         return false;
  //     } else {
  //         alert("你输入的IP地址有效");
  //         return true;
  //     }
  // }
  // check()

  $("#save").click(function () {
    var ipAddress1 = document.getElementById("InputName1").value;
    var ipAddress2 = document.getElementById("InputName2").value;
    var ipAddress3 = document.getElementById("InputName3").value;
    var ipAddress4 = document.getElementById("InputName4").value;
    var re = /^([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])$/;

    if (!re.test(ipAddress1)) {
      alert("ip地址格式不正确，请修改");
      return false;
    }

    if (!re.test(ipAddress2)) {
      alert("ip地址格式不正确，请修改");
      return false;
    }

    if (!re.test(ipAddress3)) {
      alert("ip地址格式不正确，请修改");
      return false;
    }

    if (!re.test(ipAddress4)) {
      alert("ip地址格式不正确，请修改");
      return false;
    }
  }); //checkIP(InputName1)
});