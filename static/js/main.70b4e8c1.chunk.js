(this.webpackJsonpmath=this.webpackJsonpmath||[]).push([[0],{265:function(e,t,n){},603:function(e,t,n){"use strict";n.r(t);var r,c=n(1),i=n.n(c),a=n(143),o=n.n(a),u=(n(265),n(54)),s=n(7),l=n(0),d=n.n(l),f=n(2),b=n(4),j=n(53),h=n(28),v=Object(c.createContext)([null,function(){}]),O=n(3),p=["className"],m=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{className:""},t=e.className,n=Object(j.a)(e,p),r=Object(c.useState)(!0),i=Object(b.a)(r,2),a=i[0],o=i[1],u=Object(c.useContext)(v),l=Object(b.a)(u,2),m=l[0],g=l[1];Object(c.useEffect)((function(){o(!0),Object(h.handleIncomingRedirect)({url:window.location.href,restorePreviousSession:!0}).then((function(e){e&&g(e)})).catch((function(e){console.log(e),g(null)})).finally((function(){o(!1)}))}),[g]);var x=function(){var e=Object(f.a)(d.a.mark((function e(){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return o(!0),e.next=3,Object(h.login)({oidcIssuer:"https://solidcommunity.net",redirectUrl:window.location.href,clientName:"Math Livegraph"});case 3:o(!1);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),y=function(){var e=Object(f.a)(d.a.mark((function e(){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return o(!0),e.next=3,Object(h.logout)();case 3:g&&g(null),o(!1);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),k=Object(s.a)(Object(s.a)({},n),{},{className:"".concat(t," button")});return a?Object(O.jsx)("span",Object(s.a)(Object(s.a)({},k),{},{children:"Loading"})):(null===m||void 0===m?void 0:m.isLoggedIn)?Object(O.jsxs)("button",Object(s.a)(Object(s.a)({},k),{},{onClick:y,children:[null===m||void 0===m?void 0:m.webId," Logout"]})):Object(O.jsx)("button",Object(s.a)(Object(s.a)({},k),{},{onClick:x,children:"Login"}))},g=n(9),x=function(e,t,n,r){var c=Object(b.a)(t,2),i=c[0],a=c[1];e.font="20px Arial",e.textBaseline="middle",e.textAlign="left",Object.assign(e,r),e.fillText(n,i,a)},y=function(e,t,n,r){var c=Object(b.a)(t,2),i=c[0],a=c[1];Object.assign(e,r),e.beginPath(),e.arc(i,a,n,0,2*Math.PI),e.fill()},k=function(e,t,n,r){Object.assign(e,r),e.beginPath(),e.moveTo.apply(e,Object(g.a)(t)),e.lineTo.apply(e,Object(g.a)(n)),e.stroke()},w=n(239),E=n.n(w),S=n(613),N=n(251),C=n(252),M=n(22),L=n.n(M),I=["graph","grid","onTransform","onHover","onSelectNode"],P=function(e){var t=e.graph,n=e.grid,i=e.onTransform,a=e.onHover,o=e.onSelectNode,u=Object(j.a)(e,I),l=Object(c.useRef)(null),d=Object(c.useState)({width:0,height:0}),f=Object(b.a)(d,2),h=f[0],v=h.width,p=h.height,m=f[1];Object(c.useEffect)((function(){if(l&&l.current){var e=l.current.getContext("2d");if(e){var r=[v/2,p/2];e.save(),e.translate.apply(e,r),e.clearRect(-r[0],-r[1],v,p),function(e,t,n,r){for(var c=arguments.length>4&&void 0!==arguments[4]?arguments[4]:[0,0],i="#fff2",a=-c[1],o=r-c[1],u=-c[0],s=n-c[0],l=function(e){return 0===e?2:e%t.highlight===0?1:.5},d=0;d*t.distance+t.origin[0]<=s;){var f=d*t.distance+t.origin[0];f>=u&&k(e,[f,a],[f,o],{strokeStyle:i,lineWidth:l(d)}),d++}for(d=-1;d*t.distance+t.origin[0]>=u;){var b=d*t.distance+t.origin[0];b<=s&&k(e,[b,a],[b,o],{strokeStyle:i,lineWidth:l(d)}),d--}for(d=0;d*t.distance+t.origin[1]<=o;){var j=d*t.distance+t.origin[1];j>=a&&k(e,[u,j],[s,j],{strokeStyle:i,lineWidth:l(d)}),d++}for(d=-1;d*t.distance+t.origin[1]>=a;){var h=d*t.distance+t.origin[1];h<=o&&k(e,[u,h],[s,h],{strokeStyle:i,lineWidth:l(d)}),d--}}(e,n,v,p,r),t.links.forEach((function(t){var n=[t.source.x,t.source.y],r=[t.target.x,t.target.y],c=L.a.sub(r,n),i=Math.sqrt(Math.pow(c[0],2)+Math.pow(c[1],2)),a=L.a.div(c,i);k(e,L.a.add(n,L.a.mul(a,t.source.r)),L.a.sub(r,L.a.mul(a,t.target.r)),{strokeStyle:"white",lineWidth:.5})}));var c="violet",i=t.nodes.filter((function(e){return"accent"===e.style})),a=t.nodes.filter((function(e){return"focus"===e.style})),o=t.nodes.filter((function(e){return!e.style}));return o.forEach((function(t){var n=t.x,r=t.y,c=t.r;return y(e,[n,r],c,{fillStyle:"#fff8"})})),o.forEach((function(t){var n=t.x,r=t.y,c=t.r,i=t.label;return x(e,[n+c+5,r],i,{fillStyle:"#fff4"})})),i.forEach((function(t){var n=t.x,r=t.y,i=t.r;return y(e,[n,r],i,{fillStyle:c})})),i.forEach((function(t){var n=t.x,r=t.y,i=t.r,a=t.label;return x(e,[n+i+5,r],a,{fillStyle:c})})),a.forEach((function(t){var n=t.x,r=t.y,c=t.r;return y(e,[n,r],c,{fillStyle:"red"})})),a.forEach((function(t){var n=t.x,r=t.y,c=t.r,i=t.label;return x(e,[n+c+5,r],i,{fillStyle:"red"})})),function(){return e.restore()}}}}),[v,p,t,l,n]),Object(c.useEffect)((function(){var e=function(){if(l&&l.current){var e=function(e){if(e&&e.current){var t=e.current;return{height:t.clientHeight,width:t.clientWidth}}return{height:0,width:0}}(l);m(e)}};return e(),window.addEventListener("load",e),window.addEventListener("resize",e),function(){window.removeEventListener("resize",e),window.removeEventListener("load",e)}}),[v,p,l]),Object(c.useEffect)((function(){l&&l.current&&(Object(C.a)(l.current).call(Object(S.a)().clickDistance(2).on("drag",(function(e){i([[1,0,e.dx],[0,1,e.dy],[0,0,1]])}))),Object(C.a)(l.current).call(Object(N.a)().clickDistance(2).scaleExtent([.05,3]).on("zoom",(function(e){var t;r=null!==(t=r)&&void 0!==t?t:[[1,0,-v/2],[0,1,-p/2],[0,0,1]];var n=e.transform,c=n.x,a=n.y,o=n.k,u=[[o,0,c-v/2],[0,o,a-p/2],[0,0,1]],s=L.a.dot(u,L.a.inv(r));r=u,i(s)}))))}),[l,i,p,v]);var g=function(e){return function(t){if(l&&l.current){var n=l.current.getBoundingClientRect(),r=t.clientX-n.left,c=t.clientY-n.top;e([r-v/2,c-p/2])}}},w=g(a),M=g(o);return Object(O.jsx)("canvas",Object(s.a)(Object(s.a)({},u),{},{ref:l,onMouseMove:w,onMouseOut:function(){return a([1/0,1/0])},width:v,height:p,className:E()(u.className,"has-background-dark"),onClick:M}))};var T=n(13),D=n(33),F=function(e,t){var n;return e[t]=null!==(n=e[t])&&void 0!==n?n:{type:"",description:"",dependencies:{},dependents:{},label:""},e[t]},W=function(){var e=Object(f.a)(d.a.mark((function e(t){var n,r,c;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(T.b)(t,{fetch:h.fetch});case 2:return n=e.sent,r=Object(T.f)(n),c={},r.forEach((function(e){var t,n,r,i,a,o,u=Object(T.a)(e),s=null!==(t=null===(n=Object(T.c)(e,D.c.type))||void 0===n?void 0:n.value)&&void 0!==t?t:"",l=null!==(r=null===(i=Object(T.c)(e,D.a.description))||void 0===i?void 0:i.value)&&void 0!==r?r:"",d=null!==(a=null===(o=Object(T.c)(e,D.d.label))||void 0===o?void 0:o.value)&&void 0!==a?a:"",f=Object(T.d)(e,"https://terms.math.livegraph.org#depends_on").reduce((function(e,t){return e[t.value]=F(c,t.value),e}),{});Object.assign(F(c,u),{type:s,description:l,dependencies:f,label:d,uri:u}),Object.keys(f).forEach((function(e){F(c,e),c[e].dependents[u]=c[u]}))})),e.abrupt("return",c);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),A=function(e){var t=Object(c.useState)({}),n=Object(b.a)(t,2),r=n[0],i=n[1];return Object(c.useEffect)((function(){e.forEach(function(){var e=Object(f.a)(d.a.mark((function e(t){var n;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,W(t);case 2:n=e.sent,i((function(e){return Object(s.a)(Object(s.a)({},e),n)}));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}),[e]),r},G=n(29),R=n(148),q=n(607),B=n(608),H=n(609),X=n(610),z=n(611),Y=n(612);var J=function e(){var t=this;Object(G.a)(this,e),this.nodes=[],this.links=[],this.runs=!1,this.simulation=Object(R.a)().alphaDecay(.005).force("link",Object(q.a)().id((function(e){return e.uri})).distance(50).strength(.1)).force("linkGravity",function(){var e=[],t=3;function n(n){var r=t*n;e.forEach((function(e){var t=e.source,n=e.target;if("object"===typeof t&&"object"===typeof n&&t.y&&n.y&&t.vy&&n.vy&&t.y<n.y+50){var c=(n.y+50-t.y)/50;t.vy+=r*c,n.vy-=r*c}}))}return n.links=function(t){return e=t,n},n.strength=function(e){return t=e,n},n}().strength(50)).force("charge",Object(B.a)().strength(-150).distanceMax(500)).force("gravityX",Object(H.a)(0).strength(.01)).force("gravityY",Object(X.a)(0).strength(.01)).force("collide",Object(z.a)((function(e){return e.r+5}))).force("center",Object(Y.a)(0,0)).stop(),this.start=function(e){var n=e.nodes,r=e.links,c=e.onTick;t.nodes=n,t.links=r.map((function(e){return Object(s.a)({},e)})),t.simulation.nodes(t.nodes),t.simulation.force("link").links(t.links),t.simulation.force("linkGravity").links(t.links),t.simulation.on("tick",(function(){c({nodes:t.nodes,links:t.links})})),t.simulation.restart(),t.runs=!0},this.stop=function(){return t.runs=!1,t.simulation.stop()},this.update=function(e){var n=e.nodes,r=e.links;t.simulation.stop();var c=Object.fromEntries(t.nodes.map((function(e){return[e.uri,e]}))),i=n.map((function(e){return Object(s.a)(Object(s.a)(Object(s.a)({},e),{},{x:800*(.5-Math.random()),y:800*(.5-Math.random())},c[e.uri]),{},{r:e.r})}));t.nodes=i,t.links=r.map((function(e){return Object(s.a)({},e)})),t.simulation.nodes(t.nodes),t.simulation.force("link").links(t.links),t.simulation.force("linkGravity").links(t.links),t.simulation.alpha(1).restart()},this.selectNode=function(e){var n=e.x,r=e.y;return t.simulation.find(n,r,40)}},U=n(96),_=n.n(U);var K,Q=function(e){var t=new _.a.Graph;Object.values(e).forEach((function(e){t.setNode(e.uri),Object.values(e.dependencies).forEach((function(n){return t.setEdge(e.uri,n.uri)}))}));var n=Object.fromEntries(Object.entries(e).map((function(e){var t=Object(b.a)(e,2),n=t[0],r=t[1];return[n,Object(s.a)(Object(s.a)({},r),{},{dependencies:{}})]})));return function(e){if(!_.a.alg.isAcyclic(e))throw new Error("pruning is possible on DAG only");return e.edges().forEach((function(t){e.removeEdge(t),_.a.alg.dijkstra(e,t.v)[t.w].distance===1/0&&e.setEdge(t)})),e}(t).edges().map((function(e){return{source:e.v,target:e.w}})).forEach((function(e){var t=e.source,r=e.target;n[t].dependencies[r]=n[r]})),n},V=(n(453),n(244)),Z=n.n(V),$=n(245),ee=n.n($),te=n(56),ne=n(246),re=n.n(ne),ce=te.a.div(K||(K=Object(u.a)(["\n  img {\n    max-width: 100%;\n  }\n"])));function ie(e){var t={children:e.children,remarkPlugins:[ee.a],rehypePlugins:[re.a]};return Object(O.jsx)(ce,{children:Object(O.jsx)(Z.a,Object(s.a)({},t))})}var ae=function(e){var t=e.node,n=e.onSelectNode,r=Object.values(t.dependencies),c=Object.values(t.dependents);return Object(O.jsx)("div",{style:{position:"fixed",width:"100%",top:"0",bottom:0,pointerEvents:"none",overflowY:"auto",overflowX:"hidden"},children:Object(O.jsx)("div",{className:"columns mr-1 mt-6",children:Object(O.jsx)("div",{className:"column is-one-quarter is-offset-three-quarters",children:Object(O.jsxs)("div",{className:"card",style:{pointerEvents:"all",overflowX:"auto",width:"100%"},children:[Object(O.jsx)("header",{className:"card-header",children:Object(O.jsx)("p",{className:"card-header-title",children:t.label})}),Object(O.jsx)("section",{className:"card-content",children:Object(O.jsx)(ie,{children:t.description})}),Object(O.jsx)("header",{className:"card-header",children:Object(O.jsxs)("p",{className:"card-header-title",children:["dependencies: ",r.length]})}),Object(O.jsx)("section",{className:"card-content",children:Object(O.jsx)("ul",{className:"buttons are-small",children:r.map((function(e){return Object(O.jsx)("li",{onClick:function(){return n(e.uri)},className:"button is-link is-inverted",children:e.label},e.uri)}))})}),Object(O.jsx)("header",{className:"card-header",children:Object(O.jsxs)("p",{className:"card-header-title",children:["dependents: ",c.length]})}),Object(O.jsx)("section",{className:"card-content",children:Object(O.jsx)("ul",{className:"buttons are-small",children:c.map((function(e){return Object(O.jsx)("li",{onClick:function(){return n(e.uri)},className:"button is-link is-inverted",children:e.label},e.uri)}))})})]})})})})},oe=(n(8),function(){var e=Object(f.a)(d.a.mark((function e(t){var n,r,c,i,a,o,u;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t){e.next=14;break}return e.next=3,Object(T.b)(t,{fetch:h.fetch});case 3:if(n=e.sent,!(r=Object(T.e)(n,t))){e.next=14;break}if(!(i=null===(c=Object(T.c)(r,D.e.publicTypeIndex))||void 0===c?void 0:c.value)){e.next=14;break}return e.next=10,Object(T.b)(i,{fetch:h.fetch});case 10:return a=e.sent,o=Object(T.f)(a),u=o.filter((function(e){return Object(T.d)(e,D.e.forClass).map((function(e){return e.value})).includes("https://terms.math.livegraph.org#concept")})).map((function(e){return Object(T.d)(e,D.e.instance)})).flat().map((function(e){return e.value})),e.abrupt("return",u);case 14:return e.abrupt("return",["https://mrkvon.solidcommunity.net/public/math/index.ttl"]);case 15:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),ue=function(){var e=Object(f.a)(d.a.mark((function e(t){var n,r,c;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t){e.next=8;break}return e.next=3,Object(T.b)(se(t),{fetch:h.fetch});case 3:if(n=e.sent,!(r=Object(T.e)(n,t))){e.next=8;break}return c=Object(T.d)(r,D.b.knows).map((function(e){return e.value})),e.abrupt("return",c);case 8:return e.abrupt("return",[]);case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),se=function(e){var t=new URL(e);return t.hash="",t.href},le=function(e,t){var n=L.a.dot(e,L.a.transpose([[].concat(Object(g.a)(t),[1])])),r=Object(b.a)(n,2);return[Object(b.a)(r[0],1)[0],Object(b.a)(r[1],1)[0]]};function de(e){var t,n=null!==(t=Object.entries(e.dependents).length)&&void 0!==t?t:0;return n=n<1?1:n,5*Math.pow(n,.42)}var fe,be,je,he={origin:[0,0],distance:20,highlight:5},ve=function(e){var t=Object(c.useState)(new J),n=Object(b.a)(t,1)[0],r=Object(c.useState)(["https://mrkvon.solidcommunity.net/public/math/index.ttl"]),i=Object(b.a)(r,2),a=i[0],o=i[1],u=Object(c.useState)({nodes:[],links:[]}),l=Object(b.a)(u,2),d=l[0],f=l[1],j=Object(c.useState)(),h=Object(b.a)(j,2),p=h[0],m=h[1],x=Object(c.useState)(),y=Object(b.a)(x,2),k=y[0],w=y[1],E=Object(c.useContext)(v),S=Object(b.a)(E,1)[0],N=A(a);Object(c.useEffect)((function(){var e,t;oe(null!==(e=null===S||void 0===S?void 0:S.webId)&&void 0!==e?e:"").then((function(e){o(e)})),ue(null!==(t=null===S||void 0===S?void 0:S.webId)&&void 0!==t?t:"").then(console.log)}),[S]);var C=Object(c.useState)([[1,0,0],[0,1,0],[0,0,1]]),M=Object(b.a)(C,2),I=M[0],T=M[1];Object(c.useEffect)((function(){var e=Date.now()-20;return n.start({nodes:[],links:[],onTick:function(t){var n=t.nodes,r=t.links,c=Date.now();c>e+20&&(f({nodes:Object(g.a)(n),links:Object(g.a)(r)}),e=c)}}),function(){n.stop()}}),[n]),Object(c.useEffect)((function(){var e;try{e=Q(N)}catch(c){e=N}var t=Object.values(e).map((function(e){return{label:e.label,x:400*Math.random(),y:400*Math.random(),r:de(e),uri:e.uri}})),r=Object.values(e).reduce((function(e,t){var n=t.uri,r=t.dependencies;return Object.keys(r).forEach((function(t){return e.push({source:n,target:t})})),e}),[]);n.update({nodes:t,links:r})}),[N,n]);var D=function(e){return function(t){var r,c=le(L.a.inv(I),t),i=Object(b.a)(c,2),a=i[0],o=i[1];e(null===(r=n.selectNode({x:a,y:o}))||void 0===r?void 0:r.uri)}},F=D(m),W=D(w),G=function(e,t){var n,r;return e?Object.values(null!==(n=null===(r=t[e])||void 0===r?void 0:r.dependencies)&&void 0!==n?n:{}).map((function(e){return e.uri})):[]}(k,N),R=function(e,t,n,r,c){var i=Object.fromEntries(t.nodes.map((function(t){var n=le(e,[t.x,t.y]),r=Object(b.a)(n,2),c=r[0],i=r[1],a=e[0][0]*t.r;return[t.uri,Object(s.a)(Object(s.a)({},t),{},{x:c,y:i,r:a,style:""})]})));n&&(i[n].style="accent"),r&&(i[r].style="focus"),c.forEach((function(e){return i[e].style="accent"}));var a=t.links.map((function(e){var n="string"===typeof e.source?e.source:"number"===typeof e.source?t.nodes[e.source].uri:e.source.uri,r="string"===typeof e.target?e.target:"number"===typeof e.target?t.nodes[e.target].uri:e.target.uri;return{source:i[n],target:i[r]}}));return{nodes:Object.values(i),links:a}}(I,d,p,k,G),q=function(e,t){for(var n=t.distance*e[0][0];n<20;)n*=5;return{origin:le(e,t.origin),distance:n,highlight:t.highlight}}(I,he);return Object(O.jsxs)(O.Fragment,{children:[Object(O.jsx)(P,Object(s.a)({graph:R,grid:q,onTransform:function(e){T((function(t){return L.a.dot(e,t)}))},onHover:F,onSelectNode:W},e)),k&&Object(O.jsx)(ae,{node:N[k],onSelectNode:function(e){return w(e)}})]})},Oe=Object(c.createContext)([]),pe=Object(c.createContext)([]),me=function(e){var t=e.children,n=Object(c.useContext)(v),r=Object(b.a)(n,1)[0],i=Object(c.useState)([]),a=Object(b.a)(i,2),o=a[0],u=a[1],s=Object(c.useState)([]),l=Object(b.a)(s,2),d=l[0],f=l[1];return Object(c.useEffect)((function(){(null===r||void 0===r?void 0:r.isLoggedIn)?u([r.webId]):u([])}),[r]),Object(c.useEffect)((function(){o.forEach((function(e){return oe(e).then((function(t){return f((function(n){var r=t.filter((function(e){return!n.find((function(t){return e===t.uri}))}));return r.length>0?[].concat(Object(g.a)(n),Object(g.a)(r.map((function(t){return{uri:t,owner:e,access:""}})))):n}))})).catch((function(e){}))}))}),[o]),Object(c.useEffect)((function(){console.log("documents",d.map((function(e){return e.uri})))}),[d]),Object(O.jsx)(pe.Provider,{value:d,children:Object(O.jsx)(Oe.Provider,{value:o,children:t})})},ge=["people"],xe=function(e){var t=e.people,n=Object(j.a)(e,ge);return Object(O.jsx)("div",Object(s.a)(Object(s.a)({},n),{},{children:Object(O.jsx)("div",{children:t.length})}))},ye=Object(te.a)(m)(fe||(fe=Object(u.a)(["\n  position: fixed;\n  top: 1em;\n  right: 1em;\n  display: block;\n"]))),ke=Object(te.a)((function(e){var t=Object(c.useContext)(Oe);return Object(O.jsx)(xe,Object(s.a)({people:t},e))}))(be||(be=Object(u.a)(["\n  position: fixed;\n  top: 1em;\n  left: 1em;\n  display: block;\n  background-color: white;\n  padding: 0.25rem;\n"]))),we=Object(te.a)(ve)(je||(je=Object(u.a)(["\n  height: 100vh;\n  width: 100vw;\n  display: block;\n"]))),Ee=function(){return Object(O.jsxs)(O.Fragment,{children:[Object(O.jsx)(ke,{}),Object(O.jsx)(ye,{}),Object(O.jsx)(we,{})]})},Se=function(){return Object(O.jsx)(me,{children:Object(O.jsx)(Ee,{})})},Ne=function(e){e&&e instanceof Function&&n.e(5).then(n.bind(null,639)).then((function(t){var n=t.getCLS,r=t.getFID,c=t.getFCP,i=t.getLCP,a=t.getTTFB;n(e),r(e),c(e),i(e),a(e)}))},Ce=function(e){var t=Object(c.useState)(null),n=Object(b.a)(t,2),r=n[0],i=n[1];return Object(O.jsx)(v.Provider,{value:[r,i],children:e.children})},Me=n(250),Le=n.n(Me);if("object"===typeof document){var Ie=document.querySelector("#root");Le.a.setAppElement(Ie)}o.a.render(Object(O.jsx)(i.a.StrictMode,{children:Object(O.jsx)(Ce,{children:Object(O.jsx)(Se,{})})}),document.getElementById("root")),Ne()}},[[603,1,2]]]);
//# sourceMappingURL=main.70b4e8c1.chunk.js.map