webpackJsonp([9],{"4rJS":function(a,e){},Dkle:function(a,e){},G0lU:function(a,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});t("nsZj"),t("ZfdV");var s=t("o69Z"),i=t("X6Tt"),o=t("1SJR"),l=Object(s.b)("radio-group"),n=l[0],u=l[1],c=n({mixins:[Object(o.b)("vanRadio"),i.a],props:{value:null,disabled:Boolean,direction:String,checkedColor:String,iconSize:[Number,String]},watch:{value:function(a){this.$emit("change",a)}},render:function(){return(0,arguments[0])("div",{class:u([this.direction]),attrs:{role:"radiogroup"}},[this.slots()])}}),r=(t("T2s0"),t("1H7Z"),t("4rJS"),t("Vj2t")),d=Object(s.b)("radio"),b=d[0],v=d[1],p=b({mixins:[Object(r.a)({bem:v,role:"radio",parent:"vanRadio"})],computed:{currentValue:{get:function(){return this.parent?this.parent.value:this.value},set:function(a){(this.parent||this).$emit("input",a)}},checked:function(){return this.currentValue===this.name}},methods:{toggle:function(){this.currentValue=this.name}}}),h=(t("cZ0s"),t("fIxc")),m=(t("3gWi"),t("ZxCb")),O=t("nBqZ"),_=t("HTKX"),f=t("7+uW");f.a.prototype.$resultTip=_.a,f.a.use(m.a),f.a.use(h.a),f.a.use(p),f.a.use(c);var J={name:"Gnss",data:function(){return{toast:null,IOData:{},lowMode:"",LAN_signal:!1,LAN_signalDisable:!1,valOBJ:{input0:!1,input1:!1,input2:!1,input3:!1,output4:!1,output5:!1,output6:!1,output7:!1},nameOBJ:{ioName0:"--",ioName1:"--",ioName2:"--",ioName3:"--",ioName4:"--",ioName5:"--",ioName6:"--",ioName7:"--"},disableOBJ:{disab0:!1,disab1:!1,disab2:!1,disab3:!1,disab4:!1,disab5:!1,disab6:!1,disab7:!1}}},mounted:function(){this.getData()},methods:{getData:function(){var a=this;this.toast=this.utils.ToastMsg(2),Object(O.b)("IoConfigure",{mode:"0"}).then(function(e){if(a.toast.clear(),e.result&&e.result.io_date){a.IOData=e.result;for(var t=e.result.io_date,s=0;s<t.length;s++)a.nameOBJ["ioName"+s]=t[s].name,s<4?1==t[s].status?(a.disableOBJ["disab"+s]=!1,0!=t[s].types&&0!=t[s].wake_func?a.valOBJ["input"+s]=!0:a.valOBJ["input"+s]=!1):(a.disableOBJ["disab"+s]=!0,a.valOBJ["input"+s]=!1):1==t[s].status?(a.disableOBJ["disab"+s]=!1,1==t[s].wake_func?a.valOBJ["output"+s]=!0:a.valOBJ["output"+s]=!1):(a.disableOBJ["disab"+s]=!0,a.valOBJ["output"+s]=!1);if(2==e.result.LowPowerMode){a.lowMode="2",a.LAN_signalDisable=!0;for(s=0;s<t.length;s++)a.disableOBJ["disab"+s]=!0}else a.lowMode="1",a.LAN_signalDisable=!1,1==e.result.LowPowerMode?a.LAN_signal=!0:a.LAN_signal=!1}else e.error&&a.utils.ToastMsg(0,2e3,e.error.message)}).catch(function(e){console.log(e),a.toast.clear(),a.utils.DialogErr("Error message","Communication exception, please try again later!")})},bindRadioChange:function(a){if(2==a){this.LAN_signalDisable=!0;for(var e=0;e<8;e++)this.disableOBJ["disab"+e]=!0}else{this.LAN_signalDisable=!1;for(var t=this.IOData.io_date,s=0;s<t.length;s++)s<4?1==t[s].status?(this.disableOBJ["disab"+s]=!1,0!=t[s].types&&0!=t[s].wake_func?this.valOBJ["input"+s]=!0:this.valOBJ["input"+s]=!1):(this.disableOBJ["disab"+s]=!0,this.valOBJ["input"+s]=!1):1==t[s].status?(this.disableOBJ["disab"+s]=!1,1==t[s].wake_func?this.valOBJ["output"+s]=!0:this.valOBJ["output"+s]=!1):(this.disableOBJ["disab"+s]=!0,this.valOBJ["output"+s]=!1)}},getPowerParams:function(){var a=void 0;if(2!=this.lowMode){for(var e=[{id:1,wake_func:0},{id:2,wake_func:0},{id:3,wake_func:0},{id:4,wake_func:0}],t=0;t<e.length;t++)1==this.valOBJ["input"+t]?e[t].wake_func=1:e[t].wake_func=0;for(var s=[{id:5,wake_func:0},{id:6,wake_func:0},{id:7,wake_func:0},{id:8,wake_func:0}],i=0;i<s.length;i++)1==this.valOBJ["output"+(4+i)]?s[i].wake_func=1:s[i].wake_func=0;a={wakeup_data:e.concat(s),LowPowerMode:this.LAN_signal?1:0,mode:5},console.log(a)}else a={LowPowerMode:Number(this.lowMode),mode:5};this.sendPower(a)},sendPower:function(a){var e=this;this.toast=this.utils.ToastMsg(2),Object(O.b)("IoConfigure",a).then(function(a){e.toast.clear(),a.result?e.$resultTip({resultMsg:"Changes saved"}):a.error&&e.utils.ToastMsg(0,2e3,a.error.message)}).catch(function(a){console.log(a),e.toast.clear(),e.utils.DialogErr("Error message","Communication exception, please try again later!")})}}},B={render:function(){var a=this,e=a.$createElement,t=a._self._c||e;return t("div",[t("div",{staticClass:"power-manage"},[t("van-radio-group",{on:{change:a.bindRadioChange},model:{value:a.lowMode,callback:function(e){a.lowMode=e},expression:"lowMode"}},[t("div",{staticClass:"Wireless-c -mt15 -flex-display -align-box "},[t("van-radio",{attrs:{"checked-color":"#26b167",name:"2"}},[a._v("Always on")])],1),a._v(" "),t("div",{staticClass:"Setup-describe2"},[a._v("Router will always be on")]),a._v(" "),t("div",{staticClass:"Wireless-c -mt15 -flex-display -align-box "},[t("van-radio",{attrs:{"checked-color":"#26b167",name:"1"}},[a._v("Low power mode")])],1),a._v(" "),t("div",{staticClass:"Setup-describe2"},[a._v("\n        Router will run in a low power state and will wake on LTE and alert\n        notifications\n      ")])]),a._v(" "),t("div",{staticClass:"Wireless-c -mt30 -flex-display -align-box -ml30"},[t("span",{staticClass:"Wireless-l",class:a.disableOBJ.disab0?"opacity05":""},[a._v("Also wake on:")])]),a._v(" "),t("div",{staticClass:"chekbox-group -ml30"},[t("van-checkbox",{attrs:{disabled:a.LAN_signalDisable,shape:"square","checked-color":"#26b167"},model:{value:a.LAN_signal,callback:function(e){a.LAN_signal=e},expression:"LAN_signal"}},[a._v("LAN signal")]),a._v(" "),t("van-checkbox",{attrs:{disabled:a.disableOBJ.disab0,shape:"square","checked-color":"#26b167"},model:{value:a.valOBJ.input0,callback:function(e){a.$set(a.valOBJ,"input0",e)},expression:"valOBJ.input0"}},[a._v(a._s(a.nameOBJ.ioName0))]),a._v(" "),t("van-checkbox",{attrs:{disabled:a.disableOBJ.disab1,shape:"square","checked-color":"#26b167"},model:{value:a.valOBJ.input1,callback:function(e){a.$set(a.valOBJ,"input1",e)},expression:"valOBJ.input1"}},[a._v(a._s(a.nameOBJ.ioName1))]),a._v(" "),t("van-checkbox",{attrs:{disabled:a.disableOBJ.disab2,shape:"square","checked-color":"#26b167"},model:{value:a.valOBJ.input2,callback:function(e){a.$set(a.valOBJ,"input2",e)},expression:"valOBJ.input2"}},[a._v(a._s(a.nameOBJ.ioName2))]),a._v(" "),t("van-checkbox",{attrs:{disabled:a.disableOBJ.disab3,shape:"square","checked-color":"#26b167"},model:{value:a.valOBJ.input3,callback:function(e){a.$set(a.valOBJ,"input3",e)},expression:"valOBJ.input3"}},[a._v(a._s(a.nameOBJ.ioName3))])],1),a._v(" "),t("div",{staticClass:"Setup-describe -ml30",class:a.disableOBJ.disab0?"opacity05":""},[a._v("\n      Input channels can be set to wake the router from low power mode when\n      they are switched on\n    ")]),a._v(" "),t("div",{staticClass:"Wireless-c -mt30 -flex-display -align-box -ml30"},[t("span",{staticClass:"Wireless-title",class:a.disableOBJ.disab0?"opacity05":""},[a._v("Turn on these outputs when waking from low power mode:")])]),a._v(" "),t("div",{staticClass:"chekbox-group -ml30"},[t("van-checkbox",{attrs:{disabled:a.disableOBJ.disab4,shape:"square","checked-color":"#26b167"},model:{value:a.valOBJ.output4,callback:function(e){a.$set(a.valOBJ,"output4",e)},expression:"valOBJ.output4"}},[a._v(a._s(a.nameOBJ.ioName4))]),a._v(" "),t("van-checkbox",{attrs:{disabled:a.disableOBJ.disab5,shape:"square","checked-color":"#26b167"},model:{value:a.valOBJ.output5,callback:function(e){a.$set(a.valOBJ,"output5",e)},expression:"valOBJ.output5"}},[a._v(a._s(a.nameOBJ.ioName5))]),a._v(" "),t("van-checkbox",{attrs:{disabled:a.disableOBJ.disab6,shape:"square","checked-color":"#26b167"},model:{value:a.valOBJ.output6,callback:function(e){a.$set(a.valOBJ,"output6",e)},expression:"valOBJ.output6"}},[a._v(a._s(a.nameOBJ.ioName6))]),a._v(" "),t("van-checkbox",{attrs:{disabled:a.disableOBJ.disab7,shape:"square","checked-color":"#26b167"},model:{value:a.valOBJ.output7,callback:function(e){a.$set(a.valOBJ,"output7",e)},expression:"valOBJ.output7"}},[a._v(a._s(a.nameOBJ.ioName7))])],1)],1),a._v(" "),t("div",{staticClass:"Setup-btn -flex-display"},[t("button",{staticClass:"btn cancle",on:{click:function(e){return e.stopPropagation(),a.goBack(e)}}},[a._v("Cancel")]),a._v(" "),t("button",{staticClass:"btn ok",attrs:{id:"APOk"},on:{click:function(e){return e.stopPropagation(),a.getPowerParams(e)}}},[a._v("\n      Save\n    ")])])])},staticRenderFns:[]};var g=t("VU/8")(J,B,!1,function(a){t("Dkle")},"data-v-d3dd4cc0",null);e.default=g.exports},ZfdV:function(a,e){}});