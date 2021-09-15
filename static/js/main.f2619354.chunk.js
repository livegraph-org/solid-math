(this.webpackJsonpmath=this.webpackJsonpmath||[]).push([[0],{266:function(e,t,n){},604:function(e,t,n){"use strict";n.r(t);var r,c=n(1),i=n.n(c),a=n(143),o=n.n(a),u=(n(266),n(54)),s=n(8),l=n(0),f=n.n(l),d=n(2),b=n(3),j=n(53),v=n(27),O=Object(c.createContext)([null,function(){}]),h=n(4),p=["className"],m=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{className:""},t=e.className,n=Object(j.a)(e,p),r=Object(c.useState)(!0),i=Object(b.a)(r,2),a=i[0],o=i[1],u=Object(c.useContext)(O),l=Object(b.a)(u,2),m=l[0],g=l[1];Object(c.useEffect)((function(){o(!0),Object(v.handleIncomingRedirect)({url:window.location.href,restorePreviousSession:!0}).then((function(e){e&&g(e)})).catch((function(e){console.log(e),g(null)})).finally((function(){o(!1)}))}),[g]);var x=function(){var e=Object(d.a)(f.a.mark((function e(){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return o(!0),e.next=3,Object(v.login)({oidcIssuer:"https://solidcommunity.net",redirectUrl:window.location.href,clientName:"Math Livegraph"});case 3:o(!1);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),y=function(){var e=Object(d.a)(f.a.mark((function e(){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return o(!0),e.next=3,Object(v.logout)();case 3:g&&g(null),o(!1);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),k=Object(s.a)(Object(s.a)({},n),{},{className:"".concat(t," button")});return a?Object(h.jsx)("span",Object(s.a)(Object(s.a)({},k),{},{children:"Loading"})):(null===m||void 0===m?void 0:m.isLoggedIn)?Object(h.jsxs)("button",Object(s.a)(Object(s.a)({},k),{},{onClick:y,children:[null===m||void 0===m?void 0:m.webId," Logout"]})):Object(h.jsx)("button",Object(s.a)(Object(s.a)({},k),{},{onClick:x,children:"Login"}))},g=n(9),x=function(e,t,n,r){var c=Object(b.a)(t,2),i=c[0],a=c[1];e.font="20px Arial",e.textBaseline="middle",e.textAlign="left",Object.assign(e,r),e.fillText(n,i,a)},y=function(e,t,n,r){var c=Object(b.a)(t,2),i=c[0],a=c[1];Object.assign(e,r),e.beginPath(),e.arc(i,a,n,0,2*Math.PI),e.fill()},k=function(e,t,n,r){Object.assign(e,r),e.beginPath(),e.moveTo.apply(e,Object(g.a)(t)),e.lineTo.apply(e,Object(g.a)(n)),e.stroke()},w=n(239),E=n.n(w),S=n(614),N=n(251),C=n(253),L=n(36),I=n.n(L),M=["graph","grid","onTransform","onHover","onSelectNode"],P=function(e){var t=e.graph,n=e.grid,i=e.onTransform,a=e.onHover,o=e.onSelectNode,u=Object(j.a)(e,M),l=Object(c.useRef)(null),f=Object(c.useState)({width:0,height:0}),d=Object(b.a)(f,2),v=d[0],O=v.width,p=v.height,m=d[1];Object(c.useEffect)((function(){if(l&&l.current){var e=l.current.getContext("2d");if(e){var r=[O/2,p/2];e.save(),e.translate.apply(e,r),e.clearRect(-r[0],-r[1],O,p),function(e,t,n,r){for(var c=arguments.length>4&&void 0!==arguments[4]?arguments[4]:[0,0],i="#fff2",a=-c[1],o=r-c[1],u=-c[0],s=n-c[0],l=function(e){return 0===e?2:e%t.highlight===0?1:.5},f=0;f*t.distance+t.origin[0]<=s;){var d=f*t.distance+t.origin[0];d>=u&&k(e,[d,a],[d,o],{strokeStyle:i,lineWidth:l(f)}),f++}for(f=-1;f*t.distance+t.origin[0]>=u;){var b=f*t.distance+t.origin[0];b<=s&&k(e,[b,a],[b,o],{strokeStyle:i,lineWidth:l(f)}),f--}for(f=0;f*t.distance+t.origin[1]<=o;){var j=f*t.distance+t.origin[1];j>=a&&k(e,[u,j],[s,j],{strokeStyle:i,lineWidth:l(f)}),f++}for(f=-1;f*t.distance+t.origin[1]>=a;){var v=f*t.distance+t.origin[1];v<=o&&k(e,[u,v],[s,v],{strokeStyle:i,lineWidth:l(f)}),f--}}(e,n,O,p,r),t.links.forEach((function(t){k(e,[t.source.x,t.source.y],[t.target.x,t.target.y],{strokeStyle:"white",lineWidth:.5})}));var c="violet",i=t.nodes.filter((function(e){return"accent"===e.style})),a=t.nodes.filter((function(e){return"focus"===e.style})),o=t.nodes.filter((function(e){return!e.style}));return o.forEach((function(t){var n=t.x,r=t.y;return y(e,[n,r],10,{fillStyle:"#fff8"})})),o.forEach((function(t){var n=t.x,r=t.y,c=t.label;return x(e,[n+15,r],c,{fillStyle:"#fff4"})})),i.forEach((function(t){var n=t.x,r=t.y;return y(e,[n,r],10,{fillStyle:c})})),i.forEach((function(t){var n=t.x,r=t.y,i=t.label;return x(e,[n+15,r],i,{fillStyle:c})})),a.forEach((function(t){var n=t.x,r=t.y;return y(e,[n,r],10,{fillStyle:"red"})})),a.forEach((function(t){var n=t.x,r=t.y,c=t.label;return x(e,[n+15,r],c,{fillStyle:"red"})})),function(){return e.restore()}}}}),[O,p,t,l,n]),Object(c.useEffect)((function(){var e=function(){if(l&&l.current){var e=function(e){if(e&&e.current){var t=e.current;return{height:t.clientHeight,width:t.clientWidth}}return{height:0,width:0}}(l);m(e)}};return e(),window.addEventListener("load",e),window.addEventListener("resize",e),function(){window.removeEventListener("resize",e),window.removeEventListener("load",e)}}),[O,p,l]),Object(c.useEffect)((function(){l&&l.current&&(Object(C.a)(l.current).call(Object(S.a)().clickDistance(2).on("drag",(function(e){i([[1,0,e.dx],[0,1,e.dy],[0,0,1]])}))),Object(C.a)(l.current).call(Object(N.a)().clickDistance(2).scaleExtent([.05,3]).on("zoom",(function(e){var t;r=null!==(t=r)&&void 0!==t?t:[[1,0,-O/2],[0,1,-p/2],[0,0,1]];var n=e.transform,c=n.x,a=n.y,o=n.k,u=[[o,0,c-O/2],[0,o,a-p/2],[0,0,1]],s=I.a.dot(u,I.a.inv(r));r=u,i(s)}))))}),[l,i,p,O]);var g=function(e){return function(t){if(l&&l.current){var n=l.current.getBoundingClientRect(),r=t.clientX-n.left,c=t.clientY-n.top;e([r-O/2,c-p/2])}}},w=g(a),L=g(o);return Object(h.jsx)("canvas",Object(s.a)(Object(s.a)({},u),{},{ref:l,onMouseMove:w,onMouseOut:function(){return a([1/0,1/0])},width:O,height:p,className:E()(u.className,"has-background-dark"),onClick:L}))};var T=n(13),D=n(252),F=n(32),W=function(e,t){var n;return e[t]=null!==(n=e[t])&&void 0!==n?n:{type:"",description:"",dependsOn:{},label:""},e[t]},A=function(){var e=Object(d.a)(f.a.mark((function e(t){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(T.b)(t,{fetch:v.fetch});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();var G=n(28),R=n(148),B=n(608),H=n(609),X=n(610),q=n(611),z=n(612),Y=n(613);var J=function e(){var t=this;Object(G.a)(this,e),this.nodes=[],this.links=[],this.runs=!1,this.simulation=Object(R.a)().alphaDecay(.005).force("link",Object(B.a)().id((function(e){return e.uri})).distance(50).strength(.1)).force("linkGravity",function(){var e=[],t=3;function n(n){var r=t*n;e.forEach((function(e){var t=e.source,n=e.target;if("object"===typeof t&&"object"===typeof n&&t.y&&n.y&&t.vy&&n.vy&&t.y<n.y+50){var c=(n.y+50-t.y)/50;t.vy+=r*c,n.vy-=r*c}}))}return n.links=function(t){return e=t,n},n.strength=function(e){return t=e,n},n}().strength(50)).force("charge",Object(H.a)().strength(-150).distanceMax(500)).force("gravityX",Object(X.a)(0).strength(.01)).force("gravityY",Object(q.a)(0).strength(.01)).force("collide",Object(z.a)(15)).force("center",Object(Y.a)(0,0)).stop(),this.start=function(e){var n=e.nodes,r=e.links,c=e.onTick;t.nodes=n,t.links=r.map((function(e){return Object(s.a)({},e)})),t.simulation.nodes(t.nodes),t.simulation.force("link").links(t.links),t.simulation.force("linkGravity").links(t.links),t.simulation.on("tick",(function(){c({nodes:t.nodes,links:t.links})})),t.simulation.restart(),t.runs=!0},this.stop=function(){return t.runs=!1,t.simulation.stop()},this.update=function(e){var n=e.nodes,r=e.links;t.simulation.stop(),t.nodes=n.map((function(e){return Object(s.a)(Object(s.a)({},e),{},{x:e.x||400*Math.random(),y:e.y||400*Math.random()})})),t.links=r.map((function(e){return Object(s.a)({},e)})),t.simulation.nodes(t.nodes),t.simulation.force("link").links(t.links),t.simulation.force("linkGravity").links(t.links),t.simulation.alpha(.5).restart()},this.selectNode=function(e){var n=e.x,r=e.y;return t.simulation.find(n,r,32)}},U=n(96),$=n.n(U);var _,K=function(e){var t=new $.a.Graph;Object.values(e).forEach((function(e){t.setNode(e.uri),Object.values(e.dependsOn).forEach((function(n){return t.setEdge(e.uri,n.uri)}))}));var n=Object.fromEntries(Object.entries(e).map((function(e){var t=Object(b.a)(e,2),n=t[0],r=t[1];return[n,Object(s.a)(Object(s.a)({},r),{},{dependsOn:{}})]})));return function(e){if(!$.a.alg.isAcyclic(e))throw new Error("pruning is possible on DAG only");return e.edges().forEach((function(t){e.removeEdge(t),$.a.alg.dijkstra(e,t.v)[t.w].distance===1/0&&e.setEdge(t)})),e}(t).edges().map((function(e){return{source:e.v,target:e.w}})).forEach((function(e){var t=e.source,r=e.target;n[t].dependsOn[r]=n[r]})),n},Q=(n(454),n(244)),V=n.n(Q),Z=n(245),ee=n.n(Z),te=n(56),ne=n(246),re=n.n(ne),ce=te.a.div(_||(_=Object(u.a)(["\n  img {\n    max-width: 100%;\n  }\n"])));function ie(e){var t={children:e.children,remarkPlugins:[ee.a],rehypePlugins:[re.a]};return Object(h.jsx)(ce,{children:Object(h.jsx)(V.a,Object(s.a)({},t))})}var ae,oe,ue,se=function(e){var t=e.node,n=e.onSelectNode,r=Object.values(t.dependsOn);return Object(h.jsx)("div",{style:{position:"fixed",width:"100%",top:"0",bottom:0,pointerEvents:"none",overflowY:"auto",overflowX:"hidden"},children:Object(h.jsx)("div",{className:"columns mr-1 mt-6",children:Object(h.jsx)("div",{className:"column is-one-quarter is-offset-three-quarters",children:Object(h.jsxs)("div",{className:"card",style:{pointerEvents:"all",overflowX:"auto",width:"100%"},children:[Object(h.jsx)("header",{className:"card-header",children:Object(h.jsx)("p",{className:"card-header-title",children:t.label})}),Object(h.jsx)("section",{className:"card-content",children:Object(h.jsx)(ie,{children:t.description})}),Object(h.jsx)("header",{className:"card-header",children:Object(h.jsxs)("p",{className:"card-header-title",children:["dependencies: ",r.length]})}),Object(h.jsx)("section",{className:"card-content",children:Object(h.jsx)("ul",{className:"buttons are-small",children:r.map((function(e){return Object(h.jsx)("li",{onClick:function(){return n(e.uri)},className:"button is-link is-inverted",children:e.label},e.uri)}))})})]})})})})},le=n(7),fe=function(){var e=Object(d.a)(f.a.mark((function e(t){var n,r,c,i,a,o,u;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t){e.next=14;break}return e.next=3,Object(T.b)(t,{fetch:v.fetch});case 3:if(n=e.sent,!(r=Object(T.e)(n,t))){e.next=14;break}if(!(i=null===(c=Object(T.c)(r,F.e.publicTypeIndex))||void 0===c?void 0:c.value)){e.next=14;break}return e.next=10,Object(T.b)(i,{fetch:v.fetch});case 10:return a=e.sent,o=Object(T.f)(a),u=o.filter((function(e){return Object(T.d)(e,F.e.forClass).map((function(e){return e.value})).includes("https://terms.math.livegraph.org#concept")})).map((function(e){return Object(T.d)(e,F.e.instance)})).flat().map((function(e){return e.value})),e.abrupt("return",u);case 14:return e.abrupt("return",["https://mrkvon.solidcommunity.net/public/math/index.ttl"]);case 15:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),de=function(){var e=Object(d.a)(f.a.mark((function e(t){var n,r,c;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t){e.next=8;break}return e.next=3,Object(T.b)(je(t),{fetch:v.fetch});case 3:if(n=e.sent,!(r=Object(T.e)(n,t))){e.next=8;break}return c=Object(T.d)(r,F.b.knows).map((function(e){return e.value})),e.abrupt("return",c);case 8:return e.abrupt("return",[]);case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),be=function(){var e=Object(d.a)(f.a.mark((function e(t,n){var r,c,i,a,o;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=ve(t),c="https://timbl.solidcommunity.net/profile/card#me",r={},Object(le.a)(r,t,{uri:t,visited:!1}),Object(le.a)(r,c,{uri:c,visited:!1}),i=r,a=Object.keys(i).length,n(Object.keys(i));case 5:if(!Object.values(i).map((function(e){return e.visited})).includes(!1)){e.next=27;break}if(!(o=Object.values(i).find((function(e){return!e.visited})))){e.next=24;break}return o.visited=!0,e.prev=9,e.next=12,de(o.uri);case 12:e.sent.forEach((function(e){var t;e=ve(e),i[e]=null!==(t=null===i||void 0===i?void 0:i[e])&&void 0!==t?t:{uri:e,visited:!1}})),e.next=19;break;case 16:e.prev=16,e.t0=e.catch(9),e.t0;case 19:return e.prev=19,a!==Object.keys(i).length&&(n(Object.keys(i)),a=Object.keys(i).length),e.finish(19);case 22:e.next=25;break;case 24:return e.abrupt("break",27);case 25:e.next=5;break;case 27:case"end":return e.stop()}}),e,null,[[9,16,19,22]])})));return function(t,n){return e.apply(this,arguments)}}(),je=function(e){var t=new URL(e);return t.hash="",t.href},ve=function(e){var t=e.match(/^(.+)\.solid.community(.*)$/);if(t){var n=Object(b.a)(t,3),r=n[1],c=n[2];e="".concat(r,".solidcommunity.net").concat(c)}return e},Oe=function(e,t){var n=I.a.dot(e,I.a.transpose([[].concat(Object(g.a)(t),[1])])),r=Object(b.a)(n,2);return[Object(b.a)(r[0],1)[0],Object(b.a)(r[1],1)[0]]},he={origin:[0,0],distance:20,highlight:5},pe=function(e){var t=Object(c.useState)(new J),n=Object(b.a)(t,1)[0],r=Object(c.useState)({nodes:[],links:[]}),i=Object(b.a)(r,2),a=i[0],o=i[1],u=Object(c.useState)(),l=Object(b.a)(u,2),j=l[0],v=l[1],p=Object(c.useState)(),m=Object(b.a)(p,2),x=m[0],y=m[1],k=Object(c.useContext)(O),w=Object(b.a)(k,1)[0];Object(c.useEffect)((function(){var e,t;fe(null!==(e=null===w||void 0===w?void 0:w.webId)&&void 0!==e?e:"").then(console.log),de(null!==(t=null===w||void 0===w?void 0:w.webId)&&void 0!==t?t:"").then(console.log)}),[w]);var E=function(){var e=Object(D.a)("https://mrkvon.solidcommunity.net/public/math/index.ttl",A),t=e.data,n=e.revalidate,r=Object(c.useState)({}),i=Object(b.a)(r,2),a=i[0],o=i[1];return Object(c.useEffect)((function(){var e={};t&&Object(T.f)(t).forEach((function(t){var n,r,c,i,a,o,u=Object(T.a)(t),s=null!==(n=null===(r=Object(T.c)(t,F.c.type))||void 0===r?void 0:r.value)&&void 0!==n?n:"",l=null!==(c=null===(i=Object(T.c)(t,F.a.description))||void 0===i?void 0:i.value)&&void 0!==c?c:"",f=null!==(a=null===(o=Object(T.c)(t,F.d.label))||void 0===o?void 0:o.value)&&void 0!==a?a:"",d=Object(T.d)(t,"https://terms.math.livegraph.org#depends_on").reduce((function(t,n){return t[n.value]=W(e,n.value),t}),{});Object.assign(W(e,u),{type:s,description:l,dependsOn:d,label:f,uri:u})})),o(e)}),[t]),[a,n]}(),S=Object(b.a)(E,2),N=S[0],C=S[1],L=Object(c.useState)([[1,0,0],[0,1,0],[0,0,1]]),M=Object(b.a)(L,2),G=M[0],R=M[1];Object(c.useEffect)((function(){var e=Date.now()-20;return n.start({nodes:[],links:[],onTick:function(t){var n=t.nodes,r=t.links,c=Date.now();c>e+20&&(o({nodes:Object(g.a)(n),links:Object(g.a)(r)}),e=c)}}),function(){n.stop()}}),[n]),Object(c.useEffect)((function(){Object(d.a)(f.a.mark((function e(){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,C();case 2:case"end":return e.stop()}}),e)})))()}),[w,C]),Object(c.useEffect)((function(){var e;try{e=K(N)}catch(c){e=N}var t=Object.values(e).map((function(e){var t=e.label,n=e.uri;return{label:t,x:400*Math.random(),y:400*Math.random(),uri:n}})),r=Object.values(e).reduce((function(e,t){var n=t.uri,r=t.dependsOn;return Object.keys(r).forEach((function(t){return e.push({source:n,target:t})})),e}),[]);n.update({nodes:t,links:r})}),[N,n]);var B=function(e){return function(t){var r,c=Oe(I.a.inv(G),t),i=Object(b.a)(c,2),a=i[0],o=i[1];e(null===(r=n.selectNode({x:a,y:o}))||void 0===r?void 0:r.uri)}},H=B(v),X=B(y),q=function(e,t){var n,r;return e?Object.values(null!==(n=null===(r=t[e])||void 0===r?void 0:r.dependsOn)&&void 0!==n?n:{}).map((function(e){return e.uri})):[]}(x,N),z=function(e,t,n,r,c){var i=Object.fromEntries(t.nodes.map((function(t){var n=Oe(e,[t.x,t.y]),r=Object(b.a)(n,2),c=r[0],i=r[1];return[t.uri,Object(s.a)(Object(s.a)({},t),{},{x:c,y:i,style:""})]})));n&&(i[n].style="accent"),r&&(i[r].style="focus"),c.forEach((function(e){return i[e].style="accent"}));var a=t.links.map((function(e){var n="string"===typeof e.source?e.source:"number"===typeof e.source?t.nodes[e.source].uri:e.source.uri,r="string"===typeof e.target?e.target:"number"===typeof e.target?t.nodes[e.target].uri:e.target.uri;return{source:i[n],target:i[r]}}));return{nodes:Object.values(i),links:a}}(G,a,j,x,q),Y=function(e,t){for(var n=t.distance*e[0][0];n<20;)n*=5;return{origin:Oe(e,t.origin),distance:n,highlight:t.highlight}}(G,he);return Object(h.jsxs)(h.Fragment,{children:[Object(h.jsx)(P,Object(s.a)({graph:z,grid:Y,onTransform:function(e){R((function(t){return I.a.dot(e,t)}))},onHover:H,onSelectNode:X},e)),x&&Object(h.jsx)(se,{node:N[x],onSelectNode:function(e){return y(e)}})]})},me=Object(c.createContext)([]),ge=Object(c.createContext)([]),xe=function(e){var t=e.children,n=Object(c.useContext)(O),r=Object(b.a)(n,1)[0],i=Object(c.useState)([]),a=Object(b.a)(i,2),o=a[0],u=a[1],s=Object(c.useState)([]),l=Object(b.a)(s,2),f=l[0],d=l[1];return Object(c.useEffect)((function(){(null===r||void 0===r?void 0:r.isLoggedIn)?be(r.webId,u):u([])}),[r]),Object(c.useEffect)((function(){o.forEach((function(e){return fe(e).then((function(t){return d((function(n){var r=t.filter((function(e){return!n.find((function(t){return e===t.uri}))}));return r.length>0?[].concat(Object(g.a)(n),Object(g.a)(r.map((function(t){return{uri:t,owner:e,access:""}})))):n}))})).catch((function(e){}))}))}),[o]),Object(c.useEffect)((function(){console.log("documents",f.map((function(e){return e.uri})))}),[f]),Object(h.jsx)(ge.Provider,{value:f,children:Object(h.jsx)(me.Provider,{value:o,children:t})})},ye=["people"],ke=function(e){var t=e.people,n=Object(j.a)(e,ye);return Object(h.jsx)("div",Object(s.a)(Object(s.a)({},n),{},{children:Object(h.jsx)("div",{children:t.length})}))},we=Object(te.a)(m)(ae||(ae=Object(u.a)(["\n  position: fixed;\n  top: 1em;\n  right: 1em;\n  display: block;\n"]))),Ee=Object(te.a)((function(e){var t=Object(c.useContext)(me);return Object(h.jsx)(ke,Object(s.a)({people:t},e))}))(oe||(oe=Object(u.a)(["\n  position: fixed;\n  top: 1em;\n  left: 1em;\n  display: block;\n  background-color: white;\n  padding: 0.25rem;\n"]))),Se=Object(te.a)(pe)(ue||(ue=Object(u.a)(["\n  height: 100vh;\n  width: 100vw;\n  display: block;\n"]))),Ne=function(){return Object(h.jsxs)(h.Fragment,{children:[Object(h.jsx)(Ee,{}),Object(h.jsx)(we,{}),Object(h.jsx)(Se,{})]})},Ce=function(){return Object(h.jsx)(xe,{children:Object(h.jsx)(Ne,{})})},Le=function(e){e&&e instanceof Function&&n.e(5).then(n.bind(null,640)).then((function(t){var n=t.getCLS,r=t.getFID,c=t.getFCP,i=t.getLCP,a=t.getTTFB;n(e),r(e),c(e),i(e),a(e)}))},Ie=function(e){var t=Object(c.useState)(null),n=Object(b.a)(t,2),r=n[0],i=n[1];return Object(h.jsx)(O.Provider,{value:[r,i],children:e.children})},Me=n(250),Pe=n.n(Me);if("object"===typeof document){var Te=document.querySelector("#root");Pe.a.setAppElement(Te)}o.a.render(Object(h.jsx)(i.a.StrictMode,{children:Object(h.jsx)(Ie,{children:Object(h.jsx)(Ce,{})})}),document.getElementById("root")),Le()}},[[604,1,2]]]);
//# sourceMappingURL=main.f2619354.chunk.js.map