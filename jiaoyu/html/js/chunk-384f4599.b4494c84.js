(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-384f4599"],{"2c68":function(t,e,n){},b87a:function(t,e,n){"use strict";var a=n("2c68"),i=n.n(a);i.a},ce01:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"ana"},[n("van-nav-bar",{attrs:{title:"个人理念","right-text":"修改","left-arrow":""},on:{"click-left":function(e){return t.$router.go(-1)},"click-right":t.onClicktitlePost}}),n("div",{staticClass:"main"},[n("van-field",{attrs:{placeholder:"请输入你的个人名言"},model:{value:t.value,callback:function(e){t.value=e},expression:"value"}})],1)],1)},i=[],l=n("365c"),c={data:function(){return{value:""}},mounted:function(){var t=this,e={userId:window.localStorage.getItem("userID")};Object(l["T"])(e).then((function(e){t.value=e.data.title}))},methods:{onClicktitlePost:function(){var t=this,e={userId:window.localStorage.getItem("userID"),title:this.value};Object(l["U"])(e).then((function(e){t.$toast(e.msg)}))}}},o=c,u=(n("b87a"),n("2877")),r=Object(u["a"])(o,a,i,!1,null,null,null);e["default"]=r.exports}}]);