import{r as c}from"./index.4ccb7564.js";import"./element-plus.acd4bc56.js";function s(e,t){const o=typeof e=="string"?[e]:e,n=c.currentRoute.value.meta.permission||[];return t==="and"?o.every(r=>n.includes(r)):o.some(r=>n.includes(r))}const u=(e,t)=>{const o=typeof t.value=="string"?[t.value]:t.value,a=t.arg==="and"?"and":"or";s(o,a)||e.parentNode&&e.parentNode.removeChild(e)};var d=e=>{e.directive("action",{mounted:(t,o)=>u(t,o)})};export{d as default};