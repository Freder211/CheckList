(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{333:function(t,e,n){var content=n(388);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(13).default)("57ff416a",content,!0,{sourceMap:!1})},334:function(t,e,n){var content=n(390);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(13).default)("27cf606e",content,!0,{sourceMap:!1})},387:function(t,e,n){"use strict";n(333)},388:function(t,e,n){(e=n(12)(!1)).push([t.i,".lists-enter[data-v-25ff8423],.lists-leave-to[data-v-25ff8423]{opacity:0}.lists-enter[data-v-25ff8423]{transform:translateY(30%)}.lists-leave-to[data-v-25ff8423]{transform:translateX(300%)}.lists-leave-active[data-v-25ff8423]{position:absolute}.lists-transition-enter-active[data-v-25ff8423],.lists-transition-leave-active[data-v-25ff8423]{transition:opacity .5s}.lists-transition-enter[data-v-25ff8423],.lists-transition-leave-active[data-v-25ff8423]{opacity:0}",""]),t.exports=e},389:function(t,e,n){"use strict";n(334)},390:function(t,e,n){(e=n(12)(!1)).push([t.i,".utilityDiv[data-v-3d875a84]{align-items:center}.listTextField[data-v-3d875a84] input,.utilityDiv[data-v-3d875a84]{text-align:center}.list[data-v-3d875a84]{width:100%;transition:all 1s;display:inline-block}",""]),t.exports=e},392:function(t,e,n){"use strict";n.r(e);n(33);var l=n(124),o={data:function(){return{editing:!1,totalTasks:0,completedTasks:0,percentage:0}},mounted:function(){this.totalTasks=l.a.getList(this.id).tasks.length,this.completedTasks=l.a.getComplitedTasks(this.id),this.percentage=100*this.completedTasks/this.totalTasks},props:{name:String,id:String},methods:{remove:function(){this.$emit("removed",this.id)},edit:function(){this.editing?this.edit.oldName!=this.name&&l.a.renameList(this.id,this.name):this.$refs.textField.focus(),this.editing=!this.editing},show:function(){l.a.setList(this.id),this.$router.push({name:"tasks"})}}},r=(n(389),n(39)),c=n(56),d=n.n(c),v=n(302),f=n(328),m=n(398),h=n(317),k=n(303),x=n(146),_=n(399),C=n(407),component=Object(r.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mt-4 list"},[n("v-card",[n("v-container",{staticClass:"fluid"},[n("v-row",{attrs:{align:"center",justify:"center"}},[n("v-col",{attrs:{cols:"12",sm:"12",md:"8",lg:"8"}},[n("div",[n("v-text-field",{ref:"textField",staticClass:"font-weight-bold",class:{listTextField:this.$vuetify.breakpoint.xs||this.$vuetify.breakpoint.sm},attrs:{readonly:!this.editing,outlined:this.editing,"hide-details":"true",solo:"",flat:""},model:{value:t.name,callback:function(e){t.name=e},expression:"name"}})],1)]),t._v(" "),n("v-col",{staticClass:"listAction",attrs:{cols:"6",sm:"3",md:"1"}},[n("div",{staticClass:"utilityDiv"},[n("v-progress-circular",{attrs:{size:50,value:this.percentage}},[n("span",{staticClass:"counterSpan"},[t._v(t._s(this.completedTasks)+" / "+t._s(this.totalTasks))])])],1)]),t._v(" "),n("v-col",{staticClass:"pa-0",attrs:{cols:"6",sm:"3",md:"1",lg:"1","align-self":"stretch"}},[n("v-btn",{staticClass:"cardElement",attrs:{color:this.editing?"green":"default",height:"100%",block:"",tile:"",rounded:"",text:""},on:{click:t.edit}},[this.editing?t._e():n("v-icon",[t._v("mdi-pencil")]),t._v(" "),this.editing?n("v-icon",[t._v("mdi-check-bold")]):t._e()],1)],1),t._v(" "),n("v-col",{staticClass:"pa-0",attrs:{cols:"6",sm:"3",md:"1",lg:"1","align-self":"stretch"}},[n("v-btn",{staticClass:"cardElement",attrs:{"min-height":"70px",text:"",tile:"",block:"",height:"100%",color:"red"},on:{click:t.remove}},[n("v-icon",[t._v("mdi-close")])],1)],1),t._v(" "),n("v-col",{staticClass:"pa-0",attrs:{cols:"6",sm:"3",md:"1",lg:"1","align-self":"stretch"}},[n("v-btn",{staticClass:"cardElement",attrs:{"min-height":"70px",tile:"",color:"primary",block:"",height:"100%"},on:{click:t.show}},[n("v-icon",[t._v("mdi-arrow-right")])],1)],1)],1)],1)],1)],1)}),[],!1,null,"3d875a84",null);e.default=component.exports;d()(component,{VBtn:v.a,VCard:f.a,VCol:m.a,VContainer:h.a,VIcon:k.a,VProgressCircular:x.a,VRow:_.a,VTextField:C.a})},405:function(t,e,n){"use strict";n.r(e);n(95),n(33);var l=n(124),o=n(406),r={transition:"lists-transition",data:function(){return{lists:[],name:""}},mounted:function(){var t=l.a.getAllLists();for(var i in t)this.lists.push(t[i])},methods:{addNew:function(){if(""!=this.name){var t={id:Object(o.a)(),name:this.name,tasks:[],order:"Name"};l.a.newList(t),this.lists.push(t),this.name=""}},remove:function(t){for(var i in l.a.removeList(t),this.lists)this.lists[i].id==t&&this.lists.splice(i,1)}}},c=(n(387),n(39)),d=n(56),v=n.n(d),f=n(302),m=n(398),h=n(317),k=n(303),x=n(399),_=n(407),component=Object(c.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-container",[n("v-row",{attrs:{"align-content":"center",justify:"center"}},[n("v-col",[n("v-text-field",{attrs:{type:"text",label:"New list","hide-details":"true"},model:{value:t.name,callback:function(e){t.name=e},expression:"name"}})],1),t._v(" "),n("v-col",{attrs:{md:"1",sm:"2",cols:"3","align-self":"center"}},[n("v-btn",{staticClass:"addBtn",attrs:{block:"",tile:""},nativeOn:{click:function(e){return t.addNew(e)}}},[n("v-icon",[t._v("mdi-plus")])],1)],1)],1),t._v(" "),n("transition-group",{attrs:{name:"lists",tag:"div"}},t._l(t.lists,(function(e){return n("List",{key:e.id,attrs:{name:e.name,id:e.id},on:{removed:t.remove}})})),1)],1)}),[],!1,null,"25ff8423",null);e.default=component.exports;v()(component,{List:n(392).default}),v()(component,{VBtn:f.a,VCol:m.a,VContainer:h.a,VIcon:k.a,VRow:x.a,VTextField:_.a})}}]);