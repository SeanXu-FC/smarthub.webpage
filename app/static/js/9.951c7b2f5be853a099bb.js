webpackJsonp([9],{QdSr:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});e("XmAh");var r=e("il3B"),n=(e("eqfM"),e("/QYm")),o=(e("Xrj1"),e("1nur")),a=e("nBqZ"),i=(e("VTEy"),e("mtWM"),e("7+uW"));i.a.use(o.a),i.a.use(n.a);var u=null,p=null,l={name:"Upgrading",data:function(){return{frequency:0,toast:null,percent:0,progressS:!0,progressTip:"Upgrading software...",progresSteps:null,nowStatus:null,progressColor:"#861f41",count:0,total:100,showPivot:!1,stepsFail:!1}},mounted:function(){console.log(this.$route.query);if(this.nowStatus=this.$route.query.status,this.progresSteps=this.$route.query.steps,this.count=this.$route.query.status,this.total=this.$route.query.steps,console.log(this.nowStatus,this.progresSteps),"null"!=this.nowStatus&&null!=this.nowStatus){var t={status:this.nowStatus,steps:this.progresSteps,count:this.count,total:this.total};console.log(t),this.statusHandle(t)}else this.no4Getstatus();this.percent=0},methods:{percentTimer:function(t){var s=this;clearInterval(p),p=setInterval(function(){s.percent<80?s.percent++:clearInterval(p)},625)},progress:function(t,s){this.percent=parseInt(t/s*100),this.percent>100&&(this.percent=100)},no4Getstatus:function(){var t=this;u=setInterval(function(){Object(a.b)("GetUpgradeStatusAndProgress",{status:0},0).then(function(s){s.result?(t.progress(s.result.count,s.result.total),t.statusHandle(s.result)):s.error&&t.utils.ToastMsg(0,2e3,s.error.message)}).catch(function(t){console.log(t)})},2e3)},statusHandle:function(t){"1"==t.status?(this.progress(100,100),this.StateResponse(1),this.progresSteps=t.steps,clearInterval(u),this.PromptSuccess(t.steps)):"0"==t.status?(clearInterval(u),this.StateResponse(1),this.progresSteps=t.steps,this.stepsFail=!0,this.Promptfail(t.steps)):"2"==t.status?(this.progresSteps=t.steps,clearInterval(u),this.no4Getstatus()):"3"==t.status?(this.progresSteps=t.steps,this.progressS=!1,clearInterval(u)):"4"==t.status?(this.StateResponse(1),this.progresSteps=t.steps,this.timerOut(6e4,this.no4Getstatus)):"5"==t.status?(this.StateResponse(1),this.progresSteps=t.steps,this.timerOut(6e4,this.no4Getstatus)):"6"==t.status&&(this.StateResponse(1),this.progresSteps=t.steps,this.timerOut(3e5,this.no4Getstatus))},StateResponse:function(){Object(a.b)("GetUpgradeStatusAndProgress",{status:1}).then(function(t){}).catch(function(t){})},PromptSuccess:function(t){var s=this;r.a.alert({title:"Success message",message:t}).then(function(){s.$router.push({path:"/Home"})})},Promptfail:function(t){var s=this;r.a.alert({title:"Fail message",message:t}).then(function(){s.$router.push({path:"/SoftwareUpgrade"})})},timerOut:function(t,s){clearInterval(u),setTimeout(function(){s()},t)}}},c={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"Upgrading"},[e("div",{staticClass:"Upgrade-title"},[t._v("\n    "+t._s(t.progressTip)+"\n  ")]),t._v(" "),e("div",{staticClass:"Upgrade-steps",class:t.stepsFail?"steps-fail":""},[t._v("\n    "+t._s(t.progresSteps)+"\n  ")]),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:t.progressS,expression:"progressS"}],staticClass:"progress-c"},[e("van-progress",{attrs:{percentage:t.percent,"stroke-width":"22",color:t.progressColor,"show-pivot":t.showPivot}})],1)])},staticRenderFns:[]};var h=e("VU/8")(l,c,!1,function(t){e("cnlt"),e("SmJo")},"data-v-355ce783",null);s.default=h.exports},SmJo:function(t,s){},cnlt:function(t,s){}});