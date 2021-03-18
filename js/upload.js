var frequency = 0;
 $(function() {
        getVersion();

        $("#fileUpload").change(function () {         
                var files=document.getElementById("fileUpload").files;
                console.log(files)
                 toUploading(files);
        })

            var box = document.querySelector('#upload');

            //只要鼠标拖拽悬停在该区域就会触发
            box.addEventListener('dragover', function(e) {
                e.preventDefault(); //注意，如果dragover不阻止默认事件，drop事件就不会触发
                console.log('dragover');
            }, false);
            //鼠标拖拽释放
            box.addEventListener('drop', function(e) {
                e.preventDefault(); //浏览器默认会打开该文件，因此停掉该默认事件
                //选中的文件
                var files = e.dataTransfer.files;
                toUploading(files);
                
            }, false);

        $("#upgrade").on("click", function() {
            var has = $(this).hasClass("disable-btn");
            if (has) {
                return;
            } else {
                toUpgrade();
            }
        })
  
    })
function toUploading(files){
         layui.use(['layer', 'element', 'form', 'upload'], function() {
            var layer = layui.layer,
                element = layui.element,
                form = layui.form;
        var formData = new FormData();

                Array.prototype.slice.call(files).forEach(function(file) {
                    formData.append('file', file);
                });
                formData.forEach(function (value, key) {
                if (value instanceof File) {
                       formData.set(key, value, value.name.replace(/ /g, ''))
                   }
                })
                formData.append("mode", "0");
                console.log(formData);
                var xhr = new XMLHttpRequest();
                xhr.upload.onerror = function(error) {
                    console.log(error)
                    layer.msg("Upload fail！");
                }
                xhr.upload.onload = function() {
                    console.log('上传成功');
                }
                $("#upload_progress").removeClass("layui-hide");
                xhr.upload.onprogress = function(e) {
                    var value = Math.floor(100 * e.loaded / e.total);
                    element.progress('upload_progress', value + '%') //设置页面进度条
                    $("#upgrade").prop("disabled", true);
                }
                xhr.open('post', '/action/upload', true);
                xhr.send(formData);
                xhr.onreadystatechange = state_Change;

                function state_Change() {
                    console.log("xhr",xhr)
                    if (xhr.readyState == 4) { // 4 = "loaded"
                        if (xhr.status == 200) { // 200 = OK
                            var resObj = JSON.parse(xhr.response)
                            if (resObj.code == 0) {
                                layer.msg("Upload successful！");
                                $("#upgrade").removeClass("disable-btn");
                                console.log(resObj)
                                $("#version").html(resObj.id);
                            } else {
                                layer.msg("Upload fail:" + msg);
                            }
                        } else {
                            layer.msg("Upload fail！");
                        }
                    }
                }
         })
    }
    function getVersion() {
        var data = {
            "jsonrpc": "2.0",
            "method": "GetHubInfo",
            "params": {

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
                if (res.result) {
                    $("#version").html(res.result.TotalVersion);
                    $("#Platform_version").html(res.result.PlatformVersion ? res.result.PlatformVersion :
                        "--");
                    $("#Product_version").html(res.result.BundleVersion);
                } else if (res.error) {
                    layui.use(['form', 'layer'], function() {
                        var layer = layui.layer;
                        layer.msg("An error occurred：" + res.error.message);
                    })
                }
            },
            error: function(jqXHR) {
                console.log(JSON.stringify(jqXHR))
            frequency++;
            if (frequency < 3) {
                setTimeout(() => {
                    getVersion();
                }, 5000);
            } else {
                frequency = 0;
                var tip = '<div style="padding: 20px;text-align: center;word-wrap:break-word;">Abnormal communication!</div>';
                promptMessage("Error message", tip);
            }
            }
        });
    }
function toUpgrade() {
    $.ajax({
        url: "/action/upload",
        type: "post",
        data: "mode=1",
        dataType: "json",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        success: function(res) {
            console.log(res)
            if (res.code == 100) {
                var domain = window.location.host;
                window.location.href = ('https:' == document.location.protocol ? 'https://' : 'http://') + domain + "/flashops.html";
            } else {

            }
        }
    })
}