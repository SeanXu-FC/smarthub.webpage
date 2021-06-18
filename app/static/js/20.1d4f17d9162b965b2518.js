webpackJsonp([20],{"+hNi":function(s,e){},PTmU:function(s,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a,n=t("mvHQ"),o=t.n(n),i=(t("cZ0s"),t("fIxc")),l=(t("3gWi"),t("ZxCb")),c=t("nBqZ"),S=t("7+uW");S.a.use(l.a),S.a.use(i.a);var r={name:"Gnss",data:function(){return{toast:null,auth_token:"",ipaddr:"",fixStatus:"",RoamingSwitch:!0,Glonass:!1,beidou:!1,GPS:!1,SBAS:!1,GALILEO:!1,IMES:!1,QZSS:!1,DifferentSwitch:!1,ALCOMSAT:!1,Aus_nz:!1,Bdsbas:!1,Egnos:!1,Gagan:!1,Kaas:!1,MSAS:!1,NSAS:!1,SDCM:!1,WAAS:!1,QZSSModel:!1,SatellitesArr:[],HDOP:""}},mounted:function(){this.getGnss()},methods:{getGnss:function(){var s=this;this.toast=this.utils.ToastMsg(2),Object(c.b)("GetGnssAuthToken",{}).then(function(e){s.toast.clear(),e.result&&e.result.auth_token&&e.result.ipaddr?s.connectWebsocket(e.result.auth_token,e.result.ipaddr):e.error&&s.utils.ToastMsg(0,2e3,e.error.message)}).catch(function(e){s.toast.clear(),s.utils.DialogErr("Error message","Communication exception, please try again later!")})},connectWebsocket:function(s,e){var t=this,n=("https"==document.location.protocol?"wss://":"ws://")+"["+e+"]:7778";(a=this.new_ws(n)).onopen=function(){console.log("连接已打开...");var e={request:"authenticate",token:s};e=o()(e),t.sendmsg(e)},a.onmessage=function(s){var e=JSON.parse(s.data);if(console.log(e),"authenticate"==e.responseTo&&t.getGnssData(),"resetGnss"==e.responseTo&&1==e.state&&t.utils.ToastMsg(0,2e3,"Reset GNSS successfully!"),"getGnss"==e.responseTo&&e.gnss){if(e.gnss.EnableSBAS&&(t.DifferentSwitch=!0),e.gnss.EnableConstellations&&e.gnss.EnableConstellations.length)for(var a=0;a<e.gnss.EnableConstellations.length;a++)"GLONASS"==e.gnss.EnableConstellations[a]&&(t.Glonass=!0),"BEIDOU"==e.gnss.EnableConstellations[a]&&(t.beidou=!0),"GPS"==e.gnss.EnableConstellations[a]&&(t.GPS=!0),"SBAS"==e.gnss.EnableConstellations[a]&&(t.SBAS=!0),"GALILEO"==e.gnss.EnableConstellations[a]&&(t.GALILEO=!0),"IMES"==e.gnss.EnableConstellations[a]&&(t.IMES=!0),"QZSS"==e.gnss.EnableConstellations[a]&&(t.QZSS=!0);if(e.gnss.EnableSBASSats&&e.gnss.EnableSBASSats.length)for(var n=0;n<e.gnss.EnableSBASSats.length;n++)"ALCOMSAT"==e.gnss.EnableSBASSats[n]&&(t.ALCOMSAT=!0),"AUSNZ"==e.gnss.EnableSBASSats[n]&&(t.Aus_nz=!0),"BDSBAS"==e.gnss.EnableSBASSats[n]&&(t.Bdsbas=!0),"EGNOS"==e.gnss.EnableSBASSats[n]&&(t.Egnos=!0),"GAGAN"==e.gnss.EnableSBASSats[n]&&(t.Gagan=!0),"KASS"==e.gnss.EnableSBASSats[n]&&(t.Kaas=!0),"MSAS"==e.gnss.EnableSBASSats[n]&&(t.MSAS=!0),"NSAS"==e.gnss.EnableSBASSats[n]&&(t.NSAS=!0),"SDCM"==e.gnss.EnableSBASSats[n]&&(t.SDCM=!0),"WAAS"==e.gnss.EnableSBASSats[n]&&(t.WAAS=!0),"QZSS"==e.gnss.EnableSBASSats[n]&&(t.QZSSModel=!0);if(e.gnss.SatsInView){t.fixStatus=e.gnss.Fix,t.RoamingSwitch=e.gnss.InternalGPSEnabled,t.HDOP=e.gnss.HDOP;for(var o=0;o<e.gnss.SatsInView.length;o++)e.gnss.SatsInView[o].isUsedInFix=e.gnss.SatsInView[o].isUsedInFix?"Yes":"No",e.gnss.SatsInView[o].Constellation=t.returnConstellation(e.gnss.SatsInView[o].id),e.gnss.SatsInView[o].azimuth=e.gnss.SatsInView[o].azimuth.toFixed(1);t.SatellitesArr=e.gnss.SatsInView,console.log(t.SatellitesArr)}e.gnss&&e.gnss.error&&t.utils.ToastMsg(0,2e3,e.gnss.error)}"setGnss"==e.responseTo&&1==e.state&&t.utils.ToastMsg(0,2e3,"Saved successfully!")},a.onclose=function(){t.utils.ToastMsg(0,2e3,"Connection closed ...")},a.onerror=function(s){t.utils.ToastMsg(0,2e3,"Connection error ..."+o()(s))}},new_ws:function(s){return new WebSocket(s)},sendmsg:function(s){a.send(s)},stop:function(){this.utils.ToastMsg("Connection closed ..."),a.close()},getGnssData:function(){var s={request:"getGnss"};s=o()(s),a.send(s)},getSaveVal:function(){var s=this.DifferentSwitch,e=[];this.Glonass&&e.push("GLONASS"),this.beidou&&e.push("BEIDOU"),this.GPS&&e.push("GPS"),this.SBAS&&e.push("SBAS"),this.GALILEO&&e.push("GALILEO"),this.IMES&&e.push("IMES"),this.QZSS&&e.push("QZSS");var t=[];this.ALCOMSAT&&t.push("ALCOMSAT"),this.Aus_nz&&t.push("AUSNZ"),this.Bdsbas&&t.push("BDSBAS"),this.Egnos&&t.push("EGNOS"),this.Gagan&&t.push("GAGAN"),this.Kaas&&t.push("KASS"),this.MSAS&&t.push("MSAS"),this.NSAS&&t.push("NSAS"),this.SDCM&&t.push("SDCM"),this.WAAS&&t.push("WAAS"),this.QZSSModel&&t.push("QZSS");var a={request:"setGnss",config:{EnableSBAS:s,EnableSBASSats:t,EnableConstellations:e}};this.saveGNSS(a)},saveGNSS:function(s){s=o()(s),a.send(s)},ResetGNSS:function(){var s={request:"resetGnss"};s=o()(s),a.send(s)},returnConstellation:function(s){var e="";return 1<=s&&s<=37?e="GPS":38<=s&&s<=61?e="GLONASS":120<=s&&s<=138&&(e="WAAS"),e}}},u={render:function(){var s=this,e=s.$createElement,t=s._self._c||e;return t("div",[t("div",{staticClass:"Gnss"},[t("div",{staticClass:"Wireless-c -flex-display -justify-box -align-box"},[t("span",{staticClass:"Wireless-l"},[s._v("GNSS Fix status:")]),s._v(" "),t("span",{staticClass:"result-tip"},[s._v(s._s(s.fixStatus))])]),s._v(" "),t("div",{staticClass:"Wireless-c -mt20 -flex-display -justify-box -align-box "},[t("span",{staticClass:"Wireless-l"},[s._v("Internal GNSS:")]),s._v(" "),t("van-checkbox",{attrs:{shape:"square","checked-color":"#26b167"},model:{value:s.RoamingSwitch,callback:function(e){s.RoamingSwitch=e},expression:"RoamingSwitch"}})],1),s._v(" "),t("div",{staticClass:"Setup-describe"},[s._v("\n      Disable if you do not want to use the router's internal GNSS receiver as\n      a source for positioning data\n    ")]),s._v(" "),t("button",{staticClass:"PIN-btn",on:{click:s.ResetGNSS}},[s._v("Restart GNSS")]),s._v(" "),s._m(0),s._v(" "),t("div",{staticClass:"Wireless-c "},[t("van-checkbox",{attrs:{shape:"square","checked-color":"#26b167"},model:{value:s.Glonass,callback:function(e){s.Glonass=e},expression:"Glonass"}},[s._v("GLONASS")]),s._v(" "),t("van-checkbox",{attrs:{shape:"square","checked-color":"#26b167"},model:{value:s.beidou,callback:function(e){s.beidou=e},expression:"beidou"}},[s._v("BEIDOU")]),s._v(" "),t("van-checkbox",{attrs:{shape:"square","checked-color":"#26b167"},model:{value:s.GPS,callback:function(e){s.GPS=e},expression:"GPS"}},[s._v("GPS")]),s._v(" "),t("van-checkbox",{attrs:{shape:"square","checked-color":"#26b167"},model:{value:s.SBAS,callback:function(e){s.SBAS=e},expression:"SBAS"}},[s._v("SBAS")]),s._v(" "),t("van-checkbox",{attrs:{shape:"square","checked-color":"#26b167"},model:{value:s.GALILEO,callback:function(e){s.GALILEO=e},expression:"GALILEO"}},[s._v("GALILEO")]),s._v(" "),t("van-checkbox",{attrs:{shape:"square","checked-color":"#26b167"},model:{value:s.IMES,callback:function(e){s.IMES=e},expression:"IMES"}},[s._v("IMES")]),s._v(" "),t("van-checkbox",{attrs:{shape:"square","checked-color":"#26b167"},model:{value:s.QZSS,callback:function(e){s.QZSS=e},expression:"QZSS"}},[s._v("QZSS")])],1),s._v(" "),t("div",{staticClass:"Wireless-c -mt20 -flex-display -justify-box -align-box "},[t("span",{staticClass:"Wireless-l"},[s._v("Differential positioning:")]),s._v(" "),t("van-checkbox",{attrs:{shape:"square","checked-color":"#26b167"},model:{value:s.DifferentSwitch,callback:function(e){s.DifferentSwitch=e},expression:"DifferentSwitch"}})],1),s._v(" "),t("div",{staticClass:"Setup-describe"},[s._v("\n      Activating differential positioning provides more accurate positioning\n      in regions covered by Satellite Based Augmentation Systems (SBAS)\n    ")]),s._v(" "),t("div",{staticClass:"Setup-title"},[s._v("\n      Differential positioning systems:\n    ")]),s._v(" "),t("div",{staticClass:"auto-checked -mt20"},[t("van-checkbox",{attrs:{shape:"square","checked-color":"#26b167"},model:{value:s.ALCOMSAT,callback:function(e){s.ALCOMSAT=e},expression:"ALCOMSAT"}},[s._v("ALCOMSAT (Algeria)")]),s._v(" "),t("van-checkbox",{attrs:{shape:"square","checked-color":"#26b167"},model:{value:s.Aus_nz,callback:function(e){s.Aus_nz=e},expression:"Aus_nz"}},[s._v("AUS-NZ (Australia New Zealand)")]),s._v(" "),t("van-checkbox",{attrs:{shape:"square","checked-color":"#26b167"},model:{value:s.Bdsbas,callback:function(e){s.Bdsbas=e},expression:"Bdsbas"}},[s._v("BDSBAS (China)")]),s._v(" "),t("van-checkbox",{attrs:{shape:"square","checked-color":"#26b167"},model:{value:s.Egnos,callback:function(e){s.Egnos=e},expression:"Egnos"}},[s._v("EGNOS (Europe)")]),s._v(" "),t("van-checkbox",{attrs:{shape:"square","checked-color":"#26b167"},model:{value:s.Gagan,callback:function(e){s.Gagan=e},expression:"Gagan"}},[s._v("GAGAN (Indian)")]),s._v(" "),t("van-checkbox",{attrs:{shape:"square","checked-color":"#26b167"},model:{value:s.Kaas,callback:function(e){s.Kaas=e},expression:"Kaas"}},[s._v("KAAS (Korea)")]),s._v(" "),t("van-checkbox",{attrs:{shape:"square","checked-color":"#26b167"},model:{value:s.MSAS,callback:function(e){s.MSAS=e},expression:"MSAS"}},[s._v("MSAS")]),s._v(" "),t("van-checkbox",{attrs:{shape:"square","checked-color":"#26b167"},model:{value:s.NSAS,callback:function(e){s.NSAS=e},expression:"NSAS"}},[s._v("NSAS")]),s._v(" "),t("van-checkbox",{attrs:{shape:"square","checked-color":"#26b167"},model:{value:s.SDCM,callback:function(e){s.SDCM=e},expression:"SDCM"}},[s._v("SDCM")]),s._v(" "),t("van-checkbox",{attrs:{shape:"square","checked-color":"#26b167"},model:{value:s.WAAS,callback:function(e){s.WAAS=e},expression:"WAAS"}},[s._v("WAAS")]),s._v(" "),t("van-checkbox",{attrs:{shape:"square","checked-color":"#26b167"},model:{value:s.QZSSModel,callback:function(e){s.QZSSModel=e},expression:"QZSSModel"}},[s._v("QZSS")])],1),s._v(" "),t("div",{staticClass:"Setup-title"},[s._v("\n      Satellites in use:\n    ")]),s._v(" "),t("div",{staticClass:"Satellites-c"},[t("table",{staticClass:"table"},[s._m(1),s._v(" "),s._l(s.SatellitesArr,function(e,a){return t("tr",{key:a},[t("td",{staticClass:"td"},[s._v(s._s(e.id))]),s._v(" "),t("td",{staticClass:"td"},[s._v(s._s(e.Constellation))]),s._v(" "),t("td",{staticClass:"td"},[s._v(s._s(e.isUsedInFix))]),s._v(" "),t("td",{staticClass:"td"},[s._v(s._s(s.HDOP?s.HDOP:"--"))]),s._v(" "),t("td",{staticClass:"td"},[s._v(s._s(e.azimuth))])])})],2)])]),s._v(" "),t("div",{staticClass:"Setup-btn -flex-display"},[t("button",{staticClass:"btn cancle"},[s._v("Cancel")]),s._v(" "),t("button",{staticClass:"btn ok",attrs:{id:"APOk"},on:{click:s.getSaveVal}},[s._v("\n      Save\n    ")])])])},staticRenderFns:[function(){var s=this.$createElement,e=this._self._c||s;return e("div",{staticClass:"Wireless-c"},[e("p",{staticClass:"Setup-title"},[this._v("GNSS Constellations:")]),this._v(" "),e("p",{staticClass:"Setup-describe -mt10"},[this._v("\n        Select which other satellite constellations are used to determine\n        position, in addition to the GPS system\n      ")])])},function(){var s=this,e=s.$createElement,t=s._self._c||e;return t("tr",{staticClass:"bor-b"},[t("th",{staticClass:"th"},[s._v("Satellite ID/PRN")]),s._v(" "),t("th",{staticClass:"th"},[s._v("Constell.")]),s._v(" "),t("th",{staticClass:"th"},[s._v("Used in fix flag")]),s._v(" "),t("th",{staticClass:"th"},[s._v("HDOP")]),s._v(" "),t("th",{staticClass:"th"},[s._v("Azimuth")])])}]};var v=t("VU/8")(r,u,!1,function(s){t("+hNi")},"data-v-48e7cae4",null);e.default=v.exports}});