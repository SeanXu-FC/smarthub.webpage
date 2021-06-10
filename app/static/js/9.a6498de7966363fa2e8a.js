webpackJsonp([9],{"9mwM":function(t,s){},QdSr:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});e("XmAh");var i=e("il3B"),a=(e("UuFX"),e("J1XP")),r=(e("eqfM"),e("/QYm")),n=(e("Xrj1"),e("1nur")),A=e("nBqZ"),o=e("zjIY"),u=e.n(o),p=(e("8+FI"),e("mtWM"),e("7+uW"));p.a.use(n.a),p.a.use(r.a),p.a.use(a.a);var h=null,m=null,l={name:"Upgrading",data:function(){return{frequency:0,toast:null,percent:"0",progressS:!0,progressTip:"Upgrading software...",progresSteps:"Starting to upgrade",nowStatus:null,progressColor:"#009fe3",count:0,total:100,type:0,showPivot:!1,stepsFail:!1,timeRemainingStatus:0,remainTime:0,remainTimeTip:"Please restart manually",progressTimeS:!1,progressLoading:u.a,maskShow:!0,waitingMaskShow:!1,waitingTime:60,nowSteps:"",lockScroll:!1}},beforeDestroy:function(){clearInterval(h),clearInterval(m),clearInterval(null)},mounted:function(){if(this.nowStatus=this.$route.query.status,this.progresSteps=this.$route.query.steps,this.count=this.$route.query.count,this.total=this.$route.query.total,"null"!=this.nowStatus&&null!=this.nowStatus){var t={status:this.nowStatus,steps:this.progresSteps,count:this.count,total:this.total};this.statusHandle(t)}else this.no4Getstatus();this.percent="0",this.maskShow=!0},methods:{progress:function(t,s){void 0!=t&&void 0!=s&&(this.percent=parseInt(t/s*100),this.percent>100&&(this.percent=100))},no4Getstatus:function(){var t=this;h=setInterval(function(){Object(A.b)("GetUpgradeStatusAndProgress",{status:0,SourcesTypes:0},8e3).then(function(s){t.frequency=0,s.result?(t.progress(s.result.count,s.result.total),t.statusHandle(s.result)):s.error&&t.utils.ToastMsg(0,2e3,s.error.message)}).catch(function(s){console.log(s),t.frequency++,t.frequency>7&&(t.frequency=0,t.utils.DialogErr("Please wait patiently while the device is upgrading and restarting!","Tips"))})},2e3)},statusHandle:function(t){this.nowSteps=t.steps,"1"==t.status?(this.maskShow=!1,this.timeRemainingStatus=t.status,this.progressTimeS=!1,this.progress(100,100),this.StateResponse(1),this.progresSteps=t.steps,clearInterval(h),this.waitingMaskShow=!0,this.waitingTimerHandle(t.steps)):"0"==t.status?(this.maskShow=!1,this.timeRemainingStatus=t.status,this.progressTimeS=!1,clearInterval(h),this.StateResponse(1),this.progresSteps=t.steps,this.stepsFail=!0,this.Promptfail(t.steps)):"2"==t.status?(this.timeRemainingStatus=t.status,this.progressTimeS=!1,this.progresSteps=t.steps,clearInterval(h),this.no4Getstatus()):"3"==t.status?(this.maskShow=!1,this.timeRemainingStatus=t.status,this.progressTimeS=!1,this.progresSteps=t.steps,this.progressS=!1,clearInterval(h)):"4"==t.status?(this.progressTimeS=!0,4==this.timeRemainingStatus&&(this.remainTimeTip="(Please restart manually)"),this.timeRemainingStatus=t.status,this.StateResponse(1),this.progresSteps=t.steps,this.timerOut(6e4,this.no4Getstatus)):"5"==t.status?(this.progressTimeS=!0,5==this.timeRemainingStatus&&(this.remainTimeTip="(Please restart manually)"),this.timeRemainingStatus=t.status,this.StateResponse(1),this.progresSteps=t.steps,this.timerOut(6e4,this.no4Getstatus)):"6"==t.status?(this.timeRemainingStatus=t.status,this.StateResponse(1),this.progresSteps=t.steps,this.timerOut(3e5,this.no4Getstatus)):"8"==t.status?(this.progressTimeS=!0,8==this.timeRemainingStatus&&(this.remainTimeTip="(Please restart manually)"),this.timeRemainingStatus=t.status,this.StateResponse(1),this.progresSteps=t.steps,this.timerOut(6e4,this.no4Getstatus)):"11"!=t.status&&"12"!=t.status||(this.timeRemainingStatus=t.status,this.progressTimeS=!1,this.StateResponse(1),this.progresSteps=t.steps,clearInterval(h),this.PromptSuccess("Prompt information",t.steps))},StateResponse:function(){Object(A.b)("GetUpgradeStatusAndProgress",{status:1,SourcesTypes:0}).then(function(t){}).catch(function(t){})},PromptSuccess:function(t,s){var e=this;i.a.alert({title:t,message:s}).then(function(){e.$router.push({path:"/Home"})})},Promptfail:function(t){var s=this;i.a.alert({title:"Fail message",message:t}).then(function(){s.$router.push({path:"/SoftwareUpgrade"})})},timerOut:function(t,s){var e=this;clearInterval(h),setTimeout(function(){s()},t),e.remainTime=t/1e3,m=setInterval(function(){e.remainTime--,console.log("remainTime",e.remainTime),e.remainTime<1?(e.remainTime=0,clearInterval(m),e.progressTimeS=!1):e.remainTimeTip="("+e.remainTime+" seconds remaining)"},1e3)},waitingTimerHandle:function(t){var s=this,e=setInterval(function(){Number(s.waitingTime)<=1&&(s.waitingTime=60,s.PromptSuccess("Success message",t),clearInterval(e)),s.waitingTime--},1e3)}}},g={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"Upgrading"},[e("div",{staticClass:"Upgrade-title"},[t._v("\n    "+t._s(t.progresSteps)+"\n    "),e("img",{directives:[{name:"show",rawName:"v-show",value:t.progressS,expression:"progressS"}],staticClass:"gif-img",attrs:{src:t.progressLoading}})]),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:t.progressS,expression:"progressS"}],staticClass:"progress-c"},[e("van-progress",{attrs:{percentage:t.percent,"stroke-width":"22",color:t.progressColor,"show-pivot":t.showPivot}}),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:t.progressTimeS,expression:"progressTimeS"}],staticClass:"progress-time"},[t._v("\n      "+t._s(t.remainTimeTip)+"\n    ")])],1),t._v(" "),e("van-overlay",{attrs:{show:t.maskShow,"z-index":"999","lock-scroll":t.lockScroll}}),t._v(" "),e("div",{staticClass:"waitingMaskdiv"},[e("van-overlay",{attrs:{show:t.waitingMaskShow,"z-index":"1001"}},[e("div",{staticClass:"WaitingTime-c"},[t._v("\n        Waiting for changes to be applied...("+t._s(t.waitingTime)+"s)\n      ")])])],1)],1)},staticRenderFns:[]};var c=e("VU/8")(l,g,!1,function(t){e("XQ7J"),e("9mwM")},"data-v-5b1dd3de",null);s.default=c.exports},XQ7J:function(t,s){},zjIY:function(t,s){t.exports="data:image/gif;base64,R0lGODlhgAAPAKIAALCvsMPCwz8/PwAAAPv6+wAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQECgAAACwAAAAAgAAPAAAD50ixS/6sPRfDpPGqfKv2HTeBowiZGLORq1lJqfuW7Gud9YzLud3zQNVOGCO2jDZaEHZk+nRFJ7R5i1apSuQ0OZT+nleuNetdhrfob1kLXrvPariZLGfPuz66Hr8f8/9+gVh4YoOChYhpd4eKdgwAkJEAE5KRlJWTD5iZDpuXlZ+SoZaamKOQp5wEm56loK6isKSdprKotqqttK+7sb2zq6y8wcO6xL7HwMbLtb+3zrnNycKp1bjW0NjT0cXSzMLK3uLd5Mjf5uPo5eDa5+Hrz9vt6e/qosO/GvjJ+sj5F/sC+uMHcCCoBAAh+QQECgAAACwAAAAABwAPAAADEUiyq/wwyknjuDjrzfsmGpEAACH5BAQKAAAALAsAAAAHAA8AAAMRSLKr/DDKSeO4OOvN+yYakQAAIfkEBAoAAAAsFgAAAAcADwAAAxFIsqv8MMpJ47g46837JhqRAAAh+QQECgAAACwhAAAABwAPAAADEUiyq/wwyknjuDjrzfsmGpEAACH5BAQKAAAALCwAAAAHAA8AAAMRSLKr/DDKSeO4OOvN+yYakQAAIfkEBAoAAAAsNwAAAAcADwAAAxFIsqv8MMpJ47g46837JhqRAAAh+QQECgAAACxCAAAABwAPAAADEUiyq/wwyknjuDjrzfsmGpEAACH5BAQKAAAALE0AAAAHAA8AAAMRSLKr/DDKSeO4OOvN+yYakQAAIfkEBAoAAAAsWAAAAAcADwAAAxFIsqv8MMpJ47g46837JhqRAAAh+QQECgAAACxjAAAABwAPAAADEUiyq/wwyknjuDjrzfsmGpEAACH5BAQKAAAALG4AAAAHAA8AAAMRSLKr/DDKSeO4OOvN+yYakQAAIfkEBAoAAAAseQAAAAcADwAAAxFIsqv8MMpJ47g46837JhqRAAA7"}});