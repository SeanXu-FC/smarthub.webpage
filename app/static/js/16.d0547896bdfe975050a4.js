webpackJsonp([16],{ZJ2r:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});s("Xrj1");var r=s("1nur"),o=s("nBqZ");s("VTEy"),s("mtWM");s("7+uW").a.use(r.a);var n=null,a=null,i={name:"Restart",data:function(){return{percent:0,progressS:!0,progressTip:"Restarting router...",progressColor:"#861f41"}},mounted:function(){this.reStartInit()},methods:{percentTimer:function(e){var t=this;clearInterval(a),a=setInterval(function(){t.percent<80?t.percent++:clearInterval(a)},625)},reStartInit:function(){var e=this;Object(o.b)("RestartAndReset",{mode:0},1e4).then(function(t){e.percentTimer(),console.log(t.result.status),t.result&&2==t.result.status?e.timePolling(6e3):t.result&&0==t.result.status?(e.percent=100,e.progressTip="Restart router fail",e.progressTip=!1):t.result&&1==t.result.status?(e.percent=100,e.restartSuccess()):t.result&&3==t.result.status?e.timePolling(6e4):t.error&&(e.progressTip="Restart router fail",e.progressTip=!1,e.utils.ToastMsg(0,2e3,t.error.message))}).catch(function(t){console.log(t.message),"timeout of 10000ms exceeded"==t.message||e.utils.DialogErr(t.message)})},timePolling:function(e){var t=this;clearInterval(n),n=setInterval(function(){console.log(e),t.PollingChecked()},e)},PollingChecked:function(){var e=this;Object(o.b)("RestartAndReset",{mode:2},1e4).then(function(t){console.log(t),t.result&&2==t.result.status||(t.result&&0==t.result.status?(e.percent=100,clearInterval(n),e.progressTip="Restart router fail",e.progressTip=!1):t.result&&1==t.result.status?(e.percent=100,clearInterval(n),e.restartSuccess()):t.result&&3==t.result.status?e.timePolling(6e4):t.error&&(e.progressTip="Restart router fail",e.progressTip=!1,e.utils.ToastMsg(0,2e3,t.error.message)))}).catch(function(t){console.log(t.message),"timeout of 10000ms exceeded"==t.message||e.utils.DialogErr(t.message)})},restartSuccess:function(){var e=this;this.percent=100,this.progressTip="Restart router Successful",this.progressColor="#26b167",clearInterval(n),setTimeout(function(){e.$router.push({path:"/Home"})},3e3)}}},l={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"RestartReset"},[t("div",{staticClass:"Restart-describe"},[this._v("\n    "+this._s(this.progressTip)+"\n  ")]),this._v(" "),t("div",{directives:[{name:"show",rawName:"v-show",value:this.progressS,expression:"progressS"}],staticClass:"progress-c"},[t("van-progress",{attrs:{percentage:this.percent,"stroke-width":"14",color:this.progressColor}})],1)])},staticRenderFns:[]};var u=s("VU/8")(i,l,!1,function(e){s("r00e")},"data-v-667fea34",null);t.default=u.exports},r00e:function(e,t){}});