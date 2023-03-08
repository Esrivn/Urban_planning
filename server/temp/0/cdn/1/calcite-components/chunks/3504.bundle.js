/*! For license information please see 3504.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkexb_client=self.webpackChunkexb_client||[]).push([[3504,669,3421,5617,7824,8283],{3504:(t,e,n)=>{n.r(e),n.d(e,{calcite_radio_group:()=>c,calcite_radio_group_item:()=>s});var i=n(3848),a=n(669),r=n(8283),o=n(3421),l=n(7824),c=function(){function t(t){var e=this;(0,i.r)(this,t),this.calciteRadioGroupChange=(0,i.c)(this,"calciteRadioGroupChange",7),this.appearance="solid",this.disabled=!1,this.required=!1,this.layout="horizontal",this.scale="m",this.value=null,this.width="auto",this.handleClick=function(t){"calcite-radio-group-item"===t.target.localName&&e.selectItem(t.target,!0)}}return t.prototype.valueHandler=function(t){this.getItems().forEach((function(e){return e.checked=e.value===t}))},t.prototype.handleSelectedItemChange=function(t,e){if(this.value=null==t?void 0:t.value,t!==e){var n=this.getItems(),i=Array.from(n).filter((function(e){return e===t})).pop();i?this.selectItem(i):n[0]&&(n[0].tabIndex=0)}},t.prototype.componentWillLoad=function(){var t=this.getItems(),e=Array.from(t).filter((function(t){return t.checked})).pop();e?this.selectItem(e):t[0]&&(t[0].tabIndex=0)},t.prototype.connectedCallback=function(){(0,r.c)(this),(0,o.c)(this)},t.prototype.disconnectedCallback=function(){(0,r.d)(this),(0,o.d)(this)},t.prototype.componentDidRender=function(){(0,l.u)(this)},t.prototype.render=function(){return(0,i.h)(i.H,{onClick:this.handleClick,role:"radiogroup"},(0,i.h)("slot",null),(0,i.h)(o.H,{component:this}))},t.prototype.handleSelected=function(t){t.stopPropagation(),t.preventDefault(),this.selectItem(t.target)},t.prototype.handleKeyDown=function(t){var e=t.key,n=this.el,i=this.selectedItem;if(-1!==["ArrowLeft","ArrowUp","ArrowRight","ArrowDown"," "].indexOf(e)){var r=e;"rtl"===(0,a.a)(n)&&("ArrowRight"===e&&(r="ArrowLeft"),"ArrowLeft"===e&&(r="ArrowRight"));var o=this.getItems(),l=-1;switch(o.forEach((function(t,e){t===i&&(l=e)})),r){case"ArrowLeft":case"ArrowUp":t.preventDefault();var c=l<1?o.item(o.length-1):o.item(l-1);return void this.selectItem(c,!0);case"ArrowRight":case"ArrowDown":t.preventDefault();var s=-1===l?o.item(1):o.item(l+1)||o.item(0);return void this.selectItem(s,!0);case" ":return t.preventDefault(),void this.selectItem(t.target,!0);default:return}}},t.prototype.setFocus=function(){return function(t,e,n,i){function a(t){return t instanceof n?t:new n((function(e){e(t)}))}return new(n||(n=Promise))((function(n,r){function o(t){try{c(i.next(t))}catch(t){r(t)}}function l(t){try{c(i.throw(t))}catch(t){r(t)}}function c(t){t.done?n(t.value):a(t.value).then(o,l)}c((i=i.apply(t,e||[])).next())}))}(this,void 0,void 0,(function(){var t;return function(t,e){var n,i,a,r,o={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return r={next:l(0),throw:l(1),return:l(2)},"function"==typeof Symbol&&(r[Symbol.iterator]=function(){return this}),r;function l(t){return function(e){return c([t,e])}}function c(r){if(n)throw new TypeError("Generator is already executing.");for(;o;)try{if(n=1,i&&(a=2&r[0]?i.return:r[0]?i.throw||((a=i.return)&&a.call(i),0):i.next)&&!(a=a.call(i,r[1])).done)return a;switch(i=0,a&&(r=[2&r[0],a.value]),r[0]){case 0:case 1:a=r;break;case 4:return o.label++,{value:r[1],done:!1};case 5:o.label++,i=r[1],r=[0];continue;case 7:r=o.ops.pop(),o.trys.pop();continue;default:if(!((a=(a=o.trys).length>0&&a[a.length-1])||6!==r[0]&&2!==r[0])){o=0;continue}if(3===r[0]&&(!a||r[1]>a[0]&&r[1]<a[3])){o.label=r[1];break}if(6===r[0]&&o.label<a[1]){o.label=a[1],a=r;break}if(a&&o.label<a[2]){o.label=a[2],o.ops.push(r);break}a[2]&&o.ops.pop(),o.trys.pop();continue}r=e.call(t,o)}catch(t){r=[6,t],i=0}finally{n=a=0}if(5&r[0])throw r[1];return{value:r[0]?r[1]:void 0,done:!0}}}(this,(function(e){return null===(t=this.selectedItem||this.getItems()[0])||void 0===t||t.focus(),[2]}))}))},t.prototype.onLabelClick=function(){this.setFocus()},t.prototype.getItems=function(){return this.el.querySelectorAll("calcite-radio-group-item")},t.prototype.selectItem=function(t,e){var n=this;if(void 0===e&&(e=!1),t!==this.selectedItem){var i=this.getItems(),a=null;i.forEach((function(i){var r=i.value===t.value;(r&&!i.checked||!r&&i.checked)&&(i.checked=r),i.tabIndex=r?0:-1,r&&(a=i,e&&n.calciteRadioGroupChange.emit(a.value))})),this.selectedItem=a,a&&a.focus()}},Object.defineProperty(t.prototype,"el",{get:function(){return(0,i.g)(this)},enumerable:!1,configurable:!0}),Object.defineProperty(t,"watchers",{get:function(){return{value:["valueHandler"],selectedItem:["handleSelectedItemChange"]}},enumerable:!1,configurable:!0}),t}();c.style="@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:root{--calcite-popper-transition:var(--calcite-animation-timing)}:host([hidden]){display:none}:host{display:-ms-flexbox;display:flex;background-color:var(--calcite-ui-foreground-1);width:-moz-fit-content;width:-webkit-fit-content;width:fit-content;outline:1px solid var(--calcite-ui-border-input);outline-offset:-1px}:host([disabled]){pointer-events:none;cursor:default;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;opacity:var(--calcite-ui-opacity-disabled)}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}:host([layout=vertical]){-ms-flex-direction:column;flex-direction:column;-ms-flex-align:start;align-items:flex-start;-ms-flex-item-align:start;align-self:flex-start}:host([width=full]){width:100%;min-width:-moz-fit-content;min-width:-webkit-fit-content;min-width:fit-content}:host([width=full]) ::slotted(calcite-radio-group-item){-ms-flex:1 1 auto;flex:1 1 auto}:host([width=full][layout=vertical]) ::slotted(calcite-radio-group-item){-ms-flex-pack:start;justify-content:flex-start}::slotted(calcite-radio-group-item[checked]),::slotted(calcite-radio-group-item:focus){z-index:0}::slotted(input[slot=hidden-form-input]){bottom:0 !important;left:0 !important;margin:0 !important;opacity:0 !important;outline:none !important;padding:0 !important;position:absolute !important;right:0 !important;top:0 !important;-webkit-transform:none !important;transform:none !important;-webkit-appearance:none !important;z-index:-1 !important}";var s=function(){function t(t){(0,i.r)(this,t),this.calciteRadioGroupItemChange=(0,i.c)(this,"calciteRadioGroupItemChange",7),this.checked=!1,this.iconFlipRtl=!1,this.iconPosition="start"}return t.prototype.handleCheckedChange=function(){this.calciteRadioGroupItemChange.emit()},t.prototype.render=function(){var t=this.checked,e=this.value,n=(0,a.d)(this.el,"scale","m"),r=(0,a.d)(this.el,"appearance","solid"),o=(0,a.d)(this.el,"layout","horizontal"),l=(0,i.h)("calcite-icon",{class:"radio-group-item-icon",flipRtl:this.iconFlipRtl,icon:this.icon,scale:"s"});return(0,i.h)(i.H,{"aria-checked":t.toString(),role:"radio"},(0,i.h)("label",{class:{"label--scale-s":"s"===n,"label--scale-m":"m"===n,"label--scale-l":"l"===n,"label--horizontal":"horizontal"===o,"label--outline":"outline"===r}},this.icon&&"start"===this.iconPosition?l:null,(0,i.h)("slot",null,e),(0,i.h)("slot",{name:"input"}),this.icon&&"end"===this.iconPosition?l:null))},Object.defineProperty(t.prototype,"el",{get:function(){return(0,i.g)(this)},enumerable:!1,configurable:!0}),Object.defineProperty(t,"watchers",{get:function(){return{checked:["handleCheckedChange"]}},enumerable:!1,configurable:!0}),t}();s.style="@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:root{--calcite-popper-transition:var(--calcite-animation-timing)}:host([hidden]){display:none}:host{display:-ms-flexbox;display:flex;cursor:pointer;-ms-flex-item-align:stretch;align-self:stretch;font-weight:var(--calcite-font-weight-normal);-webkit-transition:background-color var(--calcite-internal-animation-timing-fast) ease-in-out, border-color var(--calcite-animation-timing) ease-in-out;transition:background-color var(--calcite-internal-animation-timing-fast) ease-in-out, border-color var(--calcite-animation-timing) ease-in-out}:host label{pointer-events:none;margin:0.125rem;-webkit-box-sizing:border-box;box-sizing:border-box;display:-ms-flexbox;display:flex;-ms-flex:1 1 0%;flex:1 1 0%;-ms-flex-align:center;align-items:center;color:var(--calcite-ui-text-3);-webkit-transition:background-color var(--calcite-internal-animation-timing-fast) ease-in-out, border-color var(--calcite-internal-animation-timing-fast) ease-in-out, color var(--calcite-internal-animation-timing-fast) ease-in-out;transition:background-color var(--calcite-internal-animation-timing-fast) ease-in-out, border-color var(--calcite-internal-animation-timing-fast) ease-in-out, color var(--calcite-internal-animation-timing-fast) ease-in-out}.label--horizontal{-ms-flex-pack:center;justify-content:center}:host{outline-offset:0;outline-color:transparent;-webkit-transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}:host(:focus){outline:2px solid var(--calcite-ui-brand);outline-offset:-1px}.label--scale-s{padding-left:0.5rem;padding-right:0.5rem;font-size:var(--calcite-font-size--2);line-height:1rem;padding-top:0.125rem;padding-bottom:0.125rem}.label--scale-m{padding-left:0.75rem;padding-right:0.75rem;font-size:var(--calcite-font-size--1);line-height:1rem;padding-top:0.375rem;padding-bottom:0.375rem}.label--scale-l{padding-left:1rem;padding-right:1rem;padding-top:0.625rem;padding-bottom:0.625rem;font-size:var(--calcite-font-size-0);line-height:1.25rem}:host(:hover) label{background-color:var(--calcite-ui-foreground-2);color:var(--calcite-ui-text-1)}:host(:active) label{background-color:var(--calcite-ui-foreground-3)}:host([checked]) label{cursor:default;border-color:var(--calcite-ui-brand);background-color:var(--calcite-ui-brand);color:var(--calcite-ui-background)}:host([checked]) .label--outline{border-color:var(--calcite-ui-brand);background-color:var(--calcite-ui-foreground-1);-webkit-box-shadow:inset 0 0 0 1px var(--calcite-ui-brand);box-shadow:inset 0 0 0 1px var(--calcite-ui-brand);color:var(--calcite-ui-brand)}::slotted(input){display:none}.radio-group-item-icon{position:relative;margin:0px;display:-ms-inline-flexbox;display:inline-flex;line-height:inherit}:host([icon-position=start]) .label--scale-s .radio-group-item-icon{-webkit-margin-end:0.5rem;margin-inline-end:0.5rem}:host([icon-position=end]) .label--scale-s .radio-group-item-icon{-webkit-margin-end:unset;margin-inline-end:unset;-webkit-margin-start:0.5rem;margin-inline-start:0.5rem}:host([icon-position=start]) .label--scale-m .radio-group-item-icon{-webkit-margin-end:0.75rem;margin-inline-end:0.75rem}:host([icon-position=end]) .label--scale-m .radio-group-item-icon{-webkit-margin-end:unset;margin-inline-end:unset;-webkit-margin-start:0.75rem;margin-inline-start:0.75rem}:host([icon-position=start]) .label--scale-l .radio-group-item-icon{-webkit-margin-end:1rem;margin-inline-end:1rem}:host([icon-position=end]) .label--scale-l .radio-group-item-icon{-webkit-margin-end:unset;margin-inline-end:unset;-webkit-margin-start:1rem;margin-inline-start:1rem}"},669:(t,e,n)=>{n.r(e),n.d(e,{C:()=>r,T:()=>o,a:()=>u,b:()=>s,c:()=>b,d:()=>m,e:()=>l,f:()=>g,g:()=>k,h:()=>p,i:()=>v,j:()=>E,k:()=>x,n:()=>c,q:()=>h,s:()=>D});var i=n(6553),a=function(t,e,n){if(n||2===arguments.length)for(var i,a=0,r=e.length;a<r;a++)!i&&a in e||(i||(i=Array.prototype.slice.call(e,0,a)),i[a]=e[a]);return t.concat(i||Array.prototype.slice.call(e))},r={autoTheme:"calcite-theme-auto",darkTheme:"calcite-theme-dark",lightTheme:"calcite-theme-light",rtl:"calcite--rtl"},o={loading:"Loading"};function l(t){return t?t.id=t.id||"".concat(t.tagName.toLowerCase(),"-").concat((0,i.g)()):""}function c(t){return Array.isArray(t)?t:Array.from(t)}function s(t){var e=b(t,".".concat(r.darkTheme,", .").concat(r.lightTheme));return(null==e?void 0:e.classList.contains("calcite-theme-dark"))?"dark":"light"}function u(t){var e=b(t,"[".concat("dir","]"));return e?e.getAttribute("dir"):"ltr"}function m(t,e,n){var i="[".concat(e,"]"),a=t.closest(i);return a?a.getAttribute(e):n}function d(t){return t.getRootNode()}function f(t){return t.host||null}function p(t,e){return function t(n,i){if(!n)return i;n.assignedSlot&&(n=n.assignedSlot);var r=d(n),o=Array.from(r.querySelectorAll(e)).filter((function(t){return!i.includes(t)}));i=a(a([],i,!0),o,!0);var l=f(r);return l?t(l,i):i}(t,[])}function h(t,e){var n=e.selector,i=e.id;return function t(e){if(!e)return null;e.assignedSlot&&(e=e.assignedSlot);var a=d(e),r=i?a.getElementById(i):n?a.querySelector(n):null,o=f(a);return r||(o?t(o):null)}(t)}function b(t,e){return function t(n){return n?n.closest(e)||t(f(d(n))):null}(t)}function v(t){return"function"==typeof(null==t?void 0:t.setFocus)}function g(t){return function(t,e,n,i){function a(t){return t instanceof n?t:new n((function(e){e(t)}))}return new(n||(n=Promise))((function(n,r){function o(t){try{c(i.next(t))}catch(t){r(t)}}function l(t){try{c(i.throw(t))}catch(t){r(t)}}function c(t){t.done?n(t.value):a(t.value).then(o,l)}c((i=i.apply(t,e||[])).next())}))}(this,void 0,void 0,(function(){return function(t,e){var n,i,a,r,o={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return r={next:l(0),throw:l(1),return:l(2)},"function"==typeof Symbol&&(r[Symbol.iterator]=function(){return this}),r;function l(t){return function(e){return c([t,e])}}function c(r){if(n)throw new TypeError("Generator is already executing.");for(;o;)try{if(n=1,i&&(a=2&r[0]?i.return:r[0]?i.throw||((a=i.return)&&a.call(i),0):i.next)&&!(a=a.call(i,r[1])).done)return a;switch(i=0,a&&(r=[2&r[0],a.value]),r[0]){case 0:case 1:a=r;break;case 4:return o.label++,{value:r[1],done:!1};case 5:o.label++,i=r[1],r=[0];continue;case 7:r=o.ops.pop(),o.trys.pop();continue;default:if(!((a=(a=o.trys).length>0&&a[a.length-1])||6!==r[0]&&2!==r[0])){o=0;continue}if(3===r[0]&&(!a||r[1]>a[0]&&r[1]<a[3])){o.label=r[1];break}if(6===r[0]&&o.label<a[1]){o.label=a[1],a=r;break}if(a&&o.label<a[2]){o.label=a[2],o.ops.push(r);break}a[2]&&o.ops.pop(),o.trys.pop();continue}r=e.call(t,o)}catch(t){r=[6,t],i=0}finally{n=a=0}if(5&r[0])throw r[1];return{value:r[0]?r[1]:void 0,done:!0}}}(this,(function(e){return t?[2,v(t)?t.setFocus():t.focus()]:[2]}))}))}var y=":not([slot])";function k(t,e,n){e&&!Array.isArray(e)&&"string"!=typeof e&&(n=e,e=null);var i=e?Array.isArray(e)?e.map((function(t){return'[slot="'.concat(t,'"]')})).join(","):'[slot="'.concat(e,'"]'):y;return(null==n?void 0:n.all)?function(t,e,n){var i=e===y?w(t,y):Array.from(t.querySelectorAll(e));i=n&&!1===n.direct?i:i.filter((function(e){return e.parentElement===t})),i=(null==n?void 0:n.matches)?i.filter((function(t){return null==t?void 0:t.matches(n.matches)})):i;var r=null==n?void 0:n.selector;return r?i.map((function(t){return Array.from(t.querySelectorAll(r))})).reduce((function(t,e){return a(a([],t,!0),e,!0)}),[]).filter((function(t){return!!t})):i}(t,i,n):function(t,e,n){var i=e===y?w(t,y)[0]||null:t.querySelector(e);i=n&&!1===n.direct||(null==i?void 0:i.parentElement)===t?i:null,i=(null==n?void 0:n.matches)?(null==i?void 0:i.matches(n.matches))?i:null:i;var a=null==n?void 0:n.selector;return a?null==i?void 0:i.querySelector(a):i}(t,i,n)}function w(t,e){return t?Array.from(t.children||[]).filter((function(t){return null==t?void 0:t.matches(e)})):[]}function x(t,e){return Array.from(t.children).filter((function(t){return t.matches(e)}))}function D(t,e,n){return"string"==typeof e&&""!==e?e:""===e?t[n]:void 0}function E(t,e){return!(e.left>t.right||e.right<t.left||e.top>t.bottom||e.bottom<t.top)}},3421:(t,e,n)=>{n.r(e),n.d(e,{H:()=>p,a:()=>d,c:()=>s,d:()=>m});var i=n(669),a=n(3848),r="hidden-form-input";function o(t){return"checked"in t}var l=new WeakMap,c=new WeakSet;function s(t){var e=t.el,n=t.value,a=(0,i.c)(e,"form");if(a&&!function(t,e){var n="calciteInternalFormComponentRegister",i=!1;return t.addEventListener(n,(function(t){i=t.composedPath().some((function(t){return c.has(t)})),t.stopPropagation()}),{once:!0}),e.dispatchEvent(new CustomEvent(n,{bubbles:!0,composed:!0})),i}(a,e)){t.formEl=a,t.defaultValue=n,o(t)&&(t.defaultChecked=t.checked);var r=(t.onFormReset||u).bind(t);a.addEventListener("reset",r),c.add(e)}}function u(){o(this)?this.checked=this.defaultChecked:this.value=this.defaultValue}function m(t){var e=t.el,n=t.formEl;if(n){var i=l.get(e);n.removeEventListener("reset",i),l.delete(e),t.formEl=null,c.delete(e)}}function d(t,e){t.defaultValue=e}function f(t,e,n){var i,a=t.defaultValue,r=t.disabled,l=t.name,c=t.required;e.defaultValue=a,e.disabled=r,e.name=l,e.required=c,e.tabIndex=-1,o(t)?(e.defaultChecked=t.defaultChecked,e.value=t.checked?n||"on":"",r||t.checked||(e.disabled=!0)):e.value=n||"",null===(i=t.syncHiddenFormInput)||void 0===i||i.call(t,e)}var p=function(t){return function(t){var e=t.el,n=t.formEl,i=t.name,a=t.value,o=e.ownerDocument,l=e.querySelectorAll('input[slot="'.concat(r,'"]'));if(n&&i){var c,s=Array.isArray(a)?a:[a],u=[],m=new Set;l.forEach((function(e){var n=s.find((function(t){return t==e.value}));null!=n?(m.add(n),f(t,e,n)):u.push(e)})),s.forEach((function(e){if(!m.has(e)){var n=u.pop();n||((n=o.createElement("input")).slot=r),c||(c=o.createDocumentFragment()),c.append(n),f(t,n,e)}})),c&&e.append(c),u.forEach((function(t){return t.remove()}))}else l.forEach((function(t){return t.remove()}))}(t.component),(0,a.h)("slot",{name:r})}},6553:(t,e,n)=>{n.r(e),n.d(e,{g:()=>i});var i=function(){return[2,1,1,1,3].map((function(t){for(var e="",n=0;n<t;n++)e+=(65536*(1+Math.random())|0).toString(16).substring(1);return e})).join("-")}},7824:(t,e,n)=>{function i(){}function a(t,e){if(void 0===e&&(e=!1),t.disabled)return t.el.setAttribute("tabindex","-1"),t.el.setAttribute("aria-disabled","true"),t.el.contains(document.activeElement)&&document.activeElement.blur(),void(t.el.click=i);t.el.click=HTMLElement.prototype.click,"function"==typeof e?t.el.setAttribute("tabindex",e.call(t)?"0":"-1"):!0===e?t.el.setAttribute("tabindex","0"):!1===e&&t.el.removeAttribute("tabindex"),t.el.removeAttribute("aria-disabled")}n.r(e),n.d(e,{u:()=>a})},8283:(t,e,n)=>{n.r(e),n.d(e,{a:()=>o,c:()=>u,d:()=>m,g:()=>d,l:()=>r});var i=n(669),a="calciteInternalLabelClick",r="calciteInternalLabelConnected",o="calciteInternaLabelDisconnected",l="calcite-label",c=new WeakMap,s=new Set;function u(t){var e=function(t){var e=t.id,n=e&&(0,i.q)(t,{selector:"".concat(l,'[for="').concat(e,'"]')});if(n)return n;var a=(0,i.c)(t,l);return!a||function(t,e){var n,i="custom-element-ancestor-check",a=function(i){i.stopImmediatePropagation();var a=i.composedPath();n=a.slice(a.indexOf(e),a.indexOf(t))};t.addEventListener(i,a,{once:!0}),e.dispatchEvent(new CustomEvent(i,{composed:!0,bubbles:!0})),t.removeEventListener(i,a);var r=n.filter((function(n){return n!==e&&n!==t})).filter((function(t){var e;return null===(e=t.tagName)||void 0===e?void 0:e.includes("-")}));return r.length>0}(a,t)?null:a}(t.el);if(!c.has(e)){var n=p.bind(t),u=h.bind(t);e?(!function(){t.labelEl=e;var n=f.bind(t);c.set(t.labelEl,n),t.labelEl.addEventListener(a,n)}(),s.delete(t),document.removeEventListener(r,n),document.addEventListener(o,u)):e||s.has(t)||(u(),document.removeEventListener(o,u))}}function m(t){var e=p.bind(t),n=h.bind(t);if(s.delete(t),document.removeEventListener(r,e),document.removeEventListener(o,n),t.labelEl){var i=c.get(t.labelEl);t.labelEl.removeEventListener(a,i),c.delete(t.labelEl)}}function d(t){var e,n;return t.label||(null===(n=null===(e=t.labelEl)||void 0===e?void 0:e.textContent)||void 0===n?void 0:n.trim())||""}function f(t){this.disabled||this.el.contains(t.detail.sourceEvent.target)||this.onLabelClick(t)}function p(){s.has(this)&&u(this)}function h(){s.add(this);var t=p.bind(this);document.addEventListener(r,t)}}}]);