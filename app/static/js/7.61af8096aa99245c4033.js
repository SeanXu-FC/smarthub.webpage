webpackJsonp([7],{"48IV":function(t,s){},QdSr:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});e("XmAh");var i=e("il3B"),r=(e("eqfM"),e("/QYm")),A=(e("Xrj1"),e("1nur")),a=e("nBqZ"),n=e("zjIY"),o=e.n(n),u=(e("VTEy"),e("8+FI"),e("mtWM"),e("7+uW"));u.a.use(A.a),u.a.use(r.a);var p=null,h=null,m={name:"Upgrading",data:function(){return{frequency:0,toast:null,percent:"0",progressS:!0,progressTip:"Upgrading software...",progresSteps:"Starting to upgrade",nowStatus:null,progressColor:"#861f41",count:0,total:100,type:0,showPivot:!1,stepsFail:!1,timeRemainingStatus:0,remainTime:0,remainTimeTip:"Please restart manually",progressTimeS:!1,progressLoading:o.a}},beforeDestroy:function(){clearInterval(p),clearInterval(h)},mounted:function(){if(this.nowStatus=this.$route.query.status,this.progresSteps=this.$route.query.steps,this.count=this.$route.query.count,this.total=this.$route.query.total,"null"!=this.nowStatus&&null!=this.nowStatus){var t={status:this.nowStatus,steps:this.progresSteps,count:this.count,total:this.total};this.statusHandle(t)}else this.no4Getstatus();this.percent="0",this.type=sessionStorage.getItem("upgrade"),"null"==this.type?this.$router.push("/Home"):sessionStorage.setItem("upgrade",null)},methods:{progress:function(t,s){void 0!=t&&void 0!=s&&(this.percent=parseInt(t/s*100),this.percent>100&&(this.percent=100))},no4Getstatus:function(){var t=this;p=setInterval(function(){Object(a.b)("GetUpgradeStatusAndProgress",{status:0},0).then(function(s){s.result?(t.progress(s.result.count,s.result.total),t.statusHandle(s.result)):s.error&&t.utils.ToastMsg(0,2e3,s.error.message)}).catch(function(t){console.log(t)})},2e3)},statusHandle:function(t){"1"==t.status?(this.timeRemainingStatus=t.status,this.progressTimeS=!1,this.progress(100,100),this.StateResponse(1),this.progresSteps=t.steps,clearInterval(p),this.PromptSuccess(t.steps)):"0"==t.status?(this.timeRemainingStatus=t.status,this.progressTimeS=!1,clearInterval(p),this.StateResponse(1),this.progresSteps=t.steps,this.stepsFail=!0,this.Promptfail(t.steps)):"2"==t.status?(this.timeRemainingStatus=t.status,this.progressTimeS=!1,this.progresSteps=t.steps,clearInterval(p),this.no4Getstatus()):"3"==t.status?(this.timeRemainingStatus=t.status,this.progressTimeS=!1,this.progresSteps=t.steps,this.progressS=!1,clearInterval(p)):"4"==t.status?(this.progressTimeS=!0,4==this.timeRemainingStatus&&(this.remainTimeTip="(Please restart manually)"),this.timeRemainingStatus=t.status,this.StateResponse(1),this.progresSteps=t.steps,this.timerOut(6e4,this.no4Getstatus)):"5"==t.status?(this.progressTimeS=!0,4==this.timeRemainingStatus&&(this.remainTimeTip="(Please restart manually)"),this.timeRemainingStatus=t.status,this.StateResponse(1),this.progresSteps=t.steps,this.timerOut(6e4,this.no4Getstatus)):"6"==t.status&&(this.timeRemainingStatus=t.status,this.StateResponse(1),this.progresSteps=t.steps,this.timerOut(3e5,this.no4Getstatus))},StateResponse:function(){Object(a.b)("GetUpgradeStatusAndProgress",{status:1}).then(function(t){}).catch(function(t){})},PromptSuccess:function(t){var s=this;i.a.alert({title:"Success message",message:t}).then(function(){s.$router.push({path:"/Home"})})},Promptfail:function(t){var s=this;i.a.alert({title:"Fail message",message:t}).then(function(){s.$router.push({path:"/SoftwareUpgrade"})})},timerOut:function(t,s){var e=this;clearInterval(p),setTimeout(function(){s()},t),e.remainTime=time/1e3,h=setInterval(function(){e.remainTime--,console.log("remainTime",remainTime),e.remainTime<1?(e.remainTime=0,clearInterval(h),S,e.progressTimeS=!1):e.remainTimeTip="("+remainTime+" seconds remaining)"},1e3)}}},g={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"Upgrading"},[e("div",{staticClass:"Upgrade-title"},[t._v("\n    "+t._s(t.progresSteps)+"\n    "),e("img",{directives:[{name:"show",rawName:"v-show",value:t.progressS,expression:"progressS"}],staticClass:"gif-img",attrs:{src:t.progressLoading}})]),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:t.progressS,expression:"progressS"}],staticClass:"progress-c"},[e("van-progress",{attrs:{percentage:t.percent,"stroke-width":"22",color:t.progressColor,"show-pivot":t.showPivot}}),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:t.progressTimeS,expression:"progressTimeS"}],staticClass:"progress-time"},[t._v("\n      "+t._s(t.remainTimeTip)+"\n    ")])],1)])},staticRenderFns:[]};var l=e("VU/8")(m,g,!1,function(t){e("nS1H"),e("48IV")},"data-v-1ffb6690",null);s.default=l.exports},nS1H:function(t,s){},zjIY:function(t,s){t.exports="data:image/gif;base64,R0lGODlhgAAPAKIAALCvsMPCwz8/PwAAAPv6+wAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQECgAAACwAAAAAgAAPAAAD50ixS/6sPRfDpPGqfKv2HTeBowiZGLORq1lJqfuW7Gud9YzLud3zQNVOGCO2jDZaEHZk+nRFJ7R5i1apSuQ0OZT+nleuNetdhrfob1kLXrvPariZLGfPuz66Hr8f8/9+gVh4YoOChYhpd4eKdgwAkJEAE5KRlJWTD5iZDpuXlZ+SoZaamKOQp5wEm56loK6isKSdprKotqqttK+7sb2zq6y8wcO6xL7HwMbLtb+3zrnNycKp1bjW0NjT0cXSzMLK3uLd5Mjf5uPo5eDa5+Hrz9vt6e/qosO/GvjJ+sj5F/sC+uMHcCCoBAAh+QQECgAAACwAAAAABwAPAAADEUiyq/wwyknjuDjrzfsmGpEAACH5BAQKAAAALAsAAAAHAA8AAAMRSLKr/DDKSeO4OOvN+yYakQAAIfkEBAoAAAAsFgAAAAcADwAAAxFIsqv8MMpJ47g46837JhqRAAAh+QQECgAAACwhAAAABwAPAAADEUiyq/wwyknjuDjrzfsmGpEAACH5BAQKAAAALCwAAAAHAA8AAAMRSLKr/DDKSeO4OOvN+yYakQAAIfkEBAoAAAAsNwAAAAcADwAAAxFIsqv8MMpJ47g46837JhqRAAAh+QQECgAAACxCAAAABwAPAAADEUiyq/wwyknjuDjrzfsmGpEAACH5BAQKAAAALE0AAAAHAA8AAAMRSLKr/DDKSeO4OOvN+yYakQAAIfkEBAoAAAAsWAAAAAcADwAAAxFIsqv8MMpJ47g46837JhqRAAAh+QQECgAAACxjAAAABwAPAAADEUiyq/wwyknjuDjrzfsmGpEAACH5BAQKAAAALG4AAAAHAA8AAAMRSLKr/DDKSeO4OOvN+yYakQAAIfkEBAoAAAAseQAAAAcADwAAAxFIsqv8MMpJ47g46837JhqRAAA7"}});