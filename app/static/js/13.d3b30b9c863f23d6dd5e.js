webpackJsonp([13],{"+fna":function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("sABp"),i={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("div",{staticClass:"Setup"},[s("div",{staticClass:"lan-config"},[s("div",{staticClass:"prompt-row"},[s("label",{staticClass:"prompt-label"},[t._v("IP address:")]),t._v(" "),s("div",{staticClass:"prompt-inp-c"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.IP1,expression:"IP1"}],staticClass:"prompt-input",attrs:{type:"text"},domProps:{value:t.IP1},on:{input:[function(e){e.target.composing||(t.IP1=e.target.value)},t.IPchange]}})])]),t._v(" "),s("div",{staticClass:"prompt-row"},[s("label",{staticClass:"prompt-label"},[t._v("Subnet mask:")]),t._v(" "),s("div",{staticClass:"prompt-inp-c"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.netmask,expression:"netmask"}],staticClass:"prompt-input",attrs:{type:"text"},domProps:{value:t.netmask},on:{input:[function(e){e.target.composing||(t.netmask=e.target.value)},t.IPchange]}})])]),t._v(" "),s("div",{staticClass:"prompt-row"},[s("label",{staticClass:"prompt-label"},[t._v("Gateway:")]),t._v(" "),s("div",{staticClass:"prompt-inp-c"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.gateway,expression:"gateway"}],staticClass:"prompt-input",attrs:{type:"text"},domProps:{value:t.gateway},on:{input:[function(e){e.target.composing||(t.gateway=e.target.value)},t.IPchange]}})])]),t._v(" "),s("div",{staticClass:"lan-title"},[t._v("DHCP server")]),t._v(" "),s("div",{staticClass:"prompt-row"},[s("label",{staticClass:"prompt-label"},[t._v("Start IP address:")]),t._v(" "),s("div",{staticClass:"prompt-inp-c"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.startIp,expression:"startIp"}],staticClass:"prompt-input",attrs:{type:"text"},domProps:{value:t.startIp},on:{input:[function(e){e.target.composing||(t.startIp=e.target.value)},t.IPchange]}})])]),t._v(" "),s("div",{staticClass:"prompt-row"},[s("label",{staticClass:"prompt-label"},[t._v("End IP address:")]),t._v(" "),s("div",{staticClass:"prompt-inp-c"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.endIp,expression:"endIp"}],staticClass:"prompt-input",attrs:{type:"text"},domProps:{value:t.endIp},on:{input:[function(e){e.target.composing||(t.endIp=e.target.value)},t.IPchange]}})])]),t._v(" "),s("div",{staticClass:"prompt-row"},[s("label",{staticClass:"prompt-label"},[t._v("DHCP lease time:")]),t._v(" "),s("div",{staticClass:"prompt-inp-c"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.leaseTime,expression:"leaseTime"}],staticClass:"time-input",attrs:{type:"number"},domProps:{value:t.leaseTime},on:{input:function(e){e.target.composing||(t.leaseTime=e.target.value)}}}),t._v(" "),s("span",{staticClass:"time-units"},[t._v("seconds")])])])])]),t._v(" "),s("div",{staticClass:"Setup-btn -flex-display"},[s("button",{staticClass:"btn cancle"},[t._v("Cancel")]),t._v(" "),s("button",{staticClass:"btn ok",attrs:{id:"APOk"},on:{click:function(e){return e.stopPropagation(),t.btnSave(e)}}},[t._v("\n      Save\n    ")])])])},staticRenderFns:[]};var n=function(t){s("fjFD")},r=s("VU/8")(a.a,i,!1,n,"data-v-3ab583b1",null);e.default=r.exports},fjFD:function(t,e){},sABp:function(t,e,s){"use strict";(function(t){var a=s("nBqZ"),i=s("HTKX");s("7+uW").a.prototype.$resultTip=i.a,e.a={name:"WlanComfiguration",data:function(){return{toast:null,IP1:"",netmask:"",gateway:"",startIp:"",endIp:"",leaseTime:0}},mounted:function(){this.getSmartAP(),/iphone/i.test(navigator.userAgent)||(t("input").on("focus",function(){t(".content").css({"padding-bottom":"4rem"})}),t("input").on("blur",function(){t(".content").css("padding-bottom","0.4rem")}))},methods:{getSmartAP:function(){var t=this;this.toast=this.utils.ToastMsg(2),Object(a.b)("GetLanSettings",{}).then(function(e){t.toast.clear(),e.result?(t.IP1=e.result.IPv4IPAddress,t.netmask=e.result.SubnetMask,t.gateway=e.result.LanGateWay,t.startIp=e.result.StartIPAddress,t.endIp=e.result.EndIPAddress,t.leaseTime=Number(e.result.DHCPLeaseTime)):e.error&&t.utils.ToastMsg(0,2e3,e.error.message)}).catch(function(e){t.toast.clear(),t.utils.DialogErr("Error message","Communication exception, please try again later!")})},btnSave:function(){var t;0!=this.betweenNum(this.IP1)?0!=this.betweenNum(this.netmask)?0!=this.betweenNum(this.gateway)?0!=this.betweenNum(this.startIp)?0!=this.betweenNum(this.endIp)?this.leaseTime>172800?this.utils.ToastMsg(0,3e3,"Lease time cannot be greater than 172800s!"):this.leaseTime<60?this.utils.ToastMsg(0,3e3,"Lease time must be greater than 60s!"):(t={IPv4IPAddress:this.IP1,SubnetMask:this.netmask,LanGateWay:this.gateway,StartIPAddress:this.startIp,EndIPAddress:this.endIp,DHCPLeaseTime:Number(this.leaseTime)},this.saveMode(t)):this.toastTip("End IP address"):this.toastTip("Start IP address"):this.toastTip("Gateway"):this.toastTip("Subnet mask"):this.toastTip("IP address 1")},saveMode:function(t){var e=this;this.toast=this.utils.ToastMsg(2),Object(a.b)("SetLanSettings",t).then(function(t){e.toast.clear(),t.result?e.$resultTip({resultMsg:"Changes saved"}):t.error&&e.utils.ToastMsg(0,2e3,t.error.message)}).catch(function(t){e.toast.clear(),e.utils.DialogErr("Error message","Communication exception, please try again later!")})},betweenNum:function(t){for(var e=!0,s=t.split("."),a=0;a<s.length;a++)if(Number(s[a])<0||255<Number(s[a])){e=!1;break}return e},toastTip:function(t){this.utils.ToastMsg(0,3e3,t+" Non compliance with specifications")},IPchange:function(){this.IP1=this.IP1.replace(/[^./0-9]/g,""),this.netmask=this.netmask.replace(/[^./0-9]/g,""),this.gateway=this.gateway.replace(/[^./0-9]/g,""),this.startIp=this.startIp.replace(/[^./0-9]/g,""),this.endIp=this.endIp.replace(/[^./0-9]/g,"")}}}}).call(e,s("7t+N"))}});