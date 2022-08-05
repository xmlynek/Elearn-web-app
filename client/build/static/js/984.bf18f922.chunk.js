"use strict";(self.webpackChunkbp_frontend_typescript=self.webpackChunkbp_frontend_typescript||[]).push([[984],{2677:function(e,n,o){var a=o(885),t=o(1413),r=o(5987),c=o(1694),s=o.n(c),l=o(2791),i=o(162),u=o(184),d=["as","bsPrefix","className"],f=["className"],m=["xxl","xl","lg","md","sm","xs"];var p=l.forwardRef((function(e,n){var o=function(e){var n=e.as,o=e.bsPrefix,a=e.className,c=(0,r.Z)(e,d);o=(0,i.vE)(o,"col");var l=[],u=[];return m.forEach((function(e){var n,a,t,r=c[e];delete c[e],"object"===typeof r&&null!=r?(n=r.span,a=r.offset,t=r.order):n=r;var s="xs"!==e?"-".concat(e):"";n&&l.push(!0===n?"".concat(o).concat(s):"".concat(o).concat(s,"-").concat(n)),null!=t&&u.push("order".concat(s,"-").concat(t)),null!=a&&u.push("offset".concat(s,"-").concat(a))})),[(0,t.Z)((0,t.Z)({},c),{},{className:s().apply(void 0,[a].concat(l,u))}),{as:n,bsPrefix:o,spans:l}]}(e),c=(0,a.Z)(o,2),l=c[0],p=l.className,Z=(0,r.Z)(l,f),v=c[1],b=v.as,x=void 0===b?"div":b,N=v.bsPrefix,h=v.spans;return(0,u.jsx)(x,(0,t.Z)((0,t.Z)({},Z),{},{ref:n,className:s()(p,!h.length&&N)}))}));p.displayName="Col",n.Z=p},5316:function(e,n,o){o.d(n,{Z:function(){return L}});var a,t=o(885),r=o(5987),c=o(1413),s=o(1694),l=o.n(s),i=o(3070),u=o(7357),d=o(8376),f=o(6382);function m(e){if((!a&&0!==a||e)&&u.Z){var n=document.createElement("div");n.style.position="absolute",n.style.top="-9999px",n.style.width="50px",n.style.height="50px",n.style.overflow="scroll",document.body.appendChild(n),a=n.offsetWidth-n.clientWidth,document.body.removeChild(n)}return a}var p=o(7731),Z=o(9007),v=o(3201),b=o(1683),x=o(3690),N=o(2791),h=o(6137),g=o(5592),y=o(2709),E=o(6543),w=(0,E.Z)("modal-body"),k=o(9820),C=o(162),P=o(184),F=["bsPrefix","className","contentClassName","centered","size","fullscreen","children","scrollable"],R=N.forwardRef((function(e,n){var o=e.bsPrefix,a=e.className,t=e.contentClassName,s=e.centered,i=e.size,u=e.fullscreen,d=e.children,f=e.scrollable,m=(0,r.Z)(e,F);o=(0,C.vE)(o,"modal");var p="".concat(o,"-dialog"),Z="string"===typeof u?"".concat(o,"-fullscreen-").concat(u):"".concat(o,"-fullscreen");return(0,P.jsx)("div",(0,c.Z)((0,c.Z)({},m),{},{ref:n,className:l()(p,a,i&&"".concat(o,"-").concat(i),s&&"".concat(p,"-centered"),f&&"".concat(p,"-scrollable"),u&&Z),children:(0,P.jsx)("div",{className:l()("".concat(o,"-content"),t),children:d})}))}));R.displayName="ModalDialog";var j=R,D=(0,E.Z)("modal-footer"),T=o(2086),O=["bsPrefix","className"],S=N.forwardRef((function(e,n){var o=e.bsPrefix,a=e.className,t=(0,r.Z)(e,O);return o=(0,C.vE)(o,"modal-header"),(0,P.jsx)(T.Z,(0,c.Z)((0,c.Z)({ref:n},t),{},{className:l()(a,o)}))}));S.displayName="ModalHeader",S.defaultProps={closeLabel:"Close",closeButton:!1};var A=S,H=(0,o(7472).Z)("h4"),_=(0,E.Z)("modal-title",{Component:H}),I=["bsPrefix","className","style","dialogClassName","contentClassName","children","dialogAs","aria-labelledby","show","animation","backdrop","keyboard","onEscapeKeyDown","onShow","onHide","container","autoFocus","enforceFocus","restoreFocus","restoreFocusOptions","onEntered","onExit","onExiting","onEnter","onEntering","onExited","backdropClassName","manager"],M={show:!1,backdrop:!0,keyboard:!0,autoFocus:!0,enforceFocus:!0,restoreFocus:!0,animation:!0,dialogAs:j};function z(e){return(0,P.jsx)(y.Z,(0,c.Z)((0,c.Z)({},e),{},{timeout:null}))}function B(e){return(0,P.jsx)(y.Z,(0,c.Z)((0,c.Z)({},e),{},{timeout:null}))}var K=N.forwardRef((function(e,n){var o=e.bsPrefix,a=e.className,s=e.style,y=e.dialogClassName,E=e.contentClassName,w=e.children,F=e.dialogAs,R=e["aria-labelledby"],j=e.show,D=e.animation,T=e.backdrop,O=e.keyboard,S=e.onEscapeKeyDown,A=e.onShow,H=e.onHide,_=e.container,M=e.autoFocus,K=e.enforceFocus,L=e.restoreFocus,U=e.restoreFocusOptions,W=e.onEntered,q=e.onExit,G=e.onExiting,J=e.onEnter,Q=e.onEntering,V=e.onExited,X=e.backdropClassName,Y=e.manager,$=(0,r.Z)(e,I),ee=(0,N.useState)({}),ne=(0,t.Z)(ee,2),oe=ne[0],ae=ne[1],te=(0,N.useState)(!1),re=(0,t.Z)(te,2),ce=re[0],se=re[1],le=(0,N.useRef)(!1),ie=(0,N.useRef)(!1),ue=(0,N.useRef)(null),de=(0,p.Z)(),fe=(0,t.Z)(de,2),me=fe[0],pe=fe[1],Ze=(0,v.Z)(n,pe),ve=(0,Z.Z)(H),be=(0,C.SC)();o=(0,C.vE)(o,"modal");var xe=(0,N.useMemo)((function(){return{onHide:ve}}),[ve]);function Ne(){return Y||(0,g.t)({isRTL:be})}function he(e){if(u.Z){var n=Ne().getScrollbarWidth()>0,o=e.scrollHeight>(0,d.Z)(e).documentElement.clientHeight;ae({paddingRight:n&&!o?m():void 0,paddingLeft:!n&&o?m():void 0})}}var ge=(0,Z.Z)((function(){me&&he(me.dialog)}));(0,b.Z)((function(){(0,f.Z)(window,"resize",ge),null==ue.current||ue.current()}));var ye=function(){le.current=!0},Ee=function(e){le.current&&me&&e.target===me.dialog&&(ie.current=!0),le.current=!1},we=function(){se(!0),ue.current=(0,x.Z)(me.dialog,(function(){se(!1)}))},ke=function(e){"static"!==T?ie.current||e.target!==e.currentTarget?ie.current=!1:null==H||H():function(e){e.target===e.currentTarget&&we()}(e)},Ce=(0,N.useCallback)((function(e){return(0,P.jsx)("div",(0,c.Z)((0,c.Z)({},e),{},{className:l()("".concat(o,"-backdrop"),X,!D&&"show")}))}),[D,X,o]),Pe=(0,c.Z)((0,c.Z)({},s),oe);D||(Pe.display="block");return(0,P.jsx)(k.Z.Provider,{value:xe,children:(0,P.jsx)(h.Z,{show:j,ref:Ze,backdrop:T,container:_,keyboard:!0,autoFocus:M,enforceFocus:K,restoreFocus:L,restoreFocusOptions:U,onEscapeKeyDown:function(e){O||"static"!==T?O&&S&&S(e):(e.preventDefault(),we())},onShow:A,onHide:H,onEnter:function(e,n){e&&(e.style.display="block",he(e)),null==J||J(e,n)},onEntering:function(e,n){null==Q||Q(e,n),(0,i.ZP)(window,"resize",ge)},onEntered:W,onExit:function(e){null==ue.current||ue.current(),null==q||q(e)},onExiting:G,onExited:function(e){e&&(e.style.display=""),null==V||V(e),(0,f.Z)(window,"resize",ge)},manager:Ne(),transition:D?z:void 0,backdropTransition:D?B:void 0,renderBackdrop:Ce,renderDialog:function(e){return(0,P.jsx)("div",(0,c.Z)((0,c.Z)({role:"dialog"},e),{},{style:Pe,className:l()(a,o,ce&&"".concat(o,"-static")),onClick:T?ke:void 0,onMouseUp:Ee,"aria-labelledby":R,children:(0,P.jsx)(F,(0,c.Z)((0,c.Z)({},$),{},{onMouseDown:ye,className:y,contentClassName:E,children:w}))}))}})})}));K.displayName="Modal",K.defaultProps=M;var L=Object.assign(K,{Body:w,Header:A,Title:_,Footer:D,Dialog:j,TRANSITION_DURATION:300,BACKDROP_TRANSITION_DURATION:150})},9743:function(e,n,o){var a=o(1413),t=o(5987),r=o(1694),c=o.n(r),s=o(2791),l=o(162),i=o(184),u=["bsPrefix","className","as"],d=["xxl","xl","lg","md","sm","xs"],f=s.forwardRef((function(e,n){var o=e.bsPrefix,r=e.className,s=e.as,f=void 0===s?"div":s,m=(0,t.Z)(e,u),p=(0,l.vE)(o,"row"),Z="".concat(p,"-cols"),v=[];return d.forEach((function(e){var n,o=m[e];delete m[e],n=null!=o&&"object"===typeof o?o.cols:o;var a="xs"!==e?"-".concat(e):"";null!=n&&v.push("".concat(Z).concat(a,"-").concat(n))})),(0,i.jsx)(f,(0,a.Z)((0,a.Z)({ref:n},m),{},{className:c().apply(void 0,[r,p].concat(v))}))}));f.displayName="Row",n.Z=f},2391:function(e){var n=function(){};e.exports=n}}]);
//# sourceMappingURL=984.bf18f922.chunk.js.map