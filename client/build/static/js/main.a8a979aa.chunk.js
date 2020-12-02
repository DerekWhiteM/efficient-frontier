(this["webpackJsonpefficient-portfolio"]=this["webpackJsonpefficient-portfolio"]||[]).push([[0],{38:function(t,e,n){},63:function(t,e,n){"use strict";n.r(e);var s=n(0),c=n(1),a=n(29),o=n.n(a),r=(n(37),n(38),n(9)),i=n(2);function l(t){if(!t)return null;try{var e=localStorage.getItem(t);return e?JSON.parse(e):null}catch(n){return null}}function u(t,e){t||console.error("Error: Key is missing");try{localStorage.setItem(t,JSON.stringify(e))}catch(n){console.error(n)}}var j=function(){var t=function(){fetch("/account/logout",{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({token:l("token")})}).then((function(t){return t.json()})).then((function(t){!0===t.isGuest&&e(),window.location="/"}))},e=function(){fetch("/account/delete",{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({user_id:l("user")})}).then((function(e){return t(),e.json()}))};return Object(s.jsx)("nav",{className:"navbar navbar-dark bg-dark navbar-expand-lg",children:Object(s.jsxs)("div",{className:"container",style:{position:"relative"},children:[Object(s.jsx)(r.b,{to:"/",className:"navbar-brand",children:"Portfolio Builder"}),Object(s.jsxs)("ul",{className:"navbar-nav navigation",children:[Object(s.jsx)(r.b,{to:"/register",className:"nav-link",children:"Sign Up"}),Object(s.jsx)(r.b,{to:"/login",className:"nav-link",children:"Log In"}),Object(s.jsx)("button",{onClick:function(){l("guest")?(u("guest",!1),e()):t()},children:"Logout"}),Object(s.jsx)("button",{onClick:e,children:"Delete Account"})]})]})})},d=n(4),b=function(t){var e=Object(c.useState)(""),n=Object(d.a)(e,2),a=n[0],o=n[1],i=Object(c.useState)(""),j=Object(d.a)(i,2),b=j[0],h=j[1];return Object(s.jsxs)("div",{className:"inner-login",children:[Object(s.jsx)("h1",{style:{textAlign:"center"},children:"Log in"}),Object(s.jsx)("br",{}),Object(s.jsx)("input",{style:{display:"block",marginLeft:"auto",marginRight:"auto",marginBottom:"3px"},type:"text",placeholder:"Username",name:"username",value:a,onChange:function(t){return o(t.target.value)}}),Object(s.jsx)("input",{style:{display:"block",marginLeft:"auto",marginRight:"auto"},type:"password",placeholder:"Password",name:"password",value:b,onChange:function(t){return h(t.target.value)}}),Object(s.jsx)("br",{}),Object(s.jsx)("button",{style:{display:"block",marginLeft:"auto",marginRight:"auto"},className:"btn btn-secondary",onClick:function(e){fetch("/account/signin",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:a,password:b})}).then((function(t){return t.json()})).then((function(e){u("token",e.token),u("user",e.user),console.log("Login: "+l("user")),u("username",a),console.log(e),t(!1)}))},children:"Submit"}),Object(s.jsx)("br",{}),Object(s.jsxs)("p",{style:{textAlign:"center"},children:["Don't have an account?",Object(s.jsx)("br",{}),Object(s.jsx)(r.b,{to:"/register",className:"nav-link",children:"Sign Up"})," or continue as\xa0",Object(s.jsx)("a",{href:"/#",onClick:function(){fetch("/account/guest",{method:"GET"}).then((function(t){return t.json()})).then((function(t){u("token",t.token),u("user",t.user),u("guest",!0),setTimeout((function(){window.location="/"}),1e3)}))},children:"Guest"})]})]})},h=n(11),f=n(12),O=n.n(f),g=function(t){var e=function(){for(var e=[],n=0;n<t.otherAssets.length;n++)e.push(Object(s.jsx)("option",{children:t.otherAssets[n].assetClass},n));return Object(s.jsx)("select",{id:"assets",children:e})};return Object(s.jsxs)("div",{children:[Object(s.jsx)("button",{style:{marginRight:"5px"},onClick:function(){!function(){var e=document.getElementById("assets").selectedIndex,n=Object(h.a)(t.assets);t.otherAssets[e]&&(n.push(t.otherAssets[e]),t.setAssets(n),t.otherAssets.splice(e,1),O.a.post("/account/assets",{assets:n,userId:l("user")}))}()},children:"Add"}),Object(s.jsx)(e,{})]})},p=n(31),x=n.n(p),m=function(t){var e=Object(c.useState)([]),n=Object(d.a)(e,2),a=n[0],o=n[1],r=Object(c.useState)(),i=Object(d.a)(r,2),l=i[0],u=i[1],j={type:"scatter",data:{datasets:[{fill:!1,backgroundColor:"rgba(75,192,192,0.4)",pointBorderColor:"rgba(75,192,192,1)",pointBackgroundColor:"#fff",pointBorderWidth:1,pointHoverRadius:1,pointHoverBackgroundColor:"rgba(75,192,192,1)",pointHoverBorderColor:"rgba(220,220,220,1)",pointHoverBorderWidth:1,pointRadius:1,pointHitRadius:10,data:a}]},options:{legend:{display:!1},scales:{yAxes:[{scaleLabel:{display:!0,labelString:"Return"}}],xAxes:[{scaleLabel:{display:!0,labelString:"Standard Deviation"}}]},tooltips:{position:"nearest",callbacks:{afterTitle:function(e){for(var n=Object(h.a)(a[e[0].index].holdings),s=0;s<n.length;s++){var c=t.assets[s].assetClass;n[s]=c+": "+Math.round(100*n[s]*100)/100+"%"}return n}}}}};return Object(c.useEffect)((function(){fetch("/portfolio",{method:"post",body:JSON.stringify({assets:t.assets}),headers:{"Content-type":"application/json"}}).then((function(t){return t.json()})).then((function(t){return o(t)}))}),[t.assets]),Object(c.useEffect)((function(){l&&l.destroy();var t=document.getElementById("myChart");u(new x.a(t,j))}),[a]),Object(s.jsx)("div",{id:"canvas",className:"container",children:Object(s.jsx)("canvas",{id:"myChart",width:"400",height:"200"})})},v=function(t){return Object(s.jsxs)("tr",{children:[Object(s.jsx)("td",{children:t.asset.assetClass}),Object(s.jsx)("td",{children:t.asset.name}),Object(s.jsx)("td",{children:t.asset.ticker}),Object(s.jsx)("td",{children:Object(s.jsx)("button",{onClick:function(){t.deleteAsset(t.asset._id)},children:"delete"})})]})},y=function(){var t=Object(c.useState)([]),e=Object(d.a)(t,2),n=e[0],a=e[1],o=Object(c.useState)([]),r=Object(d.a)(o,2),i=r[0],u=r[1],j=Object(c.useState)(!0),b=Object(d.a)(j,2),f=b[0],p=b[1];Object(c.useEffect)((function(){O.a.get("/account/info?userId="+l("user")).then((function(t){var e=t.data.assets;O.a.post("/assets/get",e).then((function(t){a(t.data.assets),u(t.data.otherAssets)})).then((function(){return p(!1)})).catch((function(t){return console.log(t)}))})).catch((function(t){console.log(t)}))}),[]);var x=function(t){for(var e=Object(h.a)(i),s=0;s<n.length;s++)if(n[s]._id===t){e.push(n[s]);break}u(e);var c=n.filter((function(e){return e._id!==t}));a(c),O.a.post("/account/assets",{assets:c,userId:l("user")})};return f?Object(s.jsx)("div",{}):Object(s.jsxs)("div",{className:"container",children:[Object(s.jsx)("div",{style:{textAlign:"right",marginBottom:"25px",marginRight:"8px"},children:Object(s.jsx)(g,{otherAssets:i,assets:n,setAssets:a})}),Object(s.jsxs)("table",{className:"table",children:[Object(s.jsx)("thead",{children:Object(s.jsxs)("tr",{children:[Object(s.jsx)("th",{children:"Asset Class"}),Object(s.jsx)("th",{children:"Name"}),Object(s.jsx)("th",{children:"Ticker"}),Object(s.jsx)("th",{})]})}),Object(s.jsx)("tbody",{children:n.map((function(t){return Object(s.jsx)(v,{asset:t,deleteAsset:x},t._id)}))})]}),Object(s.jsx)(m,{assets:n})]})},k=function(){var t=Object(c.useState)(!0),e=Object(d.a)(t,2),n=e[0],a=e[1];return Object(c.useEffect)((function(){var t=l("token");t&&fetch("/account/verify?token="+t,{method:"GET"}).then((function(t){return t.json()})).then((function(t){t.success&&a(!1)}))}),[]),n?Object(s.jsx)("div",{id:"login",children:Object(s.jsx)(b,{setIsLoading:a})}):Object(s.jsx)("div",{children:Object(s.jsx)(y,{})})},S=function(){var t=Object(c.useState)(""),e=Object(d.a)(t,2),n=e[0],a=e[1],o=Object(c.useState)(""),r=Object(d.a)(o,2),i=r[0],l=r[1];return Object(s.jsxs)("div",{className:"inner-login",children:[Object(s.jsx)("h1",{style:{textAlign:"center"},children:"Sign up"}),Object(s.jsx)("br",{}),Object(s.jsx)("input",{style:{display:"block",marginLeft:"auto",marginRight:"auto",marginBottom:"3px"},type:"text",placeholder:"Username",name:"username",value:n,onChange:function(t){return a(t.target.value)}}),Object(s.jsx)("input",{style:{display:"block",marginLeft:"auto",marginRight:"auto"},type:"password",placeholder:"Password",name:"password",value:i,onChange:function(t){return l(t.target.value)}}),Object(s.jsx)("br",{}),Object(s.jsx)("button",{style:{display:"block",marginLeft:"auto",marginRight:"auto"},className:"btn btn-secondary",onClick:function(){fetch("/account/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:n,password:i})}).then((function(t){return t.json()})).then((function(t){fetch("/account/signin",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:n,password:i})}).then((function(t){return t.json()})).then((function(t){u("token",t.token),u("user",t.user),u("username",n),setTimeout((function(){window.location="/"}),1e3)}))}))},children:"Submit"}),Object(s.jsx)("br",{}),Object(s.jsxs)("p",{style:{textAlign:"center"},children:["Already have an account? ",Object(s.jsx)("a",{href:"/login",children:"Log in"})]})]})},C=function(){return Object(s.jsx)(r.a,{children:Object(s.jsxs)("div",{children:[Object(s.jsx)(j,{}),Object(s.jsx)("br",{}),Object(s.jsx)(i.a,{path:"/",exact:!0,component:k}),Object(s.jsx)(i.a,{path:"/dataset",component:m}),Object(s.jsx)(i.a,{path:"/login",component:b}),Object(s.jsx)(i.a,{path:"/register",component:S})]})})};o.a.render(Object(s.jsx)(C,{}),document.getElementById("root"))}},[[63,1,2]]]);
//# sourceMappingURL=main.a8a979aa.chunk.js.map