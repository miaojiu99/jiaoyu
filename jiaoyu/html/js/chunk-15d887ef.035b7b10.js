(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-15d887ef"],{"3f7b":function(t,n,e){},eb6a:function(t,n,e){"use strict";e.r(n);var o=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"balance"},[e("van-nav-bar",{attrs:{title:"我的零钱","left-arrow":""},on:{"click-left":function(n){return t.$router.go(-1)}}}),e("main",[e("br"),e("br"),e("van-icon",{attrs:{name:"gold-coin",size:"2rem",color:"#f44"}}),e("p",[t._v("我的零钱")]),e("h1",[t._v("￥"+t._s(t.obj_data.money))]),e("br"),e("br"),e("br"),e("br"),e("van-button",{on:{click:function(n){return t.$router.push("/deposit")}}},[t._v("提现")])],1)],1)},a=[],r=e("365c"),c={data:function(){return{obj_data:""}},mounted:function(){var t=this,n={userId:window.localStorage.getItem("userID")};Object(r["ab"])(n).then((function(n){console.log(n),1==n.code&&(t.obj_data=n.data)}))}},u=c,i=(e("fdc5"),e("2877")),s=Object(i["a"])(u,o,a,!1,null,null,null);n["default"]=s.exports},fdc5:function(t,n,e){"use strict";var o=e("3f7b"),a=e.n(o);a.a}}]);