webpackJsonp([5],{"1nur":function(t,e,s){"use strict";var r=s("o69Z"),i=Object(r.b)("progress"),o=i[0],n=i[1];e.a=o({props:{color:String,inactive:Boolean,pivotText:String,textColor:String,pivotColor:String,trackColor:String,strokeWidth:[Number,String],percentage:{type:[Number,String],required:!0,validator:function(t){return t>=0&&t<=100}},showPivot:{type:Boolean,default:!0}},data:function(){return{pivotWidth:0,progressWidth:0}},mounted:function(){this.resize()},watch:{showPivot:"resize",pivotText:"resize"},methods:{resize:function(){var t=this;this.$nextTick(function(){t.progressWidth=t.$el.offsetWidth,t.pivotWidth=t.$refs.pivot?t.$refs.pivot.offsetWidth:0})}},render:function(){var t=arguments[0],e=this.pivotText,s=this.percentage,i=null!=e?e:s+"%",o=this.showPivot&&i,a=this.inactive?"#cacaca":this.color,l={color:this.textColor,left:(this.progressWidth-this.pivotWidth)*s/100+"px",background:this.pivotColor||a},c={background:a,width:this.progressWidth*s/100+"px"},u={background:this.trackColor,height:Object(r.a)(this.strokeWidth)};return t("div",{class:n(),style:u},[t("span",{class:n("portion"),style:c},[o&&t("span",{ref:"pivot",style:l,class:n("pivot")},[i])])])}})},DxYB:function(t,e){},Xrj1:function(t,e,s){"use strict";var r=s("nsZj"),i=(s.n(r),s("imjL"));s.n(i)},ZJ2r:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});s("Xrj1");var r=s("1nur"),i=s("nBqZ");s("VTEy"),s("mtWM");s("7+uW").a.use(r.a);var o=null,n=null,a={name:"Restart",data:function(){return{percent:0,progressS:!0,progressTip:"Restarting SmartHub...",progressColor:"#861f41"}},mounted:function(){this.reStartInit()},methods:{percentTimer:function(t){var e=this;clearInterval(n),n=setInterval(function(){e.percent<80?e.percent++:clearInterval(n)},625)},reStartInit:function(){var t=this;Object(i.a)("RestartAndReset",{mode:0},1e4).then(function(e){t.percentTimer(),console.log(e.result.status),e.result&&2==e.result.status?t.timePolling(6e3):e.result&&0==e.result.status?(t.progressTip="Restart SmartHub Fail",t.progressTip=!1):e.result&&1==e.result.status?t.restartSuccess():e.result&&3==e.result.status?t.timePolling(6e4):e.error&&(t.progressTip="Restart SmartHub Fail",t.progressTip=!1,t.utils.ToastMsg(0,2e3,e.error.message))}).catch(function(e){console.log(e.message),"timeout of 10000ms exceeded"==e.message||t.utils.DialogErr(e.message)})},timePolling:function(t){var e=this;clearInterval(o),console.log(1111),o=setInterval(function(){console.log(t),e.PollingChecked()},t)},PollingChecked:function(){var t=this;Object(i.a)("RestartAndReset",{mode:2},1e4).then(function(e){console.log(e),e.result&&2==e.result.status||(e.result&&0==e.result.status?(clearInterval(o),t.progressTip="Restart SmartHub Fail",t.progressTip=!1):e.result&&1==e.result.status?(clearInterval(o),t.restartSuccess()):e.result&&3==e.result.status?t.timePolling(6e4):e.error&&(t.progressTip="Restart SmartHub Fail",t.progressTip=!1,t.utils.ToastMsg(0,2e3,e.error.message)))}).catch(function(e){console.log(e.message),"timeout of 10000ms exceeded"==e.message||t.utils.DialogErr(e.message)})},restartSuccess:function(){var t=this;this.percent=100,this.progressTip="Restart SmartHub Successful",this.progressColor="#26b167",clearInterval(o),setTimeout(function(){t.$router.push({path:"/Home"})},3e3)}}},l={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"RestartReset"},[e("div",{staticClass:"Restart-describe"},[this._v("\n    "+this._s(this.progressTip)+"\n  ")]),this._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:this.progressS,expression:"progressS"}],staticClass:"progress-c"},[e("van-progress",{attrs:{percentage:this.percent,"stroke-width":"14",color:this.progressColor}})],1)])},staticRenderFns:[]};var c=s("VU/8")(a,l,!1,function(t){s("DxYB")},"data-v-288eb874",null);e.default=c.exports},imjL:function(t,e){}});