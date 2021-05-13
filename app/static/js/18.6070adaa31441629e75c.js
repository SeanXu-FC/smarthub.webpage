webpackJsonp([18],{Sshd:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=s("nBqZ"),i=s("HTKX");s("7+uW").a.prototype.$resultTip=i.a;var o={name:"WlanComfiguration",data:function(){return{toast:null,IP1:"",IP2:"",netmask:"",gateway:"",startIp:"",endIp:"",leaseTime:0,modeArr:[{text:"Automatically (DHCP on)",value:"0"},{text:"Manually (DHCP off)",value:"2"},{text:"Manually (DHCP on)",value:"1"}],modeSelected:""}},mounted:function(){this.getSmartAP()},methods:{getSmartAP:function(){var e=this;this.toast=this.utils.ToastMsg(2),Object(a.b)("LanConfigure",{mode:3,ip_1:"",ip_2:"",netmask:"",gateway:"",start_ip:"",end_ip:"",lease_time:""}).then(function(t){e.toast.clear(),t.result?(e.modeSelected=t.result.mode,e.IP1=t.result.ip_1,e.IP2=t.result.ip_2,e.netmask=t.result.netmask,e.gateway=t.result.gateway,e.startIp=t.result.start_ip,e.endIp=t.result.end_ip,e.leaseTime=t.result.lease_time):t.error&&e.utils.ToastMsg(0,2e3,t.error.message)}).catch(function(t){e.toast.clear(),e.utils.DialogErr("Error message","Communication exception, please try again later!")})},btnSave:function(){console.log(this.modeSelected);var e=void 0;if(0==this.modeSelected)e={mode:0,ip_1:"",ip_2:"",netmask:"",gateway:"",start_ip:"",end_ip:"",lease_time:""},this.saveMode(e);else if(1==this.modeSelected){if(0==this.betweenNum(this.IP1))return void this.toastTip("IP address 1");if(0==this.betweenNum(this.netmask))return void this.toastTip("Subnet mask");if(0==this.betweenNum(this.gateway))return void this.toastTip("Gateway");if(0==this.betweenNum(this.startIp))return void this.toastTip("Start IP address");if(0==this.betweenNum(this.endIp))return void this.toastTip("End IP address");if(this.lease_time>43200)return void this.utils.ToastMsg(0,3e3,"Lease time cannot be greater than 43200s!");e={mode:1,ip_1:this.IP1,ip_2:"",netmask:this.netmask,gateway:this.gateway,start_ip:this.startIp,end_ip:this.endIp,lease_time:this.leaseTime},this.saveMode(e)}else if(2==this.modeSelected){if(0==this.betweenNum(this.IP1))return void this.toastTip("IP address 1");if(0==this.betweenNum(this.IP2))return void this.toastTip("IP address 2");if(0==this.betweenNum(this.netmask))return void this.toastTip("Subnet mask");if(0==this.betweenNum(this.gateway))return void this.toastTip("Gateway");e={mode:2,ip_1:this.IP1,ip_2:this.IP2,netmask:this.netmask,gateway:this.gateway,start_ip:"",end_ip:"",lease_time:""},this.saveMode(e)}},saveMode:function(e){var t=this;this.toast=this.utils.ToastMsg(2),Object(a.b)("LanConfigure",e).then(function(e){t.toast.clear(),e.result?t.$resultTip({resultMsg:"Changes saved"}):e.error&&t.utils.ToastMsg(0,2e3,e.error.message)}).catch(function(e){t.toast.clear(),t.utils.DialogErr("Error message","Communication exception, please try again later!")})},betweenNum:function(e){for(var t=!0,s=e.split("."),a=0;a<s.length;a++)if(Number(s[a])<0||255<Number(s[a])){t=!1;break}return t},toastTip:function(e){this.utils.ToastMsg(0,3e3,e+" Non compliance with specifications")},IPchange:function(){this.IP1=this.IP1.replace(/[^./0-9]/g,""),this.IP2=this.IP2.replace(/[^./0-9]/g,""),this.netmask=this.netmask.replace(/[^./0-9]/g,""),this.gateway=this.gateway.replace(/[^./0-9]/g,""),this.startIp=this.startIp.replace(/[^./0-9]/g,""),this.endIp=this.endIp.replace(/[^./0-9]/g,"")}}},n={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("div",{staticClass:"Setup"},[s("div",{staticClass:"prompt-row"},[s("div",{staticClass:"Setup-title"},[e._v("Configure IP:")]),e._v(" "),s("div",{staticClass:"prompt-inp-c"},[s("select",{directives:[{name:"model",rawName:"v-model",value:e.modeSelected,expression:"modeSelected"}],staticClass:"prompt-select",attrs:{id:"channel_width"},on:{change:function(t){var s=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){return"_value"in e?e._value:e.value});e.modeSelected=t.target.multiple?s:s[0]}}},e._l(e.modeArr,function(t,a){return s("option",{key:a,domProps:{value:t.value}},[e._v(e._s(t.text))])}),0)]),e._v(" "),s("div",{staticClass:"Setup-describe"},[e._v("\n        IP configuration is for advanced users and shouldn't be changed unless\n        for a specific reason. Changing from automatic configuration will\n        affect compatibility with Raymarine MFDs\n      ")])]),e._v(" "),s("div",{staticClass:"lan-config"},[s("div",{staticClass:"prompt-row"},[s("label",{staticClass:"prompt-label"},[e._v("IP address 1:")]),e._v(" "),s("div",{staticClass:"prompt-inp-c"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.IP1,expression:"IP1"}],staticClass:"prompt-input",class:0==e.modeSelected?"border-no":"",attrs:{type:"text",disabled:0==e.modeSelected},domProps:{value:e.IP1},on:{input:[function(t){t.target.composing||(e.IP1=t.target.value)},e.IPchange]}})])]),e._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:1!=e.modeSelected,expression:"modeSelected != 1"}],staticClass:"prompt-row"},[s("label",{staticClass:"prompt-label"},[e._v("IP address 2:")]),e._v(" "),s("div",{staticClass:"prompt-inp-c"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.IP2,expression:"IP2"}],staticClass:"prompt-input",class:0==e.modeSelected?"border-no":"",attrs:{type:"text",disabled:0==e.modeSelected},domProps:{value:e.IP2},on:{input:[function(t){t.target.composing||(e.IP2=t.target.value)},e.IPchange]}})])]),e._v(" "),s("div",{staticClass:"prompt-row"},[s("label",{staticClass:"prompt-label"},[e._v("Subnet mask:")]),e._v(" "),s("div",{staticClass:"prompt-inp-c"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.netmask,expression:"netmask"}],staticClass:"prompt-input",class:0==e.modeSelected?"border-no":"",attrs:{type:"text",disabled:0==e.modeSelected},domProps:{value:e.netmask},on:{input:[function(t){t.target.composing||(e.netmask=t.target.value)},e.IPchange]}})])]),e._v(" "),s("div",{staticClass:"prompt-row"},[s("label",{staticClass:"prompt-label"},[e._v("Gateway:")]),e._v(" "),s("div",{staticClass:"prompt-inp-c"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.gateway,expression:"gateway"}],staticClass:"prompt-input",class:0==e.modeSelected?"border-no":"",attrs:{type:"text",disabled:0==e.modeSelected},domProps:{value:e.gateway},on:{input:[function(t){t.target.composing||(e.gateway=t.target.value)},e.IPchange]}})])]),e._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:2!=e.modeSelected,expression:"modeSelected != 2"}],staticClass:"lan-title"},[e._v("DHCP server")]),e._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:2!=e.modeSelected,expression:"modeSelected != 2"}],staticClass:"prompt-row"},[s("label",{staticClass:"prompt-label"},[e._v("Start IP address:")]),e._v(" "),s("div",{staticClass:"prompt-inp-c"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.startIp,expression:"startIp"}],staticClass:"prompt-input",class:0==e.modeSelected?"border-no":"",attrs:{type:"text",disabled:0==e.modeSelected},domProps:{value:e.startIp},on:{input:[function(t){t.target.composing||(e.startIp=t.target.value)},e.IPchange]}})])]),e._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:2!=e.modeSelected,expression:"modeSelected != 2"}],staticClass:"prompt-row"},[s("label",{staticClass:"prompt-label"},[e._v("End IP address:")]),e._v(" "),s("div",{staticClass:"prompt-inp-c"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.endIp,expression:"endIp"}],staticClass:"prompt-input",class:0==e.modeSelected?"border-no":"",attrs:{type:"text",disabled:0==e.modeSelected},domProps:{value:e.endIp},on:{input:[function(t){t.target.composing||(e.endIp=t.target.value)},e.IPchange]}})])]),e._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:2!=e.modeSelected,expression:"modeSelected != 2"}],staticClass:"prompt-row"},[s("label",{staticClass:"prompt-label"},[e._v("DHCP lease time:")]),e._v(" "),s("div",{staticClass:"prompt-inp-c"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.leaseTime,expression:"leaseTime"}],staticClass:"time-input",class:0==e.modeSelected?"border-no":"",attrs:{type:"number",disabled:0==e.modeSelected},domProps:{value:e.leaseTime},on:{input:function(t){t.target.composing||(e.leaseTime=t.target.value)}}}),e._v(" "),s("span",{staticClass:"time-units"},[e._v("seconds")])])])])]),e._v(" "),s("div",{staticClass:"Setup-btn -flex-display"},[s("button",{staticClass:"btn cancle"},[e._v("Cancel")]),e._v(" "),s("button",{staticClass:"btn ok",attrs:{id:"APOk"},on:{click:function(t){return t.stopPropagation(),e.btnSave(t)}}},[e._v("\n      Save\n    ")])])])},staticRenderFns:[]};var r=s("VU/8")(o,n,!1,function(e){s("lm59")},"data-v-4478b06b",null);t.default=r.exports},lm59:function(e,t){}});