import{k as n,q as i,D as d,A as e,C as h,y as u,x as p,S as m,B as f,Y as v,Z as g,H as r}from"./element-plus.acd4bc56.js";import{_ as b,a as k}from"./index.4ccb7564.js";var C="/assets/404.538aa4d7.png",S="/assets/404_cloud.98e7ac66.png";const t=n({name:"404",setup(){const{color:s}=k().getSetting;return{err404:C,errCloud:S,message:"The webmaster said that you can not enter this page...",color:s}}}),c=()=>{m(s=>({"047f933e":s.color.primary}))},_=t.setup;t.setup=_?(s,a)=>(c(),_(s,a)):c;const w=t,o=s=>(v("data-v-4a2f2224"),s=s(),g(),s),y={class:"wscn-http404-container"},B={class:"wscn-http404"},V={class:"pic-404"},I=["src"],$=["src"],N=["src"],x=["src"],A={class:"bullshit"},D=o(()=>e("div",{class:"bullshit__oops"},"OOPS!",-1)),L=o(()=>e("div",{class:"bullshit__info"},[r(" All rights reserved "),e("a",{class:"bullshit__info-link",href:"https://wallstreetcn.com",target:"_blank"},"wallstreetcn")],-1)),O={class:"bullshit__headline"},P=o(()=>e("div",{class:"bullshit__info"}," Please check that the URL you entered is correct, or click the button below to return to the homepage. ",-1)),T=r("Back to home");function j(s,a,q,E,H,R){const l=f("router-link");return i(),d("div",y,[e("div",B,[e("div",V,[e("img",{class:"pic-404__parent",src:s.err404,alt:"404"},null,8,I),e("img",{class:"pic-404__child left",src:s.errCloud,alt:"404"},null,8,$),e("img",{class:"pic-404__child mid",src:s.errCloud,alt:"404"},null,8,N),e("img",{class:"pic-404__child right",src:s.errCloud,alt:"404"},null,8,x)]),e("div",A,[D,L,e("div",O,h(s.message),1),P,u(l,{to:"/",class:"bullshit__return-home"},{default:p(()=>[T]),_:1})])])])}var Z=b(w,[["render",j],["__scopeId","data-v-4a2f2224"]]);export{Z as default};