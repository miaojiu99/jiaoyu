(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-714eb05b"],{"0cb2":function(t,a,e){"use strict";e.r(a);var i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"read"},[e("van-nav-bar",{attrs:{title:"文章","left-arrow":"",fixed:"","z-index":99},on:{"click-left":function(a){return t.$router.go(-1)}}}),e("br"),e("br"),e("br"),e("br"),1==t.id?e("div",{staticClass:"main"},[e("p",{domProps:{innerHTML:t._s(t.obj_data.content)}})]):e("div",{staticClass:"main"},[e("h3",[t._v(t._s(t.obj_data.title))]),e("p",[t._v(t._s(t.obj_data.write))])])],1)},n=[],o=e("365c"),r={data:function(){return{obj_data:"",id:""}},mounted:function(){var t=this,a={writeId:this.$route.query.id};if(this.id=this.$route.query.is,1==this.id){var e={id:this.$route.query.id};Object(o["z"])(e).then((function(a){console.log(a),1==a.code&&a.data&&(t.obj_data=a.data,t.obj_data.image=Object(o["n"])()+a.data.image,t.obj_data.title="")}))}else Object(o["eb"])(a).then((function(a){1==a.code&&(t.obj_data=a.data,console.log(t.obj_data))}))}},d=r,c=(e("414a"),e("2877")),s=Object(c["a"])(d,i,n,!1,null,null,null);a["default"]=s.exports},"414a":function(t,a,e){"use strict";var i=e("41ac"),n=e.n(i);n.a},"41ac":function(t,a,e){}}]);