(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5e23b7b0"],{3798:function(t,e,s){"use strict";var i=s("5205"),a=s.n(i);a.a},5205:function(t,e,s){},9966:function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"quiz-issue"},[s("van-nav-bar",{attrs:{title:"发表问题","right-text":"确认发布","left-arrow":"",fixed:""},on:{"click-left":function(e){return t.$router.go(-1)},"click-right":t.onClickRight}}),s("main",[s("h3",[t._v("发布标题")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.title,expression:"title"}],staticClass:"quiz-issue-title",attrs:{type:"text",placeholder:"可输入40个字符"},domProps:{value:t.title},on:{input:function(e){e.target.composing||(t.title=e.target.value)}}}),s("textarea",{directives:[{name:"model",rawName:"v-model",value:t.message,expression:"message"}],staticClass:"quiz-issue-textarea",attrs:{placeholder:"请输入内容",cols:"30",rows:"12"},domProps:{value:t.message},on:{input:function(e){e.target.composing||(t.message=e.target.value)}}})])],1)},a=[],n=s("365c"),o={data:function(){return{title:"",message:""}},methods:{onClickRight:function(){var t=this;if(""==this.title)this.$toast("标题不能为空");else if(""==this.message)this.$toast("内容不能为空");else{var e={userId:window.localStorage.getItem("userID"),title:this.title,message:this.message};Object(n["b"])(e).then((function(e){t.$toast(e.msg)}))}}}},l=o,r=(s("3798"),s("2877")),u=Object(r["a"])(l,i,a,!1,null,null,null);e["default"]=u.exports}}]);