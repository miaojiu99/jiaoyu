(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-71b10419"],{4341:function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"set-article"},[i("van-nav-bar",{attrs:{title:"修改文章","right-text":"修改","left-arrow":"",fixed:""},on:{"click-left":function(e){return t.$router.go(-1)},"click-right":t.setWrite}}),i("br"),i("br"),i("br"),i("br"),i("br"),i("main",[i("h3",[t._v("文章标题")]),i("input",{directives:[{name:"model",rawName:"v-model",value:t.title,expression:"title"}],staticClass:"article-title",attrs:{type:"text",placeholder:"请填写文章标题"},domProps:{value:t.title},on:{input:function(e){e.target.composing||(t.title=e.target.value)}}}),i("br"),i("textarea",{directives:[{name:"model",rawName:"v-model",value:t.context,expression:"context"}],staticClass:"edit",attrs:{placeholder:"请输入内容",cols:"30",rows:"12"},domProps:{value:t.context},on:{input:function(e){e.target.composing||(t.context=e.target.value)}}})])],1)},r=[],o=i("365c"),a={data:function(){return{title:"",context:""}},mounted:function(){var t=this;setTimeout((function(){var e={writeId:t.$route.query.id};Object(o["eb"])(e).then((function(e){console.log(e),1==e.code&&(t.title=e.data.title,t.context=e.data.write)}))}),300)},methods:{setWrite:function(){var t=this,e={id:this.$route.query.id,title:this.title,write:this.context};Object(o["Z"])(e).then((function(e){t.$toast(e.msg)}))}}},c=a,s=(i("826a"),i("2877")),l=Object(s["a"])(c,n,r,!1,null,null,null);e["default"]=l.exports},"826a":function(t,e,i){"use strict";var n=i("e039"),r=i.n(n);r.a},e039:function(t,e,i){}}]);