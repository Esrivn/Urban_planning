System.register([],(function(e,t){return{execute:function(){e((()=>{"use strict";var e,t={d:(e,a)=>{for(var r in a)t.o(a,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:a[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},a={};t.r(a),t.d(a,{EnumActionKeys:()=>e,default:()=>r}),function(e){e.MenuItemAction="MenuItem_Action",e.GetDataCategory="GetData_Category",e.DataCategoryCurrent="DataCategoryCurrent",e.DataCategoryPrevous="DataCategoryPrevous",e.PageCategories="PageCategories"}(e||(e={}));class r{constructor(){this.id="layout-local-redux-store-extension"}getActions(){return Object.keys(e).map((t=>e[t]))}getReducer(){return(t,a,r)=>{switch(a.type){case e.MenuItemAction:return t.set("typeLayout",a.val);case e.GetDataCategory:return t.set("dataCategory",a.val);case e.DataCategoryCurrent:return t.set("dataCategoryCurrent",a.val);case e.DataCategoryPrevous:return t.set("dataCategoryPrevous",a.val);case e.PageCategories:return t.set("pageCategories",a.val);default:return t}}}getInitLocalState(){return{typeLayout:{type:"",title:"Indoor"},dataCategory:null,dataCategoryCurrent:null,dataCategoryPrevous:null,pageCategories:[{type:"",title:"Indoor",subTitle:"",data:null,level:0,page:0}]}}getStoreKey(){return"layoutState"}}return a})())}}}));