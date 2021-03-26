webpackJsonp([10],{Fm7G:function(t,s){},M806:function(t,s,a){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var e=a("oAio"),o={render:function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"Setup"},[a("div",{staticClass:"Setup-title"},[t._v("Configure your router access point")]),t._v(" "),a("div",{staticClass:"Setup-describe"},[t._v("\n    Your router access point allows other devices to connect to the router's cellular or Wi-Fi data. You may update the name and password details other devices will use to connect to the access point\n  ")]),t._v(" "),a("div",{staticClass:"wireless"},[a("div",{staticClass:"prompt-row"},[a("label",{staticClass:"prompt-label"},[t._v("Access point name:")]),t._v(" "),a("div",{staticClass:"prompt-inp-c"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.ApName,expression:"ApName"}],staticClass:"prompt-input",attrs:{type:"text",placeholder:"My access point"},domProps:{value:t.ApName},on:{input:[function(s){s.target.composing||(t.ApName=s.target.value)},t.newBtnChange]}})])]),t._v(" "),a("div",{staticClass:"prompt-row"},[a("label",{staticClass:"prompt-label"},[t._v("Password:")]),t._v(" "),a("div",{staticClass:"prompt-inp-c"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.ApPasswrod,expression:"ApPasswrod"}],staticClass:"prompt-input",attrs:{type:"password",id:"Ap_Passwrod"},domProps:{value:t.ApPasswrod},on:{input:[function(s){s.target.composing||(t.ApPasswrod=s.target.value)},t.newBtnChange]}}),t._v(" "),a("span",{staticClass:"prompt-show",attrs:{id:"pwd_show"},on:{click:function(s){return s.stopPropagation(),t.showPassword(s)}}},[t._v("SHOW")])])])]),t._v(" "),a("div",{staticClass:"Setup-btn -flex-display"},[a("button",{staticClass:"btn cancle",on:{click:function(s){return s.stopPropagation(),t.goBack(s)}}},[t._v("Back")]),t._v(" "),a("button",{staticClass:"btn ok",attrs:{id:"APOk"},on:{click:function(s){return s.stopPropagation(),t.saveAp(s)}}},[t._v("Continue")])])])},staticRenderFns:[]};var r=function(t){a("Fm7G")},i=a("VU/8")(e.a,o,!1,r,"data-v-7ce8a1da",null);s.default=i.exports},oAio:function(t,s,a){"use strict";(function(t){var e=a("nBqZ");s.a={name:"Set-upWizard2",data:function(){return{toast:null,ApName:"",ApPasswrod:""}},mounted:function(){this.getSmartMode()},methods:{getSmartMode:function(){var s=this;Object(e.b)("GetSmartMode",{}).then(function(a){a.result?(s.ApName=a.result.SmartSSID,s.ApPasswrod=a.result.PassWord,a.result.SmartSSID&&a.result.PassWord||(t("#APOk").prop("disabled",!0),t("#APOk").css("opacity","0.5"))):a.error&&s.utils.ToastMsg(0,2e3,a.error.message)}).catch(function(t){s.utils.DialogErr("Error message","Communication exception, please try again later!")})},saveAp:function(){var t=this;this.toast=this.utils.ToastMsg(2),Object(e.b)("SetSmartMode",{SmartSSID:t.ApName,PassWord:t.ApPasswrod}).then(function(s){t.toast.clear(),s.result?t.$router.push({path:"/Set-upWizard3"}):s.error&&t.utils.ToastMsg(0,2e3,s.error.message)}).catch(function(s){t.toast.clear(),t.utils.DialogErr("Error message","Communication exception, please try again later!")})},showPassword:function(){var s=t("#Ap_Passwrod").attr("type");console.log(s),"password"==s?(t("#Ap_Passwrod").attr("type","text"),t("#pwd_show").text("HIDE")):(t("#Ap_Passwrod").attr("type","password"),t("#pwd_show").text("SHOW"))},newBtnChange:function(){var s=this.ApName.length,a=this.ApPasswrod.length;8<=a&&a<=64&&1<=s&&s<=64?(t("#APOk").prop("disabled",!1),t("#APOk").css("opacity","1")):(t("#APOk").prop("disabled",!0),t("#APOk").css("opacity","0.5"))},goBack:function(){this.$router.push({path:"/Set-upWizard"})}}}}).call(s,a("7t+N"))}});