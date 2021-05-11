webpackJsonp([11],{F2O0:function(e,t){},avMr:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a("bwfR"),i={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"Setup"},[a("div",{staticClass:"Setup-describe"},[e._v("\n    Your router's Wi-Fi access point allows other devices to connect to the\n    router's Wi-Fi\n  ")]),e._v(" "),a("div",{staticClass:"Wireless-c -flex-display -align-box -justify-box"},[a("span",{staticClass:"Wireless-l"},[e._v("Allow devices to connect to router access point:")]),e._v(" "),a("van-switch",{attrs:{"active-color":"#26b167","inactive-color":"#e0e0e0",size:"18px"},on:{change:e.swithChange},model:{value:e.APSwitch,callback:function(t){e.APSwitch=t},expression:"APSwitch"}})],1),e._v(" "),a("div",{staticClass:"Setup-title"},[e._v("Access point connection settings")]),e._v(" "),a("div",{staticClass:"Setup-describe"},[e._v("\n    Use these details when connecting a device to the router's Wi-Fi access\n    point\n  ")]),e._v(" "),a("div",{staticClass:"wireless"},[a("div",{staticClass:"prompt-row"},[a("label",{staticClass:"prompt-label"},[e._v("Access point name (SSID):")]),e._v(" "),a("div",{staticClass:"prompt-inp-c"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.ApName,expression:"ApName"}],staticClass:"prompt-input",attrs:{type:"text",placeholder:"My access point",disabled:!e.APSwitch},domProps:{value:e.ApName},on:{input:[function(t){t.target.composing||(e.ApName=t.target.value)},e.newBtnChange]}}),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:e.ApName.length>32,expression:"ApName.length > 32"}],staticClass:"Setup-describe1"},[e._v("\n          SSID cannot exceed 32 characters!\n        ")])])]),e._v(" "),a("div",{staticClass:"prompt-row",attrs:{id:"Ap_Passwrod_c"}},[a("label",{staticClass:"prompt-label"},[e._v("Password:")]),e._v(" "),a("div",{staticClass:"prompt-inp-c"},["checkbox"===e.APPasswordType?a("input",{directives:[{name:"model",rawName:"v-model",value:e.ApPasswrod,expression:"ApPasswrod"}],staticClass:"prompt-input",attrs:{disabled:!e.APSwitch,id:"Ap_Passwrod",type:"checkbox"},domProps:{checked:Array.isArray(e.ApPasswrod)?e._i(e.ApPasswrod,null)>-1:e.ApPasswrod},on:{input:e.newBtnChange,change:function(t){var a=e.ApPasswrod,s=t.target,i=!!s.checked;if(Array.isArray(a)){var n=e._i(a,null);s.checked?n<0&&(e.ApPasswrod=a.concat([null])):n>-1&&(e.ApPasswrod=a.slice(0,n).concat(a.slice(n+1)))}else e.ApPasswrod=i}}}):"radio"===e.APPasswordType?a("input",{directives:[{name:"model",rawName:"v-model",value:e.ApPasswrod,expression:"ApPasswrod"}],staticClass:"prompt-input",attrs:{disabled:!e.APSwitch,id:"Ap_Passwrod",type:"radio"},domProps:{checked:e._q(e.ApPasswrod,null)},on:{input:e.newBtnChange,change:function(t){e.ApPasswrod=null}}}):a("input",{directives:[{name:"model",rawName:"v-model",value:e.ApPasswrod,expression:"ApPasswrod"}],staticClass:"prompt-input",attrs:{disabled:!e.APSwitch,id:"Ap_Passwrod",type:e.APPasswordType},domProps:{value:e.ApPasswrod},on:{input:[function(t){t.target.composing||(e.ApPasswrod=t.target.value)},e.newBtnChange]}}),e._v(" "),a("span",{staticClass:"prompt-show",attrs:{id:"pwd_show"},on:{click:function(t){return t.stopPropagation(),e.showPassword(t)}}},[e._v(e._s("password"==e.APPasswordType?"SHOW":"HIDE"))]),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:e.ApPasswrod.length<8,expression:"ApPasswrod.length < 8"}],staticClass:"Setup-describe1"},[e._v("\n          Password should be at least 8 characters long\n        ")])])]),e._v(" "),a("div",{staticClass:"prompt-row"},[a("label",{staticClass:"prompt-label"},[e._v("Preferred Wi-Fi channel:")]),e._v(" "),a("div",{staticClass:"prompt-inp-c"},[a("select",{directives:[{name:"model",rawName:"v-model",value:e.channelSelected,expression:"channelSelected"}],staticClass:"prompt-select",attrs:{id:"channel_width",disabled:!e.APSwitch},on:{change:function(t){var a=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){return"_value"in e?e._value:e.value});e.channelSelected=t.target.multiple?a:a[0]}}},e._l(e.channelArr,function(t,s){return a("option",{key:s,domProps:{value:t.value}},[e._v(e._s(t.text))])}),0)])]),e._v(" "),a("div",{staticClass:"prompt-row"},[a("label",{staticClass:"prompt-label"},[e._v("Channel width:")]),e._v(" "),a("div",{staticClass:"prompt-inp-c"},[a("select",{directives:[{name:"model",rawName:"v-model",value:e.channelWidthSelected,expression:"channelWidthSelected"}],staticClass:"prompt-select",attrs:{id:"wifi_channel",disabled:!e.APSwitch},on:{change:function(t){var a=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){return"_value"in e?e._value:e.value});e.channelWidthSelected=t.target.multiple?a:a[0]}}},e._l(e.channelWidthArr,function(t,s){return a("option",{key:s,domProps:{value:t.value}},[e._v(e._s(t.text))])}),0)])]),e._v(" "),a("div",{staticClass:"prompt-row"},[a("label",{staticClass:"prompt-label"},[e._v("Encryption type:")]),e._v(" "),a("div",{staticClass:"prompt-inp-c"},[a("select",{directives:[{name:"model",rawName:"v-model",value:e.EncryptionSelected,expression:"EncryptionSelected"}],staticClass:"prompt-select",attrs:{id:"security",disabled:!e.APSwitch},on:{change:[function(t){var a=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){return"_value"in e?e._value:e.value});e.EncryptionSelected=t.target.multiple?a:a[0]},e.securityChnage]}},e._l(e.encryptionTypeArr,function(t,s){return a("option",{key:s,domProps:{value:t.value}},[e._v(e._s(t.text))])}),0)])])]),e._v(" "),a("div",{staticClass:"Setup-btn -flex-display"},[a("button",{staticClass:"btn cancle"},[e._v("Cancel")]),e._v(" "),a("button",{staticClass:"btn ok",attrs:{id:"APOk",disabled:e.saveDisabled},on:{click:function(t){return t.stopPropagation(),e.saveAp(t)}}},[e._v("\n      Save\n    ")])]),e._v(" "),a("van-overlay",{attrs:{show:e.maskShow,"z-index":"999"}},[a("div",{staticClass:"WaitingTime-c"},[e._v("\n      Waiting for changes to be applied...("+e._s(e.waitingTime)+"s)\n    ")])])],1)},staticRenderFns:[]};var n=function(e){a("F2O0")},r=a("VU/8")(s.a,i,!1,n,"data-v-14182376",null);t.default=r.exports},bwfR:function(e,t,a){"use strict";(function(e){a("UuFX");var s=a("J1XP"),i=(a("3gWi"),a("ZxCb")),n=a("nBqZ"),r=a("HTKX"),o=a("7+uW");o.a.use(i.a),o.a.use(s.a),o.a.prototype.$resultTip=r.a;var l=null;t.a={name:"Set-upWizard2",data:function(){return{toast:null,APSwitch:!0,ApName:"",ApPasswrod:"",APPasswordType:"password",channelSelected:"",channelArr:[{text:"0 auto",value:"0"},{text:"1 (2.412 GHz)",value:"1"},{text:"2 (2.417 GHz)",value:"2"},{text:"3 (2.422 GHz)",value:"3"},{text:"4 (2.427 GHz)",value:"4"},{text:"5 (2.432 GHz)",value:"5"},{text:"6 (2.437 GHz)",value:"6"},{text:"7 (2.442 GHz)",value:"7"},{text:"8 (2.447 GHz)",value:"8"},{text:"9 (2.452 GHz)",value:"9"},{text:"10 (2.457 GHz)",value:"10"},{text:"11 (2.462 GHz)",value:"11"}],EncryptionSelected:"No Encryption",encryptionTypeArr:[{text:"No Encryption",value:"0"},{text:"WPA-PSA",value:"1"},{text:"WPA2-PSA",value:"2"},{text:"WPA-PSK/WPA2-PSK Mixed",value:"3"}],channelWidthSelected:"",channelWidthArr:[{text:"20MHz",value:"1"},{text:"40MHz",value:"2"}],saveDisabled:!1,maskShow:!1,waitingTime:10}},mounted:function(){this.getSmartAP()},beforeDestroy:function(){clearTimeout(l)},methods:{getSmartAP:function(){var e=this;this.toast=this.utils.ToastMsg(2),Object(n.b)("GetWlanSettings",{}).then(function(t){if(e.toast.clear(),t.result&&t.result.wifi_config){var a=t.result.wifi_config;for(var s in a)e.ApName=a[s].vap_config[s].Ssid,e.ApPasswrod=a[s].vap_config[s].WpaKey,e.channelWidthSelected=a[s].HtMode,e.channelSelected=a[s].Channel,e.EncryptionSelected=a[s].vap_config[s].SecurityMode,0==a[s].PhyEnable?e.APSwitch=!1:e.APSwitch=!0}else t.error&&e.utils.ToastMsg(0,2e3,t.error.message)}).catch(function(t){e.toast.clear(),e.utils.DialogErr("Error message","Communication exception, please try again later!")})},saveAp:function(){var e=this;this.saveDisabled=!0;var t={wifi_config:[{PhyEnable:e.APSwitch,HtMode:e.channelWidthSelected,Channel:e.channelSelected,vap_config:[{Ssid:e.ApName,SecurityMode:e.EncryptionSelected,WpaKey:e.ApPasswrod}]}]};Object(n.b)("SetWlanSettings",t).then(function(t){t.result?(e.maskShow=!0,e.waitingTimerHandle()):t.error&&e.utils.ToastMsg(0,2e3,t.error.message)}).catch(function(t){e.utils.DialogErr("Error message","Communication exception, please try again later!")})},waitingTimerHandle:function(){var e=this;l=setInterval(function(){Number(e.waitingTime)<=1&&(e.maskShow=!1,this.waitingTime=10,e.$resultTip({resultMsg:"Changes saved"}),clearInterval(l)),e.waitingTime--},1e3)},showPassword:function(){"password"==this.APPasswordType?this.APPasswordType="text":this.APPasswordType="password"},newBtnChange:function(){this.ApName=this.utils.inputLimit(this.ApName),this.ApPasswrod=this.utils.inputLimit(this.ApPasswrod);var t=this.ApName.length,a=this.ApPasswrod.length;8<=a&&a<=64&&1<=t&&t<=32?(e("#APOk").prop("disabled",!1),e("#APOk").css("opacity","1")):(e("#APOk").prop("disabled",!0),e("#APOk").css("opacity","0.5"))},swithChange:function(e){console.log("APSwitch",this.APSwitch),0==e?e=0:1==e&&(e=1);var t=this,a={wifi_config:[{PhyEnable:e,HtMode:t.channelWidthSelected,Channel:t.channelSelected,vap_config:[{Ssid:t.ApName,SecurityMode:t.EncryptionSelected,WpaKey:t.ApPasswrod}]}]};Object(n.b)("SetWlanSettings",a).then(function(e){e.result||e.error&&t.utils.ToastMsg(0,2e3,e.error.message)}).catch(function(e){t.utils.DialogErr("Error message","Communication exception, please try again later!")})},securityChnage:function(t){"0"==t.target.value?(e("#Ap_Passwrod_c").hide(),e("#APOk").prop("disabled",!1)):(e("#Ap_Passwrod_c").show(),e("#APOk").prop("disabled",!0)),this.newBtnChange()}}}}).call(t,a("7t+N"))}});