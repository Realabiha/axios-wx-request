!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports["axios-wx-request"]=t():e["axios-wx-request"]=t()}(wx,(()=>(()=>{"use strict";var e={d:(t,n)=>{for(var o in n)e.o(n,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:n[o]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{default:()=>p});const n=function(e,t){return new Promise(((n,o)=>{e({...t,success(e){n(e)},fail(e){o(e)}})}))},o=(function(e){const t=[],n=function(...o){return t.push(...o),e.length<=t.length?e.apply(null,t):n}}(n),function(e){return new Promise(((t,n)=>{const o=wx.request({...e,success(e){t(e)},fail(e){n(e)}});e.cancelPromise&&e.cancelPromise.then((e=>o.abort()))}))}),r=function(){this.handlers=[]};r.prototype.use=function(e,t){this.handlers.push(e,t)},r.prototype.forEach=function(e){this.handlers.forEach(e)};const s=r;let c;function i(){return{cancelPromise:new Promise(((e,t)=>{c=e})),cancelFunc(){c()}}}const u=[],f=[o,void 0],l=function(){};l.prototype.request=function(e){let t=Promise.resolve(e);u.push(f);const{request:n,response:o}=this.intercepter,r=n.handlers,s=o.handlers;for(u.unshift(r),u.push(s);u.length;){const e=u.shift();for(;e.length;)t=t.then(e.shift(),e.shift())}return t};const p=function(){const e=new l;e.intercepter={request:new s,response:new s},e.cancelFunc=i;const t=l.prototype.request.bind(e);var n,o;return n=t,o=e,Object.assign(n,o),t}();return t})()));