(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2be93806"],{d6ac:function(e,t,s){"use strict";s.r(t);var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"amend"},[s("van-nav-bar",{attrs:{"right-text":"完成","left-arrow":"",fixed:""},on:{"click-left":function(t){return e.$router.go(-1)},"click-right":e.onClickRight}}),s("main",[s("h3",[e._v("个人介绍")]),s("textarea",{directives:[{name:"model",rawName:"v-model",value:e.messageText,expression:"messageText"}],staticClass:"edit",attrs:{placeholder:"请输入内容",cols:"30",rows:"12"},domProps:{value:e.messageText},on:{input:function(t){t.target.composing||(e.messageText=t.target.value)}}})])],1)},n=[],i=s("365c"),o={data:function(){return{messageText:""}},mounted:function(){var e=this,t={userId:window.localStorage.getItem("userID")};Object(i["t"])(t).then((function(t){e.messageText=t.data.message}))},methods:{onClickRight:function(){var e=this;if(this.messageText<20)this.$toast("至少输入20字符");else{var t={userId:window.localStorage.getItem("userID"),message:this.messageText};Object(i["u"])(t).then((function(t){e.$toast(t.msg)}))}}}},r=o,c=(s("d81e"),s("2877")),u=Object(c["a"])(r,a,n,!1,null,null,null);t["default"]=u.exports},d81e:function(e,t,s){"use strict";var a=s("e2e1"),n=s.n(a);n.a},e2e1:function(e,t,s){}}]);