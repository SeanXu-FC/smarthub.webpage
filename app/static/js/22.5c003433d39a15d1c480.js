webpackJsonp([22],{eqt9:function(e,s,t){"use strict";Object.defineProperty(s,"__esModule",{value:!0});t("Xrj1");var r=t("1nur"),a=t("nBqZ");t("VTEy"),t("mtWM");t("7+uW").a.use(r.a);var o=null,i=null,n={name:"Reset",data:function(){return{percent:0,progressS:!0,progressTip:"Reseting SmartHub...",progressColor:"#861f41"}},mounted:function(){this.reStartInit()},methods:{percentTimer:function(e){var s=this;clearInterval(i),i=setInterval(function(){s.percent<80?s.percent++:clearInterval(i)},625)},reStartInit:function(){var e=this;Object(a.b)("RestartAndReset",{mode:1},1e4).then(function(s){e.percentTimer(),console.log(s.result.status),s.result&&2==s.result.status?e.timePolling(6e3):s.result&&0==s.result.status?(e.progressTip="Reset SmartHub Fail",e.progressTip=!1):s.result&&1==s.result.status?e.restartSuccess():s.result&&3==s.result.status?e.timePolling(6e4):s.error&&(e.progressTip="Reset SmartHub Fail",e.progressTip=!1,e.utils.ToastMsg(0,2e3,s.error.message))}).catch(function(s){console.log(s.message),"timeout of 10000ms exceeded"==s.message||e.utils.DialogErr(s.message)})},timePolling:function(e){var s=this;clearInterval(o),o=setInterval(function(){s.PollingChecked()},e)},PollingChecked:function(){var e=this;Object(a.b)("RestartAndReset",{mode:2},1e4).then(function(s){console.log(s),s.result&&2==s.result.status||(s.result&&0==s.result.status?(clearInterval(o),e.progressTip="Reset SmartHub Fail",e.progressTip=!1):s.result&&1==s.result.status?(clearInterval(o),e.restartSuccess()):s.result&&3==s.result.status?e.timePolling(6e4):s.error&&(e.progressTip="Reset SmartHub Fail",e.progressTip=!1,e.utils.ToastMsg(0,2e3,s.error.message)))}).catch(function(s){console.log(s.message),"timeout of 10000ms exceeded"==s.message||e.utils.DialogErr(s.message)})},restartSuccess:function(){var e=this;this.percent=100,this.progressTip="Reset SmartHub Successful",this.progressColor="#26b167",clearInterval(o),setTimeout(function(){e.$router.push({path:"/Home"})},3e3)}}},l={render:function(){var e=this.$createElement,s=this._self._c||e;return s("div",{staticClass:"RestartReset"},[s("div",{staticClass:"Restart-describe"},[this._v("\n    "+this._s(this.progressTip)+"\n  ")]),this._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:this.progressS,expression:"progressS"}],staticClass:"progress-c"},[s("van-progress",{attrs:{percentage:this.percent,"stroke-width":"14",color:this.progressColor}})],1)])},staticRenderFns:[]};var u=t("VU/8")(n,l,!1,function(e){t("yHlL")},"data-v-0a46182f",null);s.default=u.exports},yHlL:function(e,s){}});