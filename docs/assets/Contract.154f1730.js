import{c as o,m as _,t as x,a as D,h as I,w as A,j as c,b as n,o as i,d as B,e as R,f as C,g,i as v,p as y,k as W,l as M,n as u,q as h,r as f,L as z,F as S,s as N,u as j,v as l,S as d,x as s,y as L,z as V,A as F,B as q,C as G,D as k,E as H,G as U}from"./index.44aa475a.js";const $=o(D("animate-spin"),x("text-blue-500"),_("mr-2")),J=o($,A("w-5"),I("h-5")),K=()=>c("svg",{className:J,viewBox:"0 0 24 24",children:[n("circle",{className:o(i("opacity-25")),cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"3"}),n("path",{className:o(i("opacity-75")),fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"})]}),P=(t,e)=>o(f("flex"),h("flex-row"),u("items-center"),M("bg-transparent",t?void 0:"hover:bg-blue-500"),x("text-blue-500",t?void 0:"hover:text-white"),W("font-semibold"),y("py-2","px-4"),v("border"),g("border-blue-500",t?void 0:"hover:border-transparent"),C("rounded"),R("focus:outline-none"),t||e?i("opacity-50"):void 0,t||e?B("cursor-not-allowed"):void 0),Q=({onClick:t,title:e,disabled:r,loading:a})=>c("button",{className:P(r,a),onClick:t,disabled:r||a,children:[a&&n(K,{}),e]});var X=Q;function Y({address:t}){const{contractNames:e}=l(d);return n(S,{children:e[t]||N(t,j)})}function Z({address:t}){return n(z,{fallback:n(S,{children:N(t,j)}),children:n(Y,{address:t})})}const tt=o(f("flex"),h("flex-row"),k("justify-between"),u("items-center"),v("border"),g("border-blue-500"),C("rounded"),y("p-2")),et=o(f("flex"),h("flex-col"),k("justify-center"),u("items-end"),H("space-y-2"));function at({address:t}){const{account:e}=l(s),{originalContractsToOwnersMaps:r}=l(d),a=Object.values(r[t]),m=!!e&&a.includes(e),E=U.VITE_DOSU_INVITES_CONTRACT_ADDRESS===t,[T,p]=L(!1);return c("div",{className:tt,children:[n(V,{children:n(Z,{address:t})}),c("div",{className:et,children:[n(X,{title:e?m?"Owned":"Mint":"Connect wallet",disabled:m,loading:T,onClick:async()=>{if(E)return window.open("https://invites.dosu.io","_blank");if(!s.account)return s.connect();p(!0);try{const w=(await d.ledger)[t];if(!w)throw new Error("Contract not found");const{originalContract:O}=w;if(!s.provider)throw new Error("No provider found");await(await F.SimpleERC721__factory.connect(O.address,s.provider.getSigner(0)).mint()).wait()}catch(b){q(b)}finally{p(!1)}}}),c(G,{children:["Total minted:"," ",Object.keys(r[t]).length]})]})]})}export{at as default};
