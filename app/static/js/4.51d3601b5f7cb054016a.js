webpackJsonp([4],{BYqz:function(e,s,t){"use strict";(function(e){t("Xrj1");var a=t("1nur"),A=t("nEPM"),i=t.n(A),o=t("Qfqm"),n=t.n(o),r=t("q6r7"),l=t.n(r),c=t("nBqZ");t("VTEy");t("7+uW").a.use(a.a),s.a={name:"SoftwareUpgrade",inject:["reload"],data:function(){return{tanhao:i.a,fileIcon:n.a,close:l.a,upDisable:!0,applicationVersion:"--",platformVersion:"--",bundleVersion:"--",percent:0,progressDis:!1,uploadStatus:!0,uploadName:"--",uploadSize:"--"}},mounted:function(){this.getVersion()},methods:{getVersion:function(){var e=this;this.toast=this.utils.ToastMsg(2),Object(c.b)("GetHubInfo",{}).then(function(s){e.toast.clear(),s.result?(e.applicationVersion=s.result.TotalVersion,e.platformVersion=s.result.PlatformVersion,e.bundleVersion=s.result.BundleVersion):s.error&&e.utils.ToastMsg(0,2e3,s.error.message)}).catch(function(s){e.toast.clear(),e.utils.DialogErr("Error message","Communication exception, please try again later!")})},handleFileChange:function(e){var s=this,t=this.$refs.inputer,a=t.files;console.log("filesArr",a);var A=t.files[0];s.uploadName=A.name,s.uploadSize=(A.size/1048576).toFixed(0);var i=[new File([a[0]],"upgrade.tar.bz2",{type:a[0].type})];console.log(i);var o=new FormData;Array.prototype.slice.call(i).forEach(function(e){o.append("file",e)}),o.append("mode","0");var n=new XMLHttpRequest;n.upload.onerror=function(){console.log("Upload fail！")},n.upload.onload=function(){console.log("上传成功")},s.progressDis=!0,n.upload.onprogress=function(e){var t=Math.floor(100*e.loaded/e.total);s.percent=Number(t)},n.open("post",s.utils.api+"/action/upload",!0),n.send(o),n.onreadystatechange=function(){if(4==n.readyState)if(200==n.status){var e=JSON.parse(n.response);0==e.code&&(s.uploadStatus=!1,s.upDisable=!1)}else s.progressDis=!1,s.utils.DialogErr("Upload fail！")}},toAgrade:function(){var s=this;s.upDisable=!0,e.ajax({url:s.utils.api+"/action/upload",type:"post",data:"mode=1",dataType:"json",contentType:"application/x-www-form-urlencoded;charset=utf-8",success:function(e){console.log(e),100==e.code&&(s.upDisable=!1,s.$router.push({path:"/Upgrading",query:{status:null,steps:null}}))}})},cancelUpload:function(){var s=this;e.ajax({url:s.utils.api+"/action/upload",type:"post",data:"mode=2",dataType:"json",contentType:"application/x-www-form-urlencoded;charset=utf-8",success:function(e){console.log(e),100==e.code&&s.reload()}})}}}}).call(s,t("7t+N"))},DBqB:function(e,s,t){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a=t("BYqz"),A={render:function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",{staticClass:"RestartReset"},[t("div",{staticClass:"Restart-describe -pt20 -mt10"},[t("span",{staticClass:"Restart-describe width170"},[e._v("Application version:")]),t("span",{staticClass:"Restart-describe"},[e._v(e._s(e.applicationVersion))])]),e._v(" "),t("div",{staticClass:"Restart-describe"},[t("span",{staticClass:"Restart-describe width170"},[e._v("Platform version:")]),t("span",{staticClass:"Restart-describe"},[e._v(e._s(e.platformVersion))])]),e._v(" "),t("div",{staticClass:"Restart-describe"},[t("span",{staticClass:"Restart-describe width170"},[e._v("Product bundle version:")]),t("span",{staticClass:"Restart-describe"},[e._v(e._s(e.bundleVersion))])]),e._v(" "),t("div",{staticClass:"file-c -mt30"},[e.uploadStatus?t("label",{staticClass:"file-label",attrs:{for:"fileinp"}},[t("span",{staticClass:"file-choose"},[e._v("Browse file to upload")]),e._v(" "),t("input",{ref:"inputer",attrs:{type:"file",id:"fileinp"},on:{change:e.handleFileChange}})]):t("div",{staticClass:"-flex-display -align-box"},[t("img",{attrs:{src:e.fileIcon}}),e._v(" "),t("div",{staticClass:"upload-name-c"},[t("p",{staticClass:"upload-name"},[e._v(e._s(e.uploadName))]),e._v(" "),t("span",{staticClass:"upload-size"},[e._v(e._s(e.uploadSize))]),e._v(" "),t("span",{staticClass:"upload-size"},[e._v("MB")])]),e._v(" "),t("img",{staticClass:"upload-img",attrs:{src:e.close},on:{click:e.cancelUpload}})])]),e._v(" "),e.progressDis?t("div",{staticClass:"-mt10"},[t("van-progress",{attrs:{percentage:e.percent}})],1):e._e(),e._v(" "),t("button",{staticClass:"btn-c",class:e.upDisable?"disable-btn":"",attrs:{disabled:e.upDisable},on:{click:function(s){return s.target!==s.currentTarget?null:e.toAgrade(s)}}},[e._v("\n    Upgrade\n  ")])])},staticRenderFns:[]};var i=function(e){t("pu+e")},o=t("VU/8")(a.a,A,!1,i,"data-v-ebe4329c",null);s.default=o.exports},Qfqm:function(e,s){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFMAAABTCAYAAADjsjsAAAAABHNCSVQICAgIfAhkiAAAA45JREFUeF7t20uoT1EUx/HvVUoeA/JIIYUiE6KETGSgZCRmEokSA6+EgZRHiTAhhBnyShlIFFMDAxPlMZMSkff71WL/67hd7tr3v/bp/t3fntz633XW2ftz1zl7n/89uw21MIG2sExKhDADi0CYwgwUCEylyhRmoEBgKlWmMAMFAlOpMoUZKBCYSpUpzECBwFSqTGEGCgSmUmUKM1AgMJUqs0UwRwE7gaGB/a2megZsBh4Vyp+dtmRl3gUmZPco74DHwGrgUt5hZaJLYn4DepXp9h9ZXwJzgVs1nOufp6gD8yOwG3gaNNiBwHagdyXfC2AVcBb4EXSe7DR1YL4GpgIPsnvX8QEjgftAn3a/tvMsAS4DdlXU3lod8w3wFhie5N4Ba4FjtUtC0f9ONu6ZJSvTJqB5aQIanQDfA8uAi8CXOlFbvTINcwQwFriSfpqfIW5L9+raPP8XTAObDJwCxie9z8BG4AjwqQ7R/wnTvAYD14BJCe9rmvl3CLNjAbus7wF9gSeVyacRPQ44DUxJH9i9+2C67G2yKtZasTJt5r4DDElLIHtctXVmtdmy6TowM334HdgPbCgm2aKz+QDgKjA9wVgVrkhLpKqVrUePA3PSOG0xfxTYBLwqgdqKlWkOVmF7KsVgX3acB2zdWW32lLQSGFT58AywGLD7aWhrVcz+wElgQRevrq3ArlDJLnbE24dSi/bG+W0Csst2PmCXfk5hWBUv9A7EG5fTAW/ORlxpTDuPfSs1MS2F7AnIJp6/jWk2MC11Tpi5f8128XuB9cJsUjEdLswYx19ZhCnM3wJ1TEA51qrMHK1OYoUpTF3mgTUgTGE2K9Dqj5M549cElKOl2TxQS5jCdAnoCcjF5AsSps/JFSVMF5MvSJg+J1eUMF1MviBh+pxcUcJ0MfmChOlzckUJ08XkCxKmz8kVJUwXky9ImD4nV1R3w9wHrEs9Pwcsco0iI6gnfTl8AliabOy9zeUZTq7QnoI5DLhR2ctpe4UOuIQygurCnAE8zOhXVKiNbxZwCBiT3pCz7Ye249h2BYe2OjBDO9xksg/pTbjDTebp8PCSmLazoV+JTjeR017d3lJqb2VJTLvZr0lv9TYx/qYOtV0Wz4HbwAXgZlPZOjm4JGbJfnfL3MIM/LMIU5iBAoGpVJnCDBQITKXKFGagQGAqVaYwAwUCU6kyhRkoEJhKlSnMQIHAVKrMQMyf/q0XY9faIlAAAAAASUVORK5CYII="},nEPM:function(e,s){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAgCAYAAACcuBHKAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAIRSURBVFhH7Va7SsRAFLWwsLQQtLS3sLD1DywtLP0ICws/wsLCYpUFRbBRBBtFUWQLRexE8VHYiA8sRJfdZJNNxjk3mWySvXlMorjFHjgMkzP3zmE2ZzYDogfQN6FQyITbNoR5PCua1SEaMS+DQiasqyXRrAyI5pqkHDEvA20TzvcTnQAZUJRzPC8KbROtk7nOKSjKOZ4XhZYJ57UmGnEDIUIvAi0Txt4Uu7ki9CLIbcK+r3Y23BoTrbP5gJgrDet0kcuEa37KjUaDjcz9aV/xgLnSsM616r6SD7lMWJeLkXfB2B73FQ+YKw3rsF4HmSacr8fuSG6O+KoHzCM6Iivr8iLTBN2MTCLCiGtYj7q8SDXRfjlNjKRrfNAajJyOOtTnQbIJxxbG7iS7AejWvRsSI6eDqEefLCSasO8q7M+g6Lyf0zrnrcbqRFmPPllgTVAk5cvW4Br7dPyjbj8fsTpI9Yis7JcG1oR1sZB6CqD94F1KGDk9oOyTFdkuExTJ9UG+YYhojNPAyOkRyn5pke0yYR7O8I1KEn2TEDGB3zftX7IMKbKyP4eOCURyZ4JtwNG+XaUa+2aF1TmiPxfZwASaZr2MYQaQ35eczlL2J/MxUDeK5MYwX5hAyr/mSRBl9OORJRP29bLWKZQiTkPuF0ZgIu1i+k1iH9YEPkLMg7+JZpzYJ/7RE3rD/g99Ewo9YEKIHwCxXUuqtfT5AAAAAElFTkSuQmCC"},"pu+e":function(e,s){},q6r7:function(e,s){e.exports="data:image/png;base64,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"}});