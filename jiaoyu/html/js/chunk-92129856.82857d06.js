(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-92129856"],{"3ad6":function(t,a,e){},"7c78":function(t,a,e){"use strict";var i=e("3ad6"),n=e.n(i);n.a},e82f:function(t,a,e){"use strict";e.r(a);var i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"details"},[e("van-nav-bar",{attrs:{title:"老师详情",fit:"cover",fixed:"","left-arrow":"","z-index":99},on:{"click-left":function(a){return t.$router.go(-1)}}}),e("van-image",{staticStyle:{"margin-top":"20vw"},attrs:{width:"100vw",height:"50vw",src:t.obj_data.avatar}}),e("div",{staticClass:"details-header"},[e("div",{staticClass:"details-header-desc"},[e("h3",[t._v(t._s(t.obj_data.realName))])]),e("p",{staticClass:"details-header-phone"},[t._v(t._s(t.obj_data.title))])]),e("div",[0==t.obj_data.write?e("van-button",{staticClass:"details-buy",attrs:{color:"linear-gradient(to right, #ff8c68, #f95341)",type:"info"},on:{click:function(a){t.show=!0}}},[t._v("购买 ")]):t._e()],1),e("div",{staticClass:"detail-money"},[e("h3",[t._v("￥"+t._s(t.obj_data.money))]),1==t.activeAttention?e("van-button",{staticClass:"tag-btn",attrs:{plain:"",type:"primary",size:"normal",color:"#f95341"},on:{click:t.onAttention}},[t._v("已关注")]):e("van-button",{staticClass:"tag-btn",attrs:{type:"primary",color:"#ff8c68",size:"normal"},on:{click:t.onAttention}},[t._v("关注")])],1),e("van-tabs",{model:{value:t.active,callback:function(a){t.active=a},expression:"active"}},[e("van-tab",{attrs:{title:"介绍"}},[e("p",{staticClass:"details-header-message"},[t._v("\n        "+t._s(t.obj_data.message)+"\n      ")])]),e("van-tab",{attrs:{title:"课程"}},[e("van-collapse",{model:{value:t.activeNames,callback:function(a){t.activeNames=a},expression:"activeNames"}},t._l(t.articleList,(function(a,i){return e("van-collapse-item",{key:i,on:{click:function(e){return t.$router.push({path:"/read",query:{id:a.id}})}}},[e("div",{attrs:{slot:"title"},slot:"title"},[t._v(t._s(a.name)),e("van-icon")],1),t._v("\n         "+t._s(a.title)+"\n        ")])})),1)],1),e("van-tab",{attrs:{title:"评价(0)"}},t._l(t.commentList,(function(a,i){return e("div",{key:i,staticClass:"details-container van-hairline--bottom"},[e("div",{staticClass:"details-container-flex"},[e("div",{staticClass:"details-container-img"},[e("img",{attrs:{src:a.avatar}})]),e("div",{staticClass:"details-container-name"},[e("div",[e("p",{staticClass:"details-name"},[t._v("用户名")]),e("van-rate",{attrs:{size:".4rem",color:"#f95341",readonly:""},model:{value:a.number,callback:function(e){t.$set(a,"number",e)},expression:"i.number"}}),e("div",{staticStyle:{"margin-top":"3vw"}},[t._v(t._s(a.message))])],1),e("span",{staticClass:"time"},[t._v(t._s(a.create_time))])])])])})),0)],1),e("van-popup",{model:{value:t.show,callback:function(a){t.show=a},expression:"show"}},[e("div",{staticClass:"popup"},[e("van-cell",{attrs:{title:"支付总额",value:"¥"+t.obj_data.money}}),e("van-radio-group",{model:{value:t.radio,callback:function(a){t.radio=a},expression:"radio"}},[e("van-cell-group",[e("van-cell",{attrs:{title:"微信",icon:"comm2 iconfont iconweixinzhifu",clickable:""},on:{click:function(a){t.radio="1"}}},[e("van-radio",{attrs:{slot:"right-icon",name:"1"},slot:"right-icon"})],1),e("van-cell",{attrs:{title:"支付宝",icon:"comm iconfont iconzhifubao",clickable:""},on:{click:function(a){t.radio="2"}}},[e("van-radio",{attrs:{slot:"right-icon",name:"2"},slot:"right-icon"})],1)],1)],1),e("van-button",{attrs:{type:"info",size:"large"},on:{click:t.onConfirm}},[t._v("确认支付")])],1)])],1)},n=[],o=(e("ac4d"),e("8a81"),e("ac6a"),e("365c")),c={data:function(){return{active:0,show:!1,radio:"",activeAttention:0,teacherId:"",obj_data:"",articleList:"",commentList:"",activeNames:["1"]}},mounted:function(){var t=this;setTimeout((function(){t.init(),t.openWrite(),t.comment()}),500)},methods:{init:function(){var t=this,a=this.$route.query.id;this.teacherId=a;var e=window.localStorage.getItem("userID"),i={teacherId:a,userId:e};Object(o["r"])(i).then((function(a){if(console.log(a),1==a.code){var e=a.data;0==e.focus?t.activeAttention=0:t.activeAttention=1,e.avatar=Object(o["n"])()+e.avatar,t.obj_data=e}else t.$toast(a.msg)}))},openWrite:function(){var t=this,a={teacherId:this.teacherId};Object(o["db"])(a).then((function(a){1==a.code&&(t.articleList=a.data)}))},onPage:function(t){console.log(t),window.api.openWin({name:(new Date).getTime(),url:t,reload:!0,bgColor:"#000",vScrollBarEnabled:!1,slidBackEnabled:!1,bounces:!1,animation:{type:"movein",subType:"from_right",duration:300}})},comment:function(){var t=this,a={teacherId:this.teacherId};Object(o["L"])(a).then((function(a){if(1==a.code){var e=a.data,i=!0,n=!1,c=void 0;try{for(var r,s=e[Symbol.iterator]();!(i=(r=s.next()).done);i=!0){var l=r.value;l.avatar=Object(o["n"])()+l.avatar}}catch(d){n=!0,c=d}finally{try{i||null==s.return||s.return()}finally{if(n)throw c}}t.commentList=e}}))},onConfirm:function(){this.show=!1;var t={userId:window.localStorage.getItem("userID"),teacherId:this.teacherId,type:this.radio};1==this.radio&&Object(o["a"])(t).then((function(t){if(1==t.code){var a=t.data,e=window.api.require("wxPay");e.payOrder({apiKey:a.appid,orderId:a.prepayid,mchId:a.partnerid,nonceStr:a.noncestr,timeStamp:a.timestamp,package:a.package,sign:a.sign},(function(t,a){console.log(JSON.stringify(t))}))}})),2==this.radio&&Object(o["a"])(t).then((function(t){if(1==t.code){var a=window.api.require("aliPay");a.payOrder({orderInfo:t.data},(function(t,a){console.log(JSON.stringify(t))}))}}))},onAttention:function(){var t=this,a={userId:window.localStorage.getItem("userID"),teacherId:this.teacherId};Object(o["l"])(a).then((function(a){t.$toast(a.msg),1==a.code&&(0==t.activeAttention?t.activeAttention=1:t.activeAttention=0)}))}}},r=c,s=(e("7c78"),e("2877")),l=Object(s["a"])(r,i,n,!1,null,null,null);a["default"]=l.exports}}]);