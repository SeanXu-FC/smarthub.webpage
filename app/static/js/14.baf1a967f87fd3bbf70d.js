webpackJsonp([14],{W5J5:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});n("3gWi");var a=n("ZxCb"),s=n("nBqZ");n("7+uW").a.use(a.a);var i={name:"ChannelMonitor",data:function(){return{toast:null,ChannelArr:[]}},mounted:function(){this.getData()},methods:{getData:function(){var t=this;this.toast=this.utils.ToastMsg(2),Object(s.b)("IoConfigure",{mode:"0"}).then(function(e){if(t.toast.clear(),e.result&&e.result.io_date){for(var n=e.result.io_date,a=0;a<n.length;a++)1==n[a].types?n[a].Switch=!0:0==n[a].types&&(n[a].Switch=!1),-1==n[a].volt?(n[a].volt="ACTIVE",n[a].class="active-green"):-2==n[a].volt?(n[a].volt="INACTIVE",n[a].class="tip-text"):-3==n[a].volt?(n[a].volt="UNKNOWN",n[a].class="tip-text"):(n[a].volt=n[a].volt+"v",n[a].class="Channel-v");t.ChannelArr=n}else e.error&&t.utils.ToastMsg(0,2e3,e.error.message)}).catch(function(e){t.toast.clear(),t.utils.DialogErr("Error message","Communication exception, please try again later!")})},swithChange:function(t,e){var n=this;0==t.Switch?this.ChannelArr[e].Switch=!0:1==t.Switch&&(this.ChannelArr[e].Switch=!1),Object(s.b)("IoConfigure",{mode:1,id:n.ChannelArr[e].id,types:1==n.ChannelArr[e].Switch?1:0}).then(function(t){t.result?n.getData():t.error&&n.utils.ToastMsg(0,2e3,t.error.message)}).catch(function(t){n.utils.DialogErr("Error message","Communication exception, please try again later!")})}}},r={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"Channel"},[n("div",{staticClass:"Channel-title"},[t._v("Inputs")]),t._v(" "),n("div",{staticClass:"Channel-content -mt20"},t._l(t.ChannelArr,function(e,a){return n("div",{key:e.id},[n("div",{staticClass:"Channel-item"},[n("div",{staticClass:"Channel-name"},[t._v(t._s(e.name))]),t._v(" "),n("div",{staticClass:"Channel-num"},[t._v("Channel "+t._s(e.id))]),t._v(" "),a<4?n("div",{class:e.class},[t._v("\n          "+t._s(e.volt)+"\n        ")]):t._e(),t._v(" "),a>3?n("div",{staticClass:"Channel-switch"},[n("van-switch",{attrs:{value:e.Switch,"active-color":"#26b167","inactive-color":"#e0e0e0",size:"24px"},on:{input:function(n){return t.swithChange(e,a)}}})],1):t._e()]),t._v(" "),3==a?n("div",{staticClass:"Channel-title -mt20 -pt10 -mb20"},[t._v("\n        Outputs\n      ")]):t._e()])}),0)])},staticRenderFns:[]};var l=n("VU/8")(i,r,!1,function(t){n("cmJ+")},"data-v-76566b3c",null);e.default=l.exports},"cmJ+":function(t,e){}});