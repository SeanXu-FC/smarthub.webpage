webpackJsonp([18],{C3RE:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});e("cZ0s");var i=e("fIxc"),o=(e("3gWi"),e("ZxCb")),l=e("nBqZ"),n=e("XS/3"),s=e("7+uW");s.a.use(o.a),s.a.use(i.a);var r={name:"ChannelConfiguration",components:{prompt:n.a},data:function(){return{toast:null,oldData:{},ChannelArr:[],LowVoltage:{LowVoltWarning:0,LowVoltValue:"--"},LowNotifySwitch:0,lowVoltVal:0,lowVoltegePrompt:!1,ChannelName:"",EditPrompt:!1,alertId:null,EditChannel:{},channelSelected:0,voltType:0,voltVal:0,notifyVal:"",characters:256,notifySwitch:!0,Wake_fun:!0,dataId:0}},mounted:function(){this.getData()},methods:{getData:function(){var t=this;this.toast=this.utils.ToastMsg(2),Object(l.b)("IoConfigure",{mode:"0"}).then(function(a){if(t.toast.clear(),a.result&&a.result.io_date){t.oldData=a.result,t.LowVoltage.LowVoltValue=a.result.LowVoltValue,t.lowVoltVal=a.result.LowVoltValue,t.LowVoltage.LowVoltWarning=a.result.LowVoltWarning,t.LowNotifySwitch=a.result.LowVoltWarning;for(var e=a.result.io_date,i=(parseInt(e.length/2),[]),o=0;o<4;o++)1==e[o].types?e[o].Switch=!0:0==e[o].types&&(e[o].Switch=!1),i.push(e[o]);t.ChannelArr=i,console.log(t.ChannelArr)}else a.error&&t.utils.ToastMsg(0,2e3,a.error.message)}).catch(function(a){t.toast.clear(),t.utils.DialogErr("Error message","Communication exception, please try again later!")})},bindEditChannel:function(t){this.dataId=t.id,this.EditChannel=t,this.notifySwitch=1==t.notification,this.channelSelected=t.trig_cond_type,this.voltVal=t.trig_cond_value,this.notifyVal=t.noti_msg,this.WidthCheckIO(256),this.EditPrompt=!0,this.alertId=t.alter_id,this.voltType=t.types},EditOk:function(){var t=this,a={mode:3,id:Number(t.dataId),notification:1==t.notifySwitch?1:0,trig_cond_type:Number(t.channelSelected),trig_cond_value:Number(t.voltVal).toFixed(1),noti_msg:t.notifyVal,alter_id:Number(this.alertId)};Object(l.b)("IoConfigure",a).then(function(a){a.result?(t.getData(),t.EditPrompt=!1):a.error&&t.utils.ToastMsg(0,2e3,a.error.message)}).catch(function(a){t.utils.DialogErr("Error message","Communication exception, please try again later!")})},EditCancel:function(){this.EditPrompt=!1,this.lowVoltegePrompt=!1},toDecimal:function(t,a){var e=(Math.round(t*Math.pow(10,a))/Math.pow(10,a)).toString();e.indexOf(".")<0&&(e+=".");for(var i=e.length-e.indexOf(".");i<=a;i++)e+="0";return e},bindEditLowWaring:function(){this.lowVoltegePrompt=!0},lowEditOk:function(){var t=this,a=void 0;console.log(t.LowNotifySwitch),a=t.LowNotifySwitch?{mode:3,LowVoltWarning:Number(t.LowNotifySwitch),LowVoltValue:Number(t.lowVoltVal)}:{mode:3,LowVoltWarning:Number(t.LowNotifySwitch),LowVoltValue:Number(t.oldData.LowVoltValue)},Object(l.b)("IoConfigure",a).then(function(a){t.lowVoltegePrompt=!1,a.result?(t.getData(),t.EditPrompt=!1):a.error&&t.utils.ToastMsg(0,2e3,a.error.message)}).catch(function(a){t.utils.DialogErr("Error message","Communication exception, please try again later!")})},WidthCheckIO:function(t){var a=0;if(this.notifyVal=this.notifyVal.replace(/[^\x00-\xff]+/g,""),this.notifyVal=this.notifyVal.replace(/(^\s*)/g,""),this.notifyVal)for(var e=0;e<this.notifyVal.length;e++){var i=this.notifyVal.charCodeAt(e);if(i>=1&&i<=126||65376<=i&&i<=65439?a++:a+=2,this.characters=t-a,a>t){this.notifyVal=this.notifyVal.substr(0,e);break}}else this.characters=t}}},c={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"Channel"},[e("div",{staticClass:"Channel-item1 -mt20"},[e("div",{staticClass:"Channel-name"},[t._v("Low voltage warning")]),t._v(" "),e("div",{staticClass:"Channel-flag",class:1==t.LowVoltage.LowVoltWarning?"enabled-c":""},[t._v("\n      "+t._s(1==t.LowVoltage.LowVoltWarning?"Notifications enabled":"Notifications disabled")+"\n    ")]),t._v(" "),e("div",{staticClass:"Channel-switch",on:{click:t.bindEditLowWaring}},[t._v("\n      Edit\n    ")])]),t._v(" "),e("div",{staticClass:"Channel-content -mt20"},[e("div",{staticClass:"alert-input-title"},[t._v("Router inputs")]),t._v(" "),t._l(t.ChannelArr,function(a){return e("div",{key:a.id},[e("div",{staticClass:"Channel-item"},[e("div",{staticClass:"Channel-name"},[t._v(t._s(a.name))]),t._v(" "),e("div",{staticClass:"Channel-num"},[t._v("Channel "+t._s(a.id))]),t._v(" "),e("div",{staticClass:"Channel-flag",class:1==a.notification?"enabled-c":""},[t._v("\n          "+t._s(1==a.notification?"Notifications enabled":"Notifications disabled")+"\n        ")]),t._v(" "),e("div",{staticClass:"Channel-switch",on:{click:function(e){return t.bindEditChannel(a)}}},[t._v("\n          Edit\n        ")])])])})],2),t._v(" "),e("prompt",{directives:[{name:"show",rawName:"v-show",value:t.EditPrompt,expression:"EditPrompt"}]},[e("div",{staticClass:"prompt-c",attrs:{slot:"promtHtml"},slot:"promtHtml"},[e("span",{staticClass:"Briefprompt-close",on:{click:t.EditCancel}},[t._v("+")]),t._v(" "),e("p",{staticClass:"prompt-t"},[t._v(t._s(t.EditChannel.name))]),t._v(" "),e("div",{staticClass:"prompt-row -mt25"},[e("div",{staticClass:"prompt-label"},[t._v("Alert ID:")]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.alertId,expression:"alertId"}],staticClass:"prompt-input",attrs:{type:"text"},domProps:{value:t.alertId},on:{input:function(a){a.target.composing||(t.alertId=a.target.value)}}})]),t._v(" "),e("div",{staticClass:"prompt-subscribe"},[t._v("\n        Alert ID must be between 1000 and 65000 and must be individual to\n        other input alert ID's\n      ")]),t._v(" "),e("div",{staticClass:"prompt-row -flex-display -justify-box -mt25"},[e("label",{staticClass:"prompt-label"},[t._v("Allow notifications:")]),t._v(" "),e("div",{staticClass:"prompt-inp-check"},[e("van-checkbox",{attrs:{shape:"square","checked-color":"#26b167"},model:{value:t.notifySwitch,callback:function(a){t.notifySwitch=a},expression:"notifySwitch"}})],1)]),t._v(" "),e("div",{staticClass:"prompt-row -mt10"},[e("label",{staticClass:"prompt-label"},[t._v("Notify when:")]),t._v(" "),e("div",{staticClass:"prompt-sub -pt10"},[t._v("Channel has")]),t._v(" "),e("div",{staticClass:"prompt-inp-c"},[0==t.voltType?e("select",{directives:[{name:"model",rawName:"v-model",value:t.channelSelected,expression:"channelSelected"}],staticClass:"prompt-select",attrs:{id:"security",disabled:1!=t.notifySwitch},on:{change:function(a){var e=Array.prototype.filter.call(a.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.channelSelected=a.target.multiple?e:e[0]}}},[e("option",{attrs:{value:"0"}},[t._v("Value below")]),t._v(" "),e("option",{attrs:{value:"1"}},[t._v("Value above")])]):e("select",{directives:[{name:"model",rawName:"v-model",value:t.channelSelected,expression:"channelSelected"}],staticClass:"prompt-select",attrs:{id:"security",disabled:1!=t.notifySwitch},on:{change:function(a){var e=Array.prototype.filter.call(a.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.channelSelected=a.target.multiple?e:e[0]}}},[e("option",{attrs:{value:"1"}},[t._v("Met")]),t._v(" "),e("option",{attrs:{value:"0"}},[t._v("not met")])]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.voltVal,expression:"voltVal"}],staticClass:"prompt-input",attrs:{type:"text",id:"new_wifi_p",disabled:1!=t.notifySwitch},domProps:{value:t.voltVal},on:{input:function(a){a.target.composing||(t.voltVal=a.target.value)}}}),t._v(" "),e("label",{staticClass:"prompt-label"},[t._v("volts")])])]),t._v(" "),e("div",{staticClass:"prompt-row"},[e("label",{staticClass:"prompt-label"},[t._v("Notification message:")]),t._v(" "),e("div",{staticClass:"prompt-inp-c"},[e("textarea",{directives:[{name:"model",rawName:"v-model",value:t.notifyVal,expression:"notifyVal"}],staticClass:"prompt-textarea -mt10",attrs:{type:"text",id:"new_wifi_p",disabled:1!=t.notifySwitch},domProps:{value:t.notifyVal},on:{input:[function(a){a.target.composing||(t.notifyVal=a.target.value)},function(a){return t.WidthCheckIO(256)}]}}),t._v(" "),e("p",{staticClass:"characters-left"},[t._v(t._s(t.characters)+" characters left")])])]),t._v(" "),e("div",{staticClass:"prompt-btn -mt20"},[e("button",{staticClass:"prompt-ok",attrs:{id:"newWifiOk"},on:{click:function(a){return a.stopPropagation(),t.EditOk(a)}}},[t._v("\n          Save\n        ")]),t._v(" "),e("button",{staticClass:"prompt-cancel",on:{click:function(a){return a.stopPropagation(),t.EditCancel(a)}}},[t._v("\n          Cancel\n        ")])])])]),t._v(" "),e("prompt",{directives:[{name:"show",rawName:"v-show",value:t.lowVoltegePrompt,expression:"lowVoltegePrompt"}]},[e("div",{staticClass:"prompt-c",attrs:{slot:"promtHtml"},slot:"promtHtml"},[e("span",{staticClass:"Briefprompt-close",on:{click:t.EditCancel}},[t._v("+")]),t._v(" "),e("p",{staticClass:"prompt-t"},[t._v("Low voltage warning")]),t._v(" "),e("div",{staticClass:"prompt-row -flex-display -justify-box -mt25"},[e("label",{staticClass:"prompt-label"},[t._v("Allow notifications:")]),t._v(" "),e("div",{staticClass:"prompt-inp-check"},[e("van-checkbox",{attrs:{shape:"square","checked-color":"#26b167"},model:{value:t.LowNotifySwitch,callback:function(a){t.LowNotifySwitch=a},expression:"LowNotifySwitch"}})],1)]),t._v(" "),e("div",{staticClass:"prompt-row -mt10 "},[e("label",{staticClass:"prompt-label-v"},[t._v("Notify when voltage is below:")]),t._v(" "),e("div",{staticClass:"prompt-inp-c"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.lowVoltVal,expression:"lowVoltVal"}],staticClass:"prompt-input",attrs:{type:"number",id:"new_wifi_p",disabled:1!=t.LowNotifySwitch},domProps:{value:t.lowVoltVal},on:{input:function(a){a.target.composing||(t.lowVoltVal=a.target.value)}}}),t._v(" "),e("label",{staticClass:"prompt-label"},[t._v("volts")])])]),t._v(" "),e("div",{staticClass:"prompt-btn -mt20"},[e("button",{staticClass:"prompt-ok",attrs:{id:"newWifiOk"},on:{click:function(a){return a.stopPropagation(),t.lowEditOk(a)}}},[t._v("\n          Save\n        ")]),t._v(" "),e("button",{staticClass:"prompt-cancel",on:{click:function(a){return a.stopPropagation(),t.EditCancel(a)}}},[t._v("\n          Cancel\n        ")])])])])],1)},staticRenderFns:[]};var p=e("VU/8")(r,c,!1,function(t){e("iKhE")},"data-v-63e91ab1",null);a.default=p.exports},iKhE:function(t,a){}});