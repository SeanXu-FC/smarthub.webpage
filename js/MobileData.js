$(function() {
    var data = {
        "jsonrpc": "2.0",
        "method": "lte_get_status",
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
            //console.log(res.result)
            var json = res.result;

            if (json == '' || json == undefined || json == null || json.length < 1) return;

            if (json.moblie_data == -1 && json.roam_data == -1 && json.auo_switch == 255) {

                $('#provider1').text(json.sim[0].provider);
                $('#sim_imsi1').text(json.sim[0].imsi);
                $('#sim_tele_num1').text(json.sim[0].phonenum);
                $('#sim_puk_num1').text(json.sim[0].pincode);

                $('#provider2').text(json.sim[1].provider);
                $('#sim_imsi2').text(json.sim[1].imsi);
                $('#sim_tele_num2').text(json.sim[1].phonenum);
                $('#sim_puk_num2').text(json.sim[1].pincode);

            }
            var SIMArr = ['SIM1', 'SIM2'];
            if (json.active_sim == 0) {
                $('#SIM option:selected').text(SIMArr[0]);
                $('#SIM option[value=0]').attr("selected", "selected");

                //console.log('SIM1')
            } else {
                $('#SIM option:selected').text(SIMArr[1]);
                $('#SIM option[value=1]').attr("selected", "selected");
                //console.log('SIM2')
            }


        },
        error: function(jqXHR) {
            alert("An error occurred：" + jqXHR.status);

        }
    });

});